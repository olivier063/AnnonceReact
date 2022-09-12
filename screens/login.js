import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { Component } from "react";

export default class Login extends Component {
    render() {
        const { navigate } = this.props.navigation;

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
                        <TouchableOpacity style={styles.textButton}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                        onPress={() => navigate("REGISTER")} 
                        style={styles.textButton}
                        >
                            <Text style={{ color: "white", fontWeight: "bold" }}>Créer un compte</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 50 }}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder="Entrez votre Pseudo"
                    // keyboardType="numeric"
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder="Entrez votre Mail"
                    // keyboardType="numeric"
                    />
                </View>
                <View>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        // value={number}
                        placeholder="Entrez votre Mot de Passe"
                    // keyboardType="numeric"
                    />
                </View>

                <View style={{alignItems: "center"}}>
                <TouchableOpacity
                onPress={() => navigate("ACCUEIL")}  
                style={styles.connectionButton}
                >
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 17}}>CONNECTION</Text>
                </TouchableOpacity>
                </View>

            </View>
        );
    }
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
