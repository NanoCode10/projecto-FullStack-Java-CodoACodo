import { displayNfts, loadFavoriteModule } from "./funciones.js";

// Cargar y usar el módulo adecuado
loadFavoriteModule()
  .then((favoriteIsLoad) => {
    favoriteIsLoad();
  })
  .catch((error) => {
    console.error("No se pudo cargar el módulo favorito:", error);
  });
  
let arrayNftsGlobal = null;

const searchInput = document.getElementById("searchInput");

const handleSearch = () => {
  const searchTerm = searchInput.value.toLocaleLowerCase();

  // console.log(searchTerm)

  const filteredNfts = arrayNftsGlobal.filter((nft) =>
    nft.name.toLocaleLowerCase().startsWith(searchTerm)
  );

  //console.log(filteredNfts);

  displayNfts(filteredNfts);
  favoritesIsLoad();
};
export const buscardorNfts = async (arrayNfts) => {
  try {
    arrayNftsGlobal = arrayNfts;

    searchInput.addEventListener("input", handleSearch);
  } catch (error) {
    console.error("Error fetching NFT data:", error);
  }
};
