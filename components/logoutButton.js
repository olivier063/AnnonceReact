import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

export default class LogoutButton extends Component {

    render() {
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
                }}>
                    <Text>
                        DECONNEXION
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

