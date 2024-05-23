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
let listFavoritesGlobal = null;

function getBtnsFavorite() {
  // console.log(3);
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
  const index = favorites.findIndex((favorite) => favorite.id === nft.id);
  // console.log(favorites);
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
  // console.log(favorites);
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

export const favoritesIsLoad = async () => {
  await getBtnsFavorite();

  btnsFavoriteGlobal.forEach((btn) => {
    //console.log(btn);
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

  loadFavoritesFromLocalStorage();
};
