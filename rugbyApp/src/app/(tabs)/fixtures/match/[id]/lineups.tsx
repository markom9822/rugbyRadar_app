import { View, Text, TouchableOpacity, ViewStyle, FlatList, Image } from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { colors, fontSize } from "@/constants/tokens";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { defaultStyles, lineupPanelStyles } from "@/styles";
import { getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase";
import { getLeagueName } from "@/store/utils/helpers";
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";


export type LineUpInfo = {
    teamPlayer: string,
    teamPlayerPosition: string,
    teamPlayerNum: string,
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
        const playerNumber = matchDetails.rosters[rosterIndex].roster[index].jersey.replace(/\s/g, "");;

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


const Lineups = () => {

    const [homeTeamName, setHomeTeamName] = useState<string>('');
    const [awayTeamName, setAwayTeamName] = useState<string>('');

    const [allLineupsArray, setAllLineupsArray] = useState<AllLineUpsInfo[]>([]);


    const {id} = useGlobalSearchParams();
    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6);
    const leagueName = getLeagueName(leagueID);

    const unique = <T extends { [key: string]: unknown }>(arr: T[], key: string): T[] => [   ...new Map(arr.map((item: T) => [item[key], item])).values() ];

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';

        const matchDetails = await fetch( apiString,).then((res) => res.json())

        const homeLineup = getLineup(matchDetails, 0)
        const awayLineup = getLineup(matchDetails, 1)

        console.info('Home Team Lineup')
        console.info(homeLineup)

        const homeTeam = matchDetails.rosters[0].team.displayName;
        const awayTeam = matchDetails.rosters[1].team.displayName;

        // need to remove duplicates
        const homeUniqueArray = unique(homeLineup, 'teamPlayerNum')
        // sort in jersey number order
        const homeSortedArray = homeUniqueArray.sort((a,b) => a.teamPlayerNum - b.teamPlayerNum);

        // need to remove duplicates
        const awayUniqueArray = unique(awayLineup, 'teamPlayerNum')
        // sort in jersey number order
        const awaySortedArray = awayUniqueArray.sort((a,b) => a.teamPlayerNum - b.teamPlayerNum);

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

        setHomeTeamName(homeTeam)
        setAwayTeamName(awayTeam)

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

        console.info(combinedArray)

        setAllLineupsArray(combinedArray)
    }

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeamName, awayTeamName);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return
    if(homeTeamInfo === undefined) return
    if(awayTeamInfo === undefined) return

    return(
        <View style={defaultStyles.container}>
            <Text>Event ID: {eventID}</Text>
            <Text>League ID: {leagueID}</Text>


            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5',
             height: 60
            }}
            onPressButton={handlePressFetchData}
            />

            <View style={lineupPanelStyles.container}>
                <View style={ [lineupPanelStyles.teamHeader, {borderRightWidth: 2, borderRightColor: 'grey'}]}>
                    <Image source={homeTeamInfo.logo} 
                    style={lineupPanelStyles.teamLogo}/>
                    <Text style={lineupPanelStyles.teamName}>{homeTeamInfo.abbreviation}</Text>
                </View>

                <View style={[lineupPanelStyles.teamHeader]}>
                    <Image source={awayTeamInfo.logo} 
                    style={lineupPanelStyles.teamLogo}/>
                    <Text style={lineupPanelStyles.teamName}>{awayTeamInfo.abbreviation}</Text>
                </View>
            </View>
            
            <FlatList data={allLineupsArray}
            renderItem={({item, index}) =>
            <LineupPlayerPanel
            key={index}
            hometeamPlayer={item.hometeamPlayer}
            hometeamPlayerPosition={item.hometeamPlayerPosition}
            hometeamPlayerNum={item.hometeamPlayerNum}
            isHomePlayerCaptain={item.isHomePlayerCaptain}
            awayteamPlayer={item.awayteamPlayer}
            awayteamPlayerPosition={item.awayteamPlayerPosition}
            awayteamPlayerNum={item.awayteamPlayerNum}
            isAwayPlayerCaptain={item.isAwayPlayerCaptain}/>}
            />

        </View>
    )
}

type LineupPlayerPanelProps = {
    hometeamPlayer: string,
    hometeamPlayerPosition: string,
    hometeamPlayerNum: string,
    isHomePlayerCaptain: boolean,
    awayteamPlayer: string,
    awayteamPlayerPosition: string,
    awayteamPlayerNum: string,
    isAwayPlayerCaptain: boolean,
}


export const LineupPlayerPanel = ({ hometeamPlayer, hometeamPlayerPosition, hometeamPlayerNum, isHomePlayerCaptain,
     awayteamPlayer, awayteamPlayerPosition, awayteamPlayerNum, isAwayPlayerCaptain }: LineupPlayerPanelProps) => {

    const homePlayerWeight = (isHomePlayerCaptain) ? ('600'):('300');
    const awayPlayerWeight = (isAwayPlayerCaptain) ? ('600'):('300');

    const homeCaptainText = (isHomePlayerCaptain) ? ('(c)'):('');
    const awayCaptainText = (isAwayPlayerCaptain) ? ('(c)'):('');


    if (hometeamPlayer === "Substitutes") {
        return (
            <View style={lineupPanelStyles.container}>
                <Text style={[lineupPanelStyles.substitutesHeader, {borderRightColor: 'grey', borderRightWidth: 2}]}>{hometeamPlayer}</Text>
                <Text style={[lineupPanelStyles.substitutesHeader]}>{awayteamPlayer}</Text>
            </View>
        )
    }
    else {
        return (
            <View style={lineupPanelStyles.container}>
                <Text style={[lineupPanelStyles.playerInfo, {fontWeight: homePlayerWeight, borderRightColor: 'grey', borderRightWidth: 2}]}>{hometeamPlayerNum} : {hometeamPlayer} {homeCaptainText}</Text>
                <Text style={[lineupPanelStyles.playerInfo, {fontWeight: awayPlayerWeight}]}>{awayteamPlayerNum} : {awayteamPlayer} {awayCaptainText}</Text>
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