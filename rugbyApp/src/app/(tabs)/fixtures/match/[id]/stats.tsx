import { View, Text, TouchableOpacity, ViewStyle, StyleSheet, Image, ScrollView, ActivityIndicator} from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { getLeagueName } from "@/store/utils/helpers";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens";
import { getAnyHomeAwayTeamInfo, getHomeAwayTeamInfo} from "@/store/utils/getTeamInfo";
import { defaultStyles} from "@/styles";
import { useEffect, useState } from "react";
import { StatsPanel, StatsInfo } from "@/store/components/StatsPanel";
import { getFullMatchStats, getFullMatchStatsRugbyViz } from "@/store/utils/getFullMatchStats";
import { TeamEventsPanel, TeamEventStatsInfo } from "@/store/components/TeamEventsPanel";
import { getHeadToHeadStats, getHeadToHeadStatsRugbyViz } from "@/store/utils/getHeadToHeadStats";
import { getTeamFormStats, getTeamFormStatsRugbyViz } from "@/store/utils/getTeamFormStats";
import { getKeyEvents, getKeyEventsRugbyViz } from "@/store/utils/getKeyEvents";


const MatchSummary = () => {
    const [matchStatsArray, setMatchStatsArray] = useState<StatsInfo[] | undefined>();
    const [headToHeadStatsArray, setHeadToHeadStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [mainTeamFormStatsArray, setMainTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [opponentTeamFormStatsArray, setOpponentTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();

    const [keyEventsArray, setKeyEventsArray] = useState<KeyEventsInfo[] | undefined>();

    const [mainTeamName, setMainTeamName] = useState<string | undefined>();
    const [opponentTeamName, setOpponentTeamName] = useState<string | undefined>();
    const [leagueName, setLeagueName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const {id} = useGlobalSearchParams();

    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6)

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")
        setIsLoading(true)

        // handle differently - separate API
        if(leagueID.indexOf("_RugbyViz") !== -1){

            const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/' + eventID + '?provider=rugbyviz';
            const matchStats = await fetch(apiString,).then((res) => res.json())
            const homeTeam = matchStats.data.homeTeam.shortName;
            const awayTeam = matchStats.data.awayTeam.shortName;

            setMainTeamName(homeTeam)
            setOpponentTeamName(awayTeam)

            const fullMatchStats = getFullMatchStatsRugbyViz(matchStats)
            const headToHeadStats = await getHeadToHeadStatsRugbyViz(matchStats)
            const mainTeamFormStats = await getTeamFormStatsRugbyViz(matchStats, true)
            const opponentTeamFormStats = await getTeamFormStatsRugbyViz(matchStats, false)
            const keyEvents = getKeyEventsRugbyViz(matchStats)

            setMatchStatsArray(fullMatchStats)
            setHeadToHeadStatsArray(headToHeadStats)
            setMainTeamFormStatsArray(mainTeamFormStats)
            setOpponentTeamFormStatsArray(opponentTeamFormStats)
            setKeyEventsArray(keyEvents)
            setLeagueName(leagueID.replace("_RugbyViz", ""))

            setIsLoading(false)
            return;
        }

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';
        const statsDetails = await fetch( apiString,).then((res) => res.json())
        setMainTeamName(statsDetails.boxscore.teams[0].team.displayName)
        setOpponentTeamName(statsDetails.boxscore.teams[1].team.displayName)
        setLeagueName(getLeagueName(leagueID));

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
        setIsLoading(false)
    }

    // call only once on load
    useEffect(() => {
        handlePressFetchData()
      }, []);

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

    return(
        <View style={defaultStyles.container}>
            <Text style={{color: colors.text}}>Event ID: {eventID}</Text>
            <Text style={{color: colors.text}}>League ID: {leagueID}</Text>
            <Text style={{color: colors.text}}>League Name: {leagueName}</Text>

            {activityIndicatorHeader()}

            <ScrollView >
                <StatsPanel
                matchInfoArray={matchStatsArray}
                matchID={id}
                leagueName={leagueName} />

                <KeyEventsPanel
                keyEventArray={keyEventsArray}
                matchID={id} 
                homeTeam={mainTeamName}
                awayTeam={opponentTeamName}
                leagueName={leagueName}
                />

                <TeamEventsPanel
                teamEventArray={headToHeadStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle="Head to Head Matches"
                showWinLoss={false}
                isLastItem={false}
                />

                <TeamEventsPanel 
                teamEventArray={mainTeamFormStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle={`${mainTeamName} Form`}
                showWinLoss={true}
                isLastItem={false}
                />

                <TeamEventsPanel 
                teamEventArray={opponentTeamFormStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle={`${opponentTeamName} Form`}
                showWinLoss={true}
                isLastItem={true}
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
    homeTeam: string | undefined,
    awayTeam: string | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
}

export const KeyEventsPanel = ({ keyEventArray, homeTeam, awayTeam, matchID, leagueName}: KeyEventsPanelProps) => {

    if(keyEventArray === undefined) return 
    if(homeTeam === undefined) return
    if(awayTeam === undefined) return

    const homeAwayTeamInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam)

    if(keyEventArray.length == 0)
    {
        return(
        <View style={[keyEventsPanelStyles.container]}>
            <Text style={{color: colors.text}}>Key Events</Text>

            <View style={{backgroundColor: colors.altBackground, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'grey'}}>
                <Text style={{color:'lightgrey'}}>Currently no key events</Text>
            </View>
        </View>
        )
    }

    return (
        <View style={[keyEventsPanelStyles.container]}>
            <Text style={{color: colors.text}}>Key Events</Text>

            <View style={{backgroundColor: colors.background, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'grey', width: "80%"}}>

                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingVertical: 5}}>
                    <View style={{width: "50%", justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[keyEventsPanelStyles.teamLogo]} 
                        source={homeAwayTeamInfo?.homeInfo.altLogo}/>
                    </View>

                    <View style={{width: "50%", justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[keyEventsPanelStyles.teamLogo]} 
                        source={homeAwayTeamInfo?.awayInfo.altLogo}/>
                    </View>
                    
                </View>

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
                    isHomeTeam={match.eventTeam == homeTeam}
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
    isHomeTeam: boolean,
}

export const KeyEventItem = ({leagueName, eventTime, eventType, eventPlayer, eventScore, eventTeam, eventIcon, isHomeTeam}: KeyEventItemProps) => {

    const eventRender = (isHome: boolean) => {

        if (isHome) {
            return (
                <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'flex-end', alignItems: 'center' }}>

                    <View style={{width: "40%", flexDirection: 'column', paddingVertical: 2, borderBottomColor: 'grey', borderBottomWidth: 1}}>
                        <Text style={{ color: colors.text }}>{eventPlayer}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 500, color: colors.text }}>{eventTime}'</Text>
                            <Text style={{ marginHorizontal: 10, color: colors.text }}>{eventScore}</Text>
                        </View>
                    </View>

                    <View style={{ padding: 5, width: "20%" }}>
                        <Image
                            style={[keyEventsPanelStyles.eventIcon]}
                            source={eventIcon} />
                    </View>

                    <View style={{width: "40%"}}>

                    </View>
                </View>
            )
        }
        else { 
            return (
                <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'flex-start', alignItems: 'center' }}>

                    <View style={{width: "40%"}}>

                    </View>

                    <View style={{ padding: 5, width: "20%" }}>
                        <Image
                            style={[keyEventsPanelStyles.eventIcon]}
                            source={eventIcon} />
                    </View>

                    <View style={{width: "40%", flexDirection: 'column', borderBottomColor: 'grey', borderBottomWidth: 1}}>
                        <Text style={{ color: colors.text }}>{eventPlayer}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 500, color: colors.text }}>{eventTime}'</Text>
                            <Text style={{ marginHorizontal: 10, color: colors.text }}>{eventScore}</Text>
                        </View>
                    </View>

                </View>
            )
        }
    }

    const render = eventRender(isHomeTeam)

    return (
        <View>
            {render}
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
      marginVertical: 10,
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
        width: 20,
        height: 20,
        minHeight: 20,
        minWidth: 20,
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