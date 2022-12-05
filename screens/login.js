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


export default class Login extends Component {



    render() {
 
        return (
            <View>
                {userService.isConnected !== userService.isConnected ? 
                    <View>
                        <LoginButton />
                    </View>
                 : 
                    <View style={{backgroundColor: '#40BBE1', height: '100%', justifyContent: 'center'}}>                     
                        <MyAnnonceButton />
                        <LogoutButton />
                    </View>
                }
            </View>
        );
    }
}

