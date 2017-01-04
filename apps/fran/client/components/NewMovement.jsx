import React from 'react'
import Select from 'react-select'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'

export default class NewMovement extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  addMovement() {
    this.props.onAdd(this.state)
  }

  setAttribute(key, event) {
    let newState = {}
    newState[key] = event.target.value
    this.setState(newState)
  }

  render() {
    return (
      <FormModal
        title='New Movement'
        submitText='Add'
        disabled={this.props.disabled}
        onSubmit={this.addMovement.bind(this)}
        onCancel={this.props.onClose}
      >
        <FormGroup>
          <label htmlFor='newMovementName'>Name</label>
          <TextInput
            id='newMovementName'
            onChange={this.setAttribute.bind(this, "name")}
            disabled={this.props.disabled}
          />
        </FormGroup>
      </FormModal>
    )
  }

}

NewMovement.propTypes = {
  disabled: React.PropTypes.bool,
  onAdd: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}

NewMovement.defaultProps = {
  disabled: false,
}
