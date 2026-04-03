const fireworksCanvas = document.getElementById('fireworks');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const card = document.getElementById('card');
const pages = document.querySelectorAll('.page');
const cover = document.querySelector('.cover');
const music = document.getElementById('bgMusic');
const floatingContainer = document.getElementById('floatingPhotos');
const bgContainer = document.getElementById('backgroundPhotos');
const finalPhoto = document.getElementById('finalPhoto');

let currentPage = -1;
let isAnimating = false;
let autoInterval = null;

// === Феєрверки (без змін) ===
function createFireworks() {
  const ctx = fireworksCanvas.getContext('2d');
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;

  class Firework {
    constructor() {
      this.x = Math.random() * fireworksCanvas.width;
      this.y = fireworksCanvas.height;
      this.targetY = Math.random() * (fireworksCanvas.height * 0.4);
      this.speed = 8 + Math.random() * 6;
      this.hue = Math.random() * 360;
      this.exploded = false;
      this.particles = [];
    }

    update() {
      if (!this.exploded) {
        this.y -= this.speed;
        if (this.y <= this.targetY) this.explode();
      } else {
        this.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08;
          p.life -= 1;
        });
        this.particles = this.particles.filter(p => p.life > 0);
      }
    }

    explode() {
      this.exploded = true;
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = 2 + Math.random() * 7;
        this.particles.push({
          x: this.x, y: this.y,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel - 3,
          life: 60 + Math.random() * 40,
          hue: this.hue + Math.random() * 40 - 20,
          size: 3 + Math.random() * 4
        });
      }
    }

    draw() {
      if (!this.exploded) {
        ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.globalAlpha = this.particles[0] ? this.particles[0].life / 80 : 1;
        this.particles.forEach(p => {
          ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        ctx.globalAlpha = 1;
      }
    }
  }

  let fireworks = [];
  setInterval(() => {
    if (Math.random() < 0.35) fireworks.push(new Firework());
    ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    fireworks = fireworks.filter(fw => {
      fw.update();
      fw.draw();
      return !fw.exploded || fw.particles.length > 0;
    });
  }, 30);
}

// === Створення 25 великих літаючих фоток (повільніше) ===
function createFloatingPhotos() {
  const photoPaths = [
    "photos/img1.jpg",   // 1
    "photos/img2.jpg",   // 2
    "photos/img3.jpg",   // 3
    "photos/img4.jpg",   // 4
    "photos/img5.jpg",   // 5
    "photos/img6.jpg",   // 6
    "photos/img7.jpg",   // 7
    "photos/img8.jpg",   // 8
    "photos/img9.jpg",   // 9
    "photos/img10.png",  // 10
    "photos/img11.png",  // 11
    "photos/img12.png",  // 12
    "photos/img13.png",  // 13
    "photos/img14.png",  // 14
    "photos/img15.png",  // 15
    "photos/img16.png",  // 16
    "photos/img17.png",  // 17
    "photos/img18.png",  // 18
    "photos/img19.png",  // 19
    "photos/img20.png",  // 20
    "photos/img21.jpg",  // 21
    "photos/img22.jpg",  // 22
    "photos/img23.jpg",  // 23
    "photos/img24.jpg",  // 24
    "photos/img25.jpg"   // 25
  ];

  photoPaths.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'floating-photo';
    
    const size = 140 + Math.random() * 160;
    img.style.width = size + 'px';
    img.style.height = 'auto';
    
    img.style.left = Math.random() * 100 + 'vw';
    img.style.top = Math.random() * 100 + 'vh';
    img.style.opacity = 0.55 + Math.random() * 0.4;
    
    const startRot = Math.random() * 50 - 25;
    img.style.transform = `rotate(${startRot}deg)`;

    floatingContainer.appendChild(img);

    // Повільна анімація
    let speedX = -0.6 + Math.random() * 1.3;
    let speedY = -0.8 + Math.random() * 1.6;
    let rotSpeed = -0.8 + Math.random() * 1.6;

    function move() {
      let x = parseFloat(img.style.left) || 0;
      let y = parseFloat(img.style.top) || 0;
      let rot = parseFloat(img.style.transform.match(/-?\d+\.?\d*/)?.[0]) || startRot;

      x += speedX;
      y += speedY;
      rot += rotSpeed;

      if (x < -25) x = 105;
      if (x > 105) x = -20;
      if (y < -25) y = 105;
      if (y > 105) y = -20;

      img.style.left = x + 'vw';
      img.style.top = y + 'vh';
      img.style.transform = `rotate(${rot}deg)`;

      requestAnimationFrame(move);
    }

    setTimeout(move, Math.random() * 800);
  });
}

// === Дрібні фонові фотки (теж повільніше) ===
// === Дрібні фонові фотки (виправлено — тепер різні фотки) ===
function createBackgroundPhotos(count = 50) {
  const backgroundPhotos = [
    "back/img1.jpg",
    "back/img2.jpg",
    "back/img3.jpg",
    "back/img4.jpg",
    "back/img5.jpg",
    "back/img6.jpg",
    "back/img7.jpg",
    "back/img8.jpg",
    "back/img9.jpg",
    "back/img10.jpg"
    // Якщо хочеш додати більше — просто продовжуй список
  ];

  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    
    // Випадково вибираємо одну з фоток
    const randomIndex = Math.floor(Math.random() * backgroundPhotos.length);
    img.src = backgroundPhotos[randomIndex];
    
    img.className = 'background-photo';
    
    img.style.width = (25 + Math.random() * 60) + 'px';
    img.style.left = Math.random() * 100 + 'vw';
    img.style.bottom = '-' + (80 + Math.random() * 150) + 'px';
    img.style.opacity = 0.12 + Math.random() * 0.23;

    bgContainer.appendChild(img);

    // Повільна діагональна анімація
    const duration = 26000 + Math.random() * 34000;   // від 26 до 60 секунд

    img.animate([
      { transform: 'translate(0px, 0px) rotate(0deg)' },
      { transform: `translate(120vw, -140vh) rotate(${Math.random() * 600 - 300}deg)` }
    ], {
      duration: duration,
      iterations: Infinity,
      easing: 'linear',
      delay: Math.random() * -duration * 0.85
    });
  }
}

// ===== Відкриття обкладинки та перегортання (без змін) =====
function openCover() {
  return new Promise(resolve => {
    cover.style.transition = "transform 1.35s cubic-bezier(0.65, 0.05, 0.3, 1)";
    cover.style.transform = "rotateY(-180deg)";
    setTimeout(() => {
      cover.style.zIndex = "10";
      resolve();
    }, 1350);
  });
}

function turnPage() {
  if (isAnimating || currentPage >= pages.length - 2) return;
  isAnimating = true;
  currentPage++;

  const pageToFlip = pages[currentPage + 1];
  pageToFlip.style.transition = "transform 1.15s cubic-bezier(0.6, 0.05, 0.3, 1)";
  pageToFlip.style.transform = "rotateY(-180deg)";

  setTimeout(() => {
    pageToFlip.style.zIndex = 60 + currentPage;
    isAnimating = false;
  }, 1180);
}

// ===== START =====
startBtn.addEventListener("click", async () => {
  startScreen.style.opacity = "0";
  setTimeout(() => startScreen.style.display = "none", 800);

  music.volume = 0.65;
  music.play().catch(() => {});

  createFireworks();
  createFloatingPhotos();      // нові великі фотки
  createBackgroundPhotos(50);  // нові дрібні фотки

  await openCover();

  autoInterval = setInterval(() => {
    if (currentPage >= pages.length - 2) {
      clearInterval(autoInterval);
      setTimeout(() => {
        finalPhoto.classList.add('show');
      }, 800);
      return;
    }
    turnPage();
  }, 5000);
});

// Resize
window.addEventListener('resize', () => {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
});