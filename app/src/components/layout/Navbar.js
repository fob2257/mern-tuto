import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOutUserAction } from '../../actions/userAction';

const Navbar = (props) => {
  const { userReducer: { isAuthenticated, data }, logOutUserAction } = props;

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          DevConnector
          </Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='mobile-nav'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to='/profiles' className='nav-link'>
                Developers
                </Link>
            </li>
          </ul>
          {
            (isAuthenticated) ?
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <a href='#' className='nav-link' onClick={() => logOutUserAction()}>
                    <img
                      className='rounded-circle'
                      src={data.avatar}
                      alt={`${data.firstName} ${data.lastName}`}
                      style={{ width: '25px', marginRight: '5px' }} />
                    {' '}
                    Logout
                    </a>
                </li>
              </ul>
              :
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to='/register' className='nav-link'>
                    Sign Up
                    </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/login' className='nav-link'>
                    Login
                    </Link>
                </li>
              </ul>
          }
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  userReducer: PropTypes.object.isRequired,
  logOutUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ userReducer }) => ({ userReducer });

const mapDispatchToProps = { logOutUserAction };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
