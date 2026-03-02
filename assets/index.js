document.addEventListener("DOMContentLoaded", init);

async function init() {
  await loadServices();
}

/* ================================
   SERVICES
================================ */

async function loadServices() {

  try {

    const response = await fetch('./data/services.json');

    if (!response.ok)
      throw new Error("No se pudo cargar services.json");

    const data = await response.json();

    const container = document.getElementById('services-container');

    if (!container) return;

    // orden MUY importante
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
   CARD TEMPLATE
================================ */

function createServiceCard(service) {

  const durationHTML = service.duration
    ? `<span class="service-duration">
         Duración: ${service.duration} min
       </span>`
    : '';

  const priceHTML = service.prices
    ? `
    <span class="service-price">
      Precio nacional: AR$ ${service.prices.ars.toLocaleString('es-AR')}
    </span>
    <span class="service-price">
      Precio internacional: U$D ${service.prices.usd}
    </span>
  `
    : '';

  const featuredClass = service.featured
    ? 'featured-card'
    : '';

  return `
  <div class="col-md-6 col-xl-4">

    <a href="${service.url}" class="service-card-link">

      <div class="service-card shadow"
           style="background-image:url('${service.image || "/assets/img/hero-bg.webp"}')">

        <div class="service-content text-center">

        <span class="service-duration">
            Duración: ${service.duration} min
          </span>

          <h3>${service.title}</h3>

          <p class="service-benefit">
            ${service.description}
          </p>

          <hr>

          <div class="service-price-container">
            <span class="service-price">
              AR$: ${service.prices.ars.toLocaleString('es-AR')}
            </span>
            <span class="service-price">
              U$D: ${service.prices.usd}
            </span>
          </div>

          <span class="service-btn btn mt-3 w-100">
            ${service.cta}
          </span>

        </div>

      </div>

    </a>

  </div>
`;

}
