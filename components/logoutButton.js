import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import axios from 'axios';
import userService from '../services/userService';
import URI from '../services/uriService';
import StorageService from '../services/storageService';


export default class LogoutButton extends Component {
    constructor(props) {
        super(props);
        // console.log("PROPS LOGOUT", this.props)

        this.state = {

        };
    }

    //LOGOUT................................................
    logout = async () => {

        console.log("USER SERVICE",userService)
        if (userService != null){
         await userService.logout()
         }
    }
    //................................................LOGOUT


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 50,
                    backgroundColor: "#92AFD7",
                    height: 40,
                    width: 160,
                    borderRadius: 7,
                    borderColor: 'black',
                    borderWidth: 2
                }}
                    onPress={() => this.logout()}
                    onPressOut={() => navigate("ACCUEIL")}
                >
                    <Text>
                        DECONNEXION
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

