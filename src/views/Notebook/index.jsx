import React, { Component } from 'react';
import Cookbook from './Cookbook'
import Notebook from './Notebook'
import MarkdownEditor from './MdEditor'
import DiffEditor from './DiffEditor'

export default class App extends Component {
    render() {
        // return <Cookbook/>
        // return <Notebook/>
        return <MarkdownEditor/>
        // return <Markdown/>
        // return <DiffEditor/>
    }
}