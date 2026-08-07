
  // Scroll-reveal: adds 'reveal' class when element enters viewport
  const revealTargets = document.querySelectorAll('.section-heading, .image-wrap, .about-content');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  // Animated counters for stat cards
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        let current = 0;
        const duration = 1400; // ms
        const stepTime = Math.max(Math.floor(duration / target), 15);
        const timer = setInterval(() => {
          current++;
          el.textContent = current + (target === 100 ? '%' : '+');
          if (current >= target){
            clearInterval(timer);
          }
        }, stepTime);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterObserver.observe(el));
