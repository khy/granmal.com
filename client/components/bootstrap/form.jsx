import React from 'react'

export function FormGroup(props) {
  var context, error

  if (props.error) {
    context = "has-danger"
    error = <span className="form-control-feedback">{props.error}</span>
  }

  return (
    <fieldset className={"form-group " + context}>
      {props.children}
      {error}
    </fieldset>
  )
}

export function Input(props) {
  return <input {...props} className="form-control" type={props.type} />
}

export function TextInput(props) {
  return <Input {...props} type="text"/>
}

export function TextArea(props) {
  return <textarea {...props} className="form-control"></textarea>
}
