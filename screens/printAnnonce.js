import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import userService from '../services/userService';
import URI from '../services/uriService';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class PrintAnnonce extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
        this.state = {
            id: this.props.route.params.id,
            titre: this.props.route.params.titre,
            prix: this.props.route.params.prix,
            description: this.props.route.params.description,
            nombre_de_like: this.props.route.params.nombre_de_like,

            likeClicked: false 
        };
    }

    // addLike = async () => {
    //     // Vérifier si l'annonce a déjà été likée
    //     const likedAnnounces = localStorage.getItem('likedAnnounces') || [];
    //     if (likedAnnounces.includes(this.state.id)) {
    //         // L'annonce a déjà été likée, on ne fait rien
    //         return;
    //     }
    //     // Ajouter l'annonce à la liste des annonces aimées
    //     localStorage.setItem('likedAnnounces', [...likedAnnounces, this.state.id]);
    //     this.setState({ nombre_de_like: this.state.nombre_de_like + 1 });
    //     try {
    //         // envoyer la mise à jour du nombre de likes au serveur
    //         const user = await userService.isConnected();
    //         const requestOptions = {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${user.token}`
    //             },
    //             body: JSON.stringify({ 'nombre de like': this.state.nombre_de_like })
    //         };
    //         const response = await fetch(`${URI}/api/annonces/${this.state.id}`, requestOptions)
    //         if (response.ok) {
    //             // La mise à jour a réussi, faire quelque chose si nécessaire
    //         } else {
    //             const json = await response.json()
    //             alert(json.message)
    //         }
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }
    
    addLike = () => {
        if (this.state.likeClicked) {
            // Le bouton de "like" a déjà été cliqué, on ne fait rien
            return;
        }
        this.setState({ 
            nombre_de_like: this.state.nombre_de_like + 1,
            likeClicked: true // on met la variable à true pour désactiver le bouton de "like"
        });
    }

    updateLike = async () => {
        this.addLike()
        try {
            console.log(`${URI}/api/annonces/${this.state.id}`)
            // on attend que userService.isConnected finisse de travailler pour recuperer le token de l'user (user.token)
            const user = await userService.isConnected()
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ 'nombre de like': this.state.nombre_de_like })
       
            };
            const response = await fetch(`${URI}/api/annonces/${this.state.id}`, requestOptions)
            // console.log(this.state.nombre_de_like);
            if (response.ok) {
                // this.props.navigation.navigate('MY ANNONCE')
            } else {
                const json = await response.json()
                alert(json.message)

            }
        }
        catch (error) {
            console.log(error);
        }
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flexDirection: "row", justifyContent: 'center', backgroundColor: 'black', height: '100%', padding: 10 }}>
                <View style={{ borderWidth: 1, height: '100%', width: 350, backgroundColor: "#40BBE1", borderRadius: 7 }}>

                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <View style={{ alignItems: 'center', marginTop: 10, flex: 1 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>
                                {this.state.titre}
                            </Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Image
                            source={require("../assets/legumes.jpeg")}
                            // resizeMode="contain"
                            style={{
                                height: 150,
                                width: 330,
                                borderRadius: 7,
                                marginTop: 10,
                                borderColor: 'black',
                                borderWidth: 2
                            }} />
                    </View>

                    <ScrollView>
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>
                                DESCRIPTION {"\n"}
                            </Text>
                            <Text style={{ textAlign: 'center', fontSize: 18 }}>
                                {this.state.description}
                            </Text>
                        </View>
                    </ScrollView>
                    <View style={{ alignItems: 'center', marginTop: 10, flex: 1 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                            {this.state.prix} Euros
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity 
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() => this.updateLike()}
                        >
                            <View>
                                <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>{this.state.nombre_de_like} likes</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}
                            onPress={() => navigate("COMMENTS")}
                        >
                            <View >
                                <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>Commentaires</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ alignItems: 'center', padding: 20 }}
                        onPress={() => navigate("UNIQUE COMMENT")}
                    >
                        <View >
                            <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>Contacter l'annonceur</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}