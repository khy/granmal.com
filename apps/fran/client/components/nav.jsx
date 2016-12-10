import React from 'react'
import { Link } from 'react-router'

import BaseNavbar from 'client/components/nav/Navbar'
import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'

export function Navbar(props) {
  return <BaseNavbar {...props} title="Dog Ears" titleUrl="/dogEars" />
}

export class NavMenu extends React.Component {

  onNewDogEar(event) {
    event.preventDefault()
    this.props.onClose()
  }

  render() {
    return (
      <BaseNavMenu onClose={this.props.onClose}>
        <NavMenuLink to={"/fran"} onClick={this.props.onClose}>Fran Home</NavMenuLink>
        <a href="/" className="list-group-item">Gran Mal</a>
      </BaseNavMenu>
    )
  }

}

NavMenu.propTypes = {
  onClose: React.PropTypes.func.isRequired,
}
