import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Register from './components/Register';
import Login from './components/Login';

import { storeFactory } from './stores';

const store = storeFactory();

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
