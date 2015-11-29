var React = require('react')

export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <div className="container">
          <h1 className="navbar-brand" href="#">Budget</h1>
        </div>
      </nav>
    )
  }

}
