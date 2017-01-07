import Client from 'client/lib/Client'
import { uselessBearerToken } from 'common/account'

export function workoutsClient(state) { return uselessClient(state, 'workouts') }
export function coreClient(state) { return uselessClient(state, 'core') }

let clients = {}

function uselessClient(state, api) {
  if (!clients[api]) {
    clients[api] = new Client(
      state.config.useless.urls[api],
      uselessBearerToken(state.auth.account)
    )
  }

  return clients[api]
}
