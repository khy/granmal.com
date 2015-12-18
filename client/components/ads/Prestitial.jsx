var React = require('react')

export default class Prestitial extends React.Component {

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    let button

    if (this.props.appIsReady) {
      button = <button type="button" className="btn btn-lg btn-primary" onClick={this.props.onContinue}>Continue</button>
    } else {
      button = <button type="button" className="btn btn-lg btn-primary" disabled>Loading</button>
    }

    return (
      <div className="container prestitial">
        <div className="ad">
          <ins className="adsbygoogle"
            style={{display: 'block'}}
            data-ad-client="ca-pub-3521883129684519"
            data-ad-slot="2681225984"
            data-ad-format="auto"></ins>
        </div>

        <div className="button">
          {button}
        </div>
      </div>
    )
  }

}
