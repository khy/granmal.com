import React from 'react'
import { browserHistory, Link } from 'react-router'
import Remarkable from 'remarkable'
import moment from 'moment'

import { Icon } from 'client/components/fontAwesome'
import { Card, CardHeader, CardBlock } from 'client/components/bootstrap/card'

export default function DogEarListCard(props) {

  const dogEars = props.dogEars
  const edition = dogEars[0].edition

  let cardBlocks = dogEars.map((dogEar) => {
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
        browserHistory.push(`/dogEars/dogEars/${dogEar.guid}`)
      }
    }

    let clickableClass

    if (canClick) {
      clickableClass = "dog-ear-card-block-clickable"
    }

    return (
      <CardBlock onClick={onClick} className={["dog-ear-details", clickableClass].join(" ")} key={dogEar.guid}>
        <progress className="progress" value={dogEar.pageNumber} max={dogEar.edition.pageCount}></progress>
        {dogEarDetail}
        <p className="card-text"><small className="text-muted">
          {moment(dogEar.createdAt).format('MMM Do h:mm A')}
        </small></p>
      </CardBlock>
    )
  })

  let imageBlock

  if (props.showImage) {
    imageBlock = <img className="card-img-top img-fluid" src={edition.largeImageUrl} />
  }

  return <Card className="dog-ear-card">
    {imageBlock}
    <CardHeader>
      <Link to={`/dogEars/books/${edition.title}`}>{edition.title}</Link> by {edition.authors[0]}
    </CardHeader>
    {cardBlocks}
  </Card>

}
