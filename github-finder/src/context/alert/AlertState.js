import { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

import React from "react";

const AlertState = (props) => {
  const initialState = null; //directly using state to store data since it has only a single value

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set alert
  const setAlert = (message, typeOfAlert) => {
    dispatch({ type: SET_ALERT, payload: { message, typeOfAlert } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
