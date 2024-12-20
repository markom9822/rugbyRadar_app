import { standingsPanelStyles } from "@/styles"
import { View, Image, Text } from "react-native"
import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase"
import { getInternationalTeamInfoFromName } from "../InternationalRugbyTeamsDatabase"
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase"
import { getTop14TeamInfoFromName } from "../Top14RugbyTeamsDatabase"
import { getChampionsCupTeamInfoFromName } from "../ChampionsCupRugbyTeamsDatabase"
import { getSuperRugbyTeamInfoFromName } from "../SuperRugbyPacificRugbyTeamsDatabase"
import { colors, fontFamilies } from "@/constants/tokens"
import { hexToRGB } from "../utils/helpers"


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
    ranking: number
    isLastItem: boolean
    isEndOfList: boolean
    isPlayoffCutoff: boolean,
}

export const StandingPanel = ({index, league, isHeader, isWorldRanking, teamPool, teamName,
     teamGP, teamWins, teamDraws, teamLosses, teamPD, teamPoints, ranking, isLastItem, isEndOfList, isPlayoffCutoff}: StandingPanelProps) => {

    var teamInfo: { type: string; displayName: string; abbreviation: string; logo: any; altLogo: any; colour: string } | null | undefined;

    if(league === "urc")
    {
        teamInfo = getURCTeamInfoFromName(teamName)
    }
    else if(league === "sixNations" || league === "rugbyChamp" || league === "rugbyWorldCup" || league === "worldRankings")
    {
        teamInfo = getInternationalTeamInfoFromName(teamName)
    }
    else if(league === "u20SixNations" || league === "u20Championship")
    {
        const u20Team = teamName.replace(" U20", "");
        teamInfo = getInternationalTeamInfoFromName(u20Team)
    }
    else if(league === "prem") 
    {
        teamInfo = getPremTeamInfoFromName(teamName)
    }
    else if(league === "top14")
    {
        teamInfo = getTop14TeamInfoFromName(teamName)
    }
    else if(league === "superRugby")
    {
        teamInfo = getSuperRugbyTeamInfoFromName(teamName)
    }
    else if(league === "championsCup" || league === "challengeCup")
    {
        teamInfo = getChampionsCupTeamInfoFromName(teamName)
    }
    else
    {
        return
    }
    
    if(teamInfo === null) return
    if(teamInfo === undefined) return

    const altBackgroundColour = hexToRGB(colors.altBackground, "0.2")
    const teamPDTextColour = (new Number(teamPD) >= new Number(0)) ? ('#31ad35'):('#c22727');
    const panelBkgColour = (ranking % 2 == 0) ? (altBackgroundColour): (colors.background);

    const standingsRender = (isHeader: boolean, isPlayoffCutoff: boolean) => {

        if(teamInfo === null) return
        if(teamInfo === undefined) return

        if(isHeader)
        {
            return (
                <View style={{width: "50%", flexDirection: 'row', paddingTop: 10, paddingLeft: 3}}>
                    <Text style={[standingsPanelStyles.teamText, {fontWeight: 600, color: 'lightgrey', fontSize: 11}]}>{teamPool.toUpperCase()}</Text>
                </View>
            )
        }
        else if (isPlayoffCutoff)
        {
            return (
                <View style={{width: "100%", flexDirection: 'row', backgroundColor: colors.background}}>
                    <View style={{width: "40%", height: 10, borderBottomColor: 'grey', borderBottomWidth: 1, borderStyle: 'dashed'}} />
                    <Text style={[standingsPanelStyles.teamText, {fontWeight: 600, color: 'grey', fontSize: 10, textAlign: 'center', width: "20%"}]}>Playoffs</Text>
                    <View style={{width: "40%", height: 10, borderBottomColor: 'grey', borderBottomWidth: 1, borderStyle: 'dashed'}} />
                </View>
            )
        }
        else
        {

            if(isWorldRanking)
            {
                return (
                    <>
                        <View style={{ width: "60%", flexDirection: 'row', padding: 7, justifyContent: 'space-evenly',
                             alignItems: 'center', backgroundColor: panelBkgColour }}>
                            <Text style={[standingsPanelStyles.teamText, {width: "15%"}]}>{ranking + 1}</Text>
                            <Image
                                style={{ resizeMode: 'contain', width: 25, height: 25, minHeight: 25, minWidth: 25 }}
                                source={teamInfo.logo} />
                            <Text style={[standingsPanelStyles.teamText, {width: "60%", paddingLeft: 5}]}>{teamName}</Text>
                        </View>
                        <Text style={[standingsPanelStyles.teamStat, {width: '40%', fontWeight: 600}]}>{teamPoints}</Text>
    
                    </>
                )

            }
            else
            {
                return (
                    <>
                        <View style={{ width: "40%", flexDirection: 'row', padding: 7,
                             justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <Text style={[standingsPanelStyles.teamText, {width: "10%", fontSize: 10}]}>{ranking + 1}</Text>
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
                        <Text style={[standingsPanelStyles.teamStat, {width: '9%', fontWeight: 600, fontFamily: fontFamilies.bold}]}>{teamPoints}</Text>
    
                    </>
                )

            }
        }
    }


    return(
        <View style={[standingsPanelStyles.container, 
        {backgroundColor: (isHeader) ? altBackgroundColour: panelBkgColour, borderBottomColor: (isHeader || isLastItem) ? 'grey': 'transparent',
         borderBottomWidth: (isHeader || isLastItem) ? 1: 0}]}>
            {standingsRender(isHeader, isPlayoffCutoff)}
        </View>
    )

}