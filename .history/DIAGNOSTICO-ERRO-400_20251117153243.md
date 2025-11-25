# 🔧 Guia de Diagnóstico - Erro 400 no Login

## Problema Identificado

Erro 400 (Bad Request) ao tentar fazer login com Supabase Auth.

## Causas Possíveis

### 1. ✅ Autenticação por Email não habilitada

**Mais provável** - O Supabase precisa ter a autenticação por email/senha explicitamente habilitada.

**Como verificar e corrigir:**

1. Acesse o Dashboard do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Authentication** → **Providers**
4. Verifique se **Email** está habilitado
5. Se não estiver, habilite e salve

### 2. 📧 Confirmação de Email Obrigatória

O Supabase pode estar configurado para exigir confirmação de email.

**Como verificar:**

1. No Dashboard do Supabase
2. Vá em **Authentication** → **Providers** → **Email**
3. Verifique a opção **"Confirm email"**
4. Se estiver marcada, os usuários precisam confirmar o email antes de fazer login

**Soluções:**

- Desabilitar confirmação de email (apenas para desenvolvimento)
- Implementar fluxo de confirmação de email na aplicação

### 3. 🔐 Políticas de Segurança (RLS)

Row Level Security pode estar bloqueando operações.

**Como verificar:**

1. Vá em **Authentication** → **Policies**
2. Verifique se há políticas restritivas
3. Para desenvolvimento, você pode desabilitar temporariamente

### 4. 🚫 Projeto Pausado ou Inativo

Projetos Supabase gratuitos podem ser pausados por inatividade.

**Como verificar:**

1. Vá ao Dashboard do Supabase
2. Verifique se há avisos sobre o status do projeto
3. Se pausado, clique em "Restore" ou "Resume"

### 5. ❌ Credenciais Incorretas

Verifique se as URLs e chaves estão corretas.

**Como verificar:**

1. No Dashboard: **Settings** → **API**
2. Compare:
   - **URL**: deve corresponder ao `SUPABASE_URL` no `.env`
   - **anon public**: deve corresponder ao `SUPABASE_ANON_KEY` no `.env`

### 6. 🌐 Problemas de CORS

Para aplicações web, o CORS precisa estar configurado.

**Como verificar:**

1. **Settings** → **API** → **API Settings**
2. Adicione suas URLs na lista de allowed origins
3. Para desenvolvimento local, adicione: `http://localhost:*` ou `http://127.0.0.1:*`

## 📋 Passo a Passo para Resolver

### Passo 1: Usar o Arquivo de Teste

1. Abra o arquivo `test-supabase.html` no navegador
2. Observe os resultados das verificações automáticas
3. Clique em "Testar Conexão" para verificar conectividade
4. Tente "Testar Cadastro" para criar um usuário de teste
5. Tente "Testar Login" para validar a autenticação

### Passo 2: Verificar Console do Navegador

1. Abra as DevTools (F12)
2. Vá na aba Console
3. Procure por mensagens de erro detalhadas
4. Anote qualquer informação sobre o erro 400

### Passo 3: Verificar Configuração do Supabase

1. Acesse https://app.supabase.com
2. Selecione seu projeto
3. Verifique cada item da lista de causas possíveis acima

### Passo 4: Testar na Página de Login

1. Abra `pages/login/login.html`
2. Tente fazer login
3. Observe as mensagens de erro mais detalhadas (código atualizado)
4. Verifique o console para logs adicionais

## 🔍 Diagnóstico Adicional

### Teste Manual da API

Você pode testar a API diretamente com curl:

```bash
# Teste de cadastro
curl -X POST "https://gqnwhfddcweidbfdcnad.supabase.co/auth/v1/signup" \
  -H "apikey: SEU_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","password":"Senha123!"}'

# Teste de login
curl -X POST "https://gqnwhfddcweidbfdcnad.supabase.co/auth/v1/token?grant_type=password" \
  -H "apikey: SEU_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@example.com","password":"Senha123!"}'
```

### Verificar Logs do Supabase

1. No Dashboard: **Logs** → **Auth Logs**
2. Procure por tentativas de login recentes
3. Verifique mensagens de erro específicas

## ✅ Melhorias Implementadas

### No arquivo `login.js`:

- ✅ Validação de campos antes de enviar
- ✅ Verificação de comprimento mínimo de senha
- ✅ Mensagens de erro mais específicas
- ✅ Logs detalhados no console
- ✅ Verificação de configuração ao carregar a página
- ✅ Teste de conexão automático

### Novo arquivo `test-supabase.html`:

- ✅ Página de diagnóstico completa
- ✅ Testes automatizados de conexão
- ✅ Testes de cadastro e login
- ✅ Interface visual para resultados
- ✅ Logs em tempo real

## 📝 Próximos Passos

1. **Abra o arquivo `test-supabase.html`** no navegador
2. **Execute todos os testes** e anote os resultados
3. **Acesse o Dashboard do Supabase** e verifique as configurações
4. **Se o erro persistir**, compartilhe:
   - Resultados dos testes do `test-supabase.html`
   - Mensagens de erro do console
   - Screenshots do Dashboard do Supabase (seção Authentication)

## 🆘 Checklist Rápido

- [ ] Autenticação por Email habilitada no Supabase?
- [ ] Projeto está ativo (não pausado)?
- [ ] URL e chaves corretas no `.env`?
- [ ] Arquivo `site-config.js` foi gerado?
- [ ] Console mostra algum erro específico?
- [ ] Teste de conexão no `test-supabase.html` funciona?
- [ ] Usuário já foi cadastrado no sistema?
- [ ] Confirmação de email necessária?

## 📚 Recursos Úteis

- [Documentação do Supabase Auth](https://supabase.com/docs/guides/auth)
- [Troubleshooting Auth](https://supabase.com/docs/guides/auth/troubleshooting)
- [Dashboard do Projeto](https://app.supabase.com/project/gqnwhfddcweidbfdcnad)
