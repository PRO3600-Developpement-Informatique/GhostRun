import React from 'react';
import {StyleSheet, Platform, AppRegistry, View} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import store from 'react-native-simple-store';
//import {NavigationEvents} from 'react-navigation';
import 'react-native-gesture-handler';
import PageStats from './Stats';

AppRegistry.registerComponent('GhostRunApp', () => App);
const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

export default class Mapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      liste_des_positions: [],
      valuee: [],
      //test: this.props.match.route.params.other || '',
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
    //const {focus} = this.props.navigation.isFocused();
    this.watchID = Geolocation.watchPosition(
        // pour l'acctualisation de la pos ( que cette partie ce lance en boucle)
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            liste_des_positions: this.state.liste_des_positions.concat({
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }),
          });
          let newPos = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          };
          store.update('test', this.state.liste_des_positions);
          //console.log('non');
          console.log(this.state.liste_des_positions);

          let value_de_stats = this.props.route.params;
          if (this.props.route.params == undefined) {
            console.log('pasdef');
          } else {
            this.get_trajet();
            console.log('c deffff');
          }
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 1,
        },
    );
  }
  //Cette fonction en react ce lance une fois que tout les composants sont chargés, ici elle nous sert a avoir les potitions de l'utilisateur quand il se deplace
  tracer_Trajet(trajet) {} // Cette fonction trace sur la carte un trajet
  calculer_distance() {} // Cette fonction calcule la distance parcouru
  stocker_local_trajet() {} //Cette fonction sauvgarde les differents trajets de l'utilisateur
  bouton_centrage_pos() {} // Cette fonction sert a recentrer la carte a la position de l'utilisateur
  get_trajet() {
    this.setState({valuee: this.props.route.params.other});
  }
  render() {
    //console.log(this.navigationProps);
    let mesCord = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    let cordOrigine = {latitude: 37.8025259, longitude: 122.4351431};
    console.log(this.state.valuee);
    return (
        <View>
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
            <Polyline
                //coordinates={this.state.liste_des_positions}
                coordinates={this.state.valuee}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                  '#7F0000',
                  '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                  '#B24112',
                  '#E5845C',
                  '#238C23',
                  '#7F0000',
                ]}
                strokeWidth={6}
            />
          </MapView>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});
