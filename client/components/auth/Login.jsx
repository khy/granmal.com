var React = require('react')

export default class Login extends React.Component {

  onLogin(event) {
    event.preventDefault()

    this.props.onLogin(
      this.refs.emailInput.value,
      this.refs.passwordInput.value
    )
  }

  render() {
    let alert

    if (this.props.message) {
      alert = (
        <div className="alert alert-danger" role="alert">{this.props.message}</div>
      )
    }

    return (
      <div className="container">
        {alert}
        <form onSubmit={this.onLogin.bind(this)}>
          <fieldset className="form-group">
            <label>Email</label>
            <input ref="emailInput" className="form-control" type="email" />
          </fieldset>

          <fieldset className="form-group">
            <label>Password</label>
            <input ref="passwordInput" className="form-control" type="password" />
          </fieldset>

          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    )
  }

}
