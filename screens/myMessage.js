import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import URI from '../services/uriService';
import userService from '../services/userService';




export default class MyMessage extends Component {
    constructor(props) {
        super(props);
        // console.log("PROPS MY ANNONCE", this.props)
        this.state = {
            data: [],

        };
    }


    async componentDidMount() {
        const json = await this.fetchOnlyMyMessage();

    }

    // Montre tous les messages de l'utilisateur
    async fetchOnlyMyMessage() {
        try {
            const user = await userService.isConnected();
            let response = await fetch(URI + `/api/messaging/${user.id}`, {
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

    //efface les messages
    async deleteMessage(id) {
        try {
            // on attend que userService.isConnected finisse de travailler pour recuperer le token de l'user (user.token)
            const user = await userService.isConnected()
            const response = await fetch(`${URI}/api/messaging/${id}`, {
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
            // console.log("DATA", data)
            const json = await this.fetchOnlyMyMessage();
            this.setState({ data: json })
        } catch (error) {
            console.log(error);
        }
    }



    render() {
        const { navigate } = this.props.navigation;
        const { data } = this.state;
        return (

            <View style={{ backgroundColor: 'black', height: '100%' }}>
                {this.state.data.length === 0 ? <Text style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    marginTop: 300,
                    justifyContent: 'center'
                }}
                >Vous n'avez pas publié de message</Text> :
                    <FlatList
                        ListFooterComponent={<View style={{}} />} // ce style permet de scroller verticalement jusqu'au dernier item
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (

                            <View style={{
                                borderColor: 'white',
                                borderWidth: 2,
                                borderRadius: 7,
                                backgroundColor: '#40BBE1',
                                marginTop: 10,
                                margin: 10,
                            }} >
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{
                                        marginTop: 10,
                                        justifyContent: 'center',
                                        width: 350,
                                        height: 100,
                                        backgroundColor: 'white',
                                        borderRadius: 20
                                    }}>
                                        <Text style={{
                                            backgroundColor: 'white',
                                            borderRadius: 7,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }}>
                                            {item.message}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', marginBottom: 20 }}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            style={{ borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100, backgroundColor: 'white' }}
                                            onPress={() => this.deleteMessage(item.id)}
                                        >
                                            <Text style={{ textAlign: 'center' }}>SUPPRIMER</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>

                        )} />

                }
            </View>
        )
    }
}




