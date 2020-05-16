import React from 'react';
import Dialog from 'react-native-dialog';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import base64 from 'react-native-base64';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import {adresse} from './adresseServ';
import DialogContainer from 'react-native-dialog/src/Container';

var icon_mode = {
  bike: require('./icon/bike.png'),
  car: require('./icon/car.png'),
  motobike: require('./icon/motobike.png'),
  rer: require('./icon/rer.png'),
  run: require('./icon/run.png'),
  walk: require('./icon/walk.png'),
};

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
      dialogVisible2: false,
      text: '',
      user: this.props.state.userCour.utilisateurCourant,
      password: this.props.state.passCour.passwordCourant,
      trips: '',
      mode_de_transport: 'walk',
      current_trip: '',
      trip_a_supp: [],
      resultTemp: [],
      tempItem: null,
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
          adresse + 'categories/' + this.props.route.params.id + '/',
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
              console.log(requete);
              this.setState({result: requete});
              for (var i = 0; i < this.state.result.length; i++) {
                const date = new Date(this.state.result[i].started_at);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const dt = date.getDate();
                const heurs = date.getHours();
                const minu = date.getMinutes();
                if (dt < 10) {
                  const dt = '0' + dt;
                }
                if (month < 10) {
                  const month = '0' + month;
                }
                const newdate =
                  'Trajet fait le : ' +
                  year +
                  '-' +
                  month +
                  '-' +
                  dt +
                  ' à ' +
                  heurs +
                  ':' +
                  minu;

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
                console.log(newstatetest);
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
  onLongPress_supprimer_un_trip = id_de_trajet => {
    const id_trajet_a_supp = id_de_trajet;
    const url_trip_a_supp = adresse + 'trips' + '/' + id_trajet_a_supp + '/';

    fetch(url_trip_a_supp, {
      method: 'DELETE',
      headers: new Headers({
        Authorization:
          'Basic ' + base64.encode(this.state.user + ':' + this.state.password),
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.status)
      .then(result => {
        console.log('j ai bien supprimer la cat');
        console.log(result);
      });
    for (var i = 0; i < this.state.tabtest.length; i++) {
      console.log(this.state.tabtest[i].id);
      if (this.state.tabtest[i].id === id_trajet_a_supp) {
        console.log('gleif');

        this.setState({trip_a_supp: this.state.tabtest[i]});
        break;
      }
    }
    console.log(this.state.trip_a_supp);

    const post_du_trip_a_supprime = this.state.tabtest.indexOf(
      this.state.trip_a_supp,
    );
    console.log('unde?');
    console.log(post_du_trip_a_supprime);
    console.log(this.state.tabtest);
    this.state.tabtest.splice(post_du_trip_a_supprime, 1);
    this.setState({tabtest: this.state.tabtest});
  };

  renderItem = ({item}) => (
    <View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          this.setState({tempItem: item});
          this.showDialog2();
        }}>
        <ListItem
          title={item.mode}
          subtitle={item.name}
          leftAvatar={{source: icon_mode[item.mode]}}
          bottomDivider
          chevron
        />
      </TouchableHighlight>
      <Dialog.Container visible={this.state.dialogVisible2}>
        <Dialog.Title>Que voulez vous faire avec ce trajet ?</Dialog.Title>
        <Dialog.Button
          label="Le supprimer"
          onPress={() => {
            this.onLongPress_supprimer_un_trip(this.state.tempItem.id);
            this.handleCancel2();
          }}
        />
        <Dialog.Button
          label="Faire une course !"
          onPress={() => {
            this.showDialog();
            this.onPressSendToMap_pour_start_course(this.state.tempItem.id);
            this.handleCancel2();
          }}
        />
        <Dialog.Button
          label="Rien"
          onPress={() => {
            console.log(this.state.tempItem.id);
            this.handleCancel2();
          }}
        />
      </Dialog.Container>
    </View>
  );

  onPressSendToMap_pour_start_course = async id_trip => {
    this.props.changementCourseCount(0);
    this.props.changementCourseRAZ();

     await fetch(adresse + 'trips/' + id_trip + '/', {
      method: 'GET',
      headers: new Headers({
        Authorization:
          'Basic ' + base64.encode(this.state.user + ':' + this.state.password),
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (
          result.detail == "Nom d'utilisateur et/ou mot de passe non valide(s)."
        ) {
          console.log('errer');
        } else {
          this.setState({resultTemp: result});

        }
      })
      .catch(e => {
        console.log('erreur de co !');
      });
    console.log('je lance sa')
    console.log(this.state)

    for (var i = 0; i < this.state.resultTemp.localisations.length; i++) {
      console.log(i)
      await fetch(this.state.resultTemp.localisations[i], {
        method: 'GET',
        headers: new Headers({
          Authorization:
            'Basic ' +
            base64.encode(this.state.user + ':' + this.state.password),
          'Content-Type': 'application/json',
        }),
      })
        .then(response => response.json())
        .then(result => {
          const requete = result;
          const temp_obj = [
            {
              latitude: requete.latitude,
              longitude: requete.longitude,
              timestamp: requete.timestamp,
            },
          ];
          console.log('temp_obj')
          console.log(temp_obj)
          this.setState({
            liste_vers_map: this.state.liste_vers_map.concat(temp_obj),
          });
        });
    }

    this.props.navigation.navigate('Carte', {
      liste_des_details_pour_course: this.state.liste_vers_map,
    });
    this.props.changementCourseEnCours();
  };
  onPressDebutTrajet = () => {
    this.props.changementEtatCreactionTrajet();
    var date = new Date();
    const currentTime = date.toJSON();
    const categorie =
      adresse + 'categories/' + this.props.route.params.id + '/';
    fetch(adresse + 'trips/', {
      method: 'POST',
      headers: new Headers({
        Authorization:
          'Basic ' + base64.encode(this.state.user + ':' + this.state.password),
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        started_at: currentTime,
        transport_used: this.state.mode_de_transport,
        category: categorie,
      }),
    })
      .then(response => response.json())
      .then(result => {
        const url_du_trip = result.url;
        this.setState({current_trip: result});
        this.props.changementTrip(result);

        //concat
      });
    //this.props.navigation.navigate('Carte');
  };
  onPressFinTrajet = () => {
    const date = new Date(this.state.current_trip.started_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    const heurs = date.getHours();
    const minu = date.getMinutes();
    if (dt < 10) {
      const dt = '0' + dt;
    }
    if (month < 10) {
      const month = '0' + month;
    }
    const newdate =
      'Trajet fait le : ' +
      year +
      '-' +
      month +
      '-' +
      dt +
      ' à ' +
      heurs +
      ':' +
      minu;

    const url = this.state.current_trip.url;
    const url_taile = url.length;
    const pos_cat = url.search('trips');
    const pos_use = pos_cat + 6;
    const newid_string = url.substring(pos_use, url_taile - 1);
    const newid = parseInt(newid_string);
    const temp_obj_test = [
      {
        name: newdate,
        mode: this.state.current_trip.transport_used,
        id: newid,
      },
    ];
    const newtrip_to_add_render = this.state.tabtest.concat(temp_obj_test);
    this.setState({tabtest: newtrip_to_add_render});
    this.props.changementEtatCreactionTrajet();
  };

  render() {
    return (
      <View>
        <ScrollView>
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
                    alert(
                      'Vous pouvez commencer a bouger, nous enrengirons tout, à la fin du trajet cliquez sur le bouton juste en dessous !',
                    );
                    this.handleCancel();
                    this.onPressDebutTrajet();
                  }}
                />
                <Picker
                  selectedValue={this.state.mode_de_transport}
                  style={{height: 100, width: 300}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({mode_de_transport: itemValue})
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
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                data={this.state.tabtest}
                renderItem={this.renderItem}
              />
              <View>
                <Dialog.Container visible={this.state.dialogVisible}>
                  <Dialog.Title>Ajout d'un trajet</Dialog.Title>
                  <Dialog.Description>Ajout d'un trajett</Dialog.Description>
                  <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                  <Dialog.Button
                    label="oui"
                    onPress={() => {
                      alert(
                        'Vous pouvez commencer a bouger, nous enrengirons tout, à la fin du trajet cliquez sur le bouton juste en dessous !',
                      );
                      this.handleCancel();
                      this.onPressDebutTrajet();
                    }}
                  />
                  <Picker
                    selectedValue={this.state.mode_de_transport}
                    style={{height: 100, width: 300}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({mode_de_transport: itemValue})
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
                <Button
                  title={'Debuter un trajet ! '}
                  onPress={() => {
                    this.showDialog();
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
        </ScrollView>
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
    changementCourseCount: data =>
      dispatch({type: 'COMPTEUR_COURSE', data: data}),
    changementCourseRAZ: () => dispatch({type: 'RAZ'}),
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
