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
