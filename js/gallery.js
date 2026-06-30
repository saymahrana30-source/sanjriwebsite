/* ===================================================
   SANJRI YOUTH FOUNDATION — GALLERY SCRIPT
   (filtering + lightbox, used only on gallery.html)
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var filterBar = document.getElementById('syfFilterBar');
  var galleryGrid = document.getElementById('syfGalleryGrid');
  var noResults = document.getElementById('syfNoResults');

  if (!galleryGrid) return;

  var galleryItems = Array.prototype.slice.call(galleryGrid.querySelectorAll('.syf-gallery-item'));
  var galleryLinks = Array.prototype.slice.call(galleryGrid.querySelectorAll('.syf-gallery-link'));

  /* ============ FILTERING ============ */
  if (filterBar) {
    var filterButtons = filterBar.querySelectorAll('.syf-filter-btn');

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var visibleCount = 0;

        galleryItems.forEach(function (item) {
          var category = item.getAttribute('data-category');
          var show = (filter === 'all' || category === filter);
          item.style.display = show ? '' : 'none';
          if (show) visibleCount++;
        });

        if (noResults) {
          noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      });
    });
  }

  /* ============ LIGHTBOX ============ */
  var lightbox = document.getElementById('syfLightbox');
  var lightboxImg = document.getElementById('syfLightboxImg');
  var lightboxCaption = document.getElementById('syfLightboxCaption');
  var lightboxClose = document.getElementById('syfLightboxClose');
  var lightboxPrev = document.getElementById('syfLightboxPrev');
  var lightboxNext = document.getElementById('syfLightboxNext');

  var currentIndex = 0;

  function getVisibleLinks() {
    return galleryLinks.filter(function (link) {
      var item = link.closest('.syf-gallery-item');
      return item && item.style.display !== 'none';
    });
  }

  function openLightbox(index) {
    var visibleLinks = getVisibleLinks();
    if (visibleLinks.length === 0) return;

    currentIndex = index;
    var link = visibleLinks[currentIndex];
    var imgSrc = link.getAttribute('href');
    var caption = link.getAttribute('data-caption') || '';

    lightboxImg.setAttribute('src', imgSrc);
    lightboxImg.setAttribute('alt', caption);
    lightboxCaption.textContent = caption;

    lightbox.classList.add('syf-lightbox-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('syf-lightbox-open');
    document.body.style.overflow = '';
  }

  function showNext() {
    var visibleLinks = getVisibleLinks();
    if (visibleLinks.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleLinks.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    var visibleLinks = getVisibleLinks();
    if (visibleLinks.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleLinks.length) % visibleLinks.length;
    openLightbox(currentIndex);
  }

  galleryLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var visibleLinks = getVisibleLinks();
      var idx = visibleLinks.indexOf(link);
      if (idx === -1) idx = 0;
      openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('syf-lightbox-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

});
