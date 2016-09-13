import React from 'react'
import { Link } from 'react-router'

import BaseNavbar from 'client/components/nav/Navbar'
import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'

export function Navbar(props) {
  return <BaseNavbar {...props} title="Book Club" titleUrl="/book-club" />
}

export class NavMenu extends React.Component {

  onNewDogEar(event) {
    event.preventDefault()
    this.props.onClose()
    this.props.onNewDogEar()
  }

  render() {
    return (
      <BaseNavMenu onClose={this.props.onClose}>
        <a onClick={this.onNewDogEar.bind(this)} className="list-group-item" href="#">New Dog Ear</a>
        <NavMenuLink to={"/book-club"} onClick={this.props.onClose}>Book Club Home</NavMenuLink>
        <a href="/" className="list-group-item">Gran Mal</a>
      </BaseNavMenu>
    )
  }

}

NavMenu.propTypes = {
  onNewDogEar: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
}
