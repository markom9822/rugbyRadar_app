import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams";
import { BluesAltLogo, BluesLogo, BrumbiesAltLogo, BrumbiesLogo, ChiefsAltLogo, ChiefsLogo, CrusadersAltLogo, CrusadersLogo, DruaAltLogo, DruaLogo, ForceAltLogo, ForceLogo, HighlandersAltLogo, HighlandersLogo, HurricanesAltLogo, HurricanesLogo, MoanaAltLogo, MoanaLogo, RebelsAltLogo, RebelsLogo, RedsAltLogo, RedsLogo, WaratahsAltLogo, WaratahsLogo } from "./SuperRugbyTeamLogos/SuperRugbyTeams";


export const rugbyVizSuperRugbyNames = [
  { databaseName: 'Reds', rugbyVizName: 'Queensland Reds',},
  { databaseName: 'Waratahs', rugbyVizName: 'New South Wales Waratahs',},
];

export const getSuperRugbyTeamInfoFromName = (name: string) => {

    const defaultTeam =  {
      type: 'Super Rugby Club',
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

    let searchName = '';

    const superRugbyNameResult = rugbyVizSuperRugbyNames.find((element) => element.rugbyVizName === name)
      if(superRugbyNameResult !== undefined)
      {
          searchName = superRugbyNameResult.databaseName;
      }
      else
      {
          searchName = name;
      }
  
      const match = SuperRugbyTeams.find((item) => item.displayName === searchName)
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
        altLogo: HurricanesAltLogo,
        colour: '#fede00',
        id: '25939',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Blues',
        abbreviation: 'BLUES',
        logo: BluesLogo,
        altLogo: BluesAltLogo,
        colour: '#1f3bc4',
        id: '25932',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Brumbies',
        abbreviation: 'BRUMB',
        logo: BrumbiesLogo,
        altLogo: BrumbiesAltLogo,
        colour: '#002B54',
        id: '25889',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1995',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Chiefs',
        abbreviation: 'CHIEF',
        logo: ChiefsLogo,
        altLogo: ChiefsAltLogo,
        colour: '#f03737',
        id: '25934',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Reds',
        abbreviation: 'REDS',
        logo: RedsLogo,
        altLogo: RedsAltLogo,
        colour: '#D01044',
        id: '182',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Highlanders',
        abbreviation: 'HLAND',
        logo: HighlandersLogo,
        altLogo: HighlandersAltLogo,
        colour: '#ebbc13',
        id: '25938',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Fijian Drua',
        abbreviation: 'FIJ',
        logo: DruaLogo,
        altLogo: DruaAltLogo,
        colour: '#1313eb',
        id: '289338',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '2017',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Rebels',
        abbreviation: 'REBEL',
        logo: RebelsLogo,
        altLogo: RebelsAltLogo,
        colour: '#002B5C',
        id: '25894',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '2009',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Crusaders',
        abbreviation: 'CRUS',
        logo: CrusadersLogo,
        altLogo: CrusadersAltLogo,
        colour: '#6D0000',
        id: '25936',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1996',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Western Force',
        abbreviation: 'FORCE',
        logo: ForceLogo,
        altLogo: ForceAltLogo,
        colour: '#004A9F',
        id: '25893',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '2005',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Moana Pasifika',
        abbreviation: 'MOA',
        logo: MoanaLogo,
        altLogo: MoanaAltLogo,
        colour: '#0bd1e3',
        id: '289319',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '2020',
        seasonType: 'south',
    },
    {
        type: 'Super Rugby Club',
        displayName: 'Waratahs',
        abbreviation: 'WARAT',
        logo: WaratahsLogo,
        altLogo: WaratahsAltLogo,
        colour: '#8fc5eb',
        id: '227',
        defaultLeague: 'Super Rugby Pacific',
        foundedYear: '1882',
        seasonType: 'south',
    },
  ];