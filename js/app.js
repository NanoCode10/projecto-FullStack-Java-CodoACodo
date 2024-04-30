// Mostrar el spinner antes de hacer la llamada fetch
document.getElementById("spinner").style.display = "block";

async function fetchNFTData() {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": "7b1816fb343d45ba8c91be24620f802d",
      },
    };
    const response = await fetch(
      "https://api.opensea.io/api/v2/collections?chain=solana",
      options
    );
    const data = await response.json();
    const arrayNfts = data.collections;

    // console.log(arrayNfts);
    arrayNfts.forEach((element) => {
      const name = element.name;
      const subname = element.collection;
      const contrato = element.owner;
      const image = element.image_url;

      if (name === "My New Collection" || name === "GROOKS" || image === "") {
        return;
      }
      const priceAleatorio = Math.round((Math.random() * 9 + 1) * 10) / 10;

      const poster = `
        <div class="col-md mb-3 animate__animated animate__fadeInUp ">           
          <div class="card card-nfts mx-auto" style="width: 18rem;">
            <img src=${image} class="card-img-top" alt="cargando" style="height: 20rem;">
            <div class="card-body" data-product-id="${contrato}">
              <h5 class="card-title fs-5">${name}</h5>
              <h6 class="card-text card-subtitle fs-6">${subname}</h6>
              <p class="card-text card-price fw-light">Precio: $ ${priceAleatorio}</p>
              <div class="d-flex justify-content-between">
                <a class="btn float-end btn-favorite">
                  <i class="bi bi-heart favorite" style="font-size: larger; text-shadow: 0 0 2px currentColor;"></i>
                  <i class="bi bi-heart-fill favorite-fill d-none " style="font-size: larger; text-shadow: 0 0 2px currentColor; color: red;"></i>
                </a>
                <a href="#" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#booking-modal">Comprar</a>
              </div>
            </div>
          </div>
        </div>`;

      document.getElementById("card-poster").innerHTML += poster;
    });
  } catch (err) {
    console.error(err);
  } finally {
    document.getElementById("spinner").style.display = "none";
    // Emitir un evento personalizado después de que los datos se han cargado y agregado al DOM
    document.dispatchEvent(new CustomEvent("nftsLoaded"));
  }
}

fetchNFTData();

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

import "./favorite.js";
