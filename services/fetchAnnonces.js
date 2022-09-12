
const URI = 'http://10.81.200.181:8000';

export default {
    async fetchAnnonces() {
        try {
                let response = await fetch(URI + '/api/annonces');
                let responseJsonData = await response.json();
                //console.log(responseJsonData)
                return responseJsonData;
            
            }
        catch(e) {
            console.log(e)
        }
    }
}