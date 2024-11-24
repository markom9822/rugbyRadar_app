import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase";
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase";
import { getTop14TeamInfoFromName } from "../Top14RugbyTeamsDatabase";
import { getWorldFlagTeamInfoFromName } from "../WorldFlagsRugbyTeamsDatabase";
import { getInternationalTeamInfoFromName, getLionsTourTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"
import { getChampionsCupTeamInfoFromName } from "../ChampionsCupRugbyTeamsDatabase";
import { getSuperRugbyTeamInfoFromName } from "../SuperRugbyPacificRugbyTeamsDatabase";
import { getAnyTeamInfoFromName } from "./helpers";


export const getHomeAwayTeamInfo = (league: string | undefined, homeTeam: string, awayTeam: string) => {

    var homeInfo;
    var awayInfo;

    if(league === "urc")
    {
        homeInfo = getURCTeamInfoFromName(homeTeam)
        awayInfo = getURCTeamInfoFromName(awayTeam)
    }
    else if(league === "inter" || league === "rugbyChamp" || league === "sixNations" || league === "autumnNations" || league === "rugbyWorldCup")
    {
        homeInfo = getInternationalTeamInfoFromName(homeTeam)
        awayInfo = getInternationalTeamInfoFromName(awayTeam)
    }
    else if(league === "u20SixNations" || league === "u20Championship")
    {
        const u20HomeTeam = homeTeam.replace(" U20", "");
        const u20AwayTeam = awayTeam.replace(" U20", "");

        homeInfo = getInternationalTeamInfoFromName(u20HomeTeam)
        awayInfo = getInternationalTeamInfoFromName(u20AwayTeam)
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
    else if(league === "championsCup" || league === "challengeCup")
    {
        homeInfo = getChampionsCupTeamInfoFromName(homeTeam)
        awayInfo = getChampionsCupTeamInfoFromName(awayTeam)
    }
    else if (league === "BILTour")
    {
        homeInfo = getLionsTourTeamInfoFromName(homeTeam)
        awayInfo = getLionsTourTeamInfoFromName(awayTeam)
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

export const getAnyHomeAwayTeamInfo = (homeTeam: string, awayTeam: string) => {

    const homeInfo = getAnyTeamInfoFromName(homeTeam)
    const awayInfo = getAnyTeamInfoFromName(awayTeam)

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