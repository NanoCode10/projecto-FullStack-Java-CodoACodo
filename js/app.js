import { fetchNFTData } from "./fetchNFTData.js";

import { btnUp } from "./btnUp.js";
import { bunscardorNfts } from "./buscardor.js";
import { favoriteMain } from "./favorite.js";

// Mostrar el spinner antes de hacer la llamada fetch
document.getElementById("spinner").style.display = "block";

// mi fechin de datos
fetchNFTData()
  .then((arrayNfts) => {
    return bunscardorNfts(arrayNfts);
  })
  .catch((error) => {
    console.error("Error en el procesamiento de NFTs:", error);
  });

// camptura el click y llama a la funcion favorite
document.getElementById("card-poster").addEventListener("click", favoriteMain);

// boton para deslisar arriba
btnUp();
