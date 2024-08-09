import { standingsPanelStyles } from "@/styles"
import { View, Image, Text } from "react-native"
import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase"
import { getInternationalTeamInfoFromName } from "../InternationalRugbyTeamsDatabase"
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase"
import { getTop14TeamInfoFromName } from "../Top14RugbyTeamsDatabase"


type StandingPanelProps = {
    index: number
    league: string
    isHeader: boolean
    isWorldRanking: boolean
    teamPool: string
	teamName: string
	teamGP: string
    teamWins: string
    teamDraws: string
    teamLosses: string
    teamPD: string
    teamPoints: string
}

export const StandingPanel = ({index, league, isHeader, isWorldRanking, teamPool, teamName, teamGP, teamWins, teamDraws, teamLosses, teamPD, teamPoints}: StandingPanelProps) => {

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
    else if(league === "worldRankings")
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
    const panelBkgColour = (index % 2 == 0) ? ('#f2f1f0'): ('white');


    const standingsRender = (isHeader: boolean) => {

        if(teamInfo === null) return
        if(teamInfo === undefined) return

        if(isHeader)
        {
            return (
                <View style={{width: "50%", flexDirection: 'row', paddingTop: 10, paddingLeft: 3}}>
                    <Text style={[standingsPanelStyles.teamText, {fontWeight: 500}]}>{teamPool}</Text>
                </View>
            )
        }
        else
        {

            if(isWorldRanking)
            {
                return (
                    <>
                        <View style={{ width: "60%", flexDirection: 'row', borderRightWidth: 1, borderRightColor: 'grey', 
                            padding: 5, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: panelBkgColour }}>
                            <Text style={[standingsPanelStyles.teamText, {width: "15%"}]}>{index + 1}</Text>
                            <Image
                                style={{ resizeMode: 'contain', width: 25, height: 25, minHeight: 25, minWidth: 25 }}
                                source={teamInfo.logo} />
                            <Text style={[standingsPanelStyles.teamText, {width: "65%", paddingLeft: 5}]}>{teamName}</Text>
                        </View>
                        <Text style={[standingsPanelStyles.teamStat, {width: '40%', fontWeight: 600}]}>{teamPoints}</Text>
    
                    </>
                )

            }
            else
            {
                return (
                    <>
                        <View style={{ width: "40%", flexDirection: 'row', borderRightWidth: 1, borderRightColor: 'grey',
                             padding: 5, justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <Text style={[standingsPanelStyles.teamText, {width: "15%"}]}>{index + 1}</Text>
                            <Image
                                style={{ resizeMode: 'contain', width: 25, height: 25, minHeight: 25, minWidth: 25 }}
                                source={teamInfo.logo} />
                            <Text style={[standingsPanelStyles.teamText, {width: "65%", paddingLeft: 5}]}>{teamName}</Text>
                        </View>
                        <Text style={[standingsPanelStyles.teamStat, {width: '9%'}]}>{teamGP}</Text>
                        <Text style={[standingsPanelStyles.teamStat, {width: '9%'}]}>{teamWins}</Text>
                        <Text style={[standingsPanelStyles.teamStat, {width: '9%'}]}>{teamDraws}</Text>
                        <Text style={[standingsPanelStyles.teamStat, {width: '9%'}]}>{teamLosses}</Text>
                        <Text style={[standingsPanelStyles.teamStat, {width: '15%', color: teamPDTextColour}]}>{teamPD}</Text>
                        <Text style={[standingsPanelStyles.teamStat, {width: '9%', fontWeight: 600}]}>{teamPoints}</Text>
    
                    </>
                )

            }
        }
    }


    return(
        <View style={[standingsPanelStyles.container, {backgroundColor: panelBkgColour}]}>
            {standingsRender(isHeader)}
        </View>
    )

}