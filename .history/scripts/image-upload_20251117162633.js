/**
 * Módulo de Upload de Imagens para Supabase Storage
 * 
 * Funções para fazer upload, deletar e gerenciar imagens no Supabase Storage
 */

// ==========================================
// CONFIGURAÇÕES
// ==========================================
const IMAGE_CONFIG = {
  maxSizeBytes: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  bucketName: 'property-images',
  maxImagesPerProperty: 10,
};

// ==========================================
// FUNÇÕES DE VALIDAÇÃO
// ==========================================

/**
 * Valida se o arquivo é uma imagem válida
 * @param {File} file - Arquivo a ser validado
 * @returns {Object} { valid: boolean, error: string|null }
 */
function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'Nenhum arquivo selecionado' };
  }

  // Verifica o tipo
  if (!IMAGE_CONFIG.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Tipo de arquivo não permitido. Use: ${IMAGE_CONFIG.allowedTypes.join(', ')}`,
    };
  }

  // Verifica o tamanho
  if (file.size > IMAGE_CONFIG.maxSizeBytes) {
    const maxSizeMB = IMAGE_CONFIG.maxSizeBytes / (1024 * 1024);
    return {
      valid: false,
      error: `Arquivo muito grande. Tamanho máximo: ${maxSizeMB}MB`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Gera um nome único para o arquivo
 * @param {string} originalName - Nome original do arquivo
 * @returns {string} Nome único com timestamp
 */
function generateUniqueFileName(originalName) {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomStr}.${extension}`;
}

// ==========================================
// FUNÇÕES DE UPLOAD
// ==========================================

/**
 * Faz upload de uma imagem para o Supabase Storage
 * @param {File} file - Arquivo de imagem
 * @param {string} propertyId - ID da propriedade
 * @param {Object} supabase - Cliente Supabase
 * @returns {Promise<Object>} { success: boolean, data: object|null, error: string|null }
 */
async function uploadPropertyImage(file, propertyId, supabase) {
  try {
    // Valida o arquivo
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return { success: false, data: null, error: validation.error };
    }

    // Obtém o usuário atual
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, data: null, error: 'Usuário não autenticado' };
    }

    // Gera o caminho do arquivo
    const fileName = generateUniqueFileName(file.name);
    const filePath = `${user.id}/${propertyId}/${fileName}`;

    // Faz o upload
    const { data, error } = await supabase.storage
      .from(IMAGE_CONFIG.bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Erro no upload:', error);
      return { success: false, data: null, error: error.message };
    }

    // Obtém a URL pública da imagem
    const {
      data: { publicUrl },
    } = supabase.storage.from(IMAGE_CONFIG.bucketName).getPublicUrl(filePath);

    // Salva a referência na tabela property_images
    const { data: imageRecord, error: dbError } = await supabase
      .from('property_images')
      .insert({
        property_id: propertyId,
        path: filePath,
        alt: file.name,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Erro ao salvar no banco:', dbError);
      // Tenta deletar a imagem do storage se falhou no banco
      await supabase.storage.from(IMAGE_CONFIG.bucketName).remove([filePath]);
      return { success: false, data: null, error: dbError.message };
    }

    return {
      success: true,
      data: {
        id: imageRecord.id,
        path: filePath,
        publicUrl: publicUrl,
      },
      error: null,
    };
  } catch (err) {
    console.error('Erro inesperado no upload:', err);
    return { success: false, data: null, error: err.message };
  }
}

/**
 * Faz upload de múltiplas imagens
 * @param {FileList|Array<File>} files - Lista de arquivos
 * @param {string} propertyId - ID da propriedade
 * @param {Object} supabase - Cliente Supabase
 * @param {Function} onProgress - Callback para progresso (opcional)
 * @returns {Promise<Object>} { success: boolean, results: Array, errors: Array }
 */
async function uploadMultipleImages(
  files,
  propertyId,
  supabase,
  onProgress = null
) {
  const results = [];
  const errors = [];
  const totalFiles = files.length;

  // Verifica limite de imagens
  const currentCount = await getPropertyImageCount(propertyId, supabase);
  if (currentCount + totalFiles > IMAGE_CONFIG.maxImagesPerProperty) {
    return {
      success: false,
      results: [],
      errors: [
        `Limite excedido. Máximo de ${IMAGE_CONFIG.maxImagesPerProperty} imagens por propriedade.`,
      ],
    };
  }

  for (let i = 0; i < totalFiles; i++) {
    const file = files[i];

    if (onProgress) {
      onProgress({
        current: i + 1,
        total: totalFiles,
        fileName: file.name,
      });
    }

    const result = await uploadPropertyImage(file, propertyId, supabase);

    if (result.success) {
      results.push(result.data);
    } else {
      errors.push({ fileName: file.name, error: result.error });
    }
  }

  return {
    success: errors.length === 0,
    results,
    errors,
  };
}

// ==========================================
// FUNÇÕES DE CONSULTA
// ==========================================

/**
 * Lista todas as imagens de uma propriedade
 * @param {string} propertyId - ID da propriedade
 * @param {Object} supabase - Cliente Supabase
 * @returns {Promise<Array>} Lista de imagens com URLs públicas
 */
async function getPropertyImages(propertyId, supabase) {
  try {
    const { data, error } = await supabase
      .from('property_images')
      .select('*')
      .eq('property_id', propertyId)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Erro ao buscar imagens:', error);
      return [];
    }

    // Adiciona URLs públicas
    const imagesWithUrls = data.map((img) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from(IMAGE_CONFIG.bucketName).getPublicUrl(img.path);
      return { ...img, publicUrl };
    });

    return imagesWithUrls;
  } catch (err) {
    console.error('Erro inesperado ao buscar imagens:', err);
    return [];
  }
}

/**
 * Conta quantas imagens uma propriedade tem
 * @param {string} propertyId - ID da propriedade
 * @param {Object} supabase - Cliente Supabase
 * @returns {Promise<number>} Número de imagens
 */
async function getPropertyImageCount(propertyId, supabase) {
  try {
    const { count, error } = await supabase
      .from('property_images')
      .select('*', { count: 'exact', head: true })
      .eq('property_id', propertyId);

    if (error) {
      console.error('Erro ao contar imagens:', error);
      return 0;
    }

    return count || 0;
  } catch (err) {
    console.error('Erro inesperado ao contar imagens:', err);
    return 0;
  }
}

// ==========================================
// FUNÇÕES DE EXCLUSÃO
// ==========================================

/**
 * Deleta uma imagem
 * @param {string} imageId - ID da imagem (na tabela property_images)
 * @param {Object} supabase - Cliente Supabase
 * @returns {Promise<Object>} { success: boolean, error: string|null }
 */
async function deletePropertyImage(imageId, supabase) {
  try {
    // Busca o registro para obter o path
    const { data: imageRecord, error: fetchError } = await supabase
      .from('property_images')
      .select('path')
      .eq('id', imageId)
      .single();

    if (fetchError || !imageRecord) {
      return { success: false, error: 'Imagem não encontrada' };
    }

    // Deleta do storage
    const { error: storageError } = await supabase.storage
      .from(IMAGE_CONFIG.bucketName)
      .remove([imageRecord.path]);

    if (storageError) {
      console.error('Erro ao deletar do storage:', storageError);
      return { success: false, error: storageError.message };
    }

    // Deleta do banco
    const { error: dbError } = await supabase
      .from('property_images')
      .delete()
      .eq('id', imageId);

    if (dbError) {
      console.error('Erro ao deletar do banco:', dbError);
      return { success: false, error: dbError.message };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Erro inesperado ao deletar imagem:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Deleta todas as imagens de uma propriedade
 * @param {string} propertyId - ID da propriedade
 * @param {Object} supabase - Cliente Supabase
 * @returns {Promise<Object>} { success: boolean, deletedCount: number, error: string|null }
 */
async function deleteAllPropertyImages(propertyId, supabase) {
  try {
    // Busca todas as imagens
    const images = await getPropertyImages(propertyId, supabase);

    if (images.length === 0) {
      return { success: true, deletedCount: 0, error: null };
    }

    // Deleta do storage
    const paths = images.map((img) => img.path);
    const { error: storageError } = await supabase.storage
      .from(IMAGE_CONFIG.bucketName)
      .remove(paths);

    if (storageError) {
      console.error('Erro ao deletar do storage:', storageError);
      return { success: false, deletedCount: 0, error: storageError.message };
    }

    // Deleta do banco
    const { error: dbError } = await supabase
      .from('property_images')
      .delete()
      .eq('property_id', propertyId);

    if (dbError) {
      console.error('Erro ao deletar do banco:', dbError);
      return { success: false, deletedCount: 0, error: dbError.message };
    }

    return { success: true, deletedCount: images.length, error: null };
  } catch (err) {
    console.error('Erro inesperado ao deletar imagens:', err);
    return { success: false, deletedCount: 0, error: err.message };
  }
}

// ==========================================
// FUNÇÕES DE ORDENAÇÃO
// ==========================================

/**
 * Atualiza a ordem das imagens
 * @param {Array<{id: string, sort_order: number}>} imageOrders - Array com IDs e novas ordens
 * @param {Object} supabase - Cliente Supabase
 * @returns {Promise<Object>} { success: boolean, error: string|null }
 */
async function updateImageOrder(imageOrders, supabase) {
  try {
    const promises = imageOrders.map(({ id, sort_order }) =>
      supabase.from('property_images').update({ sort_order }).eq('id', id)
    );

    await Promise.all(promises);
    return { success: true, error: null };
  } catch (err) {
    console.error('Erro ao atualizar ordem:', err);
    return { success: false, error: err.message };
  }
}

// ==========================================
// EXPORTAÇÃO
// ==========================================

// Para uso no navegador (window)
if (typeof window !== 'undefined') {
  window.ImageUploadManager = {
    uploadPropertyImage,
    uploadMultipleImages,
    getPropertyImages,
    getPropertyImageCount,
    deletePropertyImage,
    deleteAllPropertyImages,
    updateImageOrder,
    validateImageFile,
    IMAGE_CONFIG,
  };
}

// Para uso em módulos ES6
export {
  uploadPropertyImage,
  uploadMultipleImages,
  getPropertyImages,
  getPropertyImageCount,
  deletePropertyImage,
  deleteAllPropertyImages,
  updateImageOrder,
  validateImageFile,
  IMAGE_CONFIG,
};
