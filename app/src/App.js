import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <div className='container'>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
