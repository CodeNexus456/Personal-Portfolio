
  /* ---------- Floating background particles ---------- */
  (function createParticles(){
    const wrap = document.getElementById('particles');
    const count = 22;
    for (let i = 0; i < count; i++){
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-10px';
      p.style.animationDuration = (10 + Math.random() * 12) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.opacity = 0.3 + Math.random() * 0.4;
      wrap.appendChild(p);
    }
  })();

  /* ---------- Scroll reveal (fade up / left / right) ---------- */
  const revealEls = document.querySelectorAll(
    '.section-heading, .mini-card, .profile-card, .form-card, .map-wrap, .newsletter-card'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    revealObserver.observe(el);
  });

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });











(function () {
    emailjs.init("4uNB190iSrEY1qN_U");
})();

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.send("service_gtan7tc", "template_uy1k4ps", {
        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    })
    .then(() => {
        alert("Message sent successfully 🚀");
        this.reset();
    })
    .catch((error) => {
        console.error(error);
        alert("Failed to send message ❌");
    });
});
