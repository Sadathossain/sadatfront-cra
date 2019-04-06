import React, { Component } from 'react';
import MarkdownEditor from './MdEditor'
export default class App extends Component {
    render() {
        return (
            <MarkdownEditor/>
        )
    }
}

// import { Link, Route } from "react-router-dom";

// const Notes = ({ match }) => (
//     <div>
//       <h2>Notes</h2>
//       <Link to={`${match.url}/cookbook`}>
//         Example Notes
//       </Link>
//       <Route path={`${match.url}/:cookbook`} component={Cookbook}/>
//       <Route path={`${match.url}/:notebook`} component={Notebook}/>
//       <Route path={`${match.url}/:diffeditor`} component={DiffEditor}/>
//       <Route path={`${match.url}/:markdowneditor`} component={MarkdownEditor}/>
//     </div>
//   )

//  export default class App extends Component {
//     render() {
//         // return <Cookbook/>
//         // return <Notebook/>
//         return <Notes
//         match={{url: "notebook"}}
//         />
//         // return <MarkdownEditor/>
//         // return <Markdown/>
//         // return <DiffEditor/>
//     }
// }
