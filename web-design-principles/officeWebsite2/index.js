// document.addEventListener('DOMContentLoaded', function() {
//     new Splide('#testimonial-slider', {
//       type   : 'loop',
//       perPage: 3,
//       autoplay: true,
//       breakpoints: {
//         1382: {
//           perPage: 2,
//         },
//         974: {
//           perPage: 1,
//         },
//       },
//     }).mount();
//   });

document.addEventListener( 'DOMContentLoaded', function () {
            new Splide( '#testimonial-slider', {
                type       : 'loop',
                perPage    : 1,
                autoplay   : false,
                interval   : 5000,
                pauseOnHover: true,
            } ).mount();
        } );