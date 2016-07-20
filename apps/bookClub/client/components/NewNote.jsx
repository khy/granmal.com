import React from 'react'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _assign from 'lodash/assign'

import { FormModal } from 'client/components/bootstrap/modal'
import { FormGroup, TextInput } from 'client/components/bootstrap/form'

export default class NewNote extends React.Component {

  createNote() {
    this.props.onCreate()
  }

  render() {

    return (
      <FormModal
        title='New Note'
        submitText='Add'
        disabled={this.props.disabled}
        onSubmit={this.createNote.bind(this)}
        onCancel={this.props.onClose}
      >
        <h1>Da Form</h1>
      </FormModal>
    )
  }

}

NewNote.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}
