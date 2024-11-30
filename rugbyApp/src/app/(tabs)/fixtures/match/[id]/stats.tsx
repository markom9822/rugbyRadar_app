import { View, ScrollView, ActivityIndicator, RefreshControl} from "react-native"
import { useGlobalSearchParams } from "expo-router";
import { getPlanetRugbyMatchIDFromDetails } from "@/store/utils/helpers";
import { defaultStyles} from "@/styles";
import { useEffect, useState } from "react";
import { StatsPanel, StatsInfo } from "@/store/components/StatsPanel";
import { getFullMatchStatsPlanetRugbyAPI, getFullMatchStatsRugbyViz, getFullMatchStatsWorldRugbyAPI } from "@/store/utils/getFullMatchStats";
import { HeadToHeadEventsPanel, TeamEventsPanel, TeamEventStatsInfo } from "@/store/components/TeamEventsPanel";
import { getHeadToHeadStatsPlanetRugbyAPI, getHeadToHeadStatsRugbyViz } from "@/store/utils/getHeadToHeadStats";
import { getTeamFormStatsPlanetRugbyAPI, getTeamFormStatsRugbyViz } from "@/store/utils/getTeamFormStats";


const MatchSummary = () => {
    const [matchStatsArray, setMatchStatsArray] = useState<StatsInfo[] | undefined>();
    const [headToHeadStatsArray, setHeadToHeadStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [mainTeamFormStatsArray, setMainTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();
    const [opponentTeamFormStatsArray, setOpponentTeamFormStatsArray] = useState<TeamEventStatsInfo[] | undefined>();

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

            setMainTeamName(homeTeam)
            setOpponentTeamName(awayTeam)

            const fullMatchStats = getFullMatchStatsRugbyViz(matchStats)
            const headToHeadStats = await getHeadToHeadStatsRugbyViz(matchStats)
            const mainTeamFormStats = await getTeamFormStatsRugbyViz(matchStats, true)
            const opponentTeamFormStats = await getTeamFormStatsRugbyViz(matchStats, false)

            setMatchStatsArray(fullMatchStats)
            setHeadToHeadStatsArray(headToHeadStats)
            setMainTeamFormStatsArray(mainTeamFormStats)
            setOpponentTeamFormStatsArray(opponentTeamFormStats)
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
            
            const fullMatchStats = getFullMatchStatsWorldRugbyAPI(matchStats)
            
            // use planet rugby for head to head stats
            const planetRugbyMatchID = await getPlanetRugbyMatchIDFromDetails(matchDate, homeTeam, awayTeam);
            const apiPlanetRugbyString = 'https://rugbylivecenter.yormedia.com/api/match-h2h/'+planetRugbyMatchID;
            const matchPlanetRugbyStats = await fetch( apiPlanetRugbyString,).then((res) => res.json())

            const headToHeadStats = getHeadToHeadStatsPlanetRugbyAPI(matchPlanetRugbyStats)
            const mainTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchPlanetRugbyStats, true)
            const opponentTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchPlanetRugbyStats, false)

            setMatchStatsArray(fullMatchStats)
            setHeadToHeadStatsArray(headToHeadStats)
            setMainTeamFormStatsArray(mainTeamFormStats)
            setOpponentTeamFormStatsArray(opponentTeamFormStats)

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

            const fullMatchStats = getFullMatchStatsPlanetRugbyAPI(matchStats)
            const headToHeadStats = getHeadToHeadStatsPlanetRugbyAPI(matchStats)
            const mainTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchStats, true)
            const opponentTeamFormStats = getTeamFormStatsPlanetRugbyAPI(matchStats, false)

            setMatchStatsArray(fullMatchStats)
            setHeadToHeadStatsArray(headToHeadStats)
            setMainTeamFormStatsArray(mainTeamFormStats)
            setOpponentTeamFormStatsArray(opponentTeamFormStats)

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
                <StatsPanel
                matchInfoArray={matchStatsArray}
                matchID={id}
                leagueName={leagueName} />

                <HeadToHeadEventsPanel
                teamEventArray={headToHeadStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle="Head to Head Matches"
                showWinLoss={false}
                isLastItem={false}
                teamName1={mainTeamName}
                teamName2={opponentTeamName}
                />

                <TeamEventsPanel 
                teamEventArray={mainTeamFormStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle={`${mainTeamName} Form`}
                showWinLoss={true}
                isLastItem={false}
                teamName={mainTeamName}
                />

                <TeamEventsPanel 
                teamEventArray={opponentTeamFormStatsArray}
                matchID={id}
                leagueName={leagueName}
                panelTitle={`${opponentTeamName} Form`}
                showWinLoss={true}
                isLastItem={true}
                teamName={opponentTeamName}
                />

            </ScrollView>
            
        </View>
    )
}


export default MatchSummary;