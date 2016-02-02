import es6Promise from 'es6-promise'
es6Promise.polyfill()

import 'isomorphic-fetch'

export class UselessClient {

  constructor(baseUrl, auth) {
    this.baseUrl = baseUrl
    this.auth = auth
  }

  get(path, fullResponse = false) {
    const response = fetch(this.baseUrl + path, {
      method: 'get',
      headers: {
        'Authorization': this.auth,
        'Accept': 'application/json',
      },
    })

    if (fullResponse) {
      return response
    } else {
      return response.then((response) => {
        return response.json()
      })
    }
  }

}
