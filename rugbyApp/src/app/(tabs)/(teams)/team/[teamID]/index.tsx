import { colors, fontSize, fontWeight } from "@/constants/tokens";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { useState } from "react";
import { getAnyTeamInfoFromName, getLeagueCodeFromDisplayName } from "@/store/utils/helpers";
import { defaultStyles } from "@/styles";
import { getTeamInfo } from "@/store/utils/getTeamInfo";


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



export const getTeamStandingsInfo = (seasonStandings: any) => {

    var newArray = [];

    const standingsChildren = seasonStandings.children.length

    for (let j = 0; j < seasonStandings.children.length; j++) {

        const standingsCount = seasonStandings.children[j].standings.entries.length;
        
        for (let index = 0; index < standingsCount; index++) {

            const teamPool = seasonStandings.children[j].name;
            if(index == 0 && standingsChildren > 1)
            {
                let headerRankingInfo = {
                    isHeader: true,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamPD: '0',
                    teamPoints: '0',
                };

                newArray.push(headerRankingInfo)
            }

            const teamName = seasonStandings.children[j].standings.entries[index].team.displayName;
            const teamGP = seasonStandings.children[j].standings.entries[index].stats[7].value;
            const teamPD = seasonStandings.children[j].standings.entries[index].stats[11].value;
            const teamPoints = seasonStandings.children[j].standings.entries[index].stats[12].value;

            let newRankingInfo = {
                    isHeader: false,
                    teamPool: teamPool,
                    teamName: teamName,
                    teamGP: teamGP,
                    teamPD: teamPD,
                    teamPoints: teamPoints,
            };

            newArray.push(newRankingInfo)
        }
    }

    console.info(newArray)

    return(
        newArray
    )

}

export type SeasonStatsInfo = {
    playerName: string,
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
                            const points = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[16].value;

                            let newStatsInfo = {
                                playerName: playerName,
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

export type StandingInfo = {
    isHeader: boolean
    teamPool: string
    teamName: string
	teamGP: string
    teamPD: string
    teamPoints: string
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

type TeamSummaryPanelProps = {
    teamName: string | undefined
    homeVenue: string | undefined
    homeLocation: string | undefined
    teamForm: string | undefined
}


export const TeamSummaryPanel = ({ teamName, homeVenue, homeLocation, teamForm}: TeamSummaryPanelProps) => {

    if(teamName == undefined) return
    if(homeVenue == undefined) return


    const teamInfo = getAnyTeamInfoFromName(teamName)

    const foundedYear = Number(teamInfo.foundedYear);
    const currentYear = Number(new Date().getFullYear().valueOf());
    const yearDiff = currentYear - foundedYear;

    return(
        <View style={{justifyContent: 'center', marginHorizontal: 3}}>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
                <Image source={teamInfo.logo} 
                    style={{resizeMode: 'contain',
                        width: 60,
                        height: 60,
                        minHeight:60,
                        minWidth: 60,}}/>
                <View style={{flexDirection: 'column', paddingHorizontal: 5}}>
                    <Text style={{fontSize: fontSize.lg, fontWeight: 600}}>{teamName.toUpperCase()}</Text>
                    <Text style={{color: 'grey'}}>{teamForm}</Text>
                </View>
                
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <MaterialIcons name="stadium" size={20} color={'grey'} />
                <Text style={{paddingHorizontal: 5}}>{homeVenue}</Text>
            </View>

            <View>
                <Text>Location: {homeLocation}</Text>
            </View>

            <View>
                <Text>Founded: {teamInfo.foundedYear} ({yearDiff} years ago)</Text>
            </View>
    
        </View>
    )
}

type TeamStandingPanelProps = {
    standingsArray: StandingInfo[] | undefined,
    teamLeagueName: string | undefined,
    currentTeamName: string | undefined,
    currentYear: string | undefined,

}

export const TeamStandingPanel = ({ standingsArray, teamLeagueName, currentTeamName, currentYear}: TeamStandingPanelProps) => {

    if(standingsArray == undefined) return

    return (
        <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text style={{fontWeight: 500}}>{currentYear} {teamLeagueName} Table</Text>

            <View style={{ flexDirection: 'row', paddingVertical: 2, borderTopColor: 'grey', borderTopWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1}}>
                <Text style={{ width: "10%" }}>R</Text>
                <Text style={{ width: "40%" }}>TEAM</Text>
                <Text style={{ width: "15%", textAlign: 'right' }}>GP</Text>
                <Text style={{ width: "20%", textAlign: 'right' }}>PD</Text>
                <Text style={{ width: "15%", textAlign: 'right' }}>P</Text>
            </View>

            <View>
            {standingsArray.map((match, index) => {
                return (
                    <TeamStandingItem
                    key={index}
                    teamName={match.teamName}
                    gamesPlayed={match.teamGP}
                    pointsDiff={match.teamPD}
                    points={match.teamPoints}
                    index={index}
                    isCurrentTeam={currentTeamName == match.teamName}
                    isLastItem={index == standingsArray.length-1}
                    />
                );
            })}
            </View>
        </View>
    )
}

type TeamStandingItemProps = {
    teamName: string
    gamesPlayed: string
    pointsDiff: string
    points: string
    index: number
    isCurrentTeam: boolean
    isLastItem: boolean
}

export const TeamStandingItem = ({ teamName, gamesPlayed, pointsDiff, points, index, isCurrentTeam, isLastItem}: TeamStandingItemProps) => {

    const ranking = index + 1;
    const textWeight = (isCurrentTeam) ? ('600'):('400');

    const itemBottomBorderColour = (isLastItem) ? ('grey'):('lightgrey');

    return (
        <View style={{flexDirection: 'row', paddingVertical: 2, borderBottomColor: itemBottomBorderColour, borderBottomWidth: 1 }}>
            <Text style={{width: "10%", fontWeight: textWeight}}>{ranking}</Text>
            <Text style={{width: "40%", fontWeight: textWeight}}>{teamName}</Text>
            <Text style={{width: "15%", fontWeight: textWeight, textAlign: 'right'}}>{gamesPlayed}</Text>
            <Text style={{width: "20%", fontWeight: textWeight, textAlign: 'right'}}>{pointsDiff}</Text>
            <Text style={{width: "15%", fontWeight: textWeight, textAlign: 'right'}}>{points}</Text>
        </View>
    )
}

type TeamPlayerStatsPanelProps = {
    playerStatsArray: SeasonStatsInfo[] | undefined,
    teamLeagueName: string | undefined,
    currentYear: string | undefined,
}

export const TeamPlayerStatsPanel = ({playerStatsArray, teamLeagueName, currentYear}: TeamPlayerStatsPanelProps) => {

    if(playerStatsArray == undefined) return

    const filteredArray = playerStatsArray.filter(function(item){
        return Number(item.points) > 0;
     })

    const sortedArray = filteredArray.sort((a, b) => Number(b.points) - Number(a.points))

    return (
        <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text style={{fontWeight: 500}}>{currentYear} {teamLeagueName} Player Stats</Text>


            <View style={{justifyContent: 'center', paddingVertical: 5}}>

            <View style={{paddingTop: 3, borderBottomColor: 'grey', borderBottomWidth: 2}}>
                <Text>Points Leaders</Text>
            </View>
            
            {sortedArray.map((match, index) => {
                return (
                    <PlayerStatsItem
                    key={index}
                    playerName={match.playerName}
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
    points: string,
    matchCount: number,

}

export const PlayerStatsItem = ({ playerName, points, matchCount}: PlayerStatsItemProps) => {

    return (
        <View style={{flexDirection: 'row', paddingVertical: 2 }}>

            <View style={{paddingHorizontal: 3}}>
                <Text style={{fontSize: fontSize.base, fontWeight: 500}}>{points}</Text>
            </View>
            
            <View style={{paddingHorizontal: 3}}>
                <Text>{playerName}</Text>
            </View>

            <View style={{paddingHorizontal: 3}}>
                <Text>Matches: {matchCount}</Text>
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