import { DefaultLogo } from "./InternationalTeamLogos/InternationalTeams"
import { PremRugbyTeams } from "./PremiershipRubyTeamsDatabase";
import { Top14RugbyTeams } from "./Top14RugbyTeamsDatabase";
import { URCRugbyTeams } from "./URCRugbyTeamsDatabase";


export const getChampionsCupTeamInfoFromName = (name: string) => {

    const defaultTeam =  {
      type: 'Champions Cup',
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

    const champsCupTeamsArray = [...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams];

  
    const match = champsCupTeamsArray.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
  }