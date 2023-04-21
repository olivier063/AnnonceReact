import URI from "./uriService";
import userService from '../services/userService';


class Annonce {
  // fetch les annonces de la flatList horizontal
  async fetchAnnonces() {
    try {
      let response = await fetch(URI + '/api/annonces');
      let responseJsonData = await response.json();
      // console.log(responseJsonData)
      return responseJsonData;

    }
    catch (e) {
      console.log(e)
    }
  }

  //fetch les annonces de la flatlist verticale
  async fetchMyAnnonces() {
    try {
      let response = await fetch(URI + '/api/annonces2');
      let responseJsonData = await response.json();
      // console.log(responseJsonData)
      return responseJsonData;

    }
    catch (e) {
      console.log(e)
    }
  }

  //fetch les annonces que l'utilisateur a posté..........................................
  async fetchOnlyMyAnnonces() {
    try {
      const user = await userService.isConnected();
      const response = await fetch(URI + `/api/myannonces/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        //   console.log("FETCH ONLY MY ANNONCES",data);
        return data;
      } else {
        console.log("Erreur lors de la récupération des annonces");
        console.log('Authorization', `Bearer ${user.token}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  //..........................................


   //fetch les likes que l'utilisateur a posté..........................................
   async fetchOnlyMyLikes() {
    try {
      const user = await userService.isConnected();
      const response = await fetch(URI + `/api/like-annonce/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
          console.log("FETCH ONLY MY LIKES",data);
        return data;
      } else {
        console.log("Erreur lors de la récupération des annonces likés");
        console.log('Authorization', `Bearer ${user.token}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchAnnoncesLikes() {
    try {
      let response = await fetch(URI + '/api/annonces');
      let responseJsonData = await response.json();
      // console.log(responseJsonData)
      return responseJsonData;

    }
    catch (e) {
      console.log(e)
    }
  }



  //..........................................


}
const AnnonceService = new Annonce()
export default AnnonceService
