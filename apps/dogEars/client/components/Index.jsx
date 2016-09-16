import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import _chunk from 'lodash/chunk'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'

import { fetchBooksForIndex, fetchDogEarsForIndex } from 'dogEars/client/actions'
import { Card, CardBlock } from 'client/components/bootstrap/card'
import DogEarListCard from 'dogEars/client/components/DogEarListCard'

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

    const dogEarListCards = _map(groupedNotes, (dogEars) => {
      return (
        <DogEarListCard
          key={dogEars[0].edition.title}
          dogEars={dogEars}
          clickable={true}
        />
      )
    })

    return (
      <div>
        {dogEarListCards}
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
