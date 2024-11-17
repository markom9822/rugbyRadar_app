import { ArgentinaAltLogo, ArgentinaLogo, AustraliaAltLogo, AustraliaLogo, BALionsAltLogo, BALionsLogo, CanadaAltLogo, CanadaLogo, ChileAltLogo, ChileLogo, DefaultLogo, EnglandAltLogo, EnglandLogo, FijiAltLogo, FijiLogo, FranceAltLogo, FranceLogo, GeorgiaAltLogo, GeorgiaLogo, IrelandAltLogo, IrelandLogo, ItalyAltLogo, ItalyLogo, JapanAltLogo, JapanLogo, NamibiaAltLogo, NamibiaLogo, NewZealandAltLogo, NewZealandLogo, PortugalAltLogo, PortugalLogo, RomaniaAltLogo, RomaniaLogo, SamoaAltLogo, SamoaLogo, ScotlandAltLogo, ScotlandLogo, SouthAfricaAltLogo, SouthAfricaLogo, SpainAltLogo, SpainLogo, TongaAltLogo, TongaLogo, UruguayAltLogo, UruguayLogo, USAAltLogo, USALogo, WalesAltLogo, WalesLogo } from "./InternationalTeamLogos/InternationalTeams";

export const getInternationalTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'International',
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

    const match = InternationalRugbyTeams.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}

export const InternationalRugbyTeams = [
  {
    type: 'International',
    displayName: 'Ireland',
    abbreviation: 'IRE',
    logo: IrelandLogo,
    altLogo: IrelandAltLogo,
    colour: '#006144',
    id: '3',
    defaultLeague: 'Six Nations',
    foundedYear: '1875',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'South Africa',
    abbreviation: 'SA',
    logo: SouthAfricaLogo,
    altLogo: SouthAfricaAltLogo,
    colour: '#006400',
    id: '5',
    defaultLeague: 'Rugby Championship',
    foundedYear: '1891',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'England',
    abbreviation: 'ENG',
    logo: EnglandLogo,
    altLogo: EnglandAltLogo,
    colour: '#751216',
    id: '1',
    defaultLeague: 'Six Nations',
    foundedYear: '1871',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'New Zealand',
    abbreviation: 'NZL',
    logo: NewZealandLogo,
    altLogo: NewZealandAltLogo,
    colour: '#363636',
    id: '8',
    defaultLeague: 'Rugby Championship',
    foundedYear: '1884',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'Australia',
    abbreviation: 'AUS',
    logo: AustraliaLogo,
    altLogo: AustraliaAltLogo,
    colour: '#ffbb00',
    id: '6',
    defaultLeague: 'Rugby Championship',
    foundedYear: '1899',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'France',
    abbreviation: 'FRA',
    logo: FranceLogo,
    altLogo: FranceAltLogo,
    colour: '#024b9c',
    id: '9',
    defaultLeague: 'Six Nations',
    foundedYear: '1893',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Scotland',
    abbreviation: 'SCOT',
    logo: ScotlandLogo,
    altLogo: ScotlandAltLogo,
    colour: '#04375e',
    id: '2',
    defaultLeague: 'Six Nations',
    foundedYear: '1871',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Wales',
    abbreviation: 'WAL',
    logo: WalesLogo,
    altLogo: WalesAltLogo,
    colour: '#d21034',
    id: '4',
    defaultLeague: 'Six Nations',
    foundedYear: '1881',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Italy',
    abbreviation: 'ITALY',
    logo: ItalyLogo,
    altLogo: ItalyAltLogo,
    colour: '#0462c9',
    id: '20',
    defaultLeague: 'Six Nations',
    foundedYear: '1911',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Argentina',
    abbreviation: 'ARG',
    logo: ArgentinaLogo,
    altLogo: ArgentinaAltLogo,
    colour: '#43a1d5',
    id: '10',
    defaultLeague: 'Rugby Championship',
    foundedYear: '1910',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'Japan',
    abbreviation: 'JPN',
    logo: JapanLogo,
    altLogo: JapanAltLogo,
    colour: '#f4d5e2',
    id: '23',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1932',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Georgia',
    abbreviation: 'GEO',
    logo: GeorgiaLogo,
    altLogo: GeorgiaAltLogo,
    colour: '#b52f53',
    id: '81',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1959',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Fiji',
    abbreviation: 'FIJI',
    logo: FijiLogo,
    altLogo: FijiAltLogo,
    colour: '#363636',
    id: '14',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1913',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'Canada',
    abbreviation: 'CAN',
    logo: CanadaLogo,
    altLogo: CanadaAltLogo,
    colour: '#e82042',
    id: '25',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1932',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'United States of America',
    abbreviation: 'USA',
    logo: USALogo,
    altLogo: USAAltLogo,
    colour: '#0a3161',
    id: '11',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1976',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Romania',
    abbreviation: 'ROM',
    logo: RomaniaLogo,
    altLogo: RomaniaAltLogo,
    colour: '#002b7f',
    id: '12',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1924',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Portugal',
    abbreviation: 'POR',
    logo: PortugalLogo,
    altLogo: PortugalAltLogo,
    colour: '#9c0c1d',
    id: '27',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1935',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Namibia',
    abbreviation: 'NAMIB',
    logo: NamibiaLogo,
    altLogo: NamibiaAltLogo,
    colour: '#001489',
    id: '82',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1916',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'Tonga',
    abbreviation: 'TONGA',
    logo: TongaLogo,
    altLogo: TongaAltLogo,
    colour: '#ed1c24',
    id: '16',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1924',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'Samoa',
    abbreviation: 'SAMOA',
    logo: SamoaLogo,
    altLogo: SamoaAltLogo,
    colour: '#264282',
    id: '15',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1924',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'Spain',
    abbreviation: 'ESP',
    logo: SpainLogo,
    altLogo: SpainAltLogo,
    colour: '#c91902',
    id: '18',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1929',
    seasonType: 'north',
  },
  {
    type: 'International',
    displayName: 'Chile',
    abbreviation: 'CHILE',
    logo: ChileLogo,
    altLogo: ChileAltLogo,
    colour: '#0032a0',
    id: '28',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1936',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'Uruguay',
    abbreviation: 'URUG',
    logo: UruguayLogo,
    altLogo: UruguayAltLogo,
    colour: '#0038a8',
    id: '29',
    defaultLeague: 'Rugby World Cup',
    foundedYear: '1948',
    seasonType: 'south',
  },
  {
    type: 'International',
    displayName: 'British and Irish Lions',
    abbreviation: 'LIONS',
    logo: BALionsLogo,
    altLogo: BALionsAltLogo,
    colour: '#d21034',
    id: '32',
    defaultLeague: '',
    foundedYear: '1888',
    seasonType: 'north',
  },
];