import React from 'react'
import { connect } from 'react-redux'
import { browserHistory, Link } from 'react-router'
import _chunk from 'lodash/chunk'

import { fetchBooksForIndex, fetchDogEarsForIndex } from 'dogEars/client/actions'
import { Card, CardBlock } from 'client/components/bootstrap/card'
import DogEarCard from 'dogEars/client/components/DogEarCard'

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
    const dogEarCards = this.props.dogEars.records.map((dogEar) => {
      return (
        <DogEarCard key={dogEar.guid} dogEar={dogEar} clickable={true} />
      )
    })

    return (
      <div className="card-columns">
        {dogEarCards}
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
