import React from 'react'
import Select from 'react-select'
import _debounce from 'lodash/debounce'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _pick from 'lodash/pick'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextArea, TextInput } from 'client/components/bootstrap/form'

import NewBook from 'bookClub/client/components/NewBook'

export default class NewNote extends React.Component {

  constructor(props) {
    super(props)

    this.debouncedOnFetchBooks = _debounce(this.props.onFetchBooks, 300, {
      maxWait: 800
    })

    this.state = {
      bookGuid: _get(props, 'selectedBook.guid')
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selectedBook && newProps.selectedBook !== this.props.selectedBook) {
      this.removeOverlay()
      this.selectBook(newProps.selectedBook.guid)
    }
  }

  createNote() {
    var errors = {}

    if (_isEmpty(errors)) {
      this.props.onCreate({
        bookGuid: this.state.bookGuid,
        pageNumber: parseInt(this.state.pageNumber),
        pageCount: parseInt(this.state.pageCount),
        content: this.state.content,
      })
    } else {
      this.setState({ errors })
    }
  }

  selectBook(guid) {
    this.setState({
      bookGuid: guid,
      selectInput: undefined,
    })
  }

  setAttribute(key, event) {
    let value = event.target.value.trim()

    if (value.length > 0) {
      let newState = {}
      newState[key] = value
      this.setState(newState)
    }
  }

  removeOverlay() {
    this.setState({overlay: undefined})
  }

  handleSelectChange(option) {
    if (option) {
      console.log(option.value)
      if (option.value === 'new') {
        this.setState({overlay: 'newBook'})
      } else {
        this.selectBook(option.value)
      }
    }
  }

  handleSelectInput(title) {
    this.debouncedOnFetchBooks(title)
    this.setState({selectInput: title})
  }

  render() {
    const bookOptions = this.props.bookOptions.map((book) => {
      return { label: book.title, value: book.guid }
    })

    if (this.state.selectInput) {
      bookOptions.push({label: `Add "${this.state.selectInput}"`, value: 'new'})
    }

    const noteModal = (
      <FormModal
        title='New Note'
        submitText='Add'
        disabled={this.props.disabled}
        onSubmit={this.createNote.bind(this)}
        onCancel={this.props.onClose}
      >
        <FormGroup>
          <Select
            placeholder='Book'
            value={this.state.bookGuid || ''}
            onChange={this.handleSelectChange.bind(this)}
            onInputChange={this.handleSelectInput.bind(this)}
            options={bookOptions}
            isLoading={this.props.bookOptionsLoading}
          />
        </FormGroup>

        <FormGroup>
          <div className="row">
            <div className="col-xs-6">
              <TextInput
                placeholder="Page"
                value={this.state.pageNumber || ''}
                onChange={this.setAttribute.bind(this, 'pageNumber')}
              />
            </div>
            <div className="col-xs-6">
              <TextInput
                placeholder="Total"
                value={this.state.pageCount || ''}
                onChange={this.setAttribute.bind(this, 'pageCount')}
              />
            </div>
          </div>
        </FormGroup>

        <FormGroup>
          <TextArea
            value={this.state.content || ''}
            onChange={this.setAttribute.bind(this, 'content')}
            rows="5"
          />
        </FormGroup>
      </FormModal>
    )

    let modal

    if (this.state.overlay === 'newBook') {
      const newBookProps = _pick(this.props, [
        'authorOptions', 'authorOptionsLoading', 'disabled', 'onFetchAuthors'
      ])

      modal = <NewBook {...newBookProps}
        initialTitle={this.state.selectInput}
        onCreate={this.props.onCreateBook}
        onClose={this.removeOverlay.bind(this)}
      />
    } else {
      modal = noteModal
    }

    return modal
  }

}

NewNote.propTypes = {
  authorOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  authorOptionsLoading: React.PropTypes.bool,
  bookOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  bookOptionsLoading: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onCreate: React.PropTypes.func.isRequired,
  onCreateBook: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onFetchAuthors: React.PropTypes.func.isRequired,
  onFetchBooks: React.PropTypes.func.isRequired,
  selectedBook: React.PropTypes.object,
}

NewNote.defaultProps = {
  authorOptions: [],
  authorOptionsLoading: false,
  bookOptions: [],
  bookOptionsLoading: false,
  disabled: false,
}
