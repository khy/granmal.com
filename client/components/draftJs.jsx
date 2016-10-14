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

  onBoldToggle(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  onItalicToggle(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  onBlockquoteToggle(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'blockquote'));
  }

  render() {
    const inlineStyle = this.state.editorState.getCurrentInlineStyle()
    const selection = this.state.editorState.getSelection()
    const blockStyle = this.state.editorState.
      getCurrentContent().
      getBlockForKey(selection.getStartKey()).
      getType()

    const boldActiveClass = inlineStyle.has('BOLD') ? 'active' : ''
    const italicActiveClass = inlineStyle.has('ITALIC') ? 'active' : ''
    const blockquoteActiveClass = (blockStyle === 'blockquote') ? 'active' : ''

    return (
      <div className="text-editor">
        <ButtonGroup className="btn-group">
          <SecondaryButton onMouseDown={this.onBoldToggle.bind(this)} className={boldActiveClass} tabIndex="-1">
            <Icon name="bold" />
          </SecondaryButton>
          <SecondaryButton onMouseDown={this.onItalicToggle.bind(this)} className={italicActiveClass} tabIndex="-1">
            <Icon name="italic" />
          </SecondaryButton>
          <SecondaryButton onMouseDown={this.onBlockquoteToggle.bind(this)} className={blockquoteActiveClass} tabIndex="-1">
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
