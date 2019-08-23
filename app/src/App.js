import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Register from './components/Register';
import Login from './components/Login';

import { storeFactory } from './stores';
import { decodeAuthToken } from './utils';
import { logInUserAction, logOutUserAction } from './actions/userAction';

import './App.css';

const store = storeFactory();

const token = localStorage.getItem('token');
if (token) {
  decodeAuthToken(token)
    .then(data => (data) ? logInUserAction(null, token)(store.dispatch)
      : logOutUserAction()(store.dispatch))
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
