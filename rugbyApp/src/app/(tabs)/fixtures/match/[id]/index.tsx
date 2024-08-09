import { colors, fontSize } from "@/constants/tokens";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity, Image, StyleSheet } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { useState } from "react";
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { getLeagueName } from "@/store/utils/helpers";

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
    const matchVenue = matchDetails.gameInfo.venue.fullName;
    const matchAttendance = matchDetails.gameInfo.attendance;

    if(matchDetails.boxscore.teams[0].statistics == undefined || matchDetails.boxscore.teams[1].statitics == undefined )
    {
        const blankArray = [
            {
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                homeTeamPossession: '0',
                awayTeamPossession: '0',
                homeTeamTries: '-',
                awayTeamTries: '-',
                homeTeamTackles: '-',
                awayTeamTackles: '-',
                homeTeamMetres: '-',
                awayTeamMetres: '-',
    
                matchVenue: matchVenue,
                matchAttendance: matchAttendance,
            
            }
        ];

        return blankArray

    }

    const homeTeamPossession = matchDetails.boxscore.teams[0].statistics[0].stats[20].value;
    const awayTeamPossession = matchDetails.boxscore.teams[1].statistics[0].stats[20].value;

    const homeTeamTries = matchDetails.boxscore.teams[0].statistics[0].stats[31].value
    const awayTeamTries = matchDetails.boxscore.teams[1].statistics[0].stats[31].value

    const homeTeamTackles = matchDetails.boxscore.teams[0].statistics[0].stats[27].value
    const awayTeamTackles = matchDetails.boxscore.teams[1].statistics[0].stats[27].value

    const homeTeamMetres = matchDetails.boxscore.teams[0].statistics[0].stats[10].value
    const awayTeamMetres = matchDetails.boxscore.teams[1].statistics[0].stats[10].value


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
    const leagueName = getLeagueName(leagueID);


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
            matchID={id}
            leagueName={leagueName} />

        </View>
    )
}

type GameInfoPanelProps = {
	matchInfoArray: MatchInfo[] | undefined,
    matchID: string | string[] | undefined,
    leagueName: string | undefined,
}

export const GameInfoPanel = ({ matchInfoArray, matchID, leagueName}: GameInfoPanelProps) => {

    if(matchInfoArray == undefined) return


    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, matchInfoArray[0].homeTeamName, matchInfoArray[0].awayTeamName);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    const homePossessionPercent = (Math.floor(parseFloat(matchInfoArray[0].homeTeamPossession) * 100)).toString() + ' %';
    const awayPossessionPercent = (Math.floor(parseFloat(matchInfoArray[0].awayTeamPossession) * 100)).toString() + ' %';

    const matchAttendance = new Number(matchInfoArray[0].matchAttendance).toLocaleString();

    return (
        <View style={[summaryPanelStyles.container]}>
            <Text style={[summaryPanelStyles.matchName]}>
                {matchInfoArray[0].homeTeamName} v {matchInfoArray[0].awayTeamName}
            </Text>

            <Text style={{fontWeight: 500}}>Game Info</Text>
                <View style={{ backgroundColor: '#ebe9e8', padding: 10, borderRadius: 5, marginBottom: 15 }}>
                    <View style={{alignItems: 'center', flexDirection: 'column'}}>
                        <Text style={{fontWeight: 500}}>Venue</Text>
                        <Text style={{marginBottom: 10}}>{matchInfoArray[0].matchVenue}</Text>
                        <Text>Attendance: {matchAttendance}</Text>
                    </View>
                </View>
            <Text style={{fontWeight: 500}}>Match Stats</Text>
            <View style={{backgroundColor: '#ebe9e8', padding: 10, borderRadius: 5}}>

                <View style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 2 }}>
                        <View style={[summaryPanelStyles.teamInfoContainer]}>
                            <Image style={[summaryPanelStyles.teamLogo]} 
                            source={homeTeamInfo?.logo}/>
                            <Text style={[summaryPanelStyles.teamName]}>{homeTeamInfo?.abbreviation}</Text>
                        </View>
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 5, textAlign: 'center', width: "50%"}}></Text>
                        <View style={[summaryPanelStyles.teamInfoContainer]}>
                            <Text style={[summaryPanelStyles.teamName]}>{awayTeamInfo?.abbreviation}</Text>
                            <Image style={[summaryPanelStyles.teamLogo]} 
                            source={awayTeamInfo?.logo}/>
                        </View>
                    </View>
                </View>

                <SummaryStatsPanel 
                homeStat={homePossessionPercent}
                awayStat={awayPossessionPercent}
                statTitle="Possession"/>

                <SummaryStatsPanel 
                homeStat={matchInfoArray[0].homeTeamTries}
                awayStat={matchInfoArray[0].awayTeamTries}
                statTitle="Tries"/>

                <SummaryStatsPanel 
                homeStat={matchInfoArray[0].homeTeamTackles}
                awayStat={matchInfoArray[0].awayTeamTackles}
                statTitle="Tackles"/>

                <SummaryStatsPanel 
                homeStat={matchInfoArray[0].homeTeamMetres}
                awayStat={matchInfoArray[0].awayTeamMetres}
                statTitle="Metres Run"/>
            </View>

            <Link style={[summaryPanelStyles.statsLink]} href={`/(tabs)/fixtures/match/${matchID}/stats`}>Full Match Stats</Link>
            
        </View>
    )
}

type SummaryStatsPanelProps = {
	homeStat: string,
    statTitle: string,
    awayStat: string,
}

export const SummaryStatsPanel = ({homeStat, statTitle, awayStat}: SummaryStatsPanelProps ) => {

    return (
        <View style={{alignItems: 'center'}}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text style={[summaryPanelStyles.statsPanelRow,  {width: "20%"}]}>{homeStat}</Text>
                <Text style={[summaryPanelStyles.statsPanelRow, {width: "50%", backgroundColor: '#d4d1cf'}]}>{statTitle}</Text>
                <Text style={[summaryPanelStyles.statsPanelRow,  {width: "20%"}]}>{awayStat}</Text>
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

export const summaryPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    matchName: {
        fontSize: fontSize.lg,
        color: 'black',
        fontWeight: 600,
        marginBottom: 15,
        marginTop: 10
    },
    teamLogo: {
      resizeMode: 'contain',
      width: 25,
      height: 25,
      minHeight: 25,
      minWidth: 25,
    },
    statsPanelRow: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
    },
    teamName: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500,
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