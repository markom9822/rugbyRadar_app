import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { LinearGradient } from "expo-linear-gradient"
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { getHomeAwayTeamInfo, getTeamInfo } from "../utils/getTeamInfo"
import { hexToRGB } from "../utils/helpers"

export type TeamEventStatsInfo = {
    currentTeam: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: string,
    awayTeamScore: string,
    matchDate: string,
}

export type TeamEventPanelProps = {
    teamEventArray: TeamEventStatsInfo[] | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
    panelTitle: string,
    showWinLoss: boolean,
    isLastItem: boolean,
    teamName: string | undefined,
}

export type HeadToHeadTeamEventPanelProps = {
    teamEventArray: TeamEventStatsInfo[] | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
    panelTitle: string,
    showWinLoss: boolean,
    isLastItem: boolean,
    teamName1: string | undefined,
    teamName2: string | undefined,
}

export const TeamEventsPanel = ({ teamEventArray, matchID, leagueName, panelTitle, showWinLoss, isLastItem, teamName }: TeamEventPanelProps) => {

    if (teamEventArray === undefined) return

    const notFoundHeader = (eventsArray: TeamEventStatsInfo[]) => {

        if (eventsArray == undefined || eventsArray.length == 0) {
            return (
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: fontSize.xs, color: 'lightgrey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Events Found</Text>
                </View>
            )
        }

        return null
    }

    if (teamName === undefined) return;


    const teamInfo = getTeamInfo(leagueName, teamName);
    if (teamInfo === null) return;

    const teamBackgroundColour = hexToRGB(teamInfo.teamInfo.colour, "0.5")

    const panelColour = hexToRGB("#4d4b4b", '0.5')

    return (
        <View style={[teamEventsPanelStyles.container, { width: "100%" }]}>


            <View style={{
                justifyContent: 'center', alignItems: 'center', backgroundColor: teamBackgroundColour, width: "100%",
                borderTopLeftRadius: 8, borderTopRightRadius: 8, height: "13%"
            }}>
                <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: "70%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={{ color: colors.text, textAlign: 'center', fontFamily: fontFamilies.bold, paddingHorizontal: 5 }}>{panelTitle.toUpperCase()}</Text>
                    </View>

                    <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground resizeMode="cover" source={teamInfo.teamInfo.altLogo} imageStyle={{ opacity: 0.5 }} style={{ justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                            <Text style={{ height: "100%" }}></Text>
                        </ImageBackground>
                    </View>

                </View>
            </View>

            {notFoundHeader(teamEventArray)}

            <>
                {teamEventArray.map((match, index) => {
                    return (
                        <TeamEventsItem
                            key={index}
                            leagueName={leagueName}
                            currentTeam={match.currentTeam}
                            homeTeam={match.homeTeamName}
                            awayTeam={match.awayTeamName}
                            homeTeamScore={match.homeTeamScore}
                            awayTeamScore={match.awayTeamScore}
                            matchDate={match.matchDate}
                            showWinLoss={showWinLoss}
                        />
                    );
                })}
            </>

        </View>
    )
}

export const HeadToHeadEventsPanel = ({ teamEventArray, matchID, leagueName, panelTitle, showWinLoss, isLastItem, teamName1, teamName2 }: HeadToHeadTeamEventPanelProps) => {

    if (teamEventArray === undefined) return

    const notFoundHeader = (eventsArray: TeamEventStatsInfo[]) => {

        if (eventsArray == undefined || eventsArray.length == 0) {
            return (
                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: fontSize.xs, color: 'lightgrey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Events Found</Text>
                </View>
            )
        }

        return null
    }

    if (teamName1 === undefined || teamName2 === undefined) return;

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, teamName1, teamName2);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    if (homeTeamInfo === undefined || awayTeamInfo === undefined) return;

    const teamBackgroundColour1 = hexToRGB(homeTeamInfo.colour, "0.5")
    const teamBackgroundColour2 = hexToRGB(awayTeamInfo.colour, "0.5")

    const panelColour = hexToRGB("#4d4b4b", '0.5')

    return (
        <View style={[teamEventsPanelStyles.container, { marginHorizontal: 5 }]}>

            <View style={{ backgroundColor: panelColour, margin: 4, borderRadius: 5 }}>

                <LinearGradient colors={[teamBackgroundColour1, teamBackgroundColour2]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} locations={[0.4, 0.6]}
                    style={{
                        flexDirection: 'row', backgroundColor: 'transparent',
                        alignItems: 'center', borderTopLeftRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignContent: 'center',
                    }}>

                    <View style={{ width: "25%", justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground resizeMode="cover" source={homeTeamInfo.altLogo} imageStyle={{ opacity: 0.5 }} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.text, fontFamily: fontFamilies.bold, marginHorizontal: 4, padding: 4, opacity: 0 }}>TEAM</Text>

                        </ImageBackground>
                    </View>

                    <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.bold, marginHorizontal: 4, paddingHorizontal: 4 }}>HEAD TO HEAD</Text>
                    </View>

                    <View style={{ width: "25%", justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground resizeMode="cover" source={awayTeamInfo.altLogo} imageStyle={{ opacity: 0.5 }} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: colors.text, fontFamily: fontFamilies.bold, marginHorizontal: 4, padding: 4, opacity: 0 }}>TEAM</Text>

                        </ImageBackground>
                    </View>

                </LinearGradient>
                {notFoundHeader(teamEventArray)}

                {teamEventArray.map((match, index) => {
                    return (
                        <TeamEventsItem
                            key={index}
                            leagueName={leagueName}
                            currentTeam={match.currentTeam}
                            homeTeam={match.homeTeamName}
                            awayTeam={match.awayTeamName}
                            homeTeamScore={match.homeTeamScore}
                            awayTeamScore={match.awayTeamScore}
                            matchDate={match.matchDate}
                            showWinLoss={showWinLoss}
                        />
                    );
                })}

            </View>
        </View>
    )
}


type TeamEventsItemProps = {
    leagueName: string | undefined,
    currentTeam: string,
    homeTeam: string,
    awayTeam: string,
    homeTeamScore: string,
    awayTeamScore: string,
    matchDate: string,
    showWinLoss: boolean,
}

export const TeamEventsItem = ({ leagueName, currentTeam, homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchDate, showWinLoss, }: TeamEventsItemProps) => {

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    const formattedDate = new Date(matchDate).toLocaleDateString('en-GB')
    const homeWinner = new Number(homeTeamScore) > new Number(awayTeamScore);
    const homeCurrentTeam = currentTeam === homeTeam;

    var winOrLoseText = '';

    if (homeCurrentTeam) {
        winOrLoseText = (homeWinner) ? ('W') : ('L');
    }
    else {
        winOrLoseText = (!homeWinner) ? ('W') : ('L');
    }

    const winLossColour = (winOrLoseText === 'W') ? ("#42c765") : ("#d94a4a");

    if (homeTeamInfo == undefined) return
    if (awayTeamInfo == undefined) return

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 3 }}>

            {(showWinLoss) &&
                <View style={{ flexDirection: 'row', width: "5%", justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: winLossColour, paddingHorizontal: 1, fontSize: 10, fontWeight: 600, fontFamily: fontFamilies.regular }}>{winOrLoseText}</Text>
                </View>
            }


            <View style={{ flexDirection: 'row', width: "20%", justifyContent: 'flex-start' }}>
                <Image
                    style={[teamEventsPanelStyles.teamLogo]}
                    source={homeTeamInfo.altLogo} />
                <Text style={[teamEventsPanelStyles.teamName]}>{homeTeamInfo?.abbreviation}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: "27%", justifyContent: 'center' }}>
                <Text style={[teamEventsPanelStyles.matchScore]}>{homeTeamScore} - {awayTeamScore}</Text>
            </View>

            <View style={{ flexDirection: 'row', width: "20%", justifyContent: 'flex-end' }}>
                <Text style={[teamEventsPanelStyles.teamName]}>{awayTeamInfo?.abbreviation}</Text>
                <Image
                    style={[teamEventsPanelStyles.teamLogo]}
                    source={awayTeamInfo.altLogo} />
            </View>

            <View style={{ flexDirection: 'row', width: "28%", justifyContent: 'center' }}>
                <Text style={[teamEventsPanelStyles.matchDate]}>{formattedDate}</Text>
            </View>
        </View>
    )
}

export const teamEventsPanelStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    teamLogo: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        minHeight: 25,
        minWidth: 25,
    },
    matchScore: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        color: colors.text,
        fontFamily: fontFamilies.regular
    },
    matchDate: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontSize: fontSize.xs,
        color: colors.text,
        fontFamily: fontFamilies.light
    },
    teamName: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 10,
        color: colors.text,
        fontFamily: fontFamilies.regular
    },
    teamInfoContainer: {
        width: "20%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsLink: {
        fontWeight: 600,
        color: 'blue'
    }
})