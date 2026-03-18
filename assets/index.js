document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadServices();
}

/* ================================
   SERVICES
================================ */

async function loadServices() {
  try {

    // ⚠️ corregido path
    const response = await fetch('./data/services.json');

    if (!response.ok)
      throw new Error("No se pudo cargar services.json");

    const data = await response.json();

    const container = document.getElementById('services-container');

    if (!container) return;

    const services = data.services.sort(
      (a, b) => (a.order ?? 999) - (b.order ?? 999)
    );

    container.innerHTML = services
      .map(service => createServiceCard(service))
      .join("");

  } catch (error) {
    console.error("Error cargando servicios:", error);
  }
}

/* ================================
   CARD TEMPLATE NUEVO
================================ */

function createServiceCard(service) {

  return `
  <div class="col-12 col-md-10 col-lg-6">

    <div class="service-card-new shadow-sm h-100">

      <div class="service-img">
        <img src="${service.image || "./assets/img/hero-bg.webp"}" alt="${service.title}">
      </div>

      <div class="service-info">

        <h3>${service.title}</h3>

        <p class="service-benefit">
          ${service.description}
        </p>

        <span class="service-duration">
          Duración: ${service.duration} min
        </span>

        <span class="service-type">
          Tipo de sesión: ${service.type}
        </span>

        <div class="service-price-container">
          <span class="service-price">
            AR$: ${service.prices.ars.toLocaleString('es-AR')}
          </span>
          <span class="service-price">
            U$D: ${service.prices.usd}
          </span>
        </div>

        <a href="${service.url}" target="_blank" class="btn mt-3">
          ${service.cta}
        </a>

      </div>

    </div>

  </div>
`;
}