import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams";
import { BayonneAltLogo, BayonneLogo, BordeauxAltLogo, BordeauxLogo, BriveAltLogo, BriveLogo, CastresAltLogo, CastresLogo, ClermontAltLogo, ClermontLogo, LaRochelleAltLogo, LaRochelleLogo, LyonAltLogo, LyonLogo, MontpellierAltLogo, MontpellierLogo, OyonnaxAltLogo, OyonnaxLogo, PauAltLogo, PauLogo, PerpignanAltLogo, PerpignanLogo, Racing92AltLogo, Racing92Logo, StadeFrancaisAltLogo, StadeFrancaisLogo, ToulonAltLogo, ToulonLogo, ToulouseAltLogo, ToulouseLogo, VannesAltLogo, VannesLogo } from "./Top14TeamLogos/Top14Teams";

export const rugbyVizTop14Names = [
  { databaseName: 'Stade Toulousain', rugbyVizName: 'Toulouse',},
  { databaseName: 'Bordeaux Begles', rugbyVizName: 'Bordeaux-Begles',},
  { databaseName: 'Section Paloise', rugbyVizName: 'Pau',},
  { databaseName: 'USA Perpignan', rugbyVizName: 'Perpignan',},
  { databaseName: 'Bayonnais', rugbyVizName: 'Bayonne',},
  { databaseName: 'Lyon', rugbyVizName: 'Lyon O.U.',},
  { databaseName: 'Stade Francais', rugbyVizName: 'Stade Francais Paris',},
];

export const getTop14ShortNameFromFullName = (name: string) => {

  var searchName = '';
  const top14NameResult = rugbyVizTop14Names.find((element) => element.rugbyVizName == name)
  if(top14NameResult !== undefined)
  {
      searchName = top14NameResult.databaseName;
  }
  else
  {
      searchName = name;
  }

  const match = Top14RugbyTeams.find((item) => searchName.indexOf(item.displayName) !== -1)

  if(match !== undefined)
  {
    return match.displayName;
  }
  
  return ''
}


export const getTop14TeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'Top14 Club',
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
  const top14NameResult = rugbyVizTop14Names.find((element) => element.rugbyVizName == name)
  if(top14NameResult !== undefined)
  {
      searchName = top14NameResult.databaseName;
  }
  else
  {
      searchName = name;
  }

    const match = Top14RugbyTeams.find((item) => item.displayName === searchName)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}


export const Top14RugbyTeams = [
  {
    type: 'Top14 Club',
    displayName: 'Bayonnais',
    abbreviation: 'BAY',
    logo: BayonneLogo,
    altLogo: BayonneAltLogo,
    colour: '#87cee8',
    id: '25912',
    defaultLeague: 'Top 14',
    foundedYear: '1904',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Bordeaux Begles',
    abbreviation: 'BEG',
    logo: BordeauxLogo,
    altLogo: BordeauxAltLogo,
    colour: '#69233F',
    id: '143737',
    defaultLeague: 'Top 14',
    foundedYear: '2006',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Brive',
    abbreviation: 'BRIVE',
    logo: BriveLogo,
    altLogo: BriveAltLogo,
    colour: '#000000',
    id: '0',
    defaultLeague: 'Top 14',
    foundedYear: '1910',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Castres Olympique',
    abbreviation: 'CAS',
    logo: CastresLogo,
    altLogo: CastresAltLogo,
    colour: '#1462AA',
    id: '25916',
    defaultLeague: 'Top 14',
    foundedYear: '1906',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Clermont',
    abbreviation: 'CLER',
    logo: ClermontLogo,
    altLogo: ClermontAltLogo,
    colour: '#012F6B',
    id: '25917',
    defaultLeague: 'Top 14',
    foundedYear: '1911',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'La Rochelle',
    abbreviation: 'LA RO',
    logo: LaRochelleLogo,
    altLogo: LaRochelleAltLogo,
    colour: '#e3b009',
    id: '119318',
    defaultLeague: 'Top 14',
    foundedYear: '1898',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Lyon',
    abbreviation: 'LYON',
    logo: LyonLogo,
    altLogo: LyonAltLogo,
    colour: '#d1112e',
    id: '143736',
    defaultLeague: 'Top 14',
    foundedYear: '1896',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Montpellier',
    abbreviation: 'MONTP',
    logo: MontpellierLogo,
    altLogo: MontpellierAltLogo,
    colour: '#344575',
    id: '25918',
    defaultLeague: 'Top 14',
    foundedYear: '1986',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Vannes',
    abbreviation: 'VANN',
    logo: VannesLogo,
    altLogo: VannesAltLogo,
    colour: '#24053b',
    id: '289337',
    defaultLeague: 'Top 14',
    foundedYear: '1950',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Section Paloise',
    abbreviation: 'PAU',
    logo: PauLogo,
    altLogo: PauAltLogo,
    colour: '#125232',
    id: '270567',
    defaultLeague: 'Top 14',
    foundedYear: '1902',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'USA Perpignan',
    abbreviation: 'PERP',
    logo: PerpignanLogo,
    altLogo: PerpignanAltLogo,
    colour: '#e01c12',
    id: '25920',
    defaultLeague: 'Top 14',
    foundedYear: '1933',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Racing 92',
    abbreviation: 'RAMET',
    logo: Racing92Logo,
    altLogo: Racing92AltLogo,
    colour: '#C1DFF7',
    id: '99855',
    defaultLeague: 'Top 14',
    foundedYear: '1890',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Stade Francais',
    abbreviation: 'SFRAN',
    logo: StadeFrancaisLogo,
    altLogo: StadeFrancaisAltLogo,
    colour: '#EB5195',
    id: '25921',
    defaultLeague: 'Top 14',
    foundedYear: '1883',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Toulon',
    abbreviation: 'TOUL',
    logo: ToulonLogo,
    altLogo: ToulonAltLogo,
    colour: '#CC051C',
    id: '25986',
    defaultLeague: 'Top 14',
    foundedYear: '1908',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Stade Toulousain',
    abbreviation: 'TOUL',
    logo: ToulouseLogo,
    altLogo: ToulouseAltLogo,
    colour: '#ad1721',
    id: '25922',
    defaultLeague: 'Top 14',
    foundedYear: '1907',
    seasonType: 'north',
  },
  {
    type: 'Top14 Club',
    displayName: 'Oyonnax',
    abbreviation: 'OYON',
    logo: OyonnaxLogo,
    altLogo: OyonnaxAltLogo,
    colour: '#c40e0e',
    id: '',
    defaultLeague: 'Top 14',
    foundedYear: '1942',
    seasonType: 'north',
  },
];