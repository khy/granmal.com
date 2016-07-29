import React from 'react'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'

export default class NewBook extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      title: props.initialTitle,
      errors: {},
    }
  }

  createBook() {
    var errors = {}

    if (!this.state.title) {
      errors.title = 'Required'
    }

    if (!this.state.authorGuid && !this.state.authorName) {
      errors.author = 'Required'
    }

    if (_isEmpty(errors)) {
      this.props.onCreate({
        title: this.state.title,
        authorGuid: this.state.authorGuid,
        authorName: this.state.authorName,
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
      this.setState({selectValue: option.value})

      if (option.value === 'new') {
        this.setState({authorName: option.label, authorGuid: undefined})
      } else {
        this.setState({authorGuid: option.value, authorName: undefined})
      }
    }
  }

  handleSelectInput(name) {
    this.props.onFetchAuthors(name)
    this.setState({selectInput: name})
  }

  render() {
    const authorOptions = this.props.authorOptions.map((author) => {
      return { label: author.name, value: author.guid }
    })

    if (this.state.selectInput) {
      authorOptions.push({label: `Add "${this.state.selectInput}"`, value: 'new'})
    }

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
            value={this.state.selectValue || ''}
            onChange={this.selectAuthor.bind(this)}
            onInputChange={this.handleSelectInput.bind(this)}
            options={authorOptions}
            isLoading={this.props.authorOptionsLoading}
          />
        </FormGroup>
      </FormModal>
    )
  }

}

NewBook.propTypes = {
  authorOptions: React.PropTypes.arrayOf(React.PropTypes.object),
  authorOptionsLoading: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  initialTitle: React.PropTypes.string,
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onFetchAuthors: React.PropTypes.func.isRequired,
}

NewBook.defaultProps = {
  authorOptions: [],
  authorOptionsLoading: false,
  disabled: false,
}
