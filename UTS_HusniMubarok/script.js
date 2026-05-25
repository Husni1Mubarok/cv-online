/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {
  const preloader =
    document.querySelector(".preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 2200);
});

/* =========================
   THEME TOGGLE
========================= */

const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {

  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

/* =========================
   HAMBURGER MENU
========================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {

  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

/* CLOSE MENU WHEN CLICK */

document.querySelectorAll(".nav-link").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

/* =========================
   ACTIVE NAV LINK
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =========================
   HEADER SCROLL EFFECT
========================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* =========================
   SCROLL PROGRESS BAR
========================= */

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;

  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / docHeight) * 100;

  progressBar.style.width = `${progress}%`;
});

/* =========================
   SCROLL REVEAL
   — mencakup semua .reveal termasuk
     di dalam .sub-section
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;

    if (revealTop < windowHeight - 80) {
      element.classList.add("active"); // langsung tanpa setTimeout
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================
   SUB-SECTION TITLE REVEAL
   — animasi khusus judul
     EDUCATION / EXPERIENCE / ACHIEVEMENTS
========================= */

const subTitles = document.querySelectorAll(".sub-section > .section-title");

const subTitleObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      subTitleObserver.unobserve(entry.target);
    }
  });

}, { threshold: 0.3 });

subTitles.forEach(title => {

  title.style.opacity = "0";
  title.style.transform = "translateY(30px)";
  title.style.transition = "opacity .7s ease, transform .7s ease";

  subTitleObserver.observe(title);
});

/* =========================
   TYPING ANIMATION
========================= */

const typingText = document.getElementById("typing");

const words = [
  "Web Developer",
  "UI / UX Designer",
  "Information Systems Student"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  const currentWord = words[wordIndex];

  if (!deleting) {

    typingText.textContent =
      currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {

      deleting = true;

      setTimeout(typeEffect, 1400);

      return;
    }

  } else {

    typingText.textContent =
      currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      wordIndex++;

      if (wordIndex >= words.length) {
        wordIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, deleting ? 55 : 110);
}

typeEffect();

/* =========================
   COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".counter");

const runCounter = () => {

  counters.forEach(counter => {

    const target = +counter.dataset.target;

    let current = 0;

    const increment = target / 80;

    const updateCounter = () => {

      current += increment;

      if (current < target) {

        counter.innerText = Math.ceil(current);

        requestAnimationFrame(updateCounter);

      } else {

        counter.innerText = target + "+";
      }
    };

    updateCounter();
  });
};

const counterObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      runCounter();

      counterObserver.disconnect();
    }
  });

}, {
  threshold: 0.5
});

counterObserver.observe(document.querySelector(".hero-stats"));

/* =========================
   CIRCULAR SKILL ANIMATION
========================= */

const CIRCUMFERENCE = 2 * Math.PI * 38;

const svgNS = "http://www.w3.org/2000/svg";

document.querySelectorAll(".skill-svg").forEach(svg => {
  const skillName = svg.closest(".skill-card")
    .querySelector(".skill-name")
    .textContent.trim()
    .replace(/\s/g, "");

  const gradId = "skillGrad" + skillName;

  const d = document.createElementNS(svgNS, "defs");
  d.innerHTML = `
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>`;

  svg.prepend(d);

  const fill = svg.querySelector(".skill-fill");
  fill.style.stroke = `url(#${gradId})`;
});

function animateSkillCards() {
  document.querySelectorAll(".skill-fill").forEach(fill => {
    const card    = fill.closest(".skill-card");
    const percent = parseInt(fill.dataset.percent);
    const label   = card.querySelector(".skill-percent");
    const dash    = (percent / 100) * CIRCUMFERENCE;

    fill.style.strokeDasharray = `${dash} ${CIRCUMFERENCE}`;

    let current = 0;
    const step  = percent / 60;

    const tick = setInterval(() => {
      current += step;
      if (current >= percent) {
        current = percent;
        clearInterval(tick);
      }
      label.textContent = Math.round(current) + "%";
    }, 20);
  });
}

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillCards();
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

skillObserver.observe(document.querySelector(".skills"));

/* =========================
   BUTTON RIPPLE EFFECT
========================= */

const rippleButtons = document.querySelectorAll(".ripple");

rippleButtons.forEach(button => {

  button.addEventListener("click", function (e) {

    const existing = this.querySelector(".ripple-effect");
    if (existing) existing.remove();

    const circle = document.createElement("span");
    const diameter = Math.min(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple-effect");

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});

/* =========================
   IMAGE LAZY FADE
========================= */

const images = document.querySelectorAll("img");

images.forEach(img => {

  if (img.complete) {
    img.classList.add("loaded");
  } else {

    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
  }
});

/* =========================
   PARALLAX EFFECT
========================= */

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;

  const blur1 = document.querySelector(".blur-1");
  const blur2 = document.querySelector(".blur-2");

  blur1.style.transform =
    `translateY(${scrollY * 0.15}px)`;

  blur2.style.transform =
    `translateY(${scrollY * -0.12}px)`;
});

/* =========================
   FLOATING HERO IMAGE
========================= */

const heroImage = document.querySelector(".image-wrapper");

window.addEventListener("mousemove", e => {

  const x = (window.innerWidth / 2 - e.pageX) / 40;
  const y = (window.innerHeight / 2 - e.pageY) / 40;

  heroImage.style.transform =
    `rotateY(${x}deg) rotateX(${-y}deg)`;
});

/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", e => {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 3) {

    alert("Nama minimal 3 karakter.");
    return;
  }

  if (!email.includes("@")) {

    alert("Format email tidak valid.");
    return;
  }

  if (message.length < 10) {

    alert("Pesan terlalu pendek.");
    return;
  }

  alert("Pesan berhasil dikirim ✨");

  contactForm.reset();
});

/* =========================
   SMOOTH SCROLL OFFSET
========================= */

document.querySelectorAll('a[href^="#"]:not([download])').forEach(anchor => {

  anchor.addEventListener("click", function (e) {

    e.preventDefault();

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (!target) return;

    const offset = 80;

    const targetPosition =
      target.offsetTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

/* =========================
   BACK TO TOP BUTTON
========================= */

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {

    backToTop.style.opacity = "1";
    backToTop.style.pointerEvents = "auto";

  } else {

    backToTop.style.opacity = "0";
    backToTop.style.pointerEvents = "none";
  }
});

/* =========================
   CURSOR GLOW EFFECT
========================= */

const cursorGlow = document.createElement("div");

cursorGlow.classList.add("cursor-glow");

document.body.appendChild(cursorGlow);

window.addEventListener("mousemove", e => {

  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

/* =========================
   DYNAMIC YEAR
========================= */

const copyright =
  document.querySelector(".copyright");

const currentYear = new Date().getFullYear();

copyright.innerHTML =
  `© ${currentYear} Husni Mubarok — All Rights Reserved`;

/* =========================
   ACHIEVEMENT CARD HOVER EFFECT
========================= */

const achievementCards =
  document.querySelectorAll(".achievement-card");

achievementCards.forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x =
      e.clientX - rect.left - rect.width / 2;

    const y =
      e.clientY - rect.top - rect.height / 2;

    card.style.transform =
      `
      perspective(1000px)
      rotateX(${(-y / 18)}deg)
      rotateY(${x / 18}deg)
      translateY(-8px)
      `;
  });

  card.addEventListener("mouseleave", () => {

    card.style.transform =
      `
      perspective(1000px)
      rotateX(0)
      rotateY(0)
      translateY(0)
      `;
  });
});

/* =========================
   ACHIEVEMENT COUNT ANIMATION
========================= */

const achievementSection =
  document.querySelector(".achievements");

const achievementNumbers =
  document.querySelectorAll(".achievement-year");

const achievementObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        achievementNumbers.forEach(year => {

          year.style.opacity = "0";

          setTimeout(() => {

            year.style.transition =
              "all .6s ease";

            year.style.opacity = "1";

            year.style.transform =
              "translateX(0)";
          }, 200);
        });

        achievementObserver.disconnect();
      }
    });

  }, {
    threshold: 0.3
  });

if (achievementSection) {
  achievementObserver.observe(achievementSection);
}

/* =========================
   ACHIEVEMENT GLOW EFFECT
========================= */

achievementCards.forEach(card => {

  card.addEventListener("mouseenter", () => {

    card.style.boxShadow =
      `
      0 0 25px rgba(139,92,246,0.35),
      0 0 50px rgba(139,92,246,0.15)
      `;
  });

  card.addEventListener("mouseleave", () => {

    card.style.boxShadow = "";
  });
});

/* =========================
   FLOATING ACHIEVEMENT ICON
========================= */

const achievementIcons =
  document.querySelectorAll(".achievement-icon");

achievementIcons.forEach((icon, index) => {

  setInterval(() => {

    icon.style.transform =
      `translateY(${Math.sin(Date.now() / 600 + index) * 6}px)`;

  }, 16);
});

/* =========================
   ACHIEVEMENT CARD STAGGER
========================= */

const achievementReveal =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        achievementCards.forEach((card, index) => {

          setTimeout(() => {

            card.classList.add("show-achievement");

          }, index * 120);
        });
      }
    });

  }, {
    threshold: 0.2
  });

if (achievementSection) {
  achievementReveal.observe(achievementSection);
}

/* =========================
   PERFORMANCE OPTIMIZATION
========================= */

window.addEventListener(
  "scroll",
  () => {},
  { passive: true }
);

/* =========================
   CURSOR TRAIL EFFECT
========================= */

const trailColors = [
  "#6366f1", "#8b5cf6", "#06b6d4",
  "#a78bfa", "#38bdf8", "#c084fc"
];

window.addEventListener("mousemove", (e) => {

  const particle = document.createElement("div");

  const size = Math.random() * 10 + 4;
  const color = trailColors[Math.floor(Math.random() * trailColors.length)];

  particle.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: ${color};
    pointer-events: none;
    z-index: 999999;
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.85;
    transition: transform 0.5s ease, opacity 0.5s ease;
    box-shadow: 0 0 ${size * 2}px ${color};
  `;

  document.body.appendChild(particle);

  requestAnimationFrame(() => {
    particle.style.transform =
      `translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) scale(0)`;
    particle.style.opacity = "0";
  });

  setTimeout(() => {
    particle.remove();
  }, 500);
});