import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'isomorphic-fetch'

export function getJson(url) {
  return fetch(url, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'same-origin',
  }).then((response) => {
    return response.json()
  })
}
