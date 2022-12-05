import { Image, Text, View } from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class MyAnnonce extends Component {
    render() {
        return (
            <View style={{backgroundColor: '#40BBE1', height: '100%'}}>
            <View style={{borderColor: 'black', borderWidth: 2, borderRadius: 7, backgroundColor: '#40BBE1', marginTop: 10}} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{marginTop: 15}}>
                    <Image
                        source={require("../assets/connection.png")}
                        resizeMode="contain"
                        style={{
                            height: 70,
                            width: 100,
                            borderRadius: 50,
                            marginLeft: 0,
                            
                        }}
                    />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{width: 150}}>TITRE DE L'ANNONCE</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', marginBottom: 20 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity style={{borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100}}>
                            <Text style={{textAlign: 'center'}}>SUPPRIMER</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <TouchableOpacity style={{borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100}}>
                            <Text style={{textAlign: 'center'}}>MODIFIER</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            </View>
        )
    }
}

