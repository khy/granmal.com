const uselessBaseUrl = 'http://localhost:9000'

module.exports = {
  pg: {
    url: 'postgres://localhost/granmal_dev',
  },
  useless: {
    accessToken: process.env.USELESS_ACCESS_TOKEN,
    urls: {
      core: (uselessBaseUrl + '/core'),
    },
  }
}
