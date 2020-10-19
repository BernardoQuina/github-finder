import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubState from './context/github/GithubState';

import './App.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  // Get a single Github user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
    setAlert(null);
  }

  // Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
    setAlert(null);
  }

  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
    setAlert(null);
  }

  // Set alert when nothing is typed for the search
  const showAlert = (msg, type) => {
    setAlert({msg, type });
  }

  // (just) clears alerts
  const clearAlert = () => {
    setAlert(null);
  }
  
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar clearAlert={clearAlert} />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User
                  { ... props }
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
