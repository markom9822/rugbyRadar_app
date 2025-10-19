import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams"
import { MiscRugbyTeams } from "./MiscRugbyTeamsDatabase";
import { PremRugbyTeams } from "./PremiershipRubyTeamsDatabase";
import { Top14RugbyTeams } from "./Top14RugbyTeamsDatabase";
import { URCRugbyTeams } from "./URCRugbyTeamsDatabase";

export const rugbyVizChampsCupNames = [
  { databaseName: 'La Rochelle', rugbyVizName: 'Stade Rochelais',},
  { databaseName: 'Toulon', rugbyVizName: 'RC Toulon',},
  { databaseName: 'Bordeaux Begles', rugbyVizName: 'Bordeaux-Begles',},
  { databaseName: 'Bayonnais', rugbyVizName: 'Bayonne',},
  { databaseName: 'Montpellier', rugbyVizName: 'Montpellier Hérault',},
  { databaseName: 'Stade Toulousain', rugbyVizName: 'Toulouse',},
  { databaseName: 'Clermont', rugbyVizName: 'Clermont Auvergne',},
  { databaseName: 'Stade Francais', rugbyVizName: 'Stade Francais Paris',},
  { databaseName: 'USA Perpignan', rugbyVizName: 'Perpignan',},
  { databaseName: 'Section Paloise', rugbyVizName: 'Pau',},
  { databaseName: 'Lyon', rugbyVizName: 'Lyon O.U.',},
];

export const getChampsCupShortNameFromFullName = (name: string) => {
  const champsCupTeamsArray = [...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams];

  let searchName = '';

  const champsCupNameResult = rugbyVizChampsCupNames.find((element) => element.rugbyVizName === name)
  if(champsCupNameResult !== undefined)
  {
      searchName = champsCupNameResult.databaseName;
  }
  else
  {
      searchName = name;
  }

  searchName = searchName.replace(" Rugby", "")
  
  const match = champsCupTeamsArray.find((item) => searchName.replace('-', ' ').indexOf(item.displayName) !== -1)

  if(match !== undefined)
  {
    return match.displayName;
  }
  
  return name
}


export const getChampionsCupTeamInfoFromName = (name: string) => {

    const defaultTeam =  {
      type: 'Champions Cup',
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

    const champsCupTeamsArray = [...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams, ...MiscRugbyTeams];
    let searchName = '';

    const champsCupNameResult = rugbyVizChampsCupNames.find((element) => element.rugbyVizName === name)
    if(champsCupNameResult !== undefined)
    {
        searchName = champsCupNameResult.databaseName;
    }
    else
    {
        searchName = name;
    }

    searchName = searchName.replace(" Rugby", "")

    const match = champsCupTeamsArray.find((item) => item.displayName === searchName)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
  }