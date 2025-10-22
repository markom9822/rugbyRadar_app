import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { lineupPanelStyles } from "@/styles";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo";
import { getESPNMatchInfoFromDetails, getLastName, hexToRGB } from "../utils/helpers";
import { getLineup, getLineupPlanetRugbyAPI, getLineupRugbyViz, getLineupWorldRugbyAPI } from "../utils/lineupsGetter";
import { LineupPlayerPanel } from "./LineupPlayerPanel";
import AntDesign from '@expo/vector-icons/AntDesign';
import { getPlayerInfo } from "../utils/playerInfoGetter";

export type LineUpInfo = {
    teamPlayer: string,
    teamPlayerID: string,
    teamPlayerNum: string,
    isPlayerCaptain: boolean
}

export type AllLineUpsInfo = {
    hometeamPlayer: string,
    hometeamPlayerID: string,
    hometeamPlayerNum: string,
    isHomePlayerCaptain: boolean,

    awayteamPlayer: string,
    awayteamPlayerID: string,
    awayteamPlayerNum: string,
    isAwayPlayerCaptain: boolean,
}

type FixtureLineupsProps = {
    id: string,
    isShown: boolean,
}

export const FixtureLineups = ({ id, isShown }: FixtureLineupsProps) => {

    const [homeTeamName, setHomeTeamName] = useState<string>('');
    const [awayTeamName, setAwayTeamName] = useState<string>('');

    const [allLineupsArray, setAllLineupsArray] = useState<AllLineUpsInfo[]>([]);
    const [leagueName, setLeagueName] = useState<string>('');
    const [selectedTeam, setSelectedTeam] = useState<string>('home');
    const [playerModalShown, setPlayerModalShown] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState(false);

    const eventID = new String(id).substring(0, 6);
    const leagueID = new String(id).slice(6);

    const unique = <T extends { [key: string]: unknown }>(arr: T[], key: string): T[] => [...new Map(arr.map((item: T) => [item[key], item])).values()];

    const combineLineupArrays = (homeSortedArray: LineUpInfo[], awaySortedArray: LineUpInfo[]) => {

        const playerCount = Math.floor((homeSortedArray.length + awaySortedArray.length) / 2)

        // TODO: Fix issue with player numbers not being correct (Planet Rugby API)
        if (playerCount !== 23) return [];

        let combinedArray = [];

        for (let index = 0; index < playerCount; index++) {

            let newCombinedInfo = {
                hometeamPlayer: homeSortedArray[index].teamPlayer,
                hometeamPlayerID: homeSortedArray[index].teamPlayerID,
                hometeamPlayerNum: homeSortedArray[index].teamPlayerNum,
                isHomePlayerCaptain: homeSortedArray[index].isPlayerCaptain,

                awayteamPlayer: awaySortedArray[index].teamPlayer,
                awayteamPlayerID: awaySortedArray[index].teamPlayerID,
                awayteamPlayerNum: awaySortedArray[index].teamPlayerNum,
                isAwayPlayerCaptain: awaySortedArray[index].isPlayerCaptain,
            };

            combinedArray.push(newCombinedInfo)
        }

        // add subs header
        const subsHeadingInfo = {
            hometeamPlayer: 'Substitutes',
            hometeamPlayerID: '',
            hometeamPlayerNum: '',
            isHomePlayerCaptain: false,

            awayteamPlayer: 'Substitutes',
            awayteamPlayerID: '',
            awayteamPlayerNum: '',
            isAwayPlayerCaptain: false,
        };

        // adding subs heading
        combinedArray.splice(15, 0, subsHeadingInfo)

        return (
            combinedArray
        )
    }

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch Data")
        setIsLoading(true)

        // handle differently - separate API
        if (leagueID.indexOf("_RugbyViz") !== -1) {
            const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/' + eventID + '?provider=rugbyviz';

            const matchDetails = await fetch(apiString,).then((res) => res.json())
            const homeTeam = matchDetails.data.homeTeam.name;
            const awayTeam = matchDetails.data.awayTeam.name;
            setHomeTeamName(homeTeam)
            setAwayTeamName(awayTeam)
            setLeagueName(leagueID.replace("_RugbyViz", ""))

            const homeLineup = getLineupRugbyViz(matchDetails, true)
            const awayLineup = getLineupRugbyViz(matchDetails, false)

            console.info('Home Team Lineup')
            console.info(homeLineup)

            // need to remove duplicates
            const homeUniqueArray = unique(homeLineup, 'teamPlayerNum')
            // sort in jersey number order
            const homeSortedArray = homeUniqueArray.sort((a, b) => a.teamPlayerNum - b.teamPlayerNum);

            // need to remove duplicates
            const awayUniqueArray = unique(awayLineup, 'teamPlayerNum')
            // sort in jersey number order
            const awaySortedArray = awayUniqueArray.sort((a, b) => a.teamPlayerNum - b.teamPlayerNum);

            const combinedArray = combineLineupArrays(homeSortedArray, awaySortedArray)
            setAllLineupsArray(combinedArray)
            setIsLoading(false)
            return;
        }

        // use world rugby API
        if (id.indexOf("_WorldRugbyAPI") !== -1) {
            const separatedArray = id.toString().split("_");
            const worldRugbyAPIEventID = separatedArray[0];
            const worldRugbyAPILeagueName = separatedArray[1]

            const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/' + worldRugbyAPIEventID + '/summary?language=en';
            console.info(apiString)
            const matchDetails = await fetch(apiString,).then((res) => res.json())
            const matchDate = new Date(matchDetails.match.time.millis);
            const homeTeam = matchDetails.match.teams[0].name;
            const awayTeam = matchDetails.match.teams[1].name;
            setHomeTeamName(homeTeam)
            setAwayTeamName(awayTeam)
            setLeagueName(worldRugbyAPILeagueName)

            // get ESPN match ID
            const espnMatchInfo = await getESPNMatchInfoFromDetails(matchDate, homeTeam, awayTeam)
            console.info(espnMatchInfo)

            let homeLineup;
            let awayLineup;

            if (espnMatchInfo != null) {
                const espnAPIString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + espnMatchInfo?.leagueID + '/summary?contentorigin=espn&event=' + espnMatchInfo?.matchID + '&lang=en&region=gb'
                console.info(espnAPIString)
                const espnMatchDetails = await fetch(espnAPIString,).then((res) => res.json())
                homeLineup = getLineup(espnMatchDetails, 0, matchDetails)
                awayLineup = getLineup(espnMatchDetails, 1, matchDetails)
            }
            else {
                homeLineup = getLineupWorldRugbyAPI(matchDetails, true)
                awayLineup = getLineupWorldRugbyAPI(matchDetails, false)
            }

            console.info('Home Team Lineup')
            console.info(homeLineup)

            // need to remove duplicates
            const homeUniqueArray = unique(homeLineup, 'teamPlayerNum')
            // sort in jersey number order
            const homeSortedArray = homeUniqueArray.sort((a, b) => a.teamPlayerNum - b.teamPlayerNum);

            // need to remove duplicates
            const awayUniqueArray = unique(awayLineup, 'teamPlayerNum')
            // sort in jersey number order
            const awaySortedArray = awayUniqueArray.sort((a, b) => a.teamPlayerNum - b.teamPlayerNum);

            const combinedArray = combineLineupArrays(homeSortedArray, awaySortedArray)
            setAllLineupsArray(combinedArray)
            setIsLoading(false)
            return;
        }

        // use planet rugby API
        if (id.indexOf("_PlanetRugbyAPI") !== -1) {
            const separatedArray = id.toString().split("_");
            const planetRugbyAPIEventID = separatedArray[0];
            const planetRugbyAPILeagueName = separatedArray[1]

            const apiString = 'https://rugbylivecenter.yormedia.com/api/match-lineups/' + planetRugbyAPIEventID;
            console.info(apiString)

            const matchDetails = await fetch(apiString,).then((res) => res.json())
            const [homeTeam, awayTeam] = matchDetails.data.matchDetails.teams.split(';');

            setHomeTeamName(homeTeam)
            setAwayTeamName(awayTeam)
            setLeagueName(planetRugbyAPILeagueName)

            const homeLineup = getLineupPlanetRugbyAPI(matchDetails, 1)
            const awayLineup = getLineupPlanetRugbyAPI(matchDetails, 0)

            console.info('Home Team Lineup')
            console.info(homeLineup)
            console.info(homeLineup)

            console.info('Away Team Lineup')
            console.info(awayLineup)
            console.info(awayLineup.length)

            // need to remove duplicates
            const homeUniqueArray = unique(homeLineup, 'teamPlayerNum')
            // sort in jersey number order
            const homeSortedArray = homeUniqueArray.sort((a, b) => a.teamPlayerNum - b.teamPlayerNum);

            // need to remove duplicates
            const awayUniqueArray = unique(awayLineup, 'teamPlayerNum')
            // sort in jersey number order
            const awaySortedArray = awayUniqueArray.sort((a, b) => a.teamPlayerNum - b.teamPlayerNum);

            const combinedArray = combineLineupArrays(homeSortedArray, awaySortedArray)
            setAllLineupsArray(combinedArray)
            setIsLoading(false)
            return;
        }
    }

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeamName, awayTeamName);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    const lineupsRender = (homeTeamInfo: any, awayTeamInfo: any) => {

        if (homeTeamInfo === undefined || awayTeamInfo === undefined) {
            return (
                <></>
            )
        }
        else {

            const handlePressLineupTeam = (team: string) => {

                if (team !== selectedTeam) {
                    setSelectedTeam(team)
                }
            }

            let homeAbbreviation = homeTeamInfo?.abbreviation;
            let awayAbbreviation = awayTeamInfo?.abbreviation;
            let homeFontSize = fontSize.base;
            let awayFontSize = fontSize.base;

            if (homeTeamName.includes("U20")) {
                homeAbbreviation += " U20"
                homeFontSize = fontSize.sm
            }
            if (awayTeamName.includes("U20")) {
                awayAbbreviation += " U20"
                awayFontSize = fontSize.sm
            }

            const selectedTeamGradientColour = hexToRGB((selectedTeam === "home") ? homeTeamInfo.colour : awayTeamInfo.colour, '0.3')

            const gradientStartFraction = (selectedTeam === "home") ? 0 : 1;
            const gradientEndFraction = (selectedTeam === "home") ? 0.8 : 0.2;

            const panelColour = hexToRGB("#4d4b4b", '0.5')
            const homeTeamGradientColour = hexToRGB(homeTeamInfo.colour, '0.6')
            const awayTeamGradientColour = hexToRGB(awayTeamInfo.colour, '0.6')

            return (
                <View>
                    <View style={[lineupPanelStyles.container, { paddingVertical: 8, justifyContent: 'center', alignItems: 'center' }]}>
                        <TouchableOpacity onPress={() => handlePressLineupTeam('home')}
                            style={[lineupPanelStyles.teamHeader,
                            {
                                backgroundColor: panelColour, justifyContent: 'center'
                            }]}>

                            <LinearGradient colors={[(selectedTeam === "home") ? homeTeamGradientColour : 'transparent', 'transparent']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={{ width: "100%", justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 5 }}>

                                <Image source={(selectedTeam === "home") ? homeTeamInfo.logo : homeTeamInfo.altLogo}
                                    style={[lineupPanelStyles.teamLogo, { opacity: (selectedTeam === "home") ? 1 : 0.3 }]} />
                            </LinearGradient>

                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => handlePressLineupTeam('away')}
                            style={[lineupPanelStyles.teamHeader,
                            {
                                backgroundColor: panelColour, justifyContent: 'center'
                            }]}>

                            <LinearGradient colors={[(selectedTeam === "away") ? awayTeamGradientColour : 'transparent', 'transparent']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} style={{ width: "100%", justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 5 }}>

                                <Image source={(selectedTeam === "away") ? awayTeamInfo.logo : awayTeamInfo.altLogo}
                                    style={[lineupPanelStyles.teamLogo, { opacity: (selectedTeam === "away") ? 1 : 0.3 }]} />
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>

                    <BottomSheetScrollView style={{ borderTopColor: 'grey', borderTopWidth: 1 }}>

                        <LinearGradient colors={[selectedTeamGradientColour, 'rgba(25, 26, 27, 0.5)']} start={{ x: gradientStartFraction, y: 0.5 }} end={{ x: gradientEndFraction, y: 0.5 }} >

                            <FlatList data={allLineupsArray}
                                scrollEnabled={false}
                                renderItem={({ item, index }) =>
                                    <LineupPlayerPanel
                                        key={index}
                                        selectedTeam={selectedTeam}
                                        selectedTeamDisplayName={selectedTeam === "home" ? homeTeamName : awayTeamName}
                                        hometeamPlayer={item.hometeamPlayer}
                                        hometeamPlayerID={item.hometeamPlayerID}
                                        hometeamPlayerNum={item.hometeamPlayerNum}
                                        isHomePlayerCaptain={item.isHomePlayerCaptain}
                                        awayteamPlayer={item.awayteamPlayer}
                                        awayteamPlayerID={item.awayteamPlayerID}
                                        awayteamPlayerNum={item.awayteamPlayerNum}
                                        isAwayPlayerCaptain={item.isAwayPlayerCaptain}
                                        teamColour={(selectedTeam === "home") ? homeTeamInfo.colour : awayTeamInfo.colour}
                                        OnPlayerModalShown={handlePlayerModalShown}
                                    />}
                            />
                        </LinearGradient>
                    </BottomSheetScrollView>

                    <Modal transparent visible={playerModalShown}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: colors.background, borderRadius: 5, borderColor: hexToRGB(modalTeamColour, '0.5'), borderWidth: 1}}>
                                <View style={{ padding: 15, backgroundColor: hexToRGB(modalTeamColour, '0.15') }}>

                                    <TouchableOpacity style={{position: 'absolute', top: 15, right: 15, zIndex: 1}} onPress={() => setPlayerModalShown(false)}>
                                        <AntDesign name="close" size={18} color="white" />
                                    </TouchableOpacity>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={{ padding: 4, margin: 4, marginTop: 25 }}>
                                            <Image style={{ width: 210, height: 210, opacity: 1, resizeMode: 'contain' }} src={modalPlayerImageSrc} />
                                            <View style={{
                                                position: 'absolute', borderBottomLeftRadius: 7, borderBottomRightRadius: 7,
                                                top: 190, bottom: 0, left: 18, right: 18, backgroundColor: colors.background
                                            }}>
                                                <Text style={{
                                                    flex: 1,
                                                    textAlign: 'center', color: colors.text, borderBottomLeftRadius: 7, borderBottomRightRadius: 7,
                                                    fontFamily: fontFamilies.title, fontSize: 14, backgroundColor: hexToRGB(modalTeamColour, '0.5')
                                                }}>{getLastName(modalPlayerName).toUpperCase()}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ padding: 10 }}>
                                        <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 17, marginBottom: 10 }}>{modalPlayerName.toUpperCase()}</Text>
                                        <View style={{ borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1, marginVertical: 4 }}>
                                            <Text style={{ color: hexToRGB('#FFFFFF', '0.7'), fontFamily: fontFamilies.title, paddingLeft: 1, paddingVertical: 3 }}>{modalPlayerPosition.toUpperCase()}</Text>
                                        </View>
                                        <View style={{ marginVertical: 6, flexDirection: 'row', gap: 14 }}>
                                            <View style={{ marginHorizontal: 2 }}>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 13 }}>AGE</Text>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.light }}>{modalPlayerAge}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 13 }}>DATE OF BIRTH</Text>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.light }}>{modalPlayerDOB}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 6, flexDirection: 'row', gap: 14 }}>
                                            <View style={{ marginHorizontal: 2 }}>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 13 }}>HEIGHT</Text>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.light }}>{modalPlayerHeight}</Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 13 }}>WEIGHT</Text>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.light }}>{modalPlayerWeight}</Text>
                                            </View>
                                        </View>
                                        <View style={{ marginVertical: 6, flexDirection: 'row', gap: 14 }}>
                                            <View style={{ marginHorizontal: 2 }}>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 13 }}>BIRTHPLACE</Text>
                                                <Text style={{ color: colors.text, fontFamily: fontFamilies.light }}>{modalPlayerCountry}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            )
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

    const [modalPlayerName, setModalPlayerName] = useState<string>('');
    const [modalPlayerPosition, setModalPlayerPosition] = useState<string>('');
    const [modalPlayerAge, setModalPlayerAge] = useState<string>('');
    const [modalPlayerDOB, setModalPlayerDOB] = useState<string>('');

    const [modalPlayerHeight, setModalPlayerHeight] = useState<string>('');
    const [modalPlayerWeight, setModalPlayerWeight] = useState<string>('');
    const [modalPlayerCountry, setModalPlayerCountry] = useState<string>('');

    const [modalPlayerImageSrc, setModalPlayerImageSrc] = useState<string>('');
    const [modalTeamColour, setModalTeamColour] = useState<string>('');

    const handlePlayerModalShown = async (playerName: string, playerID: string, teamName: string, teamColour: string) => {

        setPlayerModalShown(true)

        setModalPlayerName(playerName)
        setModalPlayerPosition('')
        setModalPlayerAge('-')
        setModalPlayerDOB('-')
        setModalPlayerHeight('-')
        setModalPlayerWeight('-')
        setModalPlayerImageSrc('')
        setModalTeamColour(teamColour)
        setModalPlayerCountry('-')

        const playerInfoResult = await getPlayerInfo(playerName, playerID, teamName, leagueID, leagueName, id);
        setModalPlayerName(playerInfoResult.playerName)
        setModalPlayerPosition(playerInfoResult.playerPosition)
        setModalPlayerAge(playerInfoResult.playerAge)
        setModalPlayerDOB(playerInfoResult.playerDOB)
        setModalPlayerHeight(playerInfoResult.playerHeight)
        setModalPlayerWeight(playerInfoResult.playerWeight)
        setModalPlayerImageSrc(playerInfoResult.playerImageSrc)
        setModalPlayerCountry(playerInfoResult.playerCountry)
    }

    return (<View>
        {isShown &&
            <View>
                {activityIndicatorHeader()}
                {lineupsRender(homeTeamInfo, awayTeamInfo)}
            </View>}
    </View>
    )
}