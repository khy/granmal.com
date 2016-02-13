import React from 'react'
import { Link } from 'react-router'

import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'
import { SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class NavMenu extends React.Component {

  render() {
    return (
      <BaseNavMenu onClose={this.props.onClose}>
        <NavMenuLink to="/budget/transactionTypes">Transaction Types</NavMenuLink>
        <NavMenuLink to="/budget">Home</NavMenuLink>
      </BaseNavMenu>
    )
  }

}
