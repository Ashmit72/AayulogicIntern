new Splide(".splide", {
  type: "loop",
  perPage: 3,
  breakpoints: {
    767: {
      perPage: 1,
    },
    992: {
      perPage: 2,
    },
  },
}).mount();

new Splide("#splide-auto", {
  type: "loop",
  autoplay: false,
  perPage: 3,
  rewindSpeed: 1,
  snap:false,
  autoScroll:{
   speed:1
  },
  breakpoints: {
    767: {
      perPage: 1,
    },
    992: {
      perPage: 2,
    },
  },
}).mount(window.splide.Extensions);


// const smoothFlow=document.querySelector("#splide-auto-track").addEventListener('onload',()=>{
//   smoothFlow.aria-busy==="true";
// })