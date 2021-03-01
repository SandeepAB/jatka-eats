import React, { Component } from 'react';
import logo from './logo.svg';

//Import the modified App.css
// import './App.css';
import classes from './App.module.css';


// Import the Routes component, which contains our Route setup

import Routes from './Routes'


// Provider component is a react-redux component for setting up the Redux Store

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// Import the ConfigureStore that holds the initial Configuration

import { configureStore } from './store/configureStore'

import * as TodoActions from './store/actions/todoActions'

import AppBar from 'material-ui/AppBar';


// Create a Store from the Configuration, we can pass a Initial State here

const store = configureStore()

// At first dispatch a Get Todos Actions, So we'll recieve the Todos 
// fetched from the server at the start of the app

store.dispatch(TodoActions.GetTodos())

// const App = (props) => {

class App extends Component {

  constructor(props) {
    super(props);

    let isAuth = (localStorage.getItem('userType') &&  localStorage.getItem('user') ) ? true : false;

    this.state = {
      isAuthenticated: isAuth
    };
}

  login = () => {
    let isAuth = (localStorage.getItem('userType') &&  localStorage.getItem('user') ) ? true : false;
    console.log("localStorage.getItem('userType') ", localStorage.getItem('userType'));
    console.log("localStorage.getItem('user') ", localStorage.getItem('user'));


    console.log("isAuth ", isAuth);
    this.setState({
      isAuthenticated: isAuth
    });
  }

  logout = () => {
    console.log("setting logout auth to false ")
    this.setState({
      isAuthenticated: false
    });
    localStorage.removeItem( 'user' );
    localStorage.removeItem( 'expirationDate' );
    localStorage.removeItem( 'userType' );
  }

  render() {
    console.log("rerendering ", this.state)
    return (

      //Provider needs to contain all the Containers/Components it will give access to the Store

      <Provider store={store} className={classes.Root}>
        <BrowserRouter>
          <Routes isAuthenticated={this.state.isAuthenticated} login={this.login} logout={this.logout} />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
