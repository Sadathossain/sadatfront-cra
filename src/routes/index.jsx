import React, { Component } from "react";
// firebase auth
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../config/firebaseConfig';

import {BrowserRouter as Router} from "react-router-dom";

import logo from '../assets/img/logo.svg';
import '../sfStyles/indexRoutes.css';

import HomeRoute from "./home";

import Loading from "../components/Loading";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

function AuthButton(props) {
    if (props.isAuthenticated) {
      return (
        <div>
          <header className="App-header-horizontal">
            <p>Hello, {props.username}</p>
            <button onClick={props.signout}>Sign out</button>
          </header>
          <HomeRoute authenticated={props.isAuthenticated}/>
        </div>
      )
    } else {
      return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Please sign in.</p>
            <button onClick={props.signin}>Sign in with Google</button>
        </header>
      )
    }
}

class IndexRoutes extends Component {
    state = { loading: true, authenticated: false, currentUser: null };

  componentWillMount() {
    firebaseAppAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: "",
          loading: false
        });
      }
    });
  }
    render() {
        const {
            authenticated,
            loading
        } = this.state;
        const {
          signOut,
          signInWithGoogle,
      } = this.props;

        if (loading) {
            return <Loading/>;
          }


    return (
        <Router>
            <div className="App">
                <AuthButton isAuthenticated={this.state.authenticated} username={this.state.currentUser.displayName} signin={signInWithGoogle} signout={signOut}/>
            </div>
        </Router>
    );
    }
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(IndexRoutes);