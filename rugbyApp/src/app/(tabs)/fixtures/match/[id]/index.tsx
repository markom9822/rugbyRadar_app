import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { Link, useLocalSearchParams, Href } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from "react-native"
import { useEffect, useState } from "react";
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { getBroadcasterLogo, getLeagueName } from "@/store/utils/helpers";
import { defaultStyles} from "@/styles";
import { getMatchInfoPlanetRugbyAPI, getMatchInfoRugbyViz, getMatchInfoWorldRugbyAPI, MatchInfo } from "@/store/utils/getMatchInfo";


const MatchSummary = () => {

    const [matchInfoArray, setMatchInfoArray] = useState<MatchInfo[] | undefined>();
    const [leagueName, setLeagueName] = useState<string>('');
    const [refereeName, setRefereeName] = useState<string>('');

    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

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

        // use world rugby API
        if(id.indexOf("_WorldRugbyAPI") !== -1)
        {
            const separatedArray = id.toString().split("_");
            const worldRugbyAPIEventID = separatedArray[0];
            const worldRugbyAPILeagueName = separatedArray[1]

            console.info(worldRugbyAPIEventID)
            const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/'+worldRugbyAPIEventID+'/stats?language=en';
            const matchDetails = await fetch( apiString,).then((res) => res.json())
            const matchInfo = await getMatchInfoWorldRugbyAPI(matchDetails)
            setMatchInfoArray(matchInfo)

            const apiSummaryString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/'+worldRugbyAPIEventID+'/summary?language=en';
            const matchSummary = await fetch( apiSummaryString,).then((res) => res.json())
            const refName = matchSummary.officials[0].official.name.display;
            setRefereeName(refName)
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
    
            const matchDetails = await fetch( apiString,).then((res) => res.json())
            const matchInfo = getMatchInfoPlanetRugbyAPI(matchDetails)
            setMatchInfoArray(matchInfo)
    
            setLeagueName(planetRugbyAPILeagueName)
            setIsLoading(false)
            return;
        }
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

            {activityIndicatorHeader()}

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handlePressFetchData} />}>
                <GameInfoPanel
                    matchInfoArray={matchInfoArray}
                    matchID={id}
                    leagueName={leagueName}
                    refereeName={refereeName}
                />
            </ScrollView>

        </View>
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
                    <Text style={{color: 'lightgrey', fontFamily: fontFamilies.light}}>No Broadcasters Found</Text>
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

    const statsPanelRender = (statsAvailable: boolean) => {

        if(!statsAvailable)
        {
            return (
                <View>
                    <Text style={{color: 'lightgrey', fontFamily: fontFamilies.light, textAlign: 'center', marginVertical: 10}}>Stats Not Available</Text>
                </View>
            )
        }
        else
        {
            return (
                <>
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
                </>
            )
        }
    }

    return (
        <View style={[summaryPanelStyles.container]}>
            <Text style={[summaryPanelStyles.matchName]}>
                {matchInfoArray[0].homeTeamName} v {matchInfoArray[0].awayTeamName}
            </Text>

            <Text style={{fontWeight: 500, color: colors.text, fontFamily: fontFamilies.bold}}>Game Info</Text>
                <View style={{ backgroundColor: colors.altBackground, padding: 10, borderRadius: 5, marginBottom: 15, borderWidth: 1, borderColor: 'lightgrey'}}>
                    <View style={{alignItems: 'center', flexDirection: 'column'}}>
                        <Text style={{fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular}}>Venue</Text>
                        <Text style={{marginBottom: 10, color: colors.text, fontFamily: fontFamilies.regular}}>{matchInfoArray[0].matchVenue}</Text>
                        <Text style={{color: colors.text, fontFamily: fontFamilies.regular}}>Referee: {refereeName}</Text>
                        <Text style={{color: colors.text, fontFamily: fontFamilies.regular}}>Attendance: {matchAttendance}</Text>
                    </View>
                </View>
            
            <Text style={{fontWeight: 500, color: colors.text, fontFamily: fontFamilies.bold}}>Match Broadcasters</Text>
                <View style={{ backgroundColor: colors.altBackground, padding: 10, borderRadius: 5, marginBottom: 15, borderWidth: 1, borderColor: 'lightgrey'}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                    {broadcasterRender(matchInfoArray)}
                </View>
                </View>

            <Text style={{fontWeight: 500, color: colors.text, fontFamily: fontFamilies.bold}}>Match Stats</Text>
            <View style={{backgroundColor: colors.altBackground, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'lightgrey', marginBottom: 60}}>

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

                {statsPanelRender(matchInfoArray[0].statsAvailable)}
            </View>            
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

export default MatchSummary;