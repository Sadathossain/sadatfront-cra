import React, { Component } from 'react';
import Cookbook from './Cookbook'
import Notebook from './Notebook'
import Markdown from './Markdown'
import InlineCode from './Markdown/InlineCode'
// import DiffEditor from './DiffEditor'

export default class App extends Component {
    render() {
        return <Cookbook/>
        // return <Notebook/>
        // return <InlineCode/>
        // return <Markdown/>
        // return <DiffEditor/>
    }
}