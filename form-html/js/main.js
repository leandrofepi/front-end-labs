(function () {
  const form = document.getElementById("cadastro-form");
  const formSteps = document.querySelectorAll(".form-step");
  const stepIndicators = document.querySelectorAll(".stepper .step");
  const stepLines = document.querySelectorAll(".step-line");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnSubmit = document.getElementById("btn-submit");

  let currentStep = 1;
  const totalSteps = formSteps.length;

  // ---- Navegação entre etapas ----

  function goToStep(step) {
    formSteps.forEach((el) => el.classList.remove("active"));
    document
      .querySelector(`.form-step[data-step="${step}"]`)
      .classList.add("active");

    stepIndicators.forEach((el, i) => {
      const n = i + 1;
      el.classList.toggle("active", n === step);
      el.classList.toggle("done", n < step);
    });

    stepLines.forEach((line, i) => {
      line.classList.toggle("done", i < step - 1);
    });

    btnPrev.hidden = step === 1;
    btnNext.hidden = step === totalSteps;
    btnSubmit.hidden = step !== totalSteps;

    currentStep = step;
  }

  // ---- Validação por etapa ----

  function validateStep(step) {
    const stepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = stepEl.querySelectorAll("input[required], select[required]");
    let valid = true;

    inputs.forEach((input) => {
      const group = input.closest(".input-group");
      if (!group) return;
      if (!input.checkValidity()) {
        group.classList.add("error");
        group.classList.remove("success");
        valid = false;
      } else {
        group.classList.remove("error");
        group.classList.add("success");
      }
    });

    if (step === 3) {
      const senha = document.getElementById("senha");
      const confirma = document.getElementById("confirmaSenha");
      const msg = document.getElementById("senha-match-msg");
      if (senha.value && confirma.value && senha.value !== confirma.value) {
        confirma.closest(".input-group").classList.add("error");
        confirma.closest(".input-group").classList.remove("success");
        msg.textContent = "As senhas não coincidem.";
        msg.style.color = "var(--error-color)";
        valid = false;
      }
    }

    return valid;
  }

  btnNext.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      goToStep(currentStep + 1);
    }
  });

  btnPrev.addEventListener("click", () => {
    goToStep(currentStep - 1);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      alert("Cadastro realizado com sucesso!");
      form.reset();
      document
        .querySelectorAll(".input-group")
        .forEach((g) => g.classList.remove("error", "success"));
      document
        .querySelectorAll(".input-group select")
        .forEach((s) => s.classList.remove("has-value"));
      document.getElementById("password-strength").className =
        "password-strength";
      document.getElementById("senha-match-msg").textContent = "";
      document.getElementById("avatar-preview").innerHTML =
        '<span class="avatar-placeholder">+</span>';
      goToStep(1);
    }
  });

  // ---- Força da senha ----

  const senhaInput = document.getElementById("senha");
  const strengthBar = document.getElementById("password-strength");

  senhaInput.addEventListener("input", () => {
    const val = senhaInput.value;
    strengthBar.className = "password-strength";
    if (!val) return;
    if (val.length < 8) {
      strengthBar.classList.add("weak");
    } else if (val.length < 12 || !/[A-Z]/.test(val) || !/\d/.test(val)) {
      strengthBar.classList.add("medium");
    } else {
      strengthBar.classList.add("strong");
    }
  });

  // ---- Confirmação de senha em tempo real ----

  const confirmaSenhaInput = document.getElementById("confirmaSenha");
  const senhaMsgEl = document.getElementById("senha-match-msg");

  confirmaSenhaInput.addEventListener("input", () => {
    const group = confirmaSenhaInput.closest(".input-group");
    if (!confirmaSenhaInput.value) {
      senhaMsgEl.textContent = "";
      group.classList.remove("error", "success");
      return;
    }
    if (senhaInput.value === confirmaSenhaInput.value) {
      group.classList.remove("error");
      group.classList.add("success");
      senhaMsgEl.textContent = "✓ Senhas coincidem.";
      senhaMsgEl.style.color = "var(--success-color)";
    } else {
      group.classList.remove("success");
      group.classList.add("error");
      senhaMsgEl.textContent = "As senhas não coincidem.";
      senhaMsgEl.style.color = "var(--error-color)";
    }
  });

  // ---- Label flutuante para select ----

  document.querySelectorAll(".input-group select").forEach((sel) => {
    sel.addEventListener("change", () => {
      sel.classList.toggle("has-value", sel.value !== "");
    });
  });

  // ---- Preview do avatar ----

  const avatarInput = document.getElementById("avatar");
  const avatarPreview = document.getElementById("avatar-preview");

  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.innerHTML = `<img src="${e.target.result}" alt="Prévia do avatar" />`;
      };
      reader.readAsDataURL(file);
    }
  });

  // ---- Máscara de CPF ----

  const cpfInput = document.getElementById("cpf");
  cpfInput.addEventListener("input", () => {
    let val = cpfInput.value.replace(/\D/g, "");
    if (val.length > 9) {
      val = val.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, "$1.$2.$3-$4");
    } else if (val.length > 6) {
      val = val.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, "$1.$2.$3");
    } else if (val.length > 3) {
      val = val.replace(/^(\d{3})(\d{0,3}).*/, "$1.$2");
    }
    cpfInput.value = val;
  });

  // ---- Máscara de CEP ----

  const cepInput = document.getElementById("cep");
  cepInput.addEventListener("input", () => {
    let val = cepInput.value.replace(/\D/g, "");
    if (val.length > 5) {
      val = val.replace(/^(\d{5})(\d{0,3}).*/, "$1-$2");
    }
    cepInput.value = val;
  });

  // Inicializa na etapa 1
  goToStep(1);
})();
