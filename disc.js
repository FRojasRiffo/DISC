document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("discForm");
  const words = groups[0].words;
  const totalGroups = words.length / 4;

  // Base scores iniciales: D=4, I=4, S=5, C=4
  const initialBaseScores = { D: 4, I: 4, S: 5, C: 4 };
  const displayOffset = { D: -4, I: -4, S: -5, C: -4 };

  // ✅ Nuevo mapeo de intensidad → segmento por tipo DISC
  function getSegmentFromIntensity(intensity, type) {
    const map = {
      D: {
        28: 7, 27: 7, 26: 7, 25: 7,
        24: 6, 23: 6, 22: 6, 21: 6, 
        20: 5, 19: 5, 18: 5, 17: 5,
        16: 4, 15: 4, 14: 4, 13: 4,
        12: 3, 11: 3, 10: 3, 9: 3,
        8: 2, 7: 2, 6: 2, 5: 2,
        4: 1, 3: 1, 2: 1, 1: 1
      },
      I: {
        28: 7, 27: 7, 26: 6, 25: 7,
        24: 6, 23: 6, 22: 6, 21: 6, 
        20: 5, 19: 5, 18: 5, 17: 5,
        16: 4, 15: 4, 14: 4, 13: 4,
        12: 3, 11: 3, 10: 3, 9: 3,
        8: 2, 7: 2, 6: 2, 5: 2,
        4: 1, 3: 1, 2: 1, 1: 1
      },
      S: {
        28: 7, 27: 7, 26: 6, 25: 7,
        24: 6, 23: 6, 22: 6, 21: 6, 
        20: 5, 19: 5, 18: 5, 17: 5,
        16: 4, 15: 4, 14: 4, 13: 4,
        12: 3, 11: 3, 10: 3, 9: 3,
        8: 2, 7: 2, 6: 2, 5: 2,
        4: 1, 3: 1, 2: 1, 1: 1
      },
      C: {
        28: 7, 27: 7, 26: 6, 25: 7,
        24: 6, 23: 6, 22: 6, 21: 6, 
        20: 5, 19: 5, 18: 5, 17: 5,
        16: 4, 15: 4, 14: 4, 13: 4,
        12: 3, 11: 3, 10: 3, 9: 3,
        8: 2, 7: 2, 6: 2, 5: 2,
        4: 1, 3: 1, 2: 1, 1: 1
      }
    };
    return map[type]?.[intensity] ?? 1;
  }

  // Tabla de mapeo directo de puntaje a intensidad para cada tipo DISC
  const scoreToIntensityMap = {
    D: {
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

  function getIntensityFromScore(score, type) {
    const map = scoreToIntensityMap[type];
    if (!map) return 15;

    let closestIntensity = 15;
    let minDiff = Infinity;

    for (const [intensity, mappedScore] of Object.entries(map)) {
      if (mappedScore === null) continue;
      const diff = Math.abs(mappedScore - score);
      if (diff < minDiff) {
        minDiff = diff;
        closestIntensity = parseInt(intensity);
      }
      if (mappedScore === score) return parseInt(intensity);
    }

    return closestIntensity;
  }

  // ✅ Nuevo método que usa el mapeo por tipo
  function getSegmentFromScore(score, type) {
    const intensity = getIntensityFromScore(score, type);
    return getSegmentFromIntensity(intensity, type);
  }

  // --- Generación del formulario ---
  for (let i = 0; i < words.length; i += 4) {
    const groupIndex = i / 4 + 1;
    const question = document.createElement("div");
    question.classList.add("question");
    question.innerHTML = `
      <h3>Grupo ${groupIndex}</h3>
      <table>
        <tr><th>Frase</th><th>Más</th><th>Menos</th></tr>
        ${words.slice(i, i + 4).map((word, j) => `
          <tr>
            <td>
              <span class="word-with-tooltip">
                ${word.text}
                <span class="tooltip-icon" data-description="${word.descripcion || ''}" data-word="${word.text}" tabindex="0" role="button" aria-label="Ver definición de ${word.text}">ⓘ</span>
              </span>
            </td>
            <td><input type="radio" class="mas" name="more_${groupIndex}" data-group="${groupIndex}" data-word="${i+j}" value="${word.type}" required></td>
            <td><input type="radio" class="menos" name="less_${groupIndex}" data-group="${groupIndex}" data-word="${i+j}" value="${word.type}" required></td>
          </tr>
        `).join("")}
      </table>`;
    form.appendChild(question);
  }

  // --- Funcionalidad de tooltips ---
  let touchStartTime = 0;
  let touchTarget = null;

  // Función auxiliar para escapar HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function createTooltip(iconElement) {
    const description = iconElement.getAttribute('data-description');
    const word = iconElement.getAttribute('data-word');
    
    if (!description || description.trim() === '') {
      console.log('No description found for:', word);
      return;
    }

    // Cerrar tooltip existente si hay uno abierto
    const existingTooltip = document.querySelector('.tooltip-overlay');
    if (existingTooltip) {
      existingTooltip.remove();
    }

    // Crear overlay oscuro
    const overlay = document.createElement('div');
    overlay.className = 'tooltip-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'tooltip-word');

    // Crear tooltip con contenido escapado
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-content';
    tooltip.innerHTML = `
      <div class="tooltip-header">
        <span id="tooltip-word" class="tooltip-word">${escapeHtml(word)}</span>
        <button class="tooltip-close" aria-label="Cerrar tooltip" tabindex="0">×</button>
      </div>
      <div class="tooltip-description">${escapeHtml(description)}</div>
    `;

    overlay.appendChild(tooltip);
    document.body.appendChild(overlay);

    // Función para cerrar el tooltip
    const closeTooltip = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      overlay.style.opacity = '0';
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.remove();
        }
      }, 200);
    };

    // Event listeners para cerrar
    const closeBtn = tooltip.querySelector('.tooltip-close');
    closeBtn.addEventListener('click', closeTooltip);
    closeBtn.addEventListener('touchend', closeTooltip);
    closeBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeTooltip();
      }
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeTooltip(e);
      }
    });

    overlay.addEventListener('touchend', (e) => {
      if (e.target === overlay) {
        closeTooltip(e);
      }
    });

    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeTooltip();
      }
    });

    // Enfocar el botón de cerrar para accesibilidad (solo en desktop)
    if (window.innerWidth > 768) {
      closeBtn.focus();
    }

    // Animación de entrada
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });
  }

  // Función para manejar la activación del tooltip
  function handleTooltipActivation(element) {
    if (!element || !element.classList.contains('tooltip-icon')) {
      return;
    }
    
    // Prevenir que se active múltiples veces rápidamente
    if (element.dataset.processing === 'true') {
      return;
    }
    
    element.dataset.processing = 'true';
    createTooltip(element);
    
    setTimeout(() => {
      element.dataset.processing = 'false';
    }, 300);
  }

  // Usar delegación de eventos para mejor rendimiento y compatibilidad móvil
  form.addEventListener('click', (e) => {
    const icon = e.target.closest('.tooltip-icon');
    if (icon) {
      e.preventDefault();
      e.stopPropagation();
      handleTooltipActivation(icon);
    }
  }, true);

  // Manejo mejorado de eventos táctiles
  form.addEventListener('touchstart', (e) => {
    const icon = e.target.closest('.tooltip-icon');
    if (icon) {
      touchStartTime = Date.now();
      touchTarget = icon;
      icon.style.transform = 'scale(0.9)';
    }
  }, { passive: true });

  form.addEventListener('touchend', (e) => {
    const icon = e.target.closest('.tooltip-icon');
    if (icon && icon === touchTarget) {
      const touchDuration = Date.now() - touchStartTime;
      // Solo activar si fue un tap rápido (menos de 300ms)
      if (touchDuration < 300) {
        e.preventDefault();
        e.stopPropagation();
        handleTooltipActivation(icon);
      }
      icon.style.transform = '';
      touchTarget = null;
    }
  }, { passive: false });

  form.addEventListener('touchcancel', (e) => {
    const icon = e.target.closest('.tooltip-icon');
    if (icon) {
      icon.style.transform = '';
      touchTarget = null;
    }
  }, { passive: true });

  // Soporte para teclado (Enter y Espacio)
  form.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('tooltip-icon')) {
      e.preventDefault();
      handleTooltipActivation(e.target);
    }
  }, true);

  // --- Cálculo de puntajes ---
  function calculateScores() {
    const results = { D: initialBaseScores.D, I: initialBaseScores.I, S: initialBaseScores.S, C: initialBaseScores.C };
    for (let i = 1; i <= totalGroups; i++) {
      const more = form.querySelector(`input[name="more_${i}"]:checked`);
      const less = form.querySelector(`input[name="less_${i}"]:checked`);
      if (more) results[more.value]++;
      if (less) results[less.value]--;
    }
    return {
      D: results.D + displayOffset.D,
      I: results.I + displayOffset.I,
      S: results.S + displayOffset.S,
      C: results.C + displayOffset.C
    };
  }

  function formatScore(score) {
    return score >= 0 ? `+${score}` : `${score}`;
  }

  function updateScoreCounter() {
    try {
      const scores = calculateScores();
      const counterElement = document.getElementById("scoreCounter");
      if (!counterElement) return;

      let masCount = 0, menosCount = 0;
      for (let i = 1; i <= totalGroups; i++) {
        if (form.querySelector(`input[name="more_${i}"]:checked`)) masCount++;
        if (form.querySelector(`input[name="less_${i}"]:checked`)) menosCount++;
      }

      const masRemaining = totalGroups - masCount;
      const menosRemaining = totalGroups - menosCount;

      const segments = {
        D: getSegmentFromScore(scores.D, 'D'),
        I: getSegmentFromScore(scores.I, 'I'),
        S: getSegmentFromScore(scores.S, 'S'),
        C: getSegmentFromScore(scores.C, 'C')
      };

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
            <tr><th>DISC</th><th>D</th><th>I</th><th>S</th><th>C</th></tr>
          </thead>
          <tbody>
            <tr><td>Segmento</td><td>${segments.D}</td><td>${segments.I}</td><td>${segments.S}</td><td>${segments.C}</td></tr>
            <tr><td>Intensidad</td><td>${intensities.D}</td><td>${intensities.I}</td><td>${intensities.S}</td><td>${intensities.C}</td></tr>
            <tr><td>Puntaje</td><td>${formatScore(scores.D)}</td><td>${formatScore(scores.I)}</td><td>${formatScore(scores.S)}</td><td>${formatScore(scores.C)}</td></tr>
          </tbody>
        </table>
        <div style="margin-top:10px; font-size:0.9em; color:#555;">
          <strong>Progreso:</strong> ${masCount}/${totalGroups} "Más" y ${menosCount}/${totalGroups} "Menos"
          ${masRemaining > 0 || menosRemaining > 0 ? `<br><span style="color:#e67e22;">Faltan ${masRemaining} "Más" y ${menosRemaining} "Menos"</span>` : '<br><span style="color:#27ae60;">✓ Test completo</span>'}
        </div>
      `;
    } catch (error) {
      console.error("Error en el contador:", error);
    }
  }

  form.addEventListener("change", e => {
    if (e.target.classList.contains("mas") || e.target.classList.contains("menos")) {
      const input = e.target;
      const group = input.dataset.group;
      const word = input.dataset.word;
      const mas = form.querySelector(`input.mas[data-word="${word}"][data-group="${group}"]`);
      const menos = form.querySelector(`input.menos[data-word="${word}"][data-group="${group}"]`);
      if (input.classList.contains("mas") && mas.checked) menos.checked = false;
      if (input.classList.contains("menos") && menos.checked) mas.checked = false;
      updateScoreCounter();
    }
  });

  document.getElementById("randomizeBtn").addEventListener("click", () => {
    for (let i = 1; i <= totalGroups; i++) {
      const masOptions = Array.from(form.querySelectorAll(`input[name="more_${i}"]`));
      const menosOptions = Array.from(form.querySelectorAll(`input[name="less_${i}"]`));
      const masIndex = Math.floor(Math.random() * 4);
      let menosIndex;
      do { menosIndex = Math.floor(Math.random() * 4); } while (menosIndex === masIndex);
      masOptions[masIndex].checked = true;
      menosOptions[menosIndex].checked = true;
    }
    updateScoreCounter();
  });

  document.getElementById("submitBtn").addEventListener("click", e => {
    e.preventDefault();
    const results = { ...initialBaseScores };

    for (let i = 1; i <= totalGroups; i++) {
      const more = form.querySelector(`input[name="more_${i}"]:checked`);
      const less = form.querySelector(`input[name="less_${i}"]:checked`);
      if (!more || !less) return alert(`Selecciona ambos "Más" y "Menos" para el grupo ${i}`);
      if (more.value === less.value) return alert(`No puedes elegir el mismo tipo para "Más" y "Menos" en el grupo ${i}`);
      results[more.value]++;
      results[less.value]--;
    }

    // Calcular los puntajes con offset para display
    const displayScores = {
      D: results.D + displayOffset.D,
      I: results.I + displayOffset.I,
      S: results.S + displayOffset.S,
      C: results.C + displayOffset.C
    };

    // Calcular los segmentos
    const segments = {
      D: getSegmentFromScore(displayScores.D, 'D'),
      I: getSegmentFromScore(displayScores.I, 'I'),
      S: getSegmentFromScore(displayScores.S, 'S'),
      C: getSegmentFromScore(displayScores.C, 'C')
    };

    // Guardar resultados y segmentos en localStorage
    console.log("Guardando resultados en localStorage:");
    console.log("  results:", results);
    console.log("  segments:", segments);
    console.log("  displayScores:", displayScores);
    
    try {
      // Intentar guardar en localStorage
      localStorage.setItem("discResults", JSON.stringify(results));
      localStorage.setItem("discSegments", JSON.stringify(segments));
      localStorage.setItem("discDisplayScores", JSON.stringify(displayScores));
      
      // También guardar en sessionStorage como respaldo
      try {
        sessionStorage.setItem("discResults", JSON.stringify(results));
        sessionStorage.setItem("discSegments", JSON.stringify(segments));
        sessionStorage.setItem("discDisplayScores", JSON.stringify(displayScores));
        console.log("Datos también guardados en sessionStorage");
      } catch (e) {
        console.warn("No se pudo guardar en sessionStorage:", e);
      }
      
      // Verificar que se guardaron correctamente
      console.log("Verificando datos guardados:");
      console.log("  localStorage discResults:", localStorage.getItem("discResults"));
      console.log("  localStorage discSegments:", localStorage.getItem("discSegments"));
      
      // Pequeño delay para asegurar que los datos se guarden antes de redirigir
      setTimeout(() => {
        // Verificar una vez más antes de redirigir
        const verifyResults = localStorage.getItem("discResults");
        const verifySegments = localStorage.getItem("discSegments");
        console.log("Verificación final antes de redirigir:");
        console.log("  discResults:", verifyResults);
        console.log("  discSegments:", verifySegments);
        
        // Si localStorage falla, intentar pasar los datos por URL
        if (!verifyResults || !verifySegments) {
          console.warn("localStorage no funcionó, pasando datos por URL");
          const params = new URLSearchParams({
            segments: JSON.stringify(segments),
            results: JSON.stringify(results)
          });
          window.location.href = "patron.html?" + params.toString();
          return;
        }
        
        window.location.href = "patron.html";
      }, 100);
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
      // Si localStorage falla, pasar los datos por URL
      console.log("Intentando pasar datos por URL como respaldo");
      const params = new URLSearchParams({
        segments: JSON.stringify(segments),
        results: JSON.stringify(results)
      });
      window.location.href = "patron.html?" + params.toString();
    }
  });

  updateScoreCounter();
});
