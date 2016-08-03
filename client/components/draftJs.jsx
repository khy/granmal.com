import React from 'react'
import ReactDOM from 'react-dom'
import { Editor as DraftJsEditor, EditorState, RichUtils } from 'draft-js'
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { stateToMarkdown } from 'draft-js-export-markdown';

import { Icon } from 'client/components/fontAwesome'
import { ButtonGroup, SecondaryButton } from 'client/components/bootstrap/button'

import 'client/css/TextEditor.scss'

export class Editor extends React.Component {

  constructor(props) {
    super(props)
    this.state = { editorState: props.value }
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

    if (newState) {
      this.onChange(newState)
      return true
    }

    return false
  }

  onChange(editorState) {
    this.props.onChange(editorState)
    this.setState({ editorState })
  }

  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  onBlockquote() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'blockquote'));
  }

  render() {
    return (
      <div className="text-editor">
        <ButtonGroup className="btn-group-sm">
          <SecondaryButton onClick={this.onBoldClick.bind(this)}>
            <Icon name="bold" />
          </SecondaryButton>
          <SecondaryButton onClick={this.onItalicClick.bind(this)}>
            <Icon name="italic" />
          </SecondaryButton>
          <SecondaryButton onClick={this.onBlockquote.bind(this)}>
            <Icon name="quote-left" srText="blockquote" />
          </SecondaryButton>
        </ButtonGroup>

        <div className="form-control">
          <DraftJsEditor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand.bind(this)}
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    )
  }

}
