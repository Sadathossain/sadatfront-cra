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
import SubMenu from "../components/SubMenu";

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

const languageData = ['python', 'shell', 'javascript', 'textile', 'xml', 'yaml', 'json', 'css', 'dockerfile', 'go', 'ruby', 'typescript', 'vb', 'rust', 'scheme' , 'sql', 'r', 'swift', 'perl', 'php','powershell', 'tcl', 'clojure', 'coffeescript', 'less', 'lua', 'pascal',  'pug', 'markdown'];

class AuthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      code: ''
    }
  }
  dynamicLoadable(lang) {
    return import(`@cloud3/notebook/lib/${lang}.js`);
  }
  onSelectChangeNote(e) {
    e.persist();
    const lang = e.target.innerText;
    if (languageData.indexOf(lang) === -1) {
      this.setState({ mode: lang });
      return;
    }
    this.dynamicLoadable(lang).then((code) => {
    this.props.navigation.push({
      pathname: '/',
    })
    this.props.navigation.push({
      pathname: '/notebook/notebook',
      state: {mode: lang, code: code.default || ''}
    })
    });
  }
  onSelectChangeDiff(e) {
    e.persist();
    const lang = e.target.innerText;
    if (languageData.indexOf(lang) === -1) {
      this.setState({ mode: lang });
      return;
    }
    this.dynamicLoadable(lang).then((code) => {
    this.props.navigation.push({
      pathname: '/',
    })
    this.props.navigation.push({
      pathname: '/notebook/diffeditor',
      state: {mode: lang, code: code.default || ''}
    })
    });
  }
  render() {
    // const { props } = this.props;
    const EditorMenu = (
      <Menu>
        <MenuItem icon="clipboard" text="Diff Editor" onClick={() => {this.props.navigation.push('/notebook/diffeditor')}} />
        <MenuItem icon="annotation" text="Old Notebook" onClick={() => {this.props.navigation.push('/notebook/notebook')}}/>
        <MenuItem icon="code" text="Markdown Editor" onClick={() => {this.props.navigation.push('/notebook')}}/>
        {/* <MenuItem icon="code-block" text="Cookbooks Editor" onClick={() => {this.props.navigation.push('/notebook/cookbook')}}/> */}
        <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
        <MenuDivider />

          {/* <MenuItem icon="add" text="Add new application" disabled={true} />
          <MenuItem icon="remove" text="Remove application" /> */}
          <SubMenu icon='edit' text="Open recipe in Editor" value={this.state.mode} options={languageData} onChange={this.onSelectChangeNote.bind(this)}/>
          <MenuDivider />
          <SubMenu icon='manually-entered-data' text="Open recipe in Diff-Editor" value={this.state.mode} options={languageData} onChange={this.onSelectChangeDiff.bind(this)}/>

      </Menu>
  );
  if (this.props.isAuthenticated) {
    return (
      <div>
        <nav className="bp3-navbar bp3-dark">
          <div className="navigation-bar">
            <div className="bp3-navbar-group bp3-align-left">
              <div className="bp3-navbar-heading">Hello, {this.props.username}</div>
            </div>
            <div className="bp3-navbar-group bp3-align-right">
              <button className="bp3-button bp3-minimal bp3-icon-home" onClick={() => {this.props.navigation.push('/')}} />
              <button className="bp3-button bp3-minimal bp3-icon-music" onClick={() => {this.props.navigation.push('/jukebox')}} />
              <button className="bp3-button bp3-minimal bp3-icon-globe-network" onClick={() => {this.props.navigation.push('/newsroom')}} />
              <button className="bp3-button bp3-minimal bp3-icon-helper-management" onClick={() => {this.props.navigation.push('/gameroom')}} />
              <button className="bp3-button bp3-minimal bp3-icon-cloud" onClick={() => {this.props.navigation.push('/forecast')}} />
              <Popover content={EditorMenu} position={Position.RIGHT_BOTTOM}>
                <Button
                  icon="manually-entered-data"
                  text="Open Notebook "
                />
              </Popover>
              <span className="bp3-navbar-divider"/>
              <button className="bp3-button bp3-minimal bp3-icon-user" onClick={() => {this.props.navigation.push('/whoami')}} />
              <button className="bp3-button bp3-minimal bp3-icon-notifications" />
              <button className="bp3-button bp3-minimal bp3-icon-cog" />
              <Button
                onClick={this.props.signout}
                icon="log-out"
                minimal={true}
                intent="danger"
                text="Sign Out"
              />
            </div>
          </div>
        </nav>
        <HomeRoutes authenticated={this.props.isAuthenticated}/>
      </div>
    )
  } else {
    return (
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Please sign in.</p>
          <Button onClick={this.props.signin} icon="user" intent="success" text="Sign in with Google" />
          {/* <button onClick={props.signin}>Sign in with Google</button> */}
      </header>
    )
  }
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
