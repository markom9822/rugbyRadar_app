import { colors, fontSize } from "@/constants/tokens";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { useState } from "react";
import { getAnyHomeAwayTeamInfo, getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { getBroadcasterLogo, getLeagueName } from "@/store/utils/helpers";
import { defaultStyles} from "@/styles";

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
    matchBroadcasters: string[]
}

export const getMatchInfo = (matchDetails: any) => {

    const homeTeamName = matchDetails.boxscore.teams[0].team.displayName;
    const awayTeamName = matchDetails.boxscore.teams[1].team.displayName;
    const matchVenue = matchDetails.gameInfo.venue.fullName;
    const matchAttendance = matchDetails.gameInfo.attendance;

    if(matchDetails.boxscore.teams[0].statistics.length == 0 || matchDetails.boxscore.teams[1].statistics.length == 0 )
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
                matchBroadcasters: []
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
            matchBroadcasters: []
        
        }
    ];

    return(
        newArray
    )
}

export const getMatchInfoRugbyViz = (matchDetails: any) => {

    const homeTeamName = matchDetails.data.homeTeam.shortName;
    const awayTeamName = matchDetails.data.awayTeam.shortName;
    const matchVenue = matchDetails.data.venue.name;
    const matchAttendance = matchDetails.data.attendance;
    const matchBroadcasters = matchDetails.data.broadcasters;

    /*if(matchDetails.boxscore.teams[0].statistics.length == 0 || matchDetails.boxscore.teams[1].statistics.length == 0 )
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

    }*/

    const homeTeamPossession = matchDetails.data.homeTeam.stats.possession;
    const awayTeamPossession = matchDetails.data.awayTeam.stats.possession;

    const homeTeamTries = matchDetails.data.homeTeam.stats.tries;
    const awayTeamTries = matchDetails.data.awayTeam.stats.tries;

    const homeTeamTackles = matchDetails.data.homeTeam.stats.tackles;
    const awayTeamTackles = matchDetails.data.awayTeam.stats.tackles;

    const homeTeamMetres =  matchDetails.data.homeTeam.stats.metres;
    const awayTeamMetres =  matchDetails.data.homeTeam.stats.metres;


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
            matchBroadcasters: matchBroadcasters,
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

        // handle differently - separate API
        if(leagueID === "_RugbyViz")
        {
            const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/'+ eventID +'?provider=rugbyviz';

            const matchDetails = await fetch( apiString,).then((res) => res.json())
            const matchInfo = getMatchInfoRugbyViz(matchDetails)
            setMatchInfoArray(matchInfo)
            return;
        }

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';

        const matchDetails = await fetch( apiString,).then((res) => res.json())
        const matchInfo = getMatchInfo(matchDetails)
        setMatchInfoArray(matchInfo)
    }

    return(
        <View style={defaultStyles.container}>
            <Text style={{color: colors.text}}>Event ID: {eventID}</Text>
            <Text style={{color: colors.text}}>League ID: {leagueID}</Text>

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

            <ScrollView>
                <GameInfoPanel
                    matchInfoArray={matchInfoArray}
                    matchID={id}
                />
            </ScrollView>

        </View>
    )
}

type GameInfoPanelProps = {
	matchInfoArray: MatchInfo[] | undefined,
    matchID: string | string[] | undefined,
}

export const GameInfoPanel = ({ matchInfoArray, matchID}: GameInfoPanelProps) => {

    if(matchInfoArray == undefined) return

    const homeAwayInfo = getAnyHomeAwayTeamInfo(matchInfoArray[0].homeTeamName, matchInfoArray[0].awayTeamName);
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

            <Text style={{fontWeight: 500, color: colors.text}}>Game Info</Text>
                <View style={{ backgroundColor: colors.altBackground, padding: 10, borderRadius: 5, marginBottom: 15, borderWidth: 1, borderColor: 'lightgrey'}}>
                    <View style={{alignItems: 'center', flexDirection: 'column'}}>
                        <Text style={{fontWeight: 500, color: colors.text}}>Venue</Text>
                        <Text style={{marginBottom: 10, color: colors.text}}>{matchInfoArray[0].matchVenue}</Text>
                        <Text style={{color: colors.text}}>Attendance: {matchAttendance}</Text>
                    </View>
                </View>
            
            <Text style={{fontWeight: 500, color: colors.text}}>Match Broadcasters</Text>
                <View style={{ backgroundColor: colors.altBackground, padding: 10, borderRadius: 5, marginBottom: 15, borderWidth: 1, borderColor: 'lightgrey'}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                    {matchInfoArray[0].matchBroadcasters.map((item, index) => {
                        return (
                            <BroadcasterItem
                                key={index}
                                broadcasterName={item}
                            />
                        );
                    })}
                </View>
                </View>

            <Text style={{fontWeight: 500, color: colors.text}}>Match Stats</Text>
            <View style={{backgroundColor: colors.altBackground, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'lightgrey', marginBottom: 50}}>

                <View style={{ alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 2}}>
                        <View style={[summaryPanelStyles.teamInfoContainer]}>
                            <Image style={[summaryPanelStyles.teamLogo]} 
                            source={homeTeamInfo?.altLogo}/>
                            <Text style={[summaryPanelStyles.teamName]}>{homeTeamInfo?.abbreviation}</Text>
                        </View>
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 5, textAlign: 'center', width: "40%"}}></Text>
                        <View style={[summaryPanelStyles.teamInfoContainer]}>
                            <Text style={[summaryPanelStyles.teamName]}>{awayTeamInfo?.abbreviation}</Text>
                            <Image style={[summaryPanelStyles.teamLogo]} 
                            source={awayTeamInfo?.altLogo}/>
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
                <Text style={[summaryPanelStyles.statsPanelRow, {width: "50%", backgroundColor: colors.altBackground}]}>{statTitle}</Text>
                <Text style={[summaryPanelStyles.statsPanelRow,  {width: "20%"}]}>{awayStat}</Text>
            </View>
        </View>
    )
}

type BroadcasterItemProps = {
	broadcasterName: string
}

export const BroadcasterItem = ({broadcasterName}: BroadcasterItemProps ) => {

    const logo = getBroadcasterLogo(broadcasterName)

    if(logo === undefined)
    {
        return (
            <></>
        )
    }
    
    return (
        <View style={{paddingHorizontal: 4}}>
            <Image style={[{resizeMode: 'contain',width: 35,height: 35,minHeight: 35, minWidth: 35}]} 
                source={logo}/>
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
      alignItems: 'center',
      backgroundColor: colors.background
    },
    matchName: {
        textAlign: 'center',
        fontSize: fontSize.lg,
        color: colors.text,
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
        color: colors.text
    },
    teamName: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500,
        color: colors.text,
    },
    teamInfoContainer:{
        width: "25%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsLink: {
      fontWeight: 600,
      color: '#7185eb'
    }
  })

export default MatchSummary;