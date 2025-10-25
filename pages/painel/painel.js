// pages/painel/painel.js (Arquivo Unificado)

document.addEventListener('DOMContentLoaded', () => {

    // --- SIMULAÇÃO DE DADOS GLOBAIS DO USUÁRIO ---
    const mockUserData = {
        nome: "Carlos Silva",
        email: "carlos.silva@emailteste.com",
        telefone: "(41) 98765-4321",
        isAnunciante: true, // Define se ele tem perfil de vendedor
        perfilAnunciante: {
            nomePublico: "Carlos Silva - Corretor Rural",
            creci: "CRECI/PR F-98765",
            logoUrl: "https://via.placeholder.com/150/BC6C25/FFFFFF?text=CS",
            descricao: "Corretor especializado em fazendas na região metropolitana de Curitiba."
        },
        stats: {
            anunciosAtivos: 1, // Apenas 1 dos 2 está ativo nos mocks
            mensagensNaoLidas: 1,
            buscasSalvas: 3
        }
    };
    // --------------------------------------------------

    const pageId = document.body.id;

    // ===================================================================
    // RODA APENAS NA PÁGINA "VISÃO GERAL"
    // ===================================================================
    if (pageId === 'page-painel-geral') {
        console.log("Página de Visão Geral carregada.");

        // **** POPULAR DADOS ****
        const greetingElement = document.getElementById('user-name-greeting');
        const statAnuncios = document.getElementById('stat-anuncios');
        const statMensagens = document.getElementById('stat-mensagens');
        const statBuscas = document.getElementById('stat-buscas');

        if (greetingElement) greetingElement.textContent = mockUserData.nome;
        if (statAnuncios) statAnuncios.textContent = mockUserData.stats.anunciosAtivos;
        if (statMensagens) statMensagens.textContent = mockUserData.stats.mensagensNaoLidas;
        if (statBuscas) statBuscas.textContent = mockUserData.stats.buscasSalvas;
    }


    // ===================================================================
    // RODA APENAS NA PÁGINA "MEUS ANÚNCIOS"
    // ===================================================================
    else if (pageId === 'page-painel-anuncios') {
        // (Código dos anúncios permanece o mesmo de antes...)
        const mockAnuncios = [
            { id: 'anuncio-1', img: 'https://images.unsplash.com/photo-1596924036923-9e3d84f4756b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200&h=150&fit=crop', titulo: 'Fazenda Pronta para Pecuária', preco: 4500000, visualizacoes: 1250, contatos: 12, pausado: false },
            { id: 'anuncio-2', img: 'https://images.unsplash.com/photo-1444858291040-5c7f113a1eb1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200&h=150&fit=crop', titulo: 'Sítio para Agricultura Familiar', preco: 1200000, visualizacoes: 480, contatos: 5, pausado: true }
        ];
        const listaContainer = document.getElementById('lista-anuncios');

        function renderizarAnuncios() { /* ... (função igual a anterior) ... */ 
            if (!listaContainer) return;
            listaContainer.innerHTML = '';
            if (mockAnuncios.length === 0) {
                listaContainer.innerHTML = '<p>Você ainda não criou nenhum anúncio.</p>';
                return;
            }
            mockAnuncios.forEach(anuncio => {
                listaContainer.innerHTML += `
                    <div class="card-anuncio-gerencia ${anuncio.pausado ? 'paused' : ''}" id="${anuncio.id}">
                        <img class="anuncio-img" src="${anuncio.img}" alt="${anuncio.titulo}">
                        <div class="anuncio-info">
                            <h3>${anuncio.titulo}</h3>
                            <span class="anuncio-price">${anuncio.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                        <div class="anuncio-stats">
                            <span class="stat-item"><strong>Visualizações:</strong> ${anuncio.visualizacoes.toLocaleString('pt-BR')}</span>
                            <span class="stat-item"><strong>Contatos:</strong> ${anuncio.contatos}</span>
                        </div>
                        <div class="anuncio-controls">
                            <button class="btn btn-secondary btn-sm btn-editar-anuncio" data-id="${anuncio.id}">Editar</button>
                            <button class="btn btn-secondary btn-sm btn-pausar-anuncio" data-id="${anuncio.id}">${anuncio.pausado ? 'Reativar' : 'Pausar'}</button>
                            <button class="btn btn-danger btn-sm btn-excluir-anuncio" data-id="${anuncio.id}">Excluir</button>
                        </div>
                    </div>`;
            });
            attachEventListenersAnuncios();
        }
        function handlePausarAnuncio(event) {
             const cardId = event.currentTarget.dataset.id;
            const anuncio = mockAnuncios.find(a => a.id === cardId);
            if (anuncio) {
                anuncio.pausado = !anuncio.pausado;
                renderizarAnuncios();
            }
         }
        function handleExcluirAnuncio(event) {
            const cardId = event.currentTarget.dataset.id;
            const anuncio = mockAnuncios.find(a => a.id === cardId);
            if (anuncio && confirm(`Tem certeza que deseja EXCLUIR permanentemente o anúncio:\n"${anuncio.titulo}"?`)) {
                const index = mockAnuncios.findIndex(a => a.id === cardId);
                if (index > -1) mockAnuncios.splice(index, 1);
                renderizarAnuncios();
            }
        }
        function handleEditarAnuncio(event) {
            alert(`Simulação: Redirecionando para a página de edição do anúncio ID: ${event.currentTarget.dataset.id}`);
        }
        function attachEventListenersAnuncios() {
            listaContainer.querySelectorAll('.btn-pausar-anuncio').forEach(b => b.addEventListener('click', handlePausarAnuncio));
            listaContainer.querySelectorAll('.btn-excluir-anuncio').forEach(b => b.addEventListener('click', handleExcluirAnuncio));
            listaContainer.querySelectorAll('.btn-editar-anuncio').forEach(b => b.addEventListener('click', handleEditarAnuncio));
         }
        renderizarAnuncios();
    }


    // ===================================================================
    // RODA APENAS NA PÁGINA "MINHAS BUSCAS SALVAS"
    // ===================================================================
    else if (pageId === 'page-painel-buscas') {
        const mockBuscasSalvas = [
            { id: 'busca-1', titulo: 'Fazendas em Castro, PR', filtros: ['Tipo: Fazenda', 'Aptidão: Pecuária', 'Local: Castro, PR'] },
            { id: 'busca-2', titulo: 'Sítios com Rio', filtros: ['Tipo: Sítio', 'Recursos: Rio ou Córrego', 'Infra: Casa Sede'] },
            { id: 'busca-3', titulo: 'Chácaras de Lazer (Piscina)', filtros: ['Tipo: Chácara', 'Infra: Piscina', 'Infra: Internet'] }
        ];
        const listaContainer = document.getElementById('lista-buscas-salvas');

        function renderizarBuscas() {
            if (!listaContainer) return;
            listaContainer.innerHTML = '';
            if (mockBuscasSalvas.length === 0) {
                listaContainer.innerHTML = '<p>Você ainda não salvou nenhuma busca.</p>';
                return;
            }
            mockBuscasSalvas.forEach(busca => {
                let filtrosHTML = busca.filtros.map(f => `<span class="filtro-tag">${f}</span>`).join('');
                listaContainer.innerHTML += `
                    <div class="card-busca-salva" id="${busca.id}">
                        <div class="busca-info">
                            <h3>${busca.titulo}</h3>
                            <div class="busca-filtros">${filtrosHTML}</div>
                        </div>
                        <div class="busca-actions">
                            <button class="btn btn-primary btn-executar-busca" data-filtros="${busca.filtros.join(',')}">Executar Busca</button>
                            <button class="btn btn-secondary btn-excluir-busca" data-id="${busca.id}">Excluir</button>
                        </div>
                    </div>`;
            });
            attachEventListenersBuscas();
        }
        function handleExcluirBusca(event) {
            const cardId = event.currentTarget.dataset.id;
            const card = document.getElementById(cardId);
            if (card && confirm(`Tem certeza que deseja excluir a busca salva:\n"${card.querySelector('h3').textContent}"?`)) {
                const index = mockBuscasSalvas.findIndex(b => b.id === cardId);
                if (index > -1) mockBuscasSalvas.splice(index, 1);
                renderizarBuscas();
            }
        }
        function handleExecutarBusca(event) {
             alert(`Simulação: Redirecionando para a página de busca com os filtros: ${event.currentTarget.dataset.filtros}`);
        }
        function attachEventListenersBuscas() {
            listaContainer.querySelectorAll('.btn-excluir-busca').forEach(b => b.addEventListener('click', handleExcluirBusca));
            listaContainer.querySelectorAll('.btn-executar-busca').forEach(b => b.addEventListener('click', handleExecutarBusca));
        }
        renderizarBuscas();
    }


    // ===================================================================
    // RODA APENAS NA PÁGINA "MINHAS PERGUNTAS"
    // ===================================================================
    else if (pageId === 'page-painel-perguntas') {
         const mockPerguntasUsuario = [
            { id: 'q1', anuncioTitulo: 'Fazenda Pronta para Pecuária', anuncioLink: '/pages/imovel/imovel.html?id=prop1', pergunta: 'A documentação está em dia? Aceita permuta?', resposta: 'Olá! Sim, documentação 100%. No momento, apenas venda. Obrigado.', pendente: false },
            { id: 'q2', anuncioTitulo: 'Sítio para Agricultura Familiar', anuncioLink: '/pages/imovel/imovel.html?id=prop2', pergunta: 'O sinal de internet é fibra ótica ou rádio?', resposta: null, pendente: true },
            { id: 'q3', anuncioTitulo: 'Chácara de Lazer com Nascente', anuncioLink: '/pages/imovel/imovel.html?id=prop3', pergunta: 'A nascente é dentro do terreno? Está registrada?', resposta: 'Sim, são duas nascentes, ambas dentro do terreno e com registro no CAR.', pendente: false }
        ];
        const listaContainer = document.getElementById('lista-perguntas-usuario');

        function renderizarPerguntas() {
            if (!listaContainer) return;
            listaContainer.innerHTML = '';
            if (mockPerguntasUsuario.length === 0) {
                listaContainer.innerHTML = '<p>Você ainda não fez nenhuma pergunta.</p>';
                return;
            }
            mockPerguntasUsuario.forEach(item => {
                listaContainer.innerHTML += `
                    <div class="card-pergunta" id="pergunta-${item.id}">
                        <div class="pergunta-header">
                            <span>Você perguntou em:</span>
                            <a href="${item.anuncioLink}" target="_blank">${item.anuncioTitulo}</a>
                        </div>
                        <div class="qa-item">
                            <p class="qa-question"><strong>Sua Pergunta:</strong> ${item.pergunta}</p>
                            ${item.pendente ? '<p class="qa-answer pending">(Aguardando resposta do vendedor)</p>' : `<p class="qa-answer"><strong>Resposta do Vendedor:</strong> ${item.resposta}</p>`}
                        </div>
                    </div>`;
            });
        }
        renderizarPerguntas();
    }


    // ===================================================================
    // RODA APENAS NA PÁGINA "MEU PERFIL"
    // ===================================================================
    else if (pageId === 'page-painel-perfil') {
        console.log("Página 'Meu Perfil' carregada.");
        const toggle = document.getElementById('toggle-seller-profile');
        const sellerSection = document.getElementById('seller-profile-section');
        const logoUpload = document.getElementById('logo-upload');
        const logoPreview = document.getElementById('logo-preview');
        const perfilForm = document.getElementById('perfil-form');

        // **** POPULAR DADOS DO PERFIL ****
        document.getElementById('perfil-nome').value = mockUserData.nome;
        document.getElementById('perfil-email').value = mockUserData.email;
        document.getElementById('perfil-telefone').value = mockUserData.telefone;

        // Preenche dados do anunciante se existirem
        if (mockUserData.isAnunciante && mockUserData.perfilAnunciante) {
            toggle.checked = true;
            document.getElementById('perfil-nome-publico').value = mockUserData.perfilAnunciante.nomePublico;
            document.getElementById('perfil-creci').value = mockUserData.perfilAnunciante.creci;
            document.getElementById('perfil-descricao').value = mockUserData.perfilAnunciante.descricao;
            if (mockUserData.perfilAnunciante.logoUrl) {
                logoPreview.src = mockUserData.perfilAnunciante.logoUrl;
            }
        } else {
            toggle.checked = false;
        }

        // Função e listener para mostrar/esconder perfil de anunciante
        function updateSellerProfileVisibility() {
            sellerSection.style.display = toggle.checked ? 'block' : 'none';
        }
        updateSellerProfileVisibility(); // Chama ao carregar
        toggle.addEventListener('change', updateSellerProfileVisibility); // Chama na mudança

        // Listener para preview do logo
        logoUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => { logoPreview.src = e.target.result; }
                reader.readAsDataURL(file);
            }
        });

        // Listener para salvar (simulação)
        perfilForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const novaSenha = document.getElementById('perfil-senha-nova').value;
            const confirmaSenha = document.getElementById('perfil-senha-confirma').value;
            if (novaSenha && novaSenha !== confirmaSenha) {
                alert('Erro: As novas senhas não conferem!');
                return;
            }
            alert('Perfil salvo com sucesso! (Simulação)');
            // Aqui você coletaria os dados e enviaria para o backend
        });
    }

});
