import React from 'react'
import _omit from 'lodash/omit'

export function Icon(props) {
  const rest = _omit(props, ['srText', 'name'])

  return (
    <span>
      <i {...rest}
        className={`fa fa-${props.name} ` + props.className}
        aria-hidden="true"
      ></i>
      <span className="sr-only">{props.srText || props.name}</span>
    </span>
  )
}
