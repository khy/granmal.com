import React from 'react'
import { Link } from 'react-router'

import { NavMenu as BaseNavMenu, NavMenuLink } from 'client/components/nav/navMenu'

export default class NavMenu extends React.Component {

  onNewHaiku() {
    this.props.onClose()
    this.props.onNewHaiku()
  }

  render() {
    return (
      <BaseNavMenu onClose={this.props.onClose}>
        <a onClick={this.onNewHaiku.bind(this)} className="list-group-item">New Haiku</a>
        <NavMenuLink to={"/shiki"} onClick={this.props.onClose}>Shiki Home</NavMenuLink>
        <a href="/" className="list-group-item">Gran Mal</a>
      </BaseNavMenu>
    )
  }

}
