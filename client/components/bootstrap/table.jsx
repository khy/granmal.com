import React from 'react'

export const Table = (props) => {
  return (
    <div className="table-responsive">
      <table className="table">
        {props.children}
      </table>
    </div>
  )
}

export const Thead = props => <thead><tr>{props.children}</tr></thead>

export const Tbody = props => <tbody>{props.children}</tbody>
