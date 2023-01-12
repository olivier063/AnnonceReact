import { Text, View, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import AnnonceService from '../services/fetchAnnonces';

export default class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    async componentDidMount() {
        const json = await AnnonceService.fetchAnnonces();
        this.setState({ data: json })
    }

    render() {

        const { data } = this.state;
        const { navigate } = this.props.navigation;
        return (


            <View >
                <TextInput
                    style={styles.input}
                    placeholder="Votre Commentaire..."
                />
                <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                    <Text style={{ marginRight: 20, backgroundColor: '#92AFD7', width: 80, textAlign: 'center', borderRadius: 10, fontWeight: 'bold' }}>Publier</Text>
                </TouchableOpacity>
                <View style={{backgroundColor: '#40BBE1', marginTop: 10}}>
                <FlatList
                    ListFooterComponent={<View style={{ height: 80 }} />} // ce style permet de scroller verticalement jusqu'au dernier item
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (

                        <View style={{ marginTop: 10}}>
                            <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>nom prenom</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={require("../assets/connection.png")}
                                    resizeMode="contain"
                                    style={styles.image}
                                />
                                <Text style={styles.text}>
                                    {item.description}
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
        borderRadius: 10
    },
})