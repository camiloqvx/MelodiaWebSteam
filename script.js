document.addEventListener("DOMContentLoaded", () => {

  // 1. Menú adaptable para celulares
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  // 2. Buscador de géneros musicales
  const search = document.querySelector("#genreSearch");
  const genreCards = document.querySelectorAll(".genre-card");
  const noResults = document.querySelector("#noResults");

  if (search && genreCards.length) {
    search.addEventListener("input", () => {
      const term = search.value.trim().toLowerCase();
      let visibleCount = 0;

      genreCards.forEach(card => {
        const name = card.dataset.name || "";
        const content = card.textContent.toLowerCase();
        const matches = name.includes(term) || content.includes(term);

        card.classList.toggle("hidden", !matches);

        if (matches) {
          visibleCount++;
        }
      });

      if (noResults) {
        noResults.classList.toggle("hidden", visibleCount !== 0);
      }
    });
  }

  // 3. Mini cuestionario de instrumentos
  const quizButtons = document.querySelectorAll(".quiz-option");
  const quizFeedback = document.querySelector("#quizFeedback");

  quizButtons.forEach(button => {
    button.addEventListener("click", () => {
      quizButtons.forEach(item => {
        item.classList.remove("correct", "incorrect");
      });

      const correct = button.dataset.correct === "true";

      button.classList.add(correct ? "correct" : "incorrect");

      if (quizFeedback) {
        quizFeedback.textContent = correct
          ? "¡Correcto! El tambor es un instrumento de percusión. 🎵"
          : "Casi. Inténtalo otra vez: piensa en el instrumento que se golpea.";

        quizFeedback.style.color = correct ? "#8be0b1" : "#ff9ba7";
      }
    });
  });

  // 4. Validación del formulario de contacto
  const form = document.querySelector("#contactForm");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const name = document.querySelector("#name");
      const email = document.querySelector("#email");
      const favorite = document.querySelector("#favorite");
      const message = document.querySelector("#message");
      const feedback = document.querySelector("#formFeedback");

      let valid = true;

      document.querySelector("#nameError").textContent = "";
      document.querySelector("#emailError").textContent = "";
      document.querySelector("#messageError").textContent = "";

      feedback.textContent = "";
      feedback.className = "form-feedback";

      if (name.value.trim().length < 2) {
        document.querySelector("#nameError").textContent =
          "Escribe un nombre de al menos 2 caracteres.";
        valid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email.value.trim())) {
        document.querySelector("#emailError").textContent =
          "Escribe un correo válido.";
        valid = false;
      }

      if (message.value.trim().length < 10) {
        document.querySelector("#messageError").textContent =
          "El mensaje debe tener al menos 10 caracteres.";
        valid = false;
      }

      if (!favorite.value) {
        favorite.style.borderColor = "#ff9ba7";
        valid = false;
      } else {
        favorite.style.borderColor = "";
      }

      if (!valid) {
        feedback.textContent =
          "Revisa los campos marcados e inténtalo de nuevo.";
        feedback.classList.add("error");
        return;
      }

      feedback.textContent =
        `¡Gracias, ${name.value.trim()}! El formulario pasó la validación.`;

      feedback.classList.add("success");
      form.reset();
    });
  }

});
