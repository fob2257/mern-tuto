import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateProfile from './components/CreateProfile';
import EditProfile from './components/EditProfile';
import AddExperience from './components/AddExperience';
import AddEducation from './components/AddEducation';
import Profiles from './components/Profiles';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Post from './components/Post';

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
          <Switch>
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute path='/create-profile' component={CreateProfile} />
              <PrivateRoute path='/edit-profile' component={EditProfile} />
              <PrivateRoute path='/add-experience' component={AddExperience} />
              <PrivateRoute path='/add-education' component={AddEducation} />
              <Route exact path='/profiles' component={Profiles} />
              <Route path='/profiles/:handle' component={Profile} />
              <Route path='/not-found' component={NotFound} />
              <PrivateRoute exact path='/feed' component={Posts} />
              <PrivateRoute path='/feed/:id' component={Post} />
            </div>
            {/* <Route component={NotFound} /> */}
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
