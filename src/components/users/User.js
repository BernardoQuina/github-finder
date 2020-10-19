import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

import GithubContext from '../../context/github/githubContext';
import { getUserAndRepos } from '../../context/github/actions';
import { GET_USER_AND_REPOS, SET_LOADING } from '../../context/types';


const User = ({ match }) => {
  
  const {
    user: {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      company,
      public_gists,
      hireable
    },
    loading,
    dispatch,
    repos
  } = useContext(GithubContext);

  useEffect(() => {
    dispatch({ type: SET_LOADING });
    getUserAndRepos(match.params.login).then(res =>
      dispatch({ type: GET_USER_AND_REPOS, payload: res })
    )
  }, [dispatch, match.params.login]);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className="btn btn-light" >Back To Search</Link>
      Hireable: {' '}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img" alt="avatar"
            style={{width: '150px'}}
          />
          <h1>{name}</h1>
          <p>{location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            href={html_url}
            className="btn btn-dark my-1"
            target="_blank" rel="noopener noreferrer"
          >
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && <Fragment>
                <strong>Username: </strong> {login}
              </Fragment>}
            </li>
            <li>
              {company && <Fragment>
                <strong>Company: </strong> {company}
              </Fragment>}
            </li>
            <li>
              {blog && <Fragment>
                <strong>Website: </strong> {blog}
              </Fragment>}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  )
}

export default User
