import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// core components/views
import HomePage from "../views/Home";
import JukeboxPage from "../views/Jukebox";
import GameroomPage from "../views/Gameroom";
import NotebookPage from "../views/Notebook";
import NewsroomPage from "../views/Newsroom";
import ForecastPage from "../views/Forecast";
import WhoamiPage from "../views/Whoami";

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

function HomeRoutes(props) {
  return (
    <Router>
    {homeRoutes.map((route, index) => (
      <Route
      key={index}>
        <PrivateRoute
        exact path={route.path}
        component={route.component}
        authenticated={props.authenticated}/>
      </Route>
    ))
  }
  </Router>
  );
}

export default HomeRoutes;