import { View, Text, TouchableOpacity, ViewStyle, StyleSheet, Image, ScrollView, FlatList } from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { getLeagueName } from "@/store/utils/helpers";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens";
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { useState } from "react";
import { StatsPanel, StatsInfo } from "@/store/components/StatsPanel";
import { getFullMatchStats } from "@/store/utils/getFullMatchStats";

export type TeamEventStatsInfo = {
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: string,
    awayTeamScore: string,
    matchDate: string,
}

export const getHeadToHeadStats = (matchStats: any) => {

    var headToHeadArray = [];

    const gamesLength = matchStats.headToHeadGames[0].events.length;

    for (let index = 0; index < gamesLength; index++) {

        const eventScore = matchStats.headToHeadGames[0].events[index].score;
        const matchDate = matchStats.headToHeadGames[0].events[index].gameDate;

        const mainTeam = matchStats.headToHeadGames[0].team.displayName;
        const mainTeamID = matchStats.headToHeadGames[0].team.id;

        const opponentTeam = matchStats.headToHeadGames[0].events[index].opponent.displayName;
        const opponentID = matchStats.headToHeadGames[0].events[index].opponent.id;

        const homeTeamID = matchStats.headToHeadGames[0].events[index].homeTeamId;
        const homeTeamScore = matchStats.headToHeadGames[0].events[index].homeTeamScore;
        const awayTeamScore = matchStats.headToHeadGames[0].events[index].awayTeamScore;

        var homeTeam;
        var awayTeam;

        if(homeTeamID === mainTeamID)
        {
            homeTeam = mainTeam;
            awayTeam = opponentTeam;
        }
        else
        {
            homeTeam = opponentTeam;
            awayTeam = mainTeam;
        }


        console.info(eventScore)

        const newArray = {
                homeTeamName: homeTeam,
                awayTeamName: awayTeam,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                matchDate: matchDate,
        };
    

        headToHeadArray.push(newArray)
    }

    return(
        headToHeadArray
    )
}

export const getTeamFormStats = (matchStats: any, teamIndex: number) => {

    var teamFormArray = [];

    const gamesLength = matchStats.lastFiveGames[teamIndex].events.length;

    for (let index = 0; index < gamesLength; index++) {

        const eventScore = matchStats.lastFiveGames[teamIndex].events[index].score;
        const matchDate = matchStats.lastFiveGames[teamIndex].events[index].gameDate;

        const mainTeam = matchStats.lastFiveGames[teamIndex].team.displayName;
        const mainTeamID = matchStats.lastFiveGames[teamIndex].team.id;

        const opponentTeam = matchStats.lastFiveGames[teamIndex].events[index].opponent.displayName;
        const opponentID = matchStats.lastFiveGames[teamIndex].events[index].opponent.id;

        const homeTeamID = matchStats.lastFiveGames[teamIndex].events[index].homeTeamId;
        const homeTeamScore = matchStats.lastFiveGames[teamIndex].events[index].homeTeamScore;
        const awayTeamScore = matchStats.lastFiveGames[teamIndex].events[index].awayTeamScore;

        var homeTeam;
        var awayTeam;

        if(homeTeamID === mainTeamID)
        {
            homeTeam = mainTeam;
            awayTeam = opponentTeam;
        }
        else
        {
            homeTeam = opponentTeam;
            awayTeam = mainTeam;
        }


        console.info(eventScore)

        const newArray = {
                homeTeamName: homeTeam,
                awayTeamName: awayTeam,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                matchDate: matchDate,
        };
    

        teamFormArray.push(newArray)
    }

    return(
        teamFormArray
    )
}

const MatchSummary = () => {
    const [matchStatsArray, setMatchStatsArray] = useState<StatsInfo[] | undefined>();
    const [headToHeadStatsArray, setHeadToHeadStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [mainTeamFormStatsArray, setMainTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [opponentTeamFormStatsArray, setOpponentTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();

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

        setMatchStatsArray(matchStats)
        setHeadToHeadStatsArray(headToHeadStats)
        setMainTeamFormStatsArray(mainTeamFormStats)
        setOpponentTeamFormStatsArray(opponentTeamFormStats)

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

                <TeamEventsPanel 
                teamEventArray={headToHeadStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle="Head to Head Matches"
                />

                <TeamEventsPanel 
                teamEventArray={mainTeamFormStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle={`${mainTeamName} Form`}
                />

                <TeamEventsPanel 
                teamEventArray={opponentTeamFormStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle={`${opponentTeamName} Form`}
                />

            </ScrollView>
            
        </View>
    )
}


type TeamEventPanelProps = {
	teamEventArray: TeamEventStatsInfo[] | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
    panelTitle: string,
}

export const TeamEventsPanel = ({ teamEventArray, matchID, leagueName, panelTitle}: TeamEventPanelProps) => {

    if(teamEventArray === undefined) return

    return (
        <View style={[headToHeadPanelStyles.container]}>
            <Text>{panelTitle}</Text>

            <View style={{backgroundColor: '#ebe9e8', padding: 10, borderRadius: 5}}>

            {teamEventArray.map((match, index) => {
                return (
                    <HeadToHeadItem
                    key={index}
                    leagueName={leagueName}
                    homeTeam={match.homeTeamName}
                    awayTeam={match.awayTeamName}
                    homeTeamScore={match.homeTeamScore}
                    awayTeamScore={match.awayTeamScore}
                    matchDate={match.matchDate}
                     />
                );
            })}

            </View>
        </View>
    )
}


type HeadToHeadItemProps = {
    leagueName: string | undefined,
	homeTeam: string,
    awayTeam: string,
    homeTeamScore: string,
    awayTeamScore: string,
    matchDate: string,

}

export const HeadToHeadItem = ({leagueName, homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchDate}: HeadToHeadItemProps) => {

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, homeTeam, awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    const formattedDate = new Date(matchDate).toLocaleDateString('en-GB')


    if(homeTeamInfo == undefined) return
    if(awayTeamInfo == undefined) return

    return (
        <View style={{flexDirection: 'row'}}>
            <Image
            style={[headToHeadPanelStyles.teamLogo]}
            source={homeTeamInfo.logo} />
            <Text style={[headToHeadPanelStyles.teamName]}>{homeTeamInfo?.abbreviation}</Text>

            <Text style={[headToHeadPanelStyles.matchScore]}>{homeTeamScore} - {awayTeamScore}</Text>

            <Text style={[headToHeadPanelStyles.teamName]}>{awayTeamInfo?.abbreviation}</Text>
            <Image
            style={[headToHeadPanelStyles.teamLogo]}
            source={awayTeamInfo.logo} />
            <Text style={[headToHeadPanelStyles.matchDate]}>{formattedDate}</Text>
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

export const headToHeadPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    teamLogo: {
      resizeMode: 'contain',
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