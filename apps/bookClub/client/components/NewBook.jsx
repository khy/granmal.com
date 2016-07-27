import React from 'react'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'

export default class NewBook extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  createBook() {
    var errors = {}

    if (_isEmpty(errors)) {
      this.props.onCreate({})
    } else {
      this.setState({ errors })
    }
  }

  setTitle(event) {
    this.setState({title:  event.target.value})
  }

  selectAuthor(option) {
    if (option) {
      this.setState({authorGuid: option.value})
    }
  }

  render() {
    const authorOptions = []

    return (
      <FormModal
        title='New Book'
        submitText='Add'
        disabled={this.props.disabled}
        onSubmit={this.createBook.bind(this)}
        onCancel={this.props.onClose}
      >
        <FormGroup>
          <TextInput
            placeholder="Title"
            value={this.state.title || ''}
            onChange={this.setTitle.bind(this)}
          />
        </FormGroup>

        <FormGroup>
          <Select
            placeholder='Book'
            value={this.state.authorGuid || ''}
            options={authorOptions}
            onChange={this.selectAuthor.bind(this)}
          />
        </FormGroup>
      </FormModal>
    )
  }

}

NewBook.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}
