// if (document.querySelector('#vue-home-main')) {

//   let headerDiv = document.querySelector('#header').offsetTop;
//   let aboutDiv = document.querySelector('#about').offsetTop;
//   let contactDiv = document.querySelector('#contact').offsetTop;
//   let postsDiv = document.querySelector('#posts').offsetTop;

//   let anchors = [headerDiv, aboutDiv, contactDiv, postsDiv];
//   let links = document.querySelectorAll('.nav-link');

//   window.onscroll = function scrollClass() {
//     var scrollPosY = window.pageYOffset;
//     if (scrollPosY < anchors[1]) {
//       toggleHome(links);
//     }
//     if (scrollPosY + 300 >= anchors[1] && scrollPosY < anchors[2]) {
//       toggleAbout(links);
//     }
//     if (scrollPosY + 300 >= anchors[2] && scrollPosY < anchors[3]) {
//       toggleContact(links);
//     }
//     if (scrollPosY + 300 >= anchors[3]) {
//       togglePost(links);
//     }
//   };
// }

// function toggleHome(links) {
//   links[0].classList.add('nav-active');
//   links[1].classList.remove('nav-active');
//   links[2].classList.remove('nav-active');
//   links[3].classList.remove('nav-active');
// }

// function toggleAbout(links) {
//   links[0].classList.remove('nav-active');
//   links[1].classList.add('nav-active');
//   links[2].classList.remove('nav-active');
//   links[3].classList.remove('nav-active');
// }

// function toggleContact(links) {
//   links[0].classList.remove('nav-active');
//   links[1].classList.remove('nav-active');
//   links[2].classList.add('nav-active');
//   links[3].classList.remove('nav-active');
// }

// function togglePost(links) {
//   links[0].classList.remove('nav-active');
//   links[1].classList.remove('nav-active');
//   links[2].classList.remove('nav-active');
//   links[3].classList.add('nav-active');
// }