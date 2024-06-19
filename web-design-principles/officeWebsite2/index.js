document.addEventListener('DOMContentLoaded', function() {
    new Splide('#testimonial-slider', {
      type   : 'loop',
      perPage: 2,
      autoplay: true,
      breakpoints: {
        768: {
          perPage: 1,
        },
      },
    }).mount();
  });