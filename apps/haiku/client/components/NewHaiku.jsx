import React from 'react'

import { FormModal } from 'client/components/bootstrap/modal'

export default class NewHaiku extends React.Component {

  constructor(props) {
    super(props)
    this.createHaiku = this.createHaiku.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  createHaiku() {
    console.log("createHaiku")
  }

  closeModal(event) {
    console.log("closeModal")
  }

  render() {
    return (
      <FormModal
        title="New Haiku"
        submitText="Add"
        onSubmit={this.createHaiku}
        onCancel={this.closeModal}
      >
        <div>Hi</div>
      </FormModal>
    )
  }

}
