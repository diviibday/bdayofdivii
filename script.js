// AUTHENTICATION
const authLayer = document.getElementById('authLayer');
const birthdayContent = document.getElementById('birthdayContent');
const authForm = document.getElementById('authForm');
const nameInput = document.getElementById('nameInput');
const authMessage = document.getElementById('authMessage');
const continueBtn = document.getElementById('continueBtn');

const correctName = "Devyani Singh";

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const enteredName = nameInput.value.trim();
  if (enteredName === correctName) {
    authMessage.style.color = '#4caf50';
    authMessage.textContent = "okay I guess you are Devyani";
    continueBtn.classList.remove('hidden');
  } else {
    authMessage.style.color = '#d93170';
    authMessage.textContent = "I don't think your partner loves you enough to build you a website";
    continueBtn.classList.add('hidden');
  }
});

continueBtn.addEventListener('click', () => {
  authLayer.style.display = 'none';
  birthdayContent.classList.remove('hidden');
  birthdayContent.setAttribute('aria-hidden', 'false');
  initBirthdaySite();
});

// BIRTHDAY PAGE LOGIC
const loveMessages = [
  "I love you more than all the stars in the sky! 🌟",
  "You are my forever and always. ❤️",
  "My heart beats only for you. 💓",
  "You make every day brighter just by being you! ☀️",
  "Our love story is my favorite fairy tale. 📖💕",
  "You are my sunshine on rainy days. 🌞🌧️",
  "My love for you grows stronger every day! 🌹",
  "You + Me = Forever 💞",
  "No distance can dim the spark between us! 🔥",
  "You are the warmest hug I ever had. 🤗",
];

function initBirthdaySite() {
  const typewriter = document.getElementById('typewriter');
  const message = "Happy Birthday, My Love!";
  let index = 0;
  typewriter.textContent = "";

  function type() {
    if (index < message.length) {
      typewriter.textContent += message.charAt(index);
      index++;
      setTimeout(type, 120);
    } else {
      typewriter.style.borderRight = "none";
    }
  }
  type();

  // Buttons
  const loveMeterBtn = document.getElementById('loveMeterBtn');
  const loveMeterMessage = document.getElementById('loveMeterMessage');
  const messageBtn = document.getElementById('messageBtn');
  const longMessageModal = document.getElementById('longMessageModal');
  const closeMessageBtn = document.getElementById('closeMessageBtn');
  const sendLoveBtn = document.getElementById('sendLoveBtn');

  // love meter random message
  loveMeterBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    loveMeterMessage.textContent = loveMessages[randomIndex];
  });

  // Show long message modal
  messageBtn.addEventListener('click', () => {
    longMessageModal.classList.remove('hidden');
    longMessageModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = "hidden";
  });

  // Close modal
  closeMessageBtn.addEventListener('click', () => {
    longMessageModal.classList.add('hidden');
    longMessageModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = "";
  });

  // Send love floating hearts animation
  sendLoveBtn.addEventListener('click', () => {
    for (let i = 0; i < 25; i++) {
      createFloatingHeart();
    }
  });

  // Carousel drag/swipe support
  const carousel = document.querySelector('.carousel');
  const carouselInner = document.getElementById('carouselInner');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let scrollPos = 0;
  const scrollAmount = 190;

  prevBtn.addEventListener('click', () => {
    scrollPos = Math.max(scrollPos - scrollAmount, 0);
    carouselInner.style.transform = `translateX(-${scrollPos}px)`;
  });
  nextBtn.addEventListener('click', () => {
    let maxScroll = carouselInner.scrollWidth - carouselInner.clientWidth;
    scrollPos = Math.min(scrollPos + scrollAmount, maxScroll);
    carouselInner.style.transform = `translateX(-${scrollPos}px)`;
  });

  // Enable draggable carousel
  let isDown = false, startX, scrollLeft;
  carousel.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });
  carousel.addEventListener('mouseup', () => {
    isDown = false;
  });
  carousel.addEventListener('mousemove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });
  carousel.addEventListener('touchstart', e => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  }, {passive:true});
  carousel.addEventListener('touchend', () => { isDown = false; });
  carousel.addEventListener('touchmove', e => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  }, {passive:true});

  // Balloon color randomizer
  const balloonColors = ['color1','color2','color3','color4','color5','color6'];
  document.querySelectorAll('.balloon').forEach(b => {
    b.classList.add(balloonColors[Math.floor(Math.random() * balloonColors.length)]);
  });

  // Balloon hearts floating randomly
  setInterval(createFloatingHandDrawnHeart, 1600);

  // Thought bubbles periodically
  setInterval(showThoughtBubble, 6000);

  // Confetti init
  initCanvas();
  runConfetti();
}

// Floating 'Send Love' hearts animation
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.setProperty('--random-x', `${(Math.random() - 0.5) * 100}vw`);
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 3500);
}

// Floating hand-drawn hearts (background)
function createFloatingHandDrawnHeart() {
  const heart = document.createElement('div');
  heart.className = 'hand-drawn-heart';
  heart.style.left = `${Math.random() * 95}vw`;
  heart.style.top = `${Math.random() * 90}vh`;
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// Thought bubbles container messages
const thoughtBubblesContainer = document.getElementById('thoughtBubblesContainer');
const thoughtMessages = [
  "You light up my world like nobody else.",
  "Forever yours, on this day and always.",
  "With you, every moment is magical.",
  "To many more birthdays and smiles ahead!",
  "You make my heart flutter every day.",
];

function showThoughtBubble() {
  const bubble = document.createElement('div');
  bubble.className = 'thought-bubble';
  bubble.textContent = thoughtMessages[Math.floor(Math.random() * thoughtMessages.length)];
  thoughtBubblesContainer.appendChild(bubble);

  setTimeout(() => {
    bubble.style.opacity = 0;
    setTimeout(() => bubble.remove(), 2000);
  }, 4500);
}

// Confetti canvas initialization
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
let W, H;
let confettiElements = [];

function initCanvas() {
  W = window.innerWidth;
  H = window.innerHeight;
  confettiCanvas.width = W;
  confettiCanvas.height = H;
  confettiElements = [];

  for(let i=0; i<150; i++) {
    confettiElements.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: randomRange(5,15),
      d: (Math.random() * 150) + 10,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      tilt: Math.floor(Math.random()*10) - 10,
      tiltAngle: 0,
      tiltAngleIncremental: (Math.random()*0.07) + 0.05
    });
  }
}

const confettiColors = ['#ff4e83', '#ff82a3', '#ffb5c1', '#d93170', '#f5a9c1', '#fce6e8'];

function drawConfetti() {
  ctx.clearRect(0, 0, W, H);
  confettiElements.forEach(c => {
    ctx.beginPath();
    ctx.lineWidth = c.r / 2;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + (c.r / 4), c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + (c.r / 4));
    ctx.stroke();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiElements.forEach(c => {
    c.tiltAngle += c.tiltAngleIncremental;
    c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
    c.x += Math.sin(c.d);
    c.tilt = (Math.sin(c.tiltAngle - (c.d / 3))) * 15;

    if(c.y > H) {
      c.x = Math.random() * W;
      c.y = -20;
    }
  });
}

function randomRange(min,max) {
  return Math.random() * (max-min) + min;
}

function runConfetti() {
  drawConfetti();
  requestAnimationFrame(runConfetti);
}

window.addEventListener('resize', () => {
  if (!birthdayContent.classList.contains('hidden')) {
    initCanvas();
  }
});
