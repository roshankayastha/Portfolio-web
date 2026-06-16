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
});
