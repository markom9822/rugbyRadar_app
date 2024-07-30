import { colors, fontSize } from "@/constants/tokens";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { useState } from "react";
import { summaryPanelStyles } from "@/styles";

export type MatchInfo = {
    homeTeamName: string,
    awayTeamName: string,
    homeTeamPossession: string,
    awayTeamPossession: string,
    homeTeamTries: string,
    awayTeamTries: string,
    homeTeamTackles: string,
    awayTeamTackles: string,
    homeTeamMetres: string,
    awayTeamMetres: string,

    matchVenue: string,
    matchAttendance: string,
}

export const getMatchInfo = (matchDetails: any) => {

    const homeTeamName = matchDetails.boxscore.teams[0].team.displayName;
    const awayTeamName = matchDetails.boxscore.teams[1].team.displayName;

    const homeTeamPossession = matchDetails.boxscore.teams[0].statistics[0].stats[20].value;
    const awayTeamPossession = matchDetails.boxscore.teams[1].statistics[0].stats[20].value;

    const homeTeamTries = matchDetails.boxscore.teams[0].statistics[0].stats[31].value
    const awayTeamTries = matchDetails.boxscore.teams[1].statistics[0].stats[31].value

    const homeTeamTackles = matchDetails.boxscore.teams[0].statistics[0].stats[27].value
    const awayTeamTackles = matchDetails.boxscore.teams[1].statistics[0].stats[27].value

    const homeTeamMetres = matchDetails.boxscore.teams[0].statistics[0].stats[10].value
    const awayTeamMetres = matchDetails.boxscore.teams[1].statistics[0].stats[10].value

    const matchVenue = matchDetails.gameInfo.venue.fullName;
    const matchAttendance = matchDetails.gameInfo.attendance;

    const newArray = [
        {
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            homeTeamPossession: homeTeamPossession,
            awayTeamPossession: awayTeamPossession,
            homeTeamTries: homeTeamTries,
            awayTeamTries: awayTeamTries,
            homeTeamTackles: homeTeamTackles,
            awayTeamTackles: awayTeamTackles,
            homeTeamMetres: homeTeamMetres,
            awayTeamMetres: awayTeamMetres,

            matchVenue: matchVenue,
            matchAttendance: matchAttendance,
        
        }
    ];

    return(
        newArray
    )
}

const MatchSummary = () => {

    const [matchInfoArray, setMatchInfoArray] = useState<MatchInfo[] | undefined>();


    const {id} = useLocalSearchParams();
    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6)

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';

        const matchDetails = await fetch( apiString,).then((res) => res.json())

        console.info(matchDetails.boxscore.teams[0].team.displayName)

        const matchInfo = getMatchInfo(matchDetails)
        setMatchInfoArray(matchInfo)
    }

    return(
        <View>
            <Text>Event ID: {eventID}</Text>
            <Text>League ID: {leagueID}</Text>

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

            <GameInfoPanel 
            matchInfoArray={matchInfoArray}
            matchID={id} />

        </View>
    )
}

type GameInfoPanelProps = {
	matchInfoArray: MatchInfo[] | undefined,
    matchID: string | string[] | undefined,
}

export const GameInfoPanel = ({ matchInfoArray, matchID}: GameInfoPanelProps) => {

    if(matchInfoArray == undefined) return

    return (
        <View style={[summaryPanelStyles.container]}>
            <Text style={[summaryPanelStyles.matchName]}>
                {matchInfoArray[0].homeTeamName} v {matchInfoArray[0].awayTeamName}
            </Text>

            <Text>Game Info</Text>
            <Text>Venue: {matchInfoArray[0].matchVenue}</Text>
            <Text>Attendance: {matchInfoArray[0].matchAttendance}</Text>

            <Text>Match Stats</Text>

            <Text>Possession:</Text>
            <Text>{matchInfoArray[0].homeTeamName}: {matchInfoArray[0].homeTeamPossession} </Text>
            <Text>{matchInfoArray[0].awayTeamName}: {matchInfoArray[0].awayTeamPossession} </Text>

            <Text>{matchInfoArray[0].homeTeamTries} Tries {matchInfoArray[0].awayTeamTries}</Text>
            <Text>{matchInfoArray[0].homeTeamTackles} Tackles {matchInfoArray[0].awayTeamTackles}</Text>
            <Text>{matchInfoArray[0].homeTeamMetres} Metres Run {matchInfoArray[0].awayTeamMetres}</Text>

            <Link style={[summaryPanelStyles.statsLink]} href={`/(tabs)/fixtures/match/${matchID}/stats`}>Full Match Stats</Link>
            
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
            }}>Fetch Summary Data</Text>
        </TouchableOpacity>
    </View>
    )
}

export default MatchSummary;