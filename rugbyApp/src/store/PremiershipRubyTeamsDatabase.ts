import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams";
import { BathLogo, BristolLogo, ExeterLogo, GloucesterLogo, HarlequinsLogo, LeicesterLogo, NewcastleLogo, NorthamptonLogo, SaleLogo, SaracensLogo } from "./PremiershipTeamsLogos/PremiershipTeams";

export const getPremTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'Prem Club',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
    id: '0',
  }
    const match = PremRugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}


export const PremRugbyTeams = [
  {
    type: 'Prem Club',
    displayName: 'Bath Rugby',
    abbreviation: 'BATH',
    logo: BathLogo,
    colour: '#1e3b84',
    id: '25898'
  },
  {
    type: 'Prem Club',
    displayName: 'Bristol Rugby',
    abbreviation: 'BRIST',
    logo: BristolLogo,
    colour: '#121254',
    id: '25899'
  },
  {
    type: 'Prem Club',
    displayName: 'Exeter Chiefs',
    abbreviation: 'EXET',
    logo: ExeterLogo,
    colour: '#1a1a1a',
    id: '116227'
  },
  {
    type: 'Prem Club',
    displayName: 'Gloucester Rugby',
    abbreviation: 'GLOUC',
    logo: GloucesterLogo,
    colour: '#c8202e',
    id: '25900'
  },
  {
    type: 'Prem Club',
    displayName: 'Harlequins',
    abbreviation: 'HQUINN',
    logo: HarlequinsLogo,
    colour: '#b6234a',
    id: '25901'
  },
  {
    type: 'Prem Club',
    displayName: 'Leicester Tigers',
    abbreviation: 'LEICS',
    logo: LeicesterLogo,
    colour: '#044437',
    id: '25903'
  },
  {
    type: 'Prem Club',
    displayName: 'Newcastle Falcons',
    abbreviation: 'NEWC',
    logo: NewcastleLogo,
    colour: '#1a1a1a',
    id: '25906'
  },
  {
    type: 'Prem Club',
    displayName: 'Northampton Saints',
    abbreviation: 'NTHMP',
    logo: NorthamptonLogo,
    colour: '#1a1a1a',
    id: '25907'
  },
  {
    type: 'Prem Club',
    displayName: 'Sale Sharks',
    abbreviation: 'SALE',
    logo: SaleLogo,
    colour: '#000050',
    id: '25908'
  },
  {
    type: 'Prem Club',
    displayName: 'Saracens',
    abbreviation: 'SARAC',
    logo: SaracensLogo,
    colour: '#1a1a1a',
    id: '25909'
  },
  
];