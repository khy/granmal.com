import React from 'react'
import { Link } from 'react-router'

import { SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class Menu extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  render() {
    return (
      <Modal>
        <div className="modal-header"></div>
        <div className="list-group list-group-flush">
          <Link to="/budget/transactionTypes" className="list-group-item">Transaction Types</Link>
        </div>
        <ModalFooter>
          <SecondaryButton onClick={this.close.bind(this)}>Close</SecondaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}
