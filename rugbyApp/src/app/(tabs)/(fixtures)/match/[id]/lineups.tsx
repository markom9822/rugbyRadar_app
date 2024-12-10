import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, Button } from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { Ref, RefAttributes, useCallback, useEffect, useRef, useState } from "react";
import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { defaultStyles, lineupPanelStyles } from "@/styles";
import {getESPNMatchInfoFromDetails, getLeagueName, hexToRGB } from "@/store/utils/helpers";
import { getAnyHomeAwayTeamInfo, getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { getLineup, getLineupPlanetRugbyAPI, getLineupRugbyViz, getLineupWorldRugbyAPI } from "@/store/utils/lineupsGetter";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getPlayerImageSrc } from "@/store/utils/playerImagesGetter";


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


const Lineups = () => {

    const [homeTeamName, setHomeTeamName] = useState<string>('');
    const [awayTeamName, setAwayTeamName] = useState<string>('');

    const [allLineupsArray, setAllLineupsArray] = useState<AllLineUpsInfo[]>([]);
    const [leagueName, setLeagueName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const {id} = useGlobalSearchParams();
    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6);

    const unique = <T extends { [key: string]: unknown }>(arr: T[], key: string): T[] => [   ...new Map(arr.map((item: T) => [item[key], item])).values() ];

    const combineLineupArrays = (homeSortedArray: LineUpInfo[], awaySortedArray: LineUpInfo[]) => {

        const playerCount = Math.floor((homeSortedArray.length + awaySortedArray.length)/2)

        var combinedArray = [];

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

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")
        setIsLoading(true)

        // handle differently - separate API
        if(leagueID.indexOf("_RugbyViz") !== -1)
        {
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
        if(id.indexOf("_WorldRugbyAPI") !== -1)
        {
            const separatedArray = id.toString().split("_");
            const worldRugbyAPIEventID = separatedArray[0];
            const worldRugbyAPILeagueName = separatedArray[1]

            const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/'+worldRugbyAPIEventID+'/summary?language=en';
            const matchDetails = await fetch(apiString,).then((res) => res.json())
            const matchDate = new Date(matchDetails.match.time.millis);
            const homeTeam = matchDetails.match.teams[0].name;
            const awayTeam = matchDetails.match.teams[1].name;
            setHomeTeamName(homeTeam)
            setAwayTeamName(awayTeam)
            setLeagueName(worldRugbyAPILeagueName)

            // get ESPN match ID
            const espnMatchInfo = await getESPNMatchInfoFromDetails(matchDate, homeTeam, awayTeam)
            const espnAPIString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/'+espnMatchInfo?.leagueID+'/summary?contentorigin=espn&event='+espnMatchInfo?.matchID+'&lang=en&region=gb'
            const espnMatchDetails = await fetch(espnAPIString,).then((res) => res.json())
            const homeLineup = getLineup(espnMatchDetails, 0)
            const awayLineup = getLineup(espnMatchDetails, 1)

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

            const apiString = 'https://rugbylivecenter.yormedia.com/api/match-lineups/'+planetRugbyAPIEventID;

            const matchDetails = await fetch(apiString,).then((res) => res.json())
            const [homeTeam, awayTeam] = matchDetails.data.matchDetails.teams.split(';');

            setHomeTeamName(homeTeam)
            setAwayTeamName(awayTeam)
            setLeagueName(planetRugbyAPILeagueName)

            const homeLineup = getLineupPlanetRugbyAPI(matchDetails, 1)
            const awayLineup = getLineupPlanetRugbyAPI(matchDetails, 0)

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
    }

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeamName, awayTeamName);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    const findLastItem = (lineupArray: AllLineUpsInfo[], index: number) => {

        if(lineupArray == undefined || lineupArray.length == 0)
        {
            return false;
        }
        else
        {
            return index === lineupArray.length - 1;
        }

    }

    const lineupsRender = (homeTeamInfo: any, awayTeamInfo: any) => {

        const [selectedTeam, setSelectedTeam] = useState<string>('home');

        if (homeTeamInfo == undefined || awayTeamInfo == undefined) {
            return (
                <></>
            )
        }
        else {

            const homeTeamBkgRBGA = hexToRGB(homeTeamInfo.colour, '0.2')
            const homeTeamBorderRBGA = hexToRGB(homeTeamInfo.colour, '0.8')

            const awayTeamBkgRBGA = hexToRGB(awayTeamInfo.colour, '0.2')
            const awayTeamBorderRBGA = hexToRGB(awayTeamInfo.colour, '0.8')

            return (
                <>
                    <View style={[lineupPanelStyles.container, { borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingVertical: 8 }]}>
                        <TouchableOpacity onPress={() => setSelectedTeam('home')}
                            style={[lineupPanelStyles.teamHeader,
                            {
                                backgroundColor: (selectedTeam === "home") ? (homeTeamBkgRBGA) : (colors.background),
                                borderColor: (selectedTeam === "home") ? homeTeamBorderRBGA : '#363434', borderWidth: (selectedTeam === "home") ? 2 : 1, justifyContent: 'center'
                            }]}>
                            <View style={{ padding: 5 }}>
                                <Image source={(selectedTeam === "home") ? homeTeamInfo.logo : homeTeamInfo.altLogo}
                                    style={[lineupPanelStyles.teamLogo, {opacity: (selectedTeam === "home") ? 1: 0.2 }]} />
                            </View>

                            <Text style={[lineupPanelStyles.teamName, { color:(selectedTeam === "home") ? colors.text : 'grey' }]}>{homeTeamInfo.abbreviation}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => setSelectedTeam('away')}
                            style={[lineupPanelStyles.teamHeader, {
                                backgroundColor: (selectedTeam === "away") ? (awayTeamBkgRBGA) : (colors.background),
                                borderColor: (selectedTeam === "away") ? awayTeamBorderRBGA : '#363434', borderWidth: (selectedTeam === "away") ? 2 : 1, justifyContent: 'center'
                            }]}>
                            <View style={{ padding: 5 }}>
                                <Image source={(selectedTeam === "away") ? awayTeamInfo.logo : awayTeamInfo.altLogo}
                                    style={[lineupPanelStyles.teamLogo, {opacity: (selectedTeam === "away") ? 1: 0.2 }]} />
                            </View>

                            <Text style={[lineupPanelStyles.teamName, { color:(selectedTeam === "away") ? colors.text : 'grey' }]}>{awayTeamInfo.abbreviation}</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList data={allLineupsArray}
                        renderItem={({ item, index }) =>
                            <LineupPlayerPanel
                                key={index}
                                selectedTeam={selectedTeam}
                                hometeamPlayer={item.hometeamPlayer}
                                hometeamPlayerID={item.hometeamPlayerID}
                                hometeamPlayerNum={item.hometeamPlayerNum}
                                isHomePlayerCaptain={item.isHomePlayerCaptain}
                                awayteamPlayer={item.awayteamPlayer}
                                awayteamPlayerID={item.awayteamPlayerID}
                                awayteamPlayerNum={item.awayteamPlayerNum}
                                isAwayPlayerCaptain={item.isAwayPlayerCaptain}
                                teamColour={(selectedTeam === "home") ? homeTeamInfo.colour : awayTeamInfo.colour}
                                isLastItem={findLastItem(allLineupsArray, index)}
                                bottomSheetRef={bottomSheetModalRef}
                                OnPlayerModalShown={handlePlayerModalShown}
                            />}
                    />
                </>

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

        if(isLoading)
        {
            return (
                <View style={{marginVertical: 20}}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )
        }
        
        return null
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const [modalPlayerName, setModalPlayerName] = useState<string>('');
    const [modalPlayerPosition, setModalPlayerPosition] = useState<string>('');
    const [modalPlayerAge, setModalPlayerAge] = useState<string>('');
    const [modalPlayerHeight, setModalPlayerHeight] = useState<string>('');
    const [modalPlayerWeight, setModalPlayerWeight] = useState<string>('');
    const [modalPlayerImageSrc, setModalPlayerImageSrc] = useState<string>('');

    const handlePlayerModalShown = async (playerName: string, playerID: string) => {

        setModalPlayerName(playerName)
        setModalPlayerPosition('')
        setModalPlayerAge('')
        setModalPlayerHeight('')
        setModalPlayerWeight('')
        setModalPlayerImageSrc('')

        const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/players/'+playerID+'?provider=rugbyviz'
        const playerInfo = await fetch(apiString,).then((res) => res.json())

        const calculateAge = (birthDate: Date): number => {
            const today = new Date();
            
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        }

        const playerPosition = playerInfo.data.position;
        const playerDOB = new Date(playerInfo.data.dateOfBirth);
        const playerAge = calculateAge(playerDOB).toString()
        const playerHeight = playerInfo.data.height;
        const playerWeight = playerInfo.data.weight;
        const playerImageSrc = getPlayerImageSrc('urc', 'Bristol Bears', playerName)

        setModalPlayerName(playerName)
        setModalPlayerPosition(playerPosition)
        setModalPlayerAge(playerAge)
        setModalPlayerHeight(playerHeight)
        setModalPlayerWeight(playerWeight)
        setModalPlayerImageSrc(playerImageSrc)
    }

    const snapPoints = ["48%"];

    return(
        <GestureHandlerRootView>

        <BottomSheetModalProvider>
        <View style={defaultStyles.container}>

            {activityIndicatorHeader()}
            {lineupsRender(homeTeamInfo, awayTeamInfo)}

            <BottomSheetModal 
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            handleStyle={{backgroundColor: 'grey', borderTopLeftRadius: 10, borderTopRightRadius: 10}}
            backgroundStyle={{backgroundColor: colors.background}}
            >
            <BottomSheetView style={{flex: 1, backgroundColor: '#303030', flexDirection: 'row'}}>
                <View style={{width: "50%", padding: 5}}>
                    <Text style={{color: colors.text, fontFamily: fontFamilies.bold}}>{modalPlayerName.toUpperCase()}</Text>
                    <Text style={{color: colors.text, fontFamily: fontFamilies.light}}>Position: {modalPlayerPosition}</Text>
                    <Text style={{color: colors.text, fontFamily: fontFamilies.light}}>Age: {modalPlayerAge}</Text>
                    <Text style={{color: colors.text, fontFamily: fontFamilies.light}}>Height: {modalPlayerHeight} cm</Text>
                    <Text style={{color: colors.text, fontFamily: fontFamilies.light}}>Weight: {modalPlayerWeight} kg</Text>
                </View>
                 <View style={{width: "50%", alignItems: 'center'}}>
                    <View style={{padding: 4, margin: 4}}>
                        <Image style={{width: 200, height: 200, opacity: 0.8}} src={modalPlayerImageSrc}/>
                    </View>
                 </View>
            </BottomSheetView>
            </BottomSheetModal>
        </View>
        </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

type LineupPlayerPanelProps = {
    selectedTeam: string,
    hometeamPlayer: string,
    hometeamPlayerID: string,
    hometeamPlayerNum: string,
    isHomePlayerCaptain: boolean,
    awayteamPlayer: string,
    awayteamPlayerID: string,
    awayteamPlayerNum: string,
    isAwayPlayerCaptain: boolean,
    teamColour: string,
    isLastItem: boolean,
    bottomSheetRef: any,
    OnPlayerModalShown: (playerName: string, playerID: string) => void
}


export const LineupPlayerPanel = ({ selectedTeam, hometeamPlayer, hometeamPlayerID, hometeamPlayerNum, isHomePlayerCaptain,
     awayteamPlayer, awayteamPlayerID, awayteamPlayerNum, isAwayPlayerCaptain, teamColour, isLastItem, bottomSheetRef, OnPlayerModalShown }: LineupPlayerPanelProps) => {

    var playerName = ''
    var playerNumber = ''
    var playerID = ''
    var isCaptain = false;
    if(selectedTeam == 'home')
    {
        playerName = hometeamPlayer;
        playerNumber = hometeamPlayerNum;
        playerID = hometeamPlayerID;
        isCaptain = isHomePlayerCaptain;
    }
    else
    {
        playerName = awayteamPlayer;
        playerNumber = awayteamPlayerNum;
        playerID = awayteamPlayerID;
        isCaptain = isAwayPlayerCaptain;
    }

    const panelBackground = hexToRGB(teamColour, '0.1')

    const handlePresentModalPress = useCallback(() => {

        OnPlayerModalShown(playerName, playerID)
        bottomSheetRef.current?.present();
      }, [selectedTeam]);


    if (hometeamPlayer === "Substitutes") {
        return (
            <View style={{flexDirection: 'row', backgroundColor: panelBackground}}>
                <Text style={[lineupPanelStyles.substitutesHeader]}>{playerName.toUpperCase()}</Text>
            </View>
        )
    }
    else {
        return ( 
            <TouchableOpacity onPress={handlePresentModalPress} activeOpacity={0.6} style={[{flexDirection: 'row', backgroundColor: panelBackground, paddingVertical: 8, borderBottomColor: 'grey', borderBottomWidth: 1, marginBottom: isLastItem ? 60: 0}]}>
                <Text style={{fontWeight: 500, paddingHorizontal: 4, fontSize: 11, color: colors.text, width: "8%", textAlign: 'center', fontFamily: fontFamilies.bold}}>
                    {playerNumber}
                </Text>
                <Text style={{fontWeight: 500, paddingHorizontal: 6, fontSize: 12, color: colors.text, textAlign: 'left', width: "92%", fontFamily: fontFamilies.regular}}>
                    {playerName.toUpperCase()} {(isCaptain) ? '(c)' : ''}</Text>
            </TouchableOpacity>
        )
    }
}

export default Lineups;