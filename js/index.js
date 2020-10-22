// JavaScript File

// generates HTML entries for all the photos in the img folder of the page
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart

//document.querySelector("#loader").className = "loadAnim";

window.onload = function () {
  // Checks when the window is resized. Then adds a small button press animation to the large images.
  // This is a hack to solve an issue with the borders not resizing with the image.
  //resizeRefresh();
  fade(document.querySelector("#loader"));

  // needed due to a bug in chrome and image borders not resizing properly.
  // Looks like it's nop longer needed. Must have been fixed by google.
  //window.addEventListener("resize", resizeRefresh);
};
