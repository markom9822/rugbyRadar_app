import { View, Text, TouchableOpacity, ViewStyle, FlatList, Image } from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { colors, fontSize } from "@/constants/tokens";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { defaultStyles, lineupPanelStyles } from "@/styles";
import { getLeagueName, hexToRGB } from "@/store/utils/helpers";
import { getAnyHomeAwayTeamInfo, getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { TeamInfo } from "@/app/(tabs)/(teams)/team/[teamID]";


export type LineUpInfo = {
    teamPlayer: string,
    teamPlayerPosition: string,
    teamPlayerNum: string,
    isPlayerCaptain: boolean
}

export type AllLineUpsInfo = {
    hometeamPlayer: string,
    hometeamPlayerPosition: string,
    hometeamPlayerNum: string,
    isHomePlayerCaptain: boolean,

    awayteamPlayer: string,
    awayteamPlayerPosition: string,
    awayteamPlayerNum: string,
    isAwayPlayerCaptain: boolean,
}

export const getLineup = (matchDetails: any, rosterIndex: number) => {

    if(matchDetails.rosters[rosterIndex].roster === undefined)
    {
        var blankArray = [];

        for (let index = 0; index < 23; index++) {
            let blankLineupInfo = {
                teamPlayer: '-',
                teamPlayerPosition: '-',
                teamPlayerNum: index + 1,
                isPlayerCaptain: false,
                };
    
            blankArray.push(blankLineupInfo)
        }

        return(
            blankArray
        )
    } 

    const rosterLength = matchDetails.rosters[rosterIndex].roster.length;

    var newArray = [];

    for (let index = 0; index < rosterLength; index++) {

        const playerName = matchDetails.rosters[rosterIndex].roster[index].athlete.displayName;
        const playerNumber = matchDetails.rosters[rosterIndex].roster[index].jersey.replace(/\s/g, "");

        const playerPosition = matchDetails.rosters[rosterIndex].roster[index].position.displayName;
        const isPlayerCaptain = matchDetails.rosters[rosterIndex].roster[index].captain;

        let newLineupInfo = {
            teamPlayer: playerName,
            teamPlayerPosition: playerPosition,
            teamPlayerNum: playerNumber,
            isPlayerCaptain: isPlayerCaptain,
            };

        newArray.push(newLineupInfo)
    }

    console.info(newArray)

    return(
        newArray
    )
}

export const getLineupRugbyViz = (matchDetails: any, isHome: boolean) => {

    const targetRoster = isHome ? matchDetails.data.homeTeam.players : matchDetails.data.awayTeam.players

    if (targetRoster === null) {
        var blankArray = [];

        for (let index = 0; index < 23; index++) {
            let blankLineupInfo = {
                teamPlayer: '-',
                teamPlayerPosition: '-',
                teamPlayerNum: index + 1,
                isPlayerCaptain: false,
            };

            blankArray.push(blankLineupInfo)
        }

        return (
            blankArray
        )
    } 

    var newArray = [];

    for (let index = 0; index < targetRoster.length; index++) {

        const playerName = targetRoster[index].name;
        const playerNumber = targetRoster[index].positionId;

        const playerPosition = targetRoster[index].position;
        const isPlayerCaptain = targetRoster[index].captain;

        let newLineupInfo = {
            teamPlayer: playerName,
            teamPlayerPosition: playerPosition,
            teamPlayerNum: playerNumber,
            isPlayerCaptain: isPlayerCaptain,
            };

        newArray.push(newLineupInfo)
    }

    console.info(newArray)

    return(
        newArray
    )
}


const Lineups = () => {

    const [homeTeamName, setHomeTeamName] = useState<string>('');
    const [awayTeamName, setAwayTeamName] = useState<string>('');
    const [selectedTeam, setSelectedTeam] = useState<string>('home');

    const [allLineupsArray, setAllLineupsArray] = useState<AllLineUpsInfo[]>([]);
    const [leagueName, setLeagueName] = useState<string>('');


    const {id} = useGlobalSearchParams();
    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6);

    const unique = <T extends { [key: string]: unknown }>(arr: T[], key: string): T[] => [   ...new Map(arr.map((item: T) => [item[key], item])).values() ];

    const combineLineupArrays = (homeSortedArray: LineUpInfo[], awaySortedArray: LineUpInfo[]) => {

        const playerCount = Math.floor((homeSortedArray.length + awaySortedArray.length)/2)
        console.info(playerCount)

        var combinedArray = [];

        for (let index = 0; index < playerCount; index++) {
    
            let newCombinedInfo = {
                hometeamPlayer: homeSortedArray[index].teamPlayer,
                hometeamPlayerPosition: homeSortedArray[index].teamPlayerPosition,
                hometeamPlayerNum: homeSortedArray[index].teamPlayerNum,
                isHomePlayerCaptain: homeSortedArray[index].isPlayerCaptain,

                awayteamPlayer: awaySortedArray[index].teamPlayer,
                awayteamPlayerPosition: awaySortedArray[index].teamPlayerPosition,
                awayteamPlayerNum: awaySortedArray[index].teamPlayerNum,
                isAwayPlayerCaptain: awaySortedArray[index].isPlayerCaptain,
            };
    
            combinedArray.push(newCombinedInfo)
        }

        // add subs header
        const subsHeadingInfo = {
            hometeamPlayer: 'Substitutes',
            hometeamPlayerPosition: '',
            hometeamPlayerNum: '',
            isHomePlayerCaptain: false,

            awayteamPlayer: 'Substitutes',
            awayteamPlayerPosition: '',
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

        // handle differently - separate API
        if(leagueID.indexOf("_RugbyViz") !== -1)
        {
            const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/' + eventID + '?provider=rugbyviz';

            const matchDetails = await fetch(apiString,).then((res) => res.json())
            const homeTeam = matchDetails.data.homeTeam.shortName;
            const awayTeam = matchDetails.data.awayTeam.shortName;
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
            return;
        }

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';
        const matchDetails = await fetch( apiString,).then((res) => res.json())
        const homeTeam = matchDetails.rosters[0].team.displayName;
        const awayTeam = matchDetails.rosters[1].team.displayName;
        setHomeTeamName(homeTeam)
        setAwayTeamName(awayTeam)
        setLeagueName(getLeagueName(leagueID));

        const homeLineup = getLineup(matchDetails, 0)
        const awayLineup = getLineup(matchDetails, 1)

        console.info('Home Team Lineup')
        console.info(homeLineup)

        // need to remove duplicates
        const homeUniqueArray = unique(homeLineup, 'teamPlayerNum')
        // sort in jersey number order
        const homeSortedArray = homeUniqueArray.sort((a,b) => a.teamPlayerNum - b.teamPlayerNum);

        // need to remove duplicates
        const awayUniqueArray = unique(awayLineup, 'teamPlayerNum')
        // sort in jersey number order
        const awaySortedArray = awayUniqueArray.sort((a,b) => a.teamPlayerNum - b.teamPlayerNum);
        
        const combinedArray = combineLineupArrays(homeSortedArray, awaySortedArray)
        setAllLineupsArray(combinedArray)
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

        if (homeTeamInfo == undefined || awayTeamInfo == undefined) {
            return (
                <></>
            )
        }
        else {

            const homeTeamBkgRBGA = hexToRGB(homeTeamInfo.colour, '0.3')
            const homeTeamBorderRBGA = hexToRGB(homeTeamInfo.colour, '0.9')

            const awayTeamBkgRBGA = hexToRGB(awayTeamInfo.colour, '0.3')
            const awayTeamBorderRBGA = hexToRGB(awayTeamInfo.colour, '0.9')

            return (
                <>
                    <View style={[lineupPanelStyles.container, { borderBottomColor: 'lightgrey', borderBottomWidth: 1, paddingVertical: 8 }]}>
                        <TouchableOpacity onPress={() => setSelectedTeam('home')}
                            style={[lineupPanelStyles.teamHeader,
                            {
                                backgroundColor: (selectedTeam === "home") ? (homeTeamBkgRBGA) : (colors.background),
                                borderColor: (selectedTeam === "home") ? homeTeamBorderRBGA : 'grey', borderWidth: (selectedTeam === "home") ? 2 : 1, justifyContent: 'center'
                            }]}>
                            <View style={{ padding: 5 }}>
                                <Image source={(selectedTeam === "home") ? homeTeamInfo.logo : homeTeamInfo.altLogo}
                                    style={lineupPanelStyles.teamLogo} />
                            </View>

                            <Text style={[lineupPanelStyles.teamName, { color: colors.text }]}>{homeTeamInfo.abbreviation}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => setSelectedTeam('away')}
                            style={[lineupPanelStyles.teamHeader, {
                                backgroundColor: (selectedTeam === "away") ? (awayTeamBkgRBGA) : (colors.background),
                                borderColor: (selectedTeam === "away") ? awayTeamBorderRBGA : 'grey', borderWidth: (selectedTeam === "away") ? 2 : 1, justifyContent: 'center'
                            }]}>
                            <View style={{ padding: 5 }}>
                                <Image source={(selectedTeam === "away") ? awayTeamInfo.logo : awayTeamInfo.altLogo}
                                    style={lineupPanelStyles.teamLogo} />
                            </View>

                            <Text style={[lineupPanelStyles.teamName, { color: colors.text }]}>{awayTeamInfo.abbreviation}</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList data={allLineupsArray}
                        renderItem={({ item, index }) =>
                            <LineupPlayerPanel
                                key={index}
                                selectedTeam={selectedTeam}
                                hometeamPlayer={item.hometeamPlayer}
                                hometeamPlayerPosition={item.hometeamPlayerPosition}
                                hometeamPlayerNum={item.hometeamPlayerNum}
                                isHomePlayerCaptain={item.isHomePlayerCaptain}
                                awayteamPlayer={item.awayteamPlayer}
                                awayteamPlayerPosition={item.awayteamPlayerPosition}
                                awayteamPlayerNum={item.awayteamPlayerNum}
                                isAwayPlayerCaptain={item.isAwayPlayerCaptain}
                                teamColour={(selectedTeam === "home") ? homeTeamInfo.colour : awayTeamInfo.colour}
                                isLastItem={findLastItem(allLineupsArray, index)}
                            />}
                    />
                </>

            )
        }

    }

    return(
        <View style={defaultStyles.container}>
            <Text style={{color: colors.text}}>Event ID: {eventID}</Text>
            <Text style={{color: colors.text}}>League ID: {leagueID}</Text>
            <Text style={{color: colors.text}}>League Name: {leagueName}</Text>

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5',
             height: 60
            }}
            onPressButton={handlePressFetchData}
            />

            {lineupsRender(homeTeamInfo, awayTeamInfo)}

        </View>
    )
}

type LineupPlayerPanelProps = {
    selectedTeam: string,
    hometeamPlayer: string,
    hometeamPlayerPosition: string,
    hometeamPlayerNum: string,
    isHomePlayerCaptain: boolean,
    awayteamPlayer: string,
    awayteamPlayerPosition: string,
    awayteamPlayerNum: string,
    isAwayPlayerCaptain: boolean,
    teamColour: string,
    isLastItem: boolean,
}


export const LineupPlayerPanel = ({ selectedTeam, hometeamPlayer, hometeamPlayerPosition, hometeamPlayerNum, isHomePlayerCaptain,
     awayteamPlayer, awayteamPlayerPosition, awayteamPlayerNum, isAwayPlayerCaptain, teamColour, isLastItem }: LineupPlayerPanelProps) => {

    var playerName = ''
    var playerNumber = ''
    var isCaptain = false;
    if(selectedTeam == 'home')
    {
        playerName = hometeamPlayer;
        playerNumber = hometeamPlayerNum;
        isCaptain = isHomePlayerCaptain;
    }
    else
    {
        playerName = awayteamPlayer;
        playerNumber = awayteamPlayerNum;
        isCaptain = isAwayPlayerCaptain;
    }

    const panelBackground = hexToRGB(teamColour, '0.1')


    if (hometeamPlayer === "Substitutes") {
        return (
            <View style={{flexDirection: 'row', backgroundColor: panelBackground}}>
                <Text style={[lineupPanelStyles.substitutesHeader]}>{playerName.toUpperCase()}</Text>
            </View>
        )
    }
    else {
        return (
            <View style={[{flexDirection: 'row', backgroundColor: panelBackground, paddingVertical: 4, borderBottomColor: 'grey', borderBottomWidth: 1, marginBottom: isLastItem ? 50: 0}]}>
                <Text style={{fontWeight: 500, paddingHorizontal: 4, fontSize: 12, color: colors.text, width: "8%", textAlign: 'right'}}>
                    {playerNumber}
                </Text>
                <Text style={{fontWeight: 500, paddingHorizontal: 6, fontSize: 12, color: colors.text, textAlign: 'left', width: "92%"}}>
                    {playerName.toUpperCase()} {(isCaptain) ? '(c)' : ''}</Text>
            </View>
        )
    }
}

type FetchDataButtonProps = {
	style?: ViewStyle
	iconSize?: number
    onPressButton: () => void
}

export const FetchDataButton = ({ style, iconSize = 48, onPressButton}: FetchDataButtonProps) => {

    return (
    <View style={[{ height: 50}, style]}>
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPressButton}
        >
            <MaterialCommunityIcons name="rugby" size={iconSize} color={colors.text} />
            <Text style={{
                fontSize: fontSize.base,
                color: colors.text,
                backgroundColor: '#4287f5',
            }}>Fetch Lineup Data</Text>
        </TouchableOpacity>
    </View>
    )
}

export default Lineups;