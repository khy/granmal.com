require('es6-promise').polyfill()
require('isomorphic-fetch')

export const SetAccount = 'SetAccount'

export function logIn(email, password) {
  return function (dispatch) {
    return fetch('/auth/session', {
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

export function signUp(email, handle, name, password) {
  return function (dispatch) {
    return fetch('/auth/accounts', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, handle, name, password }),
      credentials: 'same-origin',
    }).then((response) => {
      return response.json()
    }).then((account) => {
      dispatch({ type: SetAccount, account })
    })
  }
}

export function logOut() {
  return function (dispatch) {
    return fetch('/auth/session', {
      method: 'delete',
      credentials: 'same-origin',
    }).then((account) => {
      dispatch({ type: SetAccount, undefined })
    })
  }
}
