import React from 'react'
import Select from 'react-select'
import _debounce from 'lodash/debounce'
import _get from 'lodash/get'
import _identity from 'lodash/identity'
import _isEmpty from 'lodash/isEmpty'
import _pick from 'lodash/pick'
import _trim from 'lodash/trim'
import { EditorState } from 'draft-js'
import { stateToMarkdown } from 'draft-js-export-markdown';

import { Editor } from 'client/components/draftJs'
import { Icon } from 'client/components/fontAwesome'
import {
  FormModal, Modal, ModalBody, ModalHeader, ModalFooter
} from 'client/components/bootstrap/modal'
import { FormGroup, Input, TextArea, TextInput } from 'client/components/bootstrap/form'
import { SecondaryButton } from 'client/components/bootstrap/button'

export default class NewDogEar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      editionOptions: (this.props.existingEditionOptions || []),
      isbn: _get(props, 'selectedEdition.isbn'),
      pageCount: _get(props, 'selectedEdition.pageCount'),
      showNewBook: false,
      showNote: false,
      editorState: EditorState.createEmpty(),
      errors: {}
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

    let note
    const noteContentState = this.state.editorState.getCurrentContent()

    if (noteContentState.hasText()) {
      note = stateToMarkdown(noteContentState)
    }

    const pageNumber = parseFloat(this.state.pageNumber)

    if (pageNumber < 0) {
      errors.pageNumber = "Must be greater than or equal to zero"
    } else if ((pageNumber % 1) !== 0) {
      errors.pageNumber = "Must be a whole number"
    } else if (pageNumber > this.state.pageCount) {
      errors.pageNumber = `Must be less than ${this.state.pageCount}`
    }

    if (_isEmpty(errors)) {
      this.props.onCreate({
        isbn: this.state.isbn,
        pageNumber,
        note
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

  handleEditorChange(editorState) {
    this.setState({ editorState })
  }

  selectNewEdition(option) {
    this.hideNewBook()
    this.setState({
      editionOptions: [option].concat(this.state.editionOptions),
    })
    this.selectEdition(option.isbn, option.pageCount)
  }

  showNewBook(event) {
    event.preventDefault()
    this.setState({showNewBook: true})
  }

  hideNewBook() {
    this.setState({showNewBook: false})
  }

  showNote() {
    this.setState({showNote: true})
  }

  render() {
    const editionOptions = this.state.editionOptions.map((edition) => {
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
      <Input
        type='number'
        id='newDogEarPageInput'
        value={this.state.pageNumber || ''}
        onChange={this.setAttribute.bind(this, 'pageNumber')}
        autoComplete="off"
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

    let showNoteLink, noteFormGroup

    if (this.state.showNote) {
      noteFormGroup = (
        <FormGroup>
          <label htmlFor='newDogEarNoteInput'>Note</label>
          <Editor
            value={this.state.editorState}
            onChange={this.handleEditorChange.bind(this)}
          />
        </FormGroup>
      )
    } else {
      showNoteLink = (
        <SecondaryButton onClick={this.showNote.bind(this)} className="add-note-button">
          <Icon name="pencil-square-o" />
          <span> Add Note</span>
        </SecondaryButton>
      )
    }

    const form = (
      <FormModal
        title='New Dog Ear'
        submitText='Add'
        disabled={this.props.disabled}
        onSubmit={this.createDogEar.bind(this)}
        onCancel={this.props.onClose}
      >
        <FormGroup>
          <label htmlFor='dogEarEditionSelect'>Book</label>
          <Select
            id='dogEarEditionSelect'
            placeholder=''
            value={this.state.isbn || ''}
            onChange={this.handleSelectChange.bind(this)}
            options={editionOptions}
            optionRenderer={selectRenderer}
            valueRenderer={selectRenderer}
          />
        <p className='form-text'><a href='#' onClick={this.showNewBook.bind(this)}>Start New Book</a></p>
        </FormGroup>

        <FormGroup error={this.state.errors.pageNumber}>
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor='newDogEarPageInput'>Page</label>
              {pageInput}
            </div>
          </div>
        </FormGroup>

        {showNoteLink}
        {noteFormGroup}
      </FormModal>
    )

    if (this.state.showNewBook) {
      return (
        <NewEditionSearch
          onClose={this.props.onClose}
          onCancel={this.hideNewBook.bind(this)}
          onSearch={this.props.onFetchNewEditions}
          onSelect={this.selectNewEdition.bind(this)}
          options={this.props.newEditionOptions}
          disabled={this.props.newEditionOptionsLoading}
        />
      )
    } else {
      return form
    }
  }

}

NewDogEar.propTypes = {
  disabled: React.PropTypes.bool,
  existingEditionOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  newEditionOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  newEditionOptionsLoading: React.PropTypes.bool,
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onFetchNewEditions: React.PropTypes.func.isRequired,
  selectedEdition: React.PropTypes.object,
}

NewDogEar.defaultProps = {
  disabled: false,
  existingEditionOptions: [],
  newEditionOptions: [],
  newEditionOptionsLoading: false,
}

class NewEditionSearch extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  setSearchTerm(event) {
    this.setState({searchTerm: event.target.value})
  }

  selectOption(option) {
    this.props.onSelect(option)
  }

  onSearch(event) {
    if (event) { event.preventDefault() }
    this.props.onSearch(this.state.searchTerm)
  }

  render() {
    let searchResults

    if (this.props.options.length > 0 && !this.props.disabled) {
      const mediaList = this.props.options.map((option) => {
        return (
          <li className="list-group-item edition-search-option" onClick={this.selectOption.bind(this, option)} key={option.isbn}>
            <div className="media">
              <a className="media-left" >
                <img className="media-object" src={option.smallImageUrl} width="64" />
              </a>
              <div className="media-body">
                <h4 className="media-heading">{option.title}</h4>
                <p className="edition-search-authors">{option.authors.join(', ')}</p>
                <p className="edition-search-details">{option.pageCount} pages / {option.publisher} / {option.publishedAt}</p>
              </div>
            </div>
          </li>
        )
      })

      searchResults = (
        <ModalBody>
          <ul className="list-group">
            {mediaList}
          </ul>
        </ModalBody>
      )
    }

    return (
      <Modal onClose={this.props.onClose}>
        <ModalHeader onClose={this.props.onClose}>New Dog Ear</ModalHeader>
        <ModalBody>
          <form onSubmit={this.onSearch.bind(this)}>
            <div className="input-group">
              <TextInput
                onChange={this.setSearchTerm.bind(this)}
                placeholder="Find edition..."
                disabled={this.props.disabled}
              />
              <span className="input-group-btn">
                <SecondaryButton
                  onClick={this.onSearch.bind(this)}
                  disabled={this.props.disabled}
                >
                  Search
                </SecondaryButton>
              </span>
            </div>
          </form>
        </ModalBody>
        {searchResults}
        <ModalFooter>
          <SecondaryButton
            onClick={this.props.onCancel}
          >
            Cancel
          </SecondaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}

NewEditionSearch.propTypes = {
  onCancel: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  disabled: React.PropTypes.bool
}

NewEditionSearch.defaultProps = {
  disabled: false
}
