// JavaScript File

//document.querySelector("#loader").className = "loadAnim";

window.onload = function() {
  // Checks when the window is resized. Then adds a small button press animation to the large images. 
  // This is a hack to solve an issue with the borders not resizing with the image.
  //resizeRefresh();
  
  fade(document.getElementsByClassName("loadAnim")[0]);
  
  //window.addEventListener("resize", resizeRefresh);

  // hamburger menu "click" event listener
  document.querySelector(".hamburger").addEventListener("click", hamburger);
  
  //photoNav();

  //window.onscroll = function() {scrollFunction()};

  //photoClick();
};