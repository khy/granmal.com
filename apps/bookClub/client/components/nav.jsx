import React from 'react'
import { Link } from 'react-router'

import BaseNavbar from 'client/components/nav/Navbar'
import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'

export function Navbar(props) {
  return <BaseNavbar {...props} title="Book Club" titleUrl="/bookClub" />
}

export class NavMenu extends React.Component {

  render() {
    return (
      <BaseNavMenu onClose={this.props.onClose}>
        <NavMenuLink to={"/bookClub"} onClick={this.props.onClose}>Book Club Home</NavMenuLink>
        <a href="/" className="list-group-item">Gran Mal</a>
      </BaseNavMenu>
    )
  }

}
