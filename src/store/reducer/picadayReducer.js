const initialState = {
    lattitude: null,
    logitude: null,
    picadays: [],
    error: ''
  };
  const PicadaysReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PIC_A_DAY_LIST':
        return {
          ...state,
          picadays: action.payload
        };
      case 'SET_LAT_LAG':
        return {
          ...state,
          lattitude: action.lattitude,
          logitude: action.logitude
        };
      default:
        return state;
    }
  }
  export default PicadaysReducer;