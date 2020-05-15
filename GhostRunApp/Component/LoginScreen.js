import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import base64 from 'react-native-base64';
import {adresse} from './adresseServ';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      erreur: false,
    };
  }

  verifAccount(user, password) {
    const userString = user.toString();
    const passwordString = password.toString();
    const error = true;
    console.log('adresse ' + adresse);
    fetch(adresse, {
      method: 'GET',
      headers: new Headers({
        Authorization:
          'Basic ' + base64.encode(userString + ':' + passwordString),
        'Content-Type': 'application/json',
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.detail == 'Invalid username/password.') {
          console.log('Invalid usermane');
          this.setState({erreur: true});
          console.log('dans la fonction ' + this.state.erreur);
        } else {
          this.setState({erreur: false});
          console.log('dans la fonction ' + this.state.erreur);
        }
      })
      .catch(e => {
        console.log('erreur de co');
        this.setState({erreur: true});
        console.log('dans la fonction ' + this.state.erreur);
      });
    console.log(this.state.error + ' GFINI');
  }
  render() {
    //console.log(this.props.estConnecte);
    this.verifAccount(this.state.email, this.state.password);
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>GhostRun</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password: text})}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            console.log('ERROR= ' + this.state.erreur);
            if (this.state.erreur == false) {
              this.props.utilisateurCourant(this.state.email);
              this.props.changementDeStatue();
            } else {
              Alert.alert('Compte non existant');
            }
          }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToPros(state) {
  console.log('salut');
  return {
    estConnecte: state.estConnecte,
    utilisateurCourant: state.utilisateurCourant,
  };
}
function mapDipatchToPros(dispatch) {
  return {
    utilisateurCourant: userMail =>
      dispatch({type: 'CURRENT_USER', data: userMail}),
    changementDeStatue: () => dispatch({type: 'CHANGEMENT_DE_STATUE'}),
  };
}
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

export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(LoginScreen);
