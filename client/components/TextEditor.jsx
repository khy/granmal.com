import React from 'react'
import ReactDOM from 'react-dom'
import {Editor, EditorState, RichUtils} from 'draft-js'

import 'client/css/TextEditor.scss'

export class TextEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = (editorState) => this.setState({editorState})
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

    if (newState) {
      this.onChange(newState)
      return true
    }

    return false
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  render() {
    const {editorState} = this.state

    return (
      <div className="text-editor">
        <div className="btn-group btn-group-sm" role="group">
          <button type="button" className="btn btn-secondary" onClick={this._onBoldClick.bind(this)}>Bold</button>
          <button type="button" className="btn btn-secondary" onClick={this._onItalicClick.bind(this)}>Italic</button>
        </div>

        <div className="form-control">
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand.bind(this)}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }

}
