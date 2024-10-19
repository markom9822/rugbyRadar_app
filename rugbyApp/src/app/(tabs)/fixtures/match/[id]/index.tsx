import { colors, fontSize } from "@/constants/tokens";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { useEffect, useState } from "react";
import { getAnyHomeAwayTeamInfo, getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { getBroadcasterLogo, getLeagueDisplayNameFromCode, getLeagueName } from "@/store/utils/helpers";
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

export const handleGetMatchStat = (stat: any) => {

    if(stat == null)
    {
        return '-'
    }
    else
    {
        return stat
    }


}

export const getMatchInfoRugbyViz = (matchDetails: any) => {

    const homeTeamName = matchDetails.data.homeTeam.shortName;
    const awayTeamName = matchDetails.data.awayTeam.shortName;
    const matchVenue = matchDetails.data.venue.name;
    const matchAttendance = matchDetails.data.attendance;
    const matchBroadcasters = matchDetails.data.broadcasters;

    const homeTeamPossession = handleGetMatchStat(matchDetails.data.homeTeam.stats?.possession);
    const awayTeamPossession = handleGetMatchStat(matchDetails.data.awayTeam.stats?.possession);

    const homeTeamTries = handleGetMatchStat(matchDetails.data.homeTeam.stats?.tries);
    const awayTeamTries = handleGetMatchStat(matchDetails.data.awayTeam.stats?.tries);

    const homeTeamTackles = handleGetMatchStat(matchDetails.data.homeTeam.stats?.tackles);
    const awayTeamTackles = handleGetMatchStat(matchDetails.data.awayTeam.stats?.tackles);

    const homeTeamMetres = handleGetMatchStat(matchDetails.data.homeTeam.stats?.metres);
    const awayTeamMetres = handleGetMatchStat(matchDetails.data.awayTeam.stats?.metres);


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
    const [leagueName, setLeagueName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const {id} = useLocalSearchParams();
    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6)

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")
        setIsLoading(true)

        // handle differently - separate API
        if(leagueID.indexOf("_RugbyViz") !== -1)
        {
            const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/'+ eventID +'?provider=rugbyviz';

            const matchDetails = await fetch( apiString,).then((res) => res.json())
            const matchInfo = getMatchInfoRugbyViz(matchDetails)
            setMatchInfoArray(matchInfo)
            setLeagueName(leagueID.replace("_RugbyViz", ""))
            setIsLoading(false)
            return;
        }

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';

        const matchDetails = await fetch( apiString,).then((res) => res.json())
        const matchInfo = getMatchInfo(matchDetails)
        setMatchInfoArray(matchInfo)
        setLeagueName(getLeagueName(leagueID));
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

            <ScrollView>
                <GameInfoPanel
                    matchInfoArray={matchInfoArray}
                    matchID={id}
                    leagueName={leagueName}
                />
            </ScrollView>

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

    var matchAttendance = 'NA'
    if(matchInfoArray[0].matchAttendance !== undefined)
    {
        matchAttendance = new Number(matchInfoArray[0].matchAttendance).toLocaleString();
    }

    const broadcasterRender = (matchInfoArray: MatchInfo[]) => {

        if(matchInfoArray[0].matchBroadcasters == undefined || matchInfoArray[0].matchBroadcasters == null || matchInfoArray[0].matchBroadcasters.length == 0)
        {
            return (
                <View>
                    <Text style={{color: 'lightgrey'}}>No Broadcasters Found</Text>
                </View>
            )
        }
        else
        {
            return (
                matchInfoArray[0].matchBroadcasters.map((item, index) => {
                    return (
                        <BroadcasterItem
                            key={index}
                            broadcasterName={item}
                        />
                    );
                })
            )

        }

    }

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
                    {broadcasterRender(matchInfoArray)}
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
            <Image style={[{resizeMode: 'contain',width: 40,height: 40,minHeight: 40, minWidth: 40}]} 
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