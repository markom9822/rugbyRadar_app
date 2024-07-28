import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase";
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase";
import { getTop14TeamInfoFromName } from "../Top14RugbyTeamsDatabase";
import { getWorldFlagTeamInfoFromName } from "../WorldFlagsRugbyTeamsDatabase";
import { getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"


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
    else if(league === "menSevens")
    {
        homeInfo = getWorldFlagTeamInfoFromName(homeTeam)
        awayInfo = getWorldFlagTeamInfoFromName(awayTeam)
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