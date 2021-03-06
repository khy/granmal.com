import React from 'react'

export const Card = (props) => (
  <div {...props} className={['card', props.className].join(' ')}>
    {props.children}
  </div>
)

export const CardHeader = (props) => <div className="card-header">{props.children}</div>

export const CardBlock = (props) => {
  return(
    <div {...props} className={['card-block', props.className].join(' ')}>
      {props.children}
    </div>
  )
}

export const CardHeaderLink = (props) => {
  return(
    <a {...props} className={['float-xs-right', props.className].join(' ')} href={props.href || "#"}>
      {props.children}
    </a>
  )
}

export const CardList = (props) => <ul className="list-group list-group-flush">{props.children}</ul>
