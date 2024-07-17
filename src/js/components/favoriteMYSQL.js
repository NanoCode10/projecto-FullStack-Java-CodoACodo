let favorites = [];

const updateFavoriteInMYSQL = async (nft) => {
  const url = "http://localhost:8080/apiproyectofinal/favorite";
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nft),
  });
  const data = await response.json();
  // console.log(data);
};

const loadFavoritesFromMYSQL = async (idUser) => {
  const url =
    "http://localhost:8080/apiproyectofinal/favorite?idUser=" + idUser;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  favorites = data;
  showHTML();
};

const deleteFavoriteFromMYSQL = async (idNft, idUser) => {
  const url = `http://localhost:8080/apiproyectofinal/favorite?idnft=${idNft}&iduser=${idUser}`;
  const response = await fetch(url, {
    method: "delete",
  });
  const data = await response.json();
  // console.log(data);
};

let btnsFavoriteGlobal = null;
let cardNftsGlobal = null;
let listFavoritesGlobal = null;

function getBtnsFavorite() {
  return new Promise((resolve, reject) => {
    const btnsFavorite = document.querySelectorAll(
      "#card-poster .card-body .btn-favorite"
    );
    const cardNfts = document.querySelectorAll("#card-poster .card-nfts");
    // console.log(cardNfts);

    const listFavorites = document.querySelector(".list-favorites");

    //console.log(listFavorites)

    cardNftsGlobal = cardNfts;
    btnsFavoriteGlobal = btnsFavorite;
    listFavoritesGlobal = listFavorites;

    resolve(btnsFavoriteGlobal, cardNftsGlobal, listFavoritesGlobal);
  });
  /* });*/
}

const toggleFavorite = (nft) => {
  const index = favorites.findIndex((favorite) => favorite.nftId === nft.nftId);

  if (index === -1) {
    favorites.push(nft);
    updateFavoriteInMYSQL(nft);
  } else {
    favorites.splice(index, 1);
    deleteFavoriteFromMYSQL(nft.nftId, nft.idUsuario);
  }
};

const updateFavoriteMenu = () => {
  listFavoritesGlobal.innerHTML = "";

  favorites.forEach((fav) => {
    // Crear un nuevo elemento 'div' para el producto favorito
    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("card-favorite");

    // Crear y añadir la imagen del producto
    const imageElement = document.createElement("img");
    imageElement.src = fav.image;
    imageElement.alt = fav.name;
    imageElement.classList.add("favorite-image");
    favoriteCard.appendChild(imageElement);

    // Crear y añadir el título del producto
    const titleElement = document.createElement("p");
    titleElement.classList.add("title");
    titleElement.textContent = fav.name;
    favoriteCard.appendChild(titleElement);

    // Crear y añadir el precio del producto
    const priceElement = document.createElement("p");
    priceElement.textContent = fav.precio + " U$D";
    favoriteCard.appendChild(priceElement);

    // Añadir el producto favorito a la lista
    listFavoritesGlobal.appendChild(favoriteCard);
  });
};

const showHTML = () => {
  cardNftsGlobal.forEach((card) => {
    const contentCard = card.querySelector(".card-body");
    const productId = contentCard.dataset.productId;

    const isFavorite = favorites.some(
      (favorite) => favorite.nftId === productId
    );

    const favoriteButton = card.querySelector(".favorite");
    favoriteButton.classList.toggle("d-none", isFavorite);
    const favoriteFill = card.querySelector(".favorite-fill");
    favoriteFill.classList.toggle("d-none", !isFavorite);

    updateFavoriteMenu();
  });
};

export const favoritesIsLoad = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const idUser = user.id;

  await getBtnsFavorite();

  btnsFavoriteGlobal.forEach((btn) => {
    // console.log("BOTON ---> " + btn);
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card-nfts");
      //   console.log(card);
      const nft = {
        idUsuario: idUser,
        nftId: card.querySelector(".card-body").dataset.productId,
        precio: card.querySelector(".card-price").textContent,
        name: card.querySelector(".card-title").textContent,
        subname: card.querySelector(".card-subtitle").textContent,
        contrato: card.querySelector(".card-body").dataset.productId,
        image: card.querySelector(".card-img-top")?.src || "",
      };

      // Función para limpiar el precio y convertirlo en un número
      function limpiarPrecio(precio) {
        // Elimina "Precio: " del inicio y " U$D" del final
        const precioLimpio = precio.replace("Precio: ", "").replace(" U$D", "");
        // Convierte la cadena de texto en un número
        return parseFloat(precioLimpio);
      }
      // Modifica el objeto con el nuevo precio limpio
      nft.precio = limpiarPrecio(nft.precio);

      //   console.log("------------------ NFT -----------------------");
      //  console.log(nft);

      toggleFavorite(nft);

      showHTML();
    });
  });

  loadFavoritesFromMYSQL(idUser);
};
