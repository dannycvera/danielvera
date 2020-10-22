// JavaScript File

// generates HTML entries for all the photos in the img folder of the page
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart


loadPhotos();

window.onload = function() {
  // Checks when the window is resized. Then adds a small button press animation to the large images. 
  // This is a hack to solve an issue with the borders not resizing with the image.

  fade(document.querySelector("#loader"));

  window.addEventListener("resize", resizeRefresh);

  // hamburger menu "click" event listener
  document.querySelector(".hamburger").addEventListener("click", hamburger);
  
  //photoNav();

  window.onscroll = function() {scrollFunction()};

  photoClick();
};
