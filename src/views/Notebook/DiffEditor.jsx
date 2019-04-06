import React, { Component } from "react";
import DiffEditor from "../../components/DiffEditor";
import { withRouter } from "react-router-dom";

class Diff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code1: `function StringStream(string) {
        this.pos = 1;
      }`,
      code2: `function StringStream(string) {
        this.pos = 1;
      }`,
      mode: 'javascript'
    };
  }
  componentDidMount() {
    if (this.props.location.state != undefined) {
      this.setState({
        code1: this.props.location.state.code,
        mode: this.props.location.state.mode
      });
    }
  }
  render() {
    const options = {
      //   renderSideBySide: false
      originalEditable: true
    };
    return (
      <DiffEditor
        width="100vw"
        height="95vh"
        language={this.state.mode}
        original={this.state.code1}
        value={this.state.code2}
        options={options}
        theme="vs-dark"
      />
    );
  }
}

export default withRouter(Diff);
