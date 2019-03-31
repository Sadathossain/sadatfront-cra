import React, { Component } from 'react';
import * as monaco from 'monaco-editor';

export default class Notebook extends Component {
  constructor(props) {
    super(props);
    this.containerElement = undefined;
    this.state = {
      code: 'console.log("Sadat"); var test = ``; function() { return }',
      mode: 'javascript',
    }
  }
  componentDidMount() {
    this.initMonacoEditor();
  }
  initMonacoEditor() {
      this.editor = monaco.editor.create(this.containerElement, {
        value: this.state.code,
      language: this.state.mode,
      });
        // monaco.editor.setTheme('vs-dark');
  }
  editorRef = (component) => {
    this.containerElement = component;
  };
  render() {
    return (
      <div>
        <div ref={this.editorRef} style={{ width: '100vw', height: '95vh' }} />
      </div>
    );
  }
}
