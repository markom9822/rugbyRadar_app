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
import { TeamPlayerStatsPanel } from "@/store/components/TeamPlayerStatsPanel";


export const getTeamBasicInfo = (teamDetails: any) => {

    const teamName = teamDetails.team.displayName;

    var homeVenue;
    var homeVenueCity;
    var homeVenueState;
    
    if(teamDetails.team.venue !== undefined)
    {
        homeVenue = teamDetails.team.venue.fullName
        homeVenueCity = teamDetails.team.venue.address.city
        homeVenueState = teamDetails.team.venue.address.state
    }
    else
    {
        homeVenue = 'Not found'
        homeVenueCity = 'empty'
        homeVenueState = 'empty'
    }
    
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
    tries: string,
    tackles: string,
    penaltiesConc: string,
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
                console.info(eventID)
            
                const apiStatsString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';
                const statsResults = await fetch(apiStatsString,).then((res) => res.json())

                if(statsResults.boxscore.players == undefined) continue

                for (let teamIndex = 0; teamIndex < statsResults.boxscore.players.length; teamIndex++) {

                    if(statsResults.boxscore.players[teamIndex].team.id == teamID)
                    {
                        const playerCount = statsResults.boxscore.players[teamIndex].statistics[0].athletes.length;
                        for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {

                            const playerName = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].athlete.displayName;
                            const playerPosition = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].athlete.position.abbreviation;
                            const points = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[16].value;
                            const tries = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[23].value;
                            const tackles = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[20].value;
                            const penaltiesConc = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[14].value;

                            let newStatsInfo = {
                                playerName: playerName,
                                playerPosition: playerPosition,
                                points: points,
                                tries: tries,
                                tackles: tackles,
                                penaltiesConc: penaltiesConc,
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
                                const prevTries = playerStatsArray[index].tries;
                                const prevTackles = playerStatsArray[index].tackles;
                                const prevPenaltiesConc = playerStatsArray[index].penaltiesConc;

                                playerStatsArray[index] = {...playerStatsArray[index],
                                     points: prevPoints + points, tries: prevTries + tries, tackles: prevTackles + tackles,
                                      penaltiesConc: prevPenaltiesConc + penaltiesConc , matchCount: prevMatchCount + 1}
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