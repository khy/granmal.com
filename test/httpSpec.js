import { parseLinkHeader, getQueryParam } from 'budget/client/lib/http'

describe('parseLinkHeader', () => {

  it('returns object with the appropriate Link rels as keys', () => {
    const linkHeader = '<http://localhost:9000/budget/transactions?p.page=1&p.limit=10>; rel="first",<http://localhost:9000/budget/transactions?p.page=2&p.limit=10>; rel="next",<http://localhost:9000/budget/transactions?p.page=2&p.limit=10>; rel="last"'
    const parsedLinkHeader = parseLinkHeader(linkHeader)

    expect(parsedLinkHeader.first).toBe('http://localhost:9000/budget/transactions?p.page=1&p.limit=10')
    expect(parsedLinkHeader.next).toBe('http://localhost:9000/budget/transactions?p.page=2&p.limit=10')
    expect(parsedLinkHeader.last).toBe('http://localhost:9000/budget/transactions?p.page=2&p.limit=10')
  })

  it('returns an empty object if the Link header is malformed', () => {
    const linkHeader = 'this is a malformed Link header'
    const parsedLinkHeader = parseLinkHeader(linkHeader)

    expect(parsedLinkHeader).toEqual({})
  })

})


describe('getQueryParam', () => {

  it('returns the specified query param from the specified url', () => {
    const url = 'http://localhost:9000/budget/transactions?p.page=1&p.limit=10'
    const queryParam = getQueryParam(url, 'p.page')
    expect(queryParam).toBe('1')
  })

  it('returns undefined if the specified query param does not exist', () => {
    const url = 'http://localhost:9000/budget/transactions?p.page=1&p.limit=10'
    const queryParam = getQueryParam(url, 'guid')
    expect(queryParam).toBeUndefined
  })

  it('returns undefined if the specified url does not have a query string', () => {
    const url = 'http://localhost:9000/budget/transactions'
    const queryParam = getQueryParam(url, 'p.page')
    expect(queryParam).toBeUndefined
  })

})
