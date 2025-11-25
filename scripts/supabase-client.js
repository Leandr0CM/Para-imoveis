// Inicializa o cliente Supabase no front-end
// Defina as variáveis globais antes de carregar este script se quiser evitar hardcoding:
//   window.SUPABASE_URL = 'https://<proj-ref>.supabase.co';
//   window.SUPABASE_ANON_KEY = '<anon-key>';

(function () {
  try {
    if (!window.supabase) {
      console.error(
        "Supabase SDK não encontrado. Verifique se o CDN foi carregado antes deste script."
      );
      return;
    }

    const SUPABASE_URL = window.SUPABASE_URL || "";
    const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.warn(
        "SUPABASE_URL ou SUPABASE_ANON_KEY não definidos. Autenticação não estará disponível até definir as credenciais."
      );
    }

    // Cria o cliente e expõe em window.__supabase_client para uso na aplicação
    window.__supabase_client = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
    // Conveniência: alias `window.supabaseClient` e `window.supabaseAuth`
    window.supabaseClient = window.__supabase_client;
    window.supabaseAuth = window.__supabase_client.auth;
  } catch (err) {
    console.error("Erro ao inicializar Supabase client:", err);
  }
})();
