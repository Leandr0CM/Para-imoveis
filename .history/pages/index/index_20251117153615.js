// ===============================================
// === DADOS MOCK PARA OS CARROSSÉIS (INDEX) ===
// ===============================================
const mockPecuariaDestaques = [
    { id: 'pec1', imgSrc: 'https://images.unsplash.com/photo-1596924036923-9e3d84f4756b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop', badge: 'Destaque', price: 4500000, title: 'Fazenda Pronta para Pecuária', location: 'Bocaiúva do Sul, PR', features: ['350 ha', 'Casa Sede', 'Curral'], link: '/pages/imovel/imovel.html', hasVideoDrone: true, isGeoreferenced: true, hasCAR: true },
    { id: 'pec2', imgSrc: 'https://images.unsplash.com/photo-1593452095210-2f61a19f074b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop', badge: null, price: 950000, title: 'Sítio Leiteiro Equipado', location: 'Carambeí, PR', features: ['25 ha', 'Curral Leite', 'Resfriador'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: false, hasCAR: true },
    { id: 'pec3', imgSrc: 'https://via.placeholder.com/600x400/4a7c59/ffffff?text=Fazenda+Gado+Corte', badge: null, price: 6200000, title: 'Fazenda Gado de Corte', location: 'Tibagi, PR', features: ['480 ha', 'Mangueira', 'Balança'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: true, hasCAR: true },
    { id: 'pec4', imgSrc: 'https://via.placeholder.com/600x400/4a7c59/ffffff?text=Sitio+Ovelhas', badge: 'Oportunidade', price: 750000, title: 'Sítio Ovinocultura', location: 'Palmeira, PR', features: ['30 ha', 'Aprisco', 'Pasto Cercado'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: false, hasCAR: false },
    { id: 'pec5', imgSrc: 'https://via.placeholder.com/600x400/4a7c59/ffffff?text=Area+Pasto+Rotacionado', badge: null, price: 2100000, title: 'Área Pasto Rotacionado', location: 'Lapa, PR', features: ['120 ha', 'Piquetes', 'Bebedouros'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: true, hasCAR: true },
    { id: 'pec6', imgSrc: 'https://via.placeholder.com/600x400/4a7c59/ffffff?text=Fazenda+Confinamento', badge: null, price: 10500000, title: 'Estrutura Confinamento Bovino', location: 'Arapoti, PR', features: ['150 ha', 'Galpões Confin.', 'Fábrica Ração'], link: '/pages/imovel/imovel.html', hasVideoDrone: true, isGeoreferenced: true, hasCAR: true },
    { id: 'pec7', imgSrc: 'https://via.placeholder.com/600x400/4a7c59/ffffff?text=Sitio+Haras', badge: 'Destaque', price: 3200000, title: 'Sítio Haras Formado', location: 'São Luiz do Purunã, PR', features: ['20 ha', 'Baias', 'Pista Treino'], link: '/pages/imovel/imovel.html', hasVideoDrone: true, isGeoreferenced: false, hasCAR: true },
    { id: 'pec8', imgSrc: 'https://via.placeholder.com/600x400/4a7c59/ffffff?text=Fazenda+Leite+A2', badge: null, price: 8800000, title: 'Fazenda Leite A2 Certificada', location: 'Witmarsum, PR', features: ['200 ha', 'Ordenha Robotizada', 'Tanque 10mil L'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: true, hasCAR: true },
];

const mockAgriculturaDestaques = [
    { id: 'agr1', imgSrc: 'https://images.unsplash.com/photo-1444858291040-5c7f113a1eb1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop', badge: null, price: 1200000, title: 'Sítio para Agricultura Familiar', location: 'Castro, PR', features: ['40 ha', 'Casa Sede', 'Galpão'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: false, hasCAR: true },
    { id: 'agr2', imgSrc: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600&h=400&fit=crop', badge: 'Destaque', price: 7800000, title: 'Fazenda de Soja Produtiva', location: 'Ponta Grossa, PR', features: ['500 ha', 'Silo', 'Barracão'], link: '/pages/imovel/imovel.html', hasVideoDrone: true, isGeoreferenced: true, hasCAR: true, hasAnaliseSolo: true },
    { id: 'agr3', imgSrc: 'https://via.placeholder.com/600x400/8b7355/ffffff?text=Area+Plantio+Milho', badge: null, price: 5500000, title: 'Área Plana para Plantio', location: 'Ipiranga, PR', features: ['250 ha', 'Terra Roxa', 'Acesso Fácil'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: true, hasCAR: true },
    { id: 'agr4', imgSrc: 'https://via.placeholder.com/600x400/8b7355/ffffff?text=Sitio+Hortifruti', badge: 'Novo', price: 680000, title: 'Sítio Hortifruti c/ Estufa', location: 'Mandirituba, PR', features: ['15 ha', 'Estufa', 'Irrigação'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: false, hasCAR: false, hasOutorgaAgua: true },
    { id: 'agr5', imgSrc: 'https://via.placeholder.com/600x400/8b7355/ffffff?text=Fazenda+Trigo', badge: 'Destaque', price: 9100000, title: 'Fazenda de Trigo Irrigada', location: 'Guarapuava, PR', features: ['600 ha', 'Pivô Central', 'Sede Completa'], link: '/pages/imovel/imovel.html', hasVideoDrone: true, isGeoreferenced: true, hasCAR: true, hasOutorgaAgua: true },
    { id: 'agr6', imgSrc: 'https://via.placeholder.com/600x400/8b7355/ffffff?text=Sitio+Organico', badge: null, price: 1500000, title: 'Sítio Orgânico Certificado', location: 'Contenda, PR', features: ['18 ha', 'Pomar Orgânico', 'Casa Colonial'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: false, hasCAR: true },
    { id: 'agr7', imgSrc: 'https://via.placeholder.com/600x400/8b7355/ffffff?text=Fazenda+Cafe', badge: null, price: 12000000, title: 'Fazenda Café Especial', location: 'Norte Pioneiro, PR', features: ['180 ha', 'Terreiro Concreto', 'Secador'], link: '/pages/imovel/imovel.html', hasVideoDrone: true, isGeoreferenced: true, hasCAR: true },
    { id: 'agr8', imgSrc: 'https://via.placeholder.com/600x400/8b7355/ffffff?text=Area+Plantio+Batata', badge: 'Oportunidade', price: 4300000, title: 'Área Plantio Batata/Cebola', location: 'Irati, PR', features: ['90 ha', 'Solo Corrigido', 'Próx. Rodovia'], link: '/pages/imovel/imovel.html', hasVideoDrone: false, isGeoreferenced: true, hasCAR: true, hasAnaliseSolo: true },
];

const mockArrendamentoDestaques = [
    { id: 'arr1', imgSrc: 'https://via.placeholder.com/600x400/6b8e9e/ffffff?text=Area+Arrendar+Soja', badge: 'Destaque', price: 80, priceSuffix: ' sc/ha/ano', title: 'Área para Arrendar - Soja/Milho', location: 'Maripá, PR', features: ['300 ha', 'Terra Plana', 'Contrato 5 anos'], link: '/pages/imovel/imovel.html', isGeoreferenced: true, hasCAR: true },
    { id: 'arr2', imgSrc: 'https://via.placeholder.com/600x400/6b8e9e/ffffff?text=Pasto+Arrendar+Gado', badge: null, price: 50, priceSuffix: ' R$/cab/mês', title: 'Pasto para Arrendar - Bovinos', location: 'Rio Negro, PR', features: ['150 ha', 'Cercado', 'Água encanada'], link: '/pages/imovel/imovel.html', hasCAR: true },
    { id: 'arr3', imgSrc: 'https://via.placeholder.com/600x400/6b8e9e/ffffff?text=Chacara+Arrendar', badge: 'Novo', price: 2500, priceSuffix: ' R$/mês', title: 'Chácara para Arrendar - Lazer', location: 'São José dos Pinhais, PR', features: ['2 ha', 'Casa Mobiliada', 'Piscina'], link: '/pages/imovel/imovel.html' },
    { id: 'arr4', imgSrc: 'https://via.placeholder.com/600x400/6b8e9e/ffffff?text=Area+Arrendar+Reflorestamento', badge: null, price: 1500, priceSuffix: ' R$/ha/ano', title: 'Área p/ Arrendar - Eucalipto', location: 'Cerro Azul, PR', features: ['80 ha', 'Acesso Estrada', 'Topografia Mista'], link: '/pages/imovel/imovel.html', hasCAR: true },
    { id: 'arr5', imgSrc: 'https://via.placeholder.com/600x400/6b8e9e/ffffff?text=Fazenda+Arrendar+Cana', badge: null, price: 90, priceSuffix: ' ton/alq/ano', title: 'Fazenda Arrendamento Cana', location: 'Umuarama, PR', features: ['400 ha', 'Próx. Usina', 'Contrato Longo'], link: '/pages/imovel/imovel.html', isGeoreferenced: true, hasCAR: true },
    { id: 'arr6', imgSrc: 'https://via.placeholder.com/600x400/6b8e9e/ffffff?text=Sitio+Arrendar+Cavalo', badge: 'Destaque', price: 3500, priceSuffix: ' R$/mês', title: 'Sítio Arrendar Centro Treinamento', location: 'Balsa Nova, PR', features: ['10 ha', 'Redondel', 'Piquetes'], link: '/pages/imovel/imovel.html' },
    { id: 'arr7', imgSrc: 'https://via.placeholder.com/600x400/6b8e9e/ffffff?text=Area+Arrendar+Pinus', badge: null, price: 1200, priceSuffix: ' R$/ha/ano', title: 'Área Arrendar p/ Pinus', location: 'Jaguariaíva, PR', features: ['200 ha', 'Fácil Acesso', 'Relevo Suave'], link: '/pages/imovel/imovel.html', hasCAR: true },
    { id: 'arr8', imgSrc: 'https://via.placeholder.com/600x400/6b8e9e/ffffff?text=Area+Arrendar+Hortifruti', badge: null, price: 4000, priceSuffix: ' R$/mês', title: 'Área c/ Estufa p/ Arrendar', location: 'Araucária, PR', features: ['5 ha', 'Estufas Prontas', 'Irrigação ok'], link: '/pages/imovel/imovel.html', hasOutorgaAgua: true },
];


// ===============================================
// === LÓGICA DOS CARROSSÉIS TEMÁTICOS (INDEX) ===
// ===============================================

const carouselWrappers = document.querySelectorAll('.carousel-wrapper');

if (carouselWrappers.length > 0) {
    console.log(`[INIT] Encontrados ${carouselWrappers.length} carrosséis.`);

    // --- Função para Renderizar Cards ---
    function renderCards(gridElement, dataArray) {
        gridElement.innerHTML = ''; // Limpa o container ANTES de adicionar
        if (!dataArray || dataArray.length === 0) {
            gridElement.innerHTML = '<p>Nenhum imóvel em destaque no momento.</p>';
            return false;
        }
        dataArray.forEach(cardData => {
            // REMOVIDO: badgeHTML
            const featuresHTML = cardData.features.map(f => `<span class="feature-tag">${f}</span>`).join('');
            const priceDisplay = cardData.priceSuffix ? cardData.price.toLocaleString('pt-BR') + cardData.priceSuffix : cardData.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

             // Gera HTML dos Ícones
            let iconsHTML = '';
            if (cardData.hasVideoDrone) iconsHTML += `<i class="fa-solid fa-helicopter" title="Vídeo Drone Disponível"></i>`;
            if (cardData.isGeoreferenced) iconsHTML += `<i class="fa-solid fa-map-location-dot" title="Georreferenciado (INCRA)"></i>`;
            if (cardData.hasCAR) iconsHTML += `<i class="fa-solid fa-file-shield" title="CAR OK/Validado"></i>`;
            if (cardData.hasOutorgaAgua) iconsHTML += `<i class="fa-solid fa-droplet" title="Outorga D'água"></i>`;
            if (cardData.hasAnaliseSolo) iconsHTML += `<i class="fa-solid fa-flask-vial" title="Análise de Solo Disponível"></i>`;

            const cardHTML = `
                <div class="property-card" data-id="${cardData.id}">
                    <div class="card-extra-icons">${iconsHTML}</div>
                    <img src="${cardData.imgSrc}" alt="${cardData.title}">
                    <div class="card-content">
                        <span class="card-price">${priceDisplay}</span>
                        <h3>${cardData.title}</h3>
                        <p class="card-location">${cardData.location}</p>
                        <div class="card-features">
                            ${featuresHTML}
                        </div>
                        <a href="${cardData.link}" class="btn btn-secondary">Ver Detalhes</a>
                    </div>
                </div>`;
            gridElement.innerHTML += cardHTML;
        });
        return true;
    }


    // --- Função para inicializar UM carrossel específico ---
    function initializeCarousel(wrapper) {
        const carousel = wrapper.querySelector('.carousel-container');
        const listingsGrid = wrapper.querySelector('.listings-grid');
        const prevBtn = wrapper.querySelector('.carousel-btn.prev');
        const nextBtn = wrapper.querySelector('.carousel-btn.next');
        const carouselId = carousel ? carousel.id || 'sem ID' : 'ERRO_NO_CAROUSEL';

        if (!carousel || !listingsGrid || !prevBtn || !nextBtn) { console.error('Wrapper incompleto:', wrapper); return; }

        // --- Passo A: Renderizar Cards ---
        let dataToRender = [];
        if (carouselId === 'carouselPecuaria') dataToRender = mockPecuariaDestaques;
        else if (carouselId === 'carouselAgricultura') dataToRender = mockAgriculturaDestaques;
        else if (carouselId === 'carouselArrendamento') dataToRender = mockArrendamentoDestaques;
        const hasCards = renderCards(listingsGrid, dataToRender);
        if (!hasCards) { prevBtn.style.display = 'none'; nextBtn.style.display = 'none'; return; }
        // console.log(`[${carouselId}] Cards renderizados.`);

        // --- Passo B: Lógica do Carrossel Infinito ---
        const originalCards = Array.from(listingsGrid.children); // Pega os cards RENDERIZADOS
        const cardCount = originalCards.length;
        const clonesCount = Math.min(cardCount, 3);
        let cardWidth = 0;
        let isTransitioning = false;
        let initialScrollCompleted = false;

        // 1. Clonar Cards (baseado nos originais renderizados)
        // Adiciona clones do fim no início
        for (let i = 0; i < clonesCount; i++) { if (cardCount - 1 - i >= 0) { const clone = originalCards[cardCount - 1 - i].cloneNode(true); clone.classList.add('clone', 'clone-start'); listingsGrid.insertBefore(clone, listingsGrid.firstChild); } }
        // Adiciona clones do início no fim
        for (let i = 0; i < clonesCount; i++) { if (i < cardCount) { const clone = originalCards[i].cloneNode(true); clone.classList.add('clone', 'clone-end'); listingsGrid.appendChild(clone); } }

        // 2. Calcular Largura e Posição Inicial
        function calculateCardWidthAndPosition() {
             const firstOriginalCard = listingsGrid.querySelector('.property-card:not(.clone)'); if (!firstOriginalCard) return;
             const cardStyle = window.getComputedStyle(firstOriginalCard); const gridStyle = window.getComputedStyle(listingsGrid);
             const gapPixels = parseFloat(gridStyle.gap) || parseFloat(cardStyle.marginRight) || 16; cardWidth = firstOriginalCard.offsetWidth + gapPixels;
             if(cardWidth > gapPixels) {
                 // console.log(`   [${carouselId}] Card width: ${cardWidth.toFixed(0)}px`);
                 carousel.style.scrollBehavior = 'auto'; carousel.scrollLeft = cardWidth * clonesCount; carousel.style.scrollBehavior = 'smooth';
                 initialScrollCompleted = true;
                 // console.log(`   [${carouselId}] Initial scrollLeft: ${carousel.scrollLeft.toFixed(0)}px`);
             } else { cardWidth = 0; initialScrollCompleted = false; console.error(`[${carouselId}] Falha ao calcular cardWidth!`);}
        }
        setTimeout(calculateCardWidthAndPosition, 300);
        let resizeTimeout;
        window.addEventListener('resize', () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(() => { initialScrollCompleted=false; calculateCardWidthAndPosition(); }, 250); });

        // 3. Lógica dos Botões
        nextBtn.addEventListener('click', () => { if (isTransitioning || cardWidth === 0 || !initialScrollCompleted) return; carousel.scrollLeft += cardWidth; });
        prevBtn.addEventListener('click', () => { if (isTransitioning || cardWidth === 0 || !initialScrollCompleted) return; carousel.scrollLeft -= cardWidth; });

        // 4. Lógica do Loop Infinito (Teleporte no SCROLL)
        let scrollDebounceTimeout;
        carousel.addEventListener('scroll', () => {
            if (cardWidth === 0 || !initialScrollCompleted) return;

            clearTimeout(scrollDebounceTimeout);
            scrollDebounceTimeout = setTimeout(() => {
                if (isTransitioning) return;

                const currentScroll = carousel.scrollLeft;
                const firstOriginalStartPosition = cardWidth * clonesCount;
                const lastOriginalStartPosition = cardWidth * (cardCount + clonesCount - 1);
                const maxScrollPossible = carousel.scrollWidth - carousel.clientWidth;
                const tolerance = Math.max(20, cardWidth * 0.15); // Tolerância dinâmica

                // Check do FINAL -> Início
                if (currentScroll >= maxScrollPossible - tolerance) {
                    // console.log(`   [${carouselId}] -> AT MAX END (${currentScroll.toFixed(0)} >= ${maxScrollPossible.toFixed(0)}), jumping to START.`);
                    isTransitioning = true;
                    carousel.style.scrollBehavior = 'auto';
                    carousel.scrollLeft = firstOriginalStartPosition;
                    setTimeout(() => { // Delay mínimo para o browser processar o salto
                        carousel.style.scrollBehavior = 'smooth';
                        isTransitioning = false;
                        // console.log(`   [${carouselId}] -> Jump to START complete. New scroll: ${carousel.scrollLeft.toFixed(0)}`);
                    }, 50);
                }
                // Check do INÍCIO -> Fim
                else if (currentScroll <= tolerance) { // Verifica se chegou perto do início absoluto (0)
                        // console.log(`   [${carouselId}] <- AT MIN START (${currentScroll.toFixed(0)} <= ${tolerance}), jumping to END.`);
                        isTransitioning = true;
                        carousel.style.scrollBehavior = 'auto';
                        carousel.scrollLeft = lastOriginalStartPosition; // Salta para o início do ÚLTIMO original
                        setTimeout(() => {
                            carousel.style.scrollBehavior = 'smooth';
                            isTransitioning = false;
                            // console.log(`   [${carouselId}] <- Jump to END complete. New scroll: ${carousel.scrollLeft.toFixed(0)}`);
                        }, 50);
                }
            }, 60); // Delay do debounce do scroll

        }); // Fim do scroll listener

    } // Fim da função initializeCarousel

    // --- Inicializa todos ---
    carouselWrappers.forEach(initializeCarousel);

} else { console.log('Nenhum .carousel-wrapper encontrado.'); }


// ===============================================
// === LÓGICA DO FORMULÁRIO DE BUSCA (INDEX) ===
// ===============================================
const heroSearchForm = document.getElementById('hero-search-form');
if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const tipoImovel = document.getElementById('tipo-imovel').value;
        const aptidao = document.getElementById('aptidao').value;
        const localizacao = document.getElementById('localizacao').value;
        const queryString = `tipo=${encodeURIComponent(tipoImovel)}&aptidao=${encodeURIComponent(aptidao)}&local=${encodeURIComponent(localizacao)}`;
        window.location.href = `/pages/busca/busca.html?${queryString}`;
    });
}

// === Tooltip global via event delegation ===
(function () {
  // cria o elemento tooltip apenas uma vez
  const tooltipEl = document.createElement('div');
  tooltipEl.className = 'global-tooltip';
  document.body.appendChild(tooltipEl);

  let activeIcon = null;
  let hideTimer = null;

  function setTooltipTextFromIcon(icon) {
    // pega texto preferindo data-tooltip, senão title
    let text = icon.getAttribute('data-tooltip') || icon.getAttribute('title') || '';
    return text;
  }

  function positionTooltip(icon) {
    if (!icon) return;
    const text = setTooltipTextFromIcon(icon);
    if (!text) return;

    tooltipEl.textContent = text;
    tooltipEl.classList.remove('show');

    // reset temporário para medir
    tooltipEl.style.left = '0px';
    tooltipEl.style.top = '0px';
    tooltipEl.style.transform = 'translateY(6px)';

    requestAnimationFrame(() => {
      const rect = icon.getBoundingClientRect();
      const ttRect = tooltipEl.getBoundingClientRect();
      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;

      let left = rect.left + rect.width / 2 - ttRect.width / 2 + scrollX;
      let top = rect.top - ttRect.height - 10 + scrollY;

      // se não couber acima, coloca abaixo
      if (top < scrollY + 6) {
        top = rect.bottom + 10 + scrollY;
      }

      // evita overflow horizontal
      const maxRight = document.documentElement.clientWidth + scrollX - 8;
      if (left < scrollX + 8) left = scrollX + 8;
      if (left + ttRect.width > maxRight) left = maxRight - ttRect.width;

      tooltipEl.style.left = `${Math.round(left)}px`;
      tooltipEl.style.top = `${Math.round(top)}px`;
      tooltipEl.style.transform = 'translateY(0)';

      // pequena próxima frame para ativar a transição
      requestAnimationFrame(() => tooltipEl.classList.add('show'));
    });
  }

  function showForIcon(icon) {
    if (!icon) return;
    // evita duplicar se já ativo
    if (activeIcon === icon) return;

    // guarda e remove title para evitar tooltip nativo
    if (icon.hasAttribute('title')) {
      icon.setAttribute('data-old-title', icon.getAttribute('title'));
      icon.removeAttribute('title');
    }
    // se não tiver data-tooltip, cria-a
    if (!icon.hasAttribute('data-tooltip') && icon.hasAttribute('data-old-title')) {
      icon.setAttribute('data-tooltip', icon.getAttribute('data-old-title'));
    }

    activeIcon = icon;
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    positionTooltip(icon);
  }

  function hideTooltipImmediate() {
    tooltipEl.classList.remove('show');
    if (activeIcon && activeIcon.hasAttribute('data-old-title')) {
      activeIcon.setAttribute('title', activeIcon.getAttribute('data-old-title'));
      activeIcon.removeAttribute('data-old-title');
    }
    activeIcon = null;
  }

  function hideWithDelay() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      hideTooltipImmediate();
      hideTimer = null;
    }, 120); // curto delay para permitir pequenos movimentos
  }

  // Delegated pointer events: pointerover/pointerout funcionam bem para mouse/touch/stylus
  document.addEventListener('pointerover', (e) => {
    const icon = e.target.closest('.card-extra-icons i');
    if (icon) {
      showForIcon(icon);
    }
  });

  document.addEventListener('pointerout', (e) => {
    // se o ponteiro saiu do mesmo ícone (ou do seu filho), inicia esconder
    const related = e.relatedTarget;
    const fromIcon = e.target.closest('.card-extra-icons i');
    const toIcon = related ? related.closest && related.closest('.card-extra-icons i') : null;
    // se moveu para outro ícone, mostra o novo imediatamente (a pointerover cuidará)
    if (fromIcon && fromIcon !== toIcon) {
      hideWithDelay();
    }
  });

  // Accessibility: focusin/focusout para keyboard
  document.addEventListener('focusin', (e) => {
    const icon = e.target.closest('.card-extra-icons i');
    if (icon) {
      showForIcon(icon);
    }
  });

  document.addEventListener('focusout', (e) => {
    const icon = e.target.closest('.card-extra-icons i');
    if (icon) hideWithDelay();
  });

  // reposiciona se rolar/redimensionar enquanto ativo
  window.addEventListener('scroll', () => {
    if (activeIcon) positionTooltip(activeIcon);
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (activeIcon) positionTooltip(activeIcon);
  });

})();
