const initState = { arrival: null, departure: null };

const dateReducer = (state = initState, action) => {
  switch (action.type) {
    case "DATE_SUCCESS":
      return {
        ...action.data,
      };
    case "DATE_ERROR":
      console.log(action.err);
      return state;
    default:
      return state;
  }
};

export default dateReducer;
