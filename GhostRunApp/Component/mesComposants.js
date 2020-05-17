import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import LoginScreen from './LoginScreen';
import ContenuApp from './Contenudelapp';
import {connect, useSelector, useDispatch} from 'react-redux';
import base64 from 'react-native-base64';
import App from '../App';
import temp from '../App';
const AuthContext = React.createContext();
import ContenuPageLogin from './contenuPageLogin';

class MesComposants extends React.Component {
  static demandeApii = () => {
    console.log('this.props');
    console.log(temp.React.getState());
  };

  render() {
    function testtt() {
      console.log('testt');
    }
    const authContext = false;
    console.log(this.props.state.estCo.estConnecte);
    const test = this.props.state.estCo.estConnecte;
    return (
      <AuthContext.Provider value={authContext}>
        {test ? <ContenuApp /> : <ContenuPageLogin />}
      </AuthContext.Provider>
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
    chargementRequete: data => dispatch({type: 'CURRENT_RESULT', data: data}),
  };
}
export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(MesComposants);
