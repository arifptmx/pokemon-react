export const initialState = {
  setName: {
    name: '',
    seq: ''
  }
}

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return state.setName = action.setName
    default:
      return state
  }
}

export default pokemonReducer;