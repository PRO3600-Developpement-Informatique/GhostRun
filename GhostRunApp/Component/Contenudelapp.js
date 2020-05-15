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
import store from 'react-native-simple-store';
import base64 from 'react-native-base64';
import {useState} from 'react';
import demandeApii from './demandeApi';

const Tab = createBottomTabNavigator(); // Creation d'un tableau pour la navigation entre les pages
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const contextDeConnection = React.createContext();
const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="page1" component={PageStats} />
    <HomeStack.Screen name="page2" component={PageDetail} />
  </HomeStack.Navigator>
);
const HomeStackScreen2 = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="page3" component={LoginScreen} />
    <HomeStack.Screen name="page4" component={Mapp} />
    <HomeStack.Screen name="page4" component={demandeApii} />
  </HomeStack.Navigator>
);
function sendDataToApi(user, password) {
  const userString = user.toString();
  const passwordString = password.toString();
  const [error, setError] = useState(false);
  fetch('https://43c7606f.ngrok.io/api/', {
    method: 'GET',
    headers: new Headers({
      Authorization:
        'Basic ' + base64.encode(userString + ':' + passwordString),
      'Content-Type': 'application/json',
    }),
  })
    .then(response => response.json())
    .then(result => {
      if (result.detail == 'Invalid username/password.') {
        setError(true);
      } else {
        setError(false);
      }
    })
    .catch(e => {
      setError(true);
    });
  return error;
}

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
          name="Statistiques"
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
function LoginScreen() {
  const {connecter} = React.useContext(contextDeConnection);
  const {erreurtest} = React.useContext(contextDeConnection);
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [emty, setemty] = React.useState(false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#003f5c',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      fontWeight: 'bold',
      fontSize: 50,
      color: '#fb5b5a',
      marginBottom: 40,
    },
    inputView: {
      width: '80%',
      backgroundColor: '#465881',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      justifyContent: 'center',
      padding: 20,
    },
    inputText: {
      height: 50,
      color: 'white',
    },
    forgot: {
      color: 'white',
      fontSize: 11,
    },
    loginBtn: {
      width: '80%',
      backgroundColor: '#fb5b5a',
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginBottom: 10,
    },
    loginText: {
      color: 'white',
    },
  });
  const [erreur, setErreur] = React.useState(false);
  const temp = sendDataToApi(email, password);
  React.useMemo(() => setErreur(temp), [temp]);
  function testErreur() {
    if (erreur == false) {
      connecter();
    } else {
      Alert.alert("Ce compte n'existe pas !");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GhostRun</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setemail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setpassword(text)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => testErreur()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
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
