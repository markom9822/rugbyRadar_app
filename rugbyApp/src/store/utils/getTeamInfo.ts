import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase";
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase";
import { getTop14TeamInfoFromName } from "../Top14RugbyTeamsDatabase";
import { getWorldFlagTeamInfoFromName } from "../WorldFlagsRugbyTeamsDatabase";
import { getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"
import { getChampionsCupTeamInfoFromName } from "../ChampionsCupRugbyTeamsDatabase";
import { getSuperRugbyTeamInfoFromName } from "../SuperRugbyPacificRugbyTeamsDatabase";


export const getHomeAwayTeamInfo = (league: string | undefined, homeTeam: string, awayTeam: string) => {

    var homeInfo;
    var awayInfo;

    if(league === "urc")
    {
        homeInfo = getURCTeamInfoFromName(homeTeam)
        awayInfo = getURCTeamInfoFromName(awayTeam)
    }
    else if(league === "inter")
    {
        homeInfo = getInternationalTeamInfoFromName(homeTeam)
        awayInfo = getInternationalTeamInfoFromName(awayTeam)
    }
    else if(league === "rugbyChamp")
    {
        homeInfo = getInternationalTeamInfoFromName(homeTeam)
        awayInfo = getInternationalTeamInfoFromName(awayTeam)
    }
    else if(league === "sixNations")
    {
        homeInfo = getInternationalTeamInfoFromName(homeTeam)
        awayInfo = getInternationalTeamInfoFromName(awayTeam)
    }
    else if(league === "prem") 
    {
        homeInfo = getPremTeamInfoFromName(homeTeam)
        awayInfo = getPremTeamInfoFromName(awayTeam)
    }
    else if(league === "top14")
    {
        homeInfo = getTop14TeamInfoFromName(homeTeam)
        awayInfo = getTop14TeamInfoFromName(awayTeam)
    }
    else if(league === "superRugby")
    {
            homeInfo = getSuperRugbyTeamInfoFromName(homeTeam)
            awayInfo = getSuperRugbyTeamInfoFromName(awayTeam)
    }
    else if(league === "championsCup")
    {
        homeInfo = getChampionsCupTeamInfoFromName(homeTeam)
        awayInfo = getChampionsCupTeamInfoFromName(awayTeam)
    }
    else
    {
        return null
    }

    return {
        homeInfo,
        awayInfo
    }

}

export const getTeamInfo = (league: string | undefined, teamName: string) => {

    var teamInfo;

    if(league === "urc")
    {
        teamInfo = getURCTeamInfoFromName(teamName)
    }
    else if(league === "inter")
    {
        teamInfo = getInternationalTeamInfoFromName(teamName)
    }
    else if(league === "rugbyChamp")
    {
        teamInfo = getInternationalTeamInfoFromName(teamName)
    }
    else if(league === "sixNations")
    {
        teamInfo = getInternationalTeamInfoFromName(teamName)
    }
    else if(league === "prem") 
    {
        teamInfo = getPremTeamInfoFromName(teamName)
    }
    else if(league === "top14")
    {
        teamInfo = getTop14TeamInfoFromName(teamName)
    }
    else if(league === "menSevens")
    {
        teamInfo = getWorldFlagTeamInfoFromName(teamName)
    }
    else
    {
        return null
    }

    return {
        teamInfo,
    }

}