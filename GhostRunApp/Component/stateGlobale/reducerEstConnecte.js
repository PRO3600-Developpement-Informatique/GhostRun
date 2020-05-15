const initialState = {
  utilisateurCourant: 'tsp',
  estConnecte: false,
};
const reducerEstCo = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGEMENT_DE_STATUE':
      return {estConnecte: !state.estConnecte};
  }
  return state;
};
export default reducerEstCo;
