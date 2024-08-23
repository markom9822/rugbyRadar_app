import { colors, fontSize, fontWeight } from "@/constants/tokens";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { useState } from "react";
import { getAnyTeamInfoFromName, getLeagueCodeFromDisplayName } from "@/store/utils/helpers";
import { defaultStyles } from "@/styles";
import { getTeamInfo } from "@/store/utils/getTeamInfo";
import { getTeamStandingsInfo } from "@/store/utils/getTeamStandingsInfo";
import { TeamSummaryPanel } from "@/store/components/TeamSummaryPanel";
import { StandingInfo, TeamStandingPanel } from "@/store/components/TeamStandingPanel";


export const getTeamBasicInfo = (teamDetails: any) => {

    const teamName = teamDetails.team.displayName;
    const homeVenue = teamDetails.team.venue.fullName
    const homeVenueCity = teamDetails.team.venue.address.city
    const homeVenueState = teamDetails.team.venue.address.state

    const teamForm = teamDetails.team.form;

    return (
        {
            teamName: teamName,
            homeVenue: homeVenue,
            homeLocation: homeVenueCity + ', ' + homeVenueState,
            teamForm: teamForm,
        }
    )
}

export type SeasonStatsInfo = {
    playerName: string,
    playerPosition: string,
    points: string,
    matchCount: number,
}

export const getPlayerSeasonStats = async (
    seasonName: string, teamID: string | string[] | undefined,
     targetLeagueName: string ) => {

    // get season match stats for league
    const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates='+ seasonName +'&lang=en&limit=50&region=gb&team=' + teamID + '&tz=Europe/London';
    const teamResults = await fetch(apiString,).then((res) => res.json())
    const leagueID = getLeagueCodeFromDisplayName(targetLeagueName);

    var playerStatsArray: SeasonStatsInfo[];
    playerStatsArray=[];

    for (let index = 0; index < teamResults.scores.length; index++) {

        const leagueName = teamResults.scores[index].leagues[0].name;

        if(leagueName == targetLeagueName)
        {
            for (let eventIndex = 0; eventIndex < teamResults.scores[index].events.length; eventIndex++) {

                const eventID = teamResults.scores[index].events[eventIndex].id;
            
                const apiStatsString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';
                const statsResults = await fetch(apiStatsString,).then((res) => res.json())

                for (let teamIndex = 0; teamIndex < statsResults.boxscore.players.length; teamIndex++) {

                    if(statsResults.boxscore.players[teamIndex].team.id == teamID)
                    {
                        const playerCount = statsResults.boxscore.players[teamIndex].statistics[0].athletes.length;
                        for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {

                            const playerName = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].athlete.displayName;
                            const playerPosition = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].athlete.position.abbreviation;
                            const points = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[16].value;
        

                            let newStatsInfo = {
                                playerName: playerName,
                                playerPosition: playerPosition,
                                points: points,
                                matchCount: 1,
                            };

                            let index = playerStatsArray.findIndex(el => el.playerName === playerName);

                            // player is not in list - add it in
                            if(index < 0)
                            {
                                playerStatsArray.push(newStatsInfo);
                            }
                            else
                            {
                                const prevPoints = playerStatsArray[index].points;
                                const prevMatchCount = playerStatsArray[index].matchCount;

                                playerStatsArray[index] = {...playerStatsArray[index], points: prevPoints + points, matchCount: prevMatchCount + 1}
                            }
                        }

                    }
                    
                }

            }

        }
    }

    console.info(playerStatsArray)

    return(
        playerStatsArray
    )

}

export type TeamInfo = {
    teamName: string
    homeVenue: string
    homeLocation: string
    teamForm: string
}

const TeamSummary = () => {

    const [teamInfo, setTeamInfo] = useState<TeamInfo | undefined>();
    const [standingsArray, setStandingsArray] = useState<StandingInfo[]>([]);
    const [playerStatsArray, setPlayerStatsArray] = useState<SeasonStatsInfo[]>([]);

    const [teamLeagueName, setTeamLeagueName] = useState<string>('');

    const {teamID} = useLocalSearchParams();

    const currentYear = new Date().getFullYear().valueOf();

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch WIKI")

        // getting basic team info
        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/teams/'+ teamID;

        const teamDetails = await fetch(apiString,).then((res) => res.json())
        const basicTeamInfo = getTeamBasicInfo(teamDetails)
        const teamName = basicTeamInfo.teamName;
        setTeamInfo(basicTeamInfo)

        const thisTeamLeague = getAnyTeamInfoFromName(teamName).defaultLeague;
        setTeamLeagueName(thisTeamLeague)
        const thisLeagueCode = getLeagueCodeFromDisplayName(thisTeamLeague)

        // getting this teams standings table
        const apiStringStandings = 'https://site.web.api.espn.com/apis/v2/sports/rugby/' + thisLeagueCode + '/standings?lang=en&region=gb&season='
             + currentYear + '&seasontype=1&sort=rank:asc&type=0';
            
        const seasonStandings = await fetch( apiStringStandings,).then((res) => res.json())
        const standingsInfo = getTeamStandingsInfo(seasonStandings)
        setStandingsArray(standingsInfo)

        // getting season stats
        const playerSeasonStats = await getPlayerSeasonStats(currentYear.toString(), teamID, thisTeamLeague)
        setPlayerStatsArray(playerSeasonStats)
    }

    return(
        <View style={defaultStyles.container}>
            <Text>Team ID {teamID}</Text>

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

            <ScrollView>
        
            <TeamSummaryPanel 
            teamName={teamInfo?.teamName}
            homeVenue={teamInfo?.homeVenue}
            homeLocation={teamInfo?.homeLocation}
            teamForm={teamInfo?.teamForm}
            />

            <TeamStandingPanel
            standingsArray={standingsArray}
            teamLeagueName={teamLeagueName}
            currentTeamName={teamInfo?.teamName}
            currentYear={currentYear.toString()}/>

            <TeamPlayerStatsPanel 
            playerStatsArray={playerStatsArray}
            teamLeagueName={teamLeagueName}
            currentYear={currentYear.toString()}
            />
            </ScrollView>

        </View>
    )
}


type TeamPlayerStatsPanelProps = {
    playerStatsArray: SeasonStatsInfo[] | undefined,
    teamLeagueName: string | undefined,
    currentYear: string | undefined,
}

export const TeamPlayerStatsPanel = ({playerStatsArray, teamLeagueName, currentYear}: TeamPlayerStatsPanelProps) => {

    const [currentStatsTab, setCurrentStatsTab] = useState<string>('');

    if(playerStatsArray == undefined) return

    const filteredArray = playerStatsArray.filter(function(item){
        return Number(item.points) > 0;
     })

    const sortedArray = filteredArray.sort((a, b) => Number(b.points) - Number(a.points))

    return (
        <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text style={{fontWeight: 500}}>{currentYear} {teamLeagueName} Player Stats</Text>


            <View style={{justifyContent: 'center', paddingVertical: 5}}>

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => setCurrentStatsTab('points')} style={{padding: 3, marginHorizontal: 3, borderBottomColor: 'grey', borderBottomWidth: 2, width: "20%"}}>
                        <Text style={{textAlign: 'center'}}>Points</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{padding: 3, marginHorizontal: 3, borderBottomColor: 'grey', borderBottomWidth: 2, width: "20%"}}>
                    <Text style={{textAlign: 'center'}}>Tries</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{padding: 3, marginHorizontal: 3, borderBottomColor: 'grey', borderBottomWidth: 2, width: "20%"}}>
                    <Text style={{textAlign: 'center'}}>Tackles</Text>
                </TouchableOpacity>
            </View>

            
            
            {sortedArray.map((match, index) => {
                return (
                    <PlayerStatsItem
                    key={index}
                    playerName={match.playerName}
                    playerPosition={match.playerPosition}
                    points={match.points}
                    matchCount={match.matchCount}
                    />
                );
            })}
            </View>
        </View>
    )
}

type PlayerStatsItemProps = {
    playerName: string,
    playerPosition: string,
    points: string,
    matchCount: number,

}

export const PlayerStatsItem = ({ playerName, playerPosition, points, matchCount}: PlayerStatsItemProps) => {

    return (
        <View style={{flexDirection: 'row', paddingVertical: 2, marginVertical: 4, backgroundColor: '#f0f2f0', alignItems: 'center'}}>

            <View style={{paddingHorizontal: 3, width: "15%", borderRightColor: 'grey', borderRightWidth: 1}}>
                <Text style={{fontSize: fontSize.base, fontWeight: 500}}>{points}</Text>
            </View>
            
            <View style={{paddingHorizontal: 3, marginHorizontal: 5, width: "60%", flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{paddingHorizontal: 4}} >{playerName}</Text>
                <Text style={{fontSize: fontSize.xs, fontWeight: 600, color: 'grey' ,paddingHorizontal: 4}}>{playerPosition}</Text>
            </View>

            <View style={{paddingHorizontal: 3, width: "25%"}}>
                <Text style={{fontSize: fontSize.xs, fontWeight: 200}}>Matches: {matchCount}</Text>
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
            }}>Fetch Wiki Data</Text>
        </TouchableOpacity>
    </View>
    )
}


export default TeamSummary;