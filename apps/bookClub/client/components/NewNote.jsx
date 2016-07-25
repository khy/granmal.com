import React from 'react'
import Select from 'react-select'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _assign from 'lodash/assign'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'

export default class NewNote extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.onFetchBooks()
  }

  createNote() {
    this.props.onCreate()
  }

  selectBook(option) {
    if (option) {
      this.setState({bookGuid: option.value})
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
            value={this.state.bookGuid}
            options={bookOptions}
            onChange={this.selectBook.bind(this)}
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
