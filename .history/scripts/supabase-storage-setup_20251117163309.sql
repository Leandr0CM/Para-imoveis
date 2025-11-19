-- ==================================================
-- SUPABASE STORAGE: Configuração de Buckets e Políticas
-- ==================================================
-- Execute este script no SQL Editor do Supabase para configurar o armazenamento de imagens

-- 1. CRIAR BUCKET PÚBLICO PARA IMAGENS DE PROPRIEDADES
-- (Se o bucket já existir, este comando será ignorado)
INSERT INTO
    storage.buckets (id, name, public)
VALUES (
        'property-images',
        'property-images',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- 2. POLÍTICAS DE ACESSO AO BUCKET

-- Permitir que TODOS possam VER as imagens (bucket público)
CREATE POLICY "Public Access to Property Images" ON storage.objects FOR
SELECT USING (bucket_id = 'property-images');

-- Permitir que usuários AUTENTICADOS possam FAZER UPLOAD
CREATE POLICY "Authenticated Users Can Upload Images" ON storage.objects FOR
INSERT
WITH
    CHECK (
        bucket_id = 'property-images'
        AND auth.role () = 'authenticated'
    );

-- Permitir que usuários possam ATUALIZAR apenas suas próprias imagens
CREATE POLICY "Users Can Update Own Images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'property-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'property-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Permitir que usuários possam DELETAR apenas suas próprias imagens
CREATE POLICY "Users Can Delete Own Images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'property-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ==================================================
-- NOTA SOBRE ESTRUTURA DE PASTAS
-- ==================================================
-- As imagens serão organizadas por usuário:
-- property-images/
--   ├── {user_id}/
--   │   ├── {property_id}/
--   │   │   ├── image1.jpg
--   │   │   ├── image2.jpg
--   │   │   └── ...
--
-- Exemplo de path: property-images/abc123-user-id/def456-property-id/foto1.jpg

-- ==================================================
-- CONFIGURAÇÕES ADICIONAIS (opcional)
-- ==================================================
-- Limite de tamanho de arquivo: 5MB
-- Tipos permitidos: image/jpeg, image/png, image/webp
-- Essas configurações podem ser feitas no Dashboard do Supabase:
-- Storage > property-images > Configuration

-- ==================================================
-- VERIFICAÇÃO
-- ==================================================
-- Para verificar se o bucket foi criado:
-- SELECT * FROM storage.buckets WHERE id = 'property-images';

-- Para verificar políticas:
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';