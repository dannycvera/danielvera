// JavaScript File
// Only pure javascript here. No JQuery since the library hasn't been loaded yet

//INLINE HTML SVG. DOESN'T WORK VERY WELL, BUT IT ALWAYS WORKS EVEN WITHOUT A .htaccess FILE
//var loadDiv = document.createElement('div');
//loadDiv.setAttribute("id","loader");
//loadDiv.classList.add("load-anim");
//document.body.appendChild(loadDiv);
//var mySVG  = '<svg width="200px" height="200px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-eclipse" style="background: none;"><path ng-attr-d="{{config.pathCmd}}" ng-attr-fill="{{config.color}}" stroke="none" d="M30 50A20 20 0 0 0 70 50A20 22 0 0 1 30 50" fill="#b22222" transform="rotate(137.865 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path></svg>';

//loadDiv.insertAdjacentHTML('afterbegin', mySVG)



// USING AN SVG FILE INSIDE AN IMG WORKS SMOOTHLY ONLY WHEN SPECIFYING THE TYPE "image/svg+xml" in the .htaccess file.
var loadDiv = document.createElement('div');
loadDiv.setAttribute("id","loader");
loadDiv.classList.add("load-anim");
document.body.appendChild(loadDiv);

// USING AN SVG FILE INSIDE AN IMG WORKS SMOOTHLY ONLY WHEN SPECIFYING THE TYPE "image/svg+xml" in the .htaccess file.
//var loadSVG = document.createElement('img');
//loadSVG.setAttribute("src","img/loading.svg");
//loadSVG.setAttribute("type","image/svg+xml");

//loadDiv.appendChild(loadSVG);
