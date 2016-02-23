const uselessBaseUrl = 'http://localhost:9000'

module.exports = {
  pg: {
    url: 'postgres://localhost/granmal_dev',
  },
  useless: {
    accessToken: 'dummy',
    urls: {
      core: (uselessBaseUrl + '/core'),
    },
  }
}
