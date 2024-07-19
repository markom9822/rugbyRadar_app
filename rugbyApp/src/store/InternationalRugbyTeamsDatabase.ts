import { ArgentinaLogo, AustraliaLogo, CanadaLogo, ChileLogo, DefaultLogo, EnglandLogo, FijiLogo, FranceLogo, GeorgiaLogo, IrelandLogo, ItalyLogo, JapanLogo, NamibiaLogo, NewZealandLogo, PortugalLogo, RomaniaLogo, SamoaLogo, ScotlandLogo, SouthAfricaLogo, SpainLogo, TongaLogo, UruguayLogo, USALogo, WalesLogo } from "./InternationalTeamLogos/InternationalTeams";

export const getInternationalTeamInfoFromName = (name: string) => {

  const defaultTeam =  {
    type: 'International',
    displayName: 'Default',
    abbreviation: 'DEF',
    logo: DefaultLogo,
    colour: '#00845c',
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
  },
  {
    type: 'International',
    displayName: 'South Africa',
    abbreviation: 'SA',
    logo: SouthAfricaLogo,
    colour: '#006400',
  },
  {
    type: 'International',
    displayName: 'England',
    abbreviation: 'ENG',
    logo: EnglandLogo,
    colour: '#ffffff',
  },
  {
    type: 'International',
    displayName: 'New Zealand',
    abbreviation: 'NZL',
    logo: NewZealandLogo,
    colour: '#ffffff',
  },
  {
    type: 'International',
    displayName: 'Australia',
    abbreviation: 'AUS',
    logo: AustraliaLogo,
    colour: '#ffbb00',
  },
  {
    type: 'International',
    displayName: 'France',
    abbreviation: 'FRA',
    logo: FranceLogo,
    colour: '#003b7c',
  },
  {
    type: 'International',
    displayName: 'Scotland',
    abbreviation: 'SCOT',
    logo: ScotlandLogo,
    colour: '#ffbb00',
  },
  {
    type: 'International',
    displayName: 'Wales',
    abbreviation: 'WALES',
    logo: WalesLogo,
    colour: '#d21034',
  },
  {
    type: 'International',
    displayName: 'Italy',
    abbreviation: 'ITALY',
    logo: ItalyLogo,
    colour: '#ffffff',
  },
  {
    type: 'International',
    displayName: 'Argentina',
    abbreviation: 'ARG',
    logo: ArgentinaLogo,
    colour: '#43a1d5',
  },
  {
    type: 'International',
    displayName: 'Japan',
    abbreviation: 'JPN',
    logo: JapanLogo,
    colour: '#f4d5e2',
  },
  {
    type: 'International',
    displayName: 'Georgia',
    abbreviation: 'GEO',
    logo: GeorgiaLogo,
    colour: '#551828',
  },
  {
    type: 'International',
    displayName: 'Fiji',
    abbreviation: 'FIJI',
    logo: FijiLogo,
    colour: '#ffffff',
  },
  {
    type: 'International',
    displayName: 'Canada',
    abbreviation: 'CAN',
    logo: CanadaLogo,
    colour: '#e82042',
  },
  {
    type: 'International',
    displayName: 'United States of America',
    abbreviation: 'USA',
    logo: USALogo,
    colour: '#0a3161',
  },
  {
    type: 'International',
    displayName: 'Romania',
    abbreviation: 'ROM',
    logo: RomaniaLogo,
    colour: '#002b7f',
  },
  {
    type: 'International',
    displayName: 'Portugal',
    abbreviation: 'POR',
    logo: PortugalLogo,
    colour: '#046a38',
  },
  {
    type: 'International',
    displayName: 'Namibia',
    abbreviation: 'NAMIB',
    logo: NamibiaLogo,
    colour: '#001489',
  },
  {
    type: 'International',
    displayName: 'Tonga',
    abbreviation: 'TONGA',
    logo: TongaLogo,
    colour: '#ed1c24',
  },
  {
    type: 'International',
    displayName: 'Samoa',
    abbreviation: 'SAMOA',
    logo: SamoaLogo,
    colour: '#264282',
  },
  {
    type: 'International',
    displayName: 'Spain',
    abbreviation: 'ESP',
    logo: SpainLogo,
    colour: '#ffcc00',
  },
  {
    type: 'International',
    displayName: 'Chile',
    abbreviation: 'CHILE',
    logo: ChileLogo,
    colour: '#0032a0',
  },
  {
    type: 'International',
    displayName: 'Uruguay',
    abbreviation: 'URUG',
    logo: UruguayLogo,
    colour: '#0032a0',
  },
];