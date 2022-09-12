import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Register from './screens/register';
import Accueil from './screens/accueil';


const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ACCUEIL" component={Accueil}
          options={({ navigation }) => ({
            headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
              <Image source={require("./assets/connection.png")}
                resizeMode="contain"
                style={styles.image} />
            </TouchableOpacity>
          })}
        />
        <Stack.Screen name="LOGIN" component={Login} />
        <Stack.Screen name="REGISTER" component={Register} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 100,
    borderRadius: 50,

  },
})