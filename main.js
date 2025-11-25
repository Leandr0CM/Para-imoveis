document.addEventListener("DOMContentLoaded", () => {
  // Permite configurar uma base URL externa (ex: Supabase Storage public base)
  // Defina `window.SITE_BASE_URL = 'https://<proj>.supabase.co/storage/v1/object/public/site'`
  // antes de carregar o script, ou deixe em branco para usar o comportamento antigo.
  const SITE_BASE = (window.SITE_BASE_URL || "").replace(/\/$/, "");

  // 1. Encontra os placeholders
  const headerPlaceholder = document.getElementById("header-placeholder");
  const footerPlaceholder = document.getElementById("footer-placeholder");

  // 2/3. Carrega o Cabeçalho e o Rodapé com fallback de caminhos
  function tryFetchSequential(paths) {
    return new Promise((resolve, reject) => {
      let i = 0;
      function next() {
        if (i >= paths.length) {
          return reject(
            new Error("Nenhum dos caminhos funcionou: " + JSON.stringify(paths))
          );
        }
        const p = paths[i++];
        fetch(p)
          .then((res) => {
            if (!res.ok) throw new Error("not ok");
            return res.text();
          })
          .then((text) => resolve({ path: p, text }))
          .catch(() => next());
      }
      next();
    });
  }

  // Gera uma lista de caminhos candidatados para um arquivo (header/footer)
  function candidatePaths(filename) {
    const candidates = [];
    if (SITE_BASE) candidates.push(`${SITE_BASE}/${filename}`);
    // caminhos absolutos a partir da raiz do servidor
    candidates.push(`/${filename}`);
    // se o servidor está na pasta pai (ex: /Para-imoveis/ como prefixo)
    candidates.push(`/Para-imoveis/${filename}`);
    // caminhos relativos a partir da localização atual da página
    // para pages/index/: precisa subir 2 níveis
    candidates.push(`../../${filename}`);
    candidates.push(`../${filename}`);
    candidates.push(`./${filename}`);
    candidates.push(`../../../${filename}`);
    return candidates;
  }

  if (headerPlaceholder) {
    tryFetchSequential(candidatePaths("header.html"))
      .then((result) => {
        headerPlaceholder.innerHTML = result.text;
      })
      .catch((err) => {
        console.error("Erro ao buscar o cabeçalho:", err);
        headerPlaceholder.innerHTML =
          '<p style="color:red; text-align:center;">Erro ao carregar o cabeçalho. Verifique o caminho no main.js</p>';
      });
  }

  if (footerPlaceholder) {
    tryFetchSequential(candidatePaths("footer.html"))
      .then((result) => {
        footerPlaceholder.innerHTML = result.text;
      })
      .catch((err) => {
        console.error("Erro ao buscar o rodapé:", err);
        footerPlaceholder.innerHTML =
          '<p style="color:red; text-align:center;">Erro ao carregar o rodapé. Verifique o caminho no main.js</p>';
      });
  }
});

// === Tooltip global via event delegation ===
(function () {
  // cria o elemento tooltip apenas uma vez
  const tooltipEl = document.createElement("div");
  tooltipEl.className = "global-tooltip";
  document.body.appendChild(tooltipEl);

  let activeIcon = null;
  let hideTimer = null;

  function setTooltipTextFromIcon(icon) {
    // pega texto preferindo data-tooltip, senão title
    let text =
      icon.getAttribute("data-tooltip") || icon.getAttribute("title") || "";
    return text;
  }

  function positionTooltip(icon) {
    if (!icon) return;
    const text = setTooltipTextFromIcon(icon);
    if (!text) return;

    tooltipEl.textContent = text;
    tooltipEl.classList.remove("show");

    // reset temporário para medir
    tooltipEl.style.left = "0px";
    tooltipEl.style.top = "0px";
    tooltipEl.style.transform = "translateY(6px)";

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
      tooltipEl.style.transform = "translateY(0)";

      // pequena próxima frame para ativar a transição
      requestAnimationFrame(() => tooltipEl.classList.add("show"));
    });
  }

  function showForIcon(icon) {
    if (!icon) return;
    // evita duplicar se já ativo
    if (activeIcon === icon) return;

    // guarda e remove title para evitar tooltip nativo
    if (icon.hasAttribute("title")) {
      icon.setAttribute("data-old-title", icon.getAttribute("title"));
      icon.removeAttribute("title");
    }
    // se não tiver data-tooltip, cria-a
    if (
      !icon.hasAttribute("data-tooltip") &&
      icon.hasAttribute("data-old-title")
    ) {
      icon.setAttribute("data-tooltip", icon.getAttribute("data-old-title"));
    }

    activeIcon = icon;
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    positionTooltip(icon);
  }

  function hideTooltipImmediate() {
    tooltipEl.classList.remove("show");
    if (activeIcon && activeIcon.hasAttribute("data-old-title")) {
      activeIcon.setAttribute(
        "title",
        activeIcon.getAttribute("data-old-title")
      );
      activeIcon.removeAttribute("data-old-title");
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
  document.addEventListener("pointerover", (e) => {
    const icon = e.target.closest(".card-extra-icons i");
    if (icon) {
      showForIcon(icon);
    }
  });

  document.addEventListener("pointerout", (e) => {
    // se o ponteiro saiu do mesmo ícone (ou do seu filho), inicia esconder
    const related = e.relatedTarget;
    const fromIcon = e.target.closest(".card-extra-icons i");
    const toIcon = related
      ? related.closest && related.closest(".card-extra-icons i")
      : null;
    // se moveu para outro ícone, mostra o novo imediatamente (a pointerover cuidará)
    if (fromIcon && fromIcon !== toIcon) {
      hideWithDelay();
    }
  });

  // Accessibility: focusin/focusout para keyboard
  document.addEventListener("focusin", (e) => {
    const icon = e.target.closest(".card-extra-icons i");
    if (icon) {
      showForIcon(icon);
    }
  });

  document.addEventListener("focusout", (e) => {
    const icon = e.target.closest(".card-extra-icons i");
    if (icon) hideWithDelay();
  });

  // reposiciona se rolar/redimensionar enquanto ativo
  window.addEventListener(
    "scroll",
    () => {
      if (activeIcon) positionTooltip(activeIcon);
    },
    { passive: true }
  );
  window.addEventListener("resize", () => {
    if (activeIcon) positionTooltip(activeIcon);
  });
})();
