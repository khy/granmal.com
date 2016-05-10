"use strict"

function uselessAccessToken(account) {
  if (account && account.access_tokens && account.access_tokens.length > 0) {
    return account.access_tokens.find((accessToken) => {
      return accessToken.oauth_provider === 'useless'
    })
  }
}

function uselessResourceOwnerId(account) {
  const accessToken = uselessAccessToken(account)
  if (accessToken) {
    return accessToken.resource_owner_id
  }
}

function uselessBearerToken(account) {
  const accessToken = uselessAccessToken(account)
  if (accessToken) {
    return accessToken.token
  }
}

module.exports = { uselessResourceOwnerId, uselessBearerToken }
