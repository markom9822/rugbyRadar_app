import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams"
import { BluesLogo, BrumbiesLogo, ChiefsLogo, CrusadersLogo, DruaLogo, ForceLogo, HighlandersLogo, HurricanesLogo, MoanaLogo, RebelsLogo, RedsLogo, WaratahsLogo } from "./SuperRugbyTeamLogos/SuperRugbyTeams"

export const getSuperRugbyTeamInfoFromName = (name: string) => {

    const defaultTeam =  {
      type: 'Super Rugby Club',
      displayName: 'Default',
      abbreviation: 'DEF',
      logo: DefaultLogo,
      colour: '#00845c',
      id: '0',
      textInfo: ''
    }
  
      const match = SuperRugbyTeams.find((item) => item.displayName === name)
      if(match !== undefined)
      {
          return match
      }
      else
      {
          return defaultTeam
      }
}

export const SuperRugbyTeams = [
    {
        type: 'Super Rugby Club',
        displayName: 'Hurricanes',
        abbreviation: 'HURRI',
        logo: HurricanesLogo,
        colour: '#fede00',
        id: '25939',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Blues',
        abbreviation: 'BLUES',
        logo: BluesLogo,
        colour: '#1f3bc4',
        id: '25932',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Brumbies',
        abbreviation: 'BRUMB',
        logo: BrumbiesLogo,
        colour: '#002B54',
        id: '25889',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Chiefs',
        abbreviation: 'CHIEF',
        logo: ChiefsLogo,
        colour: '#f03737',
        id: '25934',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Queensland Reds',
        abbreviation: 'REDS',
        logo: RedsLogo,
        colour: '#D01044',
        id: '182',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Highlanders',
        abbreviation: 'HLAND',
        logo: HighlandersLogo,
        colour: '#ebbc13',
        id: '25938',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Fijian Drua',
        abbreviation: 'FIJ',
        logo: DruaLogo,
        colour: '#1313eb',
        id: '289338',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Melbourne Rebels',
        abbreviation: 'REBEL',
        logo: RebelsLogo,
        colour: '#002B5C',
        id: '25894',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Crusaders',
        abbreviation: 'CRUS',
        logo: CrusadersLogo,
        colour: '#e84141',
        id: '25936',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Western Force',
        abbreviation: 'FORCE',
        logo: ForceLogo,
        colour: '#004A9F',
        id: '25893',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Moana Pasifika',
        abbreviation: 'MOA',
        logo: MoanaLogo,
        colour: '#0bd1e3',
        id: '289319',
        textInfo: ''
    },
    {
        type: 'Super Rugby Club',
        displayName: 'New South Wales Waratahs',
        abbreviation: 'WARAT',
        logo: WaratahsLogo,
        colour: '#D41042',
        id: '227',
        textInfo: ''
    },
  ];