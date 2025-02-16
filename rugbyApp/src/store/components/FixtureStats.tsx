import { colors, fontFamilies, fontSize } from "@/constants/tokens";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { getFullMatchStatsPlanetRugbyAPI, getFullMatchStatsRugbyViz, getFullMatchStatsWorldRugbyAPI } from "../utils/getFullMatchStats";
import { StatsInfo, StatsPanel } from "./StatsPanel";


type FixtureStats = {
    id: string,
    isShown: boolean,

}

export const FixtureStats = ({ id, isShown }: FixtureStats) => {

    const [matchStatsArray, setMatchStatsArray] = useState<StatsInfo[] | undefined>();
    
        const [mainTeamName, setMainTeamName] = useState<string | undefined>();
        const [opponentTeamName, setOpponentTeamName] = useState<string | undefined>();
        const [leagueName, setLeagueName] = useState<string>('');
        const [isLoading, setIsLoading] = useState(false);
        const [refreshing, setRefreshing] = useState(false);
        
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
    
                setMatchStatsArray(fullMatchStats)
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
    
                setMainTeamName(homeTeam)
                setOpponentTeamName(awayTeam)
                
                const fullMatchStats = getFullMatchStatsWorldRugbyAPI(matchStats)
    
                setMatchStatsArray(fullMatchStats)
    
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
    
                setMainTeamName(homeTeam)
                setOpponentTeamName(awayTeam)
    
                const fullMatchStats = getFullMatchStatsPlanetRugbyAPI(matchStats)
            
                setMatchStatsArray(fullMatchStats)
    
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
    
        return (

            <View>
            {isShown &&
    
                <BottomSheetScrollView>

                        {activityIndicatorHeader()}

                        <StatsPanel
                        matchInfoArray={matchStatsArray}
                        matchID={id}
                        leagueName={leagueName} />
        
                </BottomSheetScrollView>}
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