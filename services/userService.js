import axios from "axios";
import StorageService from "./storageService";
import URI from "./uriService";


class UserService {
     token = null;
    user = null;

  async login(token){
      
        let customConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token.token
            }
        };
        console.log(customConfig)
        let response = null;
        try {
            response = await axios.get(`${URI}/api/me`, customConfig);
        } catch(e) {
            console.log(e)
        }
        response.data.token = token.token
        this.user = response.data
         return StorageService.save({
            key: 'loginState', // Note: Do not use underscore("_") in key!
            data: this.user,
        })
     }

     logout(){

     }

    async isConnected(){
        try {
            this.user =  await StorageService.load({
                key: 'loginState'
            })
        } catch(e){
            this.logout();
            return
        }
        return this.user
     }
}

const userService = new UserService()


export default userService;