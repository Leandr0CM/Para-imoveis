document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Seletores dos elementos ---
    const loginTabBtn = document.getElementById('auth-tab-login');
    const registerTabBtn = document.getElementById('auth-tab-register');
    const authTabs = document.querySelector('.auth-tabs'); // Novo seletor

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form'); // Novo seletor
    
    const forgotPasswordLink = document.getElementById('forgot-password-link'); // Seletor existente
    const backToLoginLink = document.getElementById('back-to-login-link'); // Novo seletor

    // --- 2. Funções de Exibição ---

    function showLogin() {
        // Aba
        loginTabBtn.classList.add('active');
        registerTabBtn.classList.remove('active');
        // Exibe as abas
        authTabs.style.display = 'flex';
        // Formulários
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
    }

    function showRegister() {
        // Aba
        loginTabBtn.classList.remove('active');
        registerTabBtn.classList.add('active');
        // Exibe as abas
        authTabs.style.display = 'flex';
        // Formulários
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        forgotPasswordForm.style.display = 'none';
    }

    function showForgotPassword() {
        // Esconde as abas
        authTabs.style.display = 'none';
        // Formulários
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
    }

    // --- 3. Event Listeners das Abas e Links ---
    loginTabBtn.addEventListener('click', showLogin);
    registerTabBtn.addEventListener('click', showRegister);
    
    // Substitui a lógica do prompt
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        showForgotPassword();
    });

    // Evento para o novo link "Voltar"
    backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });

    // Verifica se a URL tem #cadastro (vindo do botão "Cadastrar-se" de outra página)
    if (window.location.hash === '#cadastro') {
        showRegister();
    } else {
        // Garante que o login seja o padrão
        showLogin();
    }

    // --- 4. Lógica de exibição do CRECI (sem mudanças) ---
    const creciWrapper = document.getElementById('creci-field-wrapper');
    const tipoComprador = document.getElementById('tipo-comprador');
    const tipoVendedor = document.getElementById('tipo-vendedor');

    function toggleCreciField() {
        if (tipoVendedor.checked) {
            creciWrapper.style.display = 'block';
        } else {
            creciWrapper.style.display = 'none';
        }
    }

    if (tipoComprador) tipoComprador.addEventListener('change', toggleCreciField);
    if (tipoVendedor) tipoVendedor.addEventListener('change', toggleCreciField);

    // --- 5. Simulação de Submissão ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login efetuado com sucesso! (Simulação)\nRedirecionando para a Homepage...');
        window.location.href = 'index.html';
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Validação simples de senha
        const senha = document.getElementById('reg-senha').value;
        const senhaConfirm = document.getElementById('reg-senha-confirm').value;
        if (senha !== senhaConfirm) {
            alert('As senhas não conferem!');
            return;
        }
        alert('Cadastro realizado com sucesso! (Simulação)\nRedirecionando para a Homepage...');
        window.location.href = '../index/index.html';
    });
    
    // Nova simulação para o formulário de esqueci senha
    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('recovery-email').value;
        if (email) {
            alert(`E-mail de recuperação enviado para ${email}! (Simulação)`);
            showLogin(); // Volta para a tela de login após a simulação
        }
    });

});