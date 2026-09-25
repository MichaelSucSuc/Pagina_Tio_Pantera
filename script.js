/**
 * TÍO PANTHERA AQP - NIGHT CLUB CYBERPUNK
 * Motor de interacción: Preloader, Canvas de partículas, Glitch neón, Cursor láser y Micro-pulsos
 */
document.addEventListener('DOMContentLoaded', () => {
  
  /* ------------------------------------------------------------------------
     1. CONTROL DEL PRELOADER (1.5 Segundos)
     ------------------------------------------------------------------------ */
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('loaded');
    }
  }, 1500);

  /* ------------------------------------------------------------------------
     2. MOTOR DE PARTÍCULAS NEÓN (CANVAS 2D)
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('particlesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Partículas adaptativas: 60 en PC/Desktop, 30 en pantallas móviles
    const isMobile = window.innerWidth < 600;
    const particleCount = isMobile ? 30 : 60;
    const particles = [];

    const neonColors = [
      '#ff2a85', // Hot Pink Pantera
      '#ff007f', // Fuchsia neón
      '#9d25f4', // Púrpura ultravioleta
      '#f1f5f9', // Destellos plata platino
      '#00e5ff'  // Acentos cyan cyberpunk
    ];

    class NeonParticle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 15;
        this.radius = Math.random() * 2.5 + 1.2;
        this.color = neonColors[Math.floor(Math.random() * neonColors.length)];
        this.speedY = Math.random() * 0.9 + 0.35;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.alpha = Math.random() * 0.6 + 0.3;
        this.fadeSpeed = Math.random() * 0.004 + 0.002;
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.pulse) * 0.3;
        this.pulse += 0.03;
        this.alpha -= this.fadeSpeed;

        if (this.alpha <= 0 || this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.shadowBlur = this.radius * 5;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new NeonParticle());
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(renderParticles);
    }
    renderParticles();

    // Redimensionado dinámico del canvas
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  /* ------------------------------------------------------------------------
     3. EFECTO GLITCH NEÓN REGULAR EN EL TÍTULO
     (Se activa cada ~5 segundos y dura 320ms con aberración cromática RGB)
     ------------------------------------------------------------------------ */
  const glitchTitle = document.getElementById('glitchTitle');
  function triggerGlitch() {
    if (glitchTitle) {
      glitchTitle.classList.add('glitching');
      setTimeout(() => {
        glitchTitle.classList.remove('glitching');
      }, 320);
    }
  }

  // Intervalo recurrente de glitch cada 5000ms
  setInterval(triggerGlitch, 5000);
  // Trigger inicial tras finalizar el preloader
  setTimeout(triggerGlitch, 2200);

  /* ------------------------------------------------------------------------
     4. CURSOR LÁSER PERSONALIZADO (DESKTOP)
     ------------------------------------------------------------------------ */
  const customCursor = document.getElementById('customCursor');
  if (customCursor && window.matchMedia('(pointer: fine)').matches) {
    // Seguimiento del mouse
    window.addEventListener('mousemove', (e) => {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
      if (!customCursor.classList.contains('visible')) {
        customCursor.classList.add('visible');
      }
    });

    // Ocultar al salir de la ventana del navegador
    document.addEventListener('mouseleave', () => {
      customCursor.classList.remove('visible');
    });

    // Mostrar al reingresar a la ventana
    document.addEventListener('mouseenter', () => {
      customCursor.classList.add('visible');
    });

    // Ocultar si la ventana pierde el foco
    window.addEventListener('blur', () => {
      customCursor.classList.remove('visible');
    });

    // Efecto expansivo en hover sobre enlaces y botones
    const interactiveElements = document.querySelectorAll('a, button, .social-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('active'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('active'));
    });
  }

  /* ------------------------------------------------------------------------
     5. MICRO-PULSO AL HACER CLICK EN BOTONES
     ------------------------------------------------------------------------ */
  const interactiveBtns = document.querySelectorAll('.btn-telegram, .social-btn');
  interactiveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.style.transform = 'scale(0.94)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 180);
    });
  });

});
