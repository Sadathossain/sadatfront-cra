import React, { Component } from "react";
// firebase auth
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";

import { Route } from "react-router-dom";

import logo from "../assets/img/logo.svg";
import "../sfStyles/indexRoutes.css";

import HomeRoutes from "./home";

import Loading from "../components/Loading";

import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position
} from "@blueprintjs/core";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

function AuthButton(props) {
  const EditorMenu = (
    <Menu>
      <MenuItem icon="clipboard" text="Diff Editor" onClick={() => {props.navigation.push('/notebook/diffeditor')}} />
      <MenuItem icon="annotation" text="Old Notebook" onClick={() => {props.navigation.push('/notebook/notebook')}}/>
      <MenuItem icon="code" text="Markdown Editor" onClick={() => {props.navigation.push('/notebook')}}/>
      <MenuItem icon="code-block" text="Cookbooks Editor" onClick={() => {props.navigation.push('/notebook/cookbook')}}/>
      <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
      <MenuDivider />
      <MenuItem icon="cog" text="Settings...">
        <MenuItem icon="add" text="Add new application" disabled={true} />
        <MenuItem icon="remove" text="Remove application" />
      </MenuItem>
    </Menu>
);
  if (props.isAuthenticated) {
    return (
      <div>
        <nav className="bp3-navbar bp3-dark">
          <div className="navigation-bar">
            <div className="bp3-navbar-group bp3-align-left">
              <div className="bp3-navbar-heading">Hello, {props.username}</div>
            </div>
            <div className="bp3-navbar-group bp3-align-right">
              <button className="bp3-button bp3-minimal bp3-icon-home" onClick={() => {props.navigation.push('/')}} />
              <button className="bp3-button bp3-minimal bp3-icon-music" onClick={() => {props.navigation.push('/jukebox')}} />
              <button className="bp3-button bp3-minimal bp3-icon-globe-network" onClick={() => {props.navigation.push('/newsroom')}} />
              <button className="bp3-button bp3-minimal bp3-icon-helper-management" onClick={() => {props.navigation.push('/gameroom')}} />
              <button className="bp3-button bp3-minimal bp3-icon-cloud" onClick={() => {props.navigation.push('/forecast')}} />
              <Popover content={EditorMenu} position={Position.RIGHT_BOTTOM}>
                <Button
                  icon="manually-entered-data"
                  text="Open Notebook "
                />
              </Popover>
              <span className="bp3-navbar-divider"/>
              <button className="bp3-button bp3-minimal bp3-icon-user" onClick={() => {props.navigation.push('/whoami')}} />
              <button className="bp3-button bp3-minimal bp3-icon-notifications" />
              <button className="bp3-button bp3-minimal bp3-icon-cog" />
              <Button
                onClick={props.signout}
                icon="log-out"
                minimal={true}
                intent="danger"
                text="Sign Out"
              />
            </div>
          </div>
        </nav>
        <HomeRoutes authenticated={props.isAuthenticated} />
      </div>
    )
  } else {
    return (
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Please sign in.</p>
          <Button onClick={props.signin} icon="user" intent="success" text="Sign in with Google" />
          {/* <button onClick={props.signin}>Sign in with Google</button> */}
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
    const { loading } = this.state;
    const { signOut, signInWithGoogle } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <Route
      render={({ history }) => (
        <AuthButton
        isAuthenticated={this.state.authenticated}
        username={this.state.currentUser.displayName}
        signin={signInWithGoogle}
        signout={signOut}
        navigation={history}
      />
  )}
  />
);
}
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(IndexRoutes);
