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
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Munster',
    abbreviation: 'MUNST',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25925.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Connacht',
    abbreviation: 'CONN',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25923.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Ulster',
    abbreviation: 'ULST',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25926.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Edinburgh',
    abbreviation: 'EDINB',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25951.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Glasgow Warriors',
    abbreviation: 'GLASG',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25952.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Cardiff Blues',
    abbreviation: 'CDB',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25965.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Scarlets',
    abbreviation: 'SCARL',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25966.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Ospreys',
    abbreviation: 'OSP',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25968.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Dragons',
    abbreviation: 'DRA',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25967.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Benetton Treviso',
    abbreviation: 'TRE',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25927.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Zebre Parma',
    abbreviation: 'ZEB',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/167124.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Stormers',
    abbreviation: 'STORM',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25962.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Bulls',
    abbreviation: 'BULLS',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25953.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Lions',
    abbreviation: 'LIONS',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25958.png',
    colour: '#',
  },
  {
    type: 'URC Club',
    displayName: 'Sharks',
    abbreviation: 'SHARK',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25961.png',
    colour: '#',
  },

];