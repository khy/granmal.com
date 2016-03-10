import React from 'react'
import { Link } from 'react-router'

import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'
import { SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class NavMenu extends React.Component {

  render() {
    const RouteLink = (display, path) => {
      return <NavMenuLink to={path} onClick={this.props.onClose}>{display}</NavMenuLink>
    }

    return (
      <BaseNavMenu onClose={this.props.onClose}>
        {RouteLink("Transaction Types", "/budget/transactionTypes")}
        {RouteLink("Home", "/budget")}
      </BaseNavMenu>
    )
  }

}
