import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PageOptions from './Component/options';
import PageStats from './Component/stats';
import Mapp from './Component/map';

const Tab = createBottomTabNavigator(); // Creation d'un tableau pour la navigation entre les pages

export default function App() {
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
              <Image style={{width: 30, height: 30}} source={require('./Component/icon/m.png')}/>),}}
        />
        <Tab.Screen
          name="Statistiques"
          component={PageStats}
          options={{
            tabBarIcon: ({color}) => (
              <Image style={{width: 30, height: 30}} source={require('./Component/icon/r.png')}/>),
          }}
        />
        <Tab.Screen
          name="Options"
          component={PageOptions}
          options={{
            tabBarIcon: ({color}) => (
              <Image style={{width: 30, height: 30}} source={require('./Component/icon/s.png')}/>),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
