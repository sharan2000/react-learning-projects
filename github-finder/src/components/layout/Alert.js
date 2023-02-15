import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

export default function Alert() {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  return (
    alertContext.alert !== null && (
      <div className={`alert alert-${alert.typeOfAlert}`}>
        <i className='fas fa-info-circle' /> &nbsp;
        {alert.message}
      </div>
    )
  );
}
