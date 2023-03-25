import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'


export default class MyMessageButton extends Component {
    constructor(props) {
        super(props);
    // console.log("PROPS",this.props)
        this.state = {
        
        };
       
      }
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#92AFD7",
                        height: 40,
                        width: 200,
                        borderRadius: 7,
                        borderColor: 'black',
                        borderWidth: 1,
                        marginTop: 20
                    }}
                    onPress={() => navigate("MY MESSAGE")}
                >
                    <Text>
                         MES MESSAGES
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}