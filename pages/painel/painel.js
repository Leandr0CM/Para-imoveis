document.addEventListener('DOMContentLoaded', () => {

    const pageId = document.body.id;

    // --- INÍCIO: CARREGAMENTO DA SIDEBAR ---
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');

    if (sidebarPlaceholder) {
        // ATUALIZADO: Agora busca 'sidebar.html' em vez de 'painel-sidebar.html'
        fetch('sidebar.html') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Não foi possível carregar o sidebar.html');
                }
                return response.text();
            })
            .then(data => {
                sidebarPlaceholder.innerHTML = data;
                
                // Lógica Genérica para ativar o link correto na sidebar
                // Funciona para qualquer ID no formato "page-NOME" (ex: page-geral -> geral.html)
                if (pageId.startsWith('page-')) {
                    const pageName = pageId.replace('page-', ''); // Remove 'page-' sobra 'geral', 'anuncio', etc.
                    const targetHref = `${pageName}.html`; 
                    
                    // Procura o link que tenha o href exato
                    const activeLink = sidebarPlaceholder.querySelector(`nav a[href="${targetHref}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao buscar a sidebar:', error);
                sidebarPlaceholder.innerHTML = '<p style="padding: 1rem 1.5rem; color: red;">Erro ao carregar menu.</p>';
            });
    }
    // --- FIM: SIDEBAR ---


    // --- SIMULAÇÃO DE DADOS GLOBAIS DO USUÁRIO ---
    const mockUserData = {
        nome: "Carlos Silva",
        email: "carlos.silva@emailteste.com",
        telefone: "(41) 98765-4321",
        isAnunciante: true,
        perfilAnunciante: {
            nomePublico: "Carlos Silva - Corretor Rural",
            creci: "CRECI/PR F-98765",
            logoUrl: "https://via.placeholder.com/150/BC6C25/FFFFFF?text=CS",
            descricao: "" 
        },
        stats: {
            anunciosAtivos: 1, 
            mensagensNaoLidas: 1,
            buscasSalvas: 3
        }
    };


    // ===================================================================
    // RODA APENAS NA PÁGINA "VISÃO GERAL" (ID: page-geral)
    // ===================================================================
    if (pageId === 'page-geral') {
        console.log("Página de Visão Geral carregada.");

        // Popular saudação
        const greetingElement = document.getElementById('user-name-greeting');
        if (greetingElement) greetingElement.textContent = mockUserData.nome;

        // --- MOCKS DE DADOS (Visão Geral) ---

        const mockConversas = [
            { id: 'c1', nome: 'Imobiliária Terra Forte', anuncioTitulo: 'Fazenda Pronta para Pecuária', preview: 'Olá! Sim, documentação 100%.', unread: true },
            { id: 'c2', nome: 'João da Silva (Vendedor)', anuncioTitulo: 'Sítio para Agricultura Familiar', preview: 'A internet aqui é via rádio...', unread: false },
            { id: 'c3', nome: 'Ana Pereira', anuncioTitulo: 'Chácara de Lazer com Nascente', preview: 'Obrigada pelo retorno!', unread: false }
        ];
        
        const mockAnuncios = [
            { id: 'anuncio-1', img: 'https://images.unsplash.com/photo-1596924036923-9e3d84f4756b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200&h=150&fit=crop', titulo: 'Fazenda Pronta para Pecuária', preco: 4500000, visualizacoes: 1250, favoritos: 28, pausado: false },
            { id: 'anuncio-2', img: 'https://images.unsplash.com/photo-1444858291040-5c7f113a1eb1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200&h=150&fit=crop', titulo: 'Sítio para Agricultura Familiar', preco: 1200000, visualizacoes: 480, favoritos: 15, pausado: true }
        ];

        const mockBuscasSalvas = [
            { id: 'busca-1', titulo: 'Fazendas em Castro, PR', filtros: ['Fazenda', 'Pecuária', 'Castro, PR'] },
            { id: 'busca-2', titulo: 'Sítios com Rio', filtros: ['Sítio', 'Rio ou Córrego', 'Casa Sede'] },
            { id: 'busca-3', titulo: 'Chácaras de Lazer (Piscina)', filtros: ['Chácara', 'Piscina', 'Internet'] }
        ];

        const mockFavoritos = [
            { id: 'fav-1', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&w=100&h=100&fit=crop', titulo: 'Chácara Vale Verde', preco: 350000 },
            { id: 'fav-2', img: 'https://images.unsplash.com/photo-1595877244574-e90ce41ce089?ixlib=rb-4.0.3&w=100&h=100&fit=crop', titulo: 'Sítio Santa Fé', preco: 890000 }
        ];

        // --- LÓGICA DO MODAL DE EXCLUSÃO ---
        const modalOverlay = document.getElementById('confirm-delete-modal');
        const modalMessage = document.getElementById('modal-delete-message');
        const modalConfirmBtn = document.getElementById('modal-btn-confirm-delete');
        const modalCancelBtn = document.getElementById('modal-btn-cancel');
        
        function fecharModal() {
            modalOverlay.classList.remove('active');
            modalOverlay.dataset.idToDelete = ''; 
            modalOverlay.dataset.typeToDelete = '';
        }

        function confirmarExclusao() {
            const id = modalOverlay.dataset.idToDelete; 
            const type = modalOverlay.dataset.typeToDelete;

            if (id && type) {
                if (type === 'busca') {
                    const index = mockBuscasSalvas.findIndex(b => b.id === id);
                    if (index > -1) {
                        mockBuscasSalvas.splice(index, 1);
                        renderizarBuscas(); 
                    }
                } else if (type === 'favorito') {
                    const index = mockFavoritos.findIndex(f => f.id === id);
                    if (index > -1) {
                        mockFavoritos.splice(index, 1);
                        renderFavoritos(); 
                    }
                }
            }
            fecharModal(); 
        }

        if(modalConfirmBtn) modalConfirmBtn.addEventListener('click', confirmarExclusao);
        if(modalCancelBtn) modalCancelBtn.addEventListener('click', fecharModal);
        if(modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) fecharModal(); });


        // --- WIDGET 1: MENSAGENS NÃO LIDAS ---
        function renderMensagensNaoLidas() {
            const container = document.getElementById('widget-mensagens-nao-lidas');
            if(!container) return;
            
            const mensagensNaoLidas = mockConversas.filter(c => c.unread);

            if (mensagensNaoLidas.length === 0) {
                container.innerHTML = '<p class="widget-empty-state">Nenhuma mensagem não lida no momento.</p>';
                return;
            }

            let html = '<ul class="widget-list">';
            mensagensNaoLidas.forEach(msg => {
                // ATUALIZADO: Link para mensagens.html
                html += `
                    <li class="widget-list-item widget-item-message">
                        <div class="message-info">
                            <p><strong>${msg.nome}</strong></p>
                            <p>"${msg.preview}"</p>
                        </div>
                        <a href="mensagens.html?conversa=${msg.id}" class="btn btn-primary btn-sm">Responder</a>
                    </li>
                `;
            });
            html += '</ul>';
            container.innerHTML = html;
        }

        // --- WIDGET 2: BUSCAS SALVAS ---
        function renderizarBuscas() {
            const container = document.getElementById('lista-buscas-salvas-geral'); 
            if (!container) return;
            container.innerHTML = '';
            
            if (mockBuscasSalvas.length === 0) {
                container.innerHTML = '<p class="widget-empty-state" style="padding: 0 1.5rem 1.5rem;">Você ainda não salvou nenhuma busca.</p>';
                return;
            }
            mockBuscasSalvas.forEach(busca => {
                let filtrosHTML = busca.filtros.map(f => `<span class="filtro-tag">${f}</span>`).join('');
                container.innerHTML += `
                    <div class="card-busca-salva" id="${busca.id}">
                        <div class="busca-info">
                            <h3>${busca.titulo}</h3>
                            <div class="busca-filtros">${filtrosHTML}</div>
                        </div>
                        <div class="busca-actions">
                            <button class="btn btn-primary btn-executar-busca" data-filtros="${busca.filtros.join(',')}">Executar Busca</button>
                            <button class="btn btn-danger btn-sm btn-icon btn-excluir-busca" data-id="${busca.id}" title="Excluir Busca">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>`;
            });
            
            container.querySelectorAll('.btn-excluir-busca').forEach(b => {
                b.addEventListener('click', (e) => {
                    const id = e.currentTarget.dataset.id;
                    const item = mockBuscasSalvas.find(i => i.id === id);
                    if (item) {
                        modalMessage.textContent = `Tem certeza que deseja excluir a busca: "${item.titulo}"?`;
                        modalOverlay.dataset.idToDelete = id;
                        modalOverlay.dataset.typeToDelete = 'busca';
                        modalOverlay.classList.add('active');
                    }
                });
            });
            container.querySelectorAll('.btn-executar-busca').forEach(b => {
                b.addEventListener('click', (e) => alert(`Simulação: Buscando por ${e.currentTarget.dataset.filtros}`));
            });
        }

        // --- WIDGET 3: FAVORITOS ---
        function renderFavoritos() {
            const container = document.getElementById('widget-favoritos');
            if (!container) return;

            if (mockFavoritos.length === 0) {
                container.innerHTML = '<p class="widget-empty-state">Você ainda não favoritou nenhum imóvel.</p>';
                return;
            }

            let html = '<ul class="widget-list">';
            mockFavoritos.forEach(fav => {
                html += `
                    <li class="widget-item-favorito" id="${fav.id}">
                        <img src="${fav.img}" alt="${fav.titulo}" class="favorito-thumb">
                        <div class="favorito-info">
                            <h3>${fav.titulo}</h3>
                            <span class="favorito-price">${fav.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                        <div class="favorito-actions">
                            <a href="#" class="btn btn-primary btn-sm" title="Ver Anúncio">Ver</a>
                            <button class="btn btn-danger btn-sm btn-icon btn-remover-favorito" data-id="${fav.id}" title="Remover">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </li>
                `;
            });
            html += '</ul>';
            container.innerHTML = html;

            container.querySelectorAll('.btn-remover-favorito').forEach(b => {
                b.addEventListener('click', (e) => {
                    const id = e.currentTarget.dataset.id;
                    const item = mockFavoritos.find(i => i.id === id);
                    if (item) {
                        modalMessage.textContent = `Remover "${item.titulo}" dos favoritos?`;
                        modalOverlay.dataset.idToDelete = id;
                        modalOverlay.dataset.typeToDelete = 'favorito'; 
                        modalOverlay.classList.add('active');
                    }
                });
            });
        }

        // --- WIDGET 4: RESUMO DOS ANÚNCIOS ---
        function renderResumoAnuncios() {
            const container = document.getElementById('widget-resumo-anuncios');
            if(!container) return;
            
            if (mockAnuncios.length === 0) {
                container.innerHTML = '<p class="widget-empty-state">Você ainda não possui anúncios.</p>';
                return;
            }

            let html = '<ul class="widget-list">';
            mockAnuncios.forEach(anuncio => {
                const statusLabel = anuncio.pausado ? '<span class="paused-label">PAUSADO</span>' : 'Ativo';
                // ATUALIZADO: Link para anuncio.html
                html += `
                    <li class="widget-list-item widget-item-anuncio">
                        <div class="anuncio-icon-widget">
                            <i class="fa-solid fa-house-chimney"></i>
                        </div>
                        <div class="anuncio-info-widget">
                            <h3>${anuncio.titulo}</h3>
                            <span class="anuncio-stats">
                                ${statusLabel} | 
                                <i class="fa-solid fa-eye"></i> ${anuncio.visualizacoes} | 
                                <i class="fa-solid fa-star"></i> ${anuncio.favoritos} 
                            </span>
                        </div>
                        <div class="anuncio-controls-widget">
                             <a href="anuncio.html" class="btn btn-secondary btn-sm">Gerenciar</a>
                        </div>
                    </li>
                `;
            });
            html += '</ul>';
            container.innerHTML = html;
        }

        // --- WIDGET 5: DICAS RÁPIDAS ---
        function renderDicasRapidas() {
            const container = document.getElementById('widget-dicas-rapidas');
            if(!container) return;

            let html = `
                <ul class="widget-list">
                    <li class="widget-list-item widget-item-dica">
                        <i class="fa-solid fa-camera"></i>
                        <a href="#">Como tirar as melhores fotos para seu anúncio</a>
                    </li>
                    <li class="widget-list-item widget-item-dica">
                        <i class="fa-solid fa-file-signature"></i>
                        <a href="#">Entenda a documentação rural (CAR, ITR)</a>
                    </li>
                    <li class="widget-list-item widget-item-dica">
                        <i class="fa-solid fa-shield-halved"></i>
                        <a href="#">Dicas de segurança para negociar</a>
                    </li>
                </ul>
            `;
            container.innerHTML = html;
        }


        // --- INICIALIZAÇÃO ---
        renderMensagensNaoLidas();
        renderizarBuscas(); 
        renderFavoritos();
        renderResumoAnuncios();
        renderDicasRapidas();
    }


    // ===================================================================
    // RODA APENAS NA PÁGINA "MEUS ANÚNCIOS" (ID: page-anuncio)
    // ===================================================================
    else if (pageId === 'page-anuncio') {
        
        const mockAnuncios = [
            { id: 'anuncio-1', img: 'https://images.unsplash.com/photo-1596924036923-9e3d84f4756b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200&h=150&fit=crop', titulo: 'Fazenda Pronta para Pecuária', preco: 4500000, visualizacoes: 1250, favoritos: 28, pausado: false },
            { id: 'anuncio-2', img: 'https://images.unsplash.com/photo-1444858291040-5c7f113a1eb1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=200&h=150&fit=crop', titulo: 'Sítio para Agricultura Familiar', preco: 1200000, visualizacoes: 480, favoritos: 15, pausado: true }
        ];
        const listaContainer = document.getElementById('lista-anuncios');

        function renderizarAnuncios() { 
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
                            <span class="stat-item"><strong>Favoritos:</strong> ${anuncio.favoritos}</span>
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
    // RODA APENAS NA PÁGINA "MENSAGENS" (ID: page-mensagens)
    // ===================================================================
    else if (pageId === 'page-mensagens') {
        
        const mockConversas = [
            { id: 'c1', nome: 'Imobiliária Terra Forte', anuncioTitulo: 'Fazenda Pronta para Pecuária', preview: 'Olá! Sim, documentação 100%.', unread: true },
            { id: 'c2', nome: 'João da Silva (Vendedor)', anuncioTitulo: 'Sítio para Agricultura Familiar', preview: 'A internet aqui é via rádio...', unread: false },
            { id: 'c3', nome: 'Ana Pereira', anuncioTitulo: 'Chácara de Lazer com Nascente', preview: 'Obrigada pelo retorno!', unread: false }
        ];

        const mockHistoricoMensagens = {
            'c1': [
                { tipo: 'recebida', texto: 'Olá, tenho interesse no anúncio "Fazenda Pronta para Pecuária". A documentação está em dia? Aceita permuta?' },
                { tipo: 'enviada', texto: 'Olá! Sim, documentação 100%. No momento, apenas venda. Obrigado.' }
            ],
            'c2': [
                { tipo: 'enviada', texto: 'Bom dia, o sinal de internet no "Sítio para Agricultura Familiar" é fibra ótica ou rádio?' },
                { tipo: 'recebida', texto: 'Bom dia! A internet aqui é via rádio, mas funciona bem, 30mb.' }
            ],
            'c3': [
                { tipo: 'enviada', texto: 'A nascente da "Chácara de Lazer" é dentro do terreno? Está registrada?' },
                { tipo: 'recebida', texto: 'Sim, são duas nascentes, ambas dentro do terreno e com registro no CAR.' },
                { tipo: 'enviada', texto: 'Perfeito, muito obrigada pela informação.' },
                { tipo: 'recebida', texto: 'Obrigada pelo retorno!' }
            ]
        };

        const listaContainer = document.getElementById('conversa-lista');
        const chatPlaceholder = document.getElementById('chat-placeholder');
        const chatJanela = document.getElementById('chat-janela');
        const chatHeader = document.getElementById('chat-header');
        const historicoContainer = document.getElementById('mensagens-historico');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        
        let conversaAtivaId = null;

        function renderizarConversas() {
            if (!listaContainer) return;
            
            const itemAtivo = listaContainer.querySelector('.conversa-item.active');
            const idAtivo = itemAtivo ? itemAtivo.dataset.id : null;

            listaContainer.innerHTML = '';
            
            mockConversas.forEach(conversa => {
                const unreadClass = conversa.unread ? 'unread' : ''; 
                listaContainer.innerHTML += `
                    <div class="conversa-item ${unreadClass}" data-id="${conversa.id}">
                        <h3>${conversa.nome}</h3>
                        <p>${conversa.preview}</p>
                    </div>
                `;
            });
            attachEventListenersConversas();

            if (idAtivo) {
                const novoItemAtivo = listaContainer.querySelector(`.conversa-item[data-id="${idAtivo}"]`);
                if (novoItemAtivo) {
                    novoItemAtivo.classList.add('active');
                }
            }
        }

        function renderizarHistorico(conversaId) {
            conversaAtivaId = conversaId;
            const conversa = mockConversas.find(c => c.id === conversaId);
            const historico = mockHistoricoMensagens[conversaId] || [];

            if (conversa) {
                conversa.unread = false; 
                renderizarConversas(); 
            }
            
            chatPlaceholder.style.display = 'none';
            chatJanela.style.display = 'flex';

            chatHeader.innerHTML = `
                <h3>${conversa.nome}</h3>
                <p>Referente a: ${conversa.anuncioTitulo}</p>
            `;

            historicoContainer.innerHTML = '';
            historico.forEach(msg => {
                historicoContainer.innerHTML += `
                    <div class="msg-bolha ${msg.tipo}">
                        ${msg.texto}
                    </div>
                `;
            });

            historicoContainer.scrollTop = historicoContainer.scrollHeight;
        }

        function handleEnviarMensagem(e) {
            e.preventDefault();
            const texto = chatInput.value.trim();
            if (texto === '' || !conversaAtivaId) return;

            historicoContainer.innerHTML += `
                <div class="msg-bolha enviada">
                    ${texto}
                </div>
            `;
            mockHistoricoMensagens[conversaAtivaId].push({ tipo: 'enviada', texto: texto });
            chatInput.value = '';
            historicoContainer.scrollTop = historicoContainer.scrollHeight;
            chatInput.focus();
        }

        function attachEventListenersConversas() {
            listaContainer.querySelectorAll('.conversa-item').forEach(item => {
                item.addEventListener('click', () => {
                    listaContainer.querySelectorAll('.conversa-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    renderizarHistorico(item.dataset.id);
                });
            });
        }

        chatForm.addEventListener('submit', handleEnviarMensagem);
        renderizarConversas();
    }


    // ===================================================================
    // RODA APENAS NA PÁGINA "MEU PERFIL" (ID: page-perfil)
    // ===================================================================
    else if (pageId === 'page-perfil') {
        console.log("Página 'Meu Perfil' carregada.");
        
        const isPremium = true; 
        const perfilForm = document.getElementById('perfil-form');
        const formFields = perfilForm.querySelectorAll('input, textarea');
        const sellerSection = document.getElementById('seller-profile-section');
        const toggleSeller = document.getElementById('toggle-seller-profile');
        const editButton = document.getElementById('edit-profile-btn');
        const saveButton = document.getElementById('save-profile-btn');
        const cancelButton = document.getElementById('cancel-profile-btn');
        const changeLogoBtn = document.getElementById('change-logo-btn');
        const headerNome = document.getElementById('perfil-header-nome');
        const headerEmail = document.getElementById('perfil-header-email');
        const premiumBadge = document.getElementById('premium-badge');
        const logoPreview = document.getElementById('logo-preview');
        const logoUpload = document.getElementById('logo-upload');

        function popularDados() {
            const userData = mockUserData; 
            headerNome.textContent = userData.nome;
            headerEmail.textContent = userData.email;
            premiumBadge.textContent = isPremium ? 'Usuário Premium' : 'Usuário Padrão';
            if (userData.perfilAnunciante && userData.perfilAnunciante.logoUrl) {
                logoPreview.src = userData.perfilAnunciante.logoUrl;
            } else {
                logoPreview.src = "https://via.placeholder.com/150/EEEEEE/AAAAAA?text=Logo";
            }
            document.getElementById('perfil-nome').value = userData.nome;
            document.getElementById('perfil-email').value = userData.email;
            document.getElementById('perfil-telefone').value = userData.telefone;
            
            toggleSeller.checked = userData.isAnunciante;
            if (userData.isAnunciante && userData.perfilAnunciante) {
                sellerSection.style.display = 'block';
                document.getElementById('perfil-nome-publico').value = userData.perfilAnunciante.nomePublico;
                document.getElementById('perfil-creci').value = userData.perfilAnunciante.creci;
                document.getElementById('perfil-descricao').value = userData.perfilAnunciante.descricao;
            } else {
                sellerSection.style.display = 'none';
            }
        }
        function toggleEditMode(isEditing) {
            if (isEditing) {
                formFields.forEach(field => field.disabled = false);
                editButton.style.display = 'none';
                document.getElementById('form-actions').style.display = 'flex';
                changeLogoBtn.style.display = 'inline-block';
                logoUpload.disabled = false;
            } else {
                formFields.forEach(field => field.disabled = true);
                editButton.style.display = 'inline-block';
                document.getElementById('form-actions').style.display = 'none';
                changeLogoBtn.style.display = 'none';
                logoUpload.disabled = true;
            }
        }
        
        editButton.addEventListener('click', () => toggleEditMode(true));
        cancelButton.addEventListener('click', () => {
            if (confirm('Descartar alterações?')) {
                popularDados(); 
                toggleEditMode(false); 
            }
        });
        perfilForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Perfil salvo com sucesso! (Simulação)');
            
            mockUserData.nome = document.getElementById('perfil-nome').value;
            mockUserData.email = document.getElementById('perfil-email').value;
            mockUserData.telefone = document.getElementById('perfil-telefone').value;
            mockUserData.isAnunciante = document.getElementById('toggle-seller-profile').checked;
            if (mockUserData.isAnunciante) {
                mockUserData.perfilAnunciante.nomePublico = document.getElementById('perfil-nome-publico').value;
                mockUserData.perfilAnunciante.creci = document.getElementById('perfil-creci').value;
                mockUserData.perfilAnunciante.descricao = document.getElementById('perfil-descricao').value;
            }
            
            headerNome.textContent = mockUserData.nome;
            headerEmail.textContent = mockUserData.email;
            
            toggleEditMode(false);
        });
        logoUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => { logoPreview.src = e.target.result; }
                reader.readAsDataURL(file);
            }
        });
        toggleSeller.addEventListener('change', () => {
            sellerSection.style.display = toggleSeller.checked ? 'block' : 'none';
        });

        popularDados(); 
        toggleEditMode(false); 
    }


    // ===================================================================
    // RODA APENAS NA PÁGINA "CONFIGURAÇÕES" (ID: page-configuracoes)
    // ===================================================================
    else if (pageId === 'page-configuracoes') {
        console.log("Página de Configurações carregada.");
    }

});