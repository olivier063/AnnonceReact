import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import AnnonceService from '../services/fetchAnnonces'
import URI from '../services/uriService';
import userService from '../services/userService';




export default class MyLike extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS MY LIKES", this.props)
    this.state = {
      data: [],

      firstElements: [],
      nombre_de_like: 0,
      titre: '',
      image: '',
    };

    // Met à jour les annonces quand le composant monte 
    this.props.navigation.addListener('focus', async () => {
      const json = await AnnonceService.fetchOnlyMyLikes();
      json.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      this.setState({ data: json })
    });
  }



  async componentDidMount() {
    const json = await AnnonceService.fetchOnlyMyLikes();
    this.setState({ data: json })
    console.log('DATA', this.state.data)

    const firstElements = json.map(obj => obj.annonce_id);
    this.setState({ firstElements });
    console.log('FIRST',this.state.firstElements)
    // this.setAnnonce();

  }

  async setAnnonce() {
    try {
      const user = await userService.isConnected();
      const response = await fetch(URI + `/api/annonces/${this.state.firstElements}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('DATA ANNONCE', data);
        this.setState({
          titre: data.titre,
          image: data.image
        })
        return data;
      } else {
        console.log("Erreur lors de la récupération des annonces");
        console.log('Authorization', `Bearer ${user.token}`);
      }
    } catch (error) {
      console.error(error);
    }
  }



  updateLike = async () => {
    try {
      // on attend que userService.isConnected finisse de travailler pour recuperer le token de l'user (user.token)
      const user = await userService.isConnected()
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      };
      // console.log(user.token)
      const response = await fetch(`${URI}/api/like-annonce/${user.id}/annonce/${this.state.firstElements}`, requestOptions)
      if (response.ok) {
        const json = await response.json()
        this.setState({ nombre_de_like: json.total_like })
        console.log('NB LIKE',this.state.nombre_de_like)
      } else {
        const json = await response.json()
        // alert(json.total_like)
      }
    }
    catch (error) {
      console.log(error);
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    const { data } = this.state;
    return (
      <View style={{ backgroundColor: 'black', height: '100%' }}>
        {this.state.data.length === 0 ? <Text style={{
          color: 'white',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 300,
          justifyContent: 'center'
        }}
        >Vous n'avez pas liké d'annonce</Text> :
          <FlatList
            ListFooterComponent={<View style={{}} />} // ce style permet de scroller verticalement jusqu'au dernier item
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ borderColor: 'white', borderWidth: 2, borderRadius: 7, backgroundColor: '#40BBE1', marginTop: 10, margin: 10 }} >

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <View style={{ marginTop: 15 }}>
                    <Image
                      source={{ uri: this.state.image }}
                      resizeMode="contain"
                      style={{
                        height: 70,
                        width: 100,
                        borderRadius: 50,
                        marginLeft: 0,
                        backgroundColor: 'white'

                      }}
                    />
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ width: 140, backgroundColor: 'white', borderRadius: 7, fontWeight: 'bold', textAlign: 'center' }}>{item.titre}</Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', marginBottom: 20 }}>
                  <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity
                      style={{ borderColor: 'black', borderWidth: 2, borderRadius: 7, width: 100, backgroundColor: 'white' }}
                      onPress={() => this.updateLike()}
                    >
                      <Text style={{ textAlign: 'center' }}>Dislike</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )} />
        }
      </View>
    )
  }
}

