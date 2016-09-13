import React from 'react'
import { connect } from 'react-redux'

import { DummyCard } from 'client/components/bootstrap/dummyCard'
import { Card, CardBlock } from 'client/components/bootstrap/card'
import { fetchBookForShowBook, fetchDogEarsForShowBook } from 'bookClub/client/actions'
import DogEarCard from 'bookClub/client/components/DogEarCard'

class ShowBook extends React.Component {

  componentWillMount() {
    this.props.clearBook()
    this.load(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.load(newProps)
  }

  load(props) {
    props.fetchBook(props.params.title)
    props.fetchDogEars(props.params.title)
  }

  render() {
    const bookMeta = this.props.book
    const book = bookMeta.record

    let bookCard

    if (book) {
      bookCard = (
        <Card>
          <img className="card-img-top img-fluid" src={book.largeImageUrl} />
          <CardBlock>
            <h4 className="card-title">{book.title}</h4>
            <p className="card-subtitle text-muted">{book.authors[0]}</p>
          </CardBlock>
        </Card>
      )
    } else {
      bookCard = <DummyCard />
    }

    const dogEarsMeta = this.props.dogEars
    const dogEars = dogEarsMeta.records

    let dogEarCards

    if (!dogEarsMeta.isPending) {
      dogEarCards = dogEars.map((dogEar) => (
        <DogEarCard key={dogEar.guid} dogEar={dogEar} book={book} clickable={true} />
      ))
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          {bookCard}
        </div>
        <div className="col-xs-12 col-sm-9">
          {dogEarCards}
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state.app.showBook
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearBook: () => {
      dispatch({ type: 'showBook.clear' })
    },
    fetchBook: (title) => {
      dispatch(fetchBookForShowBook(title))
    },
    fetchDogEars: (title) => {
      dispatch(fetchDogEarsForShowBook(title))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowBook)
