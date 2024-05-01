import { displayNfts } from "./funciones.js";
import { fetchNFTData } from "./fetchNFTData.js";
import { favoriteMain } from "./favorite.js";
//import { favoriteMain } from "./favorite.js";



let arrayNftsGlobal = null;

const searchInput = document.getElementById("searchInput")

const handleSearch = () =>{

   const searchTerm = searchInput.value.toLocaleLowerCase()

   // console.log(searchTerm)

   const filteredNfts = arrayNftsGlobal.filter(nft => nft.name.toLocaleLowerCase().startsWith(searchTerm))

   console.log(filteredNfts)

   displayNfts(filteredNfts)  
   
   
   

  

}

export function getAndFileterNfts(arrayNfts) {
    return new Promise((resolve, reject) => {
        try {
            
            arrayNftsGlobal = arrayNfts;
            
      //      console.log(arrayNftsGlobal)
            searchInput.addEventListener("input", handleSearch);
        
        
        } catch (error) {
            console.error('Error fetching NFT data:', error);
        } 
        resolve();
    })
}

/*
async function getAndFileterNfts() {
    
    const arrayNfts =  await fetchNFTData();
    arrayNftsGlobal = arrayNfts
    

   // console.log(arrayNftsGlobal)
    searchInput.addEventListener("input", handleSearch)   

};
*/

getAndFileterNfts();

