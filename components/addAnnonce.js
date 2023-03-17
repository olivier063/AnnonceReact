
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import URI from '../services/uriService';
import userService from '../services/userService';
import * as ImagePicker from 'expo-image-picker';
import DropDownAddAnnonce from './dropDownAddAnnonce';

export default function AddAnnonce() {
    const navigation = useNavigation();
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [prix, setPrix] = useState('');
    const [image, setImage] = useState(null);



    //POST ANNONCE..............................................

    const postAnnonce = async () => {
        if (!titre) {
            alert("Entrez un titre")
        }
        else if (!description) {
            alert("Entrez une desrciption")
        }
        else if (!prix) {
            alert("Entrez un prix de vente")
        }
        try {
            // on attend que userService.isConnected finisse de travailler pour recuperer le token de l'user (user.token)
            const user = await userService.isConnected()
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ titre: titre, description: description, prix: prix, image: image })
            };
            console.log('TOKEN',user.token)
            const response = await fetch(
                `${URI}/api/annonces`, requestOptions)
            console.log(JSON.stringify(response))

            if (response.ok) {
                navigation.navigate('MY ANNONCE')
            } else {
                const json = await response.json()
                // alert(json.message)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    
    //..............................................POST ANNONCE

    //image-picker..............................................
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // console.log("RESULT", result);
        const uri = result.uri;
        setImage(uri);
        // console.log("URI", uri);
        return uri;
    };
    //..............................................image-picker






    return (
        <View style={{ backgroundColor: '#40BBE1', height: '100%' }} >
            <View style={{ marginTop: 10 }}>
                <View style={{  marginTop: 30, width: '90%', marginLeft: 27  }}>
                    <DropDownAddAnnonce />
                </View>
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
                    style={styles.inputDescription}
                    placeholder="Ecrire une courte description"
                    maxLength={255}
                    value={description}
                    multiline={true}
                    numberOfLines={3}
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Ajouter un prix de vente"
                    keyboardType='numeric'
                    maxLength={6}
                    value={prix}
                    onChange={(e) => setPrix(e.nativeEvent.text)}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Image
                    style={styles.image}
                    placeholder="Ajouter une photo"
                    value={image}
                    source={{ uri: image }}
                    onChange={(e) => setImage(e.nativeEvent.text)}
                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => pickImage()}
                >
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
        marginTop: 25,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    inputDescription: {
        height: 80,
        margin: 12,
        marginBottom: -2,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#92AFD7',
        width: 170,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 10
    },
    validateButton: {
        backgroundColor: '#92AFD7',
        width: 280,
        height: 50,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30,
        padding: 10 // j'ai mis un padding pour aligner verticalement le text du bouton car impossible de faire autrement
    },
    image: {
        marginTop: 20,
        height: 150,
        width: 300,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'white'
    }
})