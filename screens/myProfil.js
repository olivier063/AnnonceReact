import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import userService from '../services/userService';
import URI from '../services/uriService';

export default class MyProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
        };
    }

    componentDidMount() {
        this.fetchOnlyMyProfil();
    }


    async fetchOnlyMyProfil() {
        try {
            const user = await userService.isConnected();
            const response = await fetch(URI + `/api/user/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                console.log("FETCH ONLY MY PROFIL", data);

                //ici on set les states pour pouvoir les utiliser dans les inputs
                this.setState({
                    email: data.email,
                    name: data.name,
                })
                return data;
            } else {
                console.log("Erreur lors de la récupération des annonces");
                console.log('Authorization', `Bearer ${user.token}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    updateProfil = async () => {
        try {
            // on attend que userService.isConnected finisse de travailler pour recuperer le token de l'user (user.token)
            const user = await userService.isConnected()
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ name: this.state.name, email: this.state.email })
            };
            const response = await fetch(
                `${URI}/api/user/${user.id}`, requestOptions)

            console.log(JSON.stringify(response))
            // console.log(`${URI}/api/user/${user.id}`)

            if (response.ok) {
                this.props.navigation.navigate('LOGIN')
            } else {
                const json = await response.json()
                console.log("JSON", json)
                alert(json.message)

            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //fonction appeler dans les inputs pour la modification du profil
    handleEmailChange = (text) => {
        this.setState({
            email: text,
        });
    }

    handleNameChange = (text) => {
        this.setState({
            name: text,
        });
    }



    render() {
        const { email, name } = this.state;
        return (
            <View style={{ backgroundColor: "#40BBE1", height: '100%' }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginTop: 20
                }}>Je modifie mon profil</Text>

                <Text style={{
                    marginTop: 40,
                    textAlign: 'center',
                    fontSize: 20,
                }}>Mon nouveau pseudo</Text>

                <TextInput
                    style={styles.input}
                    value={name}
                    onChange={(e) => this.handleNameChange(e.nativeEvent.text)}
                />

                <Text style={{
                    textAlign: 'center',
                    marginTop: 20,
                    fontSize: 20,
                }}>Mon nouvel Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChange={(e) => this.handleEmailChange(e.nativeEvent.text)}
                />

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.updateProfil()}
                    >
                        <Text style={styles.validateButton}>MODIFIER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        marginTop: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },

    validateButton: {
        backgroundColor: '#92AFD7',
        width: 180,
        height: 50,
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 40,
        marginBottom: 10,
        padding: 10 // j'ai mis un padding pour aligner verticalement le text du bouton car impossible de faire autrement
    },
})