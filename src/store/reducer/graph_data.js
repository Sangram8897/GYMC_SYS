const _graph_values = {
  data: [],
  max: 0,
  recommended: 0,
  title: ''
}
const initialState = {
  BASED_ON_PACKAGE: {},
  BASED_ON_MONTHS: {},
};

const GraphDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GRAPH_DATA':
      return {
        ...state,
        ... action.payload
      };
    default:
      return state;
  }
}

export default GraphDataReducer;