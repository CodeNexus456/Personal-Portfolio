// JAVASCRIPT — particles, reveal, form validation, footer FX
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

  /* ---------- Contact form validation + fake submit ---------- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const fields = {
    fullName: { el: document.getElementById('fullName'), validate: v => v.trim().length > 1 },
    email:    { el: document.getElementById('email'),    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    phone:    { el: document.getElementById('phone'),    validate: v => /^[\d+\-\s()]{7,15}$/.test(v.trim()) },
    subject:  { el: document.getElementById('subject'),  validate: v => v.trim().length > 2 },
    message:  { el: document.getElementById('message'),  validate: v => v.trim().length >= 20 },
  };

  function setFieldError(name, show){
    const group = fields[name].el.closest('.field-group');
    const errEl = document.getElementById('err-' + name);
    group.classList.toggle('has-error', show);
    errEl.classList.toggle('show', show);
  }

  Object.keys(fields).forEach(name => {
    fields[name].el.addEventListener('input', () => {
      if (fields[name].validate(fields[name].el.value)){
        setFieldError(name, false);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.classList.remove('show', 'success', 'error');

    let allValid = true;
    Object.keys(fields).forEach(name => {
      const valid = fields[name].validate(fields[name].el.value);
      setFieldError(name, !valid);
      if (!valid) allValid = false;
    });

    if (!allValid){
      formStatus.textContent = 'Please fix the highlighted fields and try again.';
      formStatus.classList.add('show', 'error');
      return;
    }

    /* Simulate sending with a loading state (replace with real API/EmailJS/etc.) */
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      formStatus.textContent = "Message sent successfully! I'll get back to you within 24 hours.";
      formStatus.classList.add('show', 'success');
      form.reset();
    }, 1800);
  });

  /* ---------- Newsletter form (front-end only placeholder) ---------- */
  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Subscribed ✓';
    setTimeout(() => { btn.textContent = original; e.target.reset(); }, 2200);
  });

  /* ---------- Ripple effect for submit button ---------- */
  submitBtn.addEventListener('click', function(e){
    const rect = submitBtn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 1.4;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    submitBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
