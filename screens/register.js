import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { Component } from "react";
import RegisterButton from "../components/registerButton";

export default class Register extends Component {
    render() {
        const { navigate } = this.props.navigation;

        return (
            
            <RegisterButton />

        );
    }
}

