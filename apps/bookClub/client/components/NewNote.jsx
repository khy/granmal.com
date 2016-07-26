import React from 'react'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextArea, TextInput } from 'client/components/bootstrap/form'

export default class NewNote extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.onFetchBooks()
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

  render() {
    const bookOptions = this.props.books.map((book) => {
      return { label: book.title, value: book.guid }
    })

    return (
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
            options={bookOptions}
            onChange={this.selectBook.bind(this)}
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
  }

}

NewNote.propTypes = {
  books: React.PropTypes.arrayOf(React.PropTypes.object),
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onFetchBooks: React.PropTypes.func.isRequired
}
