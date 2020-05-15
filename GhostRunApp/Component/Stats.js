import React, {useEffect} from 'react';
import Dialog from 'react-native-dialog';
import Mapp from './map';
import store from 'react-native-simple-store';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import {data_type_trajet} from './data_type_trajet.js';
import {createStackNavigator} from '@react-navigation/stack';
import PageDetail from './detailTrajet';
import base64 from 'react-native-base64';
import demandeApii from './demandeApi';
import {adresse} from './adresseServ';
import {connect} from 'react-redux';
import mesComposants from './mesComposants';

const Stack = createStackNavigator();

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
function DetailTrajet({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
function Principla({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[
          {
            id: 1,
            title: 'F',
            liste_des_pos: [
              {latitude: 37.73248, longitude: -122.47159000000002},
              {latitude: 37.73263, longitude: -122.47157999999999},
              {latitude: 37.73327, longitude: -122.47153000000002},
              {latitude: 37.73366, longitude: -122.47151000000001},
              {
                latitude: 37.73407833333333,
                longitude: -122.47148999999999,
              },
              {
                latitude: 37.73449666666667,
                longitude: -122.47147166666667,
              },
              {latitude: 37.73478, longitude: -122.47144000000002},
              {latitude: 37.735, longitude: -122.47121999999999},
              {
                latitude: 37.73526833333334,
                longitude: -122.47093000000001,
              },
              {
                latitude: 37.73555833333333,
                longitude: -122.47060000000002,
              },
              {latitude: 37.735905, longitude: -122.47017666666667},
              {
                latitude: 37.73611833333334,
                longitude: -122.46991000000001,
              },
              {latitude: 37.73639, longitude: -122.46959},
              {latitude: 37.73666, longitude: -122.46927},
              {latitude: 37.73688, longitude: -122.46901000000001},
              {latitude: 37.737105, longitude: -122.468715},
              {latitude: 37.7373, longitude: -122.46842999999998},
              {
                latitude: 37.73763333333333,
                longitude: -122.46797166666666,
              },
              {latitude: 37.73770833333333, longitude: -122.46787},
              {latitude: 37.73816, longitude: -122.46733},
              {latitude: 37.738548333333334, longitude: -122.466915},
              {latitude: 37.738839999999996, longitude: -122.46659},
              {latitude: 37.73905, longitude: -122.46634},
              {latitude: 37.73928, longitude: -122.46599999999998},
              {latitude: 37.739450000000005, longitude: -122.46571},
              {latitude: 37.73964, longitude: -122.46526999999999},
              {latitude: 37.73991, longitude: -122.46528000000002},
              {latitude: 37.74018, longitude: -122.46522000000002},
              {latitude: 37.740429999999996, longitude: -122.46515},
              {latitude: 37.740660000000005, longitude: -122.46506},
              {latitude: 37.74088, longitude: -122.46494},
              {latitude: 37.741170000000004, longitude: -122.46476},
              {latitude: 37.74149, longitude: -122.46445999999999},
              {latitude: 37.74181, longitude: -122.46421000000001},
              {latitude: 37.74199, longitude: -122.46409999999999},
              {latitude: 37.742219999999996, longitude: -122.464},
              {latitude: 37.74244, longitude: -122.46391999999999},
              {latitude: 37.74275, longitude: -122.46385000000001},
              {
                latitude: 37.74296833333334,
                longitude: -122.46381000000001,
              },
              {latitude: 37.74333, longitude: -122.46377},
              {
                latitude: 37.743563333333334,
                longitude: -122.46368833333332,
              },
              {latitude: 37.74366, longitude: -122.46354000000001},
              {latitude: 37.7438, longitude: -122.46352},
              {
                latitude: 37.744040000000005,
                longitude: -122.46333000000001,
              },
              {
                latitude: 37.744209999999995,
                longitude: -122.46315000000001,
              },
              {
                latitude: 37.74442333333333,
                longitude: -122.46287833333332,
              },
              {
                latitude: 37.74480166666667,
                longitude: -122.46239666666666,
              },
              {
                latitude: 37.745014999999995,
                longitude: -122.46212500000001,
              },
              {latitude: 37.74535, longitude: -122.4617},
              {latitude: 37.74558833333333, longitude: -122.46139},
              {
                latitude: 37.745803333333335,
                longitude: -122.46111833333335,
              },
              {
                latitude: 37.74601833333334,
                longitude: -122.46084833333335,
              },
              {
                latitude: 37.74623166666667,
                longitude: -122.46057833333334,
              },
              {latitude: 37.74632, longitude: -122.46046999999999},
              {
                latitude: 37.746743333333335,
                longitude: -122.45992333333334,
              },
              {latitude: 37.74693, longitude: -122.45967999999999},
              {latitude: 37.74719, longitude: -122.45934000000001},
              {latitude: 37.747330000000005, longitude: -122.45902},
              {latitude: 37.74757, longitude: -122.45879000000001},
              {
                latitude: 37.747859999999996,
                longitude: -122.45867000000001,
              },
              {
                latitude: 37.748169999999995,
                longitude: -122.45877999999999,
              },
              {latitude: 37.74857, longitude: -122.45919},
              {
                latitude: 37.748979999999996,
                longitude: -122.45959999999998,
              },
            ],
          },
          {
            id: 2,
            title: 'Trajet 2',
            liste_des_pos: [
              {latitude: 37.73248, longitude: -122.47159000000002},
              {latitude: 37.73263, longitude: -122.47157999999999},
              {latitude: 37.73327, longitude: -122.47153000000002},
              {latitude: 37.73366, longitude: -122.47151000000001},
              {
                latitude: 37.73407833333333,
                longitude: -122.47148999999999,
              },
              {
                latitude: 37.73449666666667,
                longitude: -122.47147166666667,
              },
              {latitude: 37.73478, longitude: -122.47144000000002},
              {latitude: 37.735, longitude: -122.47121999999999},
              {
                latitude: 37.73526833333334,
                longitude: -122.47093000000001,
              },
              {
                latitude: 37.73555833333333,
                longitude: -122.47060000000002,
              },
              {latitude: 37.735905, longitude: -122.47017666666667},
              {
                latitude: 37.73611833333334,
                longitude: -122.46991000000001,
              },
              {latitude: 37.73639, longitude: -122.46959},
            ],
          },
        ]}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => this.aficher_un_trajet(item.liste_des_pos)}>
            <Item title={item.title} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity onPress={this.showDialog}>
        <Text>Show Dialog</Text>
      </TouchableOpacity>
      <Dialog.Container visible={this.state.dialogVisible}>
        <Dialog.Title>Ajout d'un trajet</Dialog.Title>
        <Dialog.Description>Ajout d'un trajett</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        <Dialog.Button label="oui" onPress={this.sendtrajet} />
        <Dialog.Input
          label="Trajet"
          onChangeText={trajet => this.setState({trajet})}
        />
      </Dialog.Container>
      <Text> {this.state.trajet} </Text>
    </SafeAreaView>
  );
}

class PageStats extends React.Component {
  constructor() {
    super();
    this.handleCancel = this.handleCancel.bind(this);
    this.sendtrajet = this.sendtrajet.bind(this);
    this.state = {
      dialogVisible: false,
      trajet: '',
      result: '',
      temporaire: '',
      liste_des_trajets: [],
      last_liste: [],
      liste_des_cat: [],
      zone: 'categories',
    };
  }

  showDialog = () => {
    this.setState({dialogVisible: true});
  };
  handleCancel = () => {
    this.setState({dialogVisible: false});
  };

  temps_trajet(trajet) {} // Calcul le temps d'un trajet
  distance_trajet(trajet) {} // Calcul la distance d'un trajet
  vitesse_moy_trajet(trajet) {} // Calcul la vitesse moyenne d'un trajet
  temps_max(trajet) {} // Calcul le temps max pour un même trajet
  temps_min(trajet) {} // Calcul le temps min pour un même trajet
  date_trajet(trajet) {} // Recupere la date du trajet
  afficher_trajet_sur_map(trajet) {} // Affiche le trajet selec sur la carte
  ajout_de_trajet() {}
  sendtrajet() {
    let trajet_title = this.state.trajet;
    const temp_obj = [
      {id: this.state.liste_des_cat.length + 1, title: trajet_title},
    ];
    this.setState({liste_des_cat: this.state.liste_des_cat.concat(temp_obj)});
    function addDanApi() {
      const userString = 'arthur';
      const passwordString = 'arthur';

      fetch('https://0a6b5d0c.ngrok.io/api/' + 'categories' + '/', {
        method: 'POST',
        headers: new Headers({
          Authorization:
            'Basic ' + base64.encode(userString + ':' + passwordString),
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          name: trajet_title,
        }),
      });
    }
    addDanApi();
    this.handleCancel();
  }

  transmettre_id(id, liste) {
    this.props.navigation.navigate('page2', {id: id, trajet: liste});
    //console.log(id_trajet);
    //store.get('test').then(res => console.log(res));
  }
  update_et_chargement_des_cat(liste) {
    console.log(liste);
    for (var i = 0; i < liste.length; i++) {
      const vat_temp = [{id: i, name: liste[i].name}];
      this.setState({liste_des_cat: this.liste_des_cat.concat(vat_temp)});
    }
  }

  UNSAFE_componentWillMount(): void {
    this.props.changementData(
      'GET',
      adresse,
      this.props.state.userCour.utilisateurCourant,
      'arthur',
      'categories',
    );
    this.setState({temporaire: 'wesh'});
    const testto = async () => {
      const data = this.props.state.datatemp;
      const adresse = this.props.state.datatemp.adresse;
      const user = this.props.state.userCour.utilisateurCourant;
      const password = this.props.state.datatemp.password;
      const zone = this.state.zone;
      console.log(this.props);
      console.log('user ' + user);
      console.log('pass ' + password);
      const userString = user.toString();
      const passwordString = user.toString();

      await fetch('https://0a6b5d0c.ngrok.io/api/' + zone + '/', {
        method: 'GET',
        headers: new Headers({
          Authorization:
            'Basic ' + base64.encode(userString + ':' + passwordString),
          'Content-Type': 'application/json',
        }),
      })
        .then(response => response.json())
        .then(result => {
          console.log('voici le resultat de la req');
          console.log(result);
          if (
            result.detail ==
            "Nom d'utilisateur et/ou mot de passe non valide(s)."
          ) {
            console.log('errer');
          } else {
            const requete = result.results;
            this.setState({result: requete});
            for (var i = 0; i < this.state.result.length; i++) {
              const url = this.state.result[i].url;
              const url_taile = url.length;
              const pos_cat = url.search('categories');
              const pos_use = pos_cat + 11;
              const newid_string = url.substring(pos_use, url_taile - 1);
              const newid = parseInt(newid_string);
              console.log('+++++++++++++++++++++++++');
              console.log(newid);
              const temp_obj = [{id: newid, title: this.state.result[i].name}];
              const newstate = this.state.liste_des_cat.concat(temp_obj);
              this.setState({
                liste_des_cat: newstate,
              });
            }
            console.log('wesh la zone');
          }
        })
        .catch(e => {
          console.log('erreur de co !');
        });
      //this.update_et_chargement_des_cat(listee);
    };
    testto();
  }

  render() {
    console.log('voici les props');
    console.log(this.state);
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.liste_des_cat}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.transmettre_id(item.id, item.tout_les_trajets)
              }>
              <Item title={item.title} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity onPress={this.showDialog}>
          <Text>Ajouter une catégorie</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Ajout d'un trajet</Dialog.Title>
          <Dialog.Description>Ajout d'un trajett</Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="oui" onPress={this.sendtrajet} />
          <Dialog.Input
            label="Trajet"
            onChangeText={trajet => this.setState({trajet})}
          />
        </Dialog.Container>
        <Text> {this.state.trajet} </Text>
        <Button
          title={'Reload'}
          onPress={() => {
            fetch('https://0a6b5d0c.ngrok.io/api/localisations/', {
              method: 'POST',
              headers: new Headers({
                Authorization:
                    'Basic ' + base64.encode('arthur' + ':' + 'arthur'),
                'Content-Type': 'application/json',
              }),
              body: JSON.stringify({
                trip: "http://0a6b5d0c.ngrok.io/api/trips/97/",
                latitude: 0,
                longitude: 5,
                altitude: 0,
                timestamp: "2020-05-14T09:10:24.556Z",
              }),
            })
              .then(response => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
              })
              .then((res, result) => {
                console.log(res, result);
              });
          }}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
function mapStateToPros(state) {
  return {
    state,
  };
}
function mapDipatchToPros(dispatch) {
  return {
    changementData: (metode, adresse, user, password, zone) =>
      dispatch({
        type: 'CURRENT_DATA',
        data: {metode, adresse, user, password, zone},
      }),
  };
}

export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(PageStats);
