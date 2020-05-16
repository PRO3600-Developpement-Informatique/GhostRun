import * as React from 'react';
import 'react-native-gesture-handler';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import MesComposants from './Component/mesComposants';
import {adresse} from './Component/adresseServ';

const initialState = {
  utilisateurCourant: 'tsp',
  passwordCourant: 'null',
  estConnecte: false,
  resultatApi: null,
  conteurCourse: 0,
  conteurRun: 0,
};
const inistate = {
  methode: 'GET',
  adresse: adresse,
  password: 'null',
  zone: 'null',
};
const stateTem = {
  trip: '',
};
const stateutil = {
  creactionDeTrajetEnCours: false,

};
const stateutil2 = {
  courseEnCours: false,
};
const reducer = (state = initialState.estConnecte, action) => {
  switch (action.type) {
    case 'CHANGEMENT_DE_STATUE':
      return {
        ...state,
        estConnecte: !state.estConnecte,
      };
  }
  return state;
};
const reducer2 = (state = initialState.utilisateurCourant, action) => {
  switch (action.type) {
    case 'CURRENT_USER':
      return {
        ...state,
        utilisateurCourant: action.data,
      };
  }
  return state;
};
const reducerPass  = (state = initialState.passwordCourant, action) => {
  switch (action.type) {
    case 'CURRENT_PASS':
      return {
        ...state,
        passwordCourant: action.data,
      };
  }
  return state;
};
const reducer3 = (state = initialState.resultatApi, action) => {
  switch (action.type) {
    case 'CURRENT_RESULT':
      return {
        ...state,
        resultatApi: action.data,
      };
  }
  return state;
};
const reducer4 = (state = inistate, action) => {
  switch (action.type) {
    case 'CURRENT_DATA':
      console.log(action);
      return {
        ...state,
        methode: action.data.methode,
        adresse: action.data.adresse,
        password: action.data.password,
        zone: action.data.zone,
      };
  }
  return state;
};
const reducer5 = (state = stateTem, action) => {
  switch (action.type) {
    case 'CHANGEMENT_TRIP':
      return {
        trip: action.data,
      };
  }
  return state;
};
const reducer6 = (state = stateutil2, action) => {
  switch (action.type) {
    case 'CHANGEMENT_COURSE_EN_COURS':
      return {
        courseEnCours: !state.courseEnCours,
      };
  }
  return state;
};
const reducer7 = (state = stateutil, action) => {
  switch (action.type) {
    case 'CREACTION_EN_COURS':
      return {
        creactionDeTrajetEnCours: !state.creactionDeTrajetEnCours,
      };
  }
  return state;
};
const reducerConteurCourse = (state = stateutil, action) => {
  switch (action.type) {
    case 'COMPTEUR_COURSE':
      return {
        conteurCourse: action.data,
      };
  }
  return state;
};
const reducerConteurRun = (state = stateutil, action) => {
  switch (action.type) {
    case 'COMPTEUR_COURSE_INCREMENT':
      return {
        conteurRun: state.conteurRun+ 1,
      };
    case 'RAZ':
      return {
        conteurRun: 0,
      };
  }
  return state;
};
const allRedu = combineReducers({
  estCo: reducer,
  userCour: reducer2,
  passCour: reducerPass,
  resltApi: reducer3,
  datatemp: reducer4,
  newTrip: reducer5,
  creactionTrajet: reducer7,
  creactionCourse: reducer6,
  countCourse: reducerConteurCourse,
  countRun: reducerConteurRun,
});
export const store = createStore(allRedu);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MesComposants />
      </Provider>
    );
  }
}
export const temp = store;
export const salut = 'oui';
export default App;
