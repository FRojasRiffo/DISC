/**
 * Template con las carreras y ofertas laborales disponibles.
 * Reemplaza los textos de ejemplo con la información oficial cuando la tengas.
 */
const careerOffersData = [
  {
    id: "ing-informatica",
    label: "Ingeniería en Informática",
    matchValues: ["ing-informatica", "ingeniería en informática"],
    offers: [
      {
        title: "Práctica Desarrollador Front-End",
        company: "Tech Labs",
        modality: "Híbrido",
        location: "Santiago",
        summary: "Apoya en la creación de componentes web accesibles y optimizados.",
        applyUrl: "https://example.com/postulacion-frontend"
      },
      {
        title: "Analista de Datos Junior",
        company: "DataWorks",
        modality: "Remoto",
        location: "Chile",
        summary: "Construye tableros en Power BI y automatiza reportes de desempeño.",
        applyUrl: "https://example.com/analista-datos"
      }
    ]
  },
  {
    id: "analista-programador",
    label: "Analista Programador",
    matchValues: ["analista programador"],
    offers: [
      {
        title: "Práctica Desarrollador Backend",
        company: "CloudBit",
        modality: "Híbrido",
        location: "Santiago Centro",
        summary: "Implementa microservicios y pruebas automatizadas en Node.js.",
        applyUrl: "https://example.com/backend-practica"
      }
    ]
  },
  {
    id: "marketing-digital",
    label: "Publicidad y Marketing Digital",
    matchValues: ["publicidad y marketing digital", "marketing digital"],
    offers: [
      {
        title: "Practicante Content Marketing",
        company: "Agencia Creativa Norte",
        modality: "Presencial",
        location: "Providencia",
        summary: "Planifica parrillas de contenidos y colabora con el equipo audiovisual.",
        applyUrl: "https://example.com/content-marketing"
      },
      {
        title: "Asistente de Performance",
        company: "Media Boost",
        modality: "Híbrido",
        location: "Las Condes",
        summary: "Optimiza campañas pagadas y realiza pruebas A/B con foco en leads.",
        applyUrl: "https://example.com/performance"
      }
    ]
  },
  {
    id: "gestion-logistica",
    label: "Ingeniería en Gestión Logística",
    matchValues: ["ingeniería en gestión logística", "técnico en gestión logística"],
    offers: [
      {
        title: "Práctica Coordinador Logístico",
        company: "LogiChain",
        modality: "Presencial",
        location: "Quilicura",
        summary: "Controla inventarios, inventarios cíclicos y apoyo a despachos.",
        applyUrl: "https://example.com/logistica"
      }
    ]
  }
];

const normalizeValue = (value) => value?.toString().trim().toLowerCase() || "";

const findCareerData = (value) => {
  const normalized = normalizeValue(value);
  if (!normalized) return null;
  return careerOffersData.find((career) => {
    const candidates = [
      career.id,
      career.label,
      ...(career.matchValues || [])
    ].filter(Boolean);
    return candidates.some((candidate) => normalizeValue(candidate) === normalized);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const jobOffersBtn = document.getElementById("jobOffersBtn");
  const jobOffersModal = document.getElementById("jobOffersModal");
  const closeJobModal = document.getElementById("closeJobModal");
  const jobOffersList = document.getElementById("jobOffersList");
  const jobOffersEmpty = document.getElementById("jobOffersEmpty");
  const jobOffersTitle = document.getElementById("jobOffersTitle");
  const careerSelect = document.getElementById("careerSelect") || document.getElementById("userCarrera");

  if (!jobOffersBtn || !careerSelect || !jobOffersModal || !jobOffersList || !jobOffersEmpty) {
    return;
  }

  const shouldPopulateSelect = careerSelect.id === "careerSelect";

  if (shouldPopulateSelect && careerSelect.options.length <= 1) {
    careerOffersData.forEach(({ id, label }) => {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = label;
      careerSelect.appendChild(option);
    });
  }

  const toggleButtonState = () => {
    const currentValue = careerSelect.value;
    const shouldDisable = !currentValue || careerSelect.disabled;
    jobOffersBtn.disabled = shouldDisable;

    if (shouldDisable) {
      delete jobOffersBtn.dataset.careerValue;
    } else {
      jobOffersBtn.dataset.careerValue = currentValue;
    }
  };

  const renderOffers = (careerValue) => {
    const careerData = findCareerData(careerValue);
    jobOffersList.innerHTML = "";

    if (!careerData || !careerData.offers || careerData.offers.length === 0) {
      jobOffersEmpty.textContent = "Pronto añadiremos ofertas para esta carrera. ¡Mantente atento!";
      jobOffersEmpty.hidden = false;
      return;
    }

    jobOffersEmpty.hidden = true;
    if (jobOffersTitle) {
      jobOffersTitle.textContent = `Ofertas laborales · ${careerData.label}`;
    }

    careerData.offers.forEach((offer) => {
      const card = document.createElement("article");
      card.className = "job-offer-card";
      card.innerHTML = `
        <div class="job-offer-header">
          <h3>${offer.title}</h3>
          <span class="job-offer-company">${offer.company}</span>
        </div>
        <p class="job-offer-summary">${offer.summary}</p>
        <div class="job-offer-meta">
          <span class="job-offer-tag">${offer.modality}</span>
          <span class="job-offer-tag">${offer.location}</span>
        </div>
        <a href="${offer.applyUrl}" target="_blank" rel="noopener noreferrer" class="job-offer-link">
          Postular
        </a>
      `;
      jobOffersList.appendChild(card);
    });
  };

  const openModal = () => {
    const selectedCareerValue = jobOffersBtn.dataset.careerValue;
    renderOffers(selectedCareerValue);
    jobOffersModal.style.display = "flex";
    jobOffersModal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    jobOffersModal.style.display = "none";
    jobOffersModal.setAttribute("aria-hidden", "true");
  };

  careerSelect.addEventListener("change", toggleButtonState);
  jobOffersBtn.addEventListener("click", () => {
    if (!jobOffersBtn.disabled) {
      openModal();
    }
  });
  closeJobModal?.addEventListener("click", closeModal);

  jobOffersModal?.addEventListener("click", (event) => {
    if (event.target === jobOffersModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && jobOffersModal.style.display === "flex") {
      closeModal();
    }
  });

  // Estado inicial
  toggleButtonState();
});

