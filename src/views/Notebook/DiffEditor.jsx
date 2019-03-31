import React, { Component } from 'react';
import { MonacoDiffEditor } from 'react-monaco-editor'

export default class DiffEditor extends Component {
  render() {
    const code1 = 'function'
    const code2 = `function StringStream(string) {
      this.pos = 0;
    }`;
    const options = {
    //   renderSideBySide: false
    };
    return (
      <MonacoDiffEditor
        width="100vw"
        height="95vh"
        language="javascript"
        original={code1}
        value={code2}
        options={options}
        theme="vs-dark"
      />
    );
  }
}