import React from 'react';
import {StyleSheet, Platform, AppRegistry, View, Button} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
//import {NavigationEvents} from 'react-navigation';
import 'react-native-gesture-handler';
import PageStats from './Stats';
import {mapStyle} from './options.js';
import {connect} from 'react-redux';
import base64 from 'react-native-base64';

AppRegistry.registerComponent('GhostRunApp', () => App);

class Mapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      altitude: 0,
      latitude_course: 0,
      longitude_course: 0,
      altitude_course: 0,
      error: null,
      liste_des_positions: [],
      valuee: [],
      user: this.props.state.userCour.utilisateurCourant,
      password: this.props.state.datatemp.password,
      creactionTrajetenCours: this.props.state.creactionTrajet
        .creactionDeTrajetEnCours,
      courseEnCours: this.props.state.creactionCourse.courseEnCours,
      count: 0,
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
          altitude: position.coords.altitude,
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
    this.watchID = Geolocation.watchPosition(
      // pour l'acctualisation de la pos ( que cette partie ce lance en boucle)
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
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
        this.setState({count: this.state.count});

        Geolocation.getCurrentPosition(info => console.log(info));
        let value_de_stats = this.props.route.params;
        if (this.props.route.params == undefined) {
          console.log('pasdef');
        } else {
          this.get_trajet();
          console.log('c deffff');
        }
        const tripp = this.props.state.newTrip.trip;
        //Accualise la valeur pour savoir si on crée un trajet ou non
        this.setState({creactionTrajetenCours: this.props.state.creactionTrajet.creactionDeTrajetEnCours});
        console.log('Creation de trajet' + this.state.creactionTrajetenCours);
         if (this.state.creactionTrajetenCours === false){
           //Envoie les donnes des pos a l'api
           this.postDataApiLocalisations(tripp);
         }
         this.setState({courseEnCours: this.props.state.creactionCourse.courseEnCours});
         if(this.state.courseEnCours === true ){
           this.setState({count: this.state.count + 1});
           if(this.state.count < this.props.route.params.liste_des_details_pour_course.length - 1) {
             console.log('count = ' +this.state.count + 'taille liste = ' +this.props.route.params.liste_des_details_pour_course.length);
             //Actualisation de la position de ghost
             this.setState({latitude_course: this.props.route.params.liste_des_details_pour_course[this.state.count].latitude});
             this.setState({longitude_course: this.props.route.params.liste_des_details_pour_course[this.state.count].longitude});
             this.setState({altitude_course: this.props.route.params.liste_des_details_pour_course[this.state.count].altitude});
           }
           else{
             //code pour arriver du ghost
             console.log('ghost arrivé');
           }
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

    console.log(this.props);
  }
  postDataApiLocalisations = tripp => {
    var date = new Date();
    const currentTime = date.toJSON();
    fetch('https://0a6b5d0c.ngrok.io/api/localisations/', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Basic ' + base64.encode('arthur' + ':' + 'arthur'),
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        trip: tripp,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        altitude: this.state.altitude,
        timestamp: currentTime,
      }),
    })
      .then(response => response.status)
      .then(result => console.log(result));
  };

  affiche_trajet_avec_temps = async liste => {
    const newlist = [];
    const liste_pour_trav = liste;
    liste_pour_trav[0].timestamp = 0;
    for (var i = 0; i < liste.length - 1; i++) {
      const dateSuiv = new Date(liste[i + 1].timestamp);
      const datePre = new Date(liste[i].timestamp);
      const time_entre_2_pos = dateSuiv - datePre;
      const obj_temp = [
        {
          latitude: liste[i].latitude,
          longitude: liste[i].longitude,
          timestamp: time_entre_2_pos,
        },
      ];
      const liste_pour_trav = liste_pour_trav.concat(obj_temp);
      await this.sleep(time_entre_2_pos);
      this.setState({
        value: this.state.value.concat([
          {latitude: liste[i].latitude, longitude: liste[i].longitude},
        ]),
      });
    }
  };
  //Cette fonction en react ce lance une fois que tout les composants sont chargés, ici elle nous sert a avoir les potitions de l'utilisateur quand il se deplace
  tracer_Trajet(trajet) {} // Cette fonction trace sur la carte un trajet
  calculer_distance() {} // Cette fonction calcule la distance parcouru
  stocker_local_trajet() {} //Cette fonction sauvgarde les differents trajets de l'utilisateur
  bouton_centrage_pos() {} // Cette fonction sert a recentrer la carte a la position de l'utilisateur
  get_trajet() {
    this.setState({valuee: this.props.route.params.other});
  }
  afficher_trajet = () => {
    if(this.state.creactionTrajetenCours === !true){
      return this.state.liste_des_positions;
    }
    else{
      return [{latitude:0 ,longitude:0}];
    }
  };

  render() {
    const mesCord = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    const ghostCord = {
      latitude: this.state.latitude_course,
      longitude: this.state.longitude_course,
    };
    console.log(this.props);
    const le_trajet_a_afficher = this.afficher_trajet();
    return (
      <View>
        <MapView
          followsUserLocation
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
          <Marker
              image={require('./icon/ghost-icon.png')}
              coordinate={ghostCord} />
          <Polyline
            coordinates={le_trajet_a_afficher}
            strokeColor='#275d7f' // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={4}
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

function mapStateToPros(state) {
  return {
    state,
  };
}
function mapDipatchToPros(dispatch) {
  return {
    changementVide: () =>
      dispatch({
        type: 'CHANGEMENT_VIDE',
      }),
  };
}

export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(Mapp);
