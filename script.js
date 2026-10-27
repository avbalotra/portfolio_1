/**
 * ==============================================================================
 * ATHARAV BALOTRA // SPACE × DIGITAL REALITY × GENERATIVE 3D
 * SCRIPT.JS: Three.js WebGL Universe Engine, Procedural Wireframe Horizon,
 * Morphing Celestial Core, Thin Orbital Paths, Telemetry & Navigation
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. THREE.JS 3D UNIVERSE ENGINE
     -------------------------------------------------------------------------- */
    const initUniverseEngine = () => {
      const canvas = document.getElementById('universe3dCanvas');
      if (!canvas) return;

      if (typeof THREE === 'undefined') {
        console.warn('Three.js not found in global scope. Falling back to 2D canvas galaxy.');
        init2DFallbackGalaxy(canvas);
        return;
      }

        try {
          let width = window.innerWidth;
          let height = window.innerHeight;

          // WebGL Renderer with High-Performance Settings
          const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
          });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.setSize(width, height);
          renderer.setClearColor(0x000000, 1);

          // Scene & Perspective Camera
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
          // A. MULTI-LAYERED PARTICLE STARFIELDS
          // ------------------------------------------------------------------------
          const starCount = width < 768 ? 900 : 1800;
          const starGeometry = new THREE.BufferGeometry();
          const starPositions = new Float32Array(starCount * 3);
          const starColors = new Float32Array(starCount * 3);

            for (let i = 0; i < starCount * 3; i += 3) {
              starPositions[i] = (Math.random() - 0.5) * 1600;
              starPositions[i + 1] = (Math.random() - 0.5) * 1400;
              starPositions[i + 2] = (Math.random() - 0.5) * 1200 - 100;

            const rand = Math.random();
            if (rand > 0.85) {
              // Electric blue tint
              starColors[i] = 0.35;
              starColors[i + 1] = 0.75;
              starColors[i + 2] = 1.0;
            } else if (rand > 0.75) {
              // Soft violet tint
              starColors[i] = 0.65;
              starColors[i + 1] = 0.55;
              starColors[i + 2] = 0.98;
            } else {
              // Silver/white
              const b = 0.7 + Math.random() * 0.3;
              starColors[i] = b;
              starColors[i + 1] = b;
              starColors[i + 2] = b;
            }
          }

          starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
          starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

          const starMaterial = new THREE.PointsMaterial({
            size: 1.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.85
          });

          const starField = new THREE.Points(starGeometry, starMaterial);
          scene.add(starField);

          // ------------------------------------------------------------------------
          // B. CENTRAL MORPHING WIREFRAME CELESTIAL CORE
          // ------------------------------------------------------------------------
          const coreGroup = new THREE.Group();
          coreGroup.position.set(0, 10, -75);
          scene.add(coreGroup);

          // Outer Wireframe Icosahedron
          const icosaGeo = new THREE.IcosahedronGeometry(48, 2);
          const icosaMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.15
          });
          const celestialCore = new THREE.Mesh(icosaGeo, icosaMat);
          coreGroup.add(celestialCore);

          // Inner Glowing Node Points
          const innerGeo = new THREE.IcosahedronGeometry(36, 1);
          const innerMat = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: 2.0,
            transparent: true,
            opacity: 0.45
          });
          const innerPoints = new THREE.Points(innerGeo, innerMat);
          coreGroup.add(innerPoints);

          // ------------------------------------------------------------------------
          // C. THIN ELEGANT ORBITAL PATHS (FINE 1PX WIRE LINES ONLY)
          // ------------------------------------------------------------------------
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

          const ring1 = createOrbitalRing(86, Math.PI * 0.28, Math.PI * 0.12, 0.25, 0xffffff);
          const ring2 = createOrbitalRing(118, -Math.PI * 0.22, Math.PI * 0.35, 0.18, 0x38bdf8);
          const ring3 = createOrbitalRing(145, Math.PI * 0.42, -Math.PI * 0.18, 0.12, 0xa78bfa);

          coreGroup.add(ring1);
          coreGroup.add(ring2);
          coreGroup.add(ring3);

          // ------------------------------------------------------------------------
          // D. PROCEDURAL UNDULATING WIREFRAME HORIZON / TERRAIN
          // ------------------------------------------------------------------------
          const terrainWidth = 1400;
          const terrainDepth = 900;
          const gridSegmentsX = width < 768 ? 26 : 44;
          const gridSegmentsY = width < 768 ? 18 : 30;

          const terrainGeo = new THREE.PlaneGeometry(terrainWidth, terrainDepth, gridSegmentsX, gridSegmentsY);
          terrainGeo.rotateX(-Math.PI / 2);

          const basePositions = terrainGeo.attributes.position.array.slice();

          const terrainMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.12
          });

          const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
          terrainMesh.position.set(0, -135, -170);
          scene.add(terrainMesh);

          // ------------------------------------------------------------------------
          // E. MOUSE INTERACTION & SCROLL PARALLAX
          // ------------------------------------------------------------------------
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

          // ------------------------------------------------------------------------
          // F. ANIMATION LOOP
          // ------------------------------------------------------------------------
          let clock = new THREE.Clock();

            const animate = () => {
              requestAnimationFrame(animate);

              const elapsedTime = clock.getElapsedTime();

              // Smooth Mouse Parallax Lerping
              mouseX += (targetMouseX - mouseX) * 0.04;
              mouseY += (targetMouseY - mouseY) * 0.04;
              scrollY += (targetScrollY - scrollY) * 0.06;

              // Camera Drift & Scroll Coupling
              camera.position.x = mouseX * 22;
              camera.position.y = 15 - (mouseY * 14) - (scrollY * 0.035);
              camera.lookAt(0, -scrollY * 0.02, -100);

              // Core Rotation
              celestialCore.rotation.x = elapsedTime * 0.08;
              celestialCore.rotation.y = elapsedTime * 0.12;

              innerPoints.rotation.x = -elapsedTime * 0.1;
              innerPoints.rotation.z = elapsedTime * 0.06;

              // Orbital Ring Rotations
              ring1.rotation.y = elapsedTime * 0.15;
              ring2.rotation.y = -elapsedTime * 0.1;
              ring3.rotation.z = elapsedTime * 0.08;

              // Starfield Rotation
              starField.rotation.y = elapsedTime * 0.015;
              starField.rotation.x = elapsedTime * 0.008;

              // Wave Motion on Terrain Mesh
              const positions = terrainGeo.attributes.position.array;
              const count = positions.length / 3;

                for (let i = 0; i < count; i++) {
                  const i3 = i * 3;
                  const x = basePositions[i3];
                  const z = basePositions[i3 + 2];

                  const wave1 = Math.sin(x * 0.008 + elapsedTime * 1.2) * 15;
                  const wave2 = Math.cos(z * 0.009 + elapsedTime * 0.9) * 16;
                  const wave3 = Math.sin((x + z) * 0.006 + elapsedTime * 0.7) * 9;

                positions[i3 + 1] = basePositions[i3 + 1] + wave1 + wave2 + wave3;
              }
              terrainGeo.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
          };

          animate();

    } catch (err) {
      console.error('WebGL initialization error:', err);
      init2DFallbackGalaxy(canvas);
    }
  };

    /* --------------------------------------------------------------------------
       2. 2D CANVAS FALLBACK GALAXY
       -------------------------------------------------------------------------- */
    const init2DFallbackGalaxy = (canvas) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      const particles = [];
      const count = width < 768 ? 70 : 160;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.2
        });
      }

        const render2D = () => {
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = '#ffffff';

            for (let p of particles) {
              p.x += p.vx;
              p.y += p.vy;

              if (p.x < 0) p.x = width;
              if (p.x > width) p.x = 0;
              if (p.y < 0) p.y = height;
              if (p.y > height) p.y = 0;

            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

        requestAnimationFrame(render2D);
      };

    render2D();
  };

    /* --------------------------------------------------------------------------
       3. CELESTIAL HUD & TELEMETRY UPDATERS
       -------------------------------------------------------------------------- */
    const initHUDTelemetry = () => {
      const coordsEl = document.getElementById('orbitalCoordinates');
      const velocityEl = document.getElementById('velocityTelemetry');
      const clockEl = document.getElementById('hudClock');

      let baseRaH = 19;
      let baseRaM = 50;
      let baseRaS = 47.2;
      let baseDecDeg = 8;
      let baseDecM = 52;
      let baseDecS = 6.4;

        setInterval(() => {
          baseRaS = (baseRaS + 0.1) % 60;
          baseDecS = (baseDecS + 0.05) % 60;

        if (coordsEl) {
          coordsEl.textContent = `RA ${baseRaH}h ${baseRaM}m ${baseRaS.toFixed(1)}s / DEC +0${baseDecDeg}° ${baseDecM}′ ${baseDecS.toFixed(1)}″`;
        }
      }, 1200);

      setInterval(() => {
        const v = (27.58 + (Math.random() * 0.14 - 0.07)).toFixed(2);
        if (velocityEl) {
          velocityEl.textContent = `ORBITAL VELOCITY: ${v} KM/S`;
        }
      }, 2400);

    const updateClock = () => {
      if (!clockEl) return;
      const now = new Date();
      const yr = now.getUTCFullYear();
      const mo = String(now.getUTCMonth() + 1).padStart(2, '0');
      const da = String(now.getUTCDate()).padStart(2, '0');
      const hr = String(now.getUTCHours()).padStart(2, '0');
      const mi = String(now.getUTCMinutes()).padStart(2, '0');
      const se = String(now.getUTCSeconds()).padStart(2, '0');
      clockEl.textContent = `${yr}.${mo}.${da} ${hr}:${mi}:${se} UTC // ORBITAL SYNC ACTIVE`;
    };
    updateClock();
    setInterval(updateClock, 1000);
  };

    /* --------------------------------------------------------------------------
       4. PRIMARY HORIZONTAL NAVIGATION, ORBITAL RAIL & SCROLLSPY
       -------------------------------------------------------------------------- */
    const initNavigationSystem = () => {
      const header = document.getElementById('celestialHeader');
      const mobileToggle = document.getElementById('mobileOrbitalToggle');
      const mobileDrawer = document.getElementById('mobileDrawer');
      const desktopLinks = document.querySelectorAll('.desktop-nav-menu .nav-link');
      const orbitalNodes = document.querySelectorAll('.orbital-node');
      const dockNodes = document.querySelectorAll('.dock-node');

      // Mobile Drawer Toggle
      if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
          const isOpen = mobileDrawer.classList.toggle('open');
          mobileToggle.setAttribute('aria-expanded', String(isOpen));
          mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
        });

          // Close on clicking link
          mobileDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
              mobileDrawer.classList.remove('open');
              mobileToggle.setAttribute('aria-expanded', 'false');
              mobileDrawer.setAttribute('aria-hidden', 'true');
            });
          });

          // Close on outside click
          document.addEventListener('click', (e) => {
            if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target) && mobileDrawer.classList.contains('open')) {
              mobileDrawer.classList.remove('open');
              mobileToggle.setAttribute('aria-expanded', 'false');
              mobileDrawer.setAttribute('aria-hidden', 'true');
            }
          });
        }

        const sectionIds = ['hero', 'about', 'projects', 'experience', 'skills', 'education', 'pursuits', 'contact'];
        const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

          const updateActiveNav = () => {
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

            // Sync Desktop Horizontal Links
            desktopLinks.forEach(link => {
              const target = link.getAttribute('data-section');
              if (target === currentId) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });

      // Sync Desktop Orbital Nodes
      orbitalNodes.forEach(node => {
        const target = node.getAttribute('data-section');
        if (target === currentId) {
          node.classList.add('active');
          node.setAttribute('aria-current', 'true');
        } else {
          node.classList.remove('active');
          node.removeAttribute('aria-current');
        }
      });

        // Sync Mobile Cosmic Dock Nodes
        dockNodes.forEach(node => {
          const target = node.getAttribute('data-section');
          if (target === currentId) {
            node.classList.add('active');
            node.setAttribute('aria-current', 'true');
          } else {
            node.classList.remove('active');
            node.removeAttribute('aria-current');
          }
        });
      };

      window.addEventListener('scroll', updateActiveNav, { passive: true });
      updateActiveNav();

      // Smooth Anchor Scroll Handling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
         5. COMMUNICATIONS UPLINK: COPY EMAIL HANDLER & TOAST
         -------------------------------------------------------------------------- */
      const initCommunicationsUplink = () => {
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
   6. INITIALIZE ALL SYSTEMS
   -------------------------------------------------------------------------- */
initUniverseEngine();
initHUDTelemetry();
initNavigationSystem();
initCommunicationsUplink();
});
