import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import base64 from 'react-native-base64';
import {adresse} from './adresseServ';
import WebView from 'react-native-webview';
import LoginScreen from './LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
function webviewCractionCompte() {
  return (
    <WebView
      source={{
        uri: 'https://ghostrun.api-d.com/accounts/signup/',
      }}
      style={{marginTop: 20}}
    />
  );
}

const CreationCompteStack = createStackNavigator();
const CreationCompteScreen = () => (
  <NavigationContainer>
    <CreationCompteStack.Navigator>
      <CreationCompteStack.Screen
        name={'page de Login'}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <CreationCompteStack.Screen
        name={"Creation d'un compte"}
        component={webviewCractionCompte}
      />
    </CreationCompteStack.Navigator>
  </NavigationContainer>
);

class ContenuPageLogin extends React.Component {
  render() {
    return <CreationCompteScreen />;
  }
}
export default ContenuPageLogin;
