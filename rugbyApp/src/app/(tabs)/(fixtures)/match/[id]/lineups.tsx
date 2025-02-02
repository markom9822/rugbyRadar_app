import { View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, Button, ImageBackground } from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { Ref, RefAttributes, useCallback, useEffect, useRef, useState } from "react";
import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { defaultStyles, lineupPanelStyles } from "@/styles";
import {dateCustomFormatting, getESPNMatchInfoFromDetails, getLeagueName, hexToRGB } from "@/store/utils/helpers";
import { getAnyHomeAwayTeamInfo, getHomeAwayTeamInfo, getTeamInfo } from "@/store/utils/getTeamInfo";
import { getLineup, getLineupPlanetRugbyAPI, getLineupRugbyViz, getLineupWorldRugbyAPI } from "@/store/utils/lineupsGetter";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getPlayerImageSrc } from "@/store/utils/playerImagesGetter";
import { LineupPlayerPanel } from "@/store/components/LineupPlayerPanel";
import { LinearGradient } from "expo-linear-gradient";
import { StretchInX } from "react-native-reanimated";


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
    const [selectedTeam, setSelectedTeam] = useState<string>('home');

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

            var homeLineup;
            var awayLineup;

            if(espnMatchInfo != null)
            {
                const espnAPIString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/'+espnMatchInfo?.leagueID+'/summary?contentorigin=espn&event='+espnMatchInfo?.matchID+'&lang=en&region=gb'
                console.info(espnAPIString)
                const espnMatchDetails = await fetch(espnAPIString,).then((res) => res.json())
                homeLineup = getLineup(espnMatchDetails, 0, matchDetails)
                awayLineup = getLineup(espnMatchDetails, 1, matchDetails)
            }
            else
            {
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

            const apiString = 'https://rugbylivecenter.yormedia.com/api/match-lineups/'+planetRugbyAPIEventID;
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

    const lineupsRender = (homeTeamInfo: any, awayTeamInfo: any, bottomSheetRef: any) => {

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

            const handlePressLineupTeam = (team: string) => {

                if(team !== selectedTeam)
                {
                    bottomSheetRef.current?.close()
                    setSelectedTeam(team)
                }
            }

            var homeAbbreviation = homeTeamInfo?.abbreviation;
            var awayAbbreviation = awayTeamInfo?.abbreviation;
            var homeFontSize = fontSize.base;
            var awayFontSize = fontSize.base;
        
            if(homeTeamName.includes("U20"))
            {
                homeAbbreviation += " U20"
                homeFontSize = fontSize.sm
            }
            if(awayTeamName.includes("U20"))
            {
                awayAbbreviation += " U20"
                awayFontSize = fontSize.sm
            }

            return (
                <>
                    <View style={[lineupPanelStyles.container, { borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingVertical: 8 }]}>
                        <TouchableOpacity onPress={() => handlePressLineupTeam('home')}
                            style={[lineupPanelStyles.teamHeader,
                            {
                                backgroundColor: (selectedTeam === "home") ? (homeTeamBkgRBGA) : (colors.background),
                                borderColor: (selectedTeam === "home") ? homeTeamBorderRBGA : '#363434', borderWidth: (selectedTeam === "home") ? 2 : 1, justifyContent: 'center'
                            }]}>
                            <View style={{ padding: 5 }}>
                                <Image source={(selectedTeam === "home") ? homeTeamInfo.logo : homeTeamInfo.altLogo}
                                    style={[lineupPanelStyles.teamLogo, {opacity: (selectedTeam === "home") ? 1: 0.2 }]} />
                            </View>

                            <Text style={[lineupPanelStyles.teamName, { color:(selectedTeam === "home") ? colors.text : 'grey', width: "50%", fontSize: homeFontSize }]}>{homeAbbreviation}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => handlePressLineupTeam('away')}
                            style={[lineupPanelStyles.teamHeader, {
                                backgroundColor: (selectedTeam === "away") ? (awayTeamBkgRBGA) : (colors.background),
                                borderColor: (selectedTeam === "away") ? awayTeamBorderRBGA : '#363434', borderWidth: (selectedTeam === "away") ? 2 : 1, justifyContent: 'center'
                            }]}>
                            <View style={{ padding: 5 }}>
                                <Image source={(selectedTeam === "away") ? awayTeamInfo.logo : awayTeamInfo.altLogo}
                                    style={[lineupPanelStyles.teamLogo, {opacity: (selectedTeam === "away") ? 1: 0.2 }]} />
                            </View>

                            <Text style={[lineupPanelStyles.teamName, { color:(selectedTeam === "away") ? colors.text : 'grey', width: "50%", fontSize: awayFontSize }]}>{awayAbbreviation}</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList data={allLineupsArray}
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
    const [modalPlayerDOB, setModalPlayerDOB] = useState<string>('');

    const [modalPlayerHeight, setModalPlayerHeight] = useState<string>('');
    const [modalPlayerWeight, setModalPlayerWeight] = useState<string>('');
    const [modalPlayerCountry, setModalPlayerCountry] = useState<string>('');

    const [modalPlayerImageSrc, setModalPlayerImageSrc] = useState<string>('');
    const [modalTeamColour, setModalTeamColour] = useState<string>('');

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

    const handlePlayerModalShown = async (playerName: string, playerID: string, teamName: string, teamColour: string) => {

        setModalPlayerName(playerName)
        setModalPlayerPosition('')
        setModalPlayerAge('')
        setModalPlayerDOB('')
        setModalPlayerHeight('')
        setModalPlayerWeight('')
        setModalPlayerImageSrc('')
        setModalTeamColour(teamColour)
        setModalPlayerCountry('')

        if(playerName == "-")
        {
            return;
        }

        const calculateAge = (birthDate: Date): number => {
            const today = new Date();
            
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        }

        function formatDate(date: Date): string {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        const handleNullHeightOutput = (playerHeight: string) => {

            if(playerHeight == null)
            {
                return "-"
            }

            return cmToMeters(Number(playerHeight)) + " m";
        }

        const handleNullWeightOutput = (playerWeight: string) => {

            if(playerWeight == null)
            {
                return "-"
            }

            return playerWeight + " kg" ;
        }

        const handleNullOutput = (playerStat: string) => {

            if(playerStat == null)
            {
                return "-"
            }

            return playerStat;
        }

        const cmToMeters = (centimeters: number): string => {
            return (centimeters / 100).toFixed(2);
        }

        // handle differently - separate API
        if(leagueID.indexOf("_RugbyViz") !== -1)
        {
            const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/players/'+playerID+'?provider=rugbyviz'
            const playerInfo = await fetch(apiString,).then((res) => res.json())

            const playerPosition = playerInfo.data.position;
            const playerDOB = new Date(playerInfo.data.dateOfBirth);
            const playerAge = calculateAge(playerDOB).toString()

            const playerHeight = handleNullHeightOutput(playerInfo.data.height);
            const playerWeight = handleNullWeightOutput(playerInfo.data.weight);

            const playerCountry = handleNullOutput(playerInfo.data.country);

            setModalPlayerPosition(playerPosition)
            setModalPlayerAge(playerAge)
            setModalPlayerDOB(formatDate(playerDOB))
            setModalPlayerHeight(playerHeight)
            setModalPlayerWeight(playerWeight)
            setModalPlayerCountry(playerCountry)
            const playerImageSrc = getPlayerImageSrc(leagueName, teamName, playerName)
            setModalPlayerImageSrc(playerImageSrc)
        }
        else if (id.indexOf("_PlanetRugbyAPI") !== -1) 
        {
            if(leagueName == "top14")
            {
                const teamID = getTeamInfo("championsCup", teamName)?.teamInfo.id;
                console.info(teamName)
                const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/teams/'+teamID+'/players?provider=rugbyviz&competitionId=1008&seasonId=202401&images=true'
                console.info(apiString)
                const teamPlayersInfo = await fetch(apiString,).then((res) => res.json())

                for (let index = 0; index < teamPlayersInfo.data.length; index++) {

                    if (teamPlayersInfo.data[index].knownName == playerName) {

                        const playerPosition = teamPlayersInfo.data[index].position;
                        const playerDOB = new Date(teamPlayersInfo.data[index].dateOfBirth);
                        const playerAge = calculateAge(playerDOB).toString()

                        const playerHeight = handleNullHeightOutput(teamPlayersInfo.data[index].height);
                        const playerWeight = handleNullWeightOutput(teamPlayersInfo.data[index].weight);

                        const playerCountry = handleNullOutput(teamPlayersInfo.data[index].country);
                        setModalPlayerPosition(playerPosition)
                        setModalPlayerAge(playerAge)
                        setModalPlayerDOB(formatDate(playerDOB))
                        setModalPlayerHeight(playerHeight)
                        setModalPlayerWeight(playerWeight)
                        setModalPlayerCountry(playerCountry)
                        break;
                    }
                }

            }

            const playerImageSrc = getPlayerImageSrc(leagueName, teamName, playerName)
            setModalPlayerImageSrc(playerImageSrc)
        }
        else if(id.indexOf("_WorldRugbyAPI") !== -1)
        {
            // get player image using id
            console.info(playerID)
            const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/player/'+playerID+'?language=en'
            const playerInfo = await fetch(apiString,).then((res) => res.json())

            console.info(playerInfo)

            //const playerPosition = playerInfo.data.position;
            const playerDOB = new Date(playerInfo.dob.millis);
            const playerAge = calculateAge(playerDOB).toString()

            const playerHeight = handleNullHeightOutput(playerInfo.height);
            const playerWeight = handleNullWeightOutput(playerInfo.weight);
            const playerCountry = handleNullOutput(playerInfo.country);
            //setModalPlayerPosition(playerPosition)

            setModalPlayerAge(playerAge)
            setModalPlayerDOB(formatDate(playerDOB))
            setModalPlayerHeight(playerHeight)
            setModalPlayerWeight(playerWeight)
            setModalPlayerCountry(playerCountry)
            const playerImageSrc = getPlayerImageSrc(leagueName, teamName, playerName)

            if(playerImageSrc.length === 0)
            {
                setModalPlayerImageSrc('https://www.rugbyworldcup.com/rwc2023/person-images-site/player-profile/'+ playerID +'.png')
            }
            else
            {
                setModalPlayerImageSrc(playerImageSrc)
            }
        }

        setModalPlayerName(playerName)
    }

    const snapPoints = ["58%"];

    const teamBkgRBGA = hexToRGB(modalTeamColour, '0.25')
    const teamBorderRBGA = hexToRGB(modalTeamColour, '0.7')

    const teamHandleRBGA = hexToRGB(modalTeamColour, '0.5')

    return(
        <GestureHandlerRootView>

        <BottomSheetModalProvider>
        <View style={defaultStyles.container}>

            {activityIndicatorHeader()}
            {lineupsRender(homeTeamInfo, awayTeamInfo, bottomSheetModalRef)}

            <BottomSheetModal 
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
            handleStyle={{backgroundColor: teamHandleRBGA, borderTopLeftRadius: 10, borderTopRightRadius: 10,
                 borderTopWidth: 1, borderTopColor: teamBorderRBGA, borderLeftWidth: 1, borderLeftColor: teamBorderRBGA, borderRightWidth: 1, borderRightColor: teamBorderRBGA}}
            handleIndicatorStyle={{backgroundColor: 'lightgrey'}}
            backgroundStyle={{backgroundColor: colors.background}}
            >
            <BottomSheetView style={{flex: 1, backgroundColor: teamBkgRBGA, flexDirection: 'row',
                 borderLeftWidth: 1, borderLeftColor: teamBorderRBGA, borderRightWidth: 1, borderRightColor: teamBorderRBGA}}>
                <ImageBackground resizeMode="cover" imageStyle={{opacity: 0.05}} 
                style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}} source={selectedTeam == "home" ? homeTeamInfo?.altLogo : awayTeamInfo?.altLogo} >
                <View style={{width: "45%", padding: 10}}>
                    <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 17, marginBottom: 10}}>{modalPlayerName.toUpperCase()}</Text>
                    <View style={{borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1, marginVertical: 4}}>
                        <Text style={{color: colors.text, fontFamily: fontFamilies.regular, paddingLeft: 1, paddingVertical: 3}}>{modalPlayerPosition.toUpperCase()}</Text>
                    </View>
                    <View style={{ marginVertical: 6, flexDirection: 'row', gap: 14 }}>
                        <View style={{marginHorizontal: 2}}>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 13}}>AGE</Text>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.light}}>{modalPlayerAge}</Text>
                        </View>
                        <View>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 13}}>DATE OF BIRTH</Text>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.light}}>{modalPlayerDOB}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 6, flexDirection: 'row', gap: 14 }}>
                        <View style={{marginHorizontal: 2}}>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 13}}>HEIGHT</Text>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.light}}>{modalPlayerHeight}</Text>
                        </View>
                        <View>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 13}}>WEIGHT</Text>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.light}}>{modalPlayerWeight}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: 6, flexDirection: 'row', gap: 14 }}>
                        <View style={{marginHorizontal: 2}}>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 13}}>BIRTHPLACE</Text>
                            <Text style={{color: colors.text, fontFamily: fontFamilies.light}}>{modalPlayerCountry}</Text>
                        </View>
                    </View>
                
                </View>
                 <View style={{width: "55%", alignItems: 'center'}}>
                    <View style={{padding: 4, margin: 4, marginTop: 25}}>
                        <Image style={{width: 210, height: 210, opacity: 1, resizeMode:'contain'}} src={modalPlayerImageSrc}/>
                        <View style={{position: 'absolute', borderBottomLeftRadius: 7, borderBottomRightRadius: 7,
                             top: 190, bottom: 0, left: 18, right: 18, backgroundColor: modalTeamColour}}>
                            <Text style={{textAlign: 'center', color: colors.text,
                                 fontFamily: fontFamilies.bold, fontSize: 14}}>{modalPlayerName.toUpperCase().trim().split(" ")[1]}</Text>
                        </View>
                    </View>
                 </View>
                </ImageBackground>
                
            </BottomSheetView>
            </BottomSheetModal>
        </View>
        </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}


export default Lineups;