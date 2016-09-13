import React from 'react'
import Select from 'react-select'
import _debounce from 'lodash/debounce'
import _get from 'lodash/get'
import _identity from 'lodash/identity'
import _isEmpty from 'lodash/isEmpty'
import _pick from 'lodash/pick'
import { EditorState } from 'draft-js'
import { stateToMarkdown } from 'draft-js-export-markdown';

import { Editor } from 'client/components/draftJs'
import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextArea, TextInput } from 'client/components/bootstrap/form'

export default class NewDogEar extends React.Component {

  constructor(props) {
    super(props)

    this.debouncedOnFetchBooks = _debounce(this.props.onFetchEditions, 300, {
      maxWait: 800
    })

    this.state = {
      isbn: _get(props, 'selectedEdition.isbn'),
      editorState: EditorState.createEmpty(),
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.selectedEdition &&
      newProps.selectedEdition.isbn !== this.props.selectedEdition.isbn
    ) {
      this.selectEdition(newProps.selectedEdition.isbn, newProps.selectedEdition.pageCount)
    }
  }

  createDogEar() {
    var errors = {}

    const noteContentState = this.state.editorState.getCurrentContent()
    const note = stateToMarkdown(noteContentState)

    if (_isEmpty(errors)) {
      this.props.onCreate({
        isbn: this.state.isbn,
        pageNumber: parseInt(this.state.pageNumber),
        note,
      })
    } else {
      this.setState({ errors })
    }
  }

  selectEdition(isbn, pageCount) {
    this.setState({
      isbn: isbn,
      pageCount: pageCount,
      selectInput: undefined,
    })
  }

  setAttribute(key, event) {
    let newState = {}
    newState[key] = event.target.value
    this.setState(newState)
  }

  handleSelectChange(option) {
    if (option) {
      this.selectEdition(option.isbn, option.pageCount)
    }
  }

  handleSelectInput(title) {
    this.debouncedOnFetchBooks(title)
    this.setState({selectInput: title})
  }

  handleEditorChange(editorState) {
    this.setState({ editorState })
  }

  render() {
    const editionOptions = this.props.editionOptions.map((edition) => {
      return {
        value: edition.isbn,
        isbn: edition.isbn,
        label: edition.title,
        authorName: edition.authors[0],
        pageCount: edition.pageCount,
      }
    })

    const selectRenderer = (option) => {
      return <span>{option.label} by {option.authorName}</span>
    }

    let pageInput = (
      <TextInput
        id='newDogEarPageInput'
        value={this.state.pageNumber || ''}
        onChange={this.setAttribute.bind(this, 'pageNumber')}
      />
    )

    if (this.state.pageCount) {
      pageInput = (
        <div className="input-group">
          {pageInput}
          <span className="input-group-addon">of {this.state.pageCount}</span>
        </div>
      )
    }

    return (
      <FormModal
        title='New Dog Ear'
        submitText='Add'
        disabled={this.props.disabled}
        onSubmit={this.createDogEar.bind(this)}
        onCancel={this.props.onClose}
      >
        <FormGroup>
          <label htmlFor='newDogEarEditionSelect'>Book</label>
          <Select
            id='newDogEarEditionSelect'
            placeholder=''
            value={this.state.isbn || ''}
            onChange={this.handleSelectChange.bind(this)}
            onInputChange={this.handleSelectInput.bind(this)}
            options={editionOptions}
            filterOptions={_identity}
            isLoading={this.props.bookOptionsLoading}
            optionRenderer={selectRenderer}
            valueRenderer={selectRenderer}
          />
        </FormGroup>

        <FormGroup>
          <div className="row">
            <div className="col-xs-6">
              <label htmlFor='newDogEarPageInput'>Page</label>
              {pageInput}
            </div>
          </div>
        </FormGroup>

        <Editor
          value={this.state.editorState}
          onChange={this.handleEditorChange.bind(this)}
        />
      </FormModal>
    )
  }

}

NewDogEar.propTypes = {
  editionOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  editionOptionsLoading: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onFetchEditions: React.PropTypes.func.isRequired,
  selectedEdition: React.PropTypes.object,
}

NewDogEar.defaultProps = {
  editionOptions: [],
  editionOptionsLoading: false,
  disabled: false,
}
