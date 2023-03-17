import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import AnnonceService from '../services/fetchAnnonces'
import URI from '../services/uriService';
import userService from '../services/userService';




export default class MyAnnonce extends Component {
    constructor(props) {
        super(props);
        console.log("PROPS MY ANNONCE", this.props)
        this.state = {
            data: [],
            id: '',
            titre: '',
            description: '',
            prix: '',

        };

        // Met à jour les annonces quand le composant monte 
        this.props.navigation.addListener('focus', async () => {
            const json = await AnnonceService.fetchOnlyMyAnnonces();
            json.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
            this.setState({ data: json })
        });
    }


    async componentDidMount() {
        const json = await AnnonceService.fetchOnlyMyAnnonces();
        this.setState({ data: json })
        console.log('DATA', this.state.data)
        
        // this.setState({
        //     id: id,
        //     titre: titre,
        //     description: description,
        //     prix: prix,
        // })

    }


    //DELETE ANNONCE..............................................
    async deleteAnnonce(id) {
        try {
            // on attend que userService.isConnected finisse de travailler pour recuperer le token de l'user (user.token)
            const user = await userService.isConnected()
            const response = await fetch(`${URI}/api/annonces/${id}`, {
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
            const json = await AnnonceService.fetchOnlyMyAnnonces();
            this.setState({ data: json })
        } catch (error) {
            console.log(error);
        }
    }
    //..............................................DELETE ANNONCE



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
                >Vous n'avez pas publié d'annonce</Text> :
                    <FlatList
                        ListFooterComponent={<View style={{}} />} // ce style permet de scroller verticalement jusqu'au dernier item
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ borderColor: 'white', borderWidth: 2, borderRadius: 7, backgroundColor: '#40BBE1', marginTop: 10, margin: 10 }} >
                                <TouchableOpacity
                                    onPress={() => navigate('PRINT ANNONCE',
                                        {
                                            id: item.id,
                                            description: item.description,
                                            titre: item.titre,
                                            prix: item.prix,
                                            nombre_de_like: item['nombre de like'],
                                            image: item.image
                                        })}

                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <View style={{ marginTop: 15 }}>
                                            <Image
                                                source={{ uri: item.image }}
                                                resizeMode="contain"
                                                style={{
                                                    height: 70,
                                                    width: 100,
                                                    borderRadius: 50,
                                                    marginLeft: 0,
                                                    backgroundColor: 'white'

                                                }}
                                            />
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={{ width: 140, backgroundColor: 'white', borderRadius: 7, fontWeight: 'bold', textAlign: 'center' }}>{item.titre}</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', marginBottom: 20 }}>
                                        <View style={{ justifyContent: 'center' }}>
                                            <TouchableOpacity
                                                style={{ borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100, backgroundColor: 'white' }}
                                                onPress={() => this.deleteAnnonce(item.id)}
                                            >
                                                <Text style={{ textAlign: 'center' }}>SUPPRIMER</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                            <TouchableOpacity
                                                style={{ borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100, backgroundColor: 'white' }}
                                                onPress={() => navigate('UPDATE ANNONCE', { id: item.id, titre: item.titre, description: item.description, prix: item.prix })}

                                            >
                                                <Text style={{ textAlign: 'center' }}>MODIFIER</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )} />
                }
                <View style={styles.createButton}>
                    <TouchableOpacity
                        onPress={() => navigate('ADD ANNONCE')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>+</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}



const styles = StyleSheet.create({
    createButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#92AFD7',
        position: 'absolute',
        top: 570,
        marginLeft: 290
    }
})
