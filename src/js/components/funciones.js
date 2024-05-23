export const displayNfts = (arrayNfts) => {
  const cardPosterElement = document.getElementById("card-poster");
  cardPosterElement.innerHTML = ""; // Vaciar el contenedor antes de agregar nuevos elementos

  arrayNfts.forEach((element) => {
    const name = element.name;
    const subname = element.collection;
    const contrato = element.owner;
    const image = element.image_url;

    if (name === "My New Collection" || name === "GROOKS" || image === "") {
      return;
    }

    // Generar un precio aleatorio para cada NFT
    const priceAleatorio = Math.round((Math.random() * 9 + 1) * 10) / 10;

    const poster = ` 
        <div class="col-md mb-3 animate__animated animate__fadeInUp ">                 
          <div class="card card-nfts mx-auto" style="width: 18rem;" id="card">
            <img src=${image} class="card-img-top" alt="cargando" style="height: 20rem;">
            <div class="card-body" data-product-id="${contrato}">
              <h5 class="card-title fs-5">${name}</h5>
              <h6 class="card-text card-subtitle fs-6">${subname}</h6>
              <p class="card-text card-price fw-light">Precio: $ ${priceAleatorio}</p>
              <div class="d-flex justify-content-between">
                <a class="btn float-end btn-favorite" id="btn-favorite">
                  <i class="bi bi-heart favorite" 
                  style="font-size: larger; text-shadow: 0 0 2px currentColor;"></i>
                  <i class="bi bi-heart-fill favorite-fill d-none " 
                  style="font-size: larger; text-shadow: 0 0 2px currentColor; color: red;"></i>
                </a>
                <a href="#" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#booking-modal">Comprar</a>
              </div>
            </div>
          </div>
        </div>`;

    document.getElementById("card-poster").innerHTML += poster;
  });
};
