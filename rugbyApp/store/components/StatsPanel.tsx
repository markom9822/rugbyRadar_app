import { colors, fontFamilies } from "@/constants/tokens"
import { StyleSheet, Text, View } from "react-native"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo"
import { hexToRGB } from "../utils/helpers"

export type StatsInfo = {
    statsAvailable: boolean,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamPossession: string,
    awayTeamPossession: string,
    homeTeamTerritory: string,
    awayTeamTerritory: string,
    homeTeamTries: string,
    awayTeamTries: string,
    homeTeamConversions: string,
    awayTeamConversions: string,
    homeTeamPenalties: string,
    awayTeamPenalties: string,

    homeTeamTackles: string,
    awayTeamTackles: string,
    homeTeamMissedTackles: string,
    awayTeamMissedTackles: string,

    homeTeamMetres: string,
    awayTeamMetres: string,
    homeTeamPasses: string,
    awayTeamPasses: string,
    homeTeamDefendersBeaten: string,
    awayTeamDefendersBeaten: string,

    homeTeamScrumsWon: string,
    awayTeamScrumsWon: string,
    homeTeamScrumsTotal: string,
    awayTeamScrumsTotal: string,
    homeTeamLineoutsWon: string,
    awayTeamLineoutsWon: string,
    homeTeamLineoutsTotal: string,
    awayTeamLineoutsTotal: string,

    homeTeamPensConceded: string,
    awayTeamPensConceded: string,
    homeTeamYellowCards: string,
    awayTeamYellowCards: string,
    homeTeamRedCards: string,
    awayTeamRedCards: string,

}

type StatsPanelProps = {
    matchInfoArray: StatsInfo[] | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
}

export const StatsPanel = ({ matchInfoArray, matchID, leagueName }: StatsPanelProps) => {

    if (matchInfoArray === undefined) return

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, matchInfoArray[0].homeTeamName, matchInfoArray[0].awayTeamName);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    const homePossessionPercent = (Math.round(parseFloat(matchInfoArray[0].homeTeamPossession) * 100)).toString() + ' %';
    const awayPossessionPercent = (Math.round(parseFloat(matchInfoArray[0].awayTeamPossession) * 100)).toString() + ' %';

    const homeTerritoryPercent = (Math.round(parseFloat(matchInfoArray[0].homeTeamTerritory) * 100)).toString() + ' %';
    const awayTerritoryPercent = (Math.round(parseFloat(matchInfoArray[0].awayTeamTerritory) * 100)).toString() + ' %';


    const statsPanelRender = (statsAvailable: boolean) => {

        if (!statsAvailable) {
            return (
                <View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, textAlign: 'center', marginVertical: 10 }}>Stats Not Available</Text>
                </View>
            )
        }
        else {
            return (
                <>
                    <GameStatsTitlePanel
                        statTitle="Match Events" />

                    <GamePercentageStatsPanel
                        homePercent={homePossessionPercent}
                        awayPercent={awayPossessionPercent}
                        statTitle="Possession"
                        homeColour={homeTeamInfo?.colour}
                        awayColour={awayTeamInfo?.colour} />

                    <GamePercentageStatsPanel
                        homePercent={homeTerritoryPercent}
                        awayPercent={awayTerritoryPercent}
                        statTitle="Territory"
                        homeColour={homeTeamInfo?.colour}
                        awayColour={awayTeamInfo?.colour} />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamTries}
                        awayStat={matchInfoArray[0].awayTeamTries}
                        statTitle="Tries" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamConversions}
                        awayStat={matchInfoArray[0].awayTeamConversions}
                        statTitle="Conversion Goals" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamPenalties}
                        awayStat={matchInfoArray[0].awayTeamPenalties}
                        statTitle="Penalty Goals" />

                    <GameStatsTitlePanel
                        statTitle="Defence" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamTackles}
                        awayStat={matchInfoArray[0].awayTeamTackles}
                        statTitle="Tackles" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamMissedTackles}
                        awayStat={matchInfoArray[0].awayTeamMissedTackles}
                        statTitle="Missed Tackles" />

                    <GameStatsTitlePanel
                        statTitle="Attack" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamMetres}
                        awayStat={matchInfoArray[0].awayTeamMetres}
                        statTitle="Metres Run" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamPasses}
                        awayStat={matchInfoArray[0].awayTeamPasses}
                        statTitle="Passes" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamDefendersBeaten}
                        awayStat={matchInfoArray[0].awayTeamDefendersBeaten}
                        statTitle="Defenders Beaten" />

                    <GameStatsTitlePanel
                        statTitle="Set Piece" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamScrumsWon + '/' + matchInfoArray[0].homeTeamScrumsTotal}
                        awayStat={matchInfoArray[0].awayTeamScrumsWon + '/' + matchInfoArray[0].awayTeamScrumsTotal}
                        statTitle="Scrums Won" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamLineoutsWon + '/' + matchInfoArray[0].homeTeamLineoutsTotal}
                        awayStat={matchInfoArray[0].awayTeamLineoutsWon + '/' + matchInfoArray[0].awayTeamLineoutsTotal}
                        statTitle="Lineouts Won" />

                    <GameStatsTitlePanel
                        statTitle="Discipline" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamPensConceded}
                        awayStat={matchInfoArray[0].awayTeamPensConceded}
                        statTitle="Pen's Conceded" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamYellowCards}
                        awayStat={matchInfoArray[0].awayTeamYellowCards}
                        statTitle="Yellow Cards" />

                    <GameStatsPanel
                        homeStat={matchInfoArray[0].homeTeamRedCards}
                        awayStat={matchInfoArray[0].awayTeamRedCards}
                        statTitle="Red Cards" />
                </>
            )
        }
    }

    let homeAbbreviation = homeTeamInfo?.abbreviation;
    let awayAbbreviation = awayTeamInfo?.abbreviation;

    if (matchInfoArray[0].homeTeamName.includes("U20")) {
        homeAbbreviation += " U20"
    }
    if (matchInfoArray[0].awayTeamName.includes("U20")) {
        awayAbbreviation += " U20"
    }

    const panelColour = hexToRGB("#4d4b4b", '0.5')

    return (
        <View style={[statsPanelStyles.container, {marginBottom: 20 }]}>
            <View style={{ backgroundColor: matchInfoArray[0].statsAvailable ? panelColour : 'transparent', padding: 10, borderRadius: 8, width: "95%" }}>
                {statsPanelRender(matchInfoArray[0].statsAvailable)}
            </View>
        </View>
    )
}

type GameStatsPanelProps = {
    homeStat: string,
    statTitle: string,
    awayStat: string,
}

export const GameStatsPanel = ({ homeStat, statTitle, awayStat }: GameStatsPanelProps) => {

    const homeStatFontFamily = (Number(homeStat) > Number(awayStat)) ? fontFamilies.bold : fontFamilies.light;
    const awayStatFontFamily = (Number(awayStat) > Number(homeStat)) ? fontFamilies.bold : fontFamilies.light;

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={[statsPanelStyles.statsPanelRow, { width: "20%", fontFamily: homeStatFontFamily }]}>{homeStat}</Text>
                <Text style={[statsPanelStyles.statsPanelRow, { width: "50%" }]}>{statTitle}</Text>
                <Text style={[statsPanelStyles.statsPanelRow, { width: "20%", fontFamily: awayStatFontFamily }]}>{awayStat}</Text>
            </View>
        </View>
    )
}

type GamePercentageStatsPanelProps = {
    homePercent: string,
    statTitle: string,
    awayPercent: string,
    homeColour: string | undefined,
    awayColour: string | undefined,
}

export const GamePercentageStatsPanel = ({ homePercent, statTitle, awayPercent, homeColour, awayColour }: GamePercentageStatsPanelProps) => {

    const homePercentNum = Number(homePercent.replace("%", ""));
    const awayPercentNum = Number(awayPercent.replace("%", ""));

    const homeStatFontFamily = (Number(homePercentNum) > Number(awayPercentNum)) ? fontFamilies.bold : fontFamilies.light;
    const awayStatFontFamily = (Number(awayPercentNum) > Number(homePercentNum)) ? fontFamilies.bold : fontFamilies.light;

    return (
        <View style={{ alignItems: 'center', flexDirection: 'column', marginVertical: 5 }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={[statsPanelStyles.statsPanelRow, { width: "20%", fontFamily: homeStatFontFamily }]}>{homePercent}</Text>
                <Text style={[statsPanelStyles.statsPanelRow, { width: "50%" }]}>{statTitle}</Text>
                <Text style={[statsPanelStyles.statsPanelRow, { width: "20%", fontFamily: awayStatFontFamily }]}>{awayPercent}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                <View style={{ width: `${homePercentNum}%`, height: 10, backgroundColor: homeColour, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}>
                    <Text></Text>
                </View>
                <View style={{ width: `${awayPercentNum}%`, height: 10, backgroundColor: awayColour, borderTopRightRadius: 5, borderBottomRightRadius: 5 }}>
                    <Text></Text>
                </View>
            </View>
        </View>
    )
}


type GameStatsTitleProps = {
    statTitle: string,
}

export const GameStatsTitlePanel = ({ statTitle }: GameStatsTitleProps) => {

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={[statsPanelStyles.statsTitle]}>{statTitle}</Text>
            </View>
        </View>
    )
}

export const statsPanelStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    teamLogo: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        minHeight: 30,
        minWidth: 30,
    },
    statsPanelRow: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        color: colors.text,
        fontFamily: fontFamilies.regular
    },
    statsTitle: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginTop: 2,
        textAlign: 'center',
        fontWeight: 500,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        width: "90%",
        color: 'grey',
        fontFamily: fontFamilies.title,
        fontSize: 14
    },
    teamName: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 18,
        color: colors.text,
        fontFamily: fontFamilies.bold
    },
    teamInfoContainer: {
        width: "30%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsLink: {
        fontWeight: 600,
        color: 'blue'
    }
})