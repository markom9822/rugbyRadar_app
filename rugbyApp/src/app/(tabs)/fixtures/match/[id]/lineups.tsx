import { View, Text, TouchableOpacity, ViewStyle, FlatList } from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { colors, fontSize } from "@/constants/tokens";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { defaultStyles } from "@/styles";


export type LineUpInfo = {
    homeTeamPlayer: string,
    homeTeamPlayerPosition: string,
    homeTeamPlayerNum: string,
}


const Lineups = () => {

    const [matchesArray, setMatchesArray] = useState<LineUpInfo[]>([]);


    const {id} = useGlobalSearchParams();

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/289234/summary?contentorigin=espn&event=' + id + '&lang=en&region=gb';

        const matchDetails = await fetch( apiString,).then((res) => res.json())
        const rosterLength = matchDetails.rosters[0].roster.length;
        console.info(rosterLength)

        const playerName = matchDetails.boxscore.players[0].statistics[0].athletes[0].athlete.displayName;

        var newArray = [];

        for (let index = 0; index < rosterLength; index++) {

            //const matchTitle = todaysMatches.scores[0].events[index].name;
            //const matchType = todaysMatches.scores[0].events[index].season.slug;
            //const matchVenue = todaysMatches.scores[0].events[index].competitions[0].venue.fullName;
            //const matchID = todaysMatches.scores[0].events[index].id;

            const playerName = matchDetails.rosters[0].roster[index].athlete.displayName;
            const playerNumber = matchDetails.rosters[0].roster[index].jersey;

            const playerPosition = matchDetails.rosters[0].roster[index].position.displayName;


            let newMatchInfo = {
                homeTeamPlayer: playerName,
                homeTeamPlayerPosition: playerPosition,
                homeTeamPlayerNum: playerNumber,
             };

            newArray.push(newMatchInfo)
        }

        // need to remove duplicates

        const filteredArray = Array.from(new Set(newArray));

        console.info(filteredArray)
        setMatchesArray(filteredArray)
    }

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
            
            <FlatList data={matchesArray}
            renderItem={({item, index}) =>
            <LineupPlayerPanel
            key={index}
            homeTeamPlayer={item.homeTeamPlayer}
            homeTeamPlayerPosition={item.homeTeamPlayerPosition}
            homeTeamPlayerNum={item.homeTeamPlayerNum}/>}
            />

        </View>
    )
}

type LineupPlayerPanelProps = {
    homeTeamPlayer: string
    homeTeamPlayerPosition: string,
    homeTeamPlayerNum: string,
}


export const LineupPlayerPanel = ({ homeTeamPlayer, homeTeamPlayerPosition, homeTeamPlayerNum }: LineupPlayerPanelProps) => {
    return(
        <View>
            <Text>{homeTeamPlayerNum} : {homeTeamPlayer} - {homeTeamPlayerPosition}</Text>
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