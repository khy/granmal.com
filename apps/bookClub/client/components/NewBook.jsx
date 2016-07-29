import React from 'react'
import Select from 'react-select'
import _debounce from 'lodash/debounce'
import _isEmpty from 'lodash/isEmpty'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'

export default class NewBook extends React.Component {

  constructor(props) {
    super(props)

    this.debouncedOnFetchAuthors = _debounce(this.props.onFetchAuthors, 300, {
      maxWait: 800
    })

    this.state = {
      title: props.initialTitle,
      errors: {},
    }
  }

  createBook() {
    let errors = {}
    let authorGuid, authorName

    if (this.state.selectValue === 'new') {
      authorName = this.state.selectInput
    } else {
      authorGuid = this.state.selectValue
    }

    if (!this.state.title) {
      errors.title = 'Required'
    }

    if (!authorGuid && !authorName) {
      errors.author = 'Required'
    }

    if (_isEmpty(errors)) {
      this.props.onCreate({
        title: this.state.title,
        authorGuid: authorGuid,
        authorName: authorName,
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
    }
  }

  handleSelectInput(name) {
    this.debouncedOnFetchAuthors(name)
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
