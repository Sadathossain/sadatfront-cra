// import React, { Component } from "react";
import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

// import Loading from "../../components/Loading";
// export default class PrivateRoute extends Component {
//   state = { loading: true };
//   componentDidMount() {
//     this.setState({
//       loading: false
//     })
//   }
//   render() {
//     const {
//       Component,
//       authenticated,
//       ...rest
//     } = this.props;
//     const {
//       loading
//   } = this.state;
//   if (loading) {
//     return <Loading/>;
//   }
//     return (
//       <Route
//       {...rest}
//       render={props =>
//         authenticated === true ? (
//           <Component {...props} {...rest} />
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//     )
//   }
// }