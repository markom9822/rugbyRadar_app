import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams"
import { BenettonLogo, BullsLogo, CardiffLogo, ConnachtLogo, DragonsLogo, EdinburghLogo, GlasgowLogo, LeinsterLogo, LionsLogo, MunsterLogo, OspreysLogo, ScarletsLogo, SharksLogo, StormersLogo, UlsterLogo, ZebreLogo } from "./URCTeamLogos/URCTeams"


export const getURCTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'URC Club',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
  }
    const match = URCRugbyTeams.find((item) => item.displayName === name)
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
    colour: '#003287',
  },
  {
    type: 'URC Club',
    displayName: 'Munster',
    abbreviation: 'MUNST',
    logo: MunsterLogo,
    colour: '#cd0a2d',
  },
  {
    type: 'URC Club',
    displayName: 'Connacht',
    abbreviation: 'CONN',
    logo: ConnachtLogo,
    colour: '#00b446',
  },
  {
    type: 'URC Club',
    displayName: 'Ulster',
    abbreviation: 'ULST',
    logo: UlsterLogo,
    colour: '#e61d03',
  },
  {
    type: 'URC Club',
    displayName: 'Edinburgh',
    abbreviation: 'EDINB',
    logo: EdinburghLogo,
    colour: '#1e144b',
  },
  {
    type: 'URC Club',
    displayName: 'Glasgow Warriors',
    abbreviation: 'GLASG',
    logo: GlasgowLogo,
    colour: '#5aaaf0',
  },
  {
    type: 'URC Club',
    displayName: 'Cardiff Blues',
    abbreviation: 'CDB',
    logo: CardiffLogo,
    colour: '#6ebeff',
  },
  {
    type: 'URC Club',
    displayName: 'Scarlets',
    abbreviation: 'SCARL',
    logo: ScarletsLogo,
    colour: '#78040d',
  },
  {
    type: 'URC Club',
    displayName: 'Ospreys',
    abbreviation: 'OSP',
    logo: OspreysLogo,
    colour: '#5a5a64',
  },
  {
    type: 'URC Club',
    displayName: 'Dragons',
    abbreviation: 'DRA',
    logo: DragonsLogo,
    colour: '#ffaa00',
  },
  {
    type: 'URC Club',
    displayName: 'Benetton Treviso',
    abbreviation: 'TRE',
    logo: BenettonLogo,
    colour: '#00b46f',
  },
  {
    type: 'URC Club',
    displayName: 'Zebre',
    abbreviation: 'ZEB',
    logo: ZebreLogo,
    colour: '#233268',
  },
  {
    type: 'URC Club',
    displayName: 'Stormers',
    abbreviation: 'STORM',
    logo: StormersLogo,
    colour: '#005295',
  },
  {
    type: 'URC Club',
    displayName: 'Bulls',
    abbreviation: 'BULLS',
    logo: BullsLogo,
    colour: '#0082e6',
  },
  {
    type: 'URC Club',
    displayName: 'Lions',
    abbreviation: 'LIONS',
    logo: LionsLogo,
    colour: '#ff1e29',
  },
  {
    type: 'URC Club',
    displayName: 'Sharks',
    abbreviation: 'SHARK',
    logo: SharksLogo,
    colour: '#504b50',
  },

];