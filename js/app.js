import { fetchNFTData } from "./fetchNFTData.js";

import { btnUp } from "./btnUp.js";
import { getAndFileterNfts } from "./buscardor.js";
import { favoriteMain } from "./favorite.js";

// Mostrar el spinner antes de hacer la llamada fetch
document.getElementById("spinner").style.display = "block";

// mi fechin de datos
fetchNFTData().then((arrayNfts) => {
  getAndFileterNfts(arrayNfts).then(() => {});
});
//  favoriteMain()

document.getElementById("card-poster").addEventListener("click", favoriteMain);

// boton para deslisar arriba
btnUp();
