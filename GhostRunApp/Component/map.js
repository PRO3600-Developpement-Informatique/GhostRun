import React from 'react';
import {StyleSheet, Platform, AppRegistry, Image} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {mapStyle} from './options.js';

AppRegistry.registerComponent('GhostRunApp', () => App);

export default class Mapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
    };
  }

  demande_permissions() {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        // aaa
      });
    } else {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
        // aaa
      });
    }
  } //Demande a l'utilisateur la permission pour le GPS
  componentDidMount() {
    this.demande_permissions();
    //quand tout est charger cette fonction ce lance
    Geolocation.getCurrentPosition(
      position => {
        // pour avoir la pos au lancement de l'app
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({error: error.message}),
      {
        enableHighAccuracy: true,
        timeout: 200000,
        maximumAge: 10000,
        distanceFilter: 1,
      },
    );
    console.log('oui');
    this.watchID = Geolocation.watchPosition(
      // pour l'acctualisation de la pos ( que cette partie ce lance en boucle)
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.log('non');
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1,
      },
    );
  } //Cette fonction en react ce lance une fois que tout les composants sont chargés, ici elle nous sert a avoir les potitions de l'utilisateur quand il se deplace
  tracer_Trajet(trajet) {} // Cette fonction trace sur la carte un trajet
  calculer_distance() {} // Cette fonction calcule la distance parcouru
  stocker_local_trajet() {} //Cette fonction sauvgarde les differents trajets de l'utilisateur
  bouton_centrage_pos() {} // Cette fonction sert a recentrer la carte a la position de l'utilisateur

  render() {
    let mesCord = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    let cordOrigine = {latitude: 48.8534, longitude: 2.3488};
    return (
      <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}>
        <Marker coordinate={mesCord} />
      </MapView>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});
