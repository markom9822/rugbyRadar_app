import { View, Text, TouchableOpacity, ViewStyle, StyleSheet, Image, ScrollView, FlatList } from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { getLeagueName } from "@/store/utils/helpers";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens";
import { getHomeAwayTeamInfo, getTeamInfo } from "@/store/utils/getTeamInfo";
import { useState } from "react";
import { StatsPanel, StatsInfo } from "@/store/components/StatsPanel";
import { getFullMatchStats } from "@/store/utils/getFullMatchStats";
import { TeamEventsPanel, TeamEventStatsInfo } from "@/store/components/TeamEventsPanel";
import { getHeadToHeadStats } from "@/store/utils/getHeadToHeadStats";
import { getTeamFormStats } from "@/store/utils/getTeamFormStats";
import { DropGoalIcon, RedCardIcon, RugbyPostsIcon, RugbyTryIcon, YellowCardIcon } from "@/store/Icons/Icons";


export const getKeyEventIcon = (eventType: string) => {
    switch(eventType) { 
        case 'conversion': return RugbyPostsIcon
        case 'penalty goal': return RugbyPostsIcon
        case 'try': return RugbyTryIcon
        case 'yellow card': return YellowCardIcon
        case 'red card': return RedCardIcon
        case 'drop goal': return DropGoalIcon


        default: { 
           break; 
        } 
     } 
}

export const getKeyEvents = (matchStats: any) => {

    var keyEventsArray = [];

    const keyEventsLength = matchStats.header.competitions[0].details.length;

    for (let index = 0; index < keyEventsLength; index++) {

        const eventTime = matchStats.header.competitions[0].details[index].clock.displayValue;
        const eventType = matchStats.header.competitions[0].details[index].type.text;
        const eventPlayer = matchStats.header.competitions[0].details[index].participants[0].athlete.displayName;
        const homeScore = matchStats.header.competitions[0].details[index].homeScore;
        const awayScore = matchStats.header.competitions[0].details[index].awayScore;
        const eventTeam = matchStats.header.competitions[0].details[index].team.displayName;

        const eventIcon = getKeyEventIcon(eventType);

        const typeCheck = eventType === "try" || eventType === "conversion"
         || eventType === "penalty goal" || eventType === "drop goal" || 
         eventType === "yellow card" || eventType === "red card"

        if (typeCheck) {

            const newArray = {
                eventTime: eventTime,
                eventType: eventType,
                eventPlayer: eventPlayer,
                eventScore: `${homeScore} - ${awayScore}`,
                eventTeam: eventTeam,
                eventIcon: eventIcon,
            };

            keyEventsArray.push(newArray)
        }

    }


    return(
        keyEventsArray
    )

}


const MatchSummary = () => {
    const [matchStatsArray, setMatchStatsArray] = useState<StatsInfo[] | undefined>();
    const [headToHeadStatsArray, setHeadToHeadStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [mainTeamFormStatsArray, setMainTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [opponentTeamFormStatsArray, setOpponentTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();

    const [keyEventsArray, setKeyEventsArray] = useState<KeyEventsInfo[] | undefined>();

    const [mainTeamName, setMainTeamName] = useState<string | undefined>();
    const [opponentTeamName, setOpponentTeamName] = useState<string | undefined>();


    const {id} = useGlobalSearchParams();

    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6)
    const leagueName = getLeagueName(leagueID);

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';

        const statsDetails = await fetch( apiString,).then((res) => res.json())

        console.info(statsDetails.boxscore.teams[0].team.displayName)

        const matchStats = getFullMatchStats(statsDetails)
        const headToHeadStats = getHeadToHeadStats(statsDetails)

        const mainTeamFormStats = getTeamFormStats(statsDetails, 0)
        const opponentTeamFormStats = getTeamFormStats(statsDetails, 1)

        const keyEvents = getKeyEvents(statsDetails)

        setMatchStatsArray(matchStats)
        setHeadToHeadStatsArray(headToHeadStats)
        setMainTeamFormStatsArray(mainTeamFormStats)
        setOpponentTeamFormStatsArray(opponentTeamFormStats)
        setKeyEventsArray(keyEvents)

        setMainTeamName(statsDetails.boxscore.teams[0].team.displayName)
        setOpponentTeamName(statsDetails.boxscore.teams[1].team.displayName)
    }

    return(
        <View style={{flex: 1}}>
            <Text>Event ID: {eventID}</Text>
            <Text>League ID: {leagueID}</Text>

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

            <ScrollView >
                <StatsPanel
                matchInfoArray={matchStatsArray}
                matchID={id}
                leagueName={leagueName} />

                <KeyEventsPanel
                keyEventArray={keyEventsArray}
                matchID={id} 
                leagueName={leagueName}
                />

                <TeamEventsPanel
                teamEventArray={headToHeadStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle="Head to Head Matches"
                showWinLoss={false}
                />

                <TeamEventsPanel 
                teamEventArray={mainTeamFormStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle={`${mainTeamName} Form`}
                showWinLoss={true}
                />

                <TeamEventsPanel 
                teamEventArray={opponentTeamFormStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle={`${opponentTeamName} Form`}
                showWinLoss={true}
                />

            </ScrollView>
            
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
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
}

export const KeyEventsPanel = ({ keyEventArray, matchID, leagueName}: KeyEventsPanelProps) => {

    if(keyEventArray === undefined) return 

    if(keyEventArray.length == 0)
    {
        return(
            <View style={[keyEventsPanelStyles.container]}>
            <Text>Key Events</Text>

            <View style={{backgroundColor: '#ebe9e8', padding: 10, borderRadius: 5}}>
                <Text style={{color:'grey'}}>Currently no key events</Text>
            </View>
        </View>
        )
    }

    return (
        <View style={[keyEventsPanelStyles.container]}>
            <Text>Key Events</Text>

            <View style={{backgroundColor: '#ebe9e8', padding: 10, borderRadius: 5}}>

            {keyEventArray.map((match, index) => {
                return (
                    <KeyEventItem
                    key={index}
                    leagueName={leagueName}
                    eventTime={match.eventTime}
                    eventType={match.eventType}
                    eventPlayer={match.eventPlayer}
                    eventScore={match.eventScore}
                    eventTeam={match.eventTeam}
                    eventIcon={match.eventIcon}
                     />
                );
            })}

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
}

export const KeyEventItem = ({leagueName, eventTime, eventType, eventPlayer, eventScore, eventTeam, eventIcon}: KeyEventItemProps) => {


    const eventTeamInfo = getTeamInfo(leagueName, eventTeam);

    return (
        <View style={{flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 600, color: eventTeamInfo?.teamInfo?.colour}}>{eventTeamInfo?.teamInfo?.abbreviation}</Text>
           
            <View style={{padding: 5, borderWidth: 2, borderColor: eventTeamInfo?.teamInfo?.colour, borderRadius: 20, marginHorizontal: 5}}>
                <Image
                style={[keyEventsPanelStyles.eventIcon]}
                source={eventIcon} />
            </View>
            
            <View style={{flexDirection: 'column'}}>
                <Text>{eventPlayer}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 500}}>{eventTime}</Text>
                    <Text style={{marginHorizontal: 10}}>{eventScore}</Text>
                </View>
            </View>
            
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

export const keyEventsPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
    },
    teamLogo: {
      resizeMode: 'contain',
      width: 25,
      height: 25,
      minHeight: 25,
      minWidth: 25,
    },
    eventIcon: {
        resizeMode: 'center',
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
    teamInfoContainer:{
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



export default MatchSummary;