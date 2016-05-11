import React from 'react'
import _isEmpty from 'lodash/isEmpty'

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

  setLine(lineKey, event) {
    let newState = {}
    newState[lineKey] = event.target.value
    this.setState(newState)
  }

  createHaiku() {
    var errors = {}

    if (this.state.lineOne.length === 0) {
      errors.lineOne = 'The first line is required'
    }

    if (this.state.lineTwo.length === 0) {
      errors.lineTwo = 'The second line is required'
    }

    if (this.state.lineThree.length === 0) {
      errors.lineThree = 'The final line is required'
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
