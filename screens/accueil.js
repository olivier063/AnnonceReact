import { Text, View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import ajax from '../services/fetchAnnonces'
import fetchAnnonces from '../services/fetchAnnonces';


export default class Accueil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }
    async componentDidMount() {
        const json = await ajax.fetchAnnonces();
        this.setState({ data: json })
        //console.log(this.state);

    }

    render() {
        const { data } = this.state;

        return (
            <View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>LES PLUS LIKÉES</Text>
                </View>



                <FlatList
                    ListFooterComponent={<View style={{ width: 20 }} />} // ce style permet de scroller horizontalement jusqu'au dernier item
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
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
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>
                                        {item.titre}
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>
                                        {item.description}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )} />




                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={{ borderwidth: 1, width: 150, height: 30, backgroundColor: '#92AFD7', borderRadius: 7, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>CATEGORIES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderwidth: 1, width: 150, height: 30, backgroundColor: '#92AFD7', borderRadius: 7, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>FILTRER</Text>
                    </TouchableOpacity>
                </View>



                <FlatList
                    ListFooterComponent={<View style={{ height: 80 }} />} // ce style permet de scroller verticalement jusqu'au dernier item
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 15 }}>
                            <TouchableOpacity style={{ borderWidth: 1, height: 170, width: 380, backgroundColor: "#40BBE1", borderRadius: 7 }}>
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <Text>
                                        {item.titre}
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={require("../assets/legumes.jpeg")}
                                        // resizeMode="contain"
                                        style={{
                                            height: 50,
                                            width: 350,
                                            borderRadius: 50,
                                            marginTop: 10
                                        }} />
                                </View>

                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <Text style={{ textAlign: 'center' }}>
                                        {item.description}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                                        <View>
                                            <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>LIKER</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                                        <View >
                                            <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>COMMENTER</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )} />





            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginTop: 10,
    },
})