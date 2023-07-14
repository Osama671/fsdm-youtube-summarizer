var navbar = document.getElementsByClassName("nav-bar")[0];

// trigger this function every time the user scrolls
window.onscroll = function (event) {
  var scroll = window.pageYOffset;

  if (scroll > 20) {
    // green
    navbar.style.backgroundColor = "white";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
};
