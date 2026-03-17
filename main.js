// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ====================
// CURSOR LOGIC
// ====================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Instant move cursor point
  gsap.set(cursor, { x: mouseX, y: mouseY });
});

// Smooth follow for the follower circle
gsap.ticker.add(() => {
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;
  gsap.set(cursorFollower, { x: followerX, y: followerY });
});

// Hover states for cursor
const hoverElements = document.querySelectorAll('a, button, .service-item, .project-card, .client-logo');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorFollower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorFollower.classList.remove('hover');
  });
});


// ====================
// NAVBAR & MOBILE MENU
// ====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navCta = document.getElementById('navCta');

// Navbar transparent to solid on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle (simple implementation)
hamburger.addEventListener('click', () => {
  // Toggle states
  const isOpen = navLinks.style.display === 'flex';
  
  if (isOpen) {
    navLinks.style.display = 'none';
    navCta.style.display = 'none';
    navbar.style.background = window.scrollY > 50 ? 'var(--glass-bg)' : 'transparent';
    hamburger.querySelectorAll('span')[0].style.transform = 'translateY(0) rotate(0)';
    hamburger.querySelectorAll('span')[1].style.transform = 'translateY(0) rotate(0)';
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'var(--bg-color)';
    navLinks.style.padding = '2rem';
    navLinks.style.borderBottom = '1px solid var(--border-color)';
    navCta.style.display = 'inline-block';
    navCta.style.position = 'absolute';
    navCta.style.top = '120%';
    navCta.style.left = '50%';
    navCta.style.transform = 'translateX(-50%)';
    navbar.style.background = 'var(--bg-color)';
    
    // Hamburger X animation
    hamburger.querySelectorAll('span')[0].style.transform = 'translateY(4px) rotate(45deg)';
    hamburger.querySelectorAll('span')[1].style.transform = 'translateY(-4px) rotate(-45deg)';
  }
});


// ====================
// INTRO LOAD ANIMATION
// ====================
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  // Hide things initially
  gsap.set('.hero-title .line', { y: 100, opacity: 0 });
  gsap.set('#heroSubtitle', { y: 30, opacity: 0 });
  gsap.set('#heroActions', { y: 30, opacity: 0 });
  gsap.set('#heroBadge', { y: -20, opacity: 0 });
  gsap.set('.orb', { scale: 0.8, opacity: 0 });
  
  // Animate in
  tl.to('.orb', { scale: 1, opacity: 0.4, duration: 1.5, stagger: 0.2, ease: "power3.out" })
    .to('#heroBadge', { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }, "-=1")
    .to('.hero-title .line', { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }, "-=0.8")
    .to('#heroSubtitle', { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
    .to('#heroActions', { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6");
    
  // Start counter animation
  setTimeout(() => {
    document.querySelectorAll('.stat-num').forEach(el => {
      const parent = el.closest('.stat');
      const target = parseInt(el.getAttribute('data-count'));
      
      gsap.to(el, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: parent,
          start: "top 90%",
          once: true
        }
      });
    });
  }, 1000);
});


// ====================
// SCROLL ANIMATIONS
// ====================

// Marquee scroll effect
gsap.to('.marquee-inner', {
  xPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: '.marquee-section',
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});

// Reveal Text (Chars)
document.querySelectorAll('.reveal-text').forEach(text => {
  // Wrap words/chars to animate (simplified here just fade in up)
  gsap.from(text, {
    scrollTrigger: {
      trigger: text,
      start: "top 85%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
});

// Projects Stagger
gsap.utils.toArray('.project-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
});

// Process Steps
gsap.from('.process-step', {
  scrollTrigger: {
    trigger: '.process-steps',
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "back.out(1.2)"
});

// Testimonials
gsap.from('.testimonial-card', {
  scrollTrigger: {
    trigger: '.testimonials-grid',
    start: "top 95%",
  },
  y: 30,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  ease: "power2.out",
  clearProps: "all"
});

// About section items
gsap.from('.about-text, .quality-item, .btn-primary', {
  scrollTrigger: {
    trigger: '.about-content',
    start: "top 80%",
  },
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "power2.out"
});

gsap.from('.member-avatar', {
  scrollTrigger: {
    trigger: '.about-team-grid',
    start: "top 80%",
  },
  scale: 0,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  ease: "back.out(1.5)"
});


// ====================
// SERVICES HOVER LOGIC
// ====================
const serviceItems = document.querySelectorAll('.service-item');
const serviceVisualCard = document.getElementById('serviceVisualCard');

// Content for visual card based on hovered service
const serviceVisuals = [
  {
    title: "Web Architecture",
    desc: "Robust, scalable foundations for high-traffic digital platforms.",
    color1: "#a855f7", color2: "#3b82f6",
    tags: ["React", "Next.js", "WebGL"]
  },
  {
    title: "Strategic Branding",
    desc: "Identity systems that resonate and build market authority.",
    color1: "#f59e0b", color2: "#ef4444",
    tags: ["Logomark", "Guidelines", "Tone"]
  },
  {
    title: "User Experience",
    desc: "Research-backed interfaces designed for conversion.",
    color1: "#10b981", color2: "#0ea5e9",
    tags: ["Prototyping", "Wireframes", "Testing"]
  },
  {
    title: "Growth Funnels",
    desc: "Data-driven marketing that scales revenue predictably.",
    color1: "#ec4899", color2: "#8b5cf6",
    tags: ["SEO", "Ads", "CRO"]
  },
  {
    title: "Mobile Native",
    desc: "Fluid, native-feeling apps for iOS and Android.",
    color1: "#06b6d4", color2: "#3b82f6",
    tags: ["iOS", "Android", "React Native"]
  }
];

serviceItems.forEach((item, index) => {
  if (index === 0) item.classList.add('active'); // First active by default
  
  item.addEventListener('mouseenter', () => {
    // Remove active from all
    serviceItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    // Update visual card
    const visual = serviceVisuals[index];
    if (visual) {
      // Animate out
      gsap.to('.svc-card-inner', {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          // Update content
          serviceVisualCard.querySelector('h4').textContent = visual.title;
          serviceVisualCard.querySelector('p').textContent = visual.desc;
          
          // Update tags
          const tagsContainer = serviceVisualCard.querySelector('.svc-tags');
          tagsContainer.innerHTML = '';
          visual.tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            tagsContainer.appendChild(span);
          });
          
          // Update glow and gradient
          serviceVisualCard.querySelector('.svc-card-glow').style.background = `radial-gradient(circle, ${visual.color1}, ${visual.color2})`;
          
          const stops = document.querySelectorAll('#grad1 stop');
          if (stops.length >= 2) {
            stops[0].setAttribute('stop-color', visual.color1);
            stops[1].setAttribute('stop-color', visual.color2);
          }
          
          // Animate in
          gsap.to('.svc-card-inner', {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }
  });
});

// Contact Form simple animation
const contactForm = document.getElementById('contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    if(!btn) return;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span>Sending...</span>';
    
    setTimeout(() => {
      btn.innerHTML = '<span>Message Sent! ✓</span>';
      contactForm.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 3000);
    }, 1500);
  });
}

// ====================
// MODAL LOGIC
// ====================
const openModalBtns = document.querySelectorAll('.open-modal');
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalIframe = document.getElementById('modalIframe');
const modalBackdrop = document.getElementById('modalBackdrop');

function closeModal() {
  projectModal.classList.remove('active');
  setTimeout(() => {
    modalIframe.src = ''; // clear iframe so memory unlocks and stops playing media
  }, 400); // wait for fade out
}

openModalBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const targetUrl = btn.getAttribute('href');
    if(targetUrl && targetUrl !== '#') {
      modalIframe.src = targetUrl;
      projectModal.classList.add('active');
    }
  });
});

if(modalClose) {
  modalClose.addEventListener('click', closeModal);
}
if(modalBackdrop) {
  modalBackdrop.addEventListener('click', closeModal);
}
