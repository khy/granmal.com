import React from 'react'
import moment from 'moment'

export default class AppCard extends React.Component {

  render() {
    let label, date

    if (this.props.betaAt) {
      date = this.props.betaAt
      label = <span className="label label-warning">{'\u03B2'}</span>
    } else if (this.props.alphaAt) {
      date = this.props.alphaAt
      label = <span className="label label-danger">{'\u03B1'}</span>
    } else {
      date = this.props.releasedAt
    }

    const displayDate = moment(date).format('MMMM Do, YYYY')

    return (
      <div className="card-app-link" onClick={this.props.onClick}>
        <div className="card-block">
          <h4 className="card-title">{this.props.name}</h4>
          <p className="card-text">{this.props.description}</p>
          <p className="card-text">{label} <small className="text-muted">{displayDate}</small></p>
        </div>
      </div>
    )
  }

}
