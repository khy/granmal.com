export function getQueryParam(url, key) {
  const queryString = url.split('?')[1]

  if (queryString) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const rx = new RegExp(escapedKey + "=([^&]*)(?:&.*)?$")
    const match = rx.exec(queryString)
    if (match) { return match[1] }
  }
}

const LinkHeaderRx = /<([^>]+)>\s*;\s*rel="([a-z\-]+)"/

export function parseLinkHeader(linkHeader) {
  let result = {}

  linkHeader.split(",").forEach((link) => {
    const rxResult = LinkHeaderRx.exec(link.trim())

    if (rxResult) {
      const url = rxResult[1]
      const rel = rxResult[2]

      if (rel) { result[rel] = url }
    }
  })

  return result
}
