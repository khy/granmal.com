import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import _assign from 'lodash/assign'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'

export default class NewHaiku extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      lineOne: '',
      lineTwo: '',
      lineThree: '',
      errors: {}
    }

    this.setLineOne = this.setLine.bind(this, 'lineOne')
    this.setLineTwo = this.setLine.bind(this, 'lineTwo')
    this.setLineThree = this.setLine.bind(this, 'lineThree')

    this.createHaiku = this.createHaiku.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentWillReceiveProps(newProps) {
    const errors = _assign(this.state.errors, this.formatServerErrors(newProps.errors))
    this.setState({ errors })
  }

  formatServerErrors(errors) {
    const formatError = (errors) => {
      if (errors && errors[0]) {
        switch (errors[0].key) {
          case "useless.haiku.error.tooFewSyllables":
            return "Too few syllables"
          case "useless.haiku.error.tooManySyllables":
            return "Too many syllables"
          default:
            console.error("Unknown server validation error: " + errors[0].key)
        }
      }
    }

    if (errors) {
      let _errors = {}

      if (errors.line1) { _errors.lineOne = formatError(errors.line1) }
      if (errors.line2) { _errors.lineTwo = formatError(errors.line2) }
      if (errors.line3) { _errors.lineThree = formatError(errors.line3) }

      return _errors
    }
  }

  setLine(lineKey, event) {
    let newState = {}
    newState[lineKey] = event.target.value
    this.setState(newState)
  }

  createHaiku() {
    var errors = {}

    if (this.state.lineOne.length === 0) {
      errors.lineOne = 'Required'
    }

    if (this.state.lineTwo.length === 0) {
      errors.lineTwo = 'Required'
    }

    if (this.state.lineThree.length === 0) {
      errors.lineThree = 'Required'
    }

    if (_isEmpty(errors)) {
      this.props.onCreate({
        lines: [this.state.lineOne, this.state.lineTwo, this.state.lineThree]
      })
    } else {
      this.setState({ errors })
    }
  }

  closeModal(event) {
    this.props.onClose()
  }

  render() {
    return (
      <FormModal
        title="New Haiku"
        submitText="Add"
        disabled={this.props.disabled}
        onSubmit={this.createHaiku}
        onCancel={this.closeModal}
      >
        <FormGroup error={this.state.errors.lineOne}>
          <TextInput value={this.state.lineOne} onChange={this.setLineOne} placeholder="5 Syllables" />
        </FormGroup>

        <FormGroup error={this.state.errors.lineTwo}>
          <TextInput value={this.state.lineTwo} onChange={this.setLineTwo} placeholder="7 Syllables" />
        </FormGroup>

        <FormGroup error={this.state.errors.lineThree}>
          <TextInput value={this.state.lineThree} onChange={this.setLineThree} placeholder="5 Syllables" />
        </FormGroup>
      </FormModal>
    )
  }

}

NewHaiku.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}
