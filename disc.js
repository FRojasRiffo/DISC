document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("discForm");
  const words = groups[0].words;
  const totalGroups = words.length / 4;

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

  // Prevent selecting “Más” and “Menos” for the same word
  form.addEventListener("change", (e) => {
    const input = e.target;
    if (input.classList.contains("mas") || input.classList.contains("menos")) {
      const group = input.dataset.group;
      const word = input.dataset.word;
      const mas = form.querySelector(`input.mas[data-word="${word}"][data-group="${group}"]`);
      const menos = form.querySelector(`input.menos[data-word="${word}"][data-group="${group}"]`);
      if (input.classList.contains("mas") && mas.checked) menos.checked = false;
      if (input.classList.contains("menos") && menos.checked) mas.checked = false;
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
  });

  // Submit and redirect
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const results = { D: 0, I: 0, S: 0, C: 0 };

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
});
