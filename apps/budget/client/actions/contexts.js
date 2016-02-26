import _find from 'lodash/collection/find'

import { budgetClient } from 'budget/client/lib/clients'
import { fetchContexts } from 'budget/client/actions/app'

export const ActionTypes = {
  AddContextUserReceive: 'AddContextUserReceive',
  AddContextUserRequest: 'AddContextUserRequest',
}

const AT = ActionTypes

export function addContextUser(contextGuid, userGuid) {
  return function (dispatch, getState) {
    dispatch({ type: AT.AddContextUserRequest })

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
    })
  }
}
