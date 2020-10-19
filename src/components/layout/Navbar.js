import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';



const Navbar = ({ icon, title }) => {

  const alertContext = useContext(AlertContext);

  const { clearAlert } = alertContext;

  return (
    <nav className= "navbar bg-primary">
      <h1>
        <i className={icon} /><Link to='/' onClick={clearAlert} >{title}</Link>
      </h1>
      <ul>
        <li>
          <Link to='/' onClick={clearAlert} >Home</Link>
        </li>
        <li>
          <Link to='/about' onClick={clearAlert} >About</Link>
        </li>
      </ul>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default Navbar
