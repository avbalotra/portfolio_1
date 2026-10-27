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
     2. INTERACTIVE ARCHITECTURAL PIPELINE CANVAS (PITSTOP AI)
     Dynamic computational node diagram with active signal packets
     -------------------------------------------------------------------------- */
  const initSchematicCanvas = () => {
    const canvas = document.getElementById('schematicCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 280);

    const onResize = () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 280;
    };
    window.addEventListener('resize', onResize);

    const nodes = [
      { id: '01', x: 0.18, y: 0.5, label: 'INPUT' },
      { id: '02', x: 0.40, y: 0.28, label: 'ROUTER' },
      { id: '03', x: 0.62, y: 0.72, label: 'INFERENCE' },
      { id: '04', x: 0.84, y: 0.5, label: 'OUTPUT' }
    ];

    const packets = [
      { from: 0, to: 1, progress: 0.1, speed: 0.012 },
      { from: 1, to: 2, progress: 0.5, speed: 0.009 },
      { from: 2, to: 3, progress: 0.8, speed: 0.014 }
    ];

    let t = 0;

    const animateSchematic = () => {
      requestAnimationFrame(animateSchematic);
      t += 0.02;

      ctx.clearRect(0, 0, width, height);

      // Grid background in schematic
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connecting channels
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.2;

      const getCoords = (n) => ({ x: n.x * width, y: n.y * height });

      ctx.beginPath();
      const p0 = getCoords(nodes[0]);
      ctx.moveTo(p0.x, p0.y);
      for (let i = 1; i < nodes.length; i++) {
        const p = getCoords(nodes[i]);
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      // Render animated signal packets
      packets.forEach(pkt => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) pkt.progress = 0;

        const start = getCoords(nodes[pkt.from]);
        const end = getCoords(nodes[pkt.to]);

        const curX = start.x + (end.x - start.x) * pkt.progress;
        const curY = start.y + (end.y - start.y) * pkt.progress;

        // Packet glow
        ctx.fillStyle = '#FF3030';
        ctx.beginPath();
        ctx.arc(curX, curY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 48, 48, 0.3)';
        ctx.beginPath();
        ctx.arc(curX, curY, 7, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Node stations
      nodes.forEach((n, idx) => {
        const { x, y } = getCoords(n);

        // Node Outer Box
        ctx.strokeStyle = '#FF3030';
        ctx.fillStyle = '#0a0a0a';
        ctx.lineWidth = 1.2;
        ctx.fillRect(x - 14, y - 14, 28, 28);
        ctx.strokeRect(x - 14, y - 14, 28, 28);

        // Node Index
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.id, x, y);

        // Node Label
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#8E8E93';
        ctx.fillText(n.label, x, y + 24);
      });
    };

    animateSchematic();
  };

  /* --------------------------------------------------------------------------
     3. KINETIC TYPOGRAPHY CHARACTER SCRAMBLER
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

      // Skills Matrix
      const skillsContainer = document.getElementById('skillsMatrixContainer');
      if (skillsContainer && Array.isArray(skills)) {
        skillsContainer.innerHTML = skills.map(cat => `
          <div class="skill-modern-card">
            <div class="smc-header">
              <h3 class="smc-title">${cat.category}</h3>
              <span class="smc-count">[${cat.items.length}]</span>
            </div>
            <div class="smc-pills-wrap">
              ${cat.items.map(p => `<span class="smc-pill">${p}</span>`).join('')}
            </div>
          </div>
        `).join('');
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
     EXECUTE INITIALIZATION
     -------------------------------------------------------------------------- */
  hydrateFromPortfolioData();
  initGenerativeWave();
  initSchematicCanvas();
  initKineticScrambler();
  initTelemetryClock();
  initClipboardAction();
  initNavigation();
});
