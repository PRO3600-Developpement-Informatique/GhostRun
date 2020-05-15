import React from 'react';
import Dialog from 'react-native-dialog';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TouchableHighlight,
} from 'react-native';
import base64 from 'react-native-base64';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import {adresse} from './adresseServ';

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

class PageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [],
      tabtest: [],
      temp: {},
      result: [],
      liste_vers_map: [],
      estVide: false,
      dialogVisible: false,
      text: '',
      user: this.props.state.userCour.utilisateurCourant,
      password: this.props.state.datatemp.password,
      trips: '',
      mode_de_transport: 'walk',
    };
  }
  showDialog = () => {
    this.setState({dialogVisible: true});
  };
  handleCancel = () => {
    this.setState({dialogVisible: false});
  };
  componentWillUnmount(): void {
    this.handleCancel();
    console.log('demontage');
  }

  UNSAFE_componentWillMount(): void {
    {
      const user = this.props.state.userCour.utilisateurCourant;
      const userString = user.toString();
      const passwordString = user.toString();
      const testo = async () => {
        await fetch(
          adresse + 'categories/' +
            this.props.route.params.id +
            '/',
          {
            method: 'GET',
            headers: new Headers({
              Authorization:
                'Basic ' + base64.encode(userString + ':' + passwordString),
              'Content-Type': 'application/json',
            }),
          },
        )
          .then(response => response.json())
          .then(result => {
            console.log('voici le resultat de la req');
            console.log(result);
            if (
              result.detail ===
              "Nom d'utilisateur et/ou mot de passe non valide(s)."
            ) {
              console.log('je passe if');
              console.log('errer');
            } else if (
              result.detail == 'Pas trouvé.' ||
              result.trips.length === 0
            ) {
              console.log('je passe else if');
              this.setState({estVide: true});
              //this.props.changementVide();
              console.log('JE SUIS VIDE ' + this.state.estVide);
            } else {
              console.log('je passe else');
              const requete = result.trips;
              this.setState({result: requete});
              for (var i = 0; i < this.state.result.length; i++) {
                const date = new Date(this.state.result[i].started_at);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const dt = date.getDate();
                if (dt < 10) {
                  const dt = '0' + dt;
                }
                if (month < 10) {
                  const month = '0' + month;
                }
                const newdate =
                  'Trajet fait le : ' + year + '-' + month + '-' + dt;

                const url = this.state.result[i].url;
                const url_taile = url.length;
                const pos_cat = url.search('trips');
                const pos_use = pos_cat + 6;
                const newid_string = url.substring(pos_use, url_taile - 1);
                const newid = parseInt(newid_string);

                const temp_obj = [{id: i, title: newdate}];
                const temp_obj_test = [
                  {
                    name: newdate,
                    mode: this.state.result[i].transport_used,
                    id: newid,
                  },
                ];
                const newstate = this.state.tab.concat(temp_obj);
                const newstatetest = this.state.tabtest.concat(temp_obj_test);
                this.setState({tab: newstate});
                this.setState({tabtest: newstatetest});
              }
            }
          })
          .catch(e => {
            console.log('erreur de co !');
          });
      };

      testo();
      console.log('OUIiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiI');
      console.log(this.state.tabtest);
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          this.onPressSendToMap_pour_start_course();
          //this.props.navigation.navigate('Carte', {liste_des_details: aSend,});
        }}>
        <ListItem
          title={item.mode}
          subtitle={item.name}
          leftAvatar={{
            source: {
              uri: 'https://image.flaticon.com/icons/png/128/10/10624.png',
            },
          }}
          bottomDivider
          chevron
        />
      </TouchableHighlight>
    </View>
  );

  onPressSendToMap_pour_start_course = async () => {
    for (var i = 0; i < this.state.result.length; i++) {
      const lesLocalisations = this.state.result[i].localisations;
      for (var j = 0; j < lesLocalisations.length; j++) {
        await fetch(lesLocalisations[j], {
          method: 'GET',
          headers: new Headers({
            Authorization: 'Basic ' + base64.encode('arthur' + ':' + 'arthur'),
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
              const requete = result;
              const temp_obj = [
                {
                  latitude: requete.latitude,
                  longitude: requete.longitude,
                  timestamp: requete.timestamp,
                },
              ];
              this.setState({
                liste_vers_map: this.state.liste_vers_map.concat(temp_obj),
              });
            }
          })
          .catch(e => {
            console.log('erreur de co !');
          });
      }
    }
    console.log('Voilalaaa');
    console.log(this.state.liste_vers_map);
    this.props.navigation.navigate('Carte', {
      liste_des_details_pour_course: this.state.liste_vers_map,
    });
    this.props.changementCourseEnCours();
  };
  onPressDebutTrajet = () => {
    this.props.changementEtatCreactionTrajet();
    var date = new Date();
    const currentTime = date.toJSON();
    const categorie =adresse+
      '/categories/' +
      this.props.route.params.id +
      '/';
    fetch(adresse + 'trips/', {
      method: 'POST',
      headers: new Headers({
        Authorization:
          'Basic ' + base64.encode(this.state.user + ':' + this.state.password),
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        started_at: currentTime,
        transport_used: 'walk',
        category: categorie,
      }),
    })
      .then(response => response.json())
      .then(result => {
        const url_du_trip = result.url;
        this.props.changementTrip(url_du_trip);
      });
    //this.props.navigation.navigate('Carte');
  };
  onPressFinTrajet = () => {
    this.props.changementEtatCreactionTrajet();
  };

  render() {
    return (
      <View>
        {this.state.estVide === true ? (
          <View>
            <Button
              title={'Pas encore de trajet ? '}
              onPress={() => {
                this.showDialog();
              }}
            />
            <Button
              title={'Cliquer moi pour finir le trajet en cours !'}
              onPress={() => {
                this.onPressFinTrajet();
              }}
            />
            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Ajout d'un trajet</Dialog.Title>
              <Dialog.Description>Ajout d'un trajett</Dialog.Description>
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
              <Dialog.Button
                label="oui"
                onPress={() => {
                  this.handleCancel();
                  this.onPressDebutTrajet();
                }}
              />
              <Picker
                selectedValue={this.state.mode_de_transport}
                style={{height: 50, width: 10}}
                onValueChange={(itemValue, itemIndex) => console.log(itemValue)
                }>
                <Picker.Item label="Marche" value="walk" />
                <Picker.Item label="Course" value="run" />
                <Picker.Item label="Voiture" value="car" />
                <Picker.Item label="Moto/Scooter" value="motorbike" />
                <Picker.Item label="Taxi" value="taxi" />
                <Picker.Item label="Uber Pool" value="rideshare" />
                <Picker.Item label="Blablacar" value="carpool" />
                <Picker.Item label="Bus" value="bus" />
                <Picker.Item label="Vélo" value="bike" />
                <Picker.Item label="Bateau" value="boat" />
                <Picker.Item label="Train" value="train" />
                <Picker.Item label="RER" value="rer" />
                <Picker.Item label="Avion" value="plane" />
                <Picker.Item label="Kayak" value="kayak" />
              </Picker>
            </Dialog.Container>
          </View>
        ) : (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.tabtest}
              renderItem={this.renderItem}
            />
            <View>
              <Button
                title={'Debuter un trajet ! '}
                onPress={() => {
                  this.onPressDebutTrajet();
                }}
              />
              <Button
                title={'Fin du trajet ! '}
                onPress={() => {
                  this.onPressFinTrajet();
                }}
              />
            </View>
          </View>
        )}
      </View>
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

export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(PageDetail);
