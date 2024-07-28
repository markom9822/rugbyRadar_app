import { standingsPanelStyles } from "@/styles"
import { View, Image, Text } from "react-native"
import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase"
import { getInternationalTeamInfoFromName } from "../InternationalRugbyTeamsDatabase"
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase"
import { getTop14TeamInfoFromName } from "../Top14RugbyTeamsDatabase"


type StandingPanelProps = {
    league: string
    isHeader: boolean
    teamPool: string
	teamName: string
	teamGP: string
    teamWins: string
}

export const StandingPanel = ({league, isHeader, teamPool, teamName, teamGP, teamWins}: StandingPanelProps) => {

    var teamInfo: { type: string; displayName: string; abbreviation: string; logo: any; colour: string } | null | undefined;
    if(league === "urc")
    {
        teamInfo = getURCTeamInfoFromName(teamName)
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
    else if(league === "rugbyWorldCup")
    {
        teamInfo = getInternationalTeamInfoFromName(teamName)
    }
    else
    {
        return
    }
    
    if(teamInfo === null) return
    if(teamInfo === undefined) return

    const standingsRender = (isHeader: boolean) => {

        if(teamInfo === null) return
        if(teamInfo === undefined) return

        if(isHeader)
        {
            return (
                <View style={{width: "50%", flexDirection: 'row'}}>
                    <Text style={standingsPanelStyles.teamName}>{teamPool}</Text>
                </View>
            )
        }
        else
        {
            return (
                <>
                    <View style={{ width: "50%", backgroundColor: 'yellow', flexDirection: 'row' }}>
                        <Image
                            style={{ flex: 1, resizeMode: 'contain', width: 30, height: 30, minHeight: 30, minWidth: 30 }}
                            source={teamInfo.logo} />
                        <Text style={standingsPanelStyles.teamName}>{teamName}</Text>
                    </View>
                    <Text style={standingsPanelStyles.teamStat}>{teamGP}</Text>
                    <Text style={standingsPanelStyles.teamStat}>{teamWins}</Text>
                </>
            )
        }
    }


    return(
        <View style={standingsPanelStyles.container}>
            {standingsRender(isHeader)}
        </View>
    )

}