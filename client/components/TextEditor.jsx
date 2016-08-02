import React from 'react'
import ReactDOM from 'react-dom'
import {Editor, EditorState} from 'draft-js'

import 'client/css/TextEditor.scss'

export class TextEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = (editorState) => this.setState({editorState})
  }

  render() {
    const {editorState} = this.state

    return (
      <div className="text-editor form-control">
        <Editor editorState={editorState} onChange={this.onChange} />
      </div>
    )
  }

}
