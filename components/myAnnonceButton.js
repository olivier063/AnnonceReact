import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'


export default class MyAnnonceButton extends Component {
    
    render() {
        // const { navigate } = this.props.navigation;
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigate('MY ANNONCE')}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#92AFD7",
                        height: 40,
                        width: 200,
                        borderRadius: 7,
                        borderColor: 'black',
                        borderWidth: 1
                    }}
                >
                    <Text>
                        GERER MES ANNONCES
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}