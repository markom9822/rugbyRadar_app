import { InternationalRugbyTeams } from "../InternationalRugbyTeamsDatabase";
import { DefaultLogo } from "../InternationalTeamLogos/InternationalTeams";
import { PremRugbyTeams } from "../PremiershipRubyTeamsDatabase";
import { Top14RugbyTeams } from "../Top14RugbyTeamsDatabase";
import { URCRugbyTeams } from "../URCRugbyTeamsDatabase";

export const leagueCodes = [
    { value: 'urc', code: "270557", displayName: 'United Rugby Championship'},
    { value: 'prem', code: "267979", displayName: 'Premiership Rugby'},
    { value: 'top14', code: "270559", displayName: 'Top 14'},
    { value: 'superRugby', code: "242041", displayName: 'Super Rugby Pacific'},
    { value: 'rugbyChamp', code: "244293", displayName: 'Rugby Championship'},
    { value: 'rugbyWorldCup', code: "164205", displayName: 'Rugby World Cup'},
    { value: 'championsCup', code: "271937", displayName: 'European Rugby Champions Cup'},
    { value: 'challengeCup', code: "272073", displayName: ''},
    { value: 'sixNations', code: "180659", displayName: 'Six Nations'},
    { value: 'inter', code: "289234", displayName: 'International Test Match'},
    { value: 'menSevens', code: "282", displayName: ''},
];

export const getLeagueCode = (name: string) => {

    const result = leagueCodes.find((element) => element.value == name)
    return result?.code.toString()
}

export const getLeagueCodeFromDisplayName = (displayName: string) => {

    const result = leagueCodes.find((element) => element.displayName == displayName)
    return result?.code.toString()
}

export const getLeagueName = (leagueCode: string) => {
    
    const result = leagueCodes.find((element) => element.code == leagueCode)
    return result?.value.toString()
}

export const getLeagueNameFromDisplayName = (displayName: string) => {
    
    const result = leagueCodes.find((element) => element.displayName == displayName)
    return result?.value.toString()
}

export const getLeagueDisplayNameFromCode = (leagueCode: string) => {
    
    const result = leagueCodes.find((element) => element.code == leagueCode)
    return result?.displayName.toString()
}

export const getLeagueInfoFromDisplayName  = (displayName: string) => {
    
    const result = leagueCodes.find((element) => element.displayName == displayName)
    return result
}

export const getAnyTeamInfoFromName = (name: string) => {

    const defaultTeam =  {
      type: 'Champions Cup',
      displayName: 'Default',
      abbreviation: 'DEF',
      logo: DefaultLogo,
      colour: '#00845c',
      id: '0',
      defaultLeague: '',
      foundedYear: '',
      seasonType: '',
    }

    const allTeamsArray = [...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams, ...InternationalRugbyTeams];

  
    const match = allTeamsArray.find((item) => item.displayName === name)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}

export const getAnyTeamInfoFromID = (id: string) => {

    const defaultTeam =  {
      type: 'Champions Cup',
      displayName: 'Default',
      abbreviation: 'DEF',
      logo: DefaultLogo,
      colour: '#00845c',
      id: '0',
      defaultLeague: '',
      foundedYear: '',
      seasonType: '',
    }

    const allTeamsArray = [...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams, ...InternationalRugbyTeams];
  
    const match = allTeamsArray.find((item) => item.id === id)
    if(match !== undefined)
    {
        return match
    }
    else
    {
        return defaultTeam
    }
}

export const getClosestWorldCupYear = (year: number) => {

    const yearDifference = year - 1987;
    const remainder = yearDifference % 4;

    if(remainder == 0)
    {
        return year;
    }

    return year - remainder;
}


export function dateCustomFormatting(date: Date): string {
    const padStart = (value: number): string =>
        value.toString().padStart(2, '0');

    return `${date.getFullYear()}${padStart(date.getMonth() + 1)}${padStart(date.getDate())}`;
}