
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function AddAnnonce() {
    const navigation = useNavigation();



    return (
        <View style={{ backgroundColor: 'white', height: '100%' }} >
            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Choisir un titre d'annonce"
                    maxLength={20}
                />
            </View>
            <View >
                <TextInput
                    style={styles.input}
                    placeholder="Ecrire une courte description"
                    maxLength={200}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Ajouter un prix de vente"
                    keyboardType='numeric'
                    maxLength={10}
                />
            </View>

            <View style={{ alignItems: 'center' }}>
                <Image
                    style={styles.image}
                    placeholder="Ajouter une photo"

                />
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity>
                    <Text style={styles.button}>Choisir une image</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('ACCUEIL')}
                    >
                        <Text style={styles.validateButton}>Valider l'annonce</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#40BBE1'
    },
    button: {
        backgroundColor: '#92AFD7',
        width: 80,
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 10
    },
    validateButton: {
        backgroundColor: '#92AFD7',
        width: 180,
        height: 40,
        textAlign: 'center',
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 40,
        padding: 10 // j'ai mis un padding pour aligner verticalement le text du bouton car impossible de faire autrement
    },
    image: {
        marginTop: 20,
        height: 150,
        width: 200,
        borderColor: 'black',
        borderWidth: 1,
    }
})