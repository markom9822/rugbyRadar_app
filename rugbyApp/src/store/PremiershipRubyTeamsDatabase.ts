import { DefaultLogo, NewZealandAltLogo } from "./InternationalTeamLogos/InternationalTeams";
import { BathAltLogo, BathLogo, BristolAltLogo, BristolLogo, ExeterAltLogo, ExeterLogo, GloucesterAltLogo, GloucesterLogo, HarlequinsAltLogo, HarlequinsLogo, LeicesterAltLogo, LeicesterLogo, NewcastleAltLogo, NewcastleLogo, NorthamptonAltLogo, NorthamptonLogo, SaleAltLogo, SaleLogo, SaracensAltLogo, SaracensLogo } from "./PremiershipTeamsLogos/PremiershipTeams";

export const getPremTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'Prem Club',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    altLogo: DefaultLogo,
    colour: '#00845c',
    id: '0',
    defaultLeague: '',
    foundedYear: '',
    seasonType: '',
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
    altLogo: BathAltLogo,
    colour: '#1e3b84',
    id: '25898',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1865',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Bristol Rugby',
    abbreviation: 'BRIST',
    logo: BristolLogo,
    altLogo: BristolAltLogo,
    colour: '#121254',
    id: '25899',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1888',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Exeter Chiefs',
    abbreviation: 'EXET',
    logo: ExeterLogo,
    altLogo: ExeterAltLogo,
    colour: '#1a1a1a',
    id: '116227',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1871',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Gloucester Rugby',
    abbreviation: 'GLOUC',
    logo: GloucesterLogo,
    altLogo: GloucesterAltLogo,
    colour: '#c8202e',
    id: '25900',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1873',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Harlequins',
    abbreviation: 'HQUINN',
    logo: HarlequinsLogo,
    altLogo: HarlequinsAltLogo,
    colour: '#b6234a',
    id: '25901',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1866',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Leicester Tigers',
    abbreviation: 'LEICS',
    logo: LeicesterLogo,
    altLogo: LeicesterAltLogo,
    colour: '#044437',
    id: '25903',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1880',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Newcastle Falcons',
    abbreviation: 'NEWC',
    logo: NewcastleLogo,
    altLogo: NewcastleAltLogo,
    colour: '#1a1a1a',
    id: '25906',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1877',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Northampton Saints',
    abbreviation: 'NTHMP',
    logo: NorthamptonLogo,
    altLogo: NorthamptonAltLogo,
    colour: '#006442',
    id: '25907',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1880',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Sale Sharks',
    abbreviation: 'SALE',
    logo: SaleLogo,
    altLogo: SaleAltLogo,
    colour: '#000050',
    id: '25908',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1861',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Saracens',
    abbreviation: 'SARAC',
    logo: SaracensLogo,
    altLogo: SaracensAltLogo,
    colour: '#1a1a1a',
    id: '25909',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1876',
    seasonType: 'north',
  },
  
];