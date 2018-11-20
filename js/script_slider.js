// JavaScript File

//document.getElementsByTagName("body")[0].onload = function(){
  unfade(document.getElementsByTagName("body")[0]);
//}


$(document).ready(function() {
  //auto selects the current active link relative to the url 
  //$('nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('current');
  // Navbar Fade-In effect when scrolling up or at top
  var lastScrollTop = 0;
  $navbar = $('header');
  //page-fade-in must run on page load, otherwise the navbar blinks when it's first used.
  //$navbar.addClass("scrollDown");
  
  //$navbar.addClass("page-fade-in");
    $(window).scroll(function(event){
      
      var st = $(this).scrollTop();
      //alert(st);
      // scroll down. Must take into account negative numbers for IOS devices and when lightbox is closed
      //alert($navbar.hasClass("scrollDown"))
      if ((lastScrollTop < st)  &&  ($(".navbar").height() < st) && (lastScrollTop != 0))  //&& (st > 35) && ((st - lastScrollTop) > 5)) 
      { 
        //$navbar.addClass("page-fade-out");
        //$navbar.removeClass("page-fade-in");
        $navbar.addClass("scrollUp");
        $navbar.removeClass("scrollDown");
      }
      else if ((! $navbar.hasClass("scrollDown")) && (! $navbar.hasClass("scrollUp")) ||  ((lastScrollTop - st) < 10))
      {
      }
      else
      //if  ((st > 35))// && ((st - lastScrollTop) > 5)) 
      { // scroll up
      //alert($navbar.hasClass("scrollDown"));
        //$navbar.addClass("page-fade-in");
        //$navbar.removeClass("page-fade-out");
        $navbar.addClass("scrollDown");
        $navbar.removeClass("scrollUp");
      }
      lastScrollTop = st;
    });  
  // Launch Modal Lightbox when clicking on a photo
  $(".photo").click(function(){
    var index = $(this).index();
    openModal(index+1);
  });
});

function openModal(n) {
    if ($(".lightBox")[0])
    {
      plusSlides(1);
    }
  else
    {
      //$("body").removeClass("page-fade-in");  
      $navbar.toggle(); 
      $("footer").toggle();
      $(".gallery").addClass("lightBox").removeClass("gallery");
      var close = "<a class='closeimage'>&times;</a>";
      var prev = "<a class='previous'><p>&#10094;</p></a>";
      var next = "<a class='nextone'><p>&#10095;</p></a>";
      var caption = "<div class='caption-container'><p id='caption'></p></div>";
      $(".lightBox").append(close+" "+prev+" "+next+" "+caption);
        $(".closeimage").click(function(){
          closeModal();
        });
      $(".previous").click(function(){
          plusSlides(-1);
        });
      $(".nextone").click(function(){
          plusSlides(1);
        });  
      $(".photo").addClass("largePhoto");
      currentSlide(n);
    }
}

function closeModal() {
  //$("body").toggle();
  $(".lightBox").removeClass("lightBox").addClass("gallery");
  $(".gallery > .closeimage, .gallery > .previous, .gallery > .nextone, .gallery > .caption-container").remove();
  $(".photo").removeClass("largePhoto").show();
  $navbar.toggle();
  $("footer").toggle();
  // must display the full page before setting the scroll position
  //$("body").toggle()
  unfade(document.getElementsByTagName("body")[0]);
  // scroll to position of current photo when returning to main page. Takeing into account size of navbar, padding and margins
  var $photoPosition = $(".photo").eq(slideIndex-1).offset().top;
  var $articlePadding = parseInt($(".gallery").css("padding-top"));
  var $photoMargin = parseInt($(".photo").css("margin"));
  // set the correct scroll position
  $(document).scrollTop($photoPosition - $articlePadding - $photoMargin);
}

var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  if (n > $(".largePhoto").length) {slideIndex = 1};
  if (n < 1) {slideIndex = $(".largePhoto").length};
  //$(".largePhoto").css("display","none").removeClass("page-fade-in active");
  $(".largePhoto").css("display","none").removeClass("active");
  //$(".largePhoto").eq(slideIndex-1).css("display","flex").addClass("page-fade-in active");
  $(".largePhoto").eq(slideIndex-1).css("display","flex");
  unfade(document.getElementsByClassName("largePhoto")[slideIndex-1]);
  $("#caption").text($(".largePhoto").eq(slideIndex-1).attr("alt"));
}

function unfade(element) {
    var op = 0.01;  // initial opacity
    element.style.opacity = op
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 7);
}