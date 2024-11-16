import { SeasonDateInfo } from "@/app/(tabs)/standings";
import { InternationalRugbyTeams } from "../InternationalRugbyTeamsDatabase";
import { DefaultLogo } from "../InternationalTeamLogos/InternationalTeams";
import { AutumnNationsLogo, ChallengeCupAltLogo, ChallengeCupLogo, ChampionsCupAltLogo, ChampionsCupLogo, PremiershipAltLogo, PremiershipLogo, RugbyChampAltLogo, RugbyChampLogo, SixNationsAltLogo, SixNationsLogo, SuperRugbyAltLogo, SuperRugbyLogo, Top14AltLogo, Top14Logo, U20SixNationsLogo, URCAltLogo, URCLogo, WorldCupAltLogo, WorldCupLogo } from "../LeagueLogos/LeagueLogos";
import { PremRugbyTeams } from "../PremiershipRubyTeamsDatabase";
import { SuperRugbyTeams } from "../SuperRugbyPacificRugbyTeamsDatabase";
import { Top14RugbyTeams } from "../Top14RugbyTeamsDatabase";
import { URCRugbyTeams } from "../URCRugbyTeamsDatabase";
import { BBCNILogo, BBCWalesLogo, BEINSportsLogo, DiscoveryPlusLogo, PremierSportsLogo, RTELogo, S4CLogo, TG4Logo, TNTSportsLogo } from "../BroadcasterLogos/BroadcasterLogos";

export const leagueCodes = [
    { value: 'urc', code: "270557",
         displayName: 'United Rugby Championship', leagueLogo: URCLogo, leagueAltLogo: URCAltLogo},
    { value: 'prem', code: "267979",
         displayName: 'Gallagher Premiership', leagueLogo: PremiershipLogo, leagueAltLogo: PremiershipAltLogo},
    { value: 'top14', code: "270559",
         displayName: 'Top 14', leagueLogo: Top14Logo, leagueAltLogo: Top14AltLogo},
    { value: 'superRugby', code: "242041",
         displayName: 'Super Rugby Pacific', leagueLogo: SuperRugbyLogo, leagueAltLogo: SuperRugbyAltLogo},
    { value: 'rugbyChamp', code: "a8ed1f3e-a2f3-4400-9f3a-9fc002356b3c",
         displayName: 'The Rugby Championship', leagueLogo: RugbyChampLogo, leagueAltLogo: RugbyChampAltLogo},
    { value: 'rugbyWorldCup', code: "164205",
         displayName: 'Rugby World Cup', leagueLogo: WorldCupLogo, leagueAltLogo: WorldCupAltLogo},
    { value: 'championsCup', code: "271937",
         displayName: 'Investec Champions Cup', leagueLogo: ChampionsCupLogo, leagueAltLogo: ChampionsCupAltLogo},
    { value: 'challengeCup', code: "272073",
         displayName: 'European Challenge Cup', leagueLogo: ChallengeCupLogo, leagueAltLogo: ChallengeCupAltLogo},
    { value: 'sixNations', code: "180659",
         displayName: 'Six Nations', leagueLogo: SixNationsLogo, leagueAltLogo: SixNationsAltLogo},
    { value: 'inter', code: "289234",
         displayName: 'International Test Match', leagueLogo: null, leagueAltLogo: null},
    { value: 'menSevens', code: "282",
         displayName: '', leagueLogo: null, leagueAltLogo: null},
    { value: 'autumnNations', code: "c805a102-6cbe-4eed-a158-f5878cf1f162",
        displayName: 'Autumn Nations Series', leagueLogo: AutumnNationsLogo, leagueAltLogo: AutumnNationsLogo},
    { value: 'u20SixNations', code: "dbb6df44-d64a-4726-a1b8-839c0cc1ff41",
        displayName: 'U20 Six Nations', leagueLogo: U20SixNationsLogo, leagueAltLogo: U20SixNationsLogo},
];

export const rugbyVizleagueCodes = [
    { value: 'urc', code: "1068",
         displayName: 'United Rugby Championship', leagueLogo: URCLogo, leagueAltLogo: URCAltLogo},
    { value: 'prem', code: "1011",
         displayName: 'Gallagher Premiership', leagueLogo: PremiershipLogo, leagueAltLogo: PremiershipAltLogo},
    { value: 'championsCup', code: "1008",
         displayName: 'Investec Champions Cup', leagueLogo: ChampionsCupLogo, leagueAltLogo: ChampionsCupAltLogo},
    { value: 'challengeCup', code: "1026",
         displayName: 'European Challenge Cup', leagueLogo: ChallengeCupLogo, leagueAltLogo: ChallengeCupAltLogo},

];


export const getRugbyVizLeagueCode = (name: string) => {

    const result = rugbyVizleagueCodes.find((element) => element.value == name)
    return result?.code.toString()
}

export const getRugbyVizLeagueCodeFromLeagueDisplayName = (leagueDisplayName: string) => {

    const result = rugbyVizleagueCodes.find((element) => element.displayName == leagueDisplayName)
    return result?.code.toString()
}

export const getRugbyVizLeagueDisplayNameFromCode = (code: string) => {

    const result = rugbyVizleagueCodes.find((element) => element.code == code)
    if(result == undefined)
    {
        return ''
    }
    return result.displayName.toString()
}

export const getRugbyVizLeagueNameFromCode = (code: string) => {

    const result = rugbyVizleagueCodes.find((element) => element.code == code)
    if(result == undefined)
    {
        return ''
    }
    return result.value.toString()
}

export const isLeagueInRugbyViz = (displayName: string) => {

    const result = rugbyVizleagueCodes.find((element) => element.displayName == displayName)
    return result !== undefined
}

//--------------------------------------------------------------------------------------------------

export const worldRugbyAPILeagueCodes = [
    { value: 'autumnNations', code: "c805a102-6cbe-4eed-a158-f5878cf1f162",
        displayName: 'Autumn Nations Series', leagueLogo: null, leagueAltLogo: null},
    { value: 'sixNations', code: "2171",
        displayName: 'Six Nations', leagueLogo: SixNationsLogo, leagueAltLogo: SixNationsAltLogo},
    { value: 'u20SixNations', code: "dbb6df44-d64a-4726-a1b8-839c0cc1ff41",
        displayName: 'U20 Six Nations', leagueLogo: SixNationsLogo, leagueAltLogo: SixNationsAltLogo},
    { value: 'rugbyChamp', code: "a8ed1f3e-a2f3-4400-9f3a-9fc002356b3c",
        displayName: 'The Rugby Championship', leagueLogo: RugbyChampLogo, leagueAltLogo: RugbyChampAltLogo},
    { value: 'rugbyWorldCup', code: "1893",
        displayName: 'Rugby World Cup', leagueLogo: WorldCupLogo, leagueAltLogo: WorldCupAltLogo},
    { value: 'u20Championship', code: "560edcbf-fd99-4a11-b7b5-0a5e017d61f2",
        displayName: 'U20 Championship', leagueLogo: WorldCupLogo, leagueAltLogo: WorldCupAltLogo},
    { value: 'BILTour', code: "2c9549f5-0e9a-4bcb-9d05-074ef161b7be",
        displayName: 'Britsh & Irish Lions Tour', leagueLogo: null, leagueAltLogo: null},
    
];

export const isLeagueInWorldRugbyAPIFromLeagueName = (name: string) => {

    const result = worldRugbyAPILeagueCodes.find((element) => element.value == name)
    return result !== undefined
}

export const isLeagueInWorldRugbyAPI = (displayName: string) => {

    const result = worldRugbyAPILeagueCodes.find((element) => element.displayName == displayName)
    return result !== undefined
}

export const getWorldRugbyAPILeagueCode = (name: string) => {

    const result = worldRugbyAPILeagueCodes.find((element) => element.value == name)
    return result?.code.toString()
}

export const getWorldRugbyAPILeagueDisplayNameFromCode = (code: string) => {

    const result = worldRugbyAPILeagueCodes.find((element) => element.code == code)
    if(result == undefined)
    {
        return ''
    }
    return result.displayName.toString()
}

//-----------------------------------------------------------------------------------------------------


export const planetRugbyAPILeagueCodes = [
    { value: 'top14', code: "1310036262",
        displayName: 'Top 14', leagueLogo: Top14Logo, leagueAltLogo: Top14AltLogo},
    // need to add super rugby here
];

export const isLeagueInPlanetRugbyAPIFromLeagueName = (name: string) => {

    const result = planetRugbyAPILeagueCodes.find((element) => element.value == name)
    return result !== undefined
}

export const isLeagueInPlanetRugbyAPI = (displayName: string) => {

    const result = planetRugbyAPILeagueCodes.find((element) => element.displayName == displayName)
    return result !== undefined
}

export const getPlanetRugbyAPILeagueCode = (name: string) => {

    const result = planetRugbyAPILeagueCodes.find((element) => element.value == name)
    return result?.code.toString()
}

export const getPlanetRugbyAPILeagueDisplayNameFromCode = (code: string) => {

    const result = planetRugbyAPILeagueCodes.find((element) => element.code == code)
    if(result == undefined)
    {
        return ''
    }
    return result.displayName.toString()
}

export const getPlanetRugbyMatchIDFromDetails = async (selectedDate: Date, homeTeamName: string, awayTeamName: string) => {

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const startDate = formatDate(selectedDate);

    const apiString = 'https://rugbylivecenter.yormedia.com/api/matches/all/' + startDate + '/1';
    const matchInfo = await fetch(apiString,).then((res) => res.json())

    for (let index = 0; index < matchInfo.data.length; index++) {

        for (let matchIndex = 0; matchIndex < matchInfo.data[index].matches.length; matchIndex++) {

            const thisMatch = matchInfo.data[index].matches[matchIndex];

            const parts = thisMatch.teams.split(';');
            const parts2 = thisMatch.teams.split(':')
            const homeParts = parts[0].split(':');
            const homeTeam1 = homeParts[homeParts.length - 1]
            const homeTeam2 = parts2[0]

            const awayParts = parts[1].split(':');
            const awayTeam1 = awayParts[0]
            const awayTeam2 = parts2[parts2.length - 1]

            const homeCheck = homeTeam1 == homeTeamName || homeTeam2 == homeTeamName;
            const awayCheck = awayTeam1 == awayTeamName || awayTeam2 == awayTeamName;

            if(homeCheck && awayCheck)
            {
                return thisMatch.id;
            }

        }
    }

    return null
}

//---------------------------------------------------------------------------------------------------

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
    if(result !== undefined)
    {
        return result.value.toString()
    }
    else
    {
        return ''
    }
    
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

//----------------------------------------------------------------------------------------------------------------

export const getESPNMatchInfoFromDetails = async (selectedDate: Date, homeTeamName: string, awayTeamName: string) => {

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}${month}${day}`;
    }

    const startDate = formatDate(selectedDate);

    const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates='+startDate+'&lang=en&region=gb&tz=Europe/London';
    const matchInfo = await fetch(apiString,).then((res) => res.json())

    for (let index = 0; index < matchInfo.scores.length; index++) {

        for (let matchIndex = 0; matchIndex < matchInfo.scores[index].events.length; matchIndex++) {

            const thisMatch = matchInfo.scores[index].events[matchIndex];

            const homeTeam = thisMatch.competitions[0].competitors[0].team.name;
            const awayTeam = thisMatch.competitions[0].competitors[1].team.name;

            const homeCheck = homeTeam == homeTeamName;
            const awayCheck = awayTeam == awayTeamName;

            if(homeCheck && awayCheck)
            {
                return{
                    matchID: thisMatch.id,
                    leagueID: thisMatch.leagueId
                }
            }

        }
    }

    return null
}

//----------------------------------------------------------------------------------------------------------------

export const broadcasters = [
    { name: 'RTE', logo: RTELogo},
    { name: 'S4C', logo: S4CLogo},
    { name: 'Prem', logo: PremierSportsLogo},
    { name: 'DISC', logo: DiscoveryPlusLogo},
    { name: 'beIN', logo: BEINSportsLogo},
    { name: 'TG4', logo: TG4Logo},
    { name: 'TNT', logo: TNTSportsLogo},
    { name: 'BBCW', logo: BBCWalesLogo},
    { name: 'BBCN', logo: BBCNILogo},

    // channels from planet rugby API
    { name: 'TNT Sport 1', logo: TNTSportsLogo},
    { name: 'TNT Sport Ultimate', logo: TNTSportsLogo},
    { name: 'discovery +', logo: DiscoveryPlusLogo},
    { name: 'BBC Player', logo: BBCWalesLogo},

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
    const startYear = "2021"

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