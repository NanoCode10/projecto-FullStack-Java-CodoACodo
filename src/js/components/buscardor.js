import { favoritesIsLoad } from "./favorite.js";
import { displayNfts } from "./funciones.js";

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
