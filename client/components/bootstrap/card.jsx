import React from 'react'

export const Card = (props) => <div className="card">{props.children}</div>

export const CardHeader = (props) => <div className="card-header">{props.children}</div>

export const CardHeaderLink = (props) => {
  return(
    <a {...props} className={"pull-xs-right " + props.className} href={props.href || "#"}>
      {props.children}
    </a>
  )
}

export const CardList = (props) => <ul className="list-group list-group-flush">{props.children}</ul>
