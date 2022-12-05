import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'


export default class PrintAnnonce extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flexDirection: "row", justifyContent: 'center', backgroundColor: 'white', height: '100%', padding: 10 }}>
                <View style={{ borderWidth: 1, height: '100%', width: 380, backgroundColor: "#40BBE1", borderRadius: 7 }}>

                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <View style={{ alignItems: 'center', marginTop: 10, flex: 1 }}>
                            <Text>
                                TITRE
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 10, flex: 1 }}>
                            <Text>
                                PRIX
                            </Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Image
                            source={require("../assets/legumes.jpeg")}
                            // resizeMode="contain"
                            style={{
                                height: 150,
                                width: 350,
                                borderRadius: 7,
                                marginTop: 10,
                                borderColor: 'black',
                                borderWidth: 2
                            }} />
                    </View>
                    
                    <ScrollView>
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <Text style={{ textAlign: 'center' }}>
                                DESCRIPTION

                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj

                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj

                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                                lllllkjhgjhfkhfkghfkfkghfkjfjkhfjhfjhfjhfjhfjhfjhghgjhgj
                            </Text>
                        </View>
                    </ScrollView>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                            <View>
                                <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>Liker (X likes)</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}
                        onPress={() => navigate("COMMENTS") }
                        >
                            <View >
                                <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>Commentaires</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                    style={{ alignItems: 'center', padding: 20 }}
                    onPress={() => navigate("UNIQUE COMMENT")}
                    >
                        <View >
                            <Text style={{ borderWidth: 1, width: 150, backgroundColor: '#92AFD7', borderRadius: 7, textAlign: 'center' }}>Contacter l'annonceur</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}