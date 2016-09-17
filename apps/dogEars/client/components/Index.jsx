import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import _chunk from 'lodash/chunk'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'

import { fetchBooksForIndex, fetchDogEarsForIndex } from 'dogEars/client/actions'
import { Card, CardBlock, CardHeader } from 'client/components/bootstrap/card'
import DogEarCardBlock from 'dogEars/client/components/DogEarCardBlock'

class Index extends React.Component {

  componentWillMount() {
    this.props.fetchDogEars()
  }

  componentWillReceiveProps(newProps) {
    newProps.fetchDogEars()
  }

  showBook(title, event) {
    event.preventDefault()
    browserHistory.push(`/dogEars/books/${title}`)
  }

  render() {
    const groupedNotes = _groupBy(this.props.dogEars.records, (dogEar) => {
      return dogEar.edition.title
    })

    const bookDogEarsCards = _map(groupedNotes, (dogEars) => {
      const cardBlocks = dogEars.map((dogEar) => {
        return <DogEarCardBlock dogEar={dogEar} clickable={true} key={dogEar.guid} />
      })

      const edition = dogEars[0].edition

      return (
        <Card key={edition.title}>
          <CardHeader>
            <Link to={`/dogEars/books/${edition.title}`}>{edition.title}</Link> by {edition.authors[0]}
          </CardHeader>
          {cardBlocks}
        </Card>
      )
    })

    return (
      <div>
        {bookDogEarsCards}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state.app.index
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: () => { dispatch(fetchBooksForIndex()) },
    fetchDogEars: () => { dispatch(fetchDogEarsForIndex()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
