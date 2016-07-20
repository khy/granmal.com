import React from 'react'
import { Link } from 'react-router'

import BaseNavbar from 'client/components/nav/Navbar'
import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'

export function Navbar(props) {
  return <BaseNavbar {...props} title="Book Club" titleUrl="/book-club" />
}

export class NavMenu extends React.Component {

  onNewNote() {
    this.props.onClose()
    this.props.onNewNote()
  }

  render() {
    return (
      <BaseNavMenu onClose={this.props.onClose}>
        <a onClick={this.onNewNote.bind(this)} className="list-group-item">New Note</a>
        <NavMenuLink to={"/book-club"} onClick={this.props.onClose}>Book Club Home</NavMenuLink>
        <a href="/" className="list-group-item">Gran Mal</a>
      </BaseNavMenu>
    )
  }

}

NavMenu.propTypes = {
  onNewNote: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}
