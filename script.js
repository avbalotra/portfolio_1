/**
 * ==============================================================================
 * ATHARAV BALOTRA — CREATIVE DEVELOPER & CSE (AI/ML)
 * SCRIPT.JS: Wodniack-Inspired Creative-Developer Motion Architecture
 * Generative Digital Wave Canvas, Architectural Schematic Pipeline,
 * Kinetic Typography Scrambler, Live Telemetry & Data Source Hydration
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. GENERATIVE DIGITAL WAVE CANVAS (BACKGROUND LAYER)
     Mathematical interactive mesh responding to cursor velocity and scroll
     -------------------------------------------------------------------------- */
  const initGenerativeWave = () => {
    const canvas = document.getElementById('generativeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let mouseSpeed = 0;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };
    window.addEventListener('resize', onResize);

    const onMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      const dx = targetMouseX - prevMouseX;
      const dy = targetMouseY - prevMouseY;
      mouseSpeed = Math.min(Math.sqrt(dx * dx + dy * dy), 35);
      prevMouseX = targetMouseX;
      prevMouseY = targetMouseY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Grid nodes configuration
    let cols = 0;
    let rows = 0;
    const spacing = 48;
    let points = [];

    const initGrid = () => {
      cols = Math.ceil(width / spacing) + 2;
      rows = Math.ceil(height / spacing) + 2;
      points = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          points.push({
            baseX: c * spacing - spacing,
            baseY: r * spacing - spacing,
            x: c * spacing - spacing,
            y: r * spacing - spacing,
            isAccent: (c * r) % 23 === 0
          });
        }
      }
    };
    initGrid();

    let time = 0;

    const render = () => {
      requestAnimationFrame(render);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      mouseSpeed *= 0.94;
      time += prefersReducedMotion ? 0 : 0.016;

      ctx.clearRect(0, 0, width, height);

      // Render digital wave points and connecting lines
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        if (!prefersReducedMotion) {
          // Dynamic wave harmonics
          const waveX = Math.sin(p.baseY * 0.006 + time * 1.2) * 12;
          const waveY = Math.cos(p.baseX * 0.005 + time * 0.9) * 10;

          // Mouse proximity displacement
          const dx = mouseX - p.baseX;
          const dy = mouseY - p.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          let pushX = 0;
          let pushY = 0;
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * (mouseSpeed * 0.45 + 10);
            pushX = -(dx / dist) * force;
            pushY = -(dy / dist) * force;
          }

          p.x = p.baseX + waveX + pushX;
          p.y = p.baseY + waveY + pushY;
        }

        // Draw particle dot
        if (p.isAccent) {
          ctx.fillStyle = '#FF3030';
          ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
          ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);
        }

        // Draw connecting horizontal line to neighbor
        const colIdx = i % cols;
        if (colIdx < cols - 1) {
          const nextP = points[i + 1];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(nextP.x, nextP.y);
          ctx.stroke();
        }
      }
    };

    render();
  };

  /* --------------------------------------------------------------------------
     2. KINETIC TYPOGRAPHY CHARACTER SCRAMBLER
     -------------------------------------------------------------------------- */
  const initKineticScrambler = () => {
    const titleEl = document.getElementById('heroMassiveTitle');
    if (!titleEl) return;

    const glyphs = '0123456789ABCDEFΔ∇✕◇░▒▓';

    const scrambleWord = (element, targetText) => {
      let iteration = 0;
      clearInterval(element._scrambleTimer);

      element._scrambleTimer = setInterval(() => {
        element.innerHTML = targetText
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iteration) return letter;
            const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
            return `<span class="glitch-glyph">${randomGlyph}</span>`;
          })
          .join('');

        if (iteration >= targetText.length) {
          clearInterval(element._scrambleTimer);
          element.textContent = targetText;
        }

        iteration += 1 / 2.2;
      }, 35);
    };

    const lines = titleEl.querySelectorAll('.title-line');
    lines.forEach((line, idx) => {
      const originalText = line.getAttribute('data-text') || line.textContent.trim();
      setTimeout(() => {
        scrambleWord(line, originalText);
      }, idx * 140 + 100);

      line.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) scrambleWord(line, originalText);
      });
    });
  };

  /* --------------------------------------------------------------------------
     4. HEADER LIVE UTC TELEMETRY
     -------------------------------------------------------------------------- */
  const initTelemetryClock = () => {
    const clockEl = document.getElementById('telemetryClock');
    if (!clockEl) return;

    const updateClock = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      clockEl.textContent = `${h}:${m}:${s} UTC`;
    };
    setInterval(updateClock, 1000);
    updateClock();
  };

  /* --------------------------------------------------------------------------
     5. CONTENT DATA SOURCE HYDRATION (MAINTAINABLE CONTENT ARCHITECTURE)
     -------------------------------------------------------------------------- */
  const hydrateFromPortfolioData = () => {
    if (typeof PORTFOLIO_DATA === 'undefined') return;

    try {
      const { about, featuredProject, secondaryProjects, experience, skills, education, contact } = PORTFOLIO_DATA;

      // Pitstop AI Featured Project Hydration
      if (featuredProject) {
        const overviewEl = document.getElementById('pitstopOverviewText');
        if (overviewEl && featuredProject.overview) {
          overviewEl.textContent = featuredProject.overview;
        }
        const progressEl = document.getElementById('pitstopProgressText');
        if (progressEl && featuredProject.currentProgress) {
          progressEl.textContent = featuredProject.currentProgress;
        }
        const highlightsEl = document.getElementById('pitstopHighlightsList');
        if (highlightsEl && Array.isArray(featuredProject.highlights)) {
          highlightsEl.innerHTML = featuredProject.highlights.map((h, i) => `
            <li>
              <span class="ph-idx">0${i + 1}</span>
              <div class="ph-content">
                <strong>${h.title}</strong>
                <p>${h.desc}</p>
              </div>
            </li>
          `).join('');
        }
      }

      // About Manifesto Paragraphs
      const aboutContainer = document.getElementById('aboutManifestoContainer');
      if (aboutContainer && about && about.paragraphs) {
        aboutContainer.innerHTML = about.paragraphs.map(p => `<p>${p}</p>`).join('');
      }

      // About Principles
      const principlesContainer = document.getElementById('principlesContainer');
      if (principlesContainer && about && about.principles) {
        principlesContainer.innerHTML = about.principles.map(item => `
          <div class="principle-block">
            <div class="pb-header">
              <span>${item.code}</span>
            </div>
            <h4 class="pb-title">${item.title}</h4>
            <p class="pb-desc">${item.description}</p>
          </div>
        `).join('');
      }

      // Secondary Projects Grid
      const secContainer = document.getElementById('secondaryProjectsContainer');
      if (secContainer && Array.isArray(secondaryProjects)) {
        secContainer.innerHTML = secondaryProjects.map(proj => `
          <div class="sec-project-card">
            <div class="spc-meta">
              <span class="spc-cat">${proj.category}</span>
              <span class="spc-status">${proj.status}</span>
            </div>
            <h4 class="spc-title">${proj.title}</h4>
            <p class="spc-desc">${proj.description}</p>
          </div>
        `).join('');
      }

      // Experience Trajectory
      const expContainer = document.getElementById('experienceTrajectoryContainer');
      if (expContainer && Array.isArray(experience)) {
        expContainer.innerHTML = experience.map(exp => `
          <div class="trajectory-card">
            <div class="tc-top-row">
              <div>
                <h3 class="tc-role">${exp.role}</h3>
                <div class="tc-entity">${exp.entity}</div>
              </div>
              <span class="tc-meta-pill">${exp.type} // ${exp.period}</span>
            </div>
            <p class="tc-desc">${exp.description}</p>
          </div>
        `).join('');
      }

      // Skills Matrix (Scientific & Futuristic Research Interface)
      const skillsContainer = document.getElementById('skillsMatrixContainer');
      if (skillsContainer && Array.isArray(skills)) {
        skillsContainer.innerHTML = skills.map(skill => {
          const name = typeof skill === 'string' ? skill : skill.name;
          const idx = typeof skill === 'object' && skill.idx ? skill.idx : '';
          const code = typeof skill === 'object' && skill.code ? skill.code : 'MODULE';
          const status = typeof skill === 'object' && skill.status ? skill.status : 'ACTIVE';
          const desc = typeof skill === 'object' && skill.desc ? skill.desc : '';
          return `
            <div class="skill-item-card" tabindex="0">
              <div class="sic-top-row">
                <span class="sic-idx">${idx} // ${code}</span>
                <span class="sic-status-pill"><span class="sic-pulse-dot"></span>${status}</span>
              </div>
              <h3 class="sic-name">${name}</h3>
              ${desc ? `<p class="sic-desc">${desc}</p>` : ''}
              <div class="sic-bottom-telemetry">
                <span class="sbt-sig">SIGNAL: OPTIMAL</span>
                <span class="sbt-bar"><span class="sbt-fill"></span></span>
              </div>
            </div>
          `;
        }).join('');
      }

      // Education Focus Areas
      const eduListContainer = document.getElementById('eduFocusItemsContainer');
      if (eduListContainer && education && education.focusAreas) {
        eduListContainer.innerHTML = education.focusAreas.map(f => `<li>${f}</li>`).join('');
      }

      // Contact Email
      const emailVal = document.getElementById('contactEmailVal');
      if (emailVal && contact && contact.email) {
        emailVal.textContent = contact.email;
      }
    } catch (e) {
      console.warn('Hydration notice:', e);
    }
  };

  /* --------------------------------------------------------------------------
     6. INTERACTIVE 1-CLICK CLIPBOARD COPY & FEEDBACK TOAST
     -------------------------------------------------------------------------- */
  const initClipboardAction = () => {
    const copyBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('copyToast');
    const emailStr = 'atharavbalotra83@gmail.com';

    if (copyBtn) {
      const showToast = () => {
        if (!toast) return;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      };

      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(emailStr).then(showToast).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = emailStr;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast();
          });
        } else {
          const ta = document.createElement('textarea');
          ta.value = emailStr;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast();
        }
      });
    }
  };

  /* --------------------------------------------------------------------------
     7. NAVIGATION, MOBILE DRAWER & ACTIVE SCROLLSPY
     -------------------------------------------------------------------------- */
  const initNavigation = () => {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const drawer = document.getElementById('mobileDrawerMenu');
    const navLinks = document.querySelectorAll('.header-nav .nav-link-item, .mobile-drawer-menu .mobile-item');

    // Drawer toggle
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = drawer.classList.contains('open');
        if (isOpen) {
          drawer.classList.remove('open');
          drawer.setAttribute('aria-hidden', 'true');
          toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
          drawer.classList.add('open');
          drawer.setAttribute('aria-hidden', 'false');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });

      // Close on link click
      drawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          drawer.classList.remove('open');
          drawer.setAttribute('aria-hidden', 'true');
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
          drawer.classList.remove('open');
          drawer.setAttribute('aria-hidden', 'true');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Scrollspy
    const sections = document.querySelectorAll('section[id]');
    const onScroll = () => {
      const scrollPos = window.scrollY + 180;
      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* --------------------------------------------------------------------------
     8. SCIENTIFIC SKILLS PARALLAX (SUBTLE ORBITAL REACTIVITY)
     -------------------------------------------------------------------------- */
  const initSkillsParallax = () => {
    const skillsSection = document.getElementById('skills');
    const orbitalSvg = document.querySelector('.ssb-orbital-svg');
    if (!skillsSection || !orbitalSvg || prefersReducedMotion) return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;

    skillsSection.addEventListener('mousemove', (e) => {
      const rect = skillsSection.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = relX * 18;
      targetY = relY * 18;
    }, { passive: true });

    skillsSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    const updateParallax = () => {
      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;
      orbitalSvg.style.transform = `translate(calc(-50% + ${curX.toFixed(2)}px), calc(-50% + ${curY.toFixed(2)}px))`;
      requestAnimationFrame(updateParallax);
    };
    updateParallax();
  };

  /* --------------------------------------------------------------------------
     EXECUTE INITIALIZATION
     -------------------------------------------------------------------------- */
  hydrateFromPortfolioData();
  initGenerativeWave();
  initKineticScrambler();
  initTelemetryClock();
  initClipboardAction();
  initNavigation();
  initSkillsParallax();
});
