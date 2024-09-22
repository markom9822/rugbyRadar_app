import { colors, fontSize, fontWeight } from "@/constants/tokens";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { useState } from "react";
import { getAnyTeamInfoFromName, getClosestWorldCupYear, getLeagueCodeFromDisplayName, hexToRGB } from "@/store/utils/helpers";
import { defaultStyles } from "@/styles";
import { getTeamStandingsInfo } from "@/store/utils/getTeamStandingsInfo";
import { TeamSummaryPanel } from "@/store/components/TeamSummaryPanel";
import { StandingInfo, TeamStandingPanel } from "@/store/components/TeamStandingPanel";
import { TeamPlayerStatsPanel } from "@/store/components/TeamPlayerStatsPanel";
import { getPlayerSeasonStats } from "@/store/utils/getPlayerSeasonStats";


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
        homeVenue = '-'
        homeVenueCity = '-'
        homeVenueState = '-'
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
    const [teamInfoYear, setTeamInfoYear] = useState<number>(0);

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
        const thisTeamSeasonType = getAnyTeamInfoFromName(teamName).seasonType;
        console.info(thisTeamSeasonType)
        setTeamLeagueName(thisTeamLeague)
        const thisLeagueCode = getLeagueCodeFromDisplayName(thisTeamLeague)

        var targetYear = 0
        // need to get closest world cup year
        if(thisTeamLeague == "Rugby World Cup")
        {
            setTeamInfoYear(getClosestWorldCupYear(currentYear));
            targetYear = getClosestWorldCupYear(currentYear);
        }
        else
        {
            if(thisTeamSeasonType == 'north')
            {
                const seasonStartDate = new Date(currentYear, 8, 0)
                if (new Date() > seasonStartDate) {
                    setTeamInfoYear(currentYear + 1);
                    targetYear = currentYear + 1;
                }
                else
                {
                    setTeamInfoYear(currentYear);
                    targetYear = currentYear
                }
            }
            else
            {
                setTeamInfoYear(currentYear);
                targetYear = currentYear
            }
        }

        // getting this teams standings table
        const apiStringStandings = 'https://site.web.api.espn.com/apis/v2/sports/rugby/' + thisLeagueCode + '/standings?lang=en&region=gb&season='
             + targetYear + '&seasontype=1&sort=rank:asc&type=0';
            
        const seasonStandings = await fetch( apiStringStandings,).then((res) => res.json())
        const standingsInfo = getTeamStandingsInfo(seasonStandings)
        setStandingsArray(standingsInfo)

        // getting season stats
        const playerSeasonStats = await getPlayerSeasonStats(targetYear, teamID, thisTeamLeague, getAnyTeamInfoFromName(teamName).seasonType)
        setPlayerStatsArray(playerSeasonStats)
    }

    return(
        <View style={defaultStyles.container}>
            <Text style={{color: colors.text}}>Team ID {teamID}</Text>

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
            currentYear={teamInfoYear.toString()}
            />

            <TeamPlayerStatsPanel 
            playerStatsArray={playerStatsArray}
            teamLeagueName={teamLeagueName}
            currentYear={teamInfoYear.toString()}
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