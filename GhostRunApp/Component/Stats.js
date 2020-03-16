import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';

export default class PageStats extends React.Component {
  temps_trajet(trajet) {} // Calcul le temps d'un trajet
  distance_trajet(trajet) {} // Calcul la distance d'un trajet
  vitesse_moy_trajet(trajet) {} // Calcul la vitesse moyenne d'un trajet
  temps_max(trajet) {} // Calcul le temps max pour un même trajet
  temps_min(trajet) {} // Calcul le temps min pour un même trajet
  date_trajet(trajet) {} // Recupere la date du trajet
  afficher_trajet_sur_map(trajet) {} // Affiche le trajet selec sur la carte

  render() {
    return (
      <View>
        <Text>Page des stats !!</Text>
      </View>
    );
  }
}
