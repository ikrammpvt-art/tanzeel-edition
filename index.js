/*
  Tanzeel Edition — Landing Page Interaction Engine
  Vanilla JavaScript for scroll animation, magnetic cursor, counters, and accordions.
*/

// Dynamic Reels Database — Edit this list to add, update, or remove portfolio reel items
const PORTFOLIO_REELS = [
  {
    videoUrl: "https://res.cloudinary.com/dcpjgunwn/video/upload/v1781740422/Lexi_Reel_09_fnidl5.mp4",
    posterUrl: "",
    views: "123K",
    author: "@tanzeel.motion",
    tag: "Short-Form Reel",
    duration: "0:16",
    gradient: "linear-gradient(225deg, #281808 0%, #0c0502 50%, #280c08 100%)",
    title: "Lexi Reel - 09",
    description: "Engagement-optimized hook with kinetic typography."
  },
  {
    videoUrl: "https://res.cloudinary.com/dcpjgunwn/video/upload/v1781740429/Trial_Edit_for_Devin_Jatho_by_Tanzeel_Edition_xhm5bk.mp4",
    posterUrl: "",
    views: "185K",
    author: "@tanzeel.motion",
    tag: "Short-Form Reel",
    duration: "0:20",
    gradient: "linear-gradient(225deg, #1c092a 0%, #0a0210 50%, #220d35 100%)",
    title: "Devin Jatho Trial Edit",
    description: "Premium trial sequence built for high organic reach."
  },
  {
    videoUrl: "https://res.cloudinary.com/dcpjgunwn/video/upload/v1781740430/Reel_01_Final_oquerl.mp4",
    posterUrl: "",
    views: "142K",
    author: "@tanzeel.motion",
    tag: "Short-Form Reel",
    duration: "0:15",
    gradient: "linear-gradient(225deg, #180828 0%, #05020c 50%, #0c0828 100%)",
    title: "Reel 01 Final",
    description: "Premium short-form high-retention reel edit."
  },
  {
    videoUrl: "https://res.cloudinary.com/dcpjgunwn/video/upload/v1781740431/Sean_Oulashin_-_02_chtf2r.mp4",
    posterUrl: "",
    views: "98.5K",
    author: "@tanzeel.motion",
    tag: "Short-Form Reel",
    duration: "0:12",
    gradient: "linear-gradient(225deg, #091a18 0%, #020a09 50%, #0d2218 100%)",
    title: "Sean Oulashin Edit",
    description: "Fast-paced creator content cut with visual hooks."
  },
  {
    videoUrl: "https://res.cloudinary.com/dcpjgunwn/video/upload/v1781740423/Final_Reel-03_q3dq8p.mp4",
    posterUrl: "",
    views: "115K",
    author: "@tanzeel.motion",
    tag: "Short-Form Reel",
    duration: "0:18",
    gradient: "linear-gradient(225deg, #0f1c3f 0%, #020614 50%, #0f162a 100%)",
    title: "Final Reel - 03",
    description: "Custom transitions and retention-focused structuring."
  },
  {
    videoUrl: "https://res.cloudinary.com/dcpjgunwn/video/upload/v1781740427/Reel-07_imidho.mp4",
    posterUrl: "",
    views: "108K",
    author: "@tanzeel.motion",
    tag: "Short-Form Reel",
    duration: "0:14",
    gradient: "linear-gradient(225deg, #091c29 0%, #020a0f 50%, #0d1e29 100%)",
    title: "Reel - 07",
    description: "Dynamic pacing and clean zoom-cut details."
  },
  {
    videoUrl: "https://res.cloudinary.com/dcpjgunwn/video/upload/v1781740412/Final_Video_s0fvaf.mp4",
    posterUrl: "",
    views: "94K",
    author: "@tanzeel.motion",
    tag: "Short-Form Reel",
    duration: "0:30",
    gradient: "linear-gradient(225deg, #092a1d 0%, #02100a 50%, #0d3525 100%)",
    title: "Final Video Cut",
    description: "Seamless pacing, clean graphics, and high visual appeal."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNotchNav();
  initBadgeRotator();
  initCursor();
  initScrollReveal();
  initStatsCounter();
  initAccordions();
  renderPortfolio();
  initPortfolioVideos();
  initPortfolioSlider();
  initMagneticButtons();
});

/**
 * 1. Magnetic Custom Cursor
 */
function initCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorRing = document.querySelector('.custom-cursor-ring');
  
  if (!cursor || !cursorRing) return;

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth tick
  function tick() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(tick);
  }
  tick();

  // Hover states
  const interactives = document.querySelectorAll('a, button, .showcase-card, .portfolio-card, .module-header, .faq-header, .tab-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovered-element');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovered-element');
    });
  });
}

/**
 * 2. Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 3. Metric Stats Counter Animation (Updated for 150+ and 3 Yrs)
 */
function initStatsCounter() {
  const metricsSection = document.querySelector('.portal-metrics');
  if (!metricsSection) return;

  const countUp = (element, targetValue, suffix, decimal = false) => {
    let currentVal = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      currentVal = easeProgress * targetValue;

      if (decimal) {
        element.textContent = currentVal.toFixed(1) + suffix;
      } else {
        element.textContent = Math.floor(currentVal) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = targetValue + suffix;
      }
    };

    requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const clicksEl = document.getElementById('stat-clicks');
        const reachEl = document.getElementById('stat-reach');

        if (clicksEl) countUp(clicksEl, 1000, '+', false);
        if (reachEl) countUp(reachEl, 3, ' Yrs', false);
        
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(metricsSection);
}

/**
 * 4. Accordion Toggle Logic (FAQ)
 */
function initAccordions() {
  // FAQs Accordion
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.parentElement;
      const answer = card.querySelector('.faq-answer');

      document.querySelectorAll('.faq-card').forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
          otherCard.classList.remove('active');
          otherCard.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      card.classList.toggle('active');
      if (card.classList.contains('active')) {
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
}

function initPortfolioVideos() {
  const cards = document.querySelectorAll('.portfolio-card');
  cards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    // Ensure video is muted on load
    video.muted = true;

    const startPlayback = () => {
      // Pause and mute all other playing videos first to avoid overlapping audio
      document.querySelectorAll('.portfolio-card video').forEach(otherVideo => {
        if (otherVideo !== video) {
          otherVideo.pause();
          otherVideo.muted = true;
          otherVideo.closest('.portfolio-card').classList.remove('playing');
        }
      });

      // Play and unmute the target video
      video.muted = false;
      video.play().catch(err => {
        console.warn("Video playback failed: ", err);
        // Fallback to muted playback if browser blocks unmuted
        video.muted = true;
        video.play().catch(e => console.error("Muted playback fallback failed: ", e));
      });
      card.classList.add('playing');
    };

    const stopPlayback = () => {
      video.pause();
      video.muted = true;
      card.classList.remove('playing');
    };

    // Hover triggers (Desktop)
    card.addEventListener('mouseenter', startPlayback);
    card.addEventListener('mouseleave', stopPlayback);

    // Click toggle trigger (Desktop & Mobile fallback)
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.paused) {
        startPlayback();
      } else {
        stopPlayback();
      }
    });
  });
}

/**
 * 6. Dynamic Portfolio Rendering & Horizontal Scroll
 */
function renderPortfolio() {
  const track = document.getElementById('portfolio-track');
  if (!track) return;

  track.innerHTML = PORTFOLIO_REELS.map(reel => {
    return `
      <div class="portfolio-card">
        <div class="reel-container">
          <video loop muted playsinline preload="metadata" src="${reel.videoUrl || ''}" poster="${reel.posterUrl || ''}"></video>
          <div class="reel-overlay">
            <div class="play-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%;">
              <div style="text-align: left;">
                <span style="font-size: 0.7rem; color: #ababba;">${reel.tag}</span>
              </div>
              <span class="duration">${reel.duration}</span>
            </div>
          </div>
          <div style="position: absolute; inset: 0; background: ${reel.gradient}; z-index: 1; pointer-events: none;"></div>
        </div>
      </div>
    `;
  }).join('');
}

function initPortfolioSlider() {
  const viewport = document.querySelector('.portfolio-slider-viewport');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');

  if (!viewport) return;

  // Handle arrows visibility based on scroll position
  function updateArrowsVisibility() {
    if (!prevBtn || !nextBtn) return;
    
    // Check if scrolled to start
    if (viewport.scrollLeft <= 5) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }

    // Check if scrolled to end
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (viewport.scrollLeft >= maxScroll - 5) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  }

  // Initialize visibility state
  setTimeout(updateArrowsVisibility, 200);

  // Scroll listener
  viewport.addEventListener('scroll', updateArrowsVisibility);

  // Resize listener
  window.addEventListener('resize', updateArrowsVisibility);

  // Arrow clicks
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      const scrollAmt = viewport.clientWidth * 0.75;
      viewport.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const scrollAmt = viewport.clientWidth * 0.75;
      viewport.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    });
  }
}

/**
 * 7. Notch Navigation Toggle
 */
function initNotchNav() {
  const header = document.querySelector('.site-header');
  
  if (!header) return;
  
  // Click toggle (primarily for mobile/touchscreen fallback or clicking the collapsed notch)
  header.addEventListener('click', (e) => {
    const isNavLink = e.target.closest('.header-nav a');
    if (!isNavLink) {
      e.stopPropagation();
      header.classList.toggle('is-open');
    }
  });

  // Hover triggers (for desktop cursor interactions)
  header.addEventListener('mouseenter', () => {
    header.classList.add('is-open');
  });

  header.addEventListener('mouseleave', () => {
    header.classList.remove('is-open');
  });

  // Sliding nav indicator logic
  const navContainer = header.querySelector('.header-nav ul');
  const indicator = header.querySelector('.nav-indicator');
  const navLinks = header.querySelectorAll('.header-nav a');
  
  if (navContainer && indicator && navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', (e) => {
        const rect = e.target.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();
        
        // Calculate relative position and width
        const relativeLeft = rect.left - containerRect.left;
        
        indicator.style.left = `${relativeLeft}px`;
        indicator.style.width = `${rect.width}px`;
        indicator.style.opacity = '1';
      });
      
      link.addEventListener('click', () => {
        header.classList.remove('is-open');
      });
    });
    
    navContainer.addEventListener('mouseleave', () => {
      indicator.style.opacity = '0';
    });
  }

  // Close when clicking outside header
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && header.classList.contains('is-open')) {
      header.classList.remove('is-open');
    }
  });

  // Hint the menu on load: slide down after 0.8s, slide up after 3s
  setTimeout(() => {
    header.classList.add('is-open');
    setTimeout(() => {
      if (header.classList.contains('is-open')) {
        header.classList.remove('is-open');
      }
    }, 2500);
  }, 800);
}

/**
 * 8. Pulse Badge Text Rotator
 */
function initBadgeRotator() {
  const badgeText = document.querySelector('.badge-text');
  if (!badgeText) return;
  
  const texts = [
    '<span class="dot"></span> Editing & Motion Design Studio',
    '<span class="dot"></span> 1000 Videos Edited For Creators'
  ];
  let index = 0;
  
  setInterval(() => {
    badgeText.style.opacity = '0';
    badgeText.style.transform = 'translateY(-6px)';
    
    setTimeout(() => {
      index = (index + 1) % texts.length;
      badgeText.innerHTML = texts[index];
      badgeText.style.opacity = '1';
      badgeText.style.transform = 'translateY(0)';
    }, 450);
  }, 4500);
}

/**
 * 9. Magnetic Button Effects
 */
function initMagneticButtons() {
  // Bind effect to CTA buttons and slider navigation arrows
  const magnets = document.querySelectorAll('.btn-access, .btn-work, .form-submit-btn, .slider-arrow');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      // Calculate mouse coordinates relative to the button center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull strength factor (0.15 - 0.25 is perfect for subtle fluid feel)
      const factor = 0.22;
      
      btn.style.transform = `translate(${x * factor}px, ${y * factor}px) scale(1.02)`;
      btn.style.transition = 'none'; // Instant interactive response
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'; // Smooth fluid bounce-back
    });
  });
}
