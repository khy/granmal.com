import { shortenGuid } from 'budget/client/lib/guid'

describe('shortenGuid', () => {
  it('returns the first 8 characters of the specified GUID', () => {
    expect(shortenGuid('44ac4b16-1601-4e56-b05b-761df3d25ee9')).toBe('44ac4b16')
  })
})
