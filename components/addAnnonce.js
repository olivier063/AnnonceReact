
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import URI from '../services/uriService';

export default function AddAnnonce() {
    const navigation = useNavigation();
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [image, setImage] = useState('');


    // const postAnnonce = async () => {

    //     if (!titre || !description || !prix) {
    //         alert('Veuillez entrez tous les champs svp !')
    //         return;
    //     } else {
    //         try {
    //             await axios.post(`${URI}/api/annonces`,
    //                 JSON.stringify({ titre: titre, description: description, prix: prix }))
    //         } catch (e) {
    //             console.log(e)
    //         }
    // navigation.navigate('MY ANNONCE')
    //     }
    // }


    const postAnnonce = async () => {
        let response = null
        if (!titre, !description, !prix) {
            alert('Veuillez entrez tous les champs svp !')
        } else {
            try {
                response = await fetch(`${URI}/api/annonces`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        titre: titre,
                        description: description,
                        prix: prix
                    })
                });
                console.log("RESPONSE", JSON.stringify(response))
            } catch (e) {
                console.log(e)
            }
        }
    }


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titre: titre, description: description, prix: prix })
    };

    const handleChange = async () => {
        try {
            const response = await fetch(
                `${URI}/api/annonces`, requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            Alert.alert("Post created at : ",
                                data.createdAt);
                        });
                })
            console.log("RESPONSE", JSON.stringify(response))
        }
        catch (error) {
            console.error(error);
        }
    }




    return (
        <View style={{ backgroundColor: '#40BBE1', height: '100%' }} >
            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Choisir un titre d'annonce"
                    maxLength={30}
                    value={titre}
                    onChange={(e) => setTitre(e.nativeEvent.text)}
                />
            </View>
            <View >
                <TextInput
                    style={styles.input}
                    placeholder="Ecrire une courte description"
                    maxLength={200}
                    value={description}
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Ajouter un prix de vente"
                    keyboardType='numeric'
                    maxLength={5}
                    value={prix}
                    onChange={(e) => setPrix(e.nativeEvent.text)}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Image
                    style={styles.image}
                    placeholder="Ajouter une photo"
                    value={image}
                    onChange={(e) => setImage(e.nativeEvent.text)}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity>
                    <Text style={styles.button}>Choisir une image</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => postAnnonce()}
                    >
                        <Text style={styles.validateButton}>PUBLIER</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
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
        marginTop: 100,
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