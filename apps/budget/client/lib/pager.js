import { getQueryParam, parseLinkHeader } from 'budget/client/lib/http'

export function extractPagerPages(linkHeader) {
  let result = {}

  if (linkHeader) {
    const parsedLinkHeader = parseLinkHeader(linkHeader)

    if (parsedLinkHeader.previous) {
      result.previous = getQueryParam(parsedLinkHeader.previous, 'p.page')
    }

    if (parsedLinkHeader.next) {
      result.next = getQueryParam(parsedLinkHeader.next, 'p.page')
    }
  }

  return result
}
