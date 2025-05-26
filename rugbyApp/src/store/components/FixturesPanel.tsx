import { MatchInfo } from "@/app/(tabs)/(fixtures)"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import Entypo from '@expo/vector-icons/Entypo'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet"
import { LinearGradient } from "expo-linear-gradient"
import { useCallback, useEffect, useRef, useState } from "react"
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { getMatchInfoWorldRugbyAPI } from "../utils/getMatchInfo"
import { getTeamFormStatsPlanetRugbyAPI, getTeamFormStatsRugbyViz } from "../utils/getTeamFormStats"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo"
import { getLeagueInfoFromDisplayName, getLeagueNameFromDisplayName, getPlanetRugbyMatchIDFromDetails, hexToRGB } from "../utils/helpers"
import { FixtureLineups } from "./FixtureLineups"
import { FixtureOverview } from "./FixtureOverview"
import { FixtureStats } from "./FixtureStats"
import { FixtureEvents } from "./FixturesEvents"
import { MultiTabBar } from "./MultiTabBar"
import { TeamEventsPanel, TeamEventStatsInfo } from "./TeamEventsPanel"

type FixturesPanelProps = {
    matchInfo: MatchInfo,
    id: string,
    bottomSheetRef: React.RefObject<BottomSheetModal>
}

export const FixturesPanel = ({ matchInfo, id, bottomSheetRef }: FixturesPanelProps) => {

    const [mainTeamFormStatsArray, setMainTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [opponentTeamFormStatsArray, setOpponentTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [currentTeamFormArray, setCurrentTeamFormArray] = useState<TeamEventStatsInfo[]>();

    const leagueName = getLeagueNameFromDisplayName(matchInfo.matchLeague)
    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, matchInfo.homeTeam, matchInfo.awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    if (homeTeamInfo === null) return
    if (awayTeamInfo === null) return
    if (homeTeamInfo === undefined) return
    if (awayTeamInfo === undefined) return

    var homeAbbreviation = homeTeamInfo.abbreviation;
    var awayAbbreviation = awayTeamInfo.abbreviation;

    const homeFontFamily = (new Number(matchInfo.homeScore) >= new Number(matchInfo.awayScore)) ? (fontFamilies.bold) : (fontFamilies.light);
    const awayFontFamily = (new Number(matchInfo.awayScore) >= new Number(matchInfo.homeScore)) ? (fontFamilies.bold) : (fontFamilies.light);

    const matchTime = matchInfo.matchDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

    if (matchInfo.homeTeam.includes("U20")) {
        homeAbbreviation += " U20"
    }
    if (matchInfo.awayTeam.includes("U20")) {
        awayAbbreviation += " U20"
    }


    const homeGradientColour = hexToRGB(homeTeamInfo.colour, '0.5');
    const awayGradientColour = hexToRGB(awayTeamInfo.colour, '0.5');

    const matchLeagueLogo = getLeagueInfoFromDisplayName(matchInfo.matchLeague)?.leagueAltLogo

    const panelColour = hexToRGB("#4d4b4b", '0.4')

    const handleCloseBottomSheet = () => {

        bottomSheetRef.current?.close();
    }

    const eventID = new String(id).substring(0, 6);
    const leagueID = new String(id).slice(6)

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch Data")

        // handle differently - separate API
        if (leagueID.indexOf("_RugbyViz") !== -1) {
            const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/' + eventID + '?provider=rugbyviz';
            console.info(apiString)

            const matchDetails = await fetch(apiString,).then((res) => res.json())

            const mainTeamFormStats = await getTeamFormStatsRugbyViz(matchDetails, true)
            const opponentTeamFormStats = await getTeamFormStatsRugbyViz(matchDetails, false)

            setMainTeamFormStatsArray(mainTeamFormStats)
            setOpponentTeamFormStatsArray(opponentTeamFormStats)
            return;
        }

        // use world rugby API
        if (id.indexOf("_WorldRugbyAPI") !== -1) {
            const separatedArray = id.toString().split("_");
            const worldRugbyAPIEventID = separatedArray[0];
            const worldRugbyAPILeagueName = separatedArray[1]

            const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/' + worldRugbyAPIEventID + '/stats?language=en';
            console.info(apiString)
            const matchDetails = await fetch(apiString,).then((res) => res.json())
            const matchInfo = await getMatchInfoWorldRugbyAPI(matchDetails)
            const matchDate = new Date(matchInfo[0].matchDate)
            const homeTeamName = matchInfo[0].homeTeamName
            const awayTeamName = matchInfo[0].awayTeamName

            // use planet rugby for head to head stats
            const planetRugbyMatchID = await getPlanetRugbyMatchIDFromDetails(matchDate, homeTeamName, awayTeamName);
            const apiPlanetRugbyString = 'https://rugbylivecenter.yormedia.com/api/match-h2h/' + planetRugbyMatchID;
            const matchPlanetRugbyStats = await fetch(apiPlanetRugbyString,).then((res) => res.json())

            const mainTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchPlanetRugbyStats, true)
            const opponentTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchPlanetRugbyStats, false)

            setMainTeamFormStatsArray(mainTeamFormStats)
            setOpponentTeamFormStatsArray(opponentTeamFormStats)
            return;
        }

        // use world rugby API
        if (id.indexOf("_PlanetRugbyAPI") !== -1) {
            const separatedArray = id.toString().split("_");
            const planetRugbyAPIEventID = separatedArray[0];
            const planetRugbyAPILeagueName = separatedArray[1]

            const apiH2HString = 'https://rugbylivecenter.yormedia.com/api/match-h2h/' + planetRugbyAPIEventID;

            const matchH2HStats = await fetch(apiH2HString,).then((res) => res.json())

            const mainTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchH2HStats, true)
            const opponentTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchH2HStats, false)

            setMainTeamFormStatsArray(mainTeamFormStats)
            setOpponentTeamFormStatsArray(opponentTeamFormStats)

            return;
        }
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await handlePressFetchData()
        }
        fetchMyAPI()
    }, [])


    const teamFormDisplay = (eventsArray: TeamEventStatsInfo[] | undefined) => {

        if (eventsArray == undefined || eventsArray.length == 0) {
            return null
        }

        const teamForm = []

        for (let index = 0; index < eventsArray.length; index++) {

            const homeWinner = new Number(eventsArray[index].homeTeamScore) > new Number(eventsArray[index].awayTeamScore);
            const homeCurrentTeam = eventsArray[index].currentTeam === eventsArray[index].homeTeamName;

            var winOrLoseText = '';

            if (homeCurrentTeam) {
                winOrLoseText = (homeWinner) ? ('W') : ('L');
            }
            else {
                winOrLoseText = (!homeWinner) ? ('W') : ('L');
            }
            teamForm.push(winOrLoseText)
        }

        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 8 }}>
                {teamForm.map((item, index) => (
                    <View key={index} style={{ paddingHorizontal: 0.5 }}>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.light, fontSize: fontSize.xs, textAlign: 'center' }}>{item}</Text>
                    </View>
                ))}
            </View>
        )
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const snapPoints = ["40%"];

    // renders
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const handleOpenedTeamFormPanel = (teamFormArray: TeamEventStatsInfo[] | undefined) => {

        setCurrentTeamFormArray(teamFormArray)
        bottomSheetModalRef.current?.present()
    }

    const teamFormPanelColour = hexToRGB("#4d4b4b", '0.9')


    return (<GestureHandlerRootView>

        <BottomSheetModalProvider>

            <LinearGradient colors={[homeGradientColour, awayGradientColour]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
                style={[{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 12 }]}>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: "100%" }}>
                    <TouchableOpacity activeOpacity={0.5} style={{ marginHorizontal: 15, marginVertical: 5 }} onPress={handleCloseBottomSheet}>
                        <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Entypo name="chevron-thin-down" size={20} color="lightgrey" />
                        </View>
                    </TouchableOpacity>
                </View>

                <ImageBackground resizeMode='contain' imageStyle={{ opacity: 0.06 }}
                    style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} source={matchLeagueLogo} >

                    <View style={{ paddingVertical: 4 }}>
                        <Text style={[{ color: 'lightgrey', fontFamily: fontFamilies.light, textAlign: 'center', fontSize: fontSize.xs }]}>{matchInfo.matchLeague}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: "25%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ paddingVertical: 5 }}>
                                <Image
                                    style={[fixturesPanelStyles.teamLogo]}
                                    source={homeTeamInfo.logo} />
                            </View>

                            <Text style={[{ color: colors.text, fontFamily: fontFamilies.bold, textAlign: 'center' }]}>{homeAbbreviation}</Text>

                            <TouchableOpacity onPress={() => handleOpenedTeamFormPanel(mainTeamFormStatsArray)} activeOpacity={0.7} style={{ backgroundColor: panelColour, borderRadius: 5, marginVertical: 5, padding: 3, width: "85%" }}>
                                <Text style={{ color: 'lightgrey', fontSize: 5, textAlign: 'center' }}>{teamFormDisplay(mainTeamFormStatsArray)}</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ width: "50%", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                            {scoreRender(matchInfo.eventState, matchTime, matchInfo, homeFontFamily, awayFontFamily)}

                        </View>

                        <View style={{ width: "25%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ paddingVertical: 5 }}>
                                <Image
                                    style={[fixturesPanelStyles.teamLogo]}
                                    source={awayTeamInfo.logo} />
                            </View>
                            <Text style={[{ color: colors.text, fontFamily: fontFamilies.bold, textAlign: 'center' }]}>{awayAbbreviation}</Text>

                            <TouchableOpacity onPress={() => handleOpenedTeamFormPanel(opponentTeamFormStatsArray)} activeOpacity={0.7} style={{ backgroundColor: panelColour, borderRadius: 5, marginVertical: 5, padding: 3, width: "85%" }}>
                                <Text style={{ color: 'lightgrey', fontSize: fontSize.xs, textAlign: 'center' }}>{teamFormDisplay(opponentTeamFormStatsArray)}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ paddingVertical: 4 }}>
                        <Text style={[{ color: 'lightgrey', fontFamily: fontFamilies.light, textAlign: 'center', fontSize: fontSize.xs }]}>{matchInfo.matchVenue}</Text>
                    </View>

                </ImageBackground>

                <FixtureInfoPanel id={id} />

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    enableDynamicSizing={false}
                    handleComponent={null}
                    handleStyle={null}

                    backgroundStyle={{ backgroundColor: 'transparent' }}
                >
                    <BottomSheetView style={{
                        flex: 1, backgroundColor: teamFormPanelColour, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10
                    }}>

                        {currentTeamFormArray != undefined && (

                            <TeamEventsPanel
                                teamEventArray={currentTeamFormArray}
                                matchID={id}
                                leagueName={leagueName}
                                panelTitle={`${currentTeamFormArray[0].currentTeam} Form`}
                                showWinLoss={true}
                                isLastItem={false}
                                teamName={currentTeamFormArray[0].currentTeam}
                            />
                        )}

                    </BottomSheetView>
                </BottomSheetModal>

            </LinearGradient>
        </BottomSheetModalProvider>
    </GestureHandlerRootView>
    )
}

type FixturesInfoPanel = {
    id: string,
}

export const FixtureInfoPanel = ({ id }: FixturesInfoPanel) => {

    const [currentTab, setCurrentTab] = useState<string>('Overview');

    console.info(currentTab)

    return (
        <LinearGradient colors={['#0d0c0c', 'transparent']} start={{ x: 0.5, y: 0.9 }} end={{ x: 0.5, y: 0 }}
            style={[{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }]}>

            <View style={{ marginVertical: 4 }}>
                <MultiTabBar tabsArray={["Overview", "Stats", "Events", "Lineups"]} OnTabButtonPressed={setCurrentTab} currentTabKey={currentTab} tabFontSize={14} />
            </View>

            <View style={{ width: "100%" }}>
                <FixturesInfoBox id={id} currentTabKey={currentTab} />
            </View>

        </LinearGradient>
    )
}

type FixturesInfoBox = {
    id: string,
    currentTabKey: string
}

export const FixturesInfoBox = ({ id, currentTabKey }: FixturesInfoBox) => {

    return (
        <View>
            <FixtureOverview id={id} isShown={currentTabKey == "Overview"} />
            <FixtureStats id={id} isShown={currentTabKey == "Stats"} />
            <FixtureEvents id={id} isShown={currentTabKey == "Events"} />
            <FixtureLineups id={id} isShown={currentTabKey == "Lineups"} />
        </View>
    )
}

type FixturesInfoTabBar = {
    OnTabButtonPressed: (key: string) => void,
    currentTabKey: string,
}


export const FixturesInfoTabBar = ({ OnTabButtonPressed, currentTabKey }: FixturesInfoTabBar) => {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 8, marginTop: 20 }}>
            <FixturesInfoTabButton title="Overview" OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == "Overview"} />
            <FixturesInfoTabButton title="Stats" OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == "Stats"} />
            <FixturesInfoTabButton title="Events" OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == "Events"} />
            <FixturesInfoTabButton title="Lineups" OnPressTab={OnTabButtonPressed} isTabSelected={currentTabKey == "Lineups"} />
        </View>
    )
}

type FixturesInfoTabButton = {
    title: string,
    isTabSelected: boolean,
    OnPressTab: (key: string) => void
}


export const FixturesInfoTabButton = ({ title, isTabSelected, OnPressTab }: FixturesInfoTabButton) => {

    return (
        <TouchableOpacity style={{ margin: 4, width: "22%" }} activeOpacity={0.8} onPress={() => OnPressTab(title)}>
            <Text style={{
                color: isTabSelected ? colors.text : 'grey', borderBottomColor: colors.text, borderBottomWidth: isTabSelected ? 2 : 0,
                fontFamily: isTabSelected ? fontFamilies.bold : fontFamilies.regular, textAlign: 'center', fontSize: 15, paddingVertical: 2
            }}>{title}</Text>
        </TouchableOpacity>
    )
}

export const scoreRender = (eventState: string, matchTime: string, matchInfo: MatchInfo, homeFontFamily: string, awayFontFamily: string) => {

    // not started yet
    if (eventState === "pre") {
        return (
            <View style={{ flexDirection: 'column', width: "100%", paddingVertical: 8 }}>
                <Text style={{
                    color: colors.text, fontSize: 26,
                    textAlign: 'center', fontFamily: fontFamilies.regular
                }}>{matchTime}</Text>
            </View>
        )
    }
    // event finished
    else if (eventState === "post") {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8 }}>
                <Text style={[
                    { fontSize: 28, color: colors.text, fontFamily: homeFontFamily, width: "25%", textAlign: 'center' }]}>{matchInfo.homeScore}</Text>

                <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: fontSize.base, width: "50%" }}>FT</Text>

                <Text style={[
                    { fontSize: 28, color: colors.text, fontFamily: awayFontFamily, width: "25%", textAlign: 'center' }]}>{matchInfo.awayScore}</Text>
            </View>
        )
    }
    // event at halftime
    else if (eventState === "halfTime") {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8 }}>
                <Text style={[
                    { fontSize: 28, color: colors.text, fontFamily: homeFontFamily, width: "25%", textAlign: 'center' }]}>{matchInfo.homeScore}</Text>

                <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: fontSize.base, width: "50%" }}>HT</Text>

                <Text style={[
                    { fontSize: 28, color: colors.text, fontFamily: awayFontFamily, width: "25%", textAlign: 'center' }]}>{matchInfo.awayScore}</Text>
            </View>
        )
    }
    // event ongoing
    else {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "100%", paddingVertical: 8 }}>
                    <Text style={[
                        { fontSize: 28, color: colors.text, fontFamily: homeFontFamily, width: "25%", textAlign: 'center' }]}>{matchInfo.homeScore}</Text>

                    <Text style={{ textAlign: 'center', fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular, padding: 2, fontSize: 15, width: "50%" }}>{matchInfo.eventTime}'</Text>

                    <Text style={[
                        { fontSize: 28, color: colors.text, fontFamily: awayFontFamily, width: "25%", textAlign: 'center' }]}>{matchInfo.awayScore}</Text>
                </View>

            </View>
        )
    }
}


export const fixturesPanelStyles = StyleSheet.create({

    teamLogo: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
        minHeight: 60,
        minWidth: 60
    },
})