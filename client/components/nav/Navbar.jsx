import React from 'react'
import { Link } from 'react-router'

export default class Navbar extends React.Component {

  render() {
    let button

    if (this.props.onButtonClick) {
      button = <button onClick={this.props.onButtonClick} className="navbar-toggler float-xs-right" type="button">
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

Navbar.propTypes = {
  title: React.PropTypes.string.isRequired,
  titleUrl: React.PropTypes.string.isRequired,
  onButtonClick: React.PropTypes.func,
  buttonContent: React.PropTypes.string,
}

Navbar.defaultProps = {
  buttonContent: '\u2630',
}
