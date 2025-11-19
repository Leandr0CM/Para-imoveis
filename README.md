# PlataformaRural - Para Imóveis

Plataforma web para compra, venda e arrendamento de imóveis rurais (fazendas, sítios, chácaras) com integração ao Supabase para autenticação e banco de dados.

## 📋 Pré-requisitos

- **Node.js** (v14 ou superior) - [Download](https://nodejs.org)
- **Conta Supabase** - [Criar conta gratuita](https://supabase.com)
- **VS Code** (recomendado) com extensão Live Server (opcional)
- **Git** (para controle de versão)

## 🚀 Configuração Inicial

### 1. Clone o repositório

```bash
git clone https://github.com/Leandr0CM/Para-imoveis.git
cd Para-imoveis
```

### 2. Configure o Supabase

1. Acesse [app.supabase.com](https://app.supabase.com) e crie um novo projeto
2. Anote as credenciais do seu projeto:
   - `Project URL` (ex: https://gqnwhfddcweidbfdcnad.supabase.co)
   - `anon/public key` (encontrada em Settings → API)

### 3. Configure as variáveis de ambiente

1. Copie o arquivo de exemplo:

   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e preencha com suas credenciais:

   ```env
   SUPABASE_URL=https://<seu-projeto-ref>.supabase.co
   SUPABASE_ANON_KEY=<sua-anon-key>
   ```

   ⚠️ **Importante**: Nunca comite o arquivo `.env` com suas chaves reais (já está no `.gitignore`)

### 4. Crie o banco de dados

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em **New query**
3. Copie todo o conteúdo do arquivo `scripts/supabase-schema.sql`
4. Cole no editor e clique em **Run**

Isso criará:

- Tabelas: `properties`, `property_images`, `favorites`, `inquiries`
- Políticas RLS (Row Level Security)
- Índices para otimização

### 5. Configure a autenticação

1. No Supabase, vá em **Authentication → Settings**
2. Em **Auth Providers**, habilite **Email**
3. Configure:
   - **Enable email confirmations**: ON (recomendado para produção)
   - **Site URL**: `http://localhost:8000` (desenvolvimento) ou sua URL de produção
   - **Redirect URLs**: adicione `http://localhost:8000/**` e sua URL de produção

### 6. Gere o arquivo de configuração

```bash
npm run gen-config
```

Ou manualmente:

```bash
node scripts/generate-site-config.js
```

Isso criará `scripts/site-config.js` com suas credenciais (arquivo ignorado pelo Git).

## 🏃 Executando o Projeto

### Opção 1: npm start (Recomendado)

```bash
npm start
```

Isso irá:

1. Gerar automaticamente `scripts/site-config.js`
2. Iniciar servidor HTTP na porta 8000

Acesse: http://localhost:8000/pages/index/index.html

### Opção 2: Live Server (VS Code)

1. Abra a pasta `Para-imoveis` no VS Code (**importante**: abra essa pasta, não a pasta pai)
2. Clique com botão direito em qualquer arquivo `.html`
3. Selecione **"Open with Live Server"**

Acesse: http://127.0.0.1:5500/pages/index/index.html

⚠️ **Atenção**: Certifique-se de abrir a pasta correta (`Para-imoveis`), não a pasta pai. Caso contrário, os caminhos dos arquivos estarão incorretos.

### Opção 3: Python HTTP Server

```bash
python -m http.server 8000
```

Acesse: http://localhost:8000/pages/index/index.html

## 📁 Estrutura do Projeto

```
Para-imoveis/
├── .env                    # Credenciais (NÃO comitar)
├── .env.example            # Template do .env
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Scripts npm
├── header.html             # Cabeçalho global
├── footer.html             # Rodapé global
├── main.js                 # Script global (tooltip, header/footer loader)
├── style.css               # Estilos globais
│
├── pages/                  # Páginas da aplicação
│   ├── index/              # Página inicial
│   ├── login/              # Login e cadastro
│   ├── busca/              # Busca de imóveis
│   ├── imovel/             # Detalhes do imóvel
│   ├── comparacao/         # Comparação de imóveis
│   ├── perfil/             # Perfil do vendedor
│   ├── painel/             # Painel do usuário
│   └── institucionais/     # Páginas institucionais
│
├── scripts/
│   ├── generate-site-config.js   # Gera site-config.js a partir do .env
│   ├── site-config.js            # Config gerado (NÃO comitar)
│   ├── supabase-client.js        # Inicializa cliente Supabase
│   └── supabase-schema.sql       # Schema do banco de dados
│
└── src/
    └── images/             # Imagens do site
```

## 🔐 Autenticação

O sistema usa **Supabase Auth** para gerenciar usuários:

### Cadastro

- Formulário em `pages/login/login.html` (aba "Cadastrar-se")
- Campos: nome, email, telefone, senha, tipo de conta (comprador/vendedor), CRECI (opcional)
- Metadata do usuário salvo em `auth.users.raw_user_meta_data`

### Login

- Formulário em `pages/login/login.html` (aba "Entrar")
- Após login bem-sucedido, redireciona para `pages/index/index.html`
- Token de sessão armazenado automaticamente pelo Supabase

### Logout

- Implementar chamada `supabase.auth.signOut()`

### Verificar usuário logado

```javascript
const {
  data: { user },
} = await supabase.auth.getUser();
if (user) {
  console.log("Usuário logado:", user.email);
  console.log("Metadata:", user.user_metadata);
} else {
  console.log("Usuário não logado");
}
```

## 💾 Trabalhando com o Banco de Dados

### Listar propriedades publicadas

```javascript
const { data, error } = await supabase
  .from("properties")
  .select("*")
  .eq("is_published", true)
  .order("created_at", { ascending: false });

if (error) console.error(error);
else console.log(data);
```

### Inserir nova propriedade

```javascript
const { data: user } = await supabase.auth.getUser();

const { data, error } = await supabase
  .from("properties")
  .insert({
    title: "Fazenda Exemplo",
    description: "Linda fazenda com 500 hectares",
    price: 5000000,
    city: "Cuiabá",
    state: "MT",
    aptidao: "pecuaria",
    property_type: "fazenda",
    area_ha: 500,
    owner: user.user.id,
    is_published: true,
  })
  .select();
```

### Favoritar imóvel

```javascript
const { data: user } = await supabase.auth.getUser();

const { error } = await supabase.from("favorites").insert({
  user_id: user.user.id,
  property_id: "<property-uuid>",
});
```

## 🎨 Customização

### Cores do tema

Edite as variáveis CSS em `style.css`:

```css
:root {
  --primary-color: #386641; /* Verde principal */
  --secondary-color: #a7c957; /* Verde claro */
  --accent-color: #bc6c25; /* Laranja/marrom */
  --text-color: #333333;
  --bg-light: #f8f7f4;
  --bg-white: #ffffff;
  --border-color: #dddddd;
}
```

### Header e Footer

- Edite `header.html` para alterar navegação
- Edite `footer.html` para alterar links do rodapé
- Ambos são carregados dinamicamente via `main.js`

## 🐛 Troubleshooting

### Erro: "Failed to load resource: 404" para site-config.js

**Causa**: O arquivo `scripts/site-config.js` não foi gerado.

**Solução**:

```bash
npm run gen-config
# ou
node scripts/generate-site-config.js
```

### Erro: "SUPABASE_URL ou SUPABASE_ANON_KEY não definidos"

**Causa**: O arquivo `.env` não está preenchido ou `site-config.js` não foi gerado.

**Solução**:

1. Verifique se `.env` tem valores corretos
2. Execute `npm run gen-config`
3. Reinicie o servidor

### Erro: "Refused to execute script... MIME type 'text/html'"

**Causa**: O servidor está servindo de uma pasta incorreta.

**Solução**:

- Se usando Live Server: abra a pasta `Para-imoveis` no VS Code (não a pasta pai)
- Se usando `npm start` ou Python: execute a partir da raiz do projeto

### Header/Footer não carregam (404)

**Causa**: Servidor não está na raiz do projeto ou caminhos incorretos.

**Solução**:

- Certifique-se de iniciar o servidor a partir de `Para-imoveis/`
- O arquivo `main.js` tenta múltiplos caminhos automaticamente como fallback

### Erro de CORS no Supabase

**Causa**: URL de origem não configurada no Supabase.

**Solução**:

1. Vá em Supabase → Authentication → Settings
2. Adicione `http://localhost:8000` e `http://127.0.0.1:5500` em **Site URL** e **Redirect URLs**

## 📦 Scripts Disponíveis

```bash
npm run gen-config    # Gera scripts/site-config.js a partir do .env
npm start             # Gera config + inicia servidor HTTP na porta 8000
```

## 🔒 Segurança

### Chaves sensíveis

- ✅ `SUPABASE_ANON_KEY`: Pode ser exposta no frontend (uso cliente)
- ❌ `SUPABASE_SERVICE_ROLE_KEY`: **NUNCA** exponha no frontend (apenas scripts backend/deploy)

### RLS (Row Level Security)

Todas as tabelas têm políticas RLS habilitadas:

- Usuários públicos: só leem anúncios publicados
- Usuários autenticados: gerenciam próprios anúncios/favoritos
- Owners: controle total sobre suas propriedades

### Arquivos ignorados (.gitignore)

```
.env
scripts/site-config.js
node_modules/
```

## 🚀 Deploy

### Opção 1: Supabase Storage (Recomendado para sites estáticos)

1. Crie um bucket público no Supabase Storage
2. Faça upload de todos os arquivos
3. Configure `window.SITE_BASE_URL` apontando para a URL pública do bucket

### Opção 2: Vercel / Netlify

1. Configure variáveis de ambiente no painel da plataforma
2. Adicione build command: `npm run gen-config`
3. Configure publish directory como raiz do projeto
4. Atualize as **Redirect URLs** no Supabase com a URL de produção

### Opção 3: Servidor próprio

1. Faça upload via FTP/SSH
2. Configure servidor web (Apache/Nginx) para servir arquivos estáticos
3. Execute `npm run gen-config` no servidor
4. Configure SSL (recomendado: Let's Encrypt)

## 📝 Próximos Passos

- [ ] Implementar busca avançada com filtros
- [ ] Adicionar upload de imagens para Storage do Supabase
- [ ] Criar sistema de mensagens entre compradores e vendedores
- [ ] Implementar comparação de imóveis
- [ ] Adicionar painel administrativo
- [ ] Implementar notificações por email (via Supabase Edge Functions)
- [ ] Adicionar mapas interativos (Leaflet/Google Maps)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

- **Leandr0CM** - [GitHub](https://github.com/Leandr0CM)

## 📞 Suporte

Para dúvidas ou problemas:

- Abra uma [Issue](https://github.com/Leandr0CM/Para-imoveis/issues)
- Entre em contato via email (adicionar seu email)

---

**Desenvolvido com ❤️ usando Supabase**
