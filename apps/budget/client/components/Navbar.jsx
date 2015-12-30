import React from 'react'
import { Link } from 'react-router'

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="container">
          <Link to="/budget" className="navbar-brand">Budget</Link>
        </div>
      </nav>
    )
  }

}
