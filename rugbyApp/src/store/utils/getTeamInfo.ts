import { getInternationalTeamInfoFromName, getLionsTourTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase";
import { getChampionsCupTeamInfoFromName } from "../ChampionsCupRugbyTeamsDatabase";
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase";
import { getSuperRugbyTeamInfoFromName } from "../SuperRugbyPacificRugbyTeamsDatabase";
import { getTop14TeamInfoFromName } from "../Top14RugbyTeamsDatabase";
import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase";
import { getAnyTeamInfoFromName } from "./helpers";


export const getHomeAwayTeamInfo = (league: string | undefined, homeTeam: string, awayTeam: string) => {

    var homeInfo;
    var awayInfo;

    if(league === "urc")
    {
        homeInfo = getURCTeamInfoFromName(homeTeam)
        awayInfo = getURCTeamInfoFromName(awayTeam)
    }
    else if(league === "inter" || league === "rugbyChamp" || league === "sixNations" || league === "autumnNations" || league === "rugbyWorldCup" || league === "pacificNationsCup")
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

    if (league === "urc") {
        teamInfo = getURCTeamInfoFromName(teamName)
    }
    else if (league === "inter" || league === "rugbyChamp" || league === "sixNations" || league === "autumnNations" || league === "rugbyWorldCup") {
        teamInfo = getInternationalTeamInfoFromName(teamName)
    }
    else if (league === "u20SixNations" || league === "u20Championship") {
        const u20Team = teamName.replace(" U20", "");

        teamInfo = getInternationalTeamInfoFromName(u20Team)
    }
    else if (league === "prem") {
        teamInfo = getPremTeamInfoFromName(teamName)
    }
    else if (league === "top14") {
        teamInfo = getTop14TeamInfoFromName(teamName)
    }
    else if (league === "superRugby") {
        teamInfo = getSuperRugbyTeamInfoFromName(teamName)
    }
    else if (league === "championsCup" || league === "challengeCup") {
        teamInfo = getChampionsCupTeamInfoFromName(teamName)
    }
    else if (league === "BILTour") {
        teamInfo = getLionsTourTeamInfoFromName(teamName)
    }
    else {
        return null
    }

    return {
        teamInfo,
    }

}