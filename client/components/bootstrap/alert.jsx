import React from 'react'

export function Alert(props) {
  return (
    <div {...props} className={`alert alert-${props.context}`} role="alert">
      {props.children}
    </div>
  )
}

export const AlertSuccess = (props) => <Alert context='success'>{props.children}</Alert>
export const AlertInfo = (props) => <Alert context='info'>{props.children}</Alert>
export const AlertWarning = (props) => <Alert context='warning'>{props.children}</Alert>
export const AlertDanger = (props) => <Alert context='danger'>{props.children}</Alert>
