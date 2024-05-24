
import { displayNfts } from "./funciones.js";

export async function fetchNFTData() {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-api-key": "7b1816fb343d45ba8c91be24620f802d",
        },
      };
      const response = await fetch(
        "https://api.opensea.io/api/v2/collections?chain=solana",
        options
      );
      const data = await response.json();
  
     const arrayNfts = data.collections;
  
      //console.log(arrayNfts)
      
      //Funcion para mostrar los nfts
      displayNfts(arrayNfts);
      
      return arrayNfts;
        
       } catch (err) {
              console.error(err);
       } finally {
              document.getElementById("spinner").style.display = "none";
                        
       }
      
  }
