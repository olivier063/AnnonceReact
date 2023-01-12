import URI from "./uriService";


class Annonce {
    async fetchAnnonces() {
        try {
                let response = await fetch(URI + '/api/annonces');
                let responseJsonData = await response.json();
                // console.log(responseJsonData)
                return responseJsonData;
            
            }
        catch(e) {
            console.log(e)
        }
    }

    async fetchMyAnnonces() {
        try {
                let response = await fetch(URI + '/api/annonces');
                let responseJsonData = await response.json();
                // console.log(responseJsonData)
                return responseJsonData;
            
            }
        catch(e) {
            console.log(e)
        }
    }


}
const AnnonceService = new Annonce()
export default AnnonceService
