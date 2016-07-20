import React from 'react'

import _omit from 'lodash/omit'

export const AlertContext = {
  Success: 'success',
  Info: 'info',
  Warning: 'warning',
  Danger: 'danger',
}

export function Alert(props) {
  const other = _omit(props, ['context', 'children'])

  return (
    <div {...other} className={`alert alert-${props.context}`} role="alert">
      {props.children}
    </div>
  )
}

export const AlertSuccess = (props) => <Alert context={AlertContext.Success}>{props.children}</Alert>
export const AlertInfo = (props) => <Alert context={AlertContext.Info}>{props.children}</Alert>
export const AlertWarning = (props) => <Alert context={AlertContext.Warning}>{props.children}</Alert>
export const AlertDanger = (props) => <Alert context={AlertContext.Danger}>{props.children}</Alert>
