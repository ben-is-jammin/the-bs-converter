const appReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_HISTORY':
        return [action.payload, ...state];
      default:
        return state;
    }
  };
  
  export default appReducer;
  