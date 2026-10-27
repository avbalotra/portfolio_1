/**
 * ==============================================================================
 * ATHARAV BALOTRA — CREATIVE DEVELOPER & SOFTWARE ENGINEER
 * SCRIPT.JS: Wodniack-Inspired Creative Motion Architecture
 * Three.js WebGL Horizon, Generative Binary Stream Canvas, Kinetic Typography
 * Character Scrambler, Telemetry HUD, and Precision Navigation
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. THREE.JS 3D UNIVERSE CANVAS ENGINE
     -------------------------------------------------------------------------- */
  const init3DUniverse = () => {
    const canvas = document.getElementById('universe3dCanvas');
    if (!canvas) return;

    if (typeof THREE === 'undefined') {
      console.warn('Three.js CDN unavailable. 3D layer bypassed.');
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
      renderer.setClearColor(0x000000, 1);

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
      // A. Starfield Layer
      // ------------------------------------------------------------------------
      const starCount = width < 768 ? 800 : 1600;
      const starGeo = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 1600;
        starPositions[i + 1] = (Math.random() - 0.5) * 1400;
        starPositions[i + 2] = (Math.random() - 0.5) * 1200 - 100;

        const rand = Math.random();
        if (rand > 0.88) {
          starColors[i] = 0.0;
          starColors[i + 1] = 0.94;
          starColors[i + 2] = 1.0;
        } else if (rand > 0.78) {
          starColors[i] = 0.65;
          starColors[i + 1] = 0.55;
          starColors[i + 2] = 0.98;
        } else {
          const b = 0.7 + Math.random() * 0.3;
          starColors[i] = b;
          starColors[i + 1] = b;
          starColors[i + 2] = b;
        }
      }

      starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

      const starMat = new THREE.PointsMaterial({
        size: 1.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });

      const starField = new THREE.Points(starGeo, starMat);
      scene.add(starField);

      // ------------------------------------------------------------------------
      // B. Central Wireframe Celestial Core
      // Positioned comfortably deep at (0, 10, -85) to avoid text collision
      // ------------------------------------------------------------------------
      const coreGroup = new THREE.Group();
      coreGroup.position.set(0, 10, -85);
      scene.add(coreGroup);

      const icosaGeo = new THREE.IcosahedronGeometry(46, 2);
      const icosaMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.14
      });
      const celestialCore = new THREE.Mesh(icosaGeo, icosaMat);
      coreGroup.add(celestialCore);

      const innerGeo = new THREE.IcosahedronGeometry(34, 1);
      const innerMat = new THREE.PointsMaterial({
        color: 0x00f0ff,
        size: 2.0,
        transparent: true,
        opacity: 0.4
      });
      const innerPoints = new THREE.Points(innerGeo, innerMat);
      coreGroup.add(innerPoints);

      // Thin Orbital Wireframe Paths
      const createOrbitalRing = (radius, tiltX, tiltZ, opacity, color = 0xffffff) => {
        const segments = 96;
        const ringPoints = [];
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
        }
        const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
        const ringMat = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: opacity
        });
        const ring = new THREE.LineLoop(ringGeo, ringMat);
        ring.rotation.x = tiltX;
        ring.rotation.z = tiltZ;
        return ring;
      };

      const ring1 = createOrbitalRing(82, Math.PI * 0.28, Math.PI * 0.12, 0.22, 0xffffff);
      const ring2 = createOrbitalRing(112, -Math.PI * 0.22, Math.PI * 0.35, 0.16, 0x00f0ff);
      const ring3 = createOrbitalRing(140, Math.PI * 0.42, -Math.PI * 0.18, 0.1, 0xa78bfa);

      coreGroup.add(ring1);
      coreGroup.add(ring2);
      coreGroup.add(ring3);

      // ------------------------------------------------------------------------
      // C. Procedural Undulating Horizon Terrain
      // ------------------------------------------------------------------------
      const terrainWidth = 1400;
      const terrainDepth = 900;
      const gridSegmentsX = width < 768 ? 24 : 42;
      const gridSegmentsY = width < 768 ? 16 : 28;

      const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainDepth, gridSegmentsX, gridSegmentsY);
      terrainGeo.rotateX(-Math.PI / 2);

      const basePositions = terrainGeo.attributes.position.array.slice();

      const terrainMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
      });

      const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
      terrainMesh.position.set(0, -135, -170);
      scene.add(terrainMesh);

      // Event Listeners
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

          camera.position.x = mouseX * 20;
          camera.position.y = 15 - (mouseY * 12) - (scrollY * 0.03);
          camera.lookAt(0, -scrollY * 0.02, -100);

          celestialCore.rotation.x = elapsedTime * 0.07;
          celestialCore.rotation.y = elapsedTime * 0.1;

          innerPoints.rotation.x = -elapsedTime * 0.09;
          innerPoints.rotation.z = elapsedTime * 0.05;

          ring1.rotation.y = elapsedTime * 0.12;
          ring2.rotation.y = -elapsedTime * 0.09;
          ring3.rotation.z = elapsedTime * 0.07;

          starField.rotation.y = elapsedTime * 0.012;

          // Terrain wave motion
          const positions = terrainGeo.attributes.position.array;
          const count = positions.length / 3;

          for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = basePositions[i3];
            const z = basePositions[i3 + 2];

            const wave1 = Math.sin(x * 0.008 + elapsedTime * 1.1) * 14;
            const wave2 = Math.cos(z * 0.009 + elapsedTime * 0.85) * 15;
            const wave3 = Math.sin((x + z) * 0.006 + elapsedTime * 0.65) * 8;

            positions[i3 + 1] = basePositions[i3 + 1] + wave1 + wave2 + wave3;
          }
          terrainGeo.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
      };

      animate();

    } catch (err) {
      console.warn('Three.js setup encountered an issue:', err);
    }
  };

  /* --------------------------------------------------------------------------
     2. GENERATIVE DIGITAL BINARY STREAM CANVAS (WODNIACK-STYLE)
     Subtle vertical cascading binary matrix data streams
     -------------------------------------------------------------------------- */
  const initBinaryStreamCanvas = () => {
    const canvas = document.getElementById('binaryCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    });

    const fontSize = 13;
    let columns = [];

    const initColumns = () => {
      const colCount = Math.floor(width / 24);
      columns = [];
      for (let i = 0; i < colCount; i++) {
        columns.push({
          x: i * 24 + 12,
          y: Math.random() * -height,
          speed: 0.6 + Math.random() * 1.2,
          chars: [],
          length: Math.floor(6 + Math.random() * 12)
        });
      }
    };

    initColumns();

    // Mouse coordinates for gentle distortion
    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    const binaryChars = ['0', '1', '0', '1', '1', '0', '0', '1', 'X', '7', 'F'];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';

        for (let col of columns) {
          col.y += col.speed;

          if (col.y > height + col.length * fontSize) {
            col.y = -Math.random() * 200;
            col.speed = 0.6 + Math.random() * 1.2;
          }

          // Render falling character streak
          for (let j = 0; j < col.length; j++) {
            const charY = col.y - j * fontSize;
            if (charY > -20 && charY < height + 20) {
              const char = binaryChars[(Math.floor(charY / 10) + j) % binaryChars.length];
              
              // Distance from cursor for interactive displacement
              const dx = col.x - mouse.x;
              const dy = charY - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              let offsetX = 0;

              if (dist < 140) {
                const force = (1 - dist / 140) * 14;
                offsetX = (dx / dist) * force;
              }

              // Head of streak is bright cyan, fading down tail
              if (j === 0) {
                ctx.fillStyle = '#00f0ff';
                ctx.globalAlpha = 0.65;
              } else {
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = Math.max(0.04, 0.28 * (1 - j / col.length));
              }

              ctx.fillText(char, col.x + offsetX, charY);
            }
          }
        }
      }

      requestAnimationFrame(render);
    };

    render();
  };

  /* --------------------------------------------------------------------------
     3. KINETIC TYPOGRAPHY SCRAMBLER (AWARD-WINNING INTERACTION)
     Decodes "ATHARAV BALOTRA" character by character on hover & load
     -------------------------------------------------------------------------- */
  const initKineticScrambler = () => {
    const titleEl = document.getElementById('kineticHeroTitle');
    if (!titleEl) return;

    const originalText = titleEl.getAttribute('data-scramble') || 'ATHARAV BALOTRA';
    const glyphs = '01010101XYZ#$<>~*';
    let isScrambling = false;

    const scramble = () => {
      if (isScrambling) return;
      isScrambling = true;

      let iteration = 0;
      const totalIterations = originalText.length * 2.5;

      const interval = setInterval(() => {
        titleEl.textContent = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2.5) {
              return originalText[index];
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('');

        iteration++;

        if (iteration >= totalIterations) {
          titleEl.textContent = originalText;
          clearInterval(interval);
          isScrambling = false;
        }
      }, 35);
    };

    // Scramble on hover
    titleEl.addEventListener('mouseenter', scramble);

    // Initial reveal scramble after small delay
    setTimeout(scramble, 400);
  };

  /* --------------------------------------------------------------------------
     4. TELEMETRY & CLOCK UPDATERS
     -------------------------------------------------------------------------- */
  const initTelemetry = () => {
    const clockEl = document.getElementById('telemetryClock');
    const uplinkClock = document.getElementById('uplinkClock');
    const fpsEl = document.getElementById('fpsTelemetry');

    const updateClock = () => {
      const now = new Date();
      const yr = now.getUTCFullYear();
      const mo = String(now.getUTCMonth() + 1).padStart(2, '0');
      const da = String(now.getUTCDate()).padStart(2, '0');
      const hr = String(now.getUTCHours()).padStart(2, '0');
      const mi = String(now.getUTCMinutes()).padStart(2, '0');
      const se = String(now.getUTCSeconds()).padStart(2, '0');
      const formatted = `${yr}.${mo}.${da} ${hr}:${mi}:${se} UTC`;

      if (clockEl) clockEl.textContent = `${formatted} // SYNCED`;
      if (uplinkClock) uplinkClock.textContent = `${formatted} // ACTIVE`;
    };

    updateClock();
    setInterval(updateClock, 1000);

    // Minor realistic FPS fluctuation (59-60)
    setInterval(() => {
      if (fpsEl) {
        const fps = Math.random() > 0.8 ? 59 : 60;
        fpsEl.textContent = `${fps} FPS`;
      }
    }, 3000);
  };

  /* --------------------------------------------------------------------------
     5. NAVIGATION, MOBILE DRAWER & SCROLLSPY
     -------------------------------------------------------------------------- */
  const initNavigation = () => {
    const header = document.getElementById('mainHeader');
    const menuBtn = document.getElementById('menuToggleBtn');
    const drawer = document.getElementById('mobileDrawer');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-item');

    // Mobile Drawer Toggle
    if (menuBtn && drawer) {
      menuBtn.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        drawer.setAttribute('aria-hidden', String(!isOpen));
      });

      // Auto close on clicking link
      drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && !menuBtn.contains(e.target) && drawer.classList.contains('open')) {
          drawer.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          drawer.setAttribute('aria-hidden', 'true');
        }
      });
    }

    // Scrollspy
    const sectionIds = ['hero', 'about', 'projects', 'experience', 'skills', 'education', 'pursuits', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const updateScrollspy = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      if (header) {
        if (window.scrollY > 40) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }

      let currentId = 'hero';

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const top = sec.offsetTop;
        const height = sec.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
          currentId = sec.id;
          break;
        } else if (i === sections.length - 1 && scrollPos >= top) {
          currentId = sec.id;
        }
      }

      navLinks.forEach(link => {
        const target = link.getAttribute('data-section');
        if (target === currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', updateScrollspy, { passive: true });
    updateScrollspy();

    // Smooth Anchor Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const targetOffset = targetEl.offsetTop - 75;
          window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  /* --------------------------------------------------------------------------
     6. COMMUNICATIONS UPLINK: COPY EMAIL HANDLER & TOAST
     -------------------------------------------------------------------------- */
  const initCopyHandler = () => {
    const copyBtn = document.getElementById('copyEmailBtn');
    const copyBtnText = document.getElementById('copyBtnText');
    const toast = document.getElementById('copyToast');
    const emailCode = document.getElementById('emailCodeVal');

    if (!copyBtn) return;

    let toastTimer = null;

    copyBtn.addEventListener('click', async () => {
      const email = emailCode ? emailCode.textContent.trim() : 'atharav.balota@gmail.com';

      let copied = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(email);
          copied = true;
        } catch (err) {
          console.warn('Clipboard API blocked, using fallback.');
        }
      }

      if (!copied) {
        const tempInput = document.createElement('textarea');
        tempInput.value = email;
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand('copy');
          copied = true;
        } catch (e) {
          console.error('Fallback copy failed', e);
        }
        document.body.removeChild(tempInput);
      }

      if (copied) {
        if (copyBtnText) copyBtnText.textContent = 'COPIED!';
        if (toast) {
          toast.classList.add('toast-visible');
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => {
            toast.classList.remove('toast-visible');
            if (copyBtnText) copyBtnText.textContent = 'COPY';
          }, 3200);
        }
      }
    });
  };

  /* --------------------------------------------------------------------------
     7. INITIALIZE ALL SYSTEMS
     -------------------------------------------------------------------------- */
  init3DUniverse();
  initBinaryStreamCanvas();
  initKineticScrambler();
  initTelemetry();
  initNavigation();
  initCopyHandler();
});
