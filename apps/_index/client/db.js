export const apps = [
  {
    key: 'shiki',
    name: 'Shiki',
    description: 'Giving everyone the power to create and share ideas and information instantly, without barriers. With haikus.',
    betaAt: new Date(2016, 6, 1)
  },
  {
    key: 'budget',
    name: 'Budget',
    description: 'Personal finances for obsessive compulsives.',
    alphaAt: new Date(2016, 2, 15)
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
    ]
  }
]
