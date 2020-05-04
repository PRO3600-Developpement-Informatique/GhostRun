import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
export default class PageOptions extends React.Component {
  changer_style_map() {} // Change le theme de la carte mode jour->mode nuit ou inversement
  render() {
    console.log(this.props.route);
    return (
      <View>
        <Text>test</Text>
      </View>
    );
  }
}
