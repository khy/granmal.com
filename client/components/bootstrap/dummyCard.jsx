import React from 'react'
import _random from 'lodash/random'
import _times from 'lodash/times'

import { Card, CardHeader, CardBlock } from 'client/components/bootstrap/card'

export const DummyCard = (props) => {
  const content = (high, low) => _times(_random(high, low), (i) => (
    <i className="fa fa-stop" key={`dummyCardContent${i}`}></i>
  ))

  return (
    <Card {...props} className="dummy-card">
      <CardHeader>
        {content(5,10)}
      </CardHeader>
      <CardBlock>
        <p key="dummyCardBlock1">{content(10,20)}</p>
        <p key="dummyCardBlock2">{content(10,20)}</p>
        <p key="dummyCardBlock3">{content(10,20)}</p>
      </CardBlock>
    </Card>
  )
}
