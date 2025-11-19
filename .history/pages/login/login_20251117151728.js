document.addEventListener("DOMContentLoaded", async () => {
  // Seletores dos elementos
  const loginTabBtn = document.getElementById("auth-tab-login");
  const registerTabBtn = document.getElementById("auth-tab-register");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Verificação da configuração do Supabase
  console.log("Verificando configuração do Supabase...");
  console.log("SUPABASE_URL:", window.SUPABASE_URL);
  console.log("SUPABASE_ANON_KEY:", window.SUPABASE_ANON_KEY ? "✓ Configurada" : "✗ Não configurada");
  
  if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) {
    console.error("AVISO: Credenciais do Supabase não configuradas corretamente!");
  }
  
  // Testa a conexão com o Supabase
  try {
    const supabase = await getSupabase();
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.warn("Aviso ao verificar sessão:", error.message);
    } else {
      console.log("Conexão com Supabase estabelecida com sucesso!");
      if (data?.session) {
        console.log("Usuário já está logado:", data.session.user.email);
      }
    }
  } catch (err) {
    console.error("Erro ao conectar com Supabase:", err);
  }

  // --- 1. Lógica das Abas ---

  function showLogin() {
    loginTabBtn.classList.add("active");
    registerTabBtn.classList.remove("active");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  }

  function showRegister() {
    loginTabBtn.classList.remove("active");
    registerTabBtn.classList.add("active");
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }

  loginTabBtn.addEventListener("click", showLogin);
  registerTabBtn.addEventListener("click", showRegister);

  // Verifica se a URL tem #cadastro (vindo do botão "Cadastrar-se")
  if (window.location.hash === "#cadastro") {
    showRegister();
  }

  // --- 2. Lógica de exibição do CRECI ---
  const creciWrapper = document.getElementById("creci-field-wrapper");
  const tipoComprador = document.getElementById("tipo-comprador");
  const tipoVendedor = document.getElementById("tipo-vendedor");

  function toggleCreciField() {
    if (tipoVendedor.checked) {
      creciWrapper.style.display = "block";
    } else {
      creciWrapper.style.display = "none";
    }
  }

  tipoComprador.addEventListener("change", toggleCreciField);
  tipoVendedor.addEventListener("change", toggleCreciField);

  // --- 3. Submissão usando Supabase Auth ---
  async function getSupabase() {
    if (window.supabaseClient) return window.supabaseClient;
    if (window.__supabase_client) return window.__supabase_client;
    
    const errorMsg = [
      "Supabase não inicializado corretamente.",
      "Verifique se:",
      "1. O arquivo scripts/site-config.js foi carregado",
      "2. As variáveis SUPABASE_URL e SUPABASE_ANON_KEY estão definidas",
      "3. O arquivo scripts/supabase-client.js foi carregado após site-config.js"
    ].join("\n");
    
    throw new Error(errorMsg);
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-senha").value;

    // Validações básicas
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const supabase = await getSupabase();
      
      console.log("Tentando fazer login com:", { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Erro detalhado:", error);
        
        // Mensagens de erro mais específicas
        if (error.message.includes("Invalid login credentials")) {
          alert("E-mail ou senha incorretos. Por favor, verifique seus dados.");
        } else if (error.message.includes("Email not confirmed")) {
          alert("Por favor, confirme seu e-mail antes de fazer login.");
        } else if (error.status === 400) {
          alert("Erro de autenticação. Verifique se:\n1. A autenticação por email está habilitada no Supabase\n2. O projeto está ativo\n3. As credenciais estão corretas\n\nDetalhes: " + error.message);
        } else {
          alert("Erro no login: " + error.message);
        }
        return;
      }
      
      console.log("Login bem-sucedido:", data);
      // Login bem-sucedido
      alert("Login efetuado com sucesso!\nRedirecionando...");
      window.location.href = "../index/index.html";
    } catch (err) {
      console.error("Erro capturado:", err);
      alert("Erro ao tentar fazer login. Verifique o console para mais detalhes.");
    }
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Validação simples de senha
    const senha = document.getElementById("reg-senha").value;
    const senhaConfirm = document.getElementById("reg-senha-confirm").value;
    if (senha !== senhaConfirm) {
      alert("As senhas não conferem!");
      return;
    }

    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();
    const accountType = document.querySelector(
      'input[name="account-type"]:checked'
    ).value;
    const creci = document.getElementById("reg-creci").value.trim();

    try {
      const supabase = await getSupabase();
      // Cria conta (envia confirmação por e-mail se estiver habilitado no Supabase)
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            full_name: name,
            phone,
            account_type: accountType,
            creci: creci || null,
          },
        },
      });
      if (error) {
        alert("Erro no cadastro: " + error.message);
        return;
      }

      alert(
        "Cadastro realizado! Verifique seu e-mail para confirmar a conta (se aplicável)."
      );
      // Após cadastro, opcionalmente direcionar para uma página de confirmação
      window.location.href = "../index/index.html";
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar cadastrar. Verifique o console.");
    }
  });

  // --- 4. Simulação de "Esqueci Senha" ---
  document
    .getElementById("forgot-password-link")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const email = prompt("Digite seu e-mail para recuperação de senha:");
      if (email) {
        alert(`E-mail de recuperação enviado para ${email}! (Simulação)`);
      }
    });
});
