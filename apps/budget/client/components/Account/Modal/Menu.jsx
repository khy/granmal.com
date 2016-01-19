import React from 'react'
import { Link } from 'react-router'

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
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.close.bind(this)}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    )
  }

}
