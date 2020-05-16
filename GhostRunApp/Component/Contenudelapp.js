import * as React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PageOptions from './options';
import PageStats from './Stats';
import Mapp from './map';
import PageDetail from './detailTrajet';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import base64 from 'react-native-base64';
import {useState} from 'react';
import demandeApii from './demandeApi';

const Tab = createBottomTabNavigator(); // Creation d'un tableau pour la navigation entre les pages
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const contextDeConnection = React.createContext();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="page1"
      component={PageStats}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen name="Detail de vos trajets" component={PageDetail} />
  </HomeStack.Navigator>
);

function Contenu() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeBackgroundColor: '#865138',
          inactiveBackgroundColor: '#866252',
          showImages: 'True',
        }}>
        <Tab.Screen // Chaque page a son tab.screen avec ces options ( comme l'icon ou le nom )
          name="Carte"
          component={Mapp}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 30, height: 30}}
                source={require('./icon/m.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Categories"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 30, height: 30}}
                source={require('./icon/r.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Options"
          component={PageOptions}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 30, height: 30}}
                source={require('./icon/s.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

class ContenuApp extends React.Component {
  render() {
    return <Contenu />;
  }
}

function mapStateToPros(state) {
  return {
    currentEmail: state.currentEmail,
  };
}
function mapDipatchToPros(dispatch) {
  return {
    changementDeStatue: () => dispatch({type: 'CHANGEMENT_DE_STATUE'}),
  };
}
export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(ContenuApp);
