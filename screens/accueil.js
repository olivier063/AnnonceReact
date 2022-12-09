import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { Component } from 'react'
import ajax from '../services/fetchAnnonces'
import fetchAnnonces from '../services/fetchAnnonces';
import StorageService from '../services/storageService';
import userService from '../services/userService';
import LogoutButton from '../components/logoutButton';



export default class Accueil extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props)
        this.state = {
            data: [],
            name: '',

        };
        this.props.navigation.addListener('focus', () => {
            this.getStorage();
        });
    }

    // On recupère les annonces à la montée du component
    async componentDidMount() {
        const json = await ajax.fetchAnnonces();
        this.setState({ data: json })
        // console.log("COMPONENT DID MOUNT",this.state);
        this.getStorage();
      
    }

    // On verifie dans le localStorage que l'utilisateur soit bien connecté pour Set le state: name, afin de l'afficher dans l'accueil si il est connecté
    async getStorage() {
        const user = await userService.isConnected()
        console.log('GET STORAGE',user)
        if (user) {
            this.setState({
                name: user["name"]
            });
        } else {
            this.setState({
                name: ""
            });
        }
    }

  



    render() {
        const { data } = this.state;
        const { navigate } = this.props.navigation;
    

        return (
            <View >

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5, borderColor: 'black', borderWidth: 1, borderRadius: 10, width: 200, textAlign: 'center', backgroundColor: '#40BBE1' }}>Bonjour {this.state.name}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>LES PLUS LIKÉES</Text>
                </View>



                <FlatList
                    ListFooterComponent={<View style={{ width: 20 }} />} // ce style permet de scroller horizontalement jusqu'au dernier item
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={true}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 5, marginLeft: 10, marginBottom: 130 }}>
                            <TouchableOpacity style={{ borderWidth: 1, height: 250, width: 150, backgroundColor: "#40BBE1", borderRadius: 7 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={require("../assets/skate.jpeg")}
                                        resizeMode="contain"
                                        style={styles.image} />
                                </View>
                                <View style={{ alignItems: 'center', marginTop: 20, height: 50 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 15 }}>
                                        {item.titre}
                                    </Text>
                                </View>
                                <ScrollView>
                                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
                                            {item.prix}€
                                        </Text>
                                    </View>
                                </ScrollView>
                            </TouchableOpacity>
                        </View>
                    )} />




                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={{ borderwidth: 1, width: 150, height: 30, backgroundColor: '#92AFD7', borderRadius: 7, justifyContent: 'center' }}
                    // onPress={() => navigate("LOGIN")}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>CATEGORIES</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity style={{ borderwidth: 1, width: 150, height: 30, backgroundColor: '#92AFD7', borderRadius: 7, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>MES LIKES</Text>
                    </TouchableOpacity>
                </View>



                <FlatList
                    ListFooterComponent={<View style={{ height: 500 }} />} // ce style permet de scroller verticalement jusqu'au dernier item
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 15 }}>
                            <TouchableOpacity style={{ borderWidth: 1, height: 180, width: 380, backgroundColor: "#40BBE1", borderRadius: 7 }}
                                onPress={() => navigate('PRINT ANNONCE')}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignItems: 'center', flex: 0.5 }} >
                                        <Image
                                            source={require("../assets/legumes.jpeg")}
                                            // resizeMode="contain"
                                            style={styles.image2} />
                                    </View>
                                    <View style={{ alignItems: 'center', flex: 0.5, height: 150, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 15, textAlign: 'center', marginLeft: 30 }}>
                                            {item.titre}
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: 'center', flex: 0.5, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', width: 50 }}>
                                            {item.prix}€
                                        </Text>
                                    </View>

                                </View>
                                <View style={{ alignItems: 'flex-end', marginRight: 10 }}>

                                    {/* le item.nombre de like, s'ecrit entre crochets car dans le json il n'y a pas d'underscore */}
                                    <Text style={{ fontSize: 16, marginVertical: -15 }}>{item['nombre de like']} likes</Text>
                                </View>

                                {/* <ScrollView>
                                    <View style={{ alignItems: 'center', marginTop: 0 }}>
                                        <Text style={{ textAlign: 'center' }}>
                                            {item.description}
                                        </Text>
                                    </View>
                                </ScrollView> */}
                                {/* <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                                        <View>
                                            <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>Liker (X likes)</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                                        <View >
                                            <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>Voir les commentaires</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> */}

                            </TouchableOpacity>
                        </View>
                    )} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: 120,
        borderRadius: 7,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 2
    },
    image2: {
        height: 145,
        width: 130,
        borderRadius: 7,
        marginLeft: 25,
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 15
    },

})