document.addEventListener('DOMContentLoaded', () => {

 
  const menuToggle = document.querySelector ('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('toggle-active');
      mainNav.classList.toggle('nav-active');
      document.body.style.overflow = mainNav.classList.contains('nav-active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('toggle-active');
        mainNav.classList.remove('nav-active');
        document.body.style.overflow = '';
      });
    });
  }

  
  const siteHeader = document.querySelector('.site-header');
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      siteHeader?.classList.add('header-scrolled');
    } else {
      siteHeader?.classList.remove('header-scrolled');
    }
    
    
    if (scrollY > lastScrollY && scrollY > 200) {
      siteHeader?.classList.add('header-hidden');
    } else {
      siteHeader?.classList.remove('header-hidden');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const header = document.querySelector('.site-header');
        const headerHeight = header?.offsetHeight || 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        menuToggle?.classList.remove('toggle-active');
        mainNav?.classList.remove('nav-active');
        document.body.style.overflow = '';

        // Update URL without page jump
        history.pushState(null, '', targetId);
      }
    });
  });

 
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation to save performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));

 
  const heroArt = document.querySelector('.hero-art');
  const sunDisc = document.querySelector('.sun-disc');
  const artGrid = document.querySelector('.art-grid');
  const floatingNote = document.querySelector('.floating-note');
  const usbPorts = document.querySelectorAll('.usb-port');
  const circuitTraces = document.querySelectorAll('.circuit-trace');
  const dataNodes = document.querySelectorAll('.data-node');

  let parallaxTicking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
    const progress = Math.min(scrollY / heroHeight, 1);
    
    if (heroArt && progress < 1) {
      // Subtle parallax on hero art container
      heroArt.style.transform = `translateY(${scrollY * 0.15}px)`;
      
      // Sun disc parallax
      if (sunDisc) {
        sunDisc.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.1})`;
      }
      
      // Grid opposite direction
      if (artGrid) {
        artGrid.style.transform = `translateY(${-scrollY * 0.05}px)`;
      }
      
      // Floating note
      if (floatingNote) {
        floatingNote.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
      
      // USB ports subtle movement
      usbPorts.forEach((port, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        port.style.transform = `translateX(${direction * scrollY * 0.02}px)`;
      });
      
      // Circuit traces
      circuitTraces.forEach((trace, i) => {
        trace.style.opacity = 0.3 + progress * 0.5;
      });
    }
    
    parallaxTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(updateParallax);
      parallaxTicking = true;
    }
  }, { passive: true });

 
  function initHeroAnimations() {
    const heroCopy = document.querySelector('.hero-copy');
    const heroArtEl = document.querySelector('.hero-art');
    const heroBottom = document.querySelector('.hero-bottom');
    
    // Staggered entrance
    if (heroCopy) {
      heroCopy.style.opacity = '0';
      heroCopy.style.transform = 'translateY(40px)';
      heroCopy.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    if (heroArtEl) {
      heroArtEl.style.opacity = '0';
      heroArtEl.style.transform = 'translateY(40px) scale(0.98)';
      heroArtEl.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
      heroArtEl.style.transitionDelay = '150ms';
    }
    
    if (heroBottom) {
      heroBottom.style.opacity = '0';
      heroBottom.style.transform = 'translateY(20px)';
      heroBottom.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      heroBottom.style.transitionDelay = '400ms';
    }

    // Trigger entrance
    requestAnimationFrame(() => {
      if (heroCopy) { heroCopy.style.opacity = '1'; heroCopy.style.transform = 'translateY(0)'; }
      if (heroArtEl) { heroArtEl.style.opacity = '1'; heroArtEl.style.transform = 'translateY(0) scale(1)'; }
      if (heroBottom) { heroBottom.style.opacity = '1'; heroBottom.style.transform = 'translateY(0)'; }
    });
  }

  // Start hero animations after a brief delay
  setTimeout(initHeroAnimations, 100);

  

 
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.main-nav a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinksAll.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });


  const cards = document.querySelectorAll('.service-card, .contact-details > div');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });


  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  function handleReducedMotion(e) {
    if (e.matches) {
      document.documentElement.style.setProperty('--transition-fast', '0ms');
      document.documentElement.style.setProperty('--transition-base', '0ms');
      document.documentElement.style.setProperty('--transition-slow', '0ms');
      // Disable parallax
      window.removeEventListener('scroll', updateParallax);
      // Disable card tilt
      cards.forEach(card => {
        card.removeEventListener('mousemove', () => {});
      });
    }
  }
  
  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion(prefersReducedMotion);


  let resizeTicking = false;
  window.addEventListener('resize', () => {
    if (!resizeTicking) {
      window.requestAnimationFrame(() => {
        // Recalculate positions if needed
        updateActiveNav();
        resizeTicking = false;
      });
      resizeTicking = true;
    }
  }, { passive: true });

  // Scroll Progress Bar
  const scrollProgress = document.querySelector('.scroll-progress');

  function updateScrollProgress() {
    if (!scrollProgress) return;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height ? (winScroll / height) * 100 : 0;
    scrollProgress.style.width = `${scrolled}%`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');

  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
