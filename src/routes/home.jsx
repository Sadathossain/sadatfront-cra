import React, {Component} from "react";
import { Route, withRouter } from "react-router-dom";
// core components/views
import HomePage from "../views/Home";
import JukeboxPage from "../views/Jukebox";
import GameroomPage from "../views/Gameroom";
import NotebookPage from "../views/Notebook";
import NewsroomPage from "../views/Newsroom";
import ForecastPage from "../views/Forecast";
import WhoamiPage from "../views/Whoami";
import Cookbook from '../views/Notebook/Cookbook'
import Notebook from '../views/Notebook/Notebook'
import DiffEditor from '../views/Notebook/DiffEditor'

import PrivateRoute from "../layouts/Private"

const homeRoutes = [
  {
    path: "/",
    exact: true,
    sidebarName: "Home",
    navbarName: "Home Page",
    component: HomePage
  },
  {
    path: "/jukebox",
    sidebarName: "Jukebox",
    navbarName: "Jukebox",
    component: JukeboxPage
  },
  {
    path: "/gameroom",
    sidebarName: "Gameroom",
    navbarName: "Gameroom",
    component: GameroomPage
  },
  {
    path: "/notebook",
    sidebarName: "Notebook",
    navbarName: "Notebook",
    component: NotebookPage
  },
  {
    path: "/notebook/cookbook",
    sidebarName: "Cookbook",
    navbarName: "Cookbook",
    component: Cookbook
  },
  {
    path: "/notebook/notebook",
    sidebarName: "Notebook",
    navbarName: "Notebook",
    component: Notebook
  },
  {
    path: "/notebook/diffeditor",
    sidebarName: "DiffEditor",
    navbarName: "DiffEditor",
    component: DiffEditor
  },
  {
    path: "/newsroom",
    sidebarName: "Newsroom",
    navbarName: "Newsroom",
    component: NewsroomPage
  },
  {
    path: "/forecast",
    sidebarName: "Forecast",
    navbarName: "Forecast",
    component: ForecastPage
  },
  {
    path: "/whoami",
    sidebarName: "Who Am I",
    navbarName: "Who Am I",
    component: WhoamiPage
  },
  {
    component: NoMatch
  },
  // { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
];

function NoMatch({ location }) {
  let permittedRoutes=[]
  homeRoutes.map((route, index) => (
    permittedRoutes.push(route.path)
  ))
  if (permittedRoutes.includes(location.pathname)) {
    return <div/>
  } else {
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }
}

class HomeRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location
    }
  }
  render() {
    const props = this.props;
    return (
      homeRoutes.map((route, index) => (
        <Route
        key={index}>
          <PrivateRoute
          exact path={route.path}
          component={route.component}
          authenticated={props.authenticated}/>
        </Route>
      ))
    );
  }

}

export default withRouter(HomeRoutes);