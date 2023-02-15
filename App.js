import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Register from './screens/register';
import Accueil from './screens/accueil';
import PrintAnnonce from './screens/printAnnonce';
import Comments from './components/comments';
import UniqComment from './components/uniqComment';
import AddAnnonce from './components/addAnnonce';
import MyAnnonce from './screens/myAnnonce';
import UpdateAnnonce from './screens/updateAnnonce';


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
        <Stack.Screen name="PRINT ANNONCE" component={PrintAnnonce} />
        <Stack.Screen name="COMMENTS" component={Comments} />
        <Stack.Screen name="UNIQUE COMMENT" component={UniqComment} />
        <Stack.Screen name="ADD ANNONCE" component={AddAnnonce} />
        <Stack.Screen name="MY ANNONCE" component={MyAnnonce} />
        <Stack.Screen name="UPDATE ANNONCE" component={UpdateAnnonce} />

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