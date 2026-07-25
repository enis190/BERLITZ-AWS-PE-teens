(function () {
  function initCarousel() {
    const carousel = document.getElementById("ytCarousel");
    if (!carousel) return;

    const track = carousel.querySelector(".yt-track");
    const slides = Array.from(carousel.querySelectorAll(".yt-slide"));
    const btnPrev = carousel.querySelector(".yt-prev");
    const btnNext = carousel.querySelector(".yt-next");

    let index = 0;
    const intervalMs = 6000;
    let timer = null;

    function stopAllVideos() {
      slides.forEach(slide => {
        const iframe = slide.querySelector("iframe");
        if (iframe) iframe.remove();

        const poster = slide.querySelector(".yt-poster");
        if (poster) poster.style.display = "";

        // 🔥 NUEVO: al parar, quita la clase playing
        slide.classList.remove("is-playing");
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;

      // corta audio siempre al cambiar
      stopAllVideos();

      slides.forEach(s => s.classList.remove("is-active"));
      slides[index].classList.add("is-active");

      track.style.transform = `translateX(-${index * 100}%)`;
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(next, intervalMs);
    }

    function stopAuto() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    // Poster -> iframe (solo se crea cuando el usuario da play)
    slides.forEach(slide => {
      const posterBtn = slide.querySelector(".yt-poster");
      if (!posterBtn) return;

      posterBtn.addEventListener("click", () => {
        stopAllVideos();
        stopAuto();

        const videoId = slide.getAttribute("data-video-id");
        posterBtn.style.display = "none";

        // 🔥 NUEVO: al dar play, agrega clase al slide
        slide.classList.add("is-playing");

        const iframe = document.createElement("iframe");
        iframe.className = "yt-iframe";
        iframe.allowFullscreen = true;
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&mute=0`;

        slide.appendChild(iframe);
      });
    });

    // Flechas
    if (btnNext) btnNext.addEventListener("click", () => { next(); startAuto(); });
    if (btnPrev) btnPrev.addEventListener("click", () => { prev(); startAuto(); });

    // Init
    goTo(0);
    //startAuto();
  }

  document.addEventListener("DOMContentLoaded", initCarousel);
})();




(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function initSabiasQueCarousel() {
    const el = document.getElementById("sabiasQueCarousel");
    if (!el) return;

    // Si no está bootstrap, no hay carrusel (queda estático)
    if (!window.bootstrap || !window.bootstrap.Carousel) return;

    // Inicializa sin autoplay
    const instance = window.bootstrap.Carousel.getOrCreateInstance(el, {
      interval: false,
      ride: false,
      touch: true,
      wrap: true,
      pause: true
    });

    // fuerza al primero (opcional)
    instance.to(0);
  }

  ready(initSabiasQueCarousel);
})();


