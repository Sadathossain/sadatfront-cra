import React, { PureComponent } from 'react';
import Editor from '../../components/Editor';
import CodeBlock from '../../components/Markdown/CodeBlock'
import MarkdownControls from '../../components/Markdown/markdown-controls'
import '../../sfStyles/markdownEditorComponent.css';

const mdFilePath = 'data/Test.md'
const Markdown = require('react-markdown/lib/with-html')
const initialSource = `# SadatFront`

export default class MarkdownEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.handleControlsChange = this.handleControlsChange.bind(this)
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this)
    this.state = {
      markdownSrc: initialSource,
      htmlMode: 'raw',
      mode: 'markdown'
    }
  }

  editorDidMount(editor, monaco) {
    editor.focus();
    this.readLogFile(mdFilePath);
  }
  onChange(newValue, e) {
    this.setState({
        markdownSrc: newValue
    })
  }

  handleMarkdownChange(evt) {
    this.setState({markdownSrc: evt.target.value})
  }

  handleControlsChange(mode) {
    this.setState({htmlMode: mode})
  }
  readLogFile = file => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
              var mdSource = rawFile.responseText;
              if (rawFile.responseText) mdSource = rawFile.responseText.replace(/([\s\S]*)<!--dividing-->/, '');
                //
                this.setState({
                  markdownSrc: mdSource
                })
            }
        }
    };
    rawFile.send(null);
};
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div className="editor-pane">
          <MarkdownControls onChange={this.handleControlsChange} mode={this.state.htmlMode} />

          <Editor
            ref={editor => this.editor = editor}
            width="50vw"
            height="97vh"
            theme='vs-dark'
            language={this.state.mode}
            value={this.state.markdownSrc}
            editorDidMount={this.editorDidMount.bind(this)}
            onChange={this.onChange.bind(this)}
            scrollbar={{
                // Subtle shadows to the left & top. Defaults to true.
                useShadows: false,
                // Render vertical arrows. Defaults to false.
                verticalHasArrows: true,
                // Render horizontal arrows. Defaults to false.
                horizontalHasArrows: true,
                // Render vertical scrollbar.
                // Accepted values: 'auto', 'visible', 'hidden'.
                // Defaults to 'auto'
                vertical: 'visible',
                // Render horizontal scrollbar.
                // Accepted values: 'auto', 'visible', 'hidden'.
                // Defaults to 'auto'
                horizontal: 'visible',
                verticalScrollbarSize: 17,
                horizontalScrollbarSize: 17,
                arrowSize: 30,
            }}/>

        </div>

        <div className="result-pane">
        {/* <div style={{ maxHeight: '97vh', overflow: 'auto', paddingLeft: '10px', width: '50vw'}}> */}
          <Markdown
            className="result"
            source={this.state.markdownSrc}
            skipHtml={this.state.htmlMode === 'skip'}
            escapeHtml={this.state.htmlMode === 'escape'}
            renderers={{code: CodeBlock}}
          />
        </div>
      </div>
    )
  }
}