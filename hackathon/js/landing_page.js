$(document).ready(function () {

  /*=============== SCROLL REVEAL ANIMATION ===============*/

  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 400,
  });

  sr.reveal(`.our-future h2`, { interval: 100 });
  sr.reveal(`.our-future-common-container`, { interval: 100 });
  sr.reveal(`.purpose-content`, { origin: "left", interval: 100 });
  sr.reveal(`.purpose-img`, { origin: "right", interval: 100 });
  sr.reveal(`.footer-top`, { interval: 100 });
  sr.reveal(`.footer-menu-menu li`, { interval: 100 });
  sr.reveal(`.social-media-links`, { origin: "left", interval: 100 });
  sr.reveal(`.few-links`, { origin: "right", interval: 100 });
  sr.reveal(`.common-container`, { interval: 100 });
  sr.reveal(`.footer-copyright`, { origin: "left", interval: 100 });
  sr.reveal(`.footer-bottom-links`, { origin: "right", interval: 100 });

  /*=============== Carousel ===============*/

  const carouselFrames = Array.from(
    document.querySelectorAll(".carousel-frame")
  );

  function makeCarousel(frame) {
    const carouselSlide = frame.querySelector(".carousel-slide");
    const carouselImages = getImagesPlusClones();
    const prevBtn = frame.querySelector(".carousel-prev");
    const nextBtn = frame.querySelector(".carousel-next");
    const navDots = Array.from(frame.querySelectorAll(".carousel-dots li"));
    let imageCounter = 1;
    function getImagesPlusClones() {
      let images = frame.querySelectorAll(".carousel-slide img");
      const firstClone = images[0].cloneNode();
      const lastClone = images[images.length - 1].cloneNode();
      firstClone.className = "first-clone";
      lastClone.className = "last-clone";
      // we need clones to make an infinite loop effect
      carouselSlide.append(firstClone);
      carouselSlide.prepend(lastClone);
      // must reassign images to include the newly cloned images
      images = frame.querySelectorAll(".carousel-slide img");
      return images;
    }

    function initializeNavDots() {
      if (navDots.length) navDots[0].classList.add("active-dot");
    }

    function initializeCarousel() {
      carouselSlide.style.transform = "translateX(-100%)";
    }
    function slideForward() {
      // first limit counter to prevent fast-change bugs
      // if (imageCounter >= carouselImages.length - 1) return;
      carouselSlide.style.transition = "transform 400ms";
      imageCounter++;
      carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
    }

    function slideBack() {
      // first limit counter to prevent fast-change bugs
      // if (imageCounter <= 0) return;
      carouselSlide.style.transition = "transform 400ms";
      imageCounter--;
      carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
    }

    function makeLoop() {
      // instantly move from clones to originals to produce 'infinite-loop' effect

      if (carouselImages[imageCounter].classList.contains("last-clone")) {
        console.log("last-clone");
        carouselSlide.style.transition = "none";
        imageCounter = carouselImages.length - 2;
        carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
      }

      if (carouselImages[imageCounter].classList.contains("first-clone")) {
        console.log("first-clone");

        carouselSlide.style.transition = "none";
        imageCounter = carouselImages.length - imageCounter;
        carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
      }
    }

    function goToImage(e) {
      carouselSlide.style.transition = "transform 400ms";
      imageCounter = 1 + navDots.indexOf(e.target);
      carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
    }

    function highlightCurrentDot() {
      navDots.forEach((dot) => {
        if (navDots.indexOf(dot) === imageCounter - 1) {
          dot.classList.add("active-dot");
        } else {
          dot.classList.remove("active-dot");
        }
      });
    }

    function addBtnListeners() {
      nextBtn.addEventListener("click", slideForward);
      prevBtn.addEventListener("click", slideBack);
    }

    function addNavDotListeners() {
      navDots.forEach((dot) => {
        dot.addEventListener("click", goToImage);
      });
    }

    function addTransitionListener() {
      carouselSlide.addEventListener("transitionend", () => {
        makeLoop();
        highlightCurrentDot();
      });
    }

    function autoAdvance() {
      let play = setInterval(slideForward, 5000);

      frame.addEventListener("mouseover", () => {
        clearInterval(play); // pause when mouse enters carousel
      });

      frame.addEventListener("mouseout", () => {
        play = setInterval(slideForward, 5000); // resume when mouse leaves carousel
      });
    }

    function buildCarousel() {
      initializeCarousel();
      initializeNavDots();
      addNavDotListeners();
      addBtnListeners();
      addTransitionListener();
      autoAdvance();
    }

    buildCarousel();
  }

  carouselFrames.forEach((frame) => makeCarousel(frame));
});
