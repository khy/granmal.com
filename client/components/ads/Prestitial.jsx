var React = require('react')

export default class Prestitial extends React.Component {

  render() {
    let button

    if (this.props.appIsReady) {
      button = <button type="button" className="btn btn-lg btn-primary" onClick={this.props.onContinue}>Continue</button>
    } else {
      button = <button type="button" className="btn btn-lg btn-primary" disabled>Loading</button>
    }

    return (
      <div className="container prestitial">
        <div className="button">
          {button}
        </div>
      </div>
    )
  }

}
