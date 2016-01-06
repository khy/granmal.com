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

export function postJson(url, json) {
  return fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json),
    credentials: 'same-origin',
  }).then((response) => {
    return response.json()
  })
}

export function deleteResource(url) {
  return fetch(url, {
    method: 'delete',
    credentials: 'same-origin',
  })
}
