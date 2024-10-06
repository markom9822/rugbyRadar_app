import { SeasonDateInfo } from "@/app/(tabs)/standings";
import { InternationalRugbyTeams } from "../InternationalRugbyTeamsDatabase";
import { DefaultLogo } from "../InternationalTeamLogos/InternationalTeams";
import { ChampionsCupAltLogo, ChampionsCupLogo, PremiershipAltLogo, PremiershipLogo, RugbyChampAltLogo, RugbyChampLogo, SixNationsAltLogo, SixNationsLogo, SuperRugbyAltLogo, SuperRugbyLogo, Top14AltLogo, Top14Logo, URCAltLogo, URCLogo, WorldCupAltLogo, WorldCupLogo } from "../LeagueLogos/LeagueLogos";
import { PremRugbyTeams } from "../PremiershipRubyTeamsDatabase";
import { SuperRugbyTeams } from "../SuperRugbyPacificRugbyTeamsDatabase";
import { Top14RugbyTeams } from "../Top14RugbyTeamsDatabase";
import { URCRugbyTeams } from "../URCRugbyTeamsDatabase";
import { BEINSportsLogo, DiscoveryPlusLogo, PremierSportsLogo, RTELogo, S4CLogo, TG4Logo, TNTSportsLogo } from "../BroadcasterLogos/BroadcasterLogos";

export const leagueCodes = [
    { value: 'urc', code: "270557",
         displayName: 'United Rugby Championship', leagueLogo: URCLogo, leagueAltLogo: URCAltLogo},
    { value: 'prem', code: "267979",
         displayName: 'Gallagher Premiership', leagueLogo: PremiershipLogo, leagueAltLogo: PremiershipAltLogo},
    { value: 'top14', code: "270559",
         displayName: 'Top 14', leagueLogo: Top14Logo, leagueAltLogo: Top14AltLogo},
    { value: 'superRugby', code: "242041",
         displayName: 'Super Rugby Pacific', leagueLogo: SuperRugbyLogo, leagueAltLogo: SuperRugbyAltLogo},
    { value: 'rugbyChamp', code: "244293",
         displayName: 'Rugby Championship', leagueLogo: RugbyChampLogo, leagueAltLogo: RugbyChampAltLogo},
    { value: 'rugbyWorldCup', code: "164205",
         displayName: 'Rugby World Cup', leagueLogo: WorldCupLogo, leagueAltLogo: WorldCupAltLogo},
    { value: 'championsCup', code: "271937",
         displayName: 'European Rugby Champions Cup', leagueLogo: ChampionsCupLogo, leagueAltLogo: ChampionsCupAltLogo},
    { value: 'challengeCup', code: "272073",
         displayName: '', leagueLogo: null, leagueAltLogo: null},
    { value: 'sixNations', code: "180659",
         displayName: 'Six Nations', leagueLogo: SixNationsLogo, leagueAltLogo: SixNationsAltLogo},
    { value: 'inter', code: "289234",
         displayName: 'International Test Match', leagueLogo: null, leagueAltLogo: null},
    { value: 'menSevens', code: "282",
         displayName: '', leagueLogo: null, leagueAltLogo: null},
];

export const rugbyVizleagueCodes = [
    { value: 'urc', code: "1068",
         displayName: 'United Rugby Championship', leagueLogo: URCLogo, leagueAltLogo: URCAltLogo},
    { value: 'prem', code: "1011",
         displayName: 'Gallagher Premiership', leagueLogo: PremiershipLogo, leagueAltLogo: PremiershipAltLogo},
    { value: 'top14', code: "1002",
         displayName: 'Top 14', leagueLogo: Top14Logo, leagueAltLogo: Top14AltLogo},
    { value: 'championsCup', code: "1008",
         displayName: 'European Rugby Champions Cup', leagueLogo: ChampionsCupLogo, leagueAltLogo: ChampionsCupAltLogo},
    { value: 'challengeCup', code: "1026",
         displayName: '', leagueLogo: null, leagueAltLogo: null},
];

export const getRugbyVizLeagueCode = (name: string) => {

    const result = rugbyVizleagueCodes.find((element) => element.value == name)
    return result?.code.toString()
}

export const isLeagueInRugbyViz = (displayName: string) => {

    const result = rugbyVizleagueCodes.find((element) => element.displayName == displayName)
    return result !== undefined
}

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
      altLogo: DefaultLogo,
      colour: '#00000',
      id: '0',
      defaultLeague: '',
      foundedYear: '',
      seasonType: '',
    }

    const allTeamsArray = [...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams, ...SuperRugbyTeams, ...InternationalRugbyTeams];

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
      altLogo: DefaultLogo,
      colour: '#00845c',
      id: '0',
      defaultLeague: '',
      foundedYear: '',
      seasonType: '',
    }

    const allTeamsArray = [...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams, ...SuperRugbyTeams, ...InternationalRugbyTeams];
  
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

export const broadcasters = [
    { name: 'RTE', logo: RTELogo},
    { name: 'S4C', logo: S4CLogo},
    { name: 'Prem', logo: PremierSportsLogo},
    { name: 'DISC', logo: DiscoveryPlusLogo},
    { name: 'bein', logo: BEINSportsLogo},
    { name: 'TG4', logo: TG4Logo},
    { name: 'TNT', logo: TNTSportsLogo},
];


export const getBroadcasterLogo = (broadcasterName: string) => {

    const result = broadcasters.find((element) => element.name == broadcasterName)
    return result?.logo
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

export const generateSeasonList = () =>{

    const currentYear = new Date().getFullYear().valueOf();
    const startYear = "2009"

    var seasonArray: SeasonDateInfo[] = []

    for (let index = 0; index < Number(currentYear) - Number(startYear) + 1; index++) {

        const year = Number(currentYear) - (index-1);
        const lastYear  = year - 1;

        let newItem = {
            label: lastYear.toString() + "/" + year.toString().substring(year.toString().length - 2),
            value: year.toString()
        }

        seasonArray.push(newItem)
    }

    console.info(seasonArray)

    return (
        seasonArray
    )

}


export const isLastItemInSectionList = (index: number, section: any, globalData: any) => {
    return (index === section.data.length - 1 && section.title === globalData.at(-1).title)
}


export function dateCustomFormatting(date: Date): string {
    const padStart = (value: number): string =>
        value.toString().padStart(2, '0');

    return `${date.getFullYear()}${padStart(date.getMonth() + 1)}${padStart(date.getDate())}`;
}

export const hexToRGB = (hexValue: string, alpha: string) => {
    const numericValue = parseInt(hexValue.slice(1), 16);
    const r = numericValue >> 16 & 0xFF;
    const g = numericValue >> 8 & 0xFF;
    const b = numericValue & 0xFF;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }