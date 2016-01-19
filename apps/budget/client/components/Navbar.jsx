import React from 'react'
import { Link } from 'react-router'

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="container">
          <Link to="/budget" className="navbar-brand">Budget</Link>

          <button onClick={this.props.onMenuClick} className="navbar-toggler pull-right" type="button">
            &#9776;
          </button>
        </div>
      </nav>
    )
  }

}
