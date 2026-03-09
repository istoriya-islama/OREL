/* ══════════════════════════════════════════
   CUSTOM VIDEO PLAYER — JS
   Подключи: <script src="video-player.js"></script>
   (после jQuery и index.js, в конце <body>)
══════════════════════════════════════════ */

(function () {
  // ── Анимация появления при скролле ────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".video-wrap").forEach((w) => observer.observe(w));

  // ── Форматирование времени ─────────────────────────────
  function fmt(s) {
    if (!isFinite(s)) return "0:00";
    return Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  }

  // ── Инициализация каждого плеера ──────────────────────
  document.querySelectorAll(".video-wrap").forEach((wrap) => {
    const video   = wrap.querySelector("video");
    const playBtn = wrap.querySelector(".v-play");
    const muteBtn = wrap.querySelector(".v-mute");
    const volR    = wrap.querySelector(".v-vol");
    const prog    = wrap.querySelector(".v-progress");
    const fill    = wrap.querySelector(".v-fill");
    const timeEl  = wrap.querySelector(".v-time");
    const fsBtn   = wrap.querySelector(".v-fs");
    const overlay = wrap.querySelector(".v-overlay-btn");

    const iPlay  = playBtn.querySelector(".icon-play");
    const iPause = playBtn.querySelector(".icon-pause");
    const iVol   = muteBtn.querySelector(".icon-vol");
    const iMuted = muteBtn.querySelector(".icon-muted");
    const iFs    = fsBtn.querySelector(".icon-fs");
    const iFsX   = fsBtn.querySelector(".icon-fs-exit");

    // Play / Pause
    function togglePlay() {
      video.paused ? video.play() : video.pause();
    }
    playBtn.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);

    video.addEventListener("play", () => {
      iPlay.style.display  = "none";
      iPause.style.display = "block";
      overlay.classList.remove("show");
    });
    video.addEventListener("pause", () => {
      iPlay.style.display  = "block";
      iPause.style.display = "none";
      overlay.classList.add("show");
    });
    video.addEventListener("ended", () => {
      iPlay.style.display  = "block";
      iPause.style.display = "none";
      overlay.classList.add("show");
    });

    // Прогресс-бар
    video.addEventListener("timeupdate", () => {
      if (!video.duration) return;
      fill.style.width = (video.currentTime / video.duration) * 100 + "%";
      timeEl.textContent = fmt(video.currentTime) + " / " + fmt(video.duration);
    });
    video.addEventListener("loadedmetadata", () => {
      timeEl.textContent = "0:00 / " + fmt(video.duration);
    });
    prog.addEventListener("click", (e) => {
      const r = prog.getBoundingClientRect();
      video.currentTime = ((e.clientX - r.left) / r.width) * video.duration;
    });

    // Громкость / Mute
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      iVol.style.display   = video.muted ? "none"  : "block";
      iMuted.style.display = video.muted ? "block" : "none";
    });
    volR.addEventListener("input", () => {
      video.volume = volR.value;
      video.muted  = +volR.value === 0;
      iVol.style.display   = video.muted ? "none"  : "block";
      iMuted.style.display = video.muted ? "block" : "none";
    });

    // Fullscreen — вход И выход
    fsBtn.addEventListener("click", () => {
      const isFs = document.fullscreenElement || document.webkitFullscreenElement;
      if (!isFs) {
        (wrap.requestFullscreen || wrap.webkitRequestFullscreen).call(wrap);
      } else {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      }
    });

    // Иконка меняется при смене состояния fullscreen
    function onFsChange() {
      const isFs =
        document.fullscreenElement === wrap ||
        document.webkitFullscreenElement === wrap;
      iFs.style.display  = isFs ? "none"  : "block";
      iFsX.style.display = isFs ? "block" : "none";
    }
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
  });
})();