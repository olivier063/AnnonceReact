import { Text, View, Image, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import userService from '../services/userService';
import URI from '../services/uriService';

export default class Comments extends Component {
    constructor(props) {
        super(props);
        // console.log('PROPS',this.props)
        this.state = {
            data: [],
            message: '',
        };
    }

    // pour l'input message
    handleMessageChange = (e) => {
        this.setState({ message: e.nativeEvent.text });
    }

    async componentDidMount() {
        const json = await this.fetchAllMessaging();

        // this.setState({ data: json })
        // console.log('DATA',this.state.data)
    }


    // Montre tous les messages
    async fetchAllMessaging() {
        try {
            const user = await userService.isConnected();
            let response = await fetch(URI + `/api/messaging/annonce/${this.props.route.params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            let responseJsonData = await response.json();
            this.setState({ data: responseJsonData })
            console.log('DATA', this.state.data)
            return responseJsonData;

        }
        catch (e) {
            console.log('ERROR', e)
        }
    }

    // Publi un message
    postMessage = async () => {
            if (!this.state.message) {
                alert("Entrez un message")
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
                    body: JSON.stringify({ message: this.state.message })
                };
                // console.log('TOKEN', user.token)
                const response = await fetch(
                    `${URI}/api/messaging/${user.id}/annonce/${this.props.route.params.id}`, requestOptions)
                console.log(JSON.stringify(response))
                // this.setState({message: response})
                if (response.ok) {
                    // Alert.alert('Message publié')
                    await this.fetchAllMessaging();
                    this.setState({ message: '' })
                } else {
                    const json = await response.json()
                    // alert(json.message)
                }
            }
            catch (error) {
                console.log(error);
            }
    }

    render() {

        const { data } = this.state;
        const { navigate } = this.props.navigation;
        return (


            <View style={{ backgroundColor: 'black', height: '100%' }}>
                <TextInput
                    style={styles.input}
                    onChange={this.handleMessageChange}
                    value={this.state.message}
                    placeholder="Votre Commentaire..."
                />
                <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                    <Text style={{
                        marginRight: 20,
                        backgroundColor: '#92AFD7',
                        width: 80,
                        textAlign: 'center',
                        borderRadius: 10,
                        fontWeight: 'bold'
                    }}
                        onPress={() => this.postMessage()}
                    >
                        Publier
                    </Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: '#40BBE1', marginTop: 10, borderRadius: 20 }}>
                    <FlatList
                        ListFooterComponent={<View style={{ height: 80 }} />} // ce style permet de scroller verticalement jusqu'au dernier item
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>nom prenom</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={require("../assets/connection.png")}
                                        resizeMode="contain"
                                        style={styles.image}
                                    />
                                    <Text style={styles.text}>
                                        {item.message}
                                    </Text>
                                </View>
                            </View>
                        )} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 60,
        width: 50,
        borderRadius: 50,
        flex: 0.2,
        margin: 10
    },
    text: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 5,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
})