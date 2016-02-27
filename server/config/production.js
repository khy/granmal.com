const uselessBaseUrl = 'http://useless.io'

module.exports = {
  pg: {
    url: process.env.PG_URL,
  },
  useless: {
    accessToken: process.env.USELESS_ACCESS_TOKEN,
    urls: {
      core: (uselessBaseUrl + '/core'),
    },
  }
}
