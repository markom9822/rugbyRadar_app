import { ArgentinaLogo, AustraliaLogo, BALionsLogo, CanadaLogo, ChileLogo, DefaultLogo, EnglandLogo, FijiLogo, FranceLogo, GeorgiaLogo, IrelandLogo, ItalyLogo, JapanLogo, NamibiaLogo, NewZealandLogo, PortugalLogo, RomaniaLogo, RussiaLogo, SamoaLogo, ScotlandLogo, SouthAfricaLogo, SpainLogo, TongaLogo, UruguayLogo, USALogo, WalesLogo } from "./InternationalTeamLogos/InternationalTeams";

export const getInternationalTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'International',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
    id: '0'
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
    colour: '#00845c',
    id: '3',
  },
  {
    type: 'International',
    displayName: 'South Africa',
    abbreviation: 'SA',
    logo: SouthAfricaLogo,
    colour: '#006400',
    id: '5'
  },
  {
    type: 'International',
    displayName: 'England',
    abbreviation: 'ENG',
    logo: EnglandLogo,
    colour: '#ffffff',
    id: '1'
  },
  {
    type: 'International',
    displayName: 'New Zealand',
    abbreviation: 'NZL',
    logo: NewZealandLogo,
    colour: '#ffffff',
    id: '8'
  },
  {
    type: 'International',
    displayName: 'Australia',
    abbreviation: 'AUS',
    logo: AustraliaLogo,
    colour: '#ffbb00',
    id: '6'
  },
  {
    type: 'International',
    displayName: 'France',
    abbreviation: 'FRA',
    logo: FranceLogo,
    colour: '#003b7c',
    id: '9'
  },
  {
    type: 'International',
    displayName: 'Scotland',
    abbreviation: 'SCOT',
    logo: ScotlandLogo,
    colour: '#ffbb00',
    id: '2'
  },
  {
    type: 'International',
    displayName: 'Wales',
    abbreviation: 'WALES',
    logo: WalesLogo,
    colour: '#d21034',
    id: '4'
  },
  {
    type: 'International',
    displayName: 'Italy',
    abbreviation: 'ITALY',
    logo: ItalyLogo,
    colour: '#ffffff',
    id: '20'
  },
  {
    type: 'International',
    displayName: 'Argentina',
    abbreviation: 'ARG',
    logo: ArgentinaLogo,
    colour: '#43a1d5',
    id: '10'
  },
  {
    type: 'International',
    displayName: 'Japan',
    abbreviation: 'JPN',
    logo: JapanLogo,
    colour: '#f4d5e2',
    id: '23'
  },
  {
    type: 'International',
    displayName: 'Georgia',
    abbreviation: 'GEO',
    logo: GeorgiaLogo,
    colour: '#551828',
    id: '81'
  },
  {
    type: 'International',
    displayName: 'Fiji',
    abbreviation: 'FIJI',
    logo: FijiLogo,
    colour: '#ffffff',
    id: '14'
  },
  {
    type: 'International',
    displayName: 'Canada',
    abbreviation: 'CAN',
    logo: CanadaLogo,
    colour: '#e82042',
    id: '25'
  },
  {
    type: 'International',
    displayName: 'United States of America',
    abbreviation: 'USA',
    logo: USALogo,
    colour: '#0a3161',
    id: '11'
  },
  {
    type: 'International',
    displayName: 'Romania',
    abbreviation: 'ROM',
    logo: RomaniaLogo,
    colour: '#002b7f',
    id: '12'
  },
  {
    type: 'International',
    displayName: 'Portugal',
    abbreviation: 'POR',
    logo: PortugalLogo,
    colour: '#046a38',
    id: '27'
  },
  {
    type: 'International',
    displayName: 'Namibia',
    abbreviation: 'NAMIB',
    logo: NamibiaLogo,
    colour: '#001489',
    id: '82'
  },
  {
    type: 'International',
    displayName: 'Tonga',
    abbreviation: 'TONGA',
    logo: TongaLogo,
    colour: '#ed1c24',
    id: '16'
  },
  {
    type: 'International',
    displayName: 'Samoa',
    abbreviation: 'SAMOA',
    logo: SamoaLogo,
    colour: '#264282',
    id: '15'
  },
  {
    type: 'International',
    displayName: 'Spain',
    abbreviation: 'ESP',
    logo: SpainLogo,
    colour: '#ffcc00',
    id: '18'
  },
  {
    type: 'International',
    displayName: 'Chile',
    abbreviation: 'CHILE',
    logo: ChileLogo,
    colour: '#0032a0',
    id: '28'
  },
  {
    type: 'International',
    displayName: 'Uruguay',
    abbreviation: 'URUG',
    logo: UruguayLogo,
    colour: '#0038a8',
    id: '29'
  },
  {
    type: 'International',
    displayName: 'Russia',
    abbreviation: 'RUS',
    logo: RussiaLogo,
    colour: '#ffff',
    id: ''
  },
  {
    type: 'International',
    displayName: 'British and Irish Lions',
    abbreviation: 'LIONS',
    logo: BALionsLogo,
    colour: '#d21034',
    id: '32'
  },
];