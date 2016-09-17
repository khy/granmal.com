import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Remarkable from 'remarkable'

import { DummyCard } from 'client/components/bootstrap/dummyCard'
import { Card, CardBlock, CardHeader } from 'client/components/bootstrap/card'
import { fetchDogEarForShowDogEar } from 'dogEars/client/actions'
import DogEarCardBlock from 'dogEars/client/components/DogEarCardBlock'

const md = new Remarkable

class ShowNote extends React.Component {

  componentWillMount() {
    this.props.onFetch(this.props.params.guid)
  }

  componentWillReceiveProps(newProps) {
    newProps.onFetch(newProps.params.guid)
  }

  render() {
    const dogEarMeta = this.props.dogEar
    const dogEar = dogEarMeta.record

    let card

    if (dogEar) {
      const markup = { __html: md.render(dogEar.note) }

      card = (
        <Card key={dogEar.guid}>
          <CardHeader>
            <Link to={`/dogEars/books/${dogEar.edition.title}`}>{dogEar.edition.title}</Link> by {dogEar.edition.authors[0]}
          </CardHeader>
          <DogEarCardBlock dogEar={dogEar} />
          <CardBlock className="markdown-container">
            <span dangerouslySetInnerHTML={markup} />
          </CardBlock>
        </Card>
      )
    } else {
      card = <DummyCard />
    }

    return card
  }

}

const mapStateToProps = (state) => {
  return state.app.showDogEar
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: (guid) => {
      dispatch(fetchDogEarForShowDogEar(guid))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowNote)
