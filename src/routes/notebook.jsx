import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Cookbook from '../views/Notebook/Cookbook'
import Notebook from '../views/Notebook/Notebook'
import MarkdownEditor from '../views/Notebook/MdEditor'
import DiffEditor from '../views/Notebook/DiffEditor'

const notebookRoutes = [
    // {
    //   path: "/",
    //   exact: true,
    //   sidebarName: "Home",
    //   navbarName: "Home Page",
    //   component: HomePage
    // },
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
    // {
    //   path: "/forecast",
    //   sidebarName: "Forecast",
    //   navbarName: "Forecast",
    //   component: ForecastPage
    // },
    // {
    //   path: "/whoami",
    //   sidebarName: "Who Am I",
    //   navbarName: "Who Am I",
    //   component: WhoamiPage
    // },
    // {
    //   component: NoMatch
    // },
    // { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
  ];

//   function NotebookRoutes(props) {
//     return (
//       <Router>
//       {notebookRoutes.map((route, index) => (
//         <Route
//         key={index}>
//           <PrivateRoute
//           exact path={route.path}
//           component={route.component}
//           authenticated={props.authenticated}/>
//         </Route>
//       ))
//     }
//     </Router>
//     );
//   }

  export default notebookRoutes;