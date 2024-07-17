import { fetchNFTData } from "./components/fetchNFTData.js";

import { btnUp } from "./components/btnUp.js";
import { buscardorNfts } from "./components/buscardor.js";
import { loadFavoriteModule } from "./components/funciones.js";

/// Cargar y usar el módulo adecuado
// Cargar y usar el módulo adecuado
loadFavoriteModule()
  .then((favoriteIsLoad) => {
    if (!favoriteIsLoad) {
      throw new Error("favoriteIsLoad no está definido.");
    }

    // Hacer el fetching de datos
    fetchNFTData()
      .then((arrayNfts) => {
        // Buscador de NFTs
        return buscardorNfts(arrayNfts);
      })
      .then(() => {
        // Cargar el favorite
        favoriteIsLoad();
      })
      .catch((error) => {
        console.error("Error en el procesamiento de NFTs:", error);
      });
  })
  .catch((error) => {
    console.error("No se pudo cargar el módulo favorito:", error);
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
