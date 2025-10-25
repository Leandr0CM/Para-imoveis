document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SIMULAÇÃO DE BANCO DE DADOS ---
    const mockPropertyData = {
        'prop1': {
            id: 'prop1',
            img: 'https://images.unsplash.com/photo-1596924036923-9e3d84f4756b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop',
            title: 'Fazenda Pronta para Pecuária',
            price: 4500000,
            area: 350,
            aptidao: 'Pecuária',
            topografia: 'Ondulada',
            hidricos_sim: ['Rio', 'Nascente'],
            hidricos_nao: ['Poço Artesiano'],
            infra_sim: ['Casa Sede', 'Curral', 'Cercada', 'Energia Elétrica'],
            infra_nao: ['Galpão', 'Internet']
        },
        'prop2': {
            id: 'prop2',
            img: 'https://images.unsplash.com/photo-1444858291040-5c7f113a1eb1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop',
            title: 'Sítio para Agricultura Familiar',
            price: 1200000,
            area: 40,
            aptidao: 'Agricultura',
            topografia: 'Plana',
            hidricos_sim: ['Poço Artesiano'],
            hidricos_nao: ['Rio', 'Nascente', 'Açude'],
            infra_sim: ['Casa Sede', 'Galpão', 'Energia Elétrica', 'Internet'],
            infra_nao: ['Curral', 'Cercada', 'Piscina']
        },
        'prop3': {
            id: 'prop3',
            img: 'https://images.unsplash.com/photo-1620188463121-f018d0f1a4e2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop',
            title: 'Chácara de Lazer com Nascente',
            price: 890000,
            area: 5,
            aptidao: 'Lazer',
            topografia: 'Levemente Ondulada',
            hidricos_sim: ['Nascente', 'Açude'],
            hidricos_nao: [],
            infra_sim: ['Internet', 'Piscina'],
            infra_nao: ['Curral', 'Galpão']
        }
    };
    
    // Lista de todas as infraestruturas possíveis para comparar
    const allInfra = ['Casa Sede', 'Curral', 'Galpão', 'Cercada', 'Energia Elétrica', 'Internet', 'Casa de Hóspedes', 'Piscina'];
    const allHidricos = ['Rio', 'Nascente', 'Poço Artesiano', 'Açude'];

    // --- 2. Lógica para buscar dados e construir a tabela ---
    const headerRow = document.getElementById('comparison-header-row');
    const tableBody = document.getElementById('comparison-body');

    // Pega os IDs da URL (ex: "prop1,prop2")
    const urlParams = new URLSearchParams(window.location.search);
    const idsToCompare = (urlParams.get('ids') || '').split(',');

    if (idsToCompare.length === 0 || idsToCompare[0] === '') {
        tableBody.innerHTML = '<tr><td colspan="2">Nenhum imóvel selecionado para comparação. Volte à página de busca e selecione pelo menos 2 imóveis.</td></tr>';
        return;
    }

    // Filtra nosso "banco de dados" falso
    const properties = idsToCompare
        .map(id => mockPropertyData[id])
        .filter(Boolean); // Filtra qualquer ID inválido

    // --- 3. Constrói o Cabeçalho (Cards dos Imóveis) ---
    properties.forEach(prop => {
        const th = document.createElement('th');
        th.innerHTML = `
            <div class="comparison-card">
                <img src="${prop.img}" alt="${prop.title}">
                <h4>${prop.title}</h4>
                <span class="card-price">${prop.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                <a href="/pages/imovel/imovel.html?id=${prop.id}" class="btn btn-secondary">Ver Detalhes</a>
            </div>
        `;
        headerRow.appendChild(th);
    });

    // --- 4. Constrói o Corpo (Linhas de Características) ---
    
    // Função helper para formatar moeda
    const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    // Preço
    let priceRow = '<tr><td><strong>Preço Total</strong></td>';
    properties.forEach(p => priceRow += `<td>${formatCurrency(p.price)}</td>`);
    priceRow += '</tr>';
    tableBody.innerHTML += priceRow;
    
    // Área
    let areaRow = '<tr><td><strong>Área Total</strong></td>';
    properties.forEach(p => areaRow += `<td>${p.area} ha</td>`);
    areaRow += '</tr>';
    tableBody.innerHTML += areaRow;

    // Preço por Hectare
    let priceHaRow = '<tr><td><strong>Preço / ha</strong></td>';
    properties.forEach(p => {
        const pricePerHa = p.price / p.area;
        priceHaRow += `<td>${formatCurrency(pricePerHa)}</td>`;
    });
    priceHaRow += '</tr>';
    tableBody.innerHTML += priceHaRow;
    
    // Aptidão
    let aptidaoRow = '<tr><td><strong>Aptidão Principal</strong></td>';
    properties.forEach(p => aptidaoRow += `<td>${p.aptidao}</td>`);
    aptidaoRow += '</tr>';
    tableBody.innerHTML += aptidaoRow;

    // --- Linha de Topografia ---
    let topografiaRow = '<tr><td><strong>Topografia</strong></td>';
    properties.forEach(p => topografiaRow += `<td>${p.topografia}</td>`);
    topografiaRow += '</tr>';
    tableBody.innerHTML += topografiaRow;

    // --- (Recursos Hídricos) ---
    // Adiciona a classe 'collapsible' e o atributo 'data-toggle'
    let hidricosHeader = `
        <tr class="section-header-row collapsible" data-toggle="hidricos-group">
            <td colspan="100%">
                Recursos Hídricos
                <i class="fa-solid fa-chevron-down toggle-icon"></i>
            </td>
        </tr>`;
    tableBody.innerHTML += hidricosHeader;
    
    allHidricos.forEach(item => {
        // Adiciona a classe 'hidricos-group' a cada linha de dados
        let row = `<tr class="hidricos-group"><td>${item}</td>`;
        properties.forEach(p => {
            if (p.hidricos_sim.includes(item)) {
                row += '<td><span class="infra-list-compare check"><i class="fa-solid fa-check"></i> Sim</span></td>';
            } else if (p.hidricos_nao.includes(item)) {
                row += '<td><span class="infra-list-compare cross"><i class="fa-solid fa-times"></i> Não</span></td>';
            } else {
                row += '<td><span class="infra-list-compare na"><i class="fa-solid fa-minus"></i> N/I</span></td>';
            }
        });
        row += '</tr>';
        tableBody.innerHTML += row;
    });

    // Adiciona a classe 'collapsible' e o atributo 'data-toggle'
    let infraHeader = `
        <tr class="section-header-row collapsible" data-toggle="infra-group">
            <td colspan="100%">
                Infraestrutura
                <i class="fa-solid fa-chevron-down toggle-icon"></i>
            </td>
        </tr>`;
    tableBody.innerHTML += infraHeader;

    allInfra.forEach(item => {
        // Adiciona a classe 'infra-group' a cada linha de dados
        let row = `<tr class="infra-group"><td>${item}</td>`;
        properties.forEach(p => {
            if (p.infra_sim.includes(item)) {
                row += '<td><span class="infra-list-compare check"><i class="fa-solid fa-check"></i> Sim</span></td>';
            } else if (p.infra_nao.includes(item)) {
                row += '<td><span class="infra-list-compare cross"><i class="fa-solid fa-times"></i> Não</span></td>';
            } else {
                row += '<td><span class="infra-list-compare na"><i class="fa-solid fa-minus"></i> N/I</span></td>';
            }
        });
        row += '</tr>';
        tableBody.innerHTML += row;
    });


    // --- 5. ADICIONADO: Lógica de Colapso (Minimizar) ---
    function initializeCollapsibleSections() {
        const tableBody = document.getElementById('comparison-body');
        
        // Usa event delegation no corpo da tabela
        tableBody.addEventListener('click', (event) => {
            // Encontra o cabeçalho clicável mais próximo
            const headerRow = event.target.closest('.collapsible');
            if (!headerRow) return; // Não clicou em um cabeçalho colapsável

            // Pega o nome do grupo (ex: "hidricos-group")
            const groupName = headerRow.dataset.toggle;
            // Encontra todas as linhas de conteúdo daquele grupo
            const contentRows = tableBody.querySelectorAll(`.${groupName}`);
            
            // Alterna o estado (aberto/fechado) no cabeçalho
            const isCollapsed = headerRow.classList.toggle('collapsed');
            
            // Adiciona/Remove a classe 'hidden' de todas as linhas de conteúdo
            contentRows.forEach(row => {
                row.classList.toggle('hidden', isCollapsed);
            });
        });
    }

    // --- 6. CHAMADA DA NOVA FUNÇÃO ---
    initializeCollapsibleSections();

});
