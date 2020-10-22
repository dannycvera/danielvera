// JavaScript File

var lastScrollTop = 0;

function scrollFunction() {
  let navBar = document.querySelector("header");

  let st = document.documentElement.scrollTop;
  //console.log(st);
  if (
    lastScrollTop < st &&
    navBar.offsetHeight < st &&
    lastScrollTop > 56 &&
    navBar.offsetHeight > 0
  ) {
    navBar.classList.add("scrollUp");
    navBar.classList.remove("scrollDown");
    document.querySelector("#navbarNav").classList.remove("expand");
  } else if (
    (!navBar.classList.contains("scrollDown") &&
      !navBar.classList.contains("scrollUp")) ||
    (Math.abs(lastScrollTop - st) < 10 && navBar.offsetHeight < st)
  ) {
    // do nothing for the above case
  }
  //if  ((st > 35))// && ((st - lastScrollTop) > 5))
  else {
    navBar.classList.add("scrollDown");
    navBar.classList.remove("scrollUp");
  }
  lastScrollTop = st;
}

// Add "click" event listener for every photo.
// to launch into the lightbox.
// While keeping track of which image was clicked, then passing on the index number.
function photoClick() {
  let article = document.querySelector("article");
  article.onclick = function (evt) {
    let index = Array.prototype.indexOf.call(
      article.querySelectorAll("img"),
      evt.target
    );

    if (evt.target.tagName == "IMG") {
      if (document.getElementsByClassName("lightBox").length > 0) {
        plusSlides(1);
      } else {
        openModal(index + 1);
      }
    } else if (evt.target.id == "prev") {
      plusSlides(-1);
    } else if (evt.target.id == "next") {
      plusSlides(1);
    } else if (evt.target.id == "close") {
      closeModal();
    }
  };
}

/*
  for (let i = 0; i < document.querySelector("article").querySelectorAll(".photo").length; i++)
  {
      
    (function(index){document.querySelector("article").querySelectorAll("img")[i].onclick = function(){
      if (document.getElementsByClassName("lightBox").length > 0)
        {
          plusSlides(1);
        }
      else
        {
          openModal(index + 1);
        }
      };
    })(i);
  
    // Get Description from each jpg's EXIF and add it to the alt text of the img tag
    // Has to be run after the window is loaded. Can't be run with loadPhotos
    if(window.exifr){
      let img = document.querySelector("article").querySelectorAll("img")[i];
      window.exifr.parse(img, {iptc:true}).then(function(exif) {
        if(exif.ObjectName != undefined){img.title = exif.ObjectName}
        //else{img.title = "untitled"}
        if(exif.Caption != undefined) {img.alt = exif.Caption;}
      });
    }
    
  }*/

// On the fly photo gallery generation.
// Checks if the photos exist in the folder,
// then creates HTML entries for them in the "article" element.
// runs before the loading of the entire script
/*
function loadPhotos(){
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
  }


  let i = 0;
  let page = title(document.title);
  do {
    let photoNum = (i + 1).toString().padStart(2, '0');
    let imageURL = page+"/photo" + photoNum + ".jpg";
    if (imageExists(imageURL)){
      let newImage = document.createElement("IMG");
      newImage.className = "photo";
      newImage.src = imageURL;
      document.querySelector("article").appendChild(newImage);
      i++;
    }
    else{
      break;
    }
  } while(i == document.querySelector("article").getElementsByTagName("img").length);
}

// gets the title of the page from the last word of the HTML title
// already incorperated into the loadPhotos function
function title(words) {
    var n = words.split(" ");
    return n[n.length - 1];
}

// checks if the image src exists. Returns true or false
// no longer needed
function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}



*/

var photosLoaded = 0;

// On the fly photo gallery generation.
// Checks if the photos exist in the folder,
// then creates DOM entries for them in the "article" element.
// runs before the loading of the entire script
function loadPhotos() {
  //necessary for Internet Explorer compatability for padStart
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
      targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
      padString = String(typeof padString !== "undefined" ? padString : " ");
      if (this.length > targetLength) {
        return String(this);
      } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(this);
      }
    };
  }

  //build the URL
  let n = document.title.split(" ");
  let page = n[n.length - 1];
  let photoNum = (photosLoaded + 1).toString().padStart(2, "0");
  let imageURL = page + "/photo" + photoNum + ".jpg";

  // start loading the image into the DOM
  let newImage = document.createElement("IMG");

  //the onload function will call the same function again if it is successful.
  //also increases the value of photosLoaded
  //no more images will be inserted into the DOM if the url fails.
  newImage.onload = function () {
    newImage.className = "photo";
    document.querySelector("article").appendChild(newImage);
    if (window.exifr) {
      //let img = newImage;
      window.exifr
        .parse(newImage, { iptc: true /*, userComment: true*/ })
        .then(function (exif) {
          if (exif.ObjectName != undefined) {
            newImage.title = exif.ObjectName;
          }
          //else{newImage.title = "untitled"}
          if (exif.Caption != undefined) {
            newImage.alt = exif.Caption;
          }
        });
    }
    photosLoaded++;
    loadPhotos();
    newImage.onload = null;
  };
  // the url for image.scr has to be defined after the image.onload function is defined for caching to work
  // do not change the order
  newImage.src = imageURL;
}

// Checks when the window is resized. Then adds a small button press animation to the large images.
// Fixes issues with the border of images
// This has also become a check to see if the navbar should be displayed or not after resizing
function resizeRefresh() {
  // transforms the image slightly to fix an issue with the borders not displaying correctly after an window resize
  if (document.querySelectorAll(".largePhoto").length > 0) {
    document
      .querySelector("article")
      .querySelectorAll("img")
      [slideIndex - 1].classList.add("buttonPress");
    setTimeout(function () {
      document
        .querySelector("article")
        .querySelectorAll("img")
        [slideIndex - 1].classList.remove("buttonPress");
    }, 200);
  }
  // if (document.querySelectorAll(".splash_img").length > 0) {
  //   document.querySelector(".splash_img").styte.transform = "scale(1)";
  // }
}

// Create Lightbox by changing the classes of the photos and hiding other elements
function openModal(n) {
  //document.querySelector("body").classList.add("displayNone");
  document.querySelector("header").classList.add("displayNone");
  document.querySelector("footer").classList.add("displayNone");
  document.querySelector("#close").classList.remove("displayNone");
  document.querySelector("#prev").className = "previous noSwipe";
  document.querySelector("#next").className = "nextOne noSwipe";
  document.querySelector(".caption-container").classList.remove("displayNone");
  document.querySelector(".gallery").className = "lightBox";

  document
    .querySelector("article")
    .addEventListener("touchstart", handleTouchStart, false);
  document
    .querySelector("article")
    .addEventListener("touchmove", handleTouchMove, false);

  //change the class of all images from "photo" to "largePhoto"
  let photos = document.querySelector("article").querySelectorAll("img");
  for (let i = 0; i < photos.length; i++) {
    photos[i].className = "largePhoto";
  }

  currentSlide(n);
}

var click_touchend_in_progress = false;

function touchInProgress() {
  if (click_touchend_in_progress) return;
  click_touchend_in_progress = true;
  setTimeout(function () {
    click_touchend_in_progress = false;
  }, 200);
}

// close the Lightbox by changing the classes of the large photos and restoring the hidden elements
function closeModal() {
  //change the modal back to a gallery
  document.querySelector(".lightBox").className = "gallery";
  document.querySelector("#close").classList.add("displayNone");
  document.querySelector("#prev").className = "noSwipe displayNone";
  document.querySelector("#next").className = "noSwipe displayNone";
  document.querySelector(".caption-container").classList.add("displayNone");

  document
    .querySelector("article")
    .removeEventListener("touchstart", handleTouchStart, false);
  document
    .querySelector("article")
    .removeEventListener("touchmove", handleTouchMove, false);

  //Change the class of the images back from "largePhoto" to "photo"
  let photos = document.querySelector("article").querySelectorAll("img");
  for (let i = 0; i < photos.length; i++) {
    photos[i].className = "photo";
  }

  //make the header and footer visable
  document.querySelector("header").classList.remove("displayNone");
  document.querySelector("footer").classList.remove("displayNone");

  unfade(document.getElementsByTagName("body")[0]);

  // scroll to position of current photo when returning to main page. Takeing into account size of navbar, padding and margins
  let photoPosition = photos[slideIndex - 1].offsetTop;
  let articlePadding =
    document.querySelector("nav").offsetTop +
    document.querySelector("nav").offsetHeight;
  let computeStyle = getComputedStyle(photos[slideIndex - 1]);
  let photoMargin = parseInt(computeStyle.getPropertyValue("margin-Top"));
  window.scrollTo(0, photoPosition - articlePadding - photoMargin);
  resizeRefresh();
}

var slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

// displays the current slide after everything else is hidden
function showSlides(n) {
  let photos = document.querySelector("article").querySelectorAll("img");
  if (n > photos.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = photos.length;
  }
  let active = document.querySelector(".active");
  if (active == null) {
    //document.querySelector("body").classList.remove("displayNone");
    for (let i = 0; i < photos.length; i++) {
      photos[i].className = "displayNone";
    }
    photos[slideIndex - 1].className = "largePhoto active";
    unfade(photos[slideIndex - 1]);
  } else if (
    active.classList.contains("swipeLeft") ||
    active.classList.contains("swipeRight")
  ) {
    setTimeout(function () {
      active.className = "displayNone";
      photos[slideIndex - 1].className = "largePhoto active";
      unfade(photos[slideIndex - 1]);
    }, 200);
  } else {
    active.className = "displayNone";
    photos[slideIndex - 1].className = "largePhoto active";
    unfade(photos[slideIndex - 1]);
  }

  // add title and caption from alt text
  if (photos[slideIndex - 1].title != "undefined") {
    document.querySelector("#photoTitle").innerText =
      photos[slideIndex - 1].title;
  } else {
    document.querySelector("#photoTitle").innerText = "";
  }
  if (photos[slideIndex - 1].alt != "undefined") {
    document.querySelector("#caption").innerText = photos[slideIndex - 1].alt;
  } else {
    document.querySelector("#caption").innerText = "";
  }
}

// Fade in and out functions
function unfade(element) {
  var op = 0.01; // initial opacity
  element.style.opacity = op;
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += 0.05;
  }, 15);
}

function fade(element) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.01) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= 0.05;
  }, 15);
}

// javascript touch/swipe handler
// credit goes to "givance" as he provided the below code on stackoverflow
// https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android/45625324#45625324
var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  let article = document.querySelector("article");
  let index = Array.prototype.indexOf.call(
    article.querySelectorAll("img"),
    evt.target
  );

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* left swipe */
      if (evt.target.tagName == "IMG") {
        touchInProgress();
        document
          .querySelector("article")
          .querySelectorAll("img")
          [index].classList.add("swipeLeft");
        plusSlides(-1);
      }
    } else if (xDiff < 0) {
      /* right swipe */
      if (evt.target.tagName == "IMG") {
        touchInProgress();
        document
          .querySelector("article")
          .querySelectorAll("img")
          [index].classList.add("swipeRight");
        plusSlides(1);
      }
    }
  } else {
    if (yDiff > 10) {
      /* up swipe */
      if (evt.target.tagName == "IMG") {
        touchInProgress();
        closeModal();
      }
    } else {
      /* down swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

// hamburger collapsable menu
function hamburger() {
  let navBar = document.querySelector("#navbarNav");
  if (navBar.classList.contains("expand")) {
    navBar.classList.remove("expand");
  } else {
    navBar.className += "expand";
    unfade(navBar);
  }
}
