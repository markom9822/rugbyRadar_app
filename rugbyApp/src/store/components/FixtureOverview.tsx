import { BroadcasterItem } from "@/app/(tabs)/(fixtures)/match/[id]";
import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { TeamEventStatsInfo } from "@/store/components/TeamEventsPanel";
import { getHeadToHeadStatsPlanetRugbyAPI, getHeadToHeadStatsRugbyViz } from "@/store/utils/getHeadToHeadStats";
import { getMatchInfoPlanetRugbyAPI, getMatchInfoRugbyViz, getMatchInfoWorldRugbyAPI, MatchInfo } from "@/store/utils/getMatchInfo";
import { getTeamFormStatsPlanetRugbyAPI, getTeamFormStatsRugbyViz } from "@/store/utils/getTeamFormStats";
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { getBroadcasterLogo, getPlanetRugbyMatchIDFromDetails } from "@/store/utils/helpers";
import { Feather, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";


type FixtureOverview = {
    id: string

}

export const FixtureOverview = ({ id }: FixtureOverview) => {

    const [matchInfoArray, setMatchInfoArray] = useState<MatchInfo[] | undefined>();
    const [leagueName, setLeagueName] = useState<string>('');
    const [refereeName, setRefereeName] = useState<string>('-');

    const [headToHeadStatsArray, setHeadToHeadStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [mainTeamFormStatsArray, setMainTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [opponentTeamFormStatsArray, setOpponentTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();

    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6)
    
    const handlePressFetchData = async () => {
        console.info("Pressed Fetch Data")
        setIsLoading(true)
    
            // handle differently - separate API
            if(leagueID.indexOf("_RugbyViz") !== -1)
            {
                const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/'+ eventID +'?provider=rugbyviz';
                console.info(apiString)
    
                const matchDetails = await fetch( apiString,).then((res) => res.json())
                const matchInfo = getMatchInfoRugbyViz(matchDetails)
                setMatchInfoArray(matchInfo)
    
                const headToHeadStats = await getHeadToHeadStatsRugbyViz(matchDetails)
                const mainTeamFormStats = await getTeamFormStatsRugbyViz(matchDetails, true)
                const opponentTeamFormStats = await getTeamFormStatsRugbyViz(matchDetails, false)
                
                setHeadToHeadStatsArray(headToHeadStats)
                setMainTeamFormStatsArray(mainTeamFormStats)
                setOpponentTeamFormStatsArray(opponentTeamFormStats)
    
                if(matchDetails.data.officials.length > 0)
                {
                    const refName = matchDetails.data.officials[0].name;
                    setRefereeName(refName)
                }
                
                setLeagueName(leagueID.replace("_RugbyViz", ""))
                setIsLoading(false)
                return;
            }
    
            // use world rugby API
            if(id.indexOf("_WorldRugbyAPI") !== -1)
            {
                const separatedArray = id.toString().split("_");
                const worldRugbyAPIEventID = separatedArray[0];
                const worldRugbyAPILeagueName = separatedArray[1]
    
                const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/'+worldRugbyAPIEventID+'/stats?language=en';
                console.info(apiString)
                const matchDetails = await fetch( apiString,).then((res) => res.json())
                const matchInfo = await getMatchInfoWorldRugbyAPI(matchDetails)
                const matchDate = new Date(matchInfo[0].matchDate)
                const homeTeamName = matchInfo[0].homeTeamName
                const awayTeamName = matchInfo[0].awayTeamName
    
                setMatchInfoArray(matchInfo)
    
                // use planet rugby for head to head stats
                const planetRugbyMatchID = await getPlanetRugbyMatchIDFromDetails(matchDate, homeTeamName, awayTeamName);
                const apiPlanetRugbyString = 'https://rugbylivecenter.yormedia.com/api/match-h2h/'+planetRugbyMatchID;
                const matchPlanetRugbyStats = await fetch( apiPlanetRugbyString,).then((res) => res.json())
                
                const headToHeadStats = getHeadToHeadStatsPlanetRugbyAPI(matchPlanetRugbyStats)
                const mainTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchPlanetRugbyStats, true)
                const opponentTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchPlanetRugbyStats, false)
    
                setHeadToHeadStatsArray(headToHeadStats)
                setMainTeamFormStatsArray(mainTeamFormStats)
                setOpponentTeamFormStatsArray(opponentTeamFormStats)
    
                const apiSummaryString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/'+worldRugbyAPIEventID+'/summary?language=en';
                const matchSummary = await fetch( apiSummaryString,).then((res) => res.json())
    
                if(matchSummary.officials.length > 0)
                {
                    const refName = matchSummary.officials[0].official.name.display;
                    setRefereeName(refName)
                }
                
                setLeagueName(worldRugbyAPILeagueName)
    
                setIsLoading(false)
                return;
            }
    
            // use world rugby API
            if(id.indexOf("_PlanetRugbyAPI") !== -1)
            {
                const separatedArray = id.toString().split("_");
                const planetRugbyAPIEventID = separatedArray[0];
                const planetRugbyAPILeagueName = separatedArray[1]
        
                console.info(planetRugbyAPIEventID)
                const apiString = 'https://rugbylivecenter.yormedia.com/api/match-overview/'+planetRugbyAPIEventID;
                console.info(apiString)
    
                const matchDetails = await fetch( apiString,).then((res) => res.json())
                const matchInfo = getMatchInfoPlanetRugbyAPI(matchDetails)
                setMatchInfoArray(matchInfo)
    
                const apiH2HString = 'https://rugbylivecenter.yormedia.com/api/match-h2h/' + planetRugbyAPIEventID;
    
                const matchH2HStats = await fetch(apiH2HString,).then((res) => res.json())
    
                const headToHeadStats = getHeadToHeadStatsPlanetRugbyAPI(matchH2HStats)
                const mainTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchH2HStats, true)
                const opponentTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchH2HStats, false)
    
                setHeadToHeadStatsArray(headToHeadStats)
                setMainTeamFormStatsArray(mainTeamFormStats)
                setOpponentTeamFormStatsArray(opponentTeamFormStats)
    
                const refName = matchDetails.data.match.official_name;
                setRefereeName(refName === null ? "-" : refName)
        
                setLeagueName(planetRugbyAPILeagueName)
                setIsLoading(false)
                return;
            }
        }
    
        useEffect(() => {
            async function fetchMyAPI() {
                await handlePressFetchData()
            }
            fetchMyAPI()
        }, [])
    
    
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
    
        if(matchInfoArray == undefined) return
    
        return(
            
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handlePressFetchData} />}>

                {activityIndicatorHeader()}

                    <GameInfoPanel
                        matchInfoArray={matchInfoArray}
                        matchID={id}
                        leagueName={leagueName}
                        refereeName={refereeName}
                    />
   
            </ScrollView>
    
        )
    }

    type GameInfoPanelProps = {
        matchInfoArray: MatchInfo[] | undefined,
        matchID: string | string[] | undefined,
        leagueName: string | undefined,
        refereeName: string;
    }
    
    export const GameInfoPanel = ({ matchInfoArray, matchID, leagueName, refereeName}: GameInfoPanelProps) => {
    
        if(matchInfoArray == undefined) return
    
        const homeAwayInfo = getHomeAwayTeamInfo(leagueName, matchInfoArray[0].homeTeamName, matchInfoArray[0].awayTeamName);
        const homeTeamInfo = homeAwayInfo?.homeInfo;
        const awayTeamInfo = homeAwayInfo?.awayInfo;
        
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
                        <Text style={{color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: fontSize.xs}}>No Broadcasters Found</Text>
                    </View>
                )
            }
            else
            {
    
                var logosArray = [];
                var namesArray = [];
    
                console.info(matchInfoArray[0].matchBroadcasters)
    
                // need to remove dupes
                for (let index = 0; index < matchInfoArray[0].matchBroadcasters.length; index++) {
    
                    const logo = getBroadcasterLogo(matchInfoArray[0].matchBroadcasters[index])
    
                    if (logosArray.indexOf(logo) === -1) {
                        logosArray.push(logo)
                        namesArray.push(matchInfoArray[0].matchBroadcasters[index])
                    }  
                }
    
                console.info(namesArray)
    
                return (
                    namesArray.map((item, index) => {
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
            <View style={{flexDirection: 'column'}}>
    
                <View style={{ padding: 10, borderRadius: 5, marginVertical: 10, borderWidth: 1, borderColor: 'lightgrey', flex: 1 }}>
                    <View style={{ alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start' }}>
    
                        <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                                <Fontisto name="date" size={20} color={'lightgrey'} />
                            </View>
                            <Text style={{ width: "75%", paddingHorizontal: 8, color: colors.text, fontFamily: fontFamilies.regular }}>{matchInfoArray[0].matchDate.toLocaleDateString()}</Text>
                        </View>
    
                        <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialIcons name="stadium" size={20} color={'lightgrey'} />
                            </View>
                            <Text style={{ width: "75%", paddingHorizontal: 8, color: colors.text, fontFamily: fontFamilies.regular }}>{matchInfoArray[0].matchVenue}</Text>
                        </View>
    
                        <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name="whistle" size={20} color={'lightgrey'} />
                            </View>
                            <Text style={{ width: "75%", paddingHorizontal: 8, color: colors.text, fontFamily: fontFamilies.regular }}>{refereeName}</Text>
                        </View>
    
                        <View style={{ flexDirection: 'row', marginVertical: 10, }}>
                            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
                                <Feather name="tv" size={20} color={'lightgrey'} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                {broadcasterRender(matchInfoArray)}
                            </View>
                        </View>
    
                    </View>
                </View>         
            </View>
        )
    }

    export const summaryPanelStyles = StyleSheet.create({
        container: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
          margin: 3
        },
        matchName: {
            textAlign: 'center',
            fontSize: fontSize.lg,
            color: colors.text,
            fontWeight: 600,
            marginBottom: 15,
            marginTop: 10,
            fontFamily: fontFamilies.bold
        },
        teamLogo: {
          resizeMode: 'contain',
          width: 25,
          height: 25,
          minHeight: 25,
          minWidth: 25,
        },
        titleTeamLogo: {
            resizeMode: 'contain',
            width: 45,
            height: 45,
            minHeight: 45,
            minWidth: 45,
          },
        statsPanelRow: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            textAlign: 'center',
            color: colors.text,
            fontFamily: fontFamilies.regular
        },
        teamName: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            textAlign: 'center',
            fontWeight: 500,
            color: colors.text,
            fontFamily: fontFamilies.bold
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