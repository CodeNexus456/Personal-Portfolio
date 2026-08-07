
    //  JAVASCRIPT — reveal, progress bars, counters, tilt, ripple

  /* ---------- Generate floating background particles ---------- */
  
  (function createParticles(){
    const wrap = document.getElementById('particles');
    const count = 24;
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

  /* ---------- Scroll reveal for headings / categories / cards ---------- */
  const revealEls = document.querySelectorAll(
    '.section-heading, .category-title, .skill-card, .tool-chip, .stat-card'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.06 + 's';
    revealObserver.observe(el);
  });

  /* ---------- Progress bar fill + count-up percentage on scroll ---------- */
  const progressCards = document.querySelectorAll('.skill-card');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const card = entry.target;
        const fill = card.querySelector('.progress-fill');
        const percentEl = card.querySelector('.progress-percent');
        if (!fill || fill.dataset.done) return;

        const target = +fill.getAttribute('data-target');
        fill.style.width = target + '%';
        fill.dataset.done = 'true';

        let current = 0;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / target), 12);
        const timer = setInterval(() => {
          current++;
          percentEl.textContent = current + '%';
          if (current >= target) clearInterval(timer);
        }, stepTime);

        progressObserver.unobserve(card);
      }
    });
  }, { threshold: 0.35 });
  progressCards.forEach(card => progressObserver.observe(card));

  /* ---------- Stat number count-up ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        let current = 0;
        const duration = 1400;
        const stepTime = Math.max(Math.floor(duration / target), 10);
        const suffix = target === 100 ? '%' : '+';
        const timer = setInterval(() => {
          current++;
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, stepTime);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach(el => statObserver.observe(el));

  /* ---------- Tilt effect + ripple on hover for skill cards ---------- */
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });

    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height) * 1.4;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
