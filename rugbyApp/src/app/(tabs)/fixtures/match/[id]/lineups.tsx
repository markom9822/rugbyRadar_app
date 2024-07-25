import { View, Text, TouchableOpacity, ViewStyle, FlatList, Image } from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { colors, fontSize } from "@/constants/tokens";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { defaultStyles, lineupPanelStyles } from "@/styles";
import { getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase";


export type LineUpInfo = {
    teamPlayer: string,
    teamPlayerPosition: string,
    teamPlayerNum: string,
}

export type AllLineUpsInfo = {
    hometeamPlayer: string,
    hometeamPlayerPosition: string,
    hometeamPlayerNum: string,
    awayteamPlayer: string,
    awayteamPlayerPosition: string,
    awayteamPlayerNum: string,
}

export const getLineup = (matchDetails: any, rosterIndex: number) => {

    const rosterLength = matchDetails.rosters[rosterIndex].roster.length;

    var newArray = [];

    for (let index = 0; index < rosterLength; index++) {

        const playerName = matchDetails.rosters[rosterIndex].roster[index].athlete.displayName;
        const playerNumber = matchDetails.rosters[rosterIndex].roster[index].jersey.replace(/\s/g, "");;

        const playerPosition = matchDetails.rosters[rosterIndex].roster[index].position.displayName;

        let newLineupInfo = {
            teamPlayer: playerName,
            teamPlayerPosition: playerPosition,
            teamPlayerNum: playerNumber,
            };

        newArray.push(newLineupInfo)
    }

    return(
        newArray
    )
}


const Lineups = () => {

    const [homeTeamName, setHomeTeamName] = useState<string>('');
    const [awayTeamName, setAwayTeamName] = useState<string>('');

    const [allLineupsArray, setAllLineupsArray] = useState<AllLineUpsInfo[]>([]);


    const {id} = useGlobalSearchParams();

    const unique = <T extends { [key: string]: unknown }>(arr: T[], key: string): T[] => [   ...new Map(arr.map((item: T) => [item[key], item])).values() ];

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/289234/summary?contentorigin=espn&event=' + id + '&lang=en&region=gb';

        const matchDetails = await fetch( apiString,).then((res) => res.json())

        const homeLineup = getLineup(matchDetails, 0)
        const awayLineup = getLineup(matchDetails, 1)

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

        var combinedArray = [];

        for (let index = 0; index < 23; index++) {
    
            let newCombinedInfo = {
                hometeamPlayer: homeSortedArray[index].teamPlayer,
                hometeamPlayerPosition: homeSortedArray[index].teamPlayerPosition,
                hometeamPlayerNum: homeSortedArray[index].teamPlayerNum,

                awayteamPlayer: awaySortedArray[index].teamPlayer,
                awayteamPlayerPosition: awaySortedArray[index].teamPlayerPosition,
                awayteamPlayerNum: awaySortedArray[index].teamPlayerNum,

            };
    
            combinedArray.push(newCombinedInfo)
        }

        //console.info(homeLineup)
        //console.info(awayLineup)

        setHomeTeamName(homeTeam)
        setAwayTeamName(awayTeam)

        setAllLineupsArray(combinedArray)
    }

    const homeTeamInfo = getInternationalTeamInfoFromName(homeTeamName);
    const awayTeamInfo = getInternationalTeamInfoFromName(awayTeamName);


    return(
        <View style={defaultStyles.container}>
            <Text>Lineups Page: {id}</Text>
            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

            <View style={lineupPanelStyles.container}>
                <View style={{width: "50%", backgroundColor: 'red', flexDirection: 'row'}}>
                    <Image source={homeTeamInfo.logo} 
                    style={lineupPanelStyles.teamLogo}/>
                    <Text style={lineupPanelStyles.teamName}>{homeTeamName}</Text>
                </View>

                <View style={{width: "50%", backgroundColor: 'yellow', flexDirection: 'row'}}>
                    <Image source={awayTeamInfo.logo} 
                    style={lineupPanelStyles.teamLogo}/>
                    <Text style={lineupPanelStyles.teamName}>{awayTeamName}</Text>
                </View>
            </View>
            
            <FlatList data={allLineupsArray}
            renderItem={({item, index}) =>
            <LineupPlayerPanel
            key={index}
            hometeamPlayer={item.hometeamPlayer}
            hometeamPlayerPosition={item.hometeamPlayerPosition}
            hometeamPlayerNum={item.hometeamPlayerNum}
            awayteamPlayer={item.awayteamPlayer}
            awayteamPlayerPosition={item.awayteamPlayerPosition}
            awayteamPlayerNum={item.awayteamPlayerNum}/>}
            />

        </View>
    )
}

type LineupPlayerPanelProps = {
    hometeamPlayer: string,
    hometeamPlayerPosition: string,
    hometeamPlayerNum: string,
    awayteamPlayer: string,
    awayteamPlayerPosition: string,
    awayteamPlayerNum: string,
}


export const LineupPlayerPanel = ({ hometeamPlayer, hometeamPlayerPosition, hometeamPlayerNum,
     awayteamPlayer, awayteamPlayerPosition, awayteamPlayerNum }: LineupPlayerPanelProps) => {

    return(
        <View style={lineupPanelStyles.container}>
            <Text style={{width: "50%", backgroundColor: 'red'}}>{hometeamPlayerNum} : {hometeamPlayer}</Text>
            <Text style={{width: "50%", backgroundColor: 'yellow'}}>{awayteamPlayerNum} : {awayteamPlayer}</Text>
        </View>
    )
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