document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SIMULAÇÃO DE BANCO DE DADOS (EXPANDIDO) ---
  const mockPropertyDB = {
    prop1: {
      id: "prop1",
      img: "https://images.unsplash.com/photo-1596924036923-9e3d84f4756b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=700&fit=crop",
      gallery: [
        "https://placehold.co/150x100/4a7c59/ffffff?text=Foto+2",
        "https://placehold.co/150x100/4a7c59/ffffff?text=Foto+3",
        "https://placehold.co/150x100/4a7c59/ffffff?text=Drone",
        "https://placehold.co/150x100/4a7c59/ffffff?text=Sede",
      ],
      title: "Fazenda Pronta para Pecuária",
      location: "Bocaiúva do Sul, PR",
      price: 4500000,
      area: 350,
      aptidao: "Pecuária",
      topografia: "Ondulada",
      description:
        "<p>Excelente fazenda com 350 hectares, ideal para pecuária de corte ou leite. Pastagem formada e piqueteada, com várias nascentes e um rio que corta a propriedade.</p><p>Possui casa sede de alvenaria, curral completo com brete e balança, e energia elétrica. Ótimo acesso, a apenas 15km do asfalto.</p>",
      hidricos_sim: ["Rio", "Nascente"],
      hidricos_nao: ["Poço Artesiano"],
      infra_sim: ["Casa Sede", "Curral", "Cercada", "Energia Elétrica"],
      infra_nao: ["Galpão", "Internet"],
    },
    prop2: {
      id: "prop2",
      img: "https://images.unsplash.com/photo-1444858291040-5c7f113a1eb1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=700&fit=crop",
      gallery: ["https://placehold.co/150x100/8b7355/ffffff?text=Foto+2"],
      title: "Sítio para Agricultura Familiar",
      location: "Castro, PR",
      price: 1200000,
      area: 40,
      aptidao: "Agricultura",
      topografia: "Plana",
      description:
        "<p>Lindo sítio com 40 hectares de área total, sendo 30 hectares de área de plantio mecanizável. Terra roxa de alta produtividade.</p><p>Conta com casa sede mista, galpão para maquinário, poço artesiano e sinal de internet fibra óptica. Perfeito para quem busca produzir e morar bem.</p>",
      hidricos_sim: ["Poço Artesiano"],
      hidricos_nao: ["Rio", "Nascente", "Açude"],
      infra_sim: ["Casa Sede", "Galpão", "Energia Elétrica", "Internet"],
      infra_nao: ["Curral", "Cercada", "Piscina"],
    },
    prop3: {
      id: "prop3",
      img: "https://images.unsplash.com/photo-1620188463121-f018d0f1a4e2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200&h=700&fit=crop",
      gallery: [
        "https://placehold.co/150x100/81c784/ffffff?text=Piscina",
        "https://placehold.co/150x100/81c784/ffffff?text=Nascente",
      ],
      title: "Chácara de Lazer com Nascente",
      location: "Campina Grande do Sul, PR",
      price: 890000,
      area: 5,
      aptidao: "Lazer",
      topografia: "Levemente Ondulada",
      description:
        "<p>Chácara espetacular em condomínio fechado. Possui 5 hectares de área verde nativa, com uma bela nascente e um açude piscoso.</p><p>A casa principal é nova e moderna, com piscina aquecida e área gourmet. Internet fibra óptica instalada. Ideal para moradia ou lazer de fim de semana.</p>",
      hidricos_sim: ["Nascente", "Açude"],
      hidricos_nao: [],
      infra_sim: [
        "Internet",
        "Piscina",
        "Casa de Hóspedes",
        "Energia Elétrica",
      ],
      infra_nao: ["Curral", "Galpão"],
    },
  };

  // Lista de todas as infraestruturas possíveis
  const allInfra = [
    "Casa Sede",
    "Casa de Hóspedes",
    "Curral",
    "Galpão",
    "Cercada",
    "Energia Elétrica",
    "Internet",
    "Piscina",
  ];
  const allHidricos = ["Rio", "Nascente", "Poço Artesiano", "Açude"];

  // --- 2. Função para formatar moeda ---
  const formatCurrency = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // --- 3. Função para renderizar as listas (Recursos e Infra) ---
  function renderFeatureList(listElementId, allFeatures, prop_sim, prop_nao) {
    const listElement = document.getElementById(listElementId);
    if (!listElement) return;

    listElement.innerHTML = ""; // Limpa a lista

    allFeatures.forEach((item) => {
      let li_html = "";

      if (prop_sim.includes(item)) {
        li_html = `<li><span class="check"><i class="fa-solid fa-check"></i> ${item}</span></li>`;
      } else if (prop_nao.includes(item)) {
        li_html = `<li><span class="cross"><i class="fa-solid fa-times"></i> ${item}</span></li>`;
      } else {
        li_html = `<li><span class="na"><i class="fa-solid fa-minus"></i> ${item}</span></li>`;
      }

      listElement.innerHTML += li_html;
    });
  }

  // --- 4. Função principal para renderizar a página ---
  function renderPage(property) {
    if (!property) {
      document.querySelector(".property-main-info").innerHTML =
        "<h1>Imóvel não encontrado</h1><p>O imóvel que você está procurando não existe ou foi removido.</p>";
      return;
    }

    // Preenche Título, Preço, Localização
    document.getElementById("imovel-title").textContent = property.title;
    document.getElementById("imovel-price").textContent = formatCurrency(
      property.price
    );
    document.getElementById("imovel-location").textContent = property.location;

    // Preenche Descrição
    document.getElementById("imovel-description").innerHTML =
      property.description;

    // Preenche a Galeria (Imagem Principal)
    const mainImage = document.querySelector(".gallery-main-image");
    if (mainImage) mainImage.src = property.img;

    // Preenche o data-id do botão de favorito
    const favButton = document.getElementById("imovel-favorite-toggle");
    if (favButton) favButton.setAttribute("data-id", property.id);

    // Preenche Detalhes Principais
    const detailsList = document.getElementById("property-details-list");
    if (detailsList) {
      detailsList.innerHTML = `
                <li><strong>Preço</strong> ${formatCurrency(
                  property.price
                )}</li>
                <li><strong>Área Total</strong> ${property.area} ha</li>
                <li><strong>Aptidão</strong> ${property.aptidao}</li>
                <li><strong>Topografia</strong> ${property.topografia}</li>
            `;
    }

    // Renderiza as listas de Recursos e Infraestrutura
    renderFeatureList(
      "recursos-hidricos-list",
      allHidricos,
      property.hidricos_sim,
      property.hidricos_nao
    );
    renderFeatureList(
      "infraestrutura-list",
      allInfra,
      property.infra_sim,
      property.infra_nao
    );
  }

  // --- 5. Lógica de Favoritos ---
  function initializeFavoriteLogic() {
    const favoriteBtn = document.getElementById("imovel-favorite-toggle");
    if (!favoriteBtn) return;

    favoriteBtn.addEventListener("click", () => {
      const icon = favoriteBtn.querySelector("i");
      const textSpan = favoriteBtn.querySelector("span"); //Seleciona o span de texto
      const propertyId = favoriteBtn.dataset.id;

      const isActive = favoriteBtn.classList.toggle("active");

      if (isActive) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        textSpan.textContent = "Remover dos Favoritos"; //Atualiza o texto
        favoriteBtn.setAttribute("title", "Remover dos Favoritos");
        console.log(`Propriedade ${propertyId} ADICIONADA aos favoritos.`);
      } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        textSpan.textContent = "Adicionar aos Favoritos"; //Atualiza o texto
        favoriteBtn.setAttribute("title", "Adicionar aos Favoritos");
        console.log(`Propriedade ${propertyId} REMOVIDA dos favoritos.`);
      }
    });
  }

  // --- 6. Inicialização ---
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id") || "prop1"; // Pega o ID da URL ou usa 'prop1' como padrão

  const propertyToRender = mockPropertyDB[propertyId];

  renderPage(propertyToRender);
  initializeFavoriteLogic();
});
