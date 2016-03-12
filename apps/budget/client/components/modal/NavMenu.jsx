import React from 'react'
import { Link } from 'react-router'

import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'
import { SecondaryButton } from 'client/components/bootstrap/button'
import { Modal, ModalBody, ModalFooter } from 'client/components/bootstrap/modal'

export default class NavMenu extends React.Component {

  render() {
    const RouteLink = (display, path) => {
      const fullPath = "/budget" + path
      return <NavMenuLink to={fullPath} onClick={this.props.onClose}>{display}</NavMenuLink>
    }

    return (
      <BaseNavMenu onClose={this.props.onClose}>
        {RouteLink("Months", "/months")}
        {RouteLink("Transaction Types", "/transactionTypes")}
        {RouteLink("Home", "/")}
      </BaseNavMenu>
    )
  }

}
