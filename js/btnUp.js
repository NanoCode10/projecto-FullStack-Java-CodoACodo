


export const  btnUp = () => {
    //Boton subir al principio
document.addEventListener("DOMContentLoaded", function () {
    /* == > oculta el boton arriba o lo muestra segun top */
    window.addEventListener("scroll", function () {
      var position = window.scrollY;
      //  console.log('position:   ' + position);
      document.querySelectorAll('a[href^="#main"]').forEach(function (element) {
        var anchor = element.getAttribute("href");
        var targetElement = document.querySelector(anchor);
        if (targetElement) {
          var top = targetElement.getBoundingClientRect().top + position;
          var bottom = top + targetElement.offsetHeight;
          // console.log('anchor:   ' + anchor);
          // console.log('bottom:   ' + bottom);
          // console.log('top:   ' + top);
          if (position <= top && position <= bottom) {
            document.querySelectorAll("a.arrow-up").forEach(function (el) {
              el.classList.add("d-none");
            });
          } else {
            document.querySelectorAll("a.arrow-up").forEach(function (el) {
              el.classList.remove("d-none");
            });
          }
        }
      });
    });
  });

}