export const getTop14TeamInfoFromName = (name: string) => {

    const match = Top14RugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return null
    }
}


export const Top14RugbyTeams = [
  {
    type: 'Top14 Club',
    displayName: 'Bayonne',
    abbreviation: 'BAY',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Bordeaux Begles',
    abbreviation: 'BEG',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Brive',
    abbreviation: 'BRIVE',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Castres Olympique',
    abbreviation: 'CAS',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Clermont Auvergne',
    abbreviation: 'CLER',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'La Rochelle',
    abbreviation: 'LA RO',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Lyon',
    abbreviation: 'LYON',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Montpellier Herault',
    abbreviation: 'MONTP',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Vannes',
    abbreviation: 'VANN',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Pau',
    abbreviation: 'PAU',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Perpignan',
    abbreviation: 'PERP',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Racing 92',
    abbreviation: 'RAMET',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Stade Francais Paris',
    abbreviation: 'SFRAN',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Toulon',
    abbreviation: 'TOUL',
    logo: '',
    colour: '#',
  },
  {
    type: 'Top14 Club',
    displayName: 'Stade Toulousain',
    abbreviation: 'TOUL',
    logo: '',
    colour: '#',
  },
  
];