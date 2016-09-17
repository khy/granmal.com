import React from 'react'
import { browserHistory } from 'react-router'
import moment from 'moment'

import { Icon } from 'client/components/fontAwesome'
import { CardBlock } from 'client/components/bootstrap/card'

export default function DogEarCardBlock(props) {

  const dogEar = props.dogEar
  let dogEarDetail, canClick

  if (dogEar.note) {
    dogEarDetail = <span>
      <Icon name="pencil-square-o" />
      <a href="#">{dogEar.createdBy.user.name}</a> left a note on <b>p.{dogEar.pageNumber}</b>
    </span>
    canClick = props.clickable
  } else {
    dogEarDetail = <span>
      <Icon name="book" />
      <a href="#">{dogEar.createdBy.user.name}</a> read to page <b>p.{dogEar.pageNumber}</b>
    </span>
    canClick = false
  }

  function onClick(event, guid) {
    if (canClick) {
      event.preventDefault()
      browserHistory.push(`/dogEars/notes/${dogEar.guid}`)
    }
  }

  let clickableClass

  if (canClick) {
    clickableClass = "dog-ear-card-block-clickable"
  }

  return (
    <CardBlock onClick={onClick} className={["dog-ear-details", clickableClass].join(" ")}>
      <progress className="progress" value={dogEar.pageNumber} max={dogEar.edition.pageCount}></progress>
      {dogEarDetail}
      <p className="card-text">
        <small className="text-muted">
          {moment(dogEar.createdAt).format('MMM Do h:mm A')}
        </small>
      </p>
    </CardBlock>
  )

}
