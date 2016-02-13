import React from 'react'
import { Link } from 'react-router'

export default class Navbar extends React.Component {

  render() {
    let button

    if (this.props.onMenuClick) {
      button = <button onClick={this.props.onMenuClick} className="navbar-toggler pull-right" type="button">
        &#9776;
      </button>
    }


    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="container">
          <Link to={this.props.titleUrl} className="navbar-brand">{this.props.title}</Link>

          {button}
        </div>
      </nav>
    )
  }

}
