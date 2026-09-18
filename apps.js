document.getElementById("year").textContent = new Date().getFullYear();

// theme toggle
const root = document.documentElement;
const btn = document.getElementById("themeToggle");
function applyTheme(t) {
  if (t) {
    root.setAttribute("data-theme", t);
  } else {
    root.removeAttribute("data-theme");
  }
}
try {
  const saved = localStorage.getItem("sk-theme");
  if (saved) applyTheme(saved);
} catch (e) {}
btn.addEventListener("click", () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const current =
    root.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("sk-theme", next);
  } catch (e) {}
});

// contact form -> validate, then open mail client with prefilled message
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const RECEIVER_EMAIL = "ksurajkumar336@gmail.com";

function setFieldError(id, message) {
  const row = document.getElementById(id).closest(".form-row");
  const err = row.querySelector(".form-error");
  if (message) {
    row.classList.add("invalid");
    err.textContent = message;
  } else {
    row.classList.remove("invalid");
    err.textContent = "";
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const name = document.getElementById("cf-name").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const reason = document.getElementById("cf-reason").value;
  const message = document.getElementById("cf-message").value.trim();

  let valid = true;
  if (!name) {
    setFieldError("cf-name", "Please enter your name.");
    valid = false;
  } else {
    setFieldError("cf-name", "");
  }

  if (!email) {
    setFieldError("cf-email", "Please enter your email.");
    valid = false;
  } else if (!isValidEmail(email)) {
    setFieldError("cf-email", "Please enter a valid email.");
    valid = false;
  } else {
    setFieldError("cf-email", "");
  }

  if (!message) {
    setFieldError("cf-message", "Please write a short message.");
    valid = false;
  } else {
    setFieldError("cf-message", "");
  }

  if (!valid) {
    formStatus.textContent = "Please fix the highlighted fields.";
    formStatus.classList.add("bad");
    return;
  }

  const subject = encodeURIComponent(`Portfolio contact — ${reason} — ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nReason: ${reason}\n\nMessage:\n${message}`
  );
  window.location.href = `mailto:${RECEIVER_EMAIL}?subject=${subject}&body=${body}`;

  formStatus.textContent = "Opening your email app to send this message...";
  formStatus.classList.add("ok");
  contactForm.reset();
});

// mobile menu toggle
const menuBtn = document.getElementById("menuToggle");
const stationNav = document.getElementById("stationNav");
menuBtn.addEventListener("click", () => {
  const isOpen = stationNav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});
stationNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    stationNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#stationNav a");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("active"));
        const active = document.querySelector(
          `#stationNav a[href="#${entry.target.id}"]`
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => obs.observe(s));
