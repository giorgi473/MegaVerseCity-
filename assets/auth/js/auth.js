// Check if user is already logged in
document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    window.location.href = "assets/dashboard/dashboard.html";
  }
});

// მომხმარებლების მასივის ინიციალიზაცია localStorage-დან
let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

// --- ნებადართული ელ. ფოსტების სია ---
const allowedEmails = [
  "user1@example.com",
  "admin@example.com",
  "test@test.com",
];
// -----------------------------------

function switchForm(formType, clickedButton) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const toggleSlider = document.getElementById("toggleSlider");
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  clearAllErrors();
  clearAllInputValidationStates();
  updatePasswordStrengthIndicator("");
  updatePasswordRequirements("");
  updatePasswordStrengthIndicator("", "reset");
  updatePasswordRequirements("", "reset");
  document.getElementById("loginSuccess").style.display = "none";
  document.getElementById("registerSuccess").style.display = "none";
  document.getElementById("resetSuccess").style.display = "none";

  if (formType === "login") {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    forgotPasswordForm.classList.remove("active");
    toggleSlider.classList.remove("register");
    toggleBtns.forEach((btn) => btn.classList.remove("active"));
    toggleBtns[0].classList.add("active");
  } else if (formType === "register") {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    forgotPasswordForm.classList.remove("active");
    toggleSlider.classList.add("register");
    toggleBtns.forEach((btn) => btn.classList.remove("active"));
    toggleBtns[1].classList.add("active");
  } else if (formType === "forgotPassword") {
    forgotPasswordForm.classList.add("active");
    loginForm.classList.remove("active");
    registerForm.classList.remove("active");
    toggleSlider.classList.remove("register");
    toggleBtns.forEach((btn) => btn.classList.remove("active"));
    toggleBtns[0].classList.add("active");
  }
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

function validateField(inputElement, errorElementId) {
  const value = inputElement.value;
  let errorMessage = "";
  inputElement.classList.remove("invalid", "valid");
  if (value.trim() === "") {
    clearSpecificError(errorElementId);
    if (
      inputElement.id === "registerPassword" ||
      inputElement.id === "resetPassword"
    ) {
      updatePasswordStrengthIndicator(
        "",
        inputElement.id.startsWith("reset") ? "reset" : ""
      );
      updatePasswordRequirements(
        "",
        inputElement.id.startsWith("reset") ? "reset" : ""
      );
    } else if (
      inputElement.id === "registerConfirmPassword" ||
      inputElement.id === "resetConfirmPassword"
    ) {
      inputElement.classList.remove("invalid", "valid");
    }
    return;
  }
  if (inputElement.type === "email") {
    if (!validateEmail(value)) {
      errorMessage = "გთხოვთ შეიყვანოთ სწორი ელ. ფოსტის მისამართი";
    }
  } else if (inputElement.type === "password" || inputElement.type === "text") {
    if (
      inputElement.id === "registerPassword" ||
      inputElement.id === "resetPassword"
    ) {
      const requirements = {
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      };
      updatePasswordRequirements(
        value,
        inputElement.id.startsWith("reset") ? "reset" : ""
      );
      if (!requirements.length) {
        errorMessage = "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს";
      } else if (!requirements.uppercase) {
        errorMessage = "პაროლი უნდა შეიცავდეს მინიმუმ ერთ დიდ ასოს";
      } else if (!requirements.lowercase) {
        errorMessage = "პაროლი უნდა შეიცავდეს მინიმუმ ერთ პატარა ასოს";
      } else if (!requirements.number) {
        errorMessage = "პაროლი უნდა შეიცავდეს მინიმუმ ერთ ციფრს";
      } else if (!requirements.special) {
        errorMessage = "პაროლი უნდა შეიცავდეს მინიმუმ ერთ სპეციალურ სიმბოლოს";
      }
    } else if (inputElement.id === "loginPassword") {
      if (value.length < 6) {
        errorMessage = "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს";
      }
    } else if (inputElement.id === "registerConfirmPassword") {
      const passwordInput = document.getElementById("registerPassword");
      if (value !== passwordInput.value) {
        errorMessage = "პაროლები არ ემთხვევა";
      }
    } else if (inputElement.id === "resetConfirmPassword") {
      const passwordInput = document.getElementById("resetPassword");
      if (value !== passwordInput.value) {
        errorMessage = "პაროლები არ ემთხვევა";
      }
    }
  } else if (
    inputElement.type === "text" &&
    inputElement.id === "registerName"
  ) {
    if (value.length < 2) {
      errorMessage = "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს";
    }
  }
  if (errorMessage) {
    showError(errorElementId, errorMessage);
    inputElement.classList.add("invalid");
  } else {
    clearSpecificError(errorElementId);
    inputElement.classList.add("valid");
  }
}

const debouncedValidateField = debounce((inputElement, errorElementId) => {
  validateField(inputElement, errorElementId);
}, 300);

const debouncedValidateRegisterPassword = debounce(
  (inputElement, errorElementId) => {
    validateField(inputElement, errorElementId);
    updatePasswordStrengthIndicator(
      inputElement.value,
      inputElement.id.startsWith("reset") ? "reset" : ""
    );
    updatePasswordRequirements(
      inputElement.value,
      inputElement.id.startsWith("reset") ? "reset" : ""
    );
  },
  300
);

function checkPasswordStrength(password) {
  let score = 0;
  if (password.length > 0) {
    score = 1;
  }
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  if (
    password.length >= 12 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    score++;
  }
  return score;
}

function updatePasswordStrengthIndicator(password, prefix = "") {
  const strengthBar = document.getElementById(`${prefix}strengthBar`);
  const strengthText = document.getElementById(`${prefix}strengthText`);
  const strengthIndicator = document.getElementById(
    `${prefix}passwordStrengthIndicator`
  );
  if (!strengthBar || !strengthText || !strengthIndicator) return;
  if (password.length > 0) {
    strengthIndicator.classList.add("show");
  } else {
    strengthIndicator.classList.remove("show");
    return;
  }
  const score = checkPasswordStrength(password);
  let width = 0;
  let text = "";
  let className = "";
  if (score <= 2) {
    width = 25;
    text = "სუსტი";
    className = "weak";
  } else if (score === 3) {
    width = 50;
    text = "საშუალო";
    className = "medium";
  } else if (score === 4) {
    width = 75;
    text = "ძლიერი";
    className = "strong";
  } else {
    width = 100;
    text = "ძალიან ძლიერი";
    className = "very-strong";
  }
  strengthBar.style.width = `${width}%`;
  strengthText.textContent = text;
  strengthBar.classList.remove("weak", "medium", "strong", "very-strong");
  strengthText.classList.remove("weak", "medium", "strong", "very-strong");
  if (className) {
    strengthBar.classList.add(className);
    strengthText.classList.add(className);
  }
}

function updatePasswordRequirements(password, prefix = "") {
  const reqLength = document.getElementById(`${prefix}reqLength`);
  const reqUppercase = document.getElementById(`${prefix}reqUppercase`);
  const reqLowercase = document.getElementById(`${prefix}reqLowercase`);
  const reqNumber = document.getElementById(`${prefix}reqNumber`);
  const reqSpecial = document.getElementById(`${prefix}reqSpecial`);
  const requirementsContainer = document.getElementById(
    `${prefix}passwordRequirements`
  );
  if (
    !reqLength ||
    !reqUppercase ||
    !reqLowercase ||
    !reqNumber ||
    !reqSpecial ||
    !requirementsContainer
  )
    return;
  if (password.length > 0) {
    requirementsContainer.classList.add("show");
  } else {
    requirementsContainer.classList.remove("show");
    return;
  }
  const checks = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  function updateRequirement(element, isValid) {
    if (isValid) {
      element.textContent = "✔";
      element.classList.add("valid");
    } else {
      element.textContent = "✖";
      element.classList.remove("valid");
    }
  }
  updateRequirement(reqLength, checks.length);
  updateRequirement(reqUppercase, checks.uppercase);
  updateRequirement(reqLowercase, checks.lowercase);
  updateRequirement(reqNumber, checks.number);
  updateRequirement(reqSpecial, checks.special);
}

function togglePasswordVisibility(inputId, buttonElement) {
  const input = document.getElementById(inputId);
  const icon = buttonElement.querySelector(".icon");
  if (input.type === "password") {
    input.type = "text";
    icon.innerHTML =
      '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-4.41 0-7.88-2.75-10-7.25.7-1.79 2.1-3.34 4.13-4.93M12 4c4.41 0 7.88 2.75 10 7.25-.7 1.79-2.1 3.34-4.13 4.93"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M2 2l20 20"/>';
  } else {
    input.type = "password";
    icon.innerHTML =
      '<path d="M2.06 12.06a12.06 12.06 0 0 1 20.06 0M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/><path d="M12 12.01V12"/>';
  }
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const loading = document.getElementById("loginLoading");
  const btnText = form.querySelector(".btn-text");
  const successMsg = document.getElementById("loginSuccess");
  clearAllErrors();
  successMsg.style.display = "none";
  validateField(emailInput, "loginEmailError");
  validateField(passwordInput, "loginPasswordError");
  const allInputs = form.querySelectorAll(".form-input");
  let isValid = true;
  allInputs.forEach((input) => {
    if (input.classList.contains("invalid") || input.value.trim() === "") {
      isValid = false;
    }
  });
  if (!isValid) {
    return;
  }
  loading.style.display = "block";
  btnText.style.display = "none";
  setTimeout(() => {
    loading.style.display = "none";
    btnText.style.display = "block";
    const email = emailInput.value;
    const password = passwordInput.value;
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      successMsg.textContent = "წარმატებით შეხვედით სისტემაში!";
      successMsg.style.display = "block";
      successMsg.classList.add("show");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ name: user.name, email: user.email })
      );
      setTimeout(() => {
        window.location.href = "assets/dashboard/dashboard.html";
      }, 1000);
      form.reset();
      clearAllInputValidationStates();
    } else {
      showError("loginEmailError", "არასწორი ელ. ფოსტა ან პაროლი!");
      emailInput.classList.add("invalid");
      passwordInput.classList.add("invalid");
    }
  }, 2000);
}

function handleRegister(event) {
  event.preventDefault();
  const form = event.target;
  const nameInput = document.getElementById("registerName");
  const emailInput = document.getElementById("registerEmail");
  const passwordInput = document.getElementById("registerPassword");
  const confirmPasswordInput = document.getElementById(
    "registerConfirmPassword"
  );
  const loading = document.getElementById("registerLoading");
  const btnText = form.querySelector(".btn-text");
  const successMsg = document.getElementById("registerSuccess");
  clearAllErrors();
  successMsg.style.display = "none";
  validateField(nameInput, "registerNameError");
  validateField(emailInput, "registerEmailError");
  validateField(passwordInput, "registerPasswordError");
  validateField(confirmPasswordInput, "registerConfirmError");
  const allInputs = form.querySelectorAll(".form-input");
  let isValid = true;
  allInputs.forEach((input) => {
    if (input.classList.contains("invalid") || input.value.trim() === "") {
      isValid = false;
    }
  });
  if (!isValid) {
    return;
  }
  loading.style.display = "block";
  btnText.style.display = "none";
  setTimeout(() => {
    loading.style.display = "none";
    btnText.style.display = "block";
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const isMailRuDomain = email.endsWith("@mail.ru");
    const isExactlyAllowed = allowedEmails.includes(email);
    if (!isMailRuDomain && !isExactlyAllowed) {
      showError(
        "registerEmailError",
        "ეს ელ. ფოსტა არ არის ნებადართული რეგისტრაციისთვის!"
      );
      emailInput.classList.add("invalid");
      return;
    }
    if (users.some((u) => u.email === email)) {
      showError("registerEmailError", "ეს ელ. ფოსტა უკვე რეგისტრირებულია!");
      emailInput.classList.add("invalid");
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    successMsg.textContent = "რეგისტრაცია წარმატებით დასრულდა!";
    successMsg.style.display = "block";
    successMsg.classList.add("show");
    form.reset();
    clearAllInputValidationStates();
    updatePasswordStrengthIndicator("");
    updatePasswordRequirements("");
    // Auto-switch to login form after successful registration
    setTimeout(() => {
      switchForm("login", document.querySelector(".toggle-btn:first-child"));
      // Pre-fill login form with registered credentials
      document.getElementById("loginEmail").value = email;
      document.getElementById("loginPassword").value = password;
    }, 1500);
  }, 2000);
}

function handleForgotPassword(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = document.getElementById("resetEmail");
  const passwordInput = document.getElementById("resetPassword");
  const confirmPasswordInput = document.getElementById("resetConfirmPassword");
  const loading = document.getElementById("resetLoading");
  const btnText = form.querySelector(".btn-text");
  const successMsg = document.getElementById("resetSuccess");
  clearAllErrors();
  successMsg.style.display = "none";
  validateField(emailInput, "resetEmailError");
  validateField(passwordInput, "resetPasswordError");
  validateField(confirmPasswordInput, "resetConfirmError");
  const allInputs = form.querySelectorAll(".form-input");
  let isValid = true;
  allInputs.forEach((input) => {
    if (input.classList.contains("invalid") || input.value.trim() === "") {
      isValid = false;
    }
  });
  if (!isValid) {
    return;
  }
  loading.style.display = "block";
  btnText.style.display = "none";
  setTimeout(() => {
    loading.style.display = "none";
    btnText.style.display = "block";
    const email = emailInput.value;
    const newPassword = passwordInput.value;
    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem("registeredUsers", JSON.stringify(users));
      successMsg.textContent = "პაროლი წარმატებით შეიცვალა!";
      successMsg.style.display = "block";
      successMsg.classList.add("show");
      form.reset();
      clearAllInputValidationStates();
      updatePasswordStrengthIndicator("", "reset");
      updatePasswordRequirements("", "reset");
      setTimeout(() => {
        switchForm("login", document.querySelector(".toggle-btn:first-child"));
        document.getElementById("loginEmail").value = email;
      }, 1500);
    } else {
      showError("resetEmailError", "ეს ელ. ფოსტა არ არის რეგისტრირებული!");
      emailInput.classList.add("invalid");
    }
  }, 2000);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = "block";
  errorElement.classList.add("show");
}

function clearSpecificError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.style.display = "none";
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }
}

function clearAllErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.style.display = "none";
    element.textContent = "";
    element.classList.remove("show");
  });
}

function clearAllInputValidationStates() {
  const inputs = document.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.classList.remove("invalid", "valid");
  });
}

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = {
  x: null,
  y: null,
  radius: 120,
};

function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener("resize", setCanvasSize);
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("mouseout", function () {
  mouse.x = null;
  mouse.y = null;
});

const styleComputed = getComputedStyle(document.body);
const accentColor1 = styleComputed.getPropertyValue("--accent-color-1").trim();
const accentColor2 = styleComputed.getPropertyValue("--accent-color-2").trim();

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

const rgbAccentColor1 = hexToRgb(accentColor1);
const rgbAccentColor2 = hexToRgb(accentColor2);

class Particle {
  constructor(x, y, color, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseSize = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.baseSpeedX = speedX;
    this.baseSpeedY = speedY;
    this.color = color;
    this.opacity = Math.random() * 0.4 + 0.2;
  }
  update() {
    if (mouse.x && mouse.y) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxForce = 10;
        let repulsionRadius = mouse.radius;
        let force = (repulsionRadius - distance) / repulsionRadius;
        let directionX = forceDirectionX * force * maxForce;
        let directionY = forceDirectionY * force * maxForce;
        this.speedX -= directionX * 0.06;
        this.speedY -= directionY * 0.06;
      } else {
        if (Math.abs(this.speedX - this.baseSpeedX) > 0.01) {
          this.speedX += (this.baseSpeedX - this.speedX) * 0.02;
        }
        if (Math.abs(this.speedY - this.baseSpeedY) > 0.01) {
          this.speedY += (this.baseSpeedY - this.speedY) * 0.02;
        }
      }
    }
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.speedX *= -1;
      this.x = Math.max(this.size, Math.min(this.x, canvas.width - this.size));
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.speedY *= -1;
      this.y = Math.max(this.size, Math.min(this.y, canvas.height - this.size));
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const rgb = hexToRgb(this.color);
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.opacity})`;
    ctx.fill();
    ctx.shadowBlur = this.size * 2;
    ctx.shadowColor = this.color;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
}

function initParticles() {
  particles = [];
  const particleCount = 80;
  const colors = [accentColor1, accentColor2, "#e2e8f0", "#ffffff"];
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 1.2 + 0.5;
    const speedX = Math.random() * 0.4 - 0.2;
    const speedY = Math.random() * 0.4 - 0.2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color, size, speedX, speedY));
  }
}

function connectParticles() {
  const maxDistance = 100;
  const mouseConnectDistance = 150;
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dist = Math.sqrt(
        (particles[a].x - particles[b].x) ** 2 +
          (particles[a].y - particles[b].y) ** 2
      );
      if (dist < maxDistance) {
        ctx.strokeStyle = `rgba(${rgbAccentColor1.r}, ${rgbAccentColor1.g}, ${
          rgbAccentColor1.b
        }, ${0.6 - dist / maxDistance})`;
        ctx.lineWidth = 0.1 + (1 - dist / maxDistance) * 0.4;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
    if (mouse.x && mouse.y) {
      const mouseDist = Math.sqrt(
        (particles[a].x - mouse.x) ** 2 + (particles[a].y - mouse.y) ** 2
      );
      if (mouseDist < mouseConnectDistance) {
        ctx.strokeStyle = `rgba(${rgbAccentColor2.r}, ${rgbAccentColor2.g}, ${
          rgbAccentColor2.b
        }, ${0.7 - mouseDist / mouseConnectDistance})`;
        ctx.lineWidth = 0.3 + (1 - mouseDist / mouseConnectDistance) * 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowBlur = 0;
  ctx.shadowColor = "transparent";
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".submit-btn, .toggle-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.5s ease-out;
        pointer-events: none;
        z-index: 10;
      `;
      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  });
});

const styleElement = document.createElement("style");
styleElement.textContent = `
  @keyframes ripple {
      to {
          transform: scale(2);
          opacity: 0;
      }
  }
`;
document.head.appendChild(styleElement);
