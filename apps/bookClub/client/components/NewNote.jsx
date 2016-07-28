import React from 'react'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'
import _pick from 'lodash/pick'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextArea, TextInput } from 'client/components/bootstrap/form'

import NewBook from 'bookClub/client/components/NewBook'

export default class NewNote extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentModal: 'note'
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

  selectBook(option) {
    if (option) {
      this.setState({bookGuid: option.value})
    }
  }

  setAttribute(key, event) {
    let value = event.target.value.trim()

    if (value.length > 0) {
      let newState = {}
      newState[key] = value
      this.setState(newState)
    }
  }

  showNewBook(event) {
    event.preventDefault();
    this.setState({currentModal: 'book'})
  }

  showNewNote() {
    this.setState({currentModal: 'note'})
  }

  render() {
    const bookOptions = this.props.bookOptions.map((book) => {
      return { label: book.title, value: book.guid }
    })

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
            onChange={this.selectBook.bind(this)}
            onInputChange={this.props.onFetchBooks}
            options={bookOptions}
            isLoading={this.props.bookOptionsLoading}
          />
          <a href="#" onClick={this.showNewBook.bind(this)}>New Book</a>
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

    if (this.state.currentModal === 'note') {
      modal = noteModal
    } else if (this.state.currentModal === 'book') {
      const bookProps = _pick(this.props, ['authorOptions', 'authorOptionsLoading', 'onFetchAuthors'])

      modal = <NewBook {...bookProps}
        onCreate={this.props.onCreateBook}
        onClose={this.showNewNote.bind(this)}
      />
    }

    return modal
  }

}

NewNote.propTypes = {
  authorOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  authorOptionsLoading: React.PropTypes.bool.isRequired,
  bookOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  bookOptionsLoading: React.PropTypes.bool.isRequired,
  onCreate: React.PropTypes.func.isRequired,
  onCreateBook: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onFetchAuthors: React.PropTypes.func.isRequired,
  onFetchBooks: React.PropTypes.func.isRequired,
}

NewNote.defaultProps = {
  authorOptionsLoading: false,
  bookOptionsLoading: false,
}
