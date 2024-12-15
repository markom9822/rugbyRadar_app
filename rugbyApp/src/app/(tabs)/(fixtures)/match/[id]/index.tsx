import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { Link, useLocalSearchParams, Href } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from "react-native"
import { useEffect, useState } from "react";
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo";
import { getBroadcasterLogo, getLeagueName, getPlanetRugbyMatchIDFromDetails } from "@/store/utils/helpers";
import { defaultStyles} from "@/styles";
import { getMatchInfoPlanetRugbyAPI, getMatchInfoRugbyViz, getMatchInfoWorldRugbyAPI, MatchInfo } from "@/store/utils/getMatchInfo";
import {Feather, Fontisto, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { HeadToHeadEventsPanel, TeamEventsPanel, TeamEventStatsInfo } from "@/store/components/TeamEventsPanel";
import { getTeamFormStatsPlanetRugbyAPI, getTeamFormStatsRugbyViz } from "@/store/utils/getTeamFormStats";
import { getHeadToHeadStatsPlanetRugbyAPI, getHeadToHeadStatsRugbyViz } from "@/store/utils/getHeadToHeadStats";


const MatchSummary = () => {

    const [matchInfoArray, setMatchInfoArray] = useState<MatchInfo[] | undefined>();
    const [leagueName, setLeagueName] = useState<string>('');
    const [refereeName, setRefereeName] = useState<string>('-');

    const [headToHeadStatsArray, setHeadToHeadStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [mainTeamFormStatsArray, setMainTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [opponentTeamFormStatsArray, setOpponentTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();

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
        <View style={defaultStyles.container}>

            {activityIndicatorHeader()}

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handlePressFetchData} />}>
                <GameInfoPanel
                    matchInfoArray={matchInfoArray}
                    matchID={id}
                    leagueName={leagueName}
                    refereeName={refereeName}
                />

                <HeadToHeadEventsPanel
                    teamEventArray={headToHeadStatsArray}
                    matchID={id}
                    leagueName={leagueName}
                    panelTitle="Head to Head Matches"
                    showWinLoss={false}
                    isLastItem={false}
                    teamName1={matchInfoArray[0].homeTeamName}
                    teamName2={matchInfoArray[0].awayTeamName}
                />

                <TeamEventsPanel
                    teamEventArray={mainTeamFormStatsArray}
                    matchID={id}
                    leagueName={leagueName}
                    panelTitle={`${matchInfoArray[0].homeTeamName} Form`}
                    showWinLoss={true}
                    isLastItem={false}
                    teamName={matchInfoArray[0].homeTeamName}
                />

                <TeamEventsPanel
                    teamEventArray={opponentTeamFormStatsArray}
                    matchID={id}
                    leagueName={leagueName}
                    panelTitle={`${matchInfoArray[0].awayTeamName} Form`}
                    showWinLoss={true}
                    isLastItem={true}
                    teamName={matchInfoArray[0].awayTeamName}
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

    const homePossessionPercent = (Math.round(parseFloat(matchInfoArray[0].homeTeamPossession) * 100)).toString() + ' %';
    const awayPossessionPercent = (Math.round(parseFloat(matchInfoArray[0].awayTeamPossession) * 100)).toString() + ' %';

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

    const scoreRender = (eventState: string) => {

        // not started yet
        if (eventState === "pre") {
            const matchTime = matchInfoArray[0].matchDate.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})
            return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: colors.text, textAlign: 'center', fontFamily: fontFamilies.light, fontSize: 14}}>{matchTime}</Text>
                </View>
            )
        }
        // event finished
        else if (eventState === "post")
        {
            return (
                <View>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <Text style={{ color: colors.text, fontFamily: homeFontFamily, fontSize: 18 }}>{matchInfoArray[0].homeTeamScore}</Text>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.regular, fontSize: 18 }}>-</Text>
                        <Text style={{ color: colors.text, fontFamily: awayFontFamily, fontSize: 18 }}>{matchInfoArray[0].awayTeamScore}</Text>
                    </View>
                    <View>
                        <Text style={{ color: colors.text, textAlign: 'center', fontFamily: fontFamilies.bold }}>FT</Text>
                    </View>
                </View>
            )
        }
        // event at halftime
        else if (eventState === "halfTime") {
            return (
                <View>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <Text style={{ color: colors.text, fontFamily: homeFontFamily, fontSize: 18 }}>{matchInfoArray[0].homeTeamScore}</Text>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.regular, fontSize: 18 }}>-</Text>
                        <Text style={{ color: colors.text, fontFamily: awayFontFamily, fontSize: 18 }}>{matchInfoArray[0].awayTeamScore}</Text>
                    </View>
                    <View>
                        <Text style={{ color: colors.text, textAlign: 'center', fontFamily: fontFamilies.bold }}>HT</Text>
                    </View>
                </View>
            )
        }
        // event ongoing
        else { 
            return (
                <View style={{ flexDirection: 'row', margin: 5 }}>
                        <Text style={{ color: colors.text, fontFamily: homeFontFamily, fontSize: 18 }}>{matchInfoArray[0].homeTeamScore}</Text>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.regular, fontSize: 18 }}>-</Text>
                        <Text style={{ color: colors.text, fontFamily: awayFontFamily, fontSize: 18 }}>{matchInfoArray[0].awayTeamScore}</Text>
                </View>
            )
        }
    }


    const homeFontFamily = (matchInfoArray[0].homeTeamScore > matchInfoArray[0].awayTeamScore) ? fontFamilies.bold : fontFamilies.regular;
    const awayFontFamily = (matchInfoArray[0].awayTeamScore > matchInfoArray[0].homeTeamScore) ? fontFamilies.bold : fontFamilies.regular;

    return (
        <View style={[summaryPanelStyles.container]}>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "44%"}}>
                    <Text style={{textAlign: 'center', fontFamily: fontFamilies.bold, color: colors.text, fontSize: 16, padding: 4}}>{homeTeamInfo?.abbreviation}</Text>
                    <View style={{ margin: 8 }}>
                        <Image style={[summaryPanelStyles.titleTeamLogo]}
                            source={homeTeamInfo?.logo} />
                    </View>
                </View>
                <View style={{flexDirection: 'column', width: "12%", justifyContent: 'center', alignItems: 'center'}}>
                    {scoreRender(matchInfoArray[0].matchStatus)}
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: "44%"}}>
                    <View style={{ margin: 8 }}>
                        <Image style={[summaryPanelStyles.titleTeamLogo]}
                            source={awayTeamInfo?.logo} />
                    </View>
                    <Text style={{textAlign: 'center', fontFamily: fontFamilies.bold, color: colors.text, fontSize: 16, padding: 4}}>{awayTeamInfo?.abbreviation}</Text>
                </View>
            </View>

            <View style={{ backgroundColor: colors.background, padding: 10, borderRadius: 5, marginVertical: 15, borderWidth: 1, borderColor: 'lightgrey', flex: 1 }}>
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
                <Text style={[summaryPanelStyles.statsPanelRow, {width: "50%", backgroundColor: colors.background}]}>{statTitle}</Text>
                <Text style={[summaryPanelStyles.statsPanelRow,  {width: "20%"}]}>{awayStat}</Text>
            </View>
        </View>
    )
}

type PercentageStatsPanelProps = {
	homePercent: string,
    statTitle: string,
    awayPercent: string,
    homeColour: string | undefined,
    awayColour: string | undefined,
}

export const PercentageStatsPanel = ({homePercent, statTitle, awayPercent, homeColour, awayColour}: PercentageStatsPanelProps ) => {

    console.info(`home percent: ${homePercent}`)
    const homePercentNum = Number(homePercent.replace("%", ""));
    const awayPercentNum = Number(awayPercent.replace("%", ""));

    return (
        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <Text style={[summaryPanelStyles.statsPanelRow,  {width: "20%"}]}>{homePercent}</Text>
                <Text style={[summaryPanelStyles.statsPanelRow, {width: "50%", backgroundColor: colors.background}]}>{statTitle}</Text>
                <Text style={[summaryPanelStyles.statsPanelRow,  {width: "20%"}]}>{awayPercent}</Text>
            </View>
            <View style={{flexDirection: 'row', marginHorizontal: 15}}>
                <View style={{width: `${homePercentNum}%`, height: 10, backgroundColor: homeColour, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRightWidth: 1, borderRightColor: 'lightgrey'}}>
                    <Text></Text>
                </View>
                <View style={{width: `${awayPercentNum}%`, height: 10, backgroundColor: awayColour, borderTopRightRadius: 5, borderBottomRightRadius: 5, borderLeftWidth: 1, borderLeftColor: 'lightgrey'}}>
                    <Text></Text>
                </View>
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

export default MatchSummary;