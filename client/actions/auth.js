require('es6-promise').polyfill()
require('isomorphic-fetch')

export const SetAccount = 'SetAccount'

export function login(email, password) {
  return function (dispatch) {
    fetch('/sessions', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'same-origin',
    }).then((response) => {
      return response.json()
    }).then((account) => {
      dispatch({ type: SetAccount, account })
    })
  }
}
