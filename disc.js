document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("discForm");
  const words = groups[0].words;
  const totalGroups = words.length / 4;

  // Base scores: D=4, I=4, S=5, C=4
    const baseScores = { D: 4, I: 4, S: 5, C: 4 };
    const displayOffset = { D: -4, I: -4, S: -5, C: -4 };

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
    const results = { D: baseScores.D, I: baseScores.I, S: baseScores.S, C: baseScores.C };

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
    const scores = calculateScores();
    const counterElement = document.getElementById("scoreCounter");
    
    if (counterElement) {
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
              <td class="score-label">Base</td>
              <td class="score-base">${baseScores.D}</td>
              <td class="score-base">${baseScores.I}</td>
              <td class="score-base">${baseScores.S}</td>
              <td class="score-base">${baseScores.C}</td>
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
    const results = { D: baseScores.D, I: baseScores.I, S: baseScores.S, C: baseScores.C };

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
