import React, { Component } from 'react';
import DiffEditor from '../../components/DiffEditor'

export default class Diff extends Component {
  render() {
    const code1 = `function StringStream(string) {
      this.pos = 1;
    }`
    const code2 = `function StringStream(string) {
      this.pos = 0;
    }`;
    const options = {
    //   renderSideBySide: false
    originalEditable: true
    };
    return (
      <DiffEditor
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