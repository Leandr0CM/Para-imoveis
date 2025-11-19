# 📸 Guia de Migração de Imagens para Supabase Storage

## Visão Geral

Este guia explica como migrar o sistema de imagens para o Supabase Storage, permitindo que usuários façam upload de fotos dos imóveis diretamente para a nuvem.

## 📋 Status Atual

**Onde as imagens estão agora:**
- 🌐 **URLs externas**: Unsplash e placeholder services (dados mock)
- 📁 **Pasta local**: `src/images/` (não utilizada ainda)
- ❌ **Sem upload**: Usuários não podem fazer upload ainda

## ✅ Solução Implementada

### Estrutura Criada

```
scripts/
├── supabase-storage-setup.sql    # Script SQL para criar bucket e políticas
├── image-upload.js                # Módulo JavaScript para upload/gerenciamento
└── supabase-schema.sql           # Schema já tem tabela property_images

test-image-upload.html             # Página de teste/exemplo
```

### Como Funciona

1. **Bucket no Supabase Storage**: `property-images`
2. **Estrutura de pastas**: `{user_id}/{property_id}/image.jpg`
3. **Tabela no banco**: `property_images` (referências às imagens)
4. **URLs públicas**: Geradas automaticamente pelo Supabase

## 🚀 Passo a Passo para Implementar

### Passo 1: Configurar o Bucket no Supabase

1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Vá em **Storage** no menu lateral
3. Execute o script SQL:
   ```bash
   # Copie o conteúdo de scripts/supabase-storage-setup.sql
   # Cole no SQL Editor do Supabase e execute
   ```

**OU** crie manualmente:
- Clique em **Create a new bucket**
- Nome: `property-images`
- Marque como **Public**
- Clique em **Create bucket**

### Passo 2: Testar o Upload

1. Abra o arquivo `test-image-upload.html` no navegador
2. Faça login na aplicação
3. Tente fazer upload de uma imagem de teste
4. Verifique se aparece na galeria

### Passo 3: Integrar nos Formulários Existentes

#### A. No Painel de Anúncios (`pages/painel/painel-anuncios.html`)

Adicione o campo de upload no formulário de criação/edição:

```html
<!-- Adicione antes do botão de submit -->
<div class="form-group">
    <label>Fotos do Imóvel</label>
    <div class="upload-area" id="property-upload-area">
        <p>Clique ou arraste imagens aqui (máx. 10 fotos)</p>
        <input type="file" id="property-images" accept="image/*" multiple>
    </div>
    <div id="image-preview-grid" class="image-preview-grid"></div>
</div>
```

#### B. No JavaScript do Painel (`pages/painel/painel.js`)

```javascript
// No início do arquivo, após carregar o Supabase
import { uploadMultipleImages, getPropertyImages } from '../../scripts/image-upload.js';

// Ao salvar um novo anúncio
async function salvarAnuncio(propertyData) {
    // 1. Salva os dados do imóvel
    const { data: property, error } = await supabase
        .from('properties')
        .insert(propertyData)
        .select()
        .single();
    
    if (error) {
        console.error('Erro ao salvar:', error);
        return;
    }
    
    // 2. Faz upload das imagens (se houver)
    const fileInput = document.getElementById('property-images');
    if (fileInput.files.length > 0) {
        const result = await uploadMultipleImages(
            fileInput.files,
            property.id,
            supabase,
            (progress) => {
                console.log(`Enviando ${progress.current}/${progress.total}`);
            }
        );
        
        if (!result.success) {
            alert('Imóvel salvo, mas houve erro ao enviar algumas imagens');
        }
    }
    
    alert('Anúncio salvo com sucesso!');
}
```

### Passo 4: Atualizar a Listagem para Usar Imagens do Supabase

#### No Index (`pages/index/index.js`)

Substitua os dados mock por dados reais do Supabase:

```javascript
// Função para buscar imóveis com suas imagens
async function buscarImoveisDestaque(aptidao) {
    const { data: properties, error } = await supabase
        .from('properties')
        .select(`
            *,
            property_images (id, path, sort_order)
        `)
        .eq('is_published', true)
        .eq('aptidao', aptidao)
        .order('created_at', { ascending: false })
        .limit(8);
    
    if (error) {
        console.error('Erro ao buscar imóveis:', error);
        return [];
    }
    
    // Adiciona URLs públicas das imagens
    return properties.map(prop => {
        const primeiraImagem = prop.property_images[0];
        const imagemUrl = primeiraImagem 
            ? supabase.storage.from('property-images').getPublicUrl(primeiraImagem.path).data.publicUrl
            : 'https://placehold.co/600x400/4a7c59/ffffff?text=Sem+Imagem';
        
        return {
            id: prop.id,
            imgSrc: imagemUrl,
            price: prop.price,
            title: prop.title,
            location: `${prop.city}, ${prop.state}`,
            features: [`${prop.area_ha} ha`, prop.property_type],
            link: `/pages/imovel/imovel.html?id=${prop.id}`,
            // ... outros campos
        };
    });
}

// Atualiza os carrosséis
async function carregarDestaques() {
    mockPecuariaDestaques = await buscarImoveisDestaque('pecuaria');
    mockAgriculturaDestaques = await buscarImoveisDestaque('agricultura');
    // ... renderiza os carrosséis
}
```

## 📝 Funcionalidades Disponíveis

### Módulo `image-upload.js`

```javascript
// Upload de uma imagem
const result = await uploadPropertyImage(file, propertyId, supabase);

// Upload de múltiplas imagens
const result = await uploadMultipleImages(files, propertyId, supabase, onProgress);

// Listar imagens de uma propriedade
const images = await getPropertyImages(propertyId, supabase);

// Contar imagens
const count = await getPropertyImageCount(propertyId, supabase);

// Deletar uma imagem
await deletePropertyImage(imageId, supabase);

// Deletar todas as imagens
await deleteAllPropertyImages(propertyId, supabase);

// Reordenar imagens
await updateImageOrder([
    { id: 'img1', sort_order: 0 },
    { id: 'img2', sort_order: 1 }
], supabase);

// Validar arquivo antes do upload
const validation = validateImageFile(file);
if (!validation.valid) {
    console.error(validation.error);
}
```

## 🔒 Segurança

### Políticas Implementadas

- ✅ **Visualização**: Qualquer pessoa pode ver imagens de imóveis publicados
- ✅ **Upload**: Apenas usuários autenticados
- ✅ **Edição/Exclusão**: Apenas o proprietário da imagem
- ✅ **Organização**: Imagens separadas por usuário (pasta por user_id)

### Validações

- ✅ Tamanho máximo: **5MB por imagem**
- ✅ Formatos permitidos: **JPG, PNG, WebP**
- ✅ Máximo: **10 imagens por propriedade**
- ✅ Nomes únicos gerados automaticamente

## 🎨 CSS para Upload Area

Adicione ao seu `style.css` ou crie `upload.css`:

```css
.upload-area {
    border: 2px dashed #4CAF50;
    border-radius: 8px;
    padding: 30px;
    text-align: center;
    background: #f9fdf9;
    cursor: pointer;
    transition: all 0.3s;
}

.upload-area:hover {
    background: #f0faf0;
    border-color: #45a049;
}

.image-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    margin-top: 15px;
}

.image-preview {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.image-preview img {
    width: 100%;
    height: 120px;
    object-fit: cover;
}

.image-preview .remove-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(244, 67, 54, 0.9);
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
}
```

## 🔄 Migração de Dados Existentes

Se você já tem imagens em URLs externas (Unsplash, etc):

### Opção 1: Manter URLs Externas (Temporário)

Continue usando as URLs atuais até que novos anúncios sejam criados com upload.

### Opção 2: Migrar Programaticamente

```javascript
async function migrarImagemExterna(imageUrl, propertyId) {
    // 1. Baixa a imagem
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // 2. Converte para File
    const file = new File([blob], 'migrated-image.jpg', { type: 'image/jpeg' });
    
    // 3. Faz upload
    const result = await uploadPropertyImage(file, propertyId, supabase);
    
    return result;
}

// Migrar todas as imagens de um imóvel
async function migrarImagensImovel(propertyId, urls) {
    for (const url of urls) {
        await migrarImagemExterna(url, propertyId);
    }
}
```

## 📊 Monitoramento

### No Dashboard do Supabase

1. **Storage > property-images**: Ver todas as imagens
2. **Storage > Usage**: Verificar uso de espaço
3. **Database > property_images**: Ver registros no banco
4. **Authentication > Users**: Ver quem está fazendo upload

### Limites do Plano Gratuito

- **Storage**: 1GB
- **Bandwidth**: 2GB/mês
- **Imagens**: Ilimitadas (dentro do storage)

## 🐛 Troubleshooting

### Erro: "Bucket não encontrado"
→ Execute o script `supabase-storage-setup.sql`

### Erro: "Políticas não permitem acesso"
→ Verifique se as políticas RLS foram criadas corretamente

### Erro: "Usuário não autenticado"
→ Certifique-se de que o usuário fez login antes do upload

### Imagens não aparecem
→ Verifique se o bucket está marcado como **public**

### Upload lento
→ Considere redimensionar imagens antes do upload (adicionar resize client-side)

## 🚀 Próximos Passos

1. ✅ Execute o script SQL no Supabase
2. ✅ Teste o upload com `test-image-upload.html`
3. 🔲 Integre no formulário de anúncios
4. 🔲 Atualize as listagens para buscar do Supabase
5. 🔲 Adicione preview de imagens no formulário
6. 🔲 Implemente reordenação drag-and-drop
7. 🔲 Adicione compressão/resize automático

## 📚 Recursos

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Upload de Arquivos](https://supabase.com/docs/guides/storage/uploads)
- [RLS para Storage](https://supabase.com/docs/guides/storage/security/access-control)

---

**Dúvidas?** Consulte a documentação do Supabase ou abra uma issue no repositório.
