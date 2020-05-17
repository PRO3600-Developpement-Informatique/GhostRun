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
  TouchableHighlight,
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
      dialogVisible2: false,
      trajet: '',
      result: '',
      temporaire: '',
      liste_des_trajets: [],
      last_liste: [],
      liste_des_cat: [],
      zone: 'categories',
      currentIditem: null,
      currentTitileitem: '',
      usera: '',
      password: '',
    };
  }

  showDialog = () => {
    this.setState({dialogVisible: true});
  };
  handleCancel = () => {
    this.setState({dialogVisible: false});
  };
  showDialog2 = () => {
    this.setState({dialogVisible2: true});
  };
  handleCancel2 = () => {
    this.setState({dialogVisible2: false});
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

    const userString = this.props.state.userCour.utilisateurCourant.toString();
    const passwordString = this.props.state.passCour.passwordCourant.toString();

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

    this.handleCancel();
  }

  transmettre_id(id, liste) {
    this.props.navigation.navigate('Detail de vos trajets', {
      id: id,
      trajet: liste,
    });
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
    const testto = async () => {
      const data = this.props.state.datatemp;
      const user = this.props.state.userCour.utilisateurCourant;
      const password = this.props.state.passCour.passwordCourant;
      const zone = this.state.zone;
      console.log(this.props);
      console.log('user ' + user);
      console.log('pass ' + password);
      const userString = user.toString();
      const passwordString = password.toString();
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
          console.log()
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
              const temp_obj = [{id: newid, title: this.state.result[i].name}];
              console.log(temp_obj);
              const newstate = this.state.liste_des_cat.concat(temp_obj);
              console.log('newstate');
              console.log(newstate);
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
  onLongPress_supprimer_une_cat = (id_de_cat, nom_cat) => {
    const id_cat_a_supp = id_de_cat;
    const cat_a_supp = {id: id_cat_a_supp, title: nom_cat};
    const url_cat_a_supp = adresse + 'categories' + '/' + id_cat_a_supp + '/';
    console.log(
      'je tente de supp :' + adresse + 'categories' + '/' + id_cat_a_supp + '/',
    );
    console.log('liste des catt act:');
    console.log(this.state.liste_des_cat);

    fetch(url_cat_a_supp, {
      method: 'DELETE',
      headers: new Headers({
        Authorization:
          'Basic ' +
          base64.encode(
            this.props.state.userCour.utilisateurCourant +
              ':' +
              this.props.state.passCour.passwordCourant,
          ),
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.status)
      .then(result => {
        console.log('j ai bien supprimer la cat');
        console.log(result);
      });

    const post_de_la_cat_a_supprime = this.state.liste_des_cat.indexOf(
      cat_a_supp,
    );
    const curr = this.state.liste_des_cat;
    curr.splice(post_de_la_cat_a_supprime, 1);
    this.setState({liste_des_cat: this.state.liste_des_cat});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          delayLongPress={500}
          extraData={this.state}
          data={this.state.liste_des_cat}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.transmettre_id(item.id, item.tout_les_trajets)
              }
              onLongPress={() => {
                this.onLongPress_supprimer_une_cat(item.id, item.title);
              }}>
              <Item title={item.title} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        <Button
          title={'Ajouter une nouvelle categorie !'}
          onPress={this.showDialog}
        />
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Ajout d'un trajet</Dialog.Title>
          <Dialog.Button
            label="Finalement j'ai changé d'avis"
            onPress={() => {
              console.log('ICI');
              console.log(this.props);
              this.handleCancel();
              this.forceUpdate();
            }}
          />
          <Dialog.Button label="Ajouter" onPress={this.sendtrajet} />
          <Dialog.Button label="Supprimer" onPress={() => {}} />
          <Dialog.Input
            label="Maison - Gare"
            onChangeText={trajet => this.setState({trajet})}
          />
        </Dialog.Container>
      </SafeAreaView>
    );
  }
}

function mapStateToPros(state) {
  return {
    state,
  };
}
function mapDipatchToPros(dispatch) {
  return {
    changementTrip: data =>
      dispatch({
        type: 'CHANGEMENT_TRIP',
        data: data,
      }),
    changementEtatCreactionTrajet: () => dispatch({type: 'CREACTION_EN_COURS'}),
    changementCourseEnCours: () =>
      dispatch({type: 'CHANGEMENT_COURSE_EN_COURS'}),
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#21627f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(PageStats);
