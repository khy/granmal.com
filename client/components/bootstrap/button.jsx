import React from 'react'

export function Button(props) {
  return (
    <button {...props}
      type={props.type || "button"}
      className={"btn " + props.className}
    >
      {props.children}
    </button>
  )
}

export function PrimaryButton(props) {
  return <Button {...props} className={"btn-primary " + props.className}>{props.children}</Button>
}

export function SecondaryButton(props) {
  return <Button {...props} className={"btn-secondary " + props.className}>{props.children}</Button>
}

export function ButtonGroup(props) {
  return <div className={"btn-group " + props.className} role="group">{props.children}</div>
}
