// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Lógica para pegar dados da URL (vindo da Homepage) ---
    const urlParams = new URLSearchParams(window.location.search);
    
    const tipoParam = urlParams.get('tipo');
    const aptidaoParam = urlParams.get('aptidao');
    const localParam = urlParams.get('local');

    // Preenche os campos de filtro com os dados da URL
    if (tipoParam) {
        document.getElementById('tipo-detalhado').value = tipoParam;
    }
    if (aptidaoParam) {
        document.getElementById('aptidao-detalhada').value = aptidaoParam;
    }
    if (localParam) {
        document.getElementById('localizacao-detalhada').value = localParam;
    }

    // --- 2. Simulação de Filtros, Mapa e "Salvar Busca" ---

    // Simulação de "Salvar Busca"
    const saveSearchBtn = document.getElementById('save-search-btn');
    if (saveSearchBtn) {
        saveSearchBtn.addEventListener('click', () => {
            alert('Busca salva com sucesso!\n(Funcionalidade completa para usuários logados).');
        });
    }

    // Simulação de "Aplicar Filtros"
    const detailedForm = document.getElementById('detailed-search-form');
    if (detailedForm) {
        detailedForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Novos filtros aplicados. Recarregando lista de imóveis...');
            alert('Filtros aplicados!\n(A lista de resultados e o mapa seriam atualizados agora).');
        });
    }

    // Simulação do Toggle de Mapa/Satélite
    const mapBtn = document.getElementById('map-toggle-map');
    const satBtn = document.getElementById('map-toggle-satellite');
    const mapContainer = document.getElementById('map-container');

    if (mapBtn && satBtn && mapContainer) {
        mapBtn.addEventListener('click', () => {
            mapBtn.classList.add('active');
            satBtn.classList.remove('active');
            mapContainer.querySelector('p').textContent = 'Visualização de MAPA ativada.';
        });

        satBtn.addEventListener('click', () => {
            satBtn.classList.add('active');
            mapBtn.classList.remove('active');
            mapContainer.querySelector('p').textContent = 'Visualização de SATÉLITE ativada.';
        });
    }


    // --- 3. DADOS MOCK (Substituindo o HTML estático) ---
    const mockProperties = [
        {
            id: 'prop1',
            imgSrc: 'https://images.unsplash.com/photo-1596924036923-9e3d84f4756b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop',
            price: 4500000,
            title: 'Fazenda Pronta para Pecuária',
            location: 'Bocaiúva do Sul, PR',
            features: ['350 ha', 'Casa Sede', 'Curral', 'Rio'],
            hasVideoDrone: true,
            isGeoreferenced: false,
            hasCAR: true,
            hasOutorgaAgua: false,
            hasAnaliseSolo: false
        },
        {
            id: 'prop2',
            imgSrc: 'https://images.unsplash.com/photo-1444858291040-5c7f113a1eb1?ixlib-rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop',
            price: 1200000,
            title: 'Sítio para Agricultura Familiar',
            location: 'Castro, PR',
            features: ['40 ha', 'Casa Sede', 'Galpão', 'Energia Elétrica'],
            hasVideoDrone: false,
            isGeoreferenced: false,
            hasCAR: false,
            hasOutorgaAgua: false,
            hasAnaliseSolo: true
        },
        {
            id: 'prop3',
            imgSrc: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib-rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop',
            price: 8900000,
            title: 'Grande Fazenda para Soja',
            location: 'Ponta Grossa, PR',
            features: ['750 ha', 'Silo', 'Barracão', 'Alojamento'],
            hasVideoDrone: true,
            isGeoreferenced: true,
            hasCAR: true,
            hasOutorgaAgua: true,
            hasAnaliseSolo: true
        },
        {
            id: 'prop4',
            imgSrc: 'https://via.placeholder.com/600x400/cccccc/888888?text=Chacara+Lazer',
            price: 850000,
            title: 'Chácara de Lazer Completa',
            location: 'Campina Grande do Sul, PR',
            features: ['5 ha', 'Piscina', 'Casa Sede', 'Salão de Festas'],
            hasVideoDrone: false,
            isGeoreferenced: false,
            hasCAR: false,
            hasOutorgaAgua: false,
            hasAnaliseSolo: false
        },
        {
            id: 'prop5',
            imgSrc: 'https://via.placeholder.com/600x400/cccccc/888888?text=Arrendamento+Pasto',
            price: 70, // Preço fictício para arrendamento
            priceSuffix: ' R$/cab/mês', // Sufixo para arrendamento
            title: 'Arrendamento Pasto Rotacionado',
            location: 'Lapa, PR',
            features: ['200 ha', 'Piquetes', 'Bebedouros', 'Mangueira'],
            hasVideoDrone: false,
            isGeoreferenced: true,
            hasCAR: true,
            hasOutorgaAgua: false,
            hasAnaliseSolo: false
        }
    ];

    // --- 4. FUNÇÃO PARA RENDERIZAR OS RESULTADOS ---
    function renderResults(properties) {
        const resultsList = document.querySelector('.results-list');
        if (!resultsList) {
            console.error('Elemento .results-list não encontrado.');
            return;
        }

        resultsList.innerHTML = ''; // Limpa a lista antes de renderizar

        if (properties.length === 0) {
            resultsList.innerHTML = '<p>Nenhum imóvel encontrado com estes filtros.</p>';
            return;
        }

        properties.forEach(prop => {
            // Formata o preço
            const priceDisplay = prop.priceSuffix
                ? prop.price.toLocaleString('pt-BR') + prop.priceSuffix
                : prop.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            // Gera tags de feature
            const featuresHTML = prop.features.map(f => `<span class="feature-tag">${f}</span>`).join('');

            // Gera ícones extras
            let iconsHTML = '';
            if (prop.hasVideoDrone) iconsHTML += `<i class="fa-solid fa-helicopter" title="Vídeo Drone Disponível"></i>`;
            if (prop.isGeoreferenced) iconsHTML += `<i class="fa-solid fa-map-location-dot" title="Georreferenciado (INCRA)"></i>`;
            if (prop.hasCAR) iconsHTML += `<i class="fa-solid fa-file-shield" title="CAR OK/Validado"></i>`;
            if (prop.hasOutorgaAgua) iconsHTML += `<i class="fa-solid fa-droplet" title="Outorga D'água"></i>`;
            if (prop.hasAnaliseSolo) iconsHTML += `<i class="fa-solid fa-flask-vial" title="Análise de Solo Disponível"></i>`;

            // Gera o HTML completo do card
            const cardHTML = `
                <div class="property-card" data-id="${prop.id}">
                    
                    <div class="card-favorite-toggle" title="Adicionar aos Favoritos" data-id="${prop.id}">
                        <i class="fa-regular fa-star"></i>
                    </div>

                    <div class="card-extra-icons">
                        ${iconsHTML}
                    </div>
                    <img src="${prop.imgSrc}" alt="${prop.title}">
                    <div class="card-content">
                        <span class="card-price">${priceDisplay}</span>
                        <h3>${prop.title}</h3>
                        <p class="card-location">${prop.location}</p>
                        <div class="card-features">
                            ${featuresHTML}
                        </div>
                        <div class="card-actions">
                            <a href="/pages/imovel/imovel.html?id=${prop.id}" class="btn btn-secondary">Ver Detalhes</a>
                            <div class="compare-control">
                                <label for="compare-${prop.id}">Comparar</label>
                                <input type="checkbox" class="compare-checkbox" id="compare-${prop.id}" data-id="${prop.id}">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            resultsList.innerHTML += cardHTML;
        });
    }

    // --- 5. FUNÇÃO PARA ATUALIZAR A CONTAGEM ---
    function updateResultsCount(count) {
        const resultsHeader = document.querySelector('.results-header h3');
        if(resultsHeader) {
            if (count > 0) {
                resultsHeader.textContent = `${count} imóvel(is) encontrado(s)`;
            } else {
                resultsHeader.textContent = 'Nenhum imóvel encontrado';
            }
        }
    }


    // --- 6. Lógica da Barra de Comparação (MOVIDA PARA UMA FUNÇÃO) ---
    function initializeComparisonLogic() {
        const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
        const comparisonBar = document.getElementById('comparison-bar');
        const comparisonCount = document.getElementById('comparison-count');
        const compareButton = document.getElementById('compare-button');
        
        // Se não houver elementos (página pode não ter), saia
        if (!comparisonBar || !comparisonCount || !compareButton) return;

        let selectedForComparison = [];
        const maxCompare = 4; // Limite de 4 imóveis

        compareCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const propertyId = checkbox.dataset.id;
                
                if (checkbox.checked) {
                    // Adiciona ao array
                    if (selectedForComparison.length < maxCompare) {
                        selectedForComparison.push(propertyId);
                    } else {
                        // Impede a seleção se já atingiu o máximo
                        checkbox.checked = false;
                        alert(`Você só pode comparar até ${maxCompare} imóveis por vez.`);
                    }
                } else {
                    // Remove do array
                    selectedForComparison = selectedForComparison.filter(id => id !== propertyId);
                }

                // Atualiza a barra flutuante
                updateComparisonBar();
            });
        });

        function updateComparisonBar() {
            const count = selectedForComparison.length;
            
            if (count > 0) {
                comparisonCount.textContent = `${count} imóvel(is) selecionado(s) para comparar.`;
                comparisonBar.classList.add('visible');
            } else {
                comparisonBar.classList.remove('visible');
            }
        }

        // Ação do botão "Comparar Agora"
        compareButton.addEventListener('click', () => {
            if (selectedForComparison.length < 2) {
                alert('Por favor, selecione pelo menos 2 imóveis para comparar.');
                return;
            }
            
            // Redireciona para a página de comparação 
            const idsQuery = selectedForComparison.join(',');
            window.location.href = `../comparacao/comparacao.html?ids=${idsQuery}`;
        });
    }

    // --- 7. Lógica do Toggle de Layout (Lista/Grade) ---
    const btnList = document.getElementById('btn-layout-list');
    const btnGrid = document.getElementById('btn-layout-grid');
    const resultsListContainer = document.querySelector('.results-list'); // Renomeado para clareza

    if (btnList && btnGrid && resultsListContainer) {
        
        btnList.addEventListener('click', () => {
            resultsListContainer.classList.remove('view-grid');
            btnList.classList.add('active');
            btnGrid.classList.remove('active');
        });

        btnGrid.addEventListener('click', () => {
            resultsListContainer.classList.add('view-grid');
            btnGrid.classList.add('active');
            btnList.classList.remove('active');
        });
    }

    // --- 8. ADICIONADO: Lógica de Favoritos ---
    function initializeFavoriteLogic() {
        // Usa event delegation no container dos resultados
        const resultsList = document.querySelector('.results-list');
        if (!resultsList) return;

        resultsList.addEventListener('click', (event) => {
            const favoriteBtn = event.target.closest('.card-favorite-toggle');
            
            // Se o clique não foi no botão de favorito, ignora
            if (!favoriteBtn) return;

            const icon = favoriteBtn.querySelector('i');
            const propertyId = favoriteBtn.dataset.id;
            
            // Toggle a classe 'active' no botão
            const isActive = favoriteBtn.classList.toggle('active');

            if (isActive) {
                // Muda para estrela cheia
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                favoriteBtn.setAttribute('title', 'Remover dos Favoritos');
                console.log(`Propriedade ${propertyId} ADICIONADA aos favoritos.`);
                // (Aqui iria a lógica para salvar no localStorage ou enviar ao backend)
            } else {
                // Volta para estrela vazia
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                favoriteBtn.setAttribute('title', 'Adicionar aos Favoritos');
                console.log(`Propriedade ${propertyId} REMOVIDA dos favoritos.`);
                // (Aqui iria a lógica para remover)
            }
        });
    }


    // --- 9. CHAMADA INICIAL PARA RENDERIZAR ---
    renderResults(mockProperties);
    updateResultsCount(mockProperties.length);
    
    // IMPORTANTE: Inicializa as lógicas DEPOIS que os cards foram renderizados
    initializeComparisonLogic();
    initializeFavoriteLogic(); // Chama a nova função

});
