import axios from "axios";
import StorageService from "./storageService";
import URI from "./uriService";


class UserService {
    token = null;
    user = null;

    async login(email, password) {

        let customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let response = null;
        try {
            response = await axios.post(`${URI}/api/login`, JSON.stringify({ email: email, password: password }), customConfig);
        } catch (e) {
            console.log(e)
        }
        if (response === null) {
            return null;
        }
        return this.setUser(response.data)
    }

    async logout() {
        try {
            await StorageService.remove({
                key: 'loginState'
            })
            console.log('logout')
        } catch (e) {
            console.log(e);
            return
        }
        this.user = null
    }

    async isConnected() {
        try {
            this.user = await StorageService.load({
                key: 'loginState'
            })

            // console.log("IS CONNECTED", this.user)
        } catch (e) {
            // this.logout();
            return
        }
        return this.user
    }

    async setUser(token) {
        const customConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.token
            }
        };
        console.log(customConfig)
        response = null;
        try {
            response = await axios.get(`${URI}/api/me`, customConfig);
        } catch (e) {
            console.log(e)
        } if (response === null) {
            return null;
        }
        response.data.token = token.token
        this.user = response.data
        return StorageService.save({
            key: 'loginState', // Note: Do not use underscore("_") in key!
            data: this.user,
        })
    }
}

const userService = new UserService()
export default userService;