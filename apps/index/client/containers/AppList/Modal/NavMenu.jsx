import React from 'react'
import { Link } from 'react-router'

import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'

export default class NavMenu extends React.Component {

  render() {
    let authLink

    if (this.props.account) {
      authLink = <a className="list-group-item" onClick={this.props.onLogOut} href="#">Log Out</a>
    } else {
      authLink = <a className="list-group-item" onClick={this.props.onLogIn} href="#">Log In</a>
    }

    return (
      <BaseNavMenu onClose={this.props.onClose}>
        {authLink}
      </BaseNavMenu>
    )
  }

}
