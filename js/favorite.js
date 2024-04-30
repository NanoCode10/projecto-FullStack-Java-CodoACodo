let favorites = [];

const updateFavoritesInLocalStorage = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const loadFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem("favorites");

  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
    showHTML();
  }
};

let btnsFavoriteGlobal = null;
let cardNftsGlobal = null;
let conterListFavoritesGlobal = null;
let listFavoritesGlobal = null;

function getBtnsFavorite() {
  return new Promise((resolve, reject) => {
    document.addEventListener("nftsLoaded", () => {
      const btnsFavorite = document.querySelectorAll(
        "#card-poster .card-body .btn-favorite"
      );
      const cardNfts = document.querySelectorAll("#card-poster .card-nfts");

      const conterListFavorites = document.querySelector(
        ".container-list-favorites"
      );

      const listFavorites = document.querySelector(".list-favorites");

      cardNftsGlobal = cardNfts;
      btnsFavoriteGlobal = btnsFavorite;
      listFavoritesGlobal = listFavorites;
      conterListFavoritesGlobal = conterListFavorites;

      resolve(
        btnsFavoriteGlobal,
        cardNftsGlobal,
        listFavoritesGlobal,
        conterListFavoritesGlobal
      );
    });
  });
}

const toggleFavorite = (nft) => {
  const index = favorites.findIndex((favorite) => favorite.id === nft.id);
  if (index === -1) {
    favorites.push(nft);
  } else {
    favorites.splice(index, 1);
  }
  updateFavoritesInLocalStorage();

  // console.log(index);
};

const updateFavoriteMenu = () => {
  listFavoritesGlobal.innerHTML = "";
  console.log(favorites);
  favorites.forEach((fav) => {
    // Crear un nuevo elemento 'div' para el producto favorito
    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("card-favorite");

    // Crear y añadir el título del producto
    const titleElement = document.createElement("p");
    titleElement.classList.add("title");
    titleElement.textContent = fav.title;
    favoriteCard.appendChild(titleElement);

    // Crear y añadir el precio del producto
    const priceElement = document.createElement("p");
    priceElement.textContent = fav.price;
    favoriteCard.appendChild(priceElement);

    // Añadir el producto favorito a la lista
    listFavoritesGlobal.appendChild(favoriteCard);
  });
};

const showHTML = () => {
  cardNftsGlobal.forEach((card) => {
    const contentCard = card.querySelector(".card-body");
    const productId = contentCard.dataset.productId;

    const isFavorite = favorites.some((favorite) => favorite.id === productId);

    const favoriteButton = card.querySelector(".favorite");
    favoriteButton.classList.toggle("d-none", isFavorite);
    const favoriteFill = card.querySelector(".favorite-fill");
    favoriteFill.classList.toggle("d-none", !isFavorite);

    //console.log(productId);

    //console.log(favorites);

    updateFavoriteMenu();
  });
};

async function main() {
  await getBtnsFavorite();

  btnsFavoriteGlobal.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card-body");

      const nft = {
        id: card.dataset.productId,
        title: card.querySelector(".card-title").textContent,
        price: card.querySelector(".card-price").textContent,
      };

      toggleFavorite(nft);

      showHTML();
    });
  });

  const btnClose = document.querySelector("#btn-close");
  btnClose.addEventListener("click", () => {
    conterListFavoritesGlobal.classList.remove("show");
  });

  const btnFavorite = document.querySelector(".btn-favorite");
  btnFavorite.addEventListener("click", () => {
    conterListFavoritesGlobal.classList.add("show");
  });

  loadFavoritesFromLocalStorage();
}

main();
