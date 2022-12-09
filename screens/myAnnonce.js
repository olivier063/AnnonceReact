import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'


export default class MyAnnonce extends Component {
    constructor(props) {
        super(props);
    console.log(this.props)
        this.state = {
        
        };
       
      }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{backgroundColor: '#40BBE1', height: '100%'}}>
            <View style={{borderColor: 'black', borderWidth: 2, borderRadius: 7, backgroundColor: '#40BBE1', marginTop: 10, margin: 10}} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
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
                    <View style={{ justifyContent: 'center'}}>
                        <Text style={{width: 140, backgroundColor: 'white', borderRadius: 7, fontWeight: 'bold'}}>TITRE DE L'ANNONCE</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', marginBottom: 20 }}>
                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity style={{borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100, backgroundColor: 'white'}}>
                            <Text style={{textAlign: 'center'}}>SUPPRIMER</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                        <TouchableOpacity style={{borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100, backgroundColor: 'white'}}>
                            <Text style={{textAlign: 'center'}}>MODIFIER</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

            <View style={styles.createButton}>
                    <TouchableOpacity
                        onPress={() => navigate('ADD ANNONCE')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>+</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}



const styles = StyleSheet.create({
    createButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#92AFD7',
        position: 'absolute',
        top: 570,
        marginLeft: 310
    }
})
