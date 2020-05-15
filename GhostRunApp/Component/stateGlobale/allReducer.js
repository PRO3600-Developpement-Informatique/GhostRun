import reducerEstCo from './reducerEstConnecte';
import userCorant from './reducerUtilisateurCourant';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  estCo: reducerEstCo,
  userCour: userCorant,
});
export default allReducers;
