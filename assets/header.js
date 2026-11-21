// Sticky header behaviour: collapses the name to initials on scroll, and drives the mobile menu.
(function () {
  var header = document.querySelector("header.site");
  if (!header) return;

  // Two thresholds (hysteresis) so the header doesn't flicker back and forth near one scroll position.
  function updateScroll() {
    var y = window.scrollY;
    if (y > 48) {
      header.classList.add("scrolled");
    } else if (y < 8) {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  // Measure the real width of the collapsing name parts so the animation matches the font in use.
  var rests = header.querySelectorAll(".logo .rest");
  function measure() {
    rests.forEach(function (el) {
      el.style.setProperty("--w", el.scrollWidth + "px");
    });
  }
  measure();
  window.addEventListener("load", measure);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measure);
  }

  var toggle = header.querySelector(".menu-toggle");
  var nav = header.querySelector("nav.main");
  if (!toggle || !nav) return;

  function setOpen(open) {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("menu-open"));
  });

  // Close the menu after choosing a link, on Escape, or when leaving the mobile layout.
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 640) setOpen(false);
  });
})();
