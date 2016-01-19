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
        <ModalBody>
          <div className="list-group">
            <Link to="/budget" className="list-group-item">Home</Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <SecondaryButton onClick={this.close.bind(this)}>Close</SecondaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}
