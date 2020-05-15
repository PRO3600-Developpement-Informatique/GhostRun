import base64 from 'react-native-base64';
import React, {useState} from 'react';
import {connect} from 'react-redux';

function demandeApii() {
  console.log('marche');
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
console.log(this.props);
export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(demandeApii);
