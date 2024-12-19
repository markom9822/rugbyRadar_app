import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, RefreshControl} from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { getLeagueName, getPlanetRugbyMatchIDFromDetails, hexToRGB } from "@/store/utils/helpers";
import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { getHomeAwayTeamInfo} from "@/store/utils/getTeamInfo";
import { defaultStyles} from "@/styles";
import { useEffect, useState } from "react";
import { StatsPanel, StatsInfo } from "@/store/components/StatsPanel";
import { getFullMatchStatsPlanetRugbyAPI, getFullMatchStatsRugbyViz, getFullMatchStatsWorldRugbyAPI } from "@/store/utils/getFullMatchStats";
import { HeadToHeadEventsPanel, TeamEventsPanel, TeamEventStatsInfo } from "@/store/components/TeamEventsPanel";
import { getHeadToHeadStatsPlanetRugbyAPI, getHeadToHeadStatsRugbyViz, getHeadToHeadStatsWorldRugbyAPI } from "@/store/utils/getHeadToHeadStats";
import { getTeamFormStatsPlanetRugbyAPI, getTeamFormStatsRugbyViz, getTeamFormStatsWorldRugbyAPI } from "@/store/utils/getTeamFormStats";
import { getKeyEventsPlanetRugbyAPI, getKeyEventsRugbyViz, getKeyEventsWorldRugbyAPI } from "@/store/utils/getKeyEvents";


const MatchEvents = () => {
    const [keyEventsArray, setKeyEventsArray] = useState<KeyEventsInfo[] | undefined>();

    const [mainTeamName, setMainTeamName] = useState<string | undefined>();
    const [opponentTeamName, setOpponentTeamName] = useState<string | undefined>();
    const [leagueName, setLeagueName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const {id} = useGlobalSearchParams();

    const eventID = new String(id).substring(0,6);
    const leagueID = new String(id).slice(6)

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")
        setIsLoading(true)

        // handle differently - separate API
        if(leagueID.indexOf("_RugbyViz") !== -1){

            const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/' + eventID + '?provider=rugbyviz';
            console.info(apiString)
            
            const matchStats = await fetch(apiString,).then((res) => res.json())
            const homeTeam = matchStats.data.homeTeam.name;
            const awayTeam = matchStats.data.awayTeam.name;

            console.info(homeTeam  + awayTeam)

            setMainTeamName(homeTeam)
            setOpponentTeamName(awayTeam)

            const keyEvents = getKeyEventsRugbyViz(matchStats)
            console.info(keyEvents)

            setKeyEventsArray(keyEvents)
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
    
            const matchStats = await fetch( apiString,).then((res) => res.json())
            const homeTeam = matchStats.match.teams[0].name;
            const awayTeam = matchStats.match.teams[1].name;
            const matchDate = new Date(matchStats.match.time.millis)

            setMainTeamName(homeTeam)
            setOpponentTeamName(awayTeam)        

            const timelineApiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/'+worldRugbyAPIEventID+'/timeline?language=en';
            const timelineStats = await fetch( timelineApiString,).then((res) => res.json())
            const keyEvents = await getKeyEventsWorldRugbyAPI(timelineStats)

            setKeyEventsArray(keyEvents)

            setLeagueName(worldRugbyAPILeagueName)
            
            setIsLoading(false)
            return;
        }

        // use planet rugby API
        if (id.indexOf("_PlanetRugbyAPI") !== -1) {
            const separatedArray = id.toString().split("_");
            const planetRugbyAPIEventID = separatedArray[0];
            const planetRugbyAPILeagueName = separatedArray[1]

            const apiString = 'https://rugbylivecenter.yormedia.com/api/match-h2h/'+planetRugbyAPIEventID;

            const matchStats = await fetch(apiString,).then((res) => res.json())
            const [homeTeam, awayTeam] = matchStats.data.matchDetails.teams.split(';');
            const [homeTeamID, awayTeamID] = matchStats.data.matchDetails.team_ids.split(';');

            setMainTeamName(homeTeam)
            setOpponentTeamName(awayTeam)

            const timelineApiString = 'https://rugbylivecenter.yormedia.com/api/match-detail/'+planetRugbyAPIEventID;
            const timelineStats = await fetch(timelineApiString,).then((res) => res.json())
            const keyEvents = getKeyEventsPlanetRugbyAPI(timelineStats, homeTeam, awayTeam, homeTeamID, awayTeamID)
            setKeyEventsArray(keyEvents)

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

    return(
        <View style={defaultStyles.container}>

            {activityIndicatorHeader()}

            <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handlePressFetchData} />}>

                <KeyEventsPanel
                keyEventArray={keyEventsArray}
                matchID={id} 
                homeTeam={mainTeamName}
                awayTeam={opponentTeamName}
                leagueName={leagueName}
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
        return (
            <View style={[keyEventsPanelStyles.container]}>

                <View style={{ backgroundColor: colors.background, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'lightgrey' }}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingVertical: 5 }}>
                        <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={[keyEventsPanelStyles.teamLogo]}
                                source={homeAwayTeamInfo?.homeInfo.logo} />
                        </View>

                        <View style={{ width: "50%", justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={[keyEventsPanelStyles.teamLogo]}
                                source={homeAwayTeamInfo?.awayInfo.logo} />
                        </View>

                    </View>

                    <View style={{marginVertical: 15}}>
                        <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, textAlign: 'center' }}>Currently no key events</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={[keyEventsPanelStyles.container, {marginBottom: 60}]}>

            <View style={{backgroundColor: colors.background, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: 'lightgrey', width: "90%"}}>

                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingVertical: 5}}>
                    <View style={{width: "50%", justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[keyEventsPanelStyles.teamLogo]} 
                        source={homeAwayTeamInfo?.homeInfo.logo}/>
                    </View>

                    <View style={{width: "50%", justifyContent: 'center', alignItems: 'center'}}>
                        <Image style={[keyEventsPanelStyles.teamLogo]} 
                        source={homeAwayTeamInfo?.awayInfo.logo}/>
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
                    teamColour={match.eventTeam == homeTeam ? homeAwayTeamInfo?.homeInfo.colour : homeAwayTeamInfo?.awayInfo.colour}
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
    teamColour: string | undefined
}

export const KeyEventItem = ({leagueName, eventTime, eventType, eventPlayer, eventScore, eventTeam, eventIcon, isHomeTeam, teamColour}: KeyEventItemProps) => {

    if(teamColour == undefined) return;

    const borderColour = hexToRGB(teamColour, "0.6")

    const eventRender = (isHome: boolean) => {

        if (isHome) {
            return (
                <View style={{ flexDirection: 'row', marginVertical: 5, justifyContent: 'flex-end', alignItems: 'center' }}>

                    <View style={{width: "40%", flexDirection: 'column', paddingVertical: 2, borderBottomColor: borderColour, borderBottomWidth: 1}}>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.light }}>{eventPlayer}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular }}>{eventTime}'</Text>
                            <Text style={{ marginHorizontal: 10, color: colors.text, fontFamily: fontFamilies.regular }}>{eventScore}</Text>
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

                    <View style={{width: "40%", flexDirection: 'column', borderBottomColor: borderColour, borderBottomWidth: 1}}>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.light }}>{eventPlayer}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 500, color: colors.text, fontFamily: fontFamilies.regular }}>{eventTime}'</Text>
                            <Text style={{ marginHorizontal: 10, color: colors.text, fontFamily: fontFamilies.regular}}>{eventScore}</Text>
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



export default MatchEvents;