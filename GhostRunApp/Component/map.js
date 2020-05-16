import React from 'react';
import {StyleSheet, Platform, AppRegistry, View, Button} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import 'react-native-gesture-handler';
import {mapStyle} from './options.js';
import {connect} from 'react-redux';
import base64 from 'react-native-base64';
import {adresse} from './adresseServ';

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
      password: this.props.state.passCour.passwordCourant,
      creactionTrajetenCours: this.props.state.creactionTrajet
        .creactionDeTrajetEnCours,
      courseEnCours: this.props.state.creactionCourse.courseEnCours,
      count: 0,
      count_affiche:0,
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
      error => console.log('ALEDDD'),
      {
        enableHighAccuracy: true,
        timeout: 200000,
        distanceFilter: 1,
      },
    );
     Geolocation.watchPosition(
      // ce lance a chaque changement (+/- le timeout) de position
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
        const tripp = this.props.state.newTrip.trip;
        //Accualise la valeur pour savoir si on crée un trajet ou non
        this.setState({creactionTrajetenCours: this.props.state.creactionTrajet.creactionDeTrajetEnCours});
        //console.log('Creation de trajet ' + this.state.creactionTrajetenCours)
         if (this.state.creactionTrajetenCours === true){
           //Envoie les donnes des pos a l'api
           console.log(tripp.url)
           this.postDataApiLocalisations(tripp.url);
         }
         this.setState({courseEnCours: this.props.state.creactionCourse.courseEnCours});
        console.log('route')
        console.log(this.props.route)
         if(this.state.courseEnCours === true ){
           this.setState({count: this.state.count + 1});
           this.props.changementCourseRunIncre();
           console.log('count = ' + this.props.state.countRun.conteurRun + 'taille liste = ' + this.props.route.params.liste_des_details_pour_course.length);
           if(this.props.state.countRun.conteurRun < this.props.route.params.liste_des_details_pour_course.length - 1) {
             console.log('count = ' +this.props.state.countRun.conteurRun + 'taille liste = ' +this.props.route.params.liste_des_details_pour_course.length);
             //Actualisation de la position de ghost
             this.setState({latitude_course: this.props.route.params.liste_des_details_pour_course[this.props.state.countRun.conteurRun].latitude});
             this.setState({longitude_course: this.props.route.params.liste_des_details_pour_course[this.props.state.countRun.conteurRun].longitude});
             this.setState({altitude_course: this.props.route.params.liste_des_details_pour_course[this.props.state.countRun.conteurRun].altitude});
           }
           else{
             //code pour arriver du ghost+
             if(this.props.state.countCourse.conteurCourse === 0){
               alert('Le ghost est arrivé avant vous !')
               console.log('ghost arrivé');
               this.props.changementCourseoupas();
             }
             this.props.changementCourseCount(1);
           }
         }

      },
      error => console.log('ALED'),
      {
        enableHighAccuracy: true,
        timeout: 1000,
        distanceFilter: 1,
      },
    );


  }
  postDataApiLocalisations = tripp => {

    var date = new Date();
    const currentTime = date.toJSON();
    //console.log(tripp,this.state.latitude,this.state.longitude,this.state.altitude,currentTime);
    fetch(adresse + 'localisations/', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Basic ' + base64.encode(this.state.user + ':' + this.state.password),
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
      .then(result => {});
    //console.log('je post sa ')
    //console.log(tripp.url,this.state.latitude,this.state.longitude,this.state.altitude,currentTime)
    //console.log('dans');
    //console.log(adresse + 'localisations/')
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
  test_si_course_en_cours_pour_button = () =>{
    if(this.state.courseEnCours === true) {
      return 'Course en cours ...'
}
    else {
      return'Pas de course en cours'
}
}
test_si_trajet_en_cours_pour_button = () =>
{
  if (this.state.creactionTrajetenCours === true) {
    return 'Trajet en cours ...'
  } else {
    return 'Pas de trajet en cours'
  }

}
  render() {
    const text_trajet = this.test_si_trajet_en_cours_pour_button()
    const text_course = this.test_si_course_en_cours_pour_button()
    const mesCord = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    const ghostCord = {
      latitude: this.state.latitude_course,
      longitude: this.state.longitude_course,
    };
    //console.log(this.props);
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
        <View
            style={{
              position: 'absolute',//use absolute position to show button on top of the map
              top: '80%', //for center align
              alignSelf: 'flex-end' //for align to right
            }}
        >
         <Button title={text_trajet} onPress={() => console.log('testo')}/>
          <Button title={text_course} onPress={() => console.log('testo')}/>
        </View>
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
    changementCourseCount: (data) =>
        dispatch({type: 'COMPTEUR_COURSE',data:data}),
    changementCourseRunIncre: () =>
        dispatch({type: 'COMPTEUR_COURSE_INCREMENT'}),
    changementCourseRAZ: () =>
        dispatch({type: 'RAZ'}),
    changementCourseoupas: () =>
  dispatch({type: 'CHANGEMENT_COURSE_EN_COURS'}),

  };
}

export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(Mapp);
