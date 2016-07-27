import React from 'react'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'

export default class NewBook extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {}
    }
  }

  createBook() {
    var errors = {}

    if (this.state.title.length < 1) {
      errors.title = 'Required'
    }

    if (_isEmpty(errors)) {
      this.props.onCreate({
        title: this.state.title,
        authorGuid: this.state.authorGuid
      })
    } else {
      this.setState({ errors })
    }
  }

  setTitle(event) {
    this.setState({title: event.target.value})
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
        <FormGroup error={this.state.errors.title}>
          <TextInput
            placeholder="Title"
            value={this.state.title || ''}
            onChange={this.setTitle.bind(this)}
          />
        </FormGroup>

        <FormGroup error={this.state.errors.author}>
          <Select
            placeholder='Author'
            value={this.state.authorGuid || ''}
            onChange={this.selectAuthor.bind(this)}
            options={this.props.authorOptions}
            isLoading={this.props.authorOptionsLoading}
          />
        </FormGroup>
      </FormModal>
    )
  }

}

NewBook.propTypes = {
  authorOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  authorOptionsLoading: React.PropTypes.bool.isRequired,
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onFetchAuthors: React.PropTypes.func.isRequired,
}

NewBook.defaultProps = {
  authorOptionsLoading: false,
}
