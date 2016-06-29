import _assign from 'lodash/assign'

import { likeHaiku, unlikeHaiku, showNewHaikuModal } from 'shiki/client/actions'

export const baseMapDispatchToProps = (others) => {
  return (dispatch) => _assign({
    onLike: (haiku) => { dispatch(likeHaiku(haiku)) },
    onRespond: (haiku) => { dispatch(showNewHaikuModal(haiku)) },
    onUnlike: (haiku) => { dispatch(unlikeHaiku(haiku)) },
  }, others(dispatch))
}
