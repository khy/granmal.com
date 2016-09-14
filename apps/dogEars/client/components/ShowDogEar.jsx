import React from 'react'
import { connect } from 'react-redux'

import { DummyCard } from 'client/components/bootstrap/dummyCard'
import { Card, CardBlock } from 'client/components/bootstrap/card'
import { fetchDogEarForShowDogEar } from 'dogEars/client/actions'
import DogEarCard from 'dogEars/client/components/DogEarCard'

class ShowDogEar extends React.Component {

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
      card = <DogEarCard key={dogEar.guid} dogEar={dogEar} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowDogEar)
