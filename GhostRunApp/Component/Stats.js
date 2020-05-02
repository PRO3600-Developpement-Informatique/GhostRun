import React from 'react';
import Dialog from 'react-native-dialog';
import {AsyncStorage} from 'react-native';
import store from 'react-native-simple-store';

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
import {DATA} from './data.js';

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class PageStats extends React.Component {
  constructor() {
    super();
    this.handleCancel = this.handleCancel.bind(this);
    this.sendtrajet = this.sendtrajet.bind(this);
  }
  state = {
    dialogVisible: false,
    trajet: '',
    result: '',
    temporaire: '',
    liste_des_trajets: [],
    last_liste: [],
  };

  showDialog = () => {
    this.setState({dialogVisible: true});
  };
  handleCancel = () => {
    this.setState({dialogVisible: false});
  };
  setData = async (cle, valeur) => {
    try {
      await AsyncStorage.setItem(cle, valeur);
    } catch (e) {
      console.log(e);
    }
  };
  getData = async cle => {
    try {
      let Dataget = await AsyncStorage.getItem(cle);
      this.setState({temporaire: Dataget});
    } catch (e) {
      console.log(e);
    }
  };
  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
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
    //this.setState({iste_des_trajets: this.state.last_liste});
    let id_trajet_temp = this.state.liste_des_trajets;
    let id_trajet = id_trajet_temp.length + 1;
    let trajet_title = this.state.trajet;
    let data_trajet = {id: id_trajet, title: trajet_title};
    console.log(data_trajet);
    this.setState({
      liste_des_trajets: this.state.liste_des_trajets.concat(data_trajet),
    });
    console.log(this.state.liste_des_trajets);
    let tempp = this.state.liste_des_trajets;
    console.log(tempp);
    //store.update('cle_liste_trajets', tempp);
    //store.get('cle_liste_trajets').then(res => this.setState({last_liste: res}));
    console.log(this.state.last_liste);
    this.handleCancel();
    //let temporaire_int = parseInt(this.state.temporaire);
    //let newvaleurr = temporaire_int + 1;
    //let newvaleur = newvaleurr.toString();
    //this.setData('cle', newvaleur);
    //this.importData();
  }

  // let trajet_data = [{id: {newvaleur}, title: 'test'}];
  // console.log(trajet_data);
  //console.log(newvaleur);
  //AsyncStorage.clear();

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.liste_des_trajets}
          renderItem={({item}) => <Item title={item.title} />}
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
