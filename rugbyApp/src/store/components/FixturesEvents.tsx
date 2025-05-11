import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { DropGoalIcon, RedCardIcon, RefereeWhistleIcon, RugbyPostsIcon, RugbyTryIcon, YellowCardIcon } from "../Icons/Icons";
import { getKeyEventsPlanetRugbyAPI, getKeyEventsRugbyViz, getKeyEventsWorldRugbyAPI } from "../utils/getKeyEvents";
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo";
import { hexToRGB } from "../utils/helpers";


type FixtureEvents = {
    id: string,
    isShown: boolean,
}

export const FixtureEvents = ({ id, isShown }: FixtureEvents) => {

    const [keyEventsArray, setKeyEventsArray] = useState<KeyEventsInfo[] | undefined>();

    const [mainTeamName, setMainTeamName] = useState<string | undefined>();
    const [opponentTeamName, setOpponentTeamName] = useState<string | undefined>();
    const [leagueName, setLeagueName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const eventID = new String(id).substring(0, 6);
    const leagueID = new String(id).slice(6)

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch Data")
        setIsLoading(true)

        // handle differently - separate API
        if (leagueID.indexOf("_RugbyViz") !== -1) {

            const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/' + eventID + '?provider=rugbyviz';
            console.info(apiString)

            const matchStats = await fetch(apiString,).then((res) => res.json())
            const homeTeam = matchStats.data.homeTeam.name;
            const awayTeam = matchStats.data.awayTeam.name;

            console.info(homeTeam + awayTeam)

            setMainTeamName(homeTeam)
            setOpponentTeamName(awayTeam)

            const keyEvents = getKeyEventsRugbyViz(matchStats)
            console.info(keyEvents)

            setKeyEventsArray(keyEvents)
            setLeagueName(leagueID.replace("_RugbyViz", ""))

            setIsLoading(false)
            return;
        }

        // use world rugby API
        if (id.indexOf("_WorldRugbyAPI") !== -1) {
            const separatedArray = id.toString().split("_");
            const worldRugbyAPIEventID = separatedArray[0];
            const worldRugbyAPILeagueName = separatedArray[1]

            const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/' + worldRugbyAPIEventID + '/stats?language=en';

            const matchStats = await fetch(apiString,).then((res) => res.json())
            const homeTeam = matchStats.match.teams[0].name;
            const awayTeam = matchStats.match.teams[1].name;
            const matchDate = new Date(matchStats.match.time.millis)

            setMainTeamName(homeTeam)
            setOpponentTeamName(awayTeam)

            const timelineApiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/' + worldRugbyAPIEventID + '/timeline?language=en';
            const timelineStats = await fetch(timelineApiString,).then((res) => res.json())
            const keyEvents = await getKeyEventsWorldRugbyAPI(timelineStats)

            setKeyEventsArray(keyEvents)

            setLeagueName(worldRugbyAPILeagueName)

            setIsLoading(false)
            return;
        }

        // use planet rugby API
        if (id.indexOf("_PlanetRugbyAPI") !== -1) {
            const separatedArray = id.toString().split("_");
            const planetRugbyAPIEventID = separatedArray[0];
            const planetRugbyAPILeagueName = separatedArray[1]

            const apiString = 'https://rugbylivecenter.yormedia.com/api/match-h2h/' + planetRugbyAPIEventID;

            const matchStats = await fetch(apiString,).then((res) => res.json())
            const [homeTeam, awayTeam] = matchStats.data.matchDetails.teams.split(';');
            const [homeTeamID, awayTeamID] = matchStats.data.matchDetails.team_ids.split(';');

            setMainTeamName(homeTeam)
            setOpponentTeamName(awayTeam)

            const timelineApiString = 'https://rugbylivecenter.yormedia.com/api/match-detail/' + planetRugbyAPIEventID;
            const timelineStats = await fetch(timelineApiString,).then((res) => res.json())
            const keyEvents = getKeyEventsPlanetRugbyAPI(timelineStats, homeTeam, awayTeam, homeTeamID, awayTeamID)
            setKeyEventsArray(keyEvents)

            setLeagueName(planetRugbyAPILeagueName)

            setIsLoading(false)
            return;
        }
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await handlePressFetchData()
        }
        fetchMyAPI()
    }, [])

    const activityIndicatorHeader = () => {

        if (isLoading) {
            return (
                <View style={{ marginVertical: 20 }}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )
        }

        return null
    }

    return (
        <View>
            {isShown &&

                <BottomSheetScrollView>

                    {activityIndicatorHeader()}

                    <KeyEventsPanel
                        keyEventArray={keyEventsArray}
                        matchID={id}
                        homeTeam={mainTeamName}
                        awayTeam={opponentTeamName}
                        leagueName={leagueName}
                    />

                </BottomSheetScrollView>}

        </View>
    )
}


export type KeyEventsInfo = {
    eventTime: string,
    eventType: string,
    eventPlayer: string,
    eventScore: string,
    eventTeam: string,
    eventIcon: any,
}

type KeyEventsPanelProps = {
    keyEventArray: KeyEventsInfo[] | undefined,
    homeTeam: string | undefined,
    awayTeam: string | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
}

export const KeyEventsPanel = ({ keyEventArray, homeTeam, awayTeam, matchID, leagueName }: KeyEventsPanelProps) => {

    if (keyEventArray === undefined) return
    if (homeTeam === undefined) return
    if (awayTeam === undefined) return

    const homeAwayTeamInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam)

    if (keyEventArray.length == 0) {
        return (
            <View style={[keyEventsPanelStyles.container]}>

                <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 5 }}>

                    <View style={{}}>
                        <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, textAlign: 'center' }}>Currently no key events</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={[keyEventsPanelStyles.container, { marginBottom: 130 }]}>

            <View style={{ backgroundColor: 'transparent', padding: 10, borderRadius: 5 }}>

                <FlatList data={keyEventArray}
                    scrollEnabled={false}
                    renderItem={({ item, index }) =>
                        <KeyEventItem
                            key={index}
                            leagueName={leagueName}
                            eventTime={item.eventTime}
                            eventType={item.eventType}
                            eventPlayer={item.eventPlayer}
                            eventScore={item.eventScore}
                            eventTeam={item.eventTeam}
                            eventIcon={item.eventIcon}
                            isHomeTeam={item.eventTeam == homeTeam}
                            teamColour={item.eventTeam == homeTeam ? homeAwayTeamInfo?.homeInfo.colour : homeAwayTeamInfo?.awayInfo.colour}
                            homeAwayInfo={homeAwayTeamInfo}
                        />}
                />

            </View>
        </View>
    )
}

type KeyEventItemProps = {
    leagueName: string | undefined,
    eventTime: string,
    eventType: string,
    eventPlayer: string,
    eventScore: string,
    eventTeam: string,
    eventIcon: any,
    isHomeTeam: boolean,
    teamColour: string | undefined,
    homeAwayInfo: any
}

export const KeyEventItem = ({ leagueName, eventTime, eventType, eventPlayer, eventScore, eventTeam, eventIcon, isHomeTeam, teamColour, homeAwayInfo }: KeyEventItemProps) => {

    if (teamColour == undefined) return;

    const panelColour = hexToRGB("#4d4b4b", '0.5')
    const teamGradientColour = hexToRGB(teamColour, '0.3')

    const eventTeamName = isHomeTeam ? homeAwayInfo?.homeInfo.displayName : homeAwayInfo?.awayInfo.displayName;
    const eventCardTitle = eventType + " for " + eventTeamName
    const eventCardLogo = isHomeTeam ? homeAwayInfo?.homeInfo.logo : homeAwayInfo?.awayInfo.logo

    const getEventDescriptionText = (icon: any) => {
        switch (icon) {
            case RugbyPostsIcon: return "Kicked by"
            case RugbyTryIcon: return "Scored by"
            case YellowCardIcon: return "Sin bin for"
            case RedCardIcon: return "Sin bin for"
            case DropGoalIcon: return "Drop goal by"

            default: {
                break;
            }
        }
    }

    const renderScoreCard = (type: string) => {

        if (type == "Yellow" || type == "Yellow card" || type == "Yellow Card" || type == "Red" || type == "Red card" || type == "Red Card") {
            return (
                <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                        <Image style={[keyEventsPanelStyles.cardIcon]}
                            source={RefereeWhistleIcon} />
                    </View>

                    <Text style={{ color: colors.text, textAlign: 'center', fontSize: 14, fontFamily: fontFamilies.regular, padding: 3 }}>{eventTime}'</Text>
                </View>
            )
        }

        return (
            <View>
                <Text style={{ color: colors.text, textAlign: 'center', fontSize: 17, fontFamily: fontFamilies.bold, padding: 3 }}>{eventScore}</Text>
                <Text style={{ color: colors.text, textAlign: 'center', fontSize: 14, fontFamily: fontFamilies.regular, padding: 3 }}>{eventTime}'</Text>
            </View>
        )
    }

    return (
        <LinearGradient colors={[teamGradientColour, 'transparent']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }}
            style={{ marginHorizontal: 4, marginVertical: 5, padding: 8, backgroundColor: panelColour, borderRadius: 5, flexDirection: 'row' }}>

            <View style={{ flexDirection: 'column', paddingHorizontal: 4, width: "70%" }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 4 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, width: "10%" }}>
                        <Image style={[keyEventsPanelStyles.eventIcon]}
                            source={eventIcon} />
                    </View>
                    <Text style={{ color: colors.text, paddingHorizontal: 5, fontFamily: fontFamilies.regular, width: "90%", fontSize: 13 }}>{eventCardTitle}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, width: "20%" }}>
                        <Image style={[keyEventsPanelStyles.teamLogo]}
                            source={eventCardLogo} />
                    </View>

                    <View style={{ flexDirection: 'column', paddingHorizontal: 5, width: "80%" }}>
                        <Text style={{ color: colors.text, fontSize: fontSize.xs, fontFamily: fontFamilies.light }}>{getEventDescriptionText(eventIcon)}</Text>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.regular }}>{eventPlayer}</Text>
                    </View>

                </View>
            </View>

            <View style={{ height: "90%", width: 5, backgroundColor: teamColour, justifyContent: 'center', alignSelf: 'center', borderRadius: 10 }} />

            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4, flexDirection: 'column', width: "30%" }}>
                {renderScoreCard(eventType)}
            </View>

        </LinearGradient>
    )

}

export const keyEventsPanelStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    teamLogo: {
        resizeMode: 'contain',
        width: 35,
        height: 35,
        minHeight: 35,
        minWidth: 35,
    },
    eventIcon: {
        resizeMode: 'contain',
        width: 12,
        height: 12,
        minHeight: 12,
        minWidth: 12,
    },
    cardIcon: {
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
    },
    matchDate: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontSize: fontSize.xs,
    },
    teamName: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500,
        fontSize: fontSize.xs
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