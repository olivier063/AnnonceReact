import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import validator from 'validator';
import axios from 'axios';
import URI from '../services/uriService';
import StorageService from '../services/storageService';
import userService from '../services/userService';
import LogoutButton from './logoutButton';
import MyAnnonceButton from './myAnnonceButton';

export default function LoginButton() {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [isLogged, setIsLogged] = useState(false);

    const login = async () => {

        // on verifie que le mail est valide selon regex grâce au validator installé via npm
        if (!validator.isEmail(email)) {
            alert('Email non valide')
            return;
        }
        // if(!email){
        //     alert("Entrez tous les champs requis")
        // } 
        else if (!password) {
            alert("Entrez un MDP de 6 caracteres")
        }
        else {
            const user = await userService.login(email, password)
            if (user === null) {
                // on affiche le message d'erreur
                alert("email ou password incorrect")
            }
            console.log(await userService.isConnected())
        }
        // setIsLogged(!isLogged)
        navigation.navigate('ACCUEIL')
    }

    return (
        <View style={{ backgroundColor: "#40BBE1", height: '100%' }}>
            <View style={{ alignItems: "center", marginTop: 40 }}>
                <Image
                    source={require("../assets/connection.png")}
                    resizeMode="contain"
                    style={styles.image}
                />
            </View>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.textButton}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Se connecter</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("REGISTER")}
                        style={styles.textButton}
                    >
                        <Text style={{ color: "white", fontWeight: "bold" }}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View style={{ marginTop: 50 }}>
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    // value={number}
                    placeholder="Entrez votre Pseudo"
                // keyboardType="numeric"
                />
            </View> */}
            <View style={{ marginTop: 50 }}>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                    placeholder="Entrez votre Mail"

                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.nativeEvent.text)}
                    placeholder="Entrez votre Mot de Passe"

                />
            </View>

            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => login()}
                    style={styles.connectionButton}
                >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>CONNECTION</Text>
                </TouchableOpacity>
            </View>
            {/* <LogoutButton navigation={useNavigation()}/>
            <MyAnnonceButton/> */}
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
        borderWidth: 1,
    },

    connectionButton: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        backgroundColor: "#92AFD7",
        height: 40,
        width: 160,
        borderRadius: 7,
    },
});
