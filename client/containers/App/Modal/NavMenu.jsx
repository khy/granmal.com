import React from 'react'
import { Link } from 'react-router'

import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'

export default class NavMenu extends React.Component {

  render() {
    return (
      <BaseNavMenu onClose={this.props.onClose}>
        <a className="list-group-item" onClick={this.props.onLogOut} href="#">Log Out</a>
      </BaseNavMenu>
    )
  }

}
