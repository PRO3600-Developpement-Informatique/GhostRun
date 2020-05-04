import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import {data_du_type_de_trajet} from './data_du_type_trajet';
import {useIsFocused} from '@react-navigation/native';

export default class PageDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [],
      temp: {},
    };
  }
  get_liste_pour_data() {
    let data_liste = {key:null};
    let data_tempp = {key:null};
    for (const i in this.props.route.params.trajet) {
      data_liste = [{key: this.props.route.params.trajet[i].mode}].concat(data_liste);
    }
    return data_liste;
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.get_liste_pour_data()}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
      </View>
    );
  }
}
