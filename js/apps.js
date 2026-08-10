
(function(){
  "use strict";
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (sel, ctx) => Array.from((ctx||document).querySelectorAll(sel));

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- NAVBAR: scrolled + hide/show ---------- */
  const navbar = document.getElementById('navbar');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 24);
    if (y > lastY && y > 160) navbar.classList.add('hide-nav');
    else navbar.classList.remove('hide-nav');
    lastY = y;
  }, {passive:true});

  /* ---------- active link ---------- */
  const sectionIds = ['home','about','skills','projects','contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const navA = $$('.nav-links a');
  function setActive(){
    let current = sections[0];
    sections.forEach(sec => { if (window.scrollY + 150 >= sec.offsetTop) current = sec; });
    navA.forEach(a => a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id));
  }
  window.addEventListener('scroll', setActive, {passive:true});
  setActive();

  /* ---------- mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');
  function toggleMenu(open){
    const state = open ?? !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', state);
    overlay.classList.toggle('open', state);
    hamburger.classList.toggle('open', state);
    hamburger.setAttribute('aria-expanded', state);
    document.body.style.overflow = state ? 'hidden' : '';
  }
  hamburger.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- theme toggle (in-memory) ---------- */
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', () => {
    const dark = document.body.classList.toggle('light-theme');
    themeBtn.textContent = dark ? '☀️' : '🌙';
  });

  /* ---------- smooth scroll ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target){
        e.preventDefault();
        window.scrollTo({top: target.offsetTop - 64, behavior: reduceMotion ? 'auto' : 'smooth'});
      }
    });
  });

  /* ---------- ripple ---------- */
  $$('[data-ripple]').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- typing animation ---------- */
  const roles = ['Full Stack Developer','Frontend Developer','Backend Developer','React Developer','JavaScript Developer','MERN Stack Developer'];
  const typedEl = document.getElementById('typedRole');
  let rIdx = 0, cIdx = 0, deleting = false;
  function typeLoop(){
    const word = roles[rIdx];
    if (!deleting){
      cIdx++;
      if (cIdx > word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
    } else {
      cIdx--;
      if (cIdx < 0){ deleting = false; rIdx = (rIdx+1) % roles.length; cIdx = 0; }
    }
    typedEl.textContent = word.slice(0, Math.max(cIdx,0));
    setTimeout(typeLoop, deleting ? 45 : 85);
  }
  if (reduceMotion){ typedEl.textContent = roles[0]; }
  else { typedEl.textContent = ''; setTimeout(typeLoop, 900); }

  /* ---------- particles ---------- */
  const particleWrap = document.getElementById('particles');
  if (!reduceMotion){
    const count = window.innerWidth < 700 ? 18 : 32;
    for (let i=0;i<count;i++){
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = (Math.random()*100) + 'vw';
      p.style.bottom = '-10px';
      const size = 1.5 + Math.random()*2.5;
      p.style.width = p.style.height = size + 'px';
      p.style.animationDuration = (10 + Math.random()*14) + 's';
      p.style.animationDelay = (Math.random()*14) + 's';
      particleWrap.appendChild(p);
    }
  }

  /* ---------- mouse-interactive gradient + parallax on orbit stage ---------- */
  const mouseGradient = document.getElementById('mouseGradient');
  const orbitStage = document.getElementById('orbitStage');
  if (!reduceMotion){
    window.addEventListener('mousemove', e => {
      mouseGradient.style.left = e.clientX + 'px';
      mouseGradient.style.top = e.clientY + 'px';
      if (orbitStage && window.matchMedia('(min-width:1000px)').matches){
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        orbitStage.style.transform = `translate(${x*16}px, ${y*12}px)`;
      }
    }, {passive:true});
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15});
    revealEls.forEach(el => { el.classList.remove('in'); io.observe(el); });
  }

  /* ---------- counter animation ---------- */
  const counters = $$('.stat-number');
  function animateCounter(el){
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion){ el.textContent = target + suffix; return; }
    const duration = 1600;
    const start = performance.now();
    function step(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window){
    const cIo = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animateCounter(entry.target);
          cIo.unobserve(entry.target);
        }
      });
    }, {threshold:.5});
    counters.forEach(c => cIo.observe(c));
  }
 
  /* ---------- back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 500);
  }, {passive:true});
  backToTop.addEventListener('click', () => {
    window.scrollTo({top:0, behavior: reduceMotion ? 'auto' : 'smooth'});
  });
 
})();
