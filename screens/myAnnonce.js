import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import AnnonceService from '../services/fetchAnnonces'
import URI from '../services/uriService';
import axios from 'axios';
import userService from '../services/userService';




export default class MyAnnonce extends Component {
    constructor(props) {
        super(props);
        // console.log("PROPS",this.props)
        this.state = {
            data: []
        };

        // Met à jour les annonces quand le composant monte 
        this.props.navigation.addListener('focus', async () => {
            const json = await AnnonceService.fetchMyAnnonces();
            this.setState({ data: json })
        });
    }


    async componentDidMount() {
        const json = await AnnonceService.fetchMyAnnonces();
        this.setState({ data: json })
        // console.log(json);
    }

    //DELETE ANNONCE..............................................
    // async deleteAnnonce() {
    //    const options = {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json' },
    //     };
    //     try {
    //         const response = await fetch(
    //             `${URI}/api/annonces/${id}`, options)
    //             .then(response => {
    //                 response.json()
    //             })
    //         console.log("RESPONSE", JSON.stringify(response))
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    async deleteAnnonce(id) {
        try {
            // on attend que userService.isConnected finisse de travailler pour recuperer le token de l'user (user.token)
            const user = await userService.isConnected()
            const response = await fetch(`${URI}/api/annonces/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });
            //   console.log(response)
            //   console.log(id)
            //   console.log(token)
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            console.log("DATA", data)
            const json = await AnnonceService.fetchMyAnnonces();
            this.setState({ data: json })
        } catch (error) {
            console.log(error);
        }
    }

    // async deleteAnnonce(e, id){
    //     const data = e.currentTarget;
    //     data.innerText = "Deleting"

    //     const res = await axios.delete(`${URI}/api/annonces/${id}`)
    //     if(res.data.status === 200){
    //         data.closet("tr").remove()
    //         console.log(res.data.message)
    //     }
    // }

    //..............................................DELETE ANNONCE



    render() {
        const { navigate } = this.props.navigation;
        const { data } = this.state;
        return (
            <View style={{ backgroundColor: '#40BBE1', height: '100%' }}>
                <FlatList
                    ListFooterComponent={<View style={{}} />} // ce style permet de scroller verticalement jusqu'au dernier item
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ borderColor: 'black', borderWidth: 2, borderRadius: 7, backgroundColor: '#40BBE1', marginTop: 10, margin: 10 }} >

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <View style={{ marginTop: 15 }}>
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
                                    <Text style={{ width: 140, backgroundColor: 'white', borderRadius: 7, fontWeight: 'bold', textAlign: 'center' }}>{item.titre}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', marginBottom: 20 }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={{ borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100, backgroundColor: 'white' }}
                                        onPress={() => this.deleteAnnonce(item.id)}
                                    >
                                        <Text style={{ textAlign: 'center' }}>SUPPRIMER</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                    <TouchableOpacity style={{ borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100, backgroundColor: 'white' }}>
                                        <Text style={{ textAlign: 'center' }}>MODIFIER</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    )} />
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
