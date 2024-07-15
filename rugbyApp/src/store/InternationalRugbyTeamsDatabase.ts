export const getInternationalTeamInfoFromName = (name: string) => {

    const match = InternationalRugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return null
    }
}

export const InternationalRugbyTeams = [
  {
    type: 'International',
    displayName: 'Ireland',
    abbreviation: 'IRE',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/3.png',
    colour: '#00845c',
  },
  {
    type: 'International',
    displayName: 'South Africa',
    abbreviation: 'SA',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/5.png',
    colour: '#006400',
  },
  {
    type: 'International',
    displayName: 'England',
    abbreviation: 'ENG',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/1.png',
    colour: '#ffffff',
  },
  {
    type: 'International',
    displayName: 'New Zealand',
    abbreviation: 'NZL',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/8.png',
    colour: '#ffffff',
  },
  {
    type: 'International',
    displayName: 'Australia',
    abbreviation: 'AUS',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/6.png',
    colour: '#ffbb00',
  },
  {
    type: 'International',
    displayName: 'France',
    abbreviation: 'FRA',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/9.png',
    colour: '#003b7c',
  },
  {
    type: 'International',
    displayName: 'Scotland',
    abbreviation: 'SCOT',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/2.png',
    colour: '#ffbb00',
  },
  {
    type: 'International',
    displayName: 'Wales',
    abbreviation: 'WALES',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/4.png',
    colour: '#d21034',
  },
  {
    type: 'International',
    displayName: 'Italy',
    abbreviation: 'ITALY',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/20.png',
    colour: '#ffffff',
  },
  {
    type: 'International',
    displayName: 'Argentina',
    abbreviation: 'ARG',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/10.png',
    colour: '#43a1d5',
  },
  {
    type: 'International',
    displayName: 'Japan',
    abbreviation: 'JPN',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/23.png',
    colour: '#f4d5e2',
  },
  {
    type: 'International',
    displayName: 'Georgia',
    abbreviation: 'GEO',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/81.png',
    colour: '#551828',
  },
  {
    type: 'International',
    displayName: 'Fiji',
    abbreviation: 'FIJI',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/14.png',
    colour: '#ffffff',
  },
  {
    type: 'International',
    displayName: 'Canada',
    abbreviation: 'CAN',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/25.png',
    colour: '#e82042',
  },
  {
    type: 'International',
    displayName: 'United States of America',
    abbreviation: 'USA',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/11.png',
    colour: '#0a3161',
  },
  {
    type: 'International',
    displayName: 'Romania',
    abbreviation: 'ROM',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/12.png',
    colour: '#002b7f',
  },
  {
    type: 'International',
    displayName: 'Portugal',
    abbreviation: 'POR',
    logo: 'https://a.espncdn.com/i/teamlogos/countries/500/por.png',
    colour: '#046a38',
  },
  {
    type: 'International',
    displayName: 'Namibia',
    abbreviation: 'NAMIB',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/82.png',
    colour: '#001489',
  },
  {
    type: 'International',
    displayName: 'Tonga',
    abbreviation: 'TONGA',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/16.png',
    colour: '#ed1c24',
  },
  {
    type: 'International',
    displayName: 'Samoa',
    abbreviation: 'SAMOA',
    logo: 'https://a.espncdn.com/i/teamlogos/rugby/teams/500/15.png',
    colour: '#264282',
  },
  {
    type: 'International',
    displayName: 'Spain',
    abbreviation: 'ESP',
    logo: 'https://a.espncdn.com/i/teamlogos/countries/500/esp.png',
    colour: '#ffcc00',
  },
  {
    type: 'International',
    displayName: 'Chile',
    abbreviation: 'CHILE',
    logo: 'https://a.espncdn.com/i/teamlogos/countries/500/chi.png',
    colour: '#0032a0',
  },
  
 
];