/**
 * ==============================================================================
 * ATHARAV BALOTRA — FIRST-YEAR CSE (AI/ML) & CREATIVE DEVELOPER
 * SCRIPT.JS: Experimental Cosmic Motion & Architecture Engine
 * Three.js WebGL Tunnel, Terrain & Celestial Sphere, Binary Stream Canvas,
 * Kinetic Character Scrambler, Telemetry HUD & Data Source Hydration
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. THREE.JS 3D COSMIC ENVIRONMENT
     - Perspective wireframe tunnel
     - Continuously morphing wireframe terrain
     - Restrained central geometric sphere & orbital paths
     - Subtle star field
     -------------------------------------------------------------------------- */
  const init3DUniverse = () => {
    const canvas = document.getElementById('universe3dCanvas');
    if (!canvas) return;

    if (typeof THREE === 'undefined') {
      console.warn('Three.js CDN unavailable. 3D cosmic layer bypassed.');
      return;
    }

    // WebGL context check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL unsupported in current browser.');
        return;
      }
    } catch (e) {
      console.warn('WebGL detection error:', e);
      return;
    }

    try {
      let width = window.innerWidth;
      let height = window.innerHeight;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x030303, 1);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
      camera.position.set(0, 15, 270);

      // Mouse Parallax Targets
      let mouseX = 0;
      let mouseY = 0;
      let targetMouseX = 0;
      let targetMouseY = 0;
      let scrollY = window.scrollY || 0;
      let targetScrollY = scrollY;

      // ------------------------------------------------------------------------
      // A. Starfield Layer (Subtle silver & sparse red accent stars)
      // ------------------------------------------------------------------------
      const starCount = width < 768 ? 700 : 1300;
      const starGeo = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 1600;
        starPositions[i + 1] = (Math.random() - 0.5) * 1400;
        starPositions[i + 2] = (Math.random() - 0.5) * 1200 - 100;

        const rand = Math.random();
        if (rand > 0.94) {
          // Sparse Accent Red Stars
          starColors[i] = 1.0;
          starColors[i + 1] = 0.19;
          starColors[i + 2] = 0.19;
        } else {
          // Silver/White Stars
          const b = 0.65 + Math.random() * 0.35;
          starColors[i] = b;
          starColors[i + 1] = b;
          starColors[i + 2] = b;
        }
      }

      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

      const starMat = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.75
      });

      const starField = new THREE.Points(starGeo, starMat);
      scene.add(starField);

      // ------------------------------------------------------------------------
      // B. Perspective Wireframe Tunnel (Concentric rings & longitudinal rails)
      // ------------------------------------------------------------------------
      const tunnelGroup = new THREE.Group();
      scene.add(tunnelGroup);

      const ringCount = 12;
      const tunnelLength = 700;
      const tunnelRings = [];
      const ringRadius = 140;

      for (let i = 0; i < ringCount; i++) {
        const ringGeo = new THREE.BufferGeometry();
        const segments = 48;
        const ringPts = [];
        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          ringPts.push(new THREE.Vector3(Math.cos(theta) * ringRadius, Math.sin(theta) * ringRadius, 0));
        }
        ringGeo.setFromPoints(ringPts);

        const isAccent = i === 4;
        const ringMat = new THREE.LineBasicMaterial({
          color: isAccent ? 0xff3030 : 0xf4f4f4,
          transparent: true,
          opacity: isAccent ? 0.28 : 0.09
        });

        const ringMesh = new THREE.LineLoop(ringGeo, ringMat);
        const zPos = 80 - (i * (tunnelLength / ringCount));
        ringMesh.position.set(0, 5, zPos);
        tunnelGroup.add(ringMesh);
        tunnelRings.push(ringMesh);
      }

      // Longitudinal Rail Lines extending into the tunnel
      const railCount = 8;
      for (let r = 0; r < railCount; r++) {
        const theta = (r / railCount) * Math.PI * 2;
        const x = Math.cos(theta) * ringRadius;
        const y = Math.sin(theta) * ringRadius;

        const railGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, y + 5, 80),
          new THREE.Vector3(x, y + 5, 80 - tunnelLength)
        ]);

        const railMat = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.06
        });

        const railLine = new THREE.Line(railGeo, railMat);
        tunnelGroup.add(railLine);
      }

      // ------------------------------------------------------------------------
      // C. Central Geometric Wireframe Sphere & Orbital Paths
      // Positioned at (0, 10, -85) for spatial depth behind hero text
      // ------------------------------------------------------------------------
      const coreGroup = new THREE.Group();
      coreGroup.position.set(0, 10, -85);
      scene.add(coreGroup);

      const icosaGeo = new THREE.IcosahedronGeometry(44, 2);
      const icosaMat = new THREE.MeshBasicMaterial({
        color: 0xf4f4f4,
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });
      const celestialCore = new THREE.Mesh(icosaGeo, icosaMat);
      coreGroup.add(celestialCore);

      // Inner Core Points (Restrained Red Accent)
      const innerGeo = new THREE.IcosahedronGeometry(32, 1);
      const innerMat = new THREE.PointsMaterial({
        color: 0xff3030,
        size: 1.8,
        transparent: true,
        opacity: 0.45
      });
      const innerPoints = new THREE.Points(innerGeo, innerMat);
      coreGroup.add(innerPoints);

      // Thin Orbital Wireframe Rings
      const createOrbitalRing = (radius, tiltX, tiltZ, opacity, color = 0xf4f4f4) => {
        const segments = 96;
        const ringPoints = [];
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
        }
        const rGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
        const rMat = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: opacity
        });
        const rLoop = new THREE.LineLoop(rGeo, rMat);
        rLoop.rotation.x = tiltX;
        rLoop.rotation.z = tiltZ;
        return rLoop;
      };

      const ring1 = createOrbitalRing(80, Math.PI * 0.28, Math.PI * 0.12, 0.2, 0xf4f4f4);
      const ring2 = createOrbitalRing(110, -Math.PI * 0.22, Math.PI * 0.35, 0.18, 0xff3030);
      const ring3 = createOrbitalRing(136, Math.PI * 0.42, -Math.PI * 0.18, 0.1, 0x7a1018);

      coreGroup.add(ring1);
      coreGroup.add(ring2);
      coreGroup.add(ring3);

      // ------------------------------------------------------------------------
      // D. Procedural Morphing Wireframe Horizon Terrain
      // ------------------------------------------------------------------------
      const terrainWidth = 1400;
      const terrainDepth = 900;
      const gridSegmentsX = width < 768 ? 24 : 38;
      const gridSegmentsY = width < 768 ? 16 : 26;

      const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainDepth, gridSegmentsX, gridSegmentsY);
      terrainGeo.rotateX(-Math.PI / 2);

      const basePositions = terrainGeo.attributes.position.array.slice();

      const terrainMat = new THREE.MeshBasicMaterial({
        color: 0xf4f4f4,
        wireframe: true,
        transparent: true,
        opacity: 0.11
      });

      const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
      terrainMesh.position.set(0, -135, -160);
      scene.add(terrainMesh);

      // Event Listeners for Parallax & Scroll
      const onMouseMove = (e) => {
        targetMouseX = ((e.clientX / width) - 0.5) * 2;
        targetMouseY = ((e.clientY / height) - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      const onScroll = () => {
        targetScrollY = window.scrollY || 0;
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const onResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
      window.addEventListener('resize', onResize);

      // Animation Loop
      let clock = new THREE.Clock();

      const animate = () => {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        if (!prefersReducedMotion) {
          mouseX += (targetMouseX - mouseX) * 0.04;
          mouseY += (targetMouseY - mouseY) * 0.04;
          scrollY += (targetScrollY - scrollY) * 0.06;

          camera.position.x = mouseX * 22;
          camera.position.y = 15 - (mouseY * 12) - (scrollY * 0.035);
          camera.lookAt(0, -scrollY * 0.02, -100);

          // Rotate Celestial Sphere
          celestialCore.rotation.x = elapsedTime * 0.06;
          celestialCore.rotation.y = elapsedTime * 0.09;

          innerPoints.rotation.x = -elapsedTime * 0.08;
          innerPoints.rotation.z = elapsedTime * 0.05;

          ring1.rotation.y = elapsedTime * 0.1;
          ring2.rotation.y = -elapsedTime * 0.08;
          ring3.rotation.z = elapsedTime * 0.06;

          starField.rotation.y = elapsedTime * 0.01;

          // Animate Wireframe Tunnel Rings (Forward continuous translation)
          tunnelRings.forEach((r, idx) => {
            let z = 80 - (((idx * (tunnelLength / ringCount)) - (elapsedTime * 28)) % tunnelLength);
            if (z > 80) z -= tunnelLength;
            r.position.z = z;
          });

          // Continuously Morphing Terrain Wave Motion
          const positions = terrainGeo.attributes.position.array;
          const count = positions.length / 3;

          for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = basePositions[i3];
            const z = basePositions[i3 + 2];

            const wave1 = Math.sin(x * 0.008 + elapsedTime * 1.05) * 14;
            const wave2 = Math.cos(z * 0.009 + elapsedTime * 0.8) * 15;
            const wave3 = Math.sin((x + z) * 0.006 + elapsedTime * 0.6) * 8;

            positions[i3 + 1] = basePositions[i3 + 1] + wave1 + wave2 + wave3;
          }
          terrainGeo.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
      };

      animate();
    } catch (err) {
      console.warn('Three.js initialization notice:', err);
    }
  };

  /* --------------------------------------------------------------------------
     2. GENERATIVE DIGITAL BINARY STREAM CANVAS (2D MATRIX LAYER)
     -------------------------------------------------------------------------- */
  const initBinaryStreams = () => {
    const canvas = document.getElementById('binaryCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const chars = '01010101Δ∇✕◇0xAB';
    const fontSize = 12;
    const columns = Math.floor(width / (fontSize * 2.2));
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }

    let lastDraw = 0;
    const draw = (timestamp) => {
      requestAnimationFrame(draw);

      if (prefersReducedMotion) return;
      if (timestamp - lastDraw < 55) return; // ~18 FPS for retro digital stream
      lastDraw = timestamp;

      ctx.fillStyle = 'rgba(3, 3, 3, 0.12)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * (fontSize * 2.2);
        const y = drops[i] * fontSize;

        // Occasional red accent glyph
        if (Math.random() > 0.96) {
          ctx.fillStyle = '#FF3030';
        } else {
          ctx.fillStyle = 'rgba(244, 244, 244, 0.45)';
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    requestAnimationFrame(draw);
  };

  /* --------------------------------------------------------------------------
     3. KINETIC TYPOGRAPHY CHARACTER SCRAMBLER
     -------------------------------------------------------------------------- */
  const initKineticScrambler = () => {
    const titleEl = document.getElementById('kineticHeroTitle');
    if (!titleEl) return;

    const finalString = titleEl.getAttribute('data-scramble') || 'ATHARAV BALOTRA';
    const glyphs = '0123456789ABCDEFΔ∇✕◇░▒▓';
    let iteration = 0;
    let scrambleInterval = null;

    const runScramble = () => {
      clearInterval(scrambleInterval);
      iteration = 0;

      scrambleInterval = setInterval(() => {
        titleEl.innerHTML = finalString
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iteration) return letter;
            const randomGlyph = glyphs[Math.floor(Math.random() * glyphs.length)];
            return `<span class="glitch-glyph">${randomGlyph}</span>`;
          })
          .join('');

        if (iteration >= finalString.length) {
          clearInterval(scrambleInterval);
          titleEl.textContent = finalString;
        }

        iteration += 1 / 2.5;
      }, 35);
    };

    // Run on initial load
    setTimeout(runScramble, 200);

    // Run on hover
    titleEl.addEventListener('mouseenter', () => {
      if (!prefersReducedMotion) runScramble();
    });
  };

  /* --------------------------------------------------------------------------
     4. TELEMETRY STATUS HUD UPDATER
     -------------------------------------------------------------------------- */
  const initTelemetryHUD = () => {
    const clockEl = document.getElementById('telemetryClock');
    const fpsEl = document.getElementById('fpsTelemetry');

    // Update UTC Clock
    const updateClock = () => {
      if (!clockEl) return;
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      clockEl.textContent = `${h}:${m}:${s} UTC`;
    };
    setInterval(updateClock, 1000);
    updateClock();

    // Micro FPS telemetry
    if (fpsEl) {
      let frameCount = 0;
      let lastTime = performance.now();
      const calcFPS = (now) => {
        frameCount++;
        if (now >= lastTime + 1000) {
          const fps = Math.round((frameCount * 1000) / (now - lastTime));
          fpsEl.textContent = `${Math.min(fps, 60)} FPS`;
          frameCount = 0;
          lastTime = now;
        }
        requestAnimationFrame(calcFPS);
      };
      requestAnimationFrame(calcFPS);
    }
  };

  /* --------------------------------------------------------------------------
     5. CONTENT DATA SOURCE HYDRATION (MAINTAINABLE CONTENT REQUIREMENT)
     Hydrates dynamic elements from window.PORTFOLIO_DATA
     -------------------------------------------------------------------------- */
  const hydrateFromPortfolioData = () => {
    if (typeof PORTFOLIO_DATA === 'undefined') {
      console.info('PORTFOLIO_DATA object loaded from static HTML fallback.');
      return;
    }

    try {
      const { meta, about, featuredProject, experience, skills, education, contact } = PORTFOLIO_DATA;

      // Meta & Tagline
      const heroRoleLead = document.getElementById('heroRoleLead');
      if (heroRoleLead && meta.tagline) {
        heroRoleLead.innerHTML = `Exploring intelligent systems. Building software. <span class="accent-text">Creating new digital experiences.</span>`;
      }

      // About Body Paragraphs
      const aboutBodyEl = document.getElementById('aboutBodyContainer');
      if (aboutBodyEl && about && about.paragraphs) {
        aboutBodyEl.innerHTML = about.paragraphs.map(p => `<p>${p}</p>`).join('');
      }

      // About Principles
      const principlesEl = document.getElementById('principlesContainer');
      if (principlesEl && about && about.principles) {
        principlesEl.innerHTML = about.principles.map(item => `
          <div class="principle-cell">
            <div class="pc-top">
              <span class="pc-code">${item.code}</span>
            </div>
            <h4 class="pc-title">${item.title}</h4>
            <p class="pc-desc">${item.description}</p>
          </div>
        `).join('');
      }

      // Pitstop AI Schematic Nodes
      const schematicContainer = document.getElementById('schematicNodesContainer');
      if (schematicContainer && featuredProject && featuredProject.schematicNodes) {
        schematicContainer.innerHTML = featuredProject.schematicNodes.map(node => `
          <div class="schematic-node">
            <span class="sn-step">${node.step}</span>
            <div class="sn-info">
              <span class="sn-title">${node.label}</span>
              <span class="sn-desc">${node.desc}</span>
            </div>
          </div>
        `).join('');
      }

      // Secondary Projects Grid (Maintainable additions from portfolio-data.js)
      const secondaryContainer = document.getElementById('secondaryProjectsContainer');
      if (secondaryContainer && Array.isArray(PORTFOLIO_DATA.secondaryProjects)) {
        secondaryContainer.innerHTML = PORTFOLIO_DATA.secondaryProjects.map(proj => `
          <div class="secondary-project-card card-corner-tech">
            <div class="spc-top">
              <span class="spc-cat">${proj.category}</span>
              <span class="spc-status">${proj.status}</span>
            </div>
            <h4 class="spc-title">${proj.title}</h4>
            <p class="spc-desc">${proj.description}</p>
          </div>
        `).join('');
      }

      // Experience Timeline
      const expContainer = document.getElementById('experienceTimelineContainer');
      if (expContainer && Array.isArray(experience)) {
        expContainer.innerHTML = experience.map(exp => `
          <div class="exp-card card-corner-tech">
            <div class="exp-header-row">
              <div>
                <h3 class="exp-role-title">${exp.role}</h3>
                <div class="exp-entity-sub">${exp.entity}</div>
              </div>
              <span class="exp-meta-badge">
                <span class="tag-dot"></span>
                <span>${exp.type} // ${exp.period}</span>
              </span>
            </div>
            <p class="exp-desc">${exp.description}</p>
          </div>
        `).join('');
      }

      // Skills Editorial Grid
      const skillsContainer = document.getElementById('skillsGridContainer');
      if (skillsContainer && Array.isArray(skills)) {
        skillsContainer.innerHTML = skills.map(cat => `
          <div class="skill-category-card card-corner-tech">
            <div class="scc-header">
              <h3 class="scc-title">${cat.category}</h3>
              <span class="scc-count">[${cat.items.length} MODULES]</span>
            </div>
            <div class="skill-pills-wrap">
              ${cat.items.map(pill => `<span class="skill-pill">${pill}</span>`).join('')}
            </div>
          </div>
        `).join('');
      }

      // Education Focus Areas
      const eduFocusContainer = document.getElementById('eduFocusListContainer');
      if (eduFocusContainer && education && education.focusAreas) {
        eduFocusContainer.innerHTML = education.focusAreas.map(f => `<li>${f}</li>`).join('');
      }

      // Contact details
      const contactEmailText = document.getElementById('contactEmailText');
      if (contactEmailText && contact && contact.email) {
        contactEmailText.textContent = contact.email;
      }

      console.info('Portfolio successfully hydrated from maintainable PORTFOLIO_DATA module.');
    } catch (e) {
      console.warn('Error hydrating from PORTFOLIO_DATA:', e);
    }
  };

  /* --------------------------------------------------------------------------
     6. INTERACTIVE CONTACT ACTIONS (1-CLICK CLIPBOARD COPY & TOAST)
     -------------------------------------------------------------------------- */
  const initContactActions = () => {
    const copyBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('copyToast');
    const emailToCopy = 'atharavbalotra83@gmail.com';

    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const showToast = () => {
          if (!toast) return;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3200);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(emailToCopy)
            .then(showToast)
            .catch(() => {
              // Fallback
              const textarea = document.createElement('textarea');
              textarea.value = emailToCopy;
              document.body.appendChild(textarea);
              textarea.select();
              document.execCommand('copy');
              document.body.removeChild(textarea);
              showToast();
            });
        } else {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = emailToCopy;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast();
        }
      });
    }
  };

  /* --------------------------------------------------------------------------
     7. NAVIGATION, ACCESSIBLE MOBILE DRAWER & SCROLLSPY
     -------------------------------------------------------------------------- */
  const initNavigation = () => {
    const toggleBtn = document.getElementById('menuToggleBtn');
    const drawer = document.getElementById('mobileDrawer');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-item, .mobile-drawer .mobile-link');

    // Mobile menu toggle
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
      drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
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

    // ScrollSpy
    const sections = document.querySelectorAll('section[id]');
    const onScrollSpy = () => {
      const scrollPos = window.scrollY + 200;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            const target = link.getAttribute('href');
            if (target === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy();
  };

  /* --------------------------------------------------------------------------
     INITIALIZE ALL SUBSYSTEMS
     -------------------------------------------------------------------------- */
  hydrateFromPortfolioData();
  init3DUniverse();
  initBinaryStreams();
  initKineticScrambler();
  initTelemetryHUD();
  initContactActions();
  initNavigation();
});
