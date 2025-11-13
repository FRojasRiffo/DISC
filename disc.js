document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("discForm");
  const words = groups[0].words;
  const totalGroups = words.length / 4;

  // Base scores iniciales: D=4, I=4, S=5, C=4
  const initialBaseScores = { D: 4, I: 4, S: 5, C: 4 };
  const displayOffset = { D: -4, I: -4, S: -5, C: -4 };

  // Mapeo de intensidad a segmento según la tabla DISC
  // Segment 7: Intensities 28, 27, 26
  // Segment 6: Intensities 25, 24, 23, 22, 21, 20
  // Segment 5: Intensities 19, 18, 17
  // Segment 4: Intensities 16, 15, 14, 13
  // Segment 3: Intensities 12, 11, 10, 9
  // Segment 2: Intensities 8, 7, 6, 5
  // Segment 1: Intensities 4, 3, 2, 1
  function getSegmentFromIntensity(intensity) {
    if (intensity >= 28) return 7;
    if (intensity >= 25) return 6;
    if (intensity >= 19) return 5;
    if (intensity >= 13) return 4;
    if (intensity >= 9) return 3;
    if (intensity >= 5) return 2;
    return 1;
  }

  // Tabla de mapeo directo de puntaje a intensidad para cada tipo DISC
  // Basado en la tabla proporcionada
  const scoreToIntensityMap = {
    D: {
      // Intensidad: Puntaje
      28: 28, 27: 12, 26: null, 25: 9, 24: 8, 23: 7, 22: 6, 21: 5, 20: 4,
      19: 3, 18: null, 17: 2, 16: 1, 15: 0, 14: 0, 13: null, 12: -1,
      11: -2, 10: null, 9: -3, 8: -4, 7: -5, 6: -6, 5: -7, 4: -8,
      3: null, 2: -11, 1: -28
    },
    I: {
      28: 28, 27: 10, 26: null, 25: 7, 24: 6, 23: 5, 22: 4, 21: null, 20: 3,
      19: null, 18: 2, 17: null, 16: 1, 15: 0, 14: null, 13: -1, 12: -2,
      11: null, 10: -3, 9: null, 8: -4, 7: -5, 6: -6, 5: -7, 4: -8,
      3: null, 2: -11, 1: -28
    },
    S: {
      28: 28, 27: 10, 26: null, 25: 8, 24: 7, 23: 6, 22: 4, 21: 3, 20: 2,
      19: 1, 18: null, 17: 0, 16: -1, 15: -2, 14: null, 13: -3, 12: -4,
      11: -5, 10: null, 9: -6, 8: -7, 7: -8, 6: -9, 5: -10, 4: -11,
      3: null, 2: -13, 1: -28
    },
    C: {
      28: 28, 27: 11, 26: null, 25: 9, 24: 8, 23: 7, 22: 6, 21: 5, 20: 4,
      19: null, 18: 3, 17: null, 16: 2, 15: 1, 14: null, 13: 0, 12: -1,
      11: null, 10: -2, 9: null, 8: -3, 7: -4, 6: null, 5: -5, 4: -6,
      3: null, 2: -11, 1: -28
    }
  };

  // Convertir puntaje DISC a intensidad usando la tabla de mapeo
  function getIntensityFromScore(score, type) {
    const map = scoreToIntensityMap[type];
    if (!map) return 15; // Default
    
    // Buscar la intensidad que corresponde al puntaje
    // Si hay múltiples, tomar la más cercana
    let closestIntensity = 15; // Default
    let minDiff = Infinity;
    
    for (const [intensity, mappedScore] of Object.entries(map)) {
      if (mappedScore === null) continue;
      const diff = Math.abs(mappedScore - score);
      if (diff < minDiff) {
        minDiff = diff;
        closestIntensity = parseInt(intensity);
      }
      // Si encontramos una coincidencia exacta, retornar inmediatamente
      if (mappedScore === score) {
        return parseInt(intensity);
      }
    }
    
    // Si no hay coincidencia exacta, usar interpolación lineal entre los puntos más cercanos
    // Buscar los dos puntos más cercanos (uno mayor y uno menor)
    let lowerIntensity = null;
    let upperIntensity = null;
    let lowerScore = null;
    let upperScore = null;
    
    for (const [intensity, mappedScore] of Object.entries(map)) {
      if (mappedScore === null) continue;
      const intIntensity = parseInt(intensity);
      if (mappedScore <= score) {
        if (lowerIntensity === null || mappedScore > lowerScore) {
          lowerIntensity = intIntensity;
          lowerScore = mappedScore;
        }
      }
      if (mappedScore >= score) {
        if (upperIntensity === null || mappedScore < upperScore) {
          upperIntensity = intIntensity;
          upperScore = mappedScore;
        }
      }
    }
    
    // Interpolación lineal
    if (lowerIntensity !== null && upperIntensity !== null && lowerScore !== upperScore) {
      const ratio = (score - lowerScore) / (upperScore - lowerScore);
      const interpolated = lowerIntensity + ratio * (upperIntensity - lowerIntensity);
      return Math.round(interpolated);
    }
    
    // Si solo tenemos un punto de referencia, usar extrapolación
    if (lowerIntensity !== null && upperIntensity === null) {
      // Extrapolar hacia abajo
      return Math.max(1, lowerIntensity - 1);
    }
    if (upperIntensity !== null && lowerIntensity === null) {
      // Extrapolar hacia arriba
      return Math.min(28, upperIntensity + 1);
    }
    
    return closestIntensity;
  }

  // Obtener el segmento actual basado en el puntaje y tipo
  function getSegmentFromScore(score, type) {
    const intensity = getIntensityFromScore(score, type);
    return getSegmentFromIntensity(intensity);
  }

  // Generate form
  for (let i = 0; i < words.length; i += 4) {
    const groupIndex = i / 4 + 1;
    const question = document.createElement("div");
    question.classList.add("question");
    question.innerHTML = `
      <h3>Group ${groupIndex}</h3>
      <table>
        <tr><th>Word</th><th>Más</th><th>Menos</th></tr>
        ${words.slice(i, i + 4).map((word, j) => `
          <tr>
            <td>${word.text}</td>
            <td><input type="radio" class="mas" name="more_${groupIndex}" data-group="${groupIndex}" data-word="${i+j}" value="${word.type}" required></td>
            <td><input type="radio" class="menos" name="less_${groupIndex}" data-group="${groupIndex}" data-word="${i+j}" value="${word.type}" required></td>
          </tr>
        `).join("")}
      </table>`;
    form.appendChild(question);
  }

  // Function to calculate current scores
  function calculateScores() {
    const results = { D: initialBaseScores.D, I: initialBaseScores.I, S: initialBaseScores.S, C: initialBaseScores.C };

    for (let i = 1; i <= totalGroups; i++) {
      const more = form.querySelector(`input[name="more_${i}"]:checked`);
      const less = form.querySelector(`input[name="less_${i}"]:checked`);
      
      if (more) {
        results[more.value]++;
      }
      if (less) {
        results[less.value]--;
      }
    }

    return {
    D: results.D + displayOffset.D,
    I: results.I + displayOffset.I,
    S: results.S + displayOffset.S,
    C: results.C + displayOffset.C
  };
  }

  // Function to format score with sign
  function formatScore(score) {
    return score >= 0 ? `+${score}` : `${score}`;
  }

  // Function to update score counter display
  function updateScoreCounter() {
    try {
      const scores = calculateScores();
      const counterElement = document.getElementById("scoreCounter");
      
      if (!counterElement) {
        console.error("Elemento scoreCounter no encontrado");
        return;
      }
      
      // Count how many Más and Menos are selected
      let masCount = 0;
      let menosCount = 0;
      for (let i = 1; i <= totalGroups; i++) {
        const more = form.querySelector(`input[name="more_${i}"]:checked`);
        const less = form.querySelector(`input[name="less_${i}"]:checked`);
        if (more) masCount++;
        if (less) menosCount++;
      }
      
      const masRemaining = totalGroups - masCount;
      const menosRemaining = totalGroups - menosCount;
      
      // Calcular segmentos actuales para cada tipo
      const segments = {
        D: getSegmentFromScore(scores.D, 'D'),
        I: getSegmentFromScore(scores.I, 'I'),
        S: getSegmentFromScore(scores.S, 'S'),
        C: getSegmentFromScore(scores.C, 'C')
      };
      
      // Calcular intensidades actuales
      const intensities = {
        D: getIntensityFromScore(scores.D, 'D'),
        I: getIntensityFromScore(scores.I, 'I'),
        S: getIntensityFromScore(scores.S, 'S'),
        C: getIntensityFromScore(scores.C, 'C')
      };
      
      counterElement.innerHTML = `
        <h3 style="margin-bottom: 15px; color: #2c2c2c; text-align: center;">Contador de Puntuación DISC</h3>
        <table class="score-table">
          <thead>
            <tr>
              <th>DISC</th>
              <th>D</th>
              <th>I</th>
              <th>S</th>
              <th>C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="score-label">Segmento Actual</td>
              <td class="score-base">${segments.D}</td>
              <td class="score-base">${segments.I}</td>
              <td class="score-base">${segments.S}</td>
              <td class="score-base">${segments.C}</td>
            </tr>
            <tr>
              <td class="score-label">Intensidad</td>
              <td class="score-intensity">${intensities.D}</td>
              <td class="score-intensity">${intensities.I}</td>
              <td class="score-intensity">${intensities.S}</td>
              <td class="score-intensity">${intensities.C}</td>
            </tr>
            <tr>
              <td class="score-label">Puntuación Actual</td>
              <td class="score-value">${formatScore(scores.D)}</td>
              <td class="score-value">${formatScore(scores.I)}</td>
              <td class="score-value">${formatScore(scores.S)}</td>
              <td class="score-value">${formatScore(scores.C)}</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 15px; padding: 10px; background: #fff; border-radius: 8px; font-size: 0.9em; color: #555;">
          <strong>Progreso:</strong> ${masCount}/${totalGroups} "Más" seleccionados, ${menosCount}/${totalGroups} "Menos" seleccionados
          ${masRemaining > 0 || menosRemaining > 0 ? `<br><span style="color: #e67e22;">Faltan ${masRemaining} "Más" y ${menosRemaining} "Menos"</span>` : '<br><span style="color: #27ae60;">✓ Test completo</span>'}
        </div>
      `;
    } catch (error) {
      console.error("Error al actualizar contador de puntuación:", error);
      const counterElement = document.getElementById("scoreCounter");
      if (counterElement) {
        counterElement.innerHTML = `
          <div style="padding: 20px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; color: #856404;">
            <strong>Error:</strong> No se pudo cargar la tabla de puntuación. Por favor, recarga la página.
          </div>
        `;
      }
    }
  }

  // Prevent selecting "Más" and "Menos" for the same word
  form.addEventListener("change", (e) => {
    const input = e.target;
    if (input.classList.contains("mas") || input.classList.contains("menos")) {
      const group = input.dataset.group;
      const word = input.dataset.word;
      const mas = form.querySelector(`input.mas[data-word="${word}"][data-group="${group}"]`);
      const menos = form.querySelector(`input.menos[data-word="${word}"][data-group="${group}"]`);
      if (input.classList.contains("mas") && mas.checked) menos.checked = false;
      if (input.classList.contains("menos") && menos.checked) mas.checked = false;
      
      // Update score counter when selection changes
      updateScoreCounter();
    }
  });

  // Randomize button
  const randomizeBtn = document.getElementById("randomizeBtn");

  randomizeBtn.addEventListener("click", () => {
    for (let i = 1; i <= totalGroups; i++) {
      const masOptions = Array.from(form.querySelectorAll(`input[name="more_${i}"]`));
      const menosOptions = Array.from(form.querySelectorAll(`input[name="less_${i}"]`));
      const masIndex = Math.floor(Math.random() * 4);
      let menosIndex;
      do { menosIndex = Math.floor(Math.random() * 4); } while (menosIndex === masIndex);
      masOptions[masIndex].checked = true;
      menosOptions[menosIndex].checked = true;
    }
    // Update score counter after randomizing
    updateScoreCounter();
  });

  // Submit and redirect
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const results = { D: initialBaseScores.D, I: initialBaseScores.I, S: initialBaseScores.S, C: initialBaseScores.C };

    for (let i = 1; i <= totalGroups; i++) {
      const more = form.querySelector(`input[name="more_${i}"]:checked`);
      const less = form.querySelector(`input[name="less_${i}"]:checked`);
      if (!more || !less) {
        alert(`Please select both "Más" and "Menos" for Group ${i}`);
        return;
      }
      if (more.value === less.value) {
        alert(`You cannot select the same type for "Más" and "Menos" in Group ${i}`);
        return;
      }
      results[more.value]++;
      results[less.value]--;
    }

    // Store results in localStorage
    localStorage.setItem("discResults", JSON.stringify(results));
    // Redirect to the results page
    window.location.href = "patron.html";
  });

  // Initialize score counter on page load
  updateScoreCounter();
});
