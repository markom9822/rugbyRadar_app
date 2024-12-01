import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams";
import { BathAltLogo, BathLogo, BristolAltLogo, BristolLogo, ExeterAltLogo, ExeterLogo, GloucesterAltLogo, GloucesterLogo, HarlequinsAltLogo, HarlequinsLogo, LeicesterAltLogo, LeicesterLogo, NewcastleAltLogo, NewcastleLogo, NorthamptonAltLogo, NorthamptonLogo, SaleAltLogo, SaleLogo, SaracensAltLogo, SaracensLogo } from "./PremiershipTeamsLogos/PremiershipTeams";

export const getPremShortNameFromFullName = (name: string) => {
  const match = PremRugbyTeams.find((item) => name.indexOf(item.displayName) !== -1)

  if(match !== undefined)
  {
    return match.displayName;
  }
  
  return name
}

export const rugbyVizPremNames = [
  { databaseName: 'Sale', rugbyVizName: 'Sharks',},
  { databaseName: 'Harlequins', rugbyVizName: 'Quins',},
];

export const getPremTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'Prem Club',
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

  var searchName = '';

  const premNameResult = rugbyVizPremNames.find((element) => element.rugbyVizName == name)
  if(premNameResult !== undefined)
  {
      searchName = premNameResult.databaseName;
  }
  else
  {
      searchName = name;
  }


  const match = PremRugbyTeams.find((item) => item.displayName === searchName.replace(" Rugby", ""))
  if (match !== undefined) 
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
    displayName: 'Bath',
    abbreviation: 'BATH',
    logo: BathLogo,
    altLogo: BathAltLogo,
    colour: '#1e3b84',
    id: '25898',
    defaultLeague: 'Gallagher Premiership',
    foundedYear: '1865',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Bristol Bears',
    abbreviation: 'BRIST',
    logo: BristolLogo,
    altLogo: BristolAltLogo,
    colour: '#2c2c7a',
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
    colour: '#FFCD00',
    id: '116227',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1871',
    seasonType: 'north',
  },
  {
    type: 'Prem Club',
    displayName: 'Gloucester',
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
    abbreviation: 'HQUIN',
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
    colour: '#5c5c5c',
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
    colour: '#101091',
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
    colour: '#9c9c9c',
    id: '25909',
    defaultLeague: 'Premiership Rugby',
    foundedYear: '1876',
    seasonType: 'north',
  },
  
];