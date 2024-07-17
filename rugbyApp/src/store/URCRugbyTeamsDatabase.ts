import { LeinsterLogo } from "./URCTeamLogos/URCTeams"


export const getURCTeamInfoFromName = (name: string) => {

    const match = URCRugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return null
    }
}


export const URCRugbyTeams = [
  {
    type: 'URC Club',
    displayName: 'Leinster',
    abbreviation: 'LEINS',
    logo: LeinsterLogo,
    colour: '#003287',
  },
  {
    type: 'URC Club',
    displayName: 'Munster',
    abbreviation: 'MUNST',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25925.png',
    colour: '#cd0a2d',
  },
  {
    type: 'URC Club',
    displayName: 'Connacht',
    abbreviation: 'CONN',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25923.png',
    colour: '#00b446',
  },
  {
    type: 'URC Club',
    displayName: 'Ulster',
    abbreviation: 'ULST',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25926.png',
    colour: '#e61d03',
  },
  {
    type: 'URC Club',
    displayName: 'Edinburgh',
    abbreviation: 'EDINB',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25951.png',
    colour: '#1e144b',
  },
  {
    type: 'URC Club',
    displayName: 'Glasgow Warriors',
    abbreviation: 'GLASG',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25952.png',
    colour: '#5aaaf0',
  },
  {
    type: 'URC Club',
    displayName: 'Cardiff Blues',
    abbreviation: 'CDB',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25965.png',
    colour: '#6ebeff',
  },
  {
    type: 'URC Club',
    displayName: 'Scarlets',
    abbreviation: 'SCARL',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25966.png',
    colour: '#78040d',
  },
  {
    type: 'URC Club',
    displayName: 'Ospreys',
    abbreviation: 'OSP',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25968.png',
    colour: '#5a5a64',
  },
  {
    type: 'URC Club',
    displayName: 'Dragons',
    abbreviation: 'DRA',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25967.png',
    colour: '#ffaa00',
  },
  {
    type: 'URC Club',
    displayName: 'Benetton Treviso',
    abbreviation: 'TRE',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25927.png',
    colour: '#00b46f',
  },
  {
    type: 'URC Club',
    displayName: 'Zebre Parma',
    abbreviation: 'ZEB',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/167124.png',
    colour: '#233268',
  },
  {
    type: 'URC Club',
    displayName: 'Stormers',
    abbreviation: 'STORM',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25962.png',
    colour: '#005295',
  },
  {
    type: 'URC Club',
    displayName: 'Bulls',
    abbreviation: 'BULLS',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25953.png',
    colour: '#0082e6',
  },
  {
    type: 'URC Club',
    displayName: 'Lions',
    abbreviation: 'LIONS',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25958.png',
    colour: '#ff1e29',
  },
  {
    type: 'URC Club',
    displayName: 'Sharks',
    abbreviation: 'SHARK',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25961.png',
    colour: '#504b50',
  },

];