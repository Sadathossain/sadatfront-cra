import React, { Component } from 'react';
import * as monaco from 'monaco-editor';
import { withRouter } from 'react-router-dom'

 class Notebook extends Component {
  constructor(props) {
    super(props);
    this.containerElement = undefined;
    if (this.props.location.state != undefined) {
      this.state = {
        code: this.props.location.state.code,
        mode: this.props.location.state.mode
      };
    } else {
      this.state = {
        code: '',
        mode: 'markdown'
      };
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
        monaco.editor.setTheme('vs-dark');
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

export default withRouter(Notebook)