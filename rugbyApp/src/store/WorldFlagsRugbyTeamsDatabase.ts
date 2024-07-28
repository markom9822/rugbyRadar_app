import { ArgentinaFlag, AustraliaFlag, BelgiumFlag, BrazilFlag, CanadaFlag, ChileFlag, ChinaFlag, FijiFlag, FranceFlag, GermanyFlag, GreatBritainFlag, IrelandFlag, ItalyFlag, JapanFlag, KenyaFlag, NewZealandFlag, PolandFlag, SamoaFlag, SouthAfricaFlag, SpainFlag, UruguayFlag, USAFlag } from "./WorldFlagRugbyTeamLogos/WorldFlagRugbyTeams";

export const getWorldFlagTeamInfoFromName = (name: string) => {
  
      const match = WorldFlagRugbyTeams.find((item) => item.displayName === name.replace(' 7s', ''))
      if(match !== undefined)
      {
          return match
      }
      else
      {
          return null
      }
  }
  
  export const WorldFlagRugbyTeams = [
    {
      type: 'World',
      displayName: 'Ireland',
      abbreviation: 'IRE',
      logo: IrelandFlag,
      colour: '#00845c',
    },
    {
      type: 'World',
      displayName: 'South Africa',
      abbreviation: 'SA',
      logo: SouthAfricaFlag,
      colour: '#006400',
    },
    {
      type: 'World',
      displayName: 'Great Britain',
      abbreviation: 'GB',
      logo: GreatBritainFlag,
      colour: '#ffffff',
    },
    {
      type: 'World',
      displayName: 'New Zealand',
      abbreviation: 'NZL',
      logo: NewZealandFlag,
      colour: '#ffffff',
    },
    {
      type: 'World',
      displayName: 'Australia',
      abbreviation: 'AUS',
      logo: AustraliaFlag,
      colour: '#ffbb00',
    },
    {
      type: 'World',
      displayName: 'France',
      abbreviation: 'FRA',
      logo: FranceFlag,
      colour: '#003b7c',
    },
    {
      type: 'World',
      displayName: 'Italy',
      abbreviation: 'ITALY',
      logo: ItalyFlag,
      colour: '#ffffff',
    },
    {
      type: 'World',
      displayName: 'Argentina',
      abbreviation: 'ARG',
      logo: ArgentinaFlag,
      colour: '#43a1d5',
    },
    {
      type: 'World',
      displayName: 'Japan',
      abbreviation: 'JPN',
      logo: JapanFlag,
      colour: '#f4d5e2',
    },
    {
      type: 'World',
      displayName: 'Kenya',
      abbreviation: 'KEN',
      logo: KenyaFlag,
      colour: '#551828',
    },
    {
      type: 'World',
      displayName: 'Fiji',
      abbreviation: 'FIJI',
      logo: FijiFlag,
      colour: '#ffffff',
    },
    {
      type: 'World',
      displayName: 'Canada',
      abbreviation: 'CAN',
      logo: CanadaFlag,
      colour: '#e82042',
    },
    {
      type: 'World',
      displayName: 'United States of America',
      abbreviation: 'USA',
      logo: USAFlag,
      colour: '#0a3161',
    },
    {
      type: 'World',
      displayName: 'Samoa',
      abbreviation: 'SAM',
      logo: SamoaFlag,
      colour: '#264282',
    },
    {
      type: 'World',
      displayName: 'Chile',
      abbreviation: 'CHILE',
      logo: ChileFlag,
      colour: '#0032a0',
    },
    {
      type: 'World',
      displayName: 'Uruguay',
      abbreviation: 'URUG',
      logo: UruguayFlag,
      colour: '#0032a0',
    },
    {
        type: 'World',
        displayName: 'Belgium',
        abbreviation: 'BEL',
        logo: BelgiumFlag,
        colour: '#000',
    },
    {
        type: 'World',
        displayName: 'Brazil',
        abbreviation: 'BRA',
        logo: BrazilFlag,
        colour: '#000',
    },
    {
        type: 'World',
        displayName: 'China',
        abbreviation: 'CHN',
        logo: ChinaFlag,
        colour: '#000',
    },
    {
        type: 'World',
        displayName: 'Germany',
        abbreviation: 'GER',
        logo: GermanyFlag,
        colour: '#000',
    },
    {
        type: 'World',
        displayName: 'Poland',
        abbreviation: 'POL',
        logo: PolandFlag,
        colour: '#000',
    },
    {
        type: 'World',
        displayName: 'Spain',
        abbreviation: 'ESP',
        logo: SpainFlag,
        colour: '#000',
    },
  ];