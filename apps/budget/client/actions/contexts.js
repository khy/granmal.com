import _find from 'lodash/find'

import { budgetClient } from 'budget/client/lib/clients'
import { fetchContexts } from 'budget/client/actions/app'
import { hideModal, disableModal } from 'client/actions/modal'

export const ActionTypes = {
  AddContextUserReceive: 'AddContextUserReceive',
}

const AT = ActionTypes

export function addContextUser(contextGuid, userGuid) {
  return function (dispatch, getState) {
    dispatch(disableModal())

    budgetClient(getState()).post(`/contexts/${contextGuid}/users`, { userGuid }).then((context) => {
      dispatch(fetchContexts())

      const user = _find(context.users, (user) => {
        return user.guid === userGuid
      })

      dispatch({
        type: AT.AddContextUserReceive,
        contextName: context.name,
        userName: user.name,
      })

      dispatch(hideModal())
    })
  }
}
