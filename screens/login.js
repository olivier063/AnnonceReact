import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { Component } from "react";
import LoginButton from "../components/loginButton";
import LogoutButton from "../components/logoutButton";
import MyAnnonce from "./myAnnonce";
import userService from "../services/userService";
import MyAnnonceButton from "../components/myAnnonceButton";
import MyMessageButton from "../components/myMessageButton";
import MyProfilButton from "../components/myProfilButton";


export default class Login extends Component {
    constructor(props) {
        super(props);
    // console.log("PROPS LOGIN",this.props)
        this.state = {
         name: ""
        };
        this.props.navigation.addListener('focus', () => {
            this.getStorage();
        });

// Le blur permet l'ecoute du composant quand celui ci descend ou se ferme
        // this.props.navigation.addListener('blur', () => {
        //     console.log("BLUR")
        // } )
      
      }

      //On Set le name de l'utilisateur en le recuperant dans le localStorage
      async getStorage() {
        const user = await userService.isConnected()
        // console.log('GET STORAGE',user)
        if (user) {
            this.setState({
                name: user["name"]
            });
        } else {
            this.setState({
                name: ""
            });
        }
    }

    render() {
       const { name } = this.state;
        return (
            <View>
                {name === "" ? 
                    <View>
                        <LoginButton />
                    </View>
                 :
                    <View style={{backgroundColor: '#40BBE1', height: '100%', justifyContent: 'center'}}>

                        {/* ici on fait passer au component MyAnnonceButton et LogoutButton la navigation  */}
                        <MyProfilButton navigation={this.props.navigation}/>

                        <MyAnnonceButton navigation={this.props.navigation}/>

                        <MyMessageButton navigation={this.props.navigation}/>
                    
                        <LogoutButton navigation={this.props.navigation}/>
                    </View>
                   }  
            </View>
        );
    }
}

