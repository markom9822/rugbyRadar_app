import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams"
import { PremRugbyTeams } from "./PremiershipRubyTeamsDatabase";
import { Top14RugbyTeams } from "./Top14RugbyTeamsDatabase";
import { URCRugbyTeams } from "./URCRugbyTeamsDatabase";

export const rugbyVizTop14Names = [
  { databaseName: 'La Rochelle', rugbyVizName: 'Stade Rochelais',},
  { databaseName: 'Toulon', rugbyVizName: 'RC Toulon',},
  { databaseName: 'Bordeaux Begles', rugbyVizName: 'Bordeaux-Bègles',},
  { databaseName: 'Bayonne', rugbyVizName: 'Aviron Bayonnais',},
  { databaseName: 'Pau', rugbyVizName: 'Section Paloise',},
  { databaseName: 'Montpellier Herault', rugbyVizName: 'Montpellier Hérault',},
];

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

    const champsCupTeamsArray = [...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams];
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