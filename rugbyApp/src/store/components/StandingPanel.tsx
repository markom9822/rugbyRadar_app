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
    teamDraws: string
    teamLosses: string
    teamPD: string
    teamPoints: string
}

export const StandingPanel = ({league, isHeader, teamPool, teamName, teamGP, teamWins, teamDraws, teamLosses, teamPD, teamPoints}: StandingPanelProps) => {

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

    const teamPDTextColour = (new Number(teamPD) >= new Number(0)) ? ('green'):('red');


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
                    <View style={{ width: "40%", backgroundColor: 'yellow', flexDirection: 'row' }}>
                        <Image
                            style={{ flex: 1, resizeMode: 'contain', width: 25, height: 25, minHeight: 25, minWidth: 25 }}
                            source={teamInfo.logo} />
                        <Text style={standingsPanelStyles.teamName}>{teamName}</Text>
                    </View>
                    <Text style={[standingsPanelStyles.teamStat, {width: '9%'}]}>{teamGP}</Text>
                    <Text style={[standingsPanelStyles.teamStat, {width: '9%'}]}>{teamWins}</Text>
                    <Text style={[standingsPanelStyles.teamStat, {width: '9%'}]}>{teamDraws}</Text>
                    <Text style={[standingsPanelStyles.teamStat, {width: '9%'}]}>{teamLosses}</Text>
                    <Text style={[standingsPanelStyles.teamStat, {width: '15%', color: teamPDTextColour}]}>{teamPD}</Text>
                    <Text style={[standingsPanelStyles.teamStat, {width: '9%'}]}>{teamPoints}</Text>

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