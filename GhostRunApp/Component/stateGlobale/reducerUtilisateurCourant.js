const initialState = {
  utilisateurCourant: 'tsp',
  estConnecte: false,
};
const userCorant = (state = initialState, action) => {
  switch (action.type) {
    case 'UTILISATEUR_COURANT':
      return {utilisateurCourant: 'test'};
    default:
      return state;
  }
};
export default userCorant;
