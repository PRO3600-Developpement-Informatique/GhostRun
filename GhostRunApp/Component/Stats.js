import React from 'react';
import Dialog from 'react-native-dialog';
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
import {createStackNavigator} from '@react-navigation/stack';
import base64 from 'react-native-base64';
import {adresse} from './adresseServ';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
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

      fetch(adresse + 'categories' + '/', {
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
    this.forceUpdate();

  }

  transmettre_id(id, liste) {
    this.props.navigation.navigate('Detail de vos trajets', {id: id, trajet: liste});
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
      const user = this.props.state.userCour.utilisateurCourant;
      const password = this.props.state.datatemp.password;
      const zone = this.state.zone;
      console.log(this.props);
      console.log('user ' + user);
      console.log('pass ' + password);
      const userString = user.toString();
      const passwordString = user.toString();

      await fetch(adresse + zone + '/', {
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
    changementData: (metode, adressee, user, password, zone) =>
      dispatch({
        type: 'CURRENT_DATA',
        data: {metode, adressee, user, password, zone},
      }),
  };
}

export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(PageStats);
