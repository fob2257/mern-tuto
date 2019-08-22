import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Register from './components/Register';
import Login from './components/Login';

import { storeFactory } from './stores';
import { setAuthToken, decodeAuthToken } from './utils';
import { logInUserType, logOutUserAction } from './actions/userAction';

import './App.css';

const store = storeFactory();

const token = localStorage.getItem('token');
if (token) {
  decodeAuthToken(token)
    .then((data) => {
      if (Object.keys(data).length > 0) {
        setAuthToken(token);
        return store.dispatch(logInUserType(data));
      }

      logOutUserAction()(store.dispatch);
    })
    .catch(() => {
      logOutUserAction()(store.dispatch);
    });
}

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className='container'>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </div>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
