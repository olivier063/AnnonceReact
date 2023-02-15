import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import AnnonceService from '../services/fetchAnnonces';
import userService from '../services/userService';
import URI from '../services/uriService';

export default class UpdateAnnonce extends Component {
    constructor(props) {
        super(props);
        // console.log("UPDATE ANNONCE",this.props)
        this.state = {
            id: this.props.route.params.id,
            titre: this.props.route.params.titre,
            description: this.props.route.params.description,
            prix: this.props.route.params.prix.toString(),
        };
        // console.log('test => '+this.state.prix)
    }

    updateAnnonce = async () => {
        try {
            // on attend que userService.isConnected finisse de travailler pour recuperer le token de l'user (user.token)
            const user = await userService.isConnected()
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ titre: this.state.titre, description: this.state.description, prix: this.state.prix })
            };
            const response = await fetch(
                `${URI}/api/annonces/${this.state.id}`, requestOptions)
            console.log(response)
            if (response.ok) {
                this.props.navigation.navigate('MY ANNONCE')
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
        return (
            <View style={{ backgroundColor: 'black', height: '100%' }} >
                <View style={{margin: 10, backgroundColor: '#40BBE1', borderRadius: 7}}>
                <View style={{ marginTop: 40 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Choisir un titre d'annonce"
                        maxLength={30}
                        value={this.state.titre}
                        onChange={(e) => this.setState({ titre: e.nativeEvent.text })}
                    />
                </View>
                <View >
                    <TextInput
                        style={styles.inputDescription}
                        placeholder="Ecrire une courte description"
                        maxLength={120}
                        multiline={true}
                        numberOfLines={3}
                        value={this.state.description}
                        onChange={(e) => this.setState({ description: e.nativeEvent.text })}
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Ajouter un prix de vente"
                        keyboardType='numeric'
                        maxLength={6}
                        value={this.state.prix}
                        onChange={(e) => this.setState({ prix: e.nativeEvent.text })}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={styles.image}
                        placeholder="Ajouter une photo"
                        // value={image}
                        onChange={(e) => setImage(e.nativeEvent.text)}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                    // onPress={() => ()}
                    >
                        <Text style={styles.button}>Choisir une image</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => this.updateAnnonce()}
                        >
                            <Text style={styles.validateButton}>MODIFIER</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    inputDescription: {
        height: 80,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#92AFD7',
        width: 170,
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 10
    },
    validateButton: {
        backgroundColor: '#92AFD7',
        width: 180,
        height: 50,
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 80,
        marginBottom: 10,
        padding: 10 // j'ai mis un padding pour aligner verticalement le text du bouton car impossible de faire autrement
    },
    image: {
        marginTop: 20,
        height: 150,
        width: 200,
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 7,
        backgroundColor: 'white'
    }
})