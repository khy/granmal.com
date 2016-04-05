import React from 'react'

export const Pager = (props) => {
  return (
    <nav>
      <ul className="pager">
        {props.children}
      </ul>
    </nav>
  )
}

export class PagerLink extends React.Component {

  onClick(event) {
    event.preventDefault()
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
