// DISC Personality Results Data
const discResults = {
  // Dominance (D) - Dominante
  D: {
    name: "Dominante",
    title: "Patrón del Dominante",
    emotions: "Puede rechazar la sumisión y la debilidad.",
    goal: "Los resultados, el logro.",
    judgesOthersBy: "Su capacidad para conseguir resultados.",
    influencesOthersThrough: "El desafío, el control, la competencia.",
    valueToOrganization: "Establece metas, toma decisiones, resuelve problemas, dirige.",
    abuses: "La agresión, la impaciencia.",
    underPressure: "Se vuelve autocrático.",
    fears: "Ser explotado, perder el control.",
    wouldBeMoreEffectiveIf: "Fuera más paciente, escuchara más, reconociera los méritos de los demás.",
    description: [
      "El Dominante es una persona orientada a resultados, decidida y competitiva. Le gusta tomar el control y enfrentar desafíos. Busca la eficiencia y el logro de objetivos.",
      "Prefiere trabajar en un ambiente de ritmo rápido donde puede tomar decisiones rápidas. Le frustran las tareas rutinarias y las personas que no están alineadas con sus objetivos.",
      "El Dominante valora la competencia y el éxito. Puede ser visto como agresivo o directo, pero su motivación principal es lograr resultados y superar obstáculos."
    ]
  },
  
  // Influence (I) - Influyente
  I: {
    name: "Influyente",
    title: "Patrón del Influyente",
    emotions: "Puede rechazar el rechazo social y la pérdida de influencia.",
    goal: "El reconocimiento social, las relaciones.",
    judgesOthersBy: "Su capacidad para relacionarse y comunicarse.",
    influencesOthersThrough: "El entusiasmo, la persuasión, el optimismo.",
    valueToOrganization: "Motiva, entusiasma, crea un ambiente positivo, comunica.",
    abuses: "El optimismo excesivo, la charla.",
    underPressure: "Se vuelve emocional, habla demasiado.",
    fears: "El rechazo social, la pérdida de popularidad.",
    wouldBeMoreEffectiveIf: "Fuera más organizado, escuchara más, siguiera los detalles.",
    description: [
      "El Influyente es una persona entusiasta, optimista y sociable. Le gusta trabajar con personas y crear un ambiente positivo. Es comunicativo y persuasivo.",
      "Prefiere trabajar en un ambiente donde puede interactuar con otros y recibir reconocimiento. Le frustran las tareas solitarias y la falta de interacción social.",
      "El Influyente valora las relaciones y la aprobación de los demás. Puede ser visto como hablador o poco organizado, pero su motivación principal es inspirar y motivar a otros."
    ]
  },
  
  // Steadiness (S) - Estabilidad
  S: {
    name: "Estabilidad",
    title: "Patrón de la Estabilidad",
    emotions: "Puede rechazar el cambio repentino y la pérdida de seguridad.",
    goal: "La estabilidad, la armonía.",
    judgesOthersBy: "Su lealtad, su capacidad para mantener la armonía.",
    influencesOthersThrough: "La paciencia, la consistencia, la lealtad.",
    valueToOrganization: "Proporciona estabilidad, mantiene relaciones, apoya, completa tareas.",
    abuses: "La pasividad, la resistencia al cambio.",
    underPressure: "Se vuelve indeciso, resistente al cambio.",
    fears: "La pérdida de seguridad, el cambio, la confrontación.",
    wouldBeMoreEffectiveIf: "Aceptara el cambio, fuera más asertivo, tomara más iniciativa.",
    description: [
      "La Estabilidad es una persona paciente, leal y consistente. Le gusta mantener la armonía y trabajar en un ambiente estable. Es un buen oyente y proporciona apoyo.",
      "Prefiere trabajar en un ambiente donde las cosas son predecibles y hay tiempo para completar las tareas. Le frustran los cambios repentinos y los ambientes de alta presión.",
      "La Estabilidad valora la seguridad y las relaciones duraderas. Puede ser vista como lenta o resistente al cambio, pero su motivación principal es mantener la estabilidad y apoyar a los demás."
    ]
  },
  
  // Conscientiousness (C) - Concienzudo/Objetivo
  C: {
    name: "Objetivo",
    title: "Patrón del Objetivo",
    emotions: "Puede rechazar la agresión interpersonal.",
    goal: "La exactitud.",
    judgesOthersBy: "Su capacidad de pensamiento analítico.",
    influencesOthersThrough: "La información objetiva, los argumentos lógicos.",
    valueToOrganization: "Define, esclarece, obtiene información, evalúa, comprueba.",
    abuses: "El análisis.",
    underPressure: "Se vuelve aprensivo.",
    fears: "Actos irracionales, el ridículo.",
    wouldBeMoreEffectiveIf: "Fuera más abierto, compartiera en público su perspicacia y opiniones.",
    description: [
      "La capacidad de pensamiento crítico suele estar muy desarrollada en el Objetivo. Recalca la importancia de sacar conclusiones y basar las acciones en hechos. Busca la precisión y exactitud en todo lo que hace. Sin embargo, para llevar a cabo con eficiencia su trabajo, el Objetivo suele combinar la información intuitiva con los datos que posee. Cuando duda sobre el curso a tomar, evita hacer el ridículo preparándose meticulosamente. Por ejemplo, el Objetivo perfeccionará una nueva habilidad en privado antes de usarla en alguna actividad de grupo.",
      "El Objetivo prefiere trabajar con personas que, como él, prefieren mantener un ambiente laboral tranquilo. Como puede mostrarse reticente en expresar sus sentimientos, hay quienes lo consideran tímido. Se siente particularmente incómodo ante personas agresivas. A pesar de esta apariencia templada, el Objetivo tiene una fuerte necesidad de controlar el ambiente. Suele ejercer este control en forma indirecta solicitando el apego a reglas y normas.",
      "El Objetivo se preocupa por llegar a respuestas 'correctas' y le puede resultar difícil tomar decisiones en situaciones ambiguas. Su tendencia a preocuparse le puede llevar a una 'parálisis por análisis'. Con demasiada frecuencia, cuando comete un error, titubea en reconocerlo y se empeña en buscar información que le permita apoyar su postura."
    ]
  }
};

// Function to determine the primary DISC type based on results
function getPrimaryType(results) {
  let maxScore = -Infinity;
  let primaryType = 'C';
  
  for (const [type, score] of Object.entries(results)) {
    if (score > maxScore) {
      maxScore = score;
      primaryType = type;
    }
  }
  
  return primaryType;
}

// Function to display results on the page
function displayResults() {
  let results;
  
  try {
    const storedResults = localStorage.getItem("discResults");
    if (!storedResults) {
      throw new Error("No results found");
    }
    results = JSON.parse(storedResults);
  } catch (error) {
    document.body.innerHTML = `
      <div class="logo-header">
        <div class="logo-container">
          <div class="logo-circle">
            <svg class="logo-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M 100,30 A 70,70 0 1,1 100,170" stroke="#2c2c2c" stroke-width="6" fill="none" stroke-linecap="round"/>
              <g transform="translate(70,50)">
                <polygon points="0,-4 1,-1 4,-1 1.5,1 2.5,4 0,2 -2.5,4 -1.5,1 -4,-1 -1,-1" fill="#2c2c2c"/>
              </g>
              <g transform="translate(130,150)">
                <polygon points="0,-4 1,-1 4,-1 1.5,1 2.5,4 0,2 -2.5,4 -1.5,1 -4,-1 -1,-1" fill="#2c2c2c"/>
              </g>
              <circle cx="115" cy="45" r="2" fill="#2c2c2c"/>
              <circle cx="85" cy="55" r="1.5" fill="#2c2c2c"/>
              <circle cx="125" cy="75" r="1.5" fill="#2c2c2c"/>
              <circle cx="75" cy="85" r="1.5" fill="#2c2c2c"/>
              <circle cx="130" cy="110" r="1.5" fill="#2c2c2c"/>
              <circle cx="70" cy="115" r="1.5" fill="#2c2c2c"/>
              <circle cx="125" cy="145" r="1.5" fill="#2c2c2c"/>
              <circle cx="75" cy="155" r="1.5" fill="#2c2c2c"/>
              <text x="100" y="50" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="18" font-weight="600" fill="#2c2c2c">Onboarding</text>
              <text x="88" y="105" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="48" font-weight="700" fill="#2c2c2c">O</text>
              <text x="112" y="105" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="48" font-weight="700" fill="#2c2c2c">B</text>
              <text x="100" y="160" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="10" fill="#2c2c2c">Global skills for job positioning</text>
            </svg>
          </div>
        </div>
      </div>
      <div class="container">
        <h1>No se encontraron resultados</h1>
        <p>Por favor, complete el test DISC primero.</p>
        <p><a href="index.html" style="color: #5fa890; text-decoration: underline;">Volver al test</a></p>
      </div>
    `;
    return;
  }
  
  if (!results.D && !results.I && !results.S && !results.C) {
    document.body.innerHTML = `
      <div class="logo-header">
        <div class="logo-container">
          <div class="logo-circle">
            <svg class="logo-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M 100,30 A 70,70 0 1,1 100,170" stroke="#2c2c2c" stroke-width="6" fill="none" stroke-linecap="round"/>
              <g transform="translate(70,50)">
                <polygon points="0,-4 1,-1 4,-1 1.5,1 2.5,4 0,2 -2.5,4 -1.5,1 -4,-1 -1,-1" fill="#2c2c2c"/>
              </g>
              <g transform="translate(130,150)">
                <polygon points="0,-4 1,-1 4,-1 1.5,1 2.5,4 0,2 -2.5,4 -1.5,1 -4,-1 -1,-1" fill="#2c2c2c"/>
              </g>
              <circle cx="115" cy="45" r="2" fill="#2c2c2c"/>
              <circle cx="85" cy="55" r="1.5" fill="#2c2c2c"/>
              <circle cx="125" cy="75" r="1.5" fill="#2c2c2c"/>
              <circle cx="75" cy="85" r="1.5" fill="#2c2c2c"/>
              <circle cx="130" cy="110" r="1.5" fill="#2c2c2c"/>
              <circle cx="70" cy="115" r="1.5" fill="#2c2c2c"/>
              <circle cx="125" cy="145" r="1.5" fill="#2c2c2c"/>
              <circle cx="75" cy="155" r="1.5" fill="#2c2c2c"/>
              <text x="100" y="50" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="18" font-weight="600" fill="#2c2c2c">Onboarding</text>
              <text x="88" y="105" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="48" font-weight="700" fill="#2c2c2c">O</text>
              <text x="112" y="105" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="48" font-weight="700" fill="#2c2c2c">B</text>
              <text x="100" y="160" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="10" fill="#2c2c2c">Global skills for job positioning</text>
            </svg>
          </div>
        </div>
      </div>
      <div class="container">
        <h1>Resultados inválidos</h1>
        <p>Los resultados del test no son válidos. Por favor, complete el test nuevamente.</p>
        <p><a href="index.html" style="color: #5fa890; text-decoration: underline;">Volver al test</a></p>
      </div>
    `;
    return;
  }
  
  const primaryType = getPrimaryType(results);
  const resultData = discResults[primaryType];
  
  if (!resultData) {
    document.body.innerHTML = `
      <div class="logo-header">
        <div class="logo-container">
          <div class="logo-circle">
            <svg class="logo-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path d="M 100,30 A 70,70 0 1,1 100,170" stroke="#2c2c2c" stroke-width="6" fill="none" stroke-linecap="round"/>
              <g transform="translate(70,50)">
                <polygon points="0,-4 1,-1 4,-1 1.5,1 2.5,4 0,2 -2.5,4 -1.5,1 -4,-1 -1,-1" fill="#2c2c2c"/>
              </g>
              <g transform="translate(130,150)">
                <polygon points="0,-4 1,-1 4,-1 1.5,1 2.5,4 0,2 -2.5,4 -1.5,1 -4,-1 -1,-1" fill="#2c2c2c"/>
              </g>
              <circle cx="115" cy="45" r="2" fill="#2c2c2c"/>
              <circle cx="85" cy="55" r="1.5" fill="#2c2c2c"/>
              <circle cx="125" cy="75" r="1.5" fill="#2c2c2c"/>
              <circle cx="75" cy="85" r="1.5" fill="#2c2c2c"/>
              <circle cx="130" cy="110" r="1.5" fill="#2c2c2c"/>
              <circle cx="70" cy="115" r="1.5" fill="#2c2c2c"/>
              <circle cx="125" cy="145" r="1.5" fill="#2c2c2c"/>
              <circle cx="75" cy="155" r="1.5" fill="#2c2c2c"/>
              <text x="100" y="50" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="18" font-weight="600" fill="#2c2c2c">Onboarding</text>
              <text x="88" y="105" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="48" font-weight="700" fill="#2c2c2c">O</text>
              <text x="112" y="105" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="48" font-weight="700" fill="#2c2c2c">B</text>
              <text x="100" y="160" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="10" fill="#2c2c2c">Global skills for job positioning</text>
            </svg>
          </div>
        </div>
      </div>
      <div class="container">
        <h1>Error al cargar resultados</h1>
        <p>No se pudo determinar el tipo de personalidad. Por favor, complete el test nuevamente.</p>
        <p><a href="index.html" style="color: #5fa890; text-decoration: underline;">Volver al test</a></p>
      </div>
    `;
    return;
  }
  
  // Create logo HTML
  const logoHTML = `
    <div class="logo-header">
      <div class="logo-container">
        <div class="logo-circle">
          <svg class="logo-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100,30 A 70,70 0 1,1 100,170" stroke="#2c2c2c" stroke-width="6" fill="none" stroke-linecap="round"/>
            <g transform="translate(70,50)">
              <polygon points="0,-4 1,-1 4,-1 1.5,1 2.5,4 0,2 -2.5,4 -1.5,1 -4,-1 -1,-1" fill="#2c2c2c"/>
            </g>
            <g transform="translate(130,150)">
              <polygon points="0,-4 1,-1 4,-1 1.5,1 2.5,4 0,2 -2.5,4 -1.5,1 -4,-1 -1,-1" fill="#2c2c2c"/>
            </g>
            <circle cx="115" cy="45" r="2" fill="#2c2c2c"/>
            <circle cx="85" cy="55" r="1.5" fill="#2c2c2c"/>
            <circle cx="125" cy="75" r="1.5" fill="#2c2c2c"/>
            <circle cx="75" cy="85" r="1.5" fill="#2c2c2c"/>
            <circle cx="130" cy="110" r="1.5" fill="#2c2c2c"/>
            <circle cx="70" cy="115" r="1.5" fill="#2c2c2c"/>
            <circle cx="125" cy="145" r="1.5" fill="#2c2c2c"/>
            <circle cx="75" cy="155" r="1.5" fill="#2c2c2c"/>
            <text x="100" y="50" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="18" font-weight="600" fill="#2c2c2c">Onboarding</text>
            <text x="88" y="105" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="48" font-weight="700" fill="#2c2c2c">O</text>
            <text x="112" y="105" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="48" font-weight="700" fill="#2c2c2c">B</text>
            <text x="100" y="160" text-anchor="middle" font-family="Brush Script MT, Lucida Handwriting, cursive" font-size="10" fill="#2c2c2c">Global skills for job positioning</text>
          </svg>
        </div>
      </div>
    </div>
  `;
  
  // Create results HTML
  const resultsHTML = `
    <div class="container">
      <h1>${resultData.title}</h1>
      
      <h2>Emociones:</h2>
      <p>${resultData.emotions}</p>
      
      <h2>Meta:</h2>
      <p>${resultData.goal}</p>
      
      <h2>Juzga a los demás por:</h2>
      <p>${resultData.judgesOthersBy}</p>
      
      <h2>Influye en los demás mediante:</h2>
      <p>${resultData.influencesOthersThrough}</p>
      
      <h2>Su valor para la organización:</h2>
      <p>${resultData.valueToOrganization}</p>
      
      <h2>Abusa de:</h2>
      <p>${resultData.abuses}</p>
      
      <h2>Bajo presión:</h2>
      <p>${resultData.underPressure}</p>
      
      <h2>Teme:</h2>
      <p>${resultData.fears}</p>
      
      <h2>Sería más eficaz si:</h2>
      <p>${resultData.wouldBeMoreEffectiveIf}</p>
      
      <h2>Descripción:</h2>
      ${resultData.description.map(para => `<p>${para}</p>`).join('')}
      
      <div class="meta">
        <p><strong>Resultados DISC:</strong> D: ${results.D}, I: ${results.I}, S: ${results.S}, C: ${results.C}</p>
        <p><strong>Tipo principal:</strong> ${primaryType} - ${resultData.name}</p>
      </div>
    </div>
  `;
  
  // Insert into page
  document.body.innerHTML = logoHTML + resultsHTML;
}

// Run when page loads
document.addEventListener("DOMContentLoaded", displayResults);

