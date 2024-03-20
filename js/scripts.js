// ;(function () {
buildHeader();
buildFooter();
fetchContent();

const currYear = new Date().getFullYear();

document.getElementById("currYear").innerHTML = currYear;

function showNav() {
  const headerNav = document.querySelector(".header__nav");

  headerNav.classList.toggle("showing");
}

const navToggler = document.querySelector(".navigation__button");
navToggler.addEventListener("click", showNav);

function buildHeader() {
  parent = document.querySelector(".header");

  header =
    '<div class="container header__container"><div class="header__logo">';
  header += '<a href="/">';
  header +=
    '<img src="images/IMG_1037.png" alt="First Dance Thame Logo" class="header__logo--img" />';
  header += "</a>";
  header += "</div>";
  header += '<nav class="header__nav">';
  header += '<div class="header__right">';
  header += '<a href="about" class="header__nav--item">About</a>';
  header += '<a href="classes" class="header__nav--item">Classes</a>';
  header += '<a href="gallery" class="header__nav--item">Gallery</a>';
  header += '<a href="timetable" class="header__nav--item">Timetable</a>';
  header += '<a href="location" class="header__nav--item">Location</a>';
  header += '<a href="contact" class="header__nav--item">Contact</a>';
  header += '<div class="header__social">';
  header +=
    '<a class="header__social--link" href="https://www.facebook.com/firstdancelongcrendon" target="_blank"><i class="fab fa-facebook-f"></i></a>';
  header +=
    '<a class="header__social--link" href="mailto:firstdancethame@gmail.com"><i class="fas fa-envelope"></i></a>';
  header += '<div class="social__link--wrap">';
  header +=
    '<a class="header__social--link" href="tel:07860685789"><i class="fas fa-phone-alt"></i></a>';
  header += "</div>";
  header += "</div>";
  header += "</div>";
  header += "</nav>";
  header += '<div class="navigation__button">';
  header += '<span class="navigation__icon">&nbsp;</span>';
  header += "</div></div>";

  parent.innerHTML = header;
}

function buildFooter() {
  parent = document.querySelector(".footer");

  footer = '<div class="container">';
  footer += '<div class="footer__top row">';
  footer += '<div class="footer__links col-12 col-sm-6 col-md-4 mb-3">';
  footer += '<p class="footer__links--header">Useful Links</p>';
  footer += '<a class="footer__links--link" href="/about.html">About</a>';
  footer += '<a class="footer__links--link" href="/classes.html">Classes</a>';
  footer += '<a class="footer__links--link" href="/contact.html">Contact</a>';
  footer += "</div>";
  footer += '<div class="footer__intouch col-12 col-sm-6 col-md-4 mb-3">';
  footer += '<p class="footer__links--header">Where To Find Us</p>';
  footer += '<div class="footer__intouch--item">';
  footer += '<i class="fas fa-map-marker-alt"></i>';
  footer += '<div class="footer__intouch--main">';
  footer += "<p>The Old school House</p>";
  footer += "<p>Long Crendon, Bucks, HP18 9AF</p>";
  footer += "</div>";
  footer += "</div>";
  footer += "</div>";
  footer += '<div class="footer__intouch col-12 col-sm-6 col-md-4 mb-3">';
  footer += '<p class="footer__links--header">Get In Touch</p>';
  footer += '<div class="footer__intouch--item anchor">';
  footer += '<i class="fas fa-phone-alt"></i>';
  footer += '<div class="footer__intouch--main">';
  footer +=
    '<a class="header__social--link" href="tel:07860685789">07860685789</a>';
  footer += "</div>";
  footer += "</div>";
  footer += '<div class="footer__intouch--item anchor">';
  footer += '<i class="fas fa-envelope"></i>';
  footer += '<div class="footer__intouch--main">';
  footer +=
    '<a class="header__social--link" href="mailto:firstdancethame@gmail.com">firstdancethame@gmail.com</a>';
  footer += "</div>";
  footer += "</div>";
  footer += "</div>";
  footer += "</div>";
  footer += '<div class="footer__copy">';
  footer +=
    '<p class="mb-0">&copy; First Dance <span id="currYear"></span></p>';
  footer += "</div>";
  footer += "</div>";

  parent.innerHTML = footer;
}

function fetchContent() {
  console.log("FETCHING CONTENT");
  let PROJECT_ID = "c7jd3ho8";
  let DATASET = "production";
  let QUERY = encodeURIComponent('*[_type == "about"]');

  // Compose the URL for your project's endpoint and add the query
  let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

  fetch(URL)
    .then((res) => res.json())
    .then((respone) => {
      console.log("fetch response ", respone);
    });
}
// })()
