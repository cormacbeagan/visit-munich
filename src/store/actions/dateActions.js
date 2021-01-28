export const setDates = (dates) => {
  return (dispatch, getState) => {
    dispatch({ type: "DATE_SUCCESS", data: { dates: dates } });
  };
};
