/* ==========================================================================
   DOM ELEMENTS & CONFIG
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Theme
  const header = document.getElementById('header');
  const navMenu = document.getElementById('navMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const themeToggle = document.getElementById('themeToggle');
  const navLinks = document.querySelectorAll('.nav-link');

  // Typewriter
  const typedTextSpan = document.getElementById('typedText');
  const roles = ["Full Stack Dev", "Graphic Design", "Video Editing", "UI/UX Design"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  // Filters & Projects
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Modal
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const modalTechTags = document.getElementById('modalTechTags');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const modalLiveLink = document.getElementById('modalLiveLink');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOverlay = document.getElementById('modalOverlay');

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');

  // Testimonials Slider
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevSlideBtn = document.getElementById('prevSlideBtn');
  const nextSlideBtn = document.getElementById('nextSlideBtn');
  const currentSlideNum = document.getElementById('currentSlideNum');
  let currentSlideIndex = 0;

  /* ==========================================================================
     THEME TOGGLE SYSTEM (Light / Dark)
     ========================================================================== */
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
  });

  function updateThemeToggleIcon(theme) {
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    if (theme === 'light') {
      moonIcon.style.opacity = '0';
      moonIcon.style.transform = 'translateY(-20px)';
      sunIcon.style.opacity = '1';
      sunIcon.style.transform = 'translateY(0)';
    } else {
      moonIcon.style.opacity = '1';
      moonIcon.style.transform = 'translateY(0)';
      sunIcon.style.opacity = '0';
      sunIcon.style.transform = 'translateY(20px)';
    }
  }

  /* ==========================================================================
     NAVIGATION & STICKY HEADER
     ========================================================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle Mobile Menu
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburgerBtn.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close Mobile Menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const spans = hamburgerBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  /* ==========================================================================
     TYPEWRITER EFFECT
     ========================================================================== */
  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at the end of word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      // Pause before typing next word
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* ==========================================================================
     PORTFOLIO GRID FILTER SYSTEM
     ========================================================================== */
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active from all
      filterButtons.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      e.target.classList.add('active');
      
      const filterValue = e.target.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.85)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     MODALS DATA & CONTROL
     ========================================================================== */
  const projectData = {
    yoga: {
      title: "Yoga Adventure Quest",
      category: "web",
      img: "assets/project_yoga.png",
      tags: ["WordPress", "PHP", "Astra / CSS"],
      desc: "Yoga Adventure Quest is a professional travel planner and wellness retreat portal. Built to host global travel itineraries, it features responsive booking inquiries, integrated event schedules, and optimized image processing. Key accomplishments include custom layout modules, streamlined UX navigation paths, and robust search indexing configurations.",
      tech: ["WordPress Core", "Astra Customizer", "PHP Template structures", "MySQL Databases", "Contact Forms Integration", "SEO Meta Indexing"],
      github: "https://github.com",
      live: "https://yogaadventurequest.com"
    },
    arts: {
      title: "Wyild Child Arts",
      category: "design",
      img: "assets/project_arts.png",
      tags: ["Creative Design", "WordPress", "E-Commerce"],
      desc: "Wyild Child Arts is a vibrant creative portal for an independent art studio and workshop academy. Key aspects of this project include custom canvas display galleries, secure booking pipelines for local workshops, responsive course catalog layouts, and high-fidelity media uploads showcasing user-submitted gallery items.",
      tech: ["WordPress CMS", "Custom Canvas Galleries", "WooCommerce Staging", "PHP Templates", "Poppins Font Pairing", "Elementor Styling Core"],
      github: "https://github.com",
      live: "https://wyildchildarts.com"
    }
  };

  // Setup click listeners for all project detail buttons
  const detailButtons = document.querySelectorAll('[data-project]');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Find the project key (either direct click or ancestor check)
      let key = btn.getAttribute('data-project');
      if (!key) {
        const closestCard = btn.closest('[data-project]');
        key = closestCard ? closestCard.getAttribute('data-project') : null;
      }
      
      if (key && projectData[key]) {
        openModal(projectData[key]);
      }
    });
  });

  function openModal(data) {
    modalImg.src = data.img;
    modalImg.alt = data.title + " Preview";
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    
    // Clear tags
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tag;
      modalTags.appendChild(span);
    });

    // Clear tech integrations
    modalTechTags.innerHTML = '';
    data.tech.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = t;
      modalTechTags.appendChild(span);
    });

    modalGithubLink.href = data.github;
    modalLiveLink.href = data.live;
    
    // Ensure project buttons are visible
    modalGithubLink.style.display = 'inline-flex';
    modalLiveLink.style.display = 'inline-flex';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop body scrolling
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Resume body scrolling
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     SCROLL OBSERVER & ANIMATE PROGRESS BARS
     ========================================================================== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If the skills section has been revealed, animate its progress bars
        if (entry.target.id === 'skills') {
          animateProgressBars();
        }
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
      const targetPct = bar.getAttribute('data-width');
      bar.style.width = targetPct;
    });
  }

  /* ==========================================================================
     TESTIMONIALS SLIDER SYSTEM
     ========================================================================== */
  if (testimonialCards.length > 0 && prevSlideBtn && nextSlideBtn && currentSlideNum) {
    function showSlide(index) {
      testimonialCards.forEach((card, i) => {
        if (i === index) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
      currentSlideNum.textContent = String(index + 1).padStart(2, '0');
      currentSlideIndex = index;
    }

    prevSlideBtn.addEventListener('click', () => {
      let index = currentSlideIndex - 1;
      if (index < 0) {
        index = testimonialCards.length - 1;
      }
      showSlide(index);
    });

    nextSlideBtn.addEventListener('click', () => {
      let index = (currentSlideIndex + 1) % testimonialCards.length;
      showSlide(index);
    });
  }

  /* ==========================================================================
     NAVBAR SCROLL SPY
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', scrollSpy);

  function scrollSpy() {
    let currentId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 250)) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentId) {
        link.classList.add('active');
      }
    });
  }

  /* ==========================================================================
     CONTACT FORM HANDLING & MOCK VALIDATION
     ========================================================================== */
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();
    const submitBtn = document.getElementById('btnSubmitForm');
    
    // Clear previous status
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';

    // Simple Email Regex validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showFormStatus('Please enter a valid email address.', 'error');
      return;
    }

    if (name.length < 2 || message.length < 10) {
      showFormStatus('Please fill in all details. Message must be at least 10 characters long.', 'error');
      return;
    }

    // Mock sending process
    submitBtn.disabled = true;
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending Message...</span><i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      
      showFormStatus(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
      contactForm.reset();
    }, 1500);
  });

  function showFormStatus(text, type) {
    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
  }

  /* ==========================================================================
     INTERACTIVE GENERATIVE CANVAS AURA
     ========================================================================== */
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    const heroSection = document.getElementById('home');
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext('2d');
    
    // Set display resolution (incorporate devicePixelRatio for sharp rendering)
    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    function resizeCanvas() {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color definitions based on current active theme
    function getThemeColors() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        return {
          blob1: 'rgba(110, 109, 103, 0.12)',  // Accent color
          blob2: 'rgba(166, 165, 157, 0.08)',  // Secondary color
          blob3: 'rgba(244, 243, 239, 0.04)',  // Primary color
          mouseBlob: 'rgba(166, 165, 157, 0.14)'
        };
      } else {
        return {
          blob1: 'rgba(140, 139, 130, 0.15)',  // Accent color
          blob2: 'rgba(94, 93, 87, 0.08)',    // Secondary color
          blob3: 'rgba(21, 21, 21, 0.04)',     // Primary color
          mouseBlob: 'rgba(94, 93, 87, 0.12)'
        };
      }
    }

    let colors = getThemeColors();

    // Re-evaluate colors when theme changes
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        setTimeout(() => {
          colors = getThemeColors();
        }, 50);
      });
    }

    class Blob {
      constructor(baseRadius) {
        this.baseRadius = baseRadius;
        this.radius = baseRadius;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.colorIndex = Math.floor(Math.random() * 3);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle boundaries check with cushioning bounce
        if (this.x < -this.radius) {
          this.x = -this.radius;
          this.vx *= -1;
        } else if (this.x > width + this.radius) {
          this.x = width + this.radius;
          this.vx *= -1;
        }

        if (this.y < -this.radius) {
          this.y = -this.radius;
          this.vy *= -1;
        } else if (this.y > height + this.radius) {
          this.y = height + this.radius;
          this.vy *= -1;
        }
      }

      draw() {
        let color;
        if (this.colorIndex === 0) color = colors.blob1;
        else if (this.colorIndex === 1) color = colors.blob2;
        else color = colors.blob3;

        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Instantiate blobs (responsive sizing)
    const baseVal = Math.min(width, height);
    const blobs = [
      new Blob(baseVal * 0.45),
      new Blob(baseVal * 0.35),
      new Blob(baseVal * 0.55)
    ];

    // Handle mouse movement coordinates
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    heroSection.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Intersection Observer to pause drawing loop when out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    
    observer.observe(heroSection);

    function animate() {
      if (!isVisible) {
        requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates smoothly
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        const mouseRadius = baseVal * 0.35;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouseRadius);
        grad.addColorStop(0, colors.mouseBlob);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw and update floaters
      blobs.forEach(blob => {
        if (mouse.active) {
          const dx = blob.x - mouse.x;
          const dy = blob.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 400) {
            const force = (400 - dist) * 0.0001;
            blob.vx += dx * force;
            blob.vy += dy * force;
            
            const speed = Math.sqrt(blob.vx * blob.vx + blob.vy * blob.vy);
            if (speed > 1.2) {
              blob.vx = (blob.vx / speed) * 1.2;
              blob.vy = (blob.vy / speed) * 1.2;
            }
          }
        }

        blob.update();
        blob.draw();
      });

      requestAnimationFrame(animate);
    }
    
    animate();
  }

  // Initialize canvas
  initHeroCanvas();

  /* ==========================================================================
     ADVENTURE JOURNAL DATA FETCH & RENDER
     ========================================================================== */
  function loadAdventures() {
    const grid = document.getElementById('adventuresGrid');
    if (!grid) return;

    fetch('data/adventures.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!data || !data.entries || data.entries.length === 0) {
          grid.innerHTML = '<div class="loading-state" style="font-family: var(--ff-mono); font-size: 0.85rem; color: var(--text-muted); padding: 2rem 0;">No adventure logs posted yet.</div>';
          return;
        }

        grid.innerHTML = '';
        data.entries.forEach((entry, idx) => {
          const card = document.createElement('article');
          card.className = 'adventure-card';
          card.id = `adventure-${idx}`;
          
          card.innerHTML = `
            <div class="adventure-img-wrapper">
              <img src="${entry.photo}" alt="${entry.title}" class="adventure-img" loading="lazy">
              <div class="adventure-overlay">
                <span class="adventure-overlay-info">Read Log <i class="fas fa-arrow-right"></i></span>
              </div>
            </div>
            <div class="adventure-content">
              <div class="adventure-meta">
                <span class="adventure-date">${entry.date}</span>
                <span class="adventure-location">
                  <i class="fas fa-map-marker-alt"></i> ${entry.location}
                </span>
              </div>
              <h3 class="adventure-title">${entry.title}</h3>
              <p class="adventure-desc">${entry.description}</p>
            </div>
          `;

          card.addEventListener('click', () => {
            openAdventureModal(entry);
          });

          grid.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error loading adventures:', error);
        grid.innerHTML = '<div class="loading-state" style="font-family: var(--ff-mono); font-size: 0.85rem; color: #ef4444; padding: 2rem 0;">Failed to load journal logs.</div>';
      });
  }

  function openAdventureModal(entry) {
    modalImg.src = entry.photo;
    modalImg.alt = entry.title + " Photo";
    modalTitle.textContent = entry.title;
    modalDesc.textContent = entry.description;
    
    modalTags.innerHTML = '';
    
    const dateSpan = document.createElement('span');
    dateSpan.className = 'project-tag';
    dateSpan.innerHTML = `<i class="fas fa-calendar-alt"></i> ${entry.date}`;
    modalTags.appendChild(dateSpan);

    const locSpan = document.createElement('span');
    locSpan.className = 'project-tag';
    locSpan.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${entry.location}`;
    modalTags.appendChild(locSpan);

    modalTechTags.innerHTML = '';
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = 'Outdoor Expedition Log';
    modalTechTags.appendChild(span);

    // Hide links for photos/adventures
    modalGithubLink.style.display = 'none';
    modalLiveLink.style.display = 'none';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Load adventure journal items
  loadAdventures();
});
