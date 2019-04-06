import React, { PureComponent } from 'react';
import Editor from '../../components/Editor';
import CodeBlock from '../../components/Markdown/CodeBlock'
import MarkdownControls from '../../components/Markdown/markdown-controls'
import '../../sfStyles/markdownEditorComponent.css';

const Markdown = require('react-markdown/lib/with-html')
const initialSource = `# Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`

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