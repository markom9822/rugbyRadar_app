import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { fixtureStyles } from "@/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo";
import { getLeagueInfoFromDisplayName, getLeagueNameFromDisplayName, hexToRGB, isLeagueInPlanetRugbyAPI, isLeagueInRugbyViz, isLeagueInWorldRugbyAPI } from "../utils/helpers";

type ScorePanelProps = {
    leagueDisplayName: string
    index: number
    homeTeam: string
    awayTeam: string
    homeScore: string
    awayScore: string
    matchDate: Date
    matchTitle: string
    matchVenue: string
    matchLeague: string
    matchID: string
    eventState: string
    stateDetail: string
    eventTime: string,
    isLastItem: boolean,
    lastRefreshTime: string,
    OnPress: (index: number, id: string) => void
}

export const ScorePanel = ({ leagueDisplayName, homeTeam, awayTeam, homeScore, awayScore, matchDate,
    index, matchTitle, matchVenue, matchLeague, matchID, eventState, stateDetail, eventTime, isLastItem, lastRefreshTime, OnPress }: ScorePanelProps) => {

    const leagueName = getLeagueNameFromDisplayName(leagueDisplayName)
    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    if (homeTeamInfo === null) return
    if (awayTeamInfo === null) return
    if (homeTeamInfo === undefined) return
    if (awayTeamInfo === undefined) return

    const homeScoreWeight = (new Number(homeScore) >= new Number(awayScore)) ? ('600') : ('300');
    const awayScoreWeight = (new Number(awayScore) >= new Number(homeScore)) ? ('600') : ('300');
    const homeFontFamily = (new Number(homeScore) >= new Number(awayScore)) ? (fontFamilies.bold) : (fontFamilies.light);
    const awayFontFamily = (new Number(awayScore) >= new Number(homeScore)) ? (fontFamilies.bold) : (fontFamilies.light);

    const matchTime = matchDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

    const scoreRender = (eventState: string) => {

        // not started yet
        if (eventState === "pre") {
            return (
                <View style={{ flexDirection: 'column', width: "100%", paddingVertical: 8 }}>
                    <Text style={{
                        color: colors.text, fontSize: fontSize.lg,
                        textAlign: 'center', fontFamily: fontFamilies.regular
                    }}>{matchTime}</Text>
                </View>
            )
        }
        // event finished
        else if (eventState === "post") {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8 }}>
                    <Text style={[fixtureStyles.teamScore,
                    { fontWeight: homeScoreWeight, color: colors.text, fontFamily: homeFontFamily, width: "35%", textAlign: 'center' }]}>{homeScore}</Text>

                    <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: fontSize.base, width: "30%" }}>FT</Text>

                    <Text style={[fixtureStyles.teamScore,
                    { fontWeight: awayScoreWeight, color: colors.text, fontFamily: awayFontFamily, width: "35%", textAlign: 'center' }]}>{awayScore}</Text>
                </View>
            )
        }
        // event at halftime
        else if (eventState === "halfTime") {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8 }}>
                    <Text style={[fixtureStyles.teamScore,
                    { fontWeight: homeScoreWeight, color: colors.text, fontFamily: homeFontFamily, width: "30%", textAlign: 'center' }]}>{homeScore}</Text>

                    <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: fontSize.base, width: "40%" }}>HT</Text>

                    <Text style={[fixtureStyles.teamScore,
                    { fontWeight: awayScoreWeight, color: colors.text, fontFamily: awayFontFamily, width: "30%", textAlign: 'center' }]}>{awayScore}</Text>
                </View>
            )
        }
        // event ongoing
        else {
            return (
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8 }}>
                        <Text style={[fixtureStyles.teamScore,
                        { fontWeight: homeScoreWeight, color: colors.text, fontFamily: homeFontFamily, width: "35%", textAlign: 'center' }]}>{homeScore}</Text>

                        <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: 16, width: "30%" }}>{eventTime}'</Text>

                        <Text style={[fixtureStyles.teamScore,
                        { fontWeight: awayScoreWeight, color: colors.text, fontFamily: awayFontFamily, width: "35%", textAlign: 'center' }]}>{awayScore}</Text>
                    </View>
                </View>
            )
        }
    }

    const lastRefreshHeader = (time: string) => {

        if (isLastItem) {
            return (
                <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'grey', fontSize: fontSize.xs, fontFamily: fontFamilies.light }}>Last Refresh: {time}</Text>
                </View>
            )
        }

        return null
    }

    var linkID: string
    if (isLeagueInRugbyViz(leagueDisplayName)) {
        linkID = matchID + leagueName + "_RugbyViz"
    }
    else if (isLeagueInWorldRugbyAPI(leagueDisplayName)) {
        linkID = matchID + "_" + leagueName + "_WorldRugbyAPI"
    }
    else if (isLeagueInPlanetRugbyAPI(leagueDisplayName)) {
        linkID = matchID + "_" + leagueName + "_PlanetRugbyAPI"
    }
    else {
        linkID = matchID;
    }

    var homeAbbreviation = homeTeamInfo.abbreviation;
    var awayAbbreviation = awayTeamInfo.abbreviation;

    if (homeTeam.includes("U20")) {
        homeAbbreviation += " U20"
    }
    if (awayTeam.includes("U20")) {
        awayAbbreviation += " U20"
    }

    const homeGradientColour = hexToRGB(homeTeamInfo.colour, '0.7');
    const awayGradientColour = hexToRGB(awayTeamInfo.colour, '0.7');
    const matchLeagueLogo = getLeagueInfoFromDisplayName(matchLeague)?.leagueAltLogo

    const handlePressedScorePanel = () => {

        OnPress(index, linkID)
    }

    return (
        <View style={[fixtureStyles.card, { marginBottom: (isLastItem) ? 60 : 3 }]}>

            <LinearGradient colors={[homeGradientColour, 'rgba(25, 26, 27, 0.9)', awayGradientColour]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                locations={[0, 0.4, 1]}
                style={[fixtureStyles.cardHeaderAllInfo, { borderColor: 'grey', borderWidth: 0.5, borderRadius: 12, padding: 3 }]}>

                <TouchableOpacity activeOpacity={0.5} onPress={handlePressedScorePanel}>

                    <View style={[fixtureStyles.cardHeaderGameInfo]}>

                        <View style={{ width: "20%", flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <View style={{ paddingVertical: 2 }}>
                                <Image
                                    style={[fixtureStyles.teamLogo]}
                                    source={homeTeamInfo.logo} />
                            </View>
                            <Text style={[fixtureStyles.teamName, { color: 'lightgrey', fontFamily: fontFamilies.bold, textAlign: 'center' }]}>{homeAbbreviation}</Text>

                        </View>

                        <View style={{ width: "60%", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <ImageBackground resizeMode='contain' imageStyle={{ opacity: 0.08 }}
                                style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: "100%" }} source={matchLeagueLogo} >

                                <Text style={{ textAlign: 'center', fontSize: fontSize.xs, color: 'lightgrey', fontFamily: fontFamilies.light, paddingVertical: 2, width: "100%" }}>{matchLeague}</Text>

                                {scoreRender(eventState)}

                                <Text style={{ textAlign: 'center', fontSize: fontSize.xs, color: 'lightgrey', fontFamily: fontFamilies.light, paddingVertical: 2, width: "100%" }}>{matchVenue}</Text>
                            </ImageBackground>
                        </View>

                        <View style={{ width: "20%", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ paddingVertical: 2 }}>
                                <Image
                                    style={[fixtureStyles.teamLogo]}
                                    source={awayTeamInfo.logo} />
                            </View>
                            <Text style={[fixtureStyles.teamName, { color: 'lightgrey', fontFamily: fontFamilies.bold, textAlign: 'center' }]}>{awayAbbreviation}</Text>
                        </View>

                    </View>

                </TouchableOpacity>

            </LinearGradient>
            {lastRefreshHeader(lastRefreshTime)}
        </View>
    )

}