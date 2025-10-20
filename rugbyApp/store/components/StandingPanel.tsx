import { colors } from "@/constants/tokens"
import { standingsPanelStyles } from "@/styles"
import { Image, Text, View } from "react-native"
import { getChampionsCupTeamInfoFromName } from "../ChampionsCupRugbyTeamsDatabase"
import { getInternationalTeamInfoFromName } from "../InternationalRugbyTeamsDatabase"
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase"
import { getSuperRugbyTeamInfoFromName } from "../SuperRugbyPacificRugbyTeamsDatabase"
import { getTop14TeamInfoFromName } from "../Top14RugbyTeamsDatabase"
import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase"
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

export const StandingPanel = ({ index, league, isHeader, isWorldRanking, teamPool, teamName,
    teamGP, teamWins, teamDraws, teamLosses, teamPD, teamPoints, ranking, isLastItem, isEndOfList, isPlayoffCutoff }: StandingPanelProps) => {

    let teamInfo: { type: string; displayName: string; abbreviation: string; logo: any; altLogo: any; colour: string } | null | undefined;

    if (league === "urc") {
        teamInfo = getURCTeamInfoFromName(teamName)
    }
    else if (league === "sixNations" || league === "rugbyChamp" || league === "rugbyWorldCup" || league === "worldRankings") {
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
    else {
        return
    }

    if (teamInfo === null) return
    if (teamInfo === undefined) return

    const altBackgroundColour = hexToRGB(colors.altBackground, "0.2")
    const panelBkgColour = (ranking % 2 === 0) ? (altBackgroundColour) : (colors.background);

    const standingsRender = (isHeader: boolean, isPlayoffCutoff: boolean) => {

        if (teamInfo === null) return
        if (teamInfo === undefined) return

        if (isHeader) {
            return (
                <View style={{ width: "100%", flexDirection: 'row', paddingTop: 5, paddingHorizontal: 5, borderBottomColor: 'grey', borderBottomWidth: 1, marginVertical: 2 }}>
                    <Text style={[standingsPanelStyles.teamText, { color: 'grey', fontSize: 10, textAlign: 'left' }]}>{teamPool.toUpperCase()}</Text>
                </View>
            )
        }
        else if (isPlayoffCutoff) {
            return (
                <View style={{ width: "100%", flexDirection: 'row' }}>
                    <View style={{ width: "35%", height: 10, borderBottomColor: 'grey', borderBottomWidth: 1, borderStyle: 'dashed' }} />
                    <Text style={[standingsPanelStyles.teamText, { color: 'grey', fontSize: 9, textAlign: 'center', width: "30%" }]}>KNOCKOUTS</Text>
                    <View style={{ width: "35%", height: 10, borderBottomColor: 'grey', borderBottomWidth: 1, borderStyle: 'dashed' }} />
                </View>
            )
        }
        else {

            if (isWorldRanking) {
                return (
                    <>
                        <View style={{
                            width: "60%", flexDirection: 'row', padding: 7, justifyContent: 'space-evenly',
                            alignItems: 'center', backgroundColor: panelBkgColour
                        }}>
                            <Text style={[standingsPanelStyles.teamText, { width: "15%" }]}>{ranking + 1}</Text>
                            <Image
                                style={{ resizeMode: 'contain', width: 25, height: 25, minHeight: 25, minWidth: 25 }}
                                source={teamInfo.logo} />
                            <Text style={[standingsPanelStyles.teamText, { width: "60%", paddingLeft: 5 }]}>{teamName}</Text>
                        </View>
                        <Text style={[standingsPanelStyles.teamStat, { width: '40%', fontWeight: 600 }]}>{teamPoints}</Text>

                    </>
                )

            }
            else {
                return (
                    <>
                        <Text style={[standingsPanelStyles.teamText, { width: "5%", fontSize: 9, textAlign: 'center' }]}>{ranking + 1}</Text>

                        <View style={{ width: "33%", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                            <View style={{ padding: 3, width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ resizeMode: 'contain', width: 22, height: 22, minHeight: 22, minWidth: 22, }}
                                    source={teamInfo.logo} />
                            </View>

                            <Text adjustsFontSizeToFit={true} numberOfLines={2} style={[standingsPanelStyles.teamText, { width: "70%" }]}>{teamInfo.displayName}</Text>
                        </View>

                        <Text style={[standingsPanelStyles.teamStat, { width: '10%' }]}>{teamGP}</Text>
                        <Text style={[standingsPanelStyles.teamStat, { width: '10%' }]}>{teamWins}</Text>
                        <Text style={[standingsPanelStyles.teamStat, { width: '8%' }]}>{teamDraws}</Text>
                        <Text style={[standingsPanelStyles.teamStat, { width: '10%' }]}>{teamLosses}</Text>
                        <Text style={[standingsPanelStyles.teamStat, { width: '14%' }]}>{teamPD}</Text>
                        <Text style={[standingsPanelStyles.teamStat, { width: '10%' }]}>{teamPoints}</Text>
                    </>
                )
            }
        }
    }

    return (
        <View style={[standingsPanelStyles.container,
        {
            backgroundColor: 'transparent'
        }]}>
            {standingsRender(isHeader, isPlayoffCutoff)}
        </View>
    )
}