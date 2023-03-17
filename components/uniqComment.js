import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

export default class UniqComment extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ backgroundColor: '#40BBE1', height: '100%' }}>
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Votre Message..."
                    />

                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => navigate("PRINT ANNONCE")}
                    >
                        <Text style={{ backgroundColor: '#92AFD7', width: 180, height: 30, textAlign: 'center', borderRadius: 10, fontWeight: 'bold', fontSize: 20 }}>
                            Envoyer
                        </Text>
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
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
})