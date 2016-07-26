import React from 'react'

export function FormGroup(props) {
  var error

  if (props.error) {
    error = <span className="text-danger">{props.error}</span>
  }

  return (
    <fieldset className="form-group">
      {props.children}
      {error}
    </fieldset>
  )
}

export function TextInput(props) {
  return <input {...props} className="form-control" type="text" />
}

export function TextArea(props) {
  return <textarea {...props} className="form-control"></textarea>
}
