// =============================================
// HEADER E FOOTER COMPARTILHADOS
// =============================================

async function loadComponents() {

  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // HEADER
  if (header) {
    try {

      const response = await fetch("components/header.html");
      header.innerHTML = await response.text();

      configurarMenuHamburger();
      marcarPaginaAtiva();

    } catch (error) {

      console.error("Erro ao carregar header:", error);

    }
  }

  // FOOTER
  if (footer) {
    try {

      const response = await fetch("components/footer.html");
      footer.innerHTML = await response.text();

      const year = document.getElementById("current-year");

      if (year) {
        year.textContent = new Date().getFullYear();
      }

    } catch (error) {

      console.error("Erro ao carregar footer:", error);

    }
  }
}

// =============================================
// MENU HAMBURGUER
// =============================================

function configurarMenuHamburger() {

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });

  });
}

// =============================================
// DESTACAR PÁGINA ATUAL
// =============================================

function marcarPaginaAtiva() {

  const paginaAtual =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {

    const href = link.getAttribute("href");

    link.classList.remove("active");

    if (href === paginaAtual) {
      link.classList.add("active");
    }

  });
}

// =============================================
// EFEITO NAVBAR AO ROLAR
// =============================================

window.addEventListener("scroll", () => {

  const navbar = document.querySelector(".navbar");

  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }

});

// =============================================
// ANIMAÇÕES FADE-IN
// =============================================

function iniciarAnimacoes() {

  const observer = new IntersectionObserver(

    (entries) => {

      entries.forEach((entry, index) => {

        if (entry.isIntersecting) {

          entry.target.style.transitionDelay =
            `${index * 0.07}s`;

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }

      });

    },

    {
      threshold: 0.12
    }

  );

  document.querySelectorAll(
    ".card, .proto-card, .tl-item, .course-card, .channel-item, .heuristic-card, .soft-item, .skill-item"
  ).forEach(element => {

    element.classList.add("fade-in");

    observer.observe(element);

  });

}

// =============================================
// INICIALIZAÇÃO
// =============================================

document.addEventListener("DOMContentLoaded", async () => {

  await loadComponents();

  iniciarAnimacoes();

});