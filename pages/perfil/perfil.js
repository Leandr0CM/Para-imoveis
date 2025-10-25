document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SIMULAÇÃO DE BANCO DE DADOS ---
    // Puxando os imóveis que já criamos
    const mockPropertyDatabase = {
        'prop1': {
            id: 'prop1',
            img: 'https://images.unsplash.com/photo-1596924036923-9e3d84f4756b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop',
            title: 'Fazenda Pronta para Pecuária',
            price: 4500000,
            location: 'Bocaiúva do Sul, PR',
            features: ['350 ha', 'Casa Sede', 'Curral', 'Rio']
        },
        'prop2': {
            id: 'prop2',
            img: 'https://images.unsplash.com/photo-1444858291040-5c7f113a1eb1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop',
            title: 'Sítio para Agricultura Familiar',
            price: 1200000,
            location: 'Castro, PR',
            features: ['40 ha', 'Casa Sede', 'Galpão', 'Energia Elétrica']
        },
        'prop3': {
            id: 'prop3',
            img: 'https://images.unsplash.com/photo-1620188463121-f018d0f1a4e2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop',
            title: 'Chácara de Lazer com Nascente',
            price: 890000,
            location: 'Quatro Barras, PR',
            features: ['5 ha', 'Casa de Hóspedes', 'Nascente', 'Internet']
        }
    };
    
    // Simulação de dados do Vendedor
    const mockSellerDatabase = {
        'imobiliaria_fazendas_sul': {
            name: 'Imobiliária Fazendas do Sul',
            creci: 'CRECI/PR F-12345',
            logo: 'https://via.placeholder.com/150/386641/FFFFFF?text=Logo',
            description: 'Especialistas em propriedades rurais na região sul do país. Com mais de 20 anos de experiência, conectamos compradores e vendedores com seriedade e transparência.',
            phone: '(41) 99999-8888',
            email: 'contato@fazendasdosul.com.br',
            // Lista de IDs dos imóveis deste vendedor
            listings: ['prop1', 'prop2', 'prop3'] 
        },
        'vendedor_particular_x': {
            name: 'João da Silva (Particular)',
            creci: 'Venda Particular',
            logo: 'https://via.placeholder.com/150/BC6C25/FFFFFF?text=JS',
            description: 'Proprietário vendendo diretamente.',
            phone: '(42) 98888-7777',
            email: 'joao.silva@email.com',
            listings: ['prop2'] // Este vendedor só tem 1 imóvel
        }
    };

    // --- 2. Lógica para carregar o perfil ---
    const urlParams = new URLSearchParams(window.location.search);

    // ***************************************************************
    // AQUI ESTÁ A CORREÇÃO:
    // Pega o ID da URL, OU usa 'imobiliaria_fazendas_sul' como padrão
    // se nenhum ID for encontrado (ex: ao abrir o arquivo direto).
    const sellerId = urlParams.get('id') || 'imobiliaria_fazendas_sul';
    // ***************************************************************

    const sellerData = mockSellerDatabase[sellerId];

    if (!sellerData) {
        // Esta mensagem agora só aparecerá se um ID inválido for passado (ex: ?id=banana)
        document.querySelector('.profile-page').innerHTML = '<h1>Vendedor não encontrado.</h1>';
        return;
    }

    // --- 3. Preenche as informações do Vendedor ---
    document.getElementById('profile-logo').src = sellerData.logo;
    document.getElementById('profile-logo').alt = `Logo de ${sellerData.name}`;
    document.getElementById('profile-name').textContent = sellerData.name;
    document.getElementById('profile-creci').textContent = sellerData.creci;
    document.getElementById('profile-description').textContent = sellerData.description;
    document.getElementById('profile-phone').textContent = sellerData.phone;
    document.getElementById('profile-email').textContent = sellerData.email;
    document.getElementById('listing-count').textContent = sellerData.listings.length;

    // --- 4. Preenche a Grade de Anúncios ---
    const grid = document.getElementById('profile-listings-grid');
    grid.innerHTML = '';

    if (sellerData.listings.length === 0) {
        grid.innerHTML = '<p>Este vendedor não possui anúncios ativos no momento.</p>';
        return;
    }

    sellerData.listings.forEach(propertyId => {
        const prop = mockPropertyDatabase[propertyId];
        if (prop) {
            // Reutiliza o componente .property-card
            const card = document.createElement('div');
            card.className = 'property-card';
            
            let featuresHTML = '';
            prop.features.forEach(f => {
                featuresHTML += `<span class="feature-tag">${f}</span>`;
            });

            card.innerHTML = `
                <img src="${prop.img}" alt="${prop.title}">
                <div class="card-content">
                    <span class="card-price">${prop.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    <h3>${prop.title}</h3>
                    <p class="card-location">${prop.location}</p>
                    <div class="card-features">
                        ${featuresHTML}
                    </div>
                    <a href="../imovel/imovel.html?id=${prop.id}" class="btn btn-secondary">Ver Detalhes</a>
                </div>
            `;
            grid.appendChild(card);
        }
    });
});
