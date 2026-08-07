
// JAVASCRIPT — particles, reveal, filter, counters, ripple
  /* ---------- Generate floating background particles ---------- */
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

  /* ---------- Scroll reveal with stagger ---------- */
  const revealEls = document.querySelectorAll('.section-heading, .project-card, .stat-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 0.08 + 's';
    revealObserver.observe(el);
  });

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

  /* ---------- Filter navigation ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const categories = card.getAttribute('data-category');
        const match = filter === 'all' || categories.includes(filter);

        if (match){
          card.classList.remove('hidden-card');
          // restart the reveal animation smoothly
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => card.classList.add('hidden-card'), 350);
        }
      });
    });
  });

  /* ---------- Ripple effect for buttons ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height) * 1.6;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
