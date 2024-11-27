import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams"
import { BenettonAltLogo, BenettonLogo, BullsAltLogo, BullsLogo, CardiffAltLogo, CardiffLogo, ConnachtAltLogo, ConnachtLogo, DragonsAltLogo, DragonsLogo, EdinburghAltLogo, EdinburghLogo, GlasgowAltLogo, GlasgowLogo, LeinsterAltLogo, LeinsterLogo, LionsAltLogo, LionsLogo, MunsterAltLogo, MunsterLogo, OspreysAltLogo, OspreysLogo, ScarletsAltLogo, ScarletsLogo, SharksAltLogo, SharksLogo, StormersAltLogo, StormersLogo, UlsterAltLogo, UlsterLogo, ZebreAltLogo, ZebreLogo } from "./URCTeamLogos/URCTeams"

export const getURCShortNameFromFullName = (name: string) => {
  const match = URCRugbyTeams.find((item) => name.indexOf(item.displayName) !== -1)

  if(match !== undefined)
  {
    return match.displayName;
  }
  
  return ''
}

export const getURCTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'URC Club',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    altLogo: DefaultLogo,
    colour: '#000000',
    id: '0',
    defaultLeague: '',
    foundedYear: '',
    seasonType: '',
  }

  // remove not needed parts of name
  const searchName = name.replace(" Rugby", "")

    const match = URCRugbyTeams.find((item) => item.displayName === searchName)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}


export const URCRugbyTeams = [
  {
    type: 'URC Club',
    displayName: 'Leinster',
    abbreviation: 'LEINS',
    logo: LeinsterLogo,
    altLogo: LeinsterAltLogo,
    colour: '#003287',
    id: '25924',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1879',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Munster',
    abbreviation: 'MUNST',
    logo: MunsterLogo,
    altLogo: MunsterAltLogo,
    colour: '#cd0a2d',
    id: '25925',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1879',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Connacht',
    abbreviation: 'CONN',
    logo: ConnachtLogo,
    altLogo: ConnachtAltLogo,
    colour: '#00b446',
    id: '25923',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1885',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Ulster',
    abbreviation: 'ULST',
    logo: UlsterLogo,
    altLogo: UlsterAltLogo,
    colour: '#e61d03',
    id: '25926',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1879',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Edinburgh',
    abbreviation: 'EDINB',
    logo: EdinburghLogo,
    altLogo: EdinburghAltLogo,
    colour: '#1e144b',
    id: '25951',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1872',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Glasgow Warriors',
    abbreviation: 'GLASG',
    logo: GlasgowLogo,
    altLogo: GlasgowAltLogo,
    colour: '#5aaaf0',
    id: '25952',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1872',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Cardiff',
    abbreviation: 'CDB',
    logo: CardiffLogo,
    altLogo: CardiffAltLogo,
    colour: '#6ebeff',
    id: '25965',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '2003',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Scarlets',
    abbreviation: 'SCARL',
    logo: ScarletsLogo,
    altLogo: ScarletsAltLogo,
    colour: '#78040d',
    id: '25966',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '2003',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Ospreys',
    abbreviation: 'OSP',
    logo: OspreysLogo,
    altLogo: OspreysAltLogo,
    colour: '#5a5a64',
    id: '25968',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '2003',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Dragons RFC',
    abbreviation: 'DRA',
    logo: DragonsLogo,
    altLogo: DragonsAltLogo,
    colour: '#ffaa00',
    id: '25967',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '2003',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Benetton',
    abbreviation: 'TRE',
    logo: BenettonLogo,
    altLogo: BenettonAltLogo,
    colour: '#00b46f',
    id: '25927',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1932',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Zebre Parma',
    abbreviation: 'ZEB',
    logo: ZebreLogo,
    altLogo: ZebreAltLogo,
    colour: '#233268',
    id: '167124',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1973',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'DHL Stormers',
    abbreviation: 'STORM',
    logo: StormersLogo,
    altLogo: StormersAltLogo,
    colour: '#005295',
    id: '25962',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1997',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Vodacom Bulls',
    abbreviation: 'BULLS',
    logo: BullsLogo,
    altLogo: BullsAltLogo,
    colour: '#0082e6',
    id: '25953',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1997',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Emirates Lions',
    abbreviation: 'LIONS',
    logo: LionsLogo,
    altLogo: LionsAltLogo,
    colour: '#ff1e29',
    id: '25958',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1996',
    seasonType: 'north',
  },
  {
    type: 'URC Club',
    displayName: 'Hollywoodbets Sharks',
    abbreviation: 'SHARK',
    logo: SharksLogo,
    altLogo: SharksAltLogo,
    colour: '#504b50',
    id: '25961',
    defaultLeague: 'United Rugby Championship',
    foundedYear: '1995',
    seasonType: 'north',
  },

];