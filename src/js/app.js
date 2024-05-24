import { fetchNFTData } from "./components/fetchNFTData.js";

import { btnUp } from "./components/btnUp.js";
import { buscardorNfts } from "./components/buscardor.js";
import { favoritesIsLoad } from "./components/favorite.js";

// Mostrar el spinner antes de hacer la llamada fetch
document.getElementById("spinner").style.display = "block";

// mi fechin de datos
fetchNFTData()
  .then((arrayNfts) => {
    //buscador de NFTs
    buscardorNfts(arrayNfts).then(() => {
      //cargar el favorite

      favoritesIsLoad();
    });
  })
  .catch((error) => {
    console.error("Error en el procesamiento de NFTs:", error);
  });

//captura boton para mostrar la lista de favoritos
const conterListFavorites = document.querySelector(".container-list-favorites");

//Muestra el Menu Favorite
const btnFavorite = document.querySelector(".btn-favorite");
btnFavorite.addEventListener("click", () => {
  conterListFavorites.classList.add("show");
});

//Cierra el menu Favorite
const btnClose = document.querySelector("#btn-close");
btnClose.addEventListener("click", () => {
  conterListFavorites.classList.remove("show");
});

// boton para deslisar arriba
btnUp();
