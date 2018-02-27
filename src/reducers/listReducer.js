function list(state = [], action) {
  switch (action.type) {
    case "ADD": {
      let item = { name: action.name };
      return [...state, item];
    }
    case "REMOVE": {
      let i = state.findIndex(element => {
        return element.id === action.id;
      });
      return [...state.slice(0, i), ...state.slice(i + 1)];
    }
    default:
      return state;
  }
}

function listReducer(state = [], action) {
  return {
    list: list(state.list, action)
  };
}

export default listReducer;
