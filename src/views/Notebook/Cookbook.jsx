import React, { PureComponent } from 'react';
import Editor from '../../components/Editor';
import Select from '../../components/Select';
// import styles from '../../sfStyles/Cookbook.less';

const languageData = ['python', 'shell', 'javascript', 'textile', 'xml', 'yaml', 'json', 'css', 'dockerfile', 'go', 'ruby', 'typescript', 'vb', 'rust', 'scheme' , 'sql', 'r', 'swift', 'perl', 'php','powershell', 'tcl', 'clojure', 'coffeescript', 'less', 'lua', 'pascal',  'pug', 'markdown'];
// Monaco Docs https://github.com/react-monaco-editor/react-monaco-editor/blob/master/README.md
// language= the initial language of the auto created model in the editor.
// defaultValue= the initial value of the auto created model in the editor.
// options refer to Monaco interface IEditorConstructionOptions https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
// editorWillMount(monaco) an event emitted before the editor mounted (similar to componentWillMount of React).
// editorDidMount(editor, monaco) an event emitted when the editor has been mounted (similar to componentDidMount of React).
// context allow to pass a different context then the global window onto which the monaco instance will be loaded. Useful if you want to load the editor in an iframe.

export default class Cookbook extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      mode: 'go',
    }
  }
  componentDidMount() {
    this.dynamicLoadable(this.state.mode).then((code) => {
      this.setState({ mode: this.state.mode, code: code.default || '' });
    });
  }
  editorDidMount(editor, monaco) {
    // console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    // console.log('onChange', newValue, e);
  }
  onSelectChange(e) {
    e.persist();
    const lang = e.target.value;
    if (languageData.indexOf(lang) === -1) {
      this.setState({ mode: lang });
      return;
    }
    this.dynamicLoadable(lang).then((code) => {
      // console.log('code.default:', code.default);
      this.setState({ mode: lang, code: code.default || '' });
    });
  }
  dynamicLoadable(lang) {
    return import(`@cloud3/notebook/lib/${lang}.js`);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      cursorStyle: 'line',
      automaticLayout: false,
    };
    return (
      // <div className={styles.options}>
      <div>
        <Select value={this.state.mode} options={languageData} onChange={this.onSelectChange.bind(this)} />
        <Editor
          ref={editor => this.editor = editor}
          height="92vh"
          theme='vs-dark'
          language={this.state.mode}
          value={code}
          editorDidMount={this.editorDidMount.bind(this)}
          onChange={this.onChange.bind(this)}
          options={options}
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
    );
  }
}

