/* ===================================================
   SANJRI YOUTH FOUNDATION — MAIN SCRIPT
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ============ FOOTER YEAR ============ */
  var yearEl = document.getElementById('syfYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ============ NAVBAR SHRINK ON SCROLL ============ */
  var mainNav = document.getElementById('mainNav');

  function handleNavbarScroll() {
    if (!mainNav) return;
    if (window.scrollY > 60) {
      mainNav.classList.add('syf-scrolled');
    } else {
      mainNav.classList.remove('syf-scrolled');
    }
  }

  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ============ AUTO-CLOSE MOBILE NAV ON LINK CLICK ============ */
  var navCollapseEl = document.getElementById('syfNav');
  if (navCollapseEl) {
    var navLinks = navCollapseEl.querySelectorAll('.nav-link, .syf-btn-donate');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navCollapseEl.classList.contains('show') && window.bootstrap) {
          var bsCollapse = window.bootstrap.Collapse.getInstance(navCollapseEl) ||
            new window.bootstrap.Collapse(navCollapseEl, { toggle: false });
          bsCollapse.hide();
        }
      });
    });
  }

  /* ============ SCROLL TO TOP BUTTON ============ */
  var scrollTopBtn = document.getElementById('syfScrollTop');

  function handleScrollTopVisibility() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('syf-visible');
    } else {
      scrollTopBtn.classList.remove('syf-visible');
    }
  }

  handleScrollTopVisibility();
  window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============ COUNTER ANIMATION ============ */
  var counters = document.querySelectorAll('.syf-counter');
  var countersAnimated = false;

  function animateCounters() {
    if (countersAnimated || counters.length === 0) return;
    countersAnimated = true;

    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      var duration = 1800;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        counter.textContent = current.toLocaleString('en-IN');

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counter.textContent = target.toLocaleString('en-IN');
        }
      }

      window.requestAnimationFrame(step);
    });
  }

  /* ============ SCROLL REVEAL (IntersectionObserver) ============ */
  var revealEls = document.querySelectorAll('.syf-reveal');
  var statsSection = document.getElementById('syfStats');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('syf-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

    if (statsSection) {
      var statsObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });

      statsObserver.observe(statsSection);
    }
  } else {
    /* Fallback: no IntersectionObserver support — just show everything */
    revealEls.forEach(function (el) {
      el.classList.add('syf-visible');
    });
    animateCounters();
  }

});
