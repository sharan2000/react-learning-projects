import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = ({}) => {
  const [username, setUsername] = useState("");
  const githubContext = useContext(GithubContext);

  const alertContext = useContext(AlertContext);

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === "") {
      alertContext.setAlert("please enter something", "light");
    } else {
      githubContext.searchUsers(username);
      setUsername("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='username'
          placeholder='search user...'
          value={username}
          onChange={onChange}
        />
        <input
          type='submit'
          value='search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-block btn-secondary'
          onClick={githubContext.clearUsers}
        >
          clear
        </button>
      )}
    </div>
  );
};

export default Search;
