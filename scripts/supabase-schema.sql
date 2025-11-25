-- Supabase schema for Para-imoveis (PlataformaRural)
-- Run this in Supabase SQL Editor (ou via psql) to criar tabelas e políticas básicas.
-- Instruções rápidas:
-- 1) Abra o projeto no Supabase -> SQL Editor -> New query
-- 2) Cole todo o conteúdo deste arquivo e clique em Run
-- Alternativa (local): `psql "<SUPABASE_DB_CONNECTION>" -f scripts/supabase-schema.sql`

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- ==================================================
-- Tabela: properties (anúncios de imóveis)
-- ==================================================
create table if not exists properties (
    id uuid primary key default gen_random_uuid (),
    title text not null,
    description text,
    price numeric,
    currency text default 'BRL',
    city text,
    state text,
    aptidao text,
    property_type text,
    area_ha numeric,
    owner uuid references auth.users (id) on delete set null,
    is_published boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ==================================================
-- Tabela: property_images
-- ==================================================
create table if not exists property_images (
    id uuid primary key default gen_random_uuid (),
    property_id uuid references properties (id) on delete cascade,
    path text not null, -- caminho no bucket (ex: pages/images/abc.jpg)
    alt text,
    sort_order integer default 0,
    created_at timestamptz default now()
);

-- ==================================================
-- Tabela: favorites (favoritos dos usuários)
-- ==================================================
create table if not exists favorites (
    id uuid primary key default gen_random_uuid (),
    user_id uuid references auth.users (id) on delete cascade,
    property_id uuid references properties (id) on delete cascade,
    created_at timestamptz default now(),
    unique (user_id, property_id)
);

-- ==================================================
-- Tabela: inquiries (mensagens/contatos sobre um imóvel)
-- ==================================================
create table if not exists inquiries (
    id uuid primary key default gen_random_uuid (),
    property_id uuid references properties (id) on delete cascade,
    sender_name text,
    sender_email text,
    message text,
    created_at timestamptz default now()
);

-- ==================================================
-- Políticas RLS (Row Level Security)
-- Recomendações gerais:
-- - Público pode listar anúncios publicados (is_published = true)
-- - Somente o owner pode inserir/alterar/excluir seus anúncios
-- - Imagens seguem as mesmas regras do anúncio
-- - Favoritos: cada usuário pode gerenciar seus próprios favoritos
-- - Inquiries: qualquer pessoa (public) pode criar uma inquiry; somente owner da propriedade pode visualizar
-- ==================================================

-- PROPERTIES: habilitar RLS e policies
alter table properties enable row level security;

-- Permite SELECT público apenas para anúncios publicados
create policy "public_select_published" on properties for
select using (is_published = true);

-- Permite que o owner selecione também (útil para rascunhos)
create policy "owner_select" on properties for
select using (owner = auth.uid ());

-- Permitir INSERT para usuários autenticados (owner será setado na aplicação)
create policy "authenticated_insert" on properties for
insert
with
    check (auth.uid () is not null);

-- Permite UPDATE/DELETE apenas para o owner
create policy "owner_manage" on properties for all using (owner = auth.uid ())
with
    check (owner = auth.uid ());

-- PROPERTY_IMAGES: habilitar RLS e policies
alter table property_images enable row level security;

-- SELECT nas imagens quando o anúncio estiver publicado OU se requester for owner
create policy "images_select_for_public_or_owner" on property_images for
select using (
        exists (
            select 1
            from properties p
            where
                p.id = property_images.property_id
                and (
                    p.is_published = true
                    or p.owner = auth.uid ()
                )
        )
    );

-- INSERT/UPDATE/DELETE apenas para owner do anúncio
create policy "images_owner_manage" on property_images for all using (
    exists (
        select 1
        from properties p
        where
            p.id = property_images.property_id
            and p.owner = auth.uid ()
    )
)
with
    check (
        exists (
            select 1
            from properties p
            where
                p.id = property_images.property_id
                and p.owner = auth.uid ()
        )
    );

-- FAVORITES: habilitar RLS e policies
alter table favorites enable row level security;

-- Cada usuário pode selecionar/gerenciar apenas seus favoritos
create policy "favorites_user_select" on favorites for
select using (user_id = auth.uid ());

create policy "favorites_user_manage" on favorites for all using (user_id = auth.uid ())
with
    check (user_id = auth.uid ());

-- INQUIRIES: habilitar RLS e policies
alter table inquiries enable row level security;

-- Permitir que qualquer usuário ou visitante crie uma inquiry (insert)
-- Se você quiser exigir auth, substitua 'true' por 'auth.uid() is not null'
create policy "inquiries_public_insert" on inquiries for
insert
with
    check (true);

-- Somente o owner da propriedade pode ver as inquiries
create policy "inquiries_owner_select" on inquiries for
select using (
        exists (
            select 1
            from properties p
            where
                p.id = inquiries.property_id
                and p.owner = auth.uid ()
        )
    );

-- Permitir delete do owner da propriedade
create policy "inquiries_owner_delete" on inquiries for delete using (
    exists (
        select 1
        from properties p
        where
            p.id = inquiries.property_id
            and p.owner = auth.uid ()
    )
);

-- ==================================================
-- Índices úteis
-- ==================================================
create index if not exists idx_properties_city_state on properties (city, state);

create index if not exists idx_properties_is_published on properties (is_published);

-- ==================================================
-- Seeds (opcional) — descomente para criar dados de teste
-- INSERT INTO properties (title, description, price, city, state, aptidao, property_type, owner, is_published)
-- VALUES ('Fazenda Exemplo', 'Uma fazenda bonita', 1200000, 'Cuiabá', 'MT', 'pecuaria', 'fazenda', null, true);

-- FIM