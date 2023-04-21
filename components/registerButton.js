import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import validator from 'validator';
import axios from 'axios';
import URI from '../services/uriService';
import { registerRootComponent } from 'expo';
import StorageService from '../services/storageService';
import userService from '../services/userService';

export default function RegisterButton() {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const register = async () => {

        // on verifie que le mail est valide selon regex grâce au validator installé via npm
        if (!validator.isEmail(email)) {
            alert('Email non valide')
            return;
        }
        else if (!password || password.length < 6) {
            alert("Entrez un MDP de 6 caracteres minimum")
        }
        else if (!name) {
            alert("Entrez votre Pseudo")
        }
        else {
            // j'ai ajouté cette variable (customConfig vu dans Stackoverflow) car axios me renvoyait une erreur sans elle. 
            let customConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            let response = null
            try {
                response = await axios.post(`${URI}/api/create-account`,
                JSON.stringify({ email: email, password: password, name: name }), customConfig)

            } catch (e) {
                console.log(e)
            }
            if (response === null) {
                alert("Une erreur est survenue");
                return
            }
            await userService.setUser(response.data)
            navigation.navigate('ACCUEIL')     
            console.log(StorageService)
        }
    }

    return (
        <View style={{ backgroundColor: "#40BBE1", height: 800 }}>
            <View style={{ alignItems: "center", marginTop: 40 }}>
                <Image
                    source={require("../assets/connection.png")}
                    resizeMode="contain"
                    style={styles.image}
                />
            </View>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("LOGIN")}
                        style={styles.textButton}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Se connecter</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.textButton}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 50 }}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChange={(e) => setName(e.nativeEvent.text)}
                    placeholder="Entrez votre Pseudo"
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                    placeholder="Entrez votre Email"

                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    value={password}
                    secureTextEntry={true}
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                    placeholder="Entrez votre Mot de Passe"
                // keyboardType="numeric"
                />
            </View>
            {/* <View>
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder="Confirmez votre Mot de Passe"
                // keyboardType="numeric"
                />
            </View> */}

            <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={styles.connectionButton}
                    onPress={() => register("ACCUEIL")}
                // onPressOut={() => navigation.navigate("LOGIN")}
                >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>CREER LE COMPTE</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },

    textButton: {
        backgroundColor: "#92AFD7",
        height: 30,
        width: 140,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
    },

    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginTop: 20,
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 7,
        borderColor: 'black'
    },

    connectionButton: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#92AFD7",
        height: 40,
        width: 200,
        borderRadius: 7,
    },
});
