export const apps = [
  {
    key: 'budget',
    name: 'Budget',
    description: 'Personal finances for obsessive compulsives.',
    alphaAt: new Date(2016, 2, 15)
  },
  {
    key: 'dogEars',
    name: 'Dog Ears',
    description: 'A book club.',
    betaAt: new Date(2016, 9, 15)
  },
  {
    key: 'shiki',
    name: 'Shiki',
    description: 'A social network with haikus.',
    releasedAt: new Date(2016, 6, 4),
    betaAt: new Date(2016, 6, 1)
  },
]

export const mainImages = [
  {
    key: 'badAss',
    url: 'bad-ass.jpg'
  }
]

export const layouts = [
  {
    at: new Date(2017, 7, 1),
    mainImageKey: 'badAss',
    items: [
      { type: 'app', key: 'shiki' },
      { type: 'app', key: 'dogEars' },
    ]
  }
]
