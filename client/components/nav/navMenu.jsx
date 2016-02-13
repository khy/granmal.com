import React from 'react'
import { Link } from 'react-router'

import { SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export class NavMenu extends React.Component {

  close(event) {
    event.preventDefault()
    this.props.onClose()
  }

  render() {
    return (
      <Modal>
        <div className="modal-header"></div>
        <div className="list-group list-group-flush">
          {this.props.children}
        </div>
        <ModalFooter>
          <SecondaryButton onClick={this.close.bind(this)}>Close</SecondaryButton>
        </ModalFooter>
      </Modal>
    )
  }

}

export function NavMenuLink(props) {
  return <Link {...props} className="list-group-item">{props.children}</Link>
}
