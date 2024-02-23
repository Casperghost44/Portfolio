"use strict";
const lastSpanEl = document.querySelector(".front-end-txt");
const dotEls = document.querySelectorAll(".dot");
const btnNextEl = document.querySelector(".arrow-left");
const btnPrevEl = document.querySelector(".arrow-right");
const projectEl = document.querySelectorAll(".img-box--project");
const imgList = document.querySelector(".image-list");
const modalWindow = document.querySelector(".modal-window");
const projectContainerEl = document.querySelector(".projects-container");
const btnCloseModal = document.querySelector(".close-icon");
const tabsContainer = document.querySelector(".tab-container");
const tabs = document.querySelectorAll(".exp-tab");
const expContent = document.querySelectorAll(".exp-actual-content");
const age = document.querySelector(".text-overview span");
const sectionHeroEL = document.querySelector("header");
const navBar = document.querySelector(".nav-bar");
const headerLinks = document.querySelector(".nav-list");
const footerNavList = document.querySelector(".footer-nav-list");
const sectionsEls = document.querySelectorAll("section");
const btnOpenNavEL = document.querySelector(
  ".btn-mobile-nav.btn-mobile-nav-open"
);
const btnCloseNavEL = document.querySelector(
  ".btn-mobile-nav.btn-mobile-nav-close"
);
const navContainer = document.querySelector(".nav-bar .container");

const dotsContainer = document.querySelector(".list-dots");
// let currentPhotoEl = document.querySelector(".img-overview");
// let currentPhotoIndex = 0;

lastSpanEl.textContent = "<h1>Front-end Developer</h1>";

let currentIndex = 0;
let intervalId;
const images = document.querySelectorAll(".img-overview");

function showImage(index) {
  images.forEach((image, i) => {
    if (i === index) {
      image.classList.add("active");
      dotEls[i].classList.add("dot-active");
    } else {
      image.classList.remove("active");
      dotEls[i].classList.remove("dot-active");
    }
  });
}

showImage(currentIndex);

function changeImage(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  } else if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  showImage(currentIndex);
}

btnNextEl.addEventListener(
  "click",
  function () {
    changeImage(1);
    resetAutoChange();
  },
  false
);

btnPrevEl.addEventListener(
  "click",
  function () {
    changeImage(-1);
    resetAutoChange();
  },
  false
);

btnOpenNavEL.addEventListener("click", function () {
  navContainer.classList.add("nav-open");
});
btnCloseNavEL.addEventListener("click", function () {
  navContainer.classList.remove("nav-open");
});

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".exp-tab");
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("exp-tab--active"));
  clicked.classList.add("exp-tab--active");

  // Activate content
  expContent.forEach((t) => t.classList.remove("exp-container--active"));
  document
    .querySelector(`.${clicked.dataset.tab}-container`)
    .classList.add("exp-container--active");
});

const startAutoChange = function () {
  intervalId = setInterval(() => {
    changeImage(1); // Change to the next image
  }, 5000); // Set the interval to 5000 milliseconds (5 seconds)
};

const handelLinkCklick = function (e) {
  e.preventDefault();

  if (
    e.target.classList.contains("nav-link") ||
    e.target.classList.contains("footer-link")
  ) {
    const link = e.target;
    const scrollTo = document.querySelector(`${link.getAttribute("href")}`);
    scrollTo.scrollIntoView({ behavior: "smooth" });
    navContainer.classList.remove("nav-open");
  }
};

function resetAutoChange() {
  clearInterval(intervalId); // Clear the existing interval
  startAutoChange(); // Start a new interval
}

startAutoChange();

age.textContent = (
  (new Date() - new Date("November 25, 2003 00:00:00")) /
  31556952000
).toFixed(0);
const navHeight = navBar.getBoundingClientRect().height;

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      navBar.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      navBar.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);
obs.observe(sectionHeroEL);
headerLinks.addEventListener("click", handelLinkCklick);
footerNavList.addEventListener("click", handelLinkCklick);

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove("section__hidden");
  observer.unobserve(entry.target);
};

const revealOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);

sectionsEls.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section__hidden");
});

dotsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("dot")) return;
  images.forEach((img) => img.classList.remove("active"));
  images[Number(e.target.dataset.slide)].classList.add("active");
  dotEls.forEach((dot) => dot.classList.remove("dot-active"));
  e.target.classList.add("dot-active");
  currentIndex = Number(e.target.dataset.slide);
  resetAutoChange();
});
