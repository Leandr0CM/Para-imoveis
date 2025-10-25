document.addEventListener('DOMContentLoaded', () => {

    // Seletores dos elementos
    const loginTabBtn = document.getElementById('auth-tab-login');
    const registerTabBtn = document.getElementById('auth-tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // --- 1. Lógica das Abas ---

    function showLogin() {
        loginTabBtn.classList.add('active');
        registerTabBtn.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }

    function showRegister() {
        loginTabBtn.classList.remove('active');
        registerTabBtn.classList.add('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }

    loginTabBtn.addEventListener('click', showLogin);
    registerTabBtn.addEventListener('click', showRegister);

    // Verifica se a URL tem #cadastro (vindo do botão "Cadastrar-se")
    if (window.location.hash === '#cadastro') {
        showRegister();
    }

    // --- 2. Lógica de exibição do CRECI ---
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

    tipoComprador.addEventListener('change', toggleCreciField);
    tipoVendedor.addEventListener('change', toggleCreciField);

    // --- 3. Simulação de Submissão ---
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
    
    // --- 4. Simulação de "Esqueci Senha" ---
    document.getElementById('forgot-password-link').addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt('Digite seu e-mail para recuperação de senha:');
        if (email) {
            alert(`E-mail de recuperação enviado para ${email}! (Simulação)`);
        }
    });

});
