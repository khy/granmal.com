import React from 'react'

export class PagerLink extends React.Component {

  onClick(event) {
    this.props.onClick(event.target.dataset.page)
  }

  render() {
    const pagerClass = `pager-${this.props.direction}`

    if (this.props.page) {
      return (
        <li className={pagerClass}>
          <a onClick={this.onClick.bind(this)} data-page={this.props.page} href="#">
            {this.props.children}
          </a>
        </li>
      )
    } else {
      return <li className={`${pagerClass} disabled`}><a href="#">{this.props.children}</a></li>
    }
  }

}
