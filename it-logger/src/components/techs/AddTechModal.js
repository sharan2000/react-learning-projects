import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";

import { connect } from "react-redux";
import { addTech } from "../../actions/techActions";
import PropTypes from "prop-types";

const AddTechModal = ({ addTech }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const onSubmit = () => {
    if (firstname === "" || lastname === "") {
      M.toast({ html: "Please enter first name and last name" });
    } else {
      const newTech = {
        firstName: firstname,
        lastName: lastname,
      };

      addTech(newTech);
      M.toast({ html: "Technician added" });

      // clear fields
      setFirstName("");
      setLastName("");
    }
  };

  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>New Technician</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstname'
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor='firstname'>First Name</label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastname'
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor='lastname'>Last Name</label>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          className='modal-close waves-effect waves-light blue btn'
          onClick={onSubmit}
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired,
};

export default connect(null, { addTech })(AddTechModal);
