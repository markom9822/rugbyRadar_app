import { colors, fontSize } from "@/constants/tokens";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity, FlatList, Image } from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { useState } from "react";
import { getAnyTeamInfoFromName, getLeagueCodeFromDisplayName } from "@/store/utils/helpers";
import { defaultStyles } from "@/styles";
import { getTeamInfo } from "@/store/utils/getTeamInfo";
import { StormersLogo } from "@/store/URCTeamLogos/URCTeams";

export type SquadMember = {
    playerName: string,
    playerNumber: string,
    //playerCaps: string,
    //clubProvince: string,
   
}



export const getLastFiveGamesSquad = async (setCurrentSquadArray: any, teamID: string | string[] | undefined) => {

    const unique = <T extends { [key: string]: unknown }>(arr: T[], key: string): T[] => [   ...new Map(arr.map((item: T) => [item[key], item])).values() ];

    const apiString1 = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates=2024&lang=en&limit=50&region=gb&team=' + teamID + '&tz=Europe/London';

    const teamDetails = await fetch(apiString1,).then((res) => res.json())

    const teamEventID = teamDetails.scores[0].events[0].id;
    const teamLeagueID = teamDetails.scores[0].leagues[0].slug;
    const teamName = teamDetails.team.displayName;

    console.info(teamEventID)
    console.info(teamLeagueID)

    const apiString2 = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + teamLeagueID + '/summary?contentorigin=espn&event=' + teamEventID + '&lang=en&region=gb';

    const last5GamesDetails = await fetch(apiString2,).then((res) => res.json())

    var last5EventIDs = [];
    var last5Rosters = [];


    for (let index = 0; index < last5GamesDetails.lastFiveGames.length; index++) {

        if (last5GamesDetails.lastFiveGames[index].team.displayName == teamName) {
            for (let j = 0; j < last5GamesDetails.lastFiveGames[index].events.length; j++) {

                const thisEventID = last5GamesDetails.lastFiveGames[index].events[j].id
                const thisEventLeagueName = last5GamesDetails.lastFiveGames[index].events[j].leagueName;
                const thisEventLeagueID = getLeagueCodeFromDisplayName(thisEventLeagueName)

                console.info(`Event ID: ${thisEventLeagueID}`)
                if (thisEventLeagueID == undefined) {
                    continue;
                }

                last5EventIDs.push(last5GamesDetails.lastFiveGames[index].events[j].id)
                const apiString3 = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + thisEventLeagueID + '/summary?contentorigin=espn&event=' + thisEventID + '&lang=en&region=gb';
                const thisEventDetails = await fetch(apiString3,).then((res) => res.json())

                for (let x = 0; x < thisEventDetails.rosters.length; x++) {

                    if (thisEventDetails.rosters[x].team.displayName == teamName) {
                        for (let z = 0; z < thisEventDetails.rosters[x].roster.length; z++) {

                            const playerName = thisEventDetails.rosters[x].roster[z].athlete.displayName;
                            const playerNumber = thisEventDetails.rosters[x].roster[z].jersey.replace(/\s/g, "");

                            const newArray = {
                                playerName: playerName,
                                playerNumber: playerNumber,
                            };

                            last5Rosters.push(newArray)

                        }

                    }

                }


            }
        }
    }

    const last5RostersFiltered = unique(last5Rosters, 'playerName')

    setCurrentSquadArray(last5RostersFiltered)
}

export type TeamInfo = {
    teamName: string
    homeVenue: string
    teamForm: string
}



const TeamSummary = () => {

    const [currentSquadArray, setCurrentSquadArray] = useState<SquadMember[] | undefined>();
    const [teamInfo, setTeamInfo] = useState<TeamInfo | undefined>();


    const {teamID} = useLocalSearchParams();

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch WIKI")

        // try collect lineups from last 5 games
        // this will  the current squad


        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/teams/'+ teamID;

        const teamDetails = await fetch(apiString,).then((res) => res.json())

        const teamName = teamDetails.team.displayName;
        const homeVenue = teamDetails.team.venue.fullName
        const homeVenueCity = teamDetails.team.venue.address.city
        const homeVenueState = teamDetails.team.venue.address.state

        const teamForm = teamDetails.team.form;

        setTeamInfo({
            teamName: teamName,
            homeVenue: homeVenue + ', ' + homeVenueCity + ', ' + homeVenueState,
            teamForm: teamForm,
        })
    }

    return(
        <View style={defaultStyles.container}>
            <Text>Team Name</Text>
            <Text>Team ID {teamID}</Text>

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

            <TeamSummaryPanel 
            teamName={teamInfo?.teamName}
            homeVenue={teamInfo?.homeVenue}
            teamForm={teamInfo?.teamForm}
            />

        </View>
    )
}

type TeamSummaryPanelProps = {
    teamName: string | undefined
    homeVenue: string | undefined
    teamForm: string | undefined
}


export const TeamSummaryPanel = ({ teamName, homeVenue, teamForm}: TeamSummaryPanelProps) => {

    const teamTextInfo = "The Ireland national rugby union team is the men's representative " + 
    "national team for the island of Ireland in rugby union. The team represents both the Republic of Ireland and Northern Ireland.\n\n" +  
    "Ireland competes in the annual Six Nations Championship and in the Rugby World Cup. Ireland is one of the four unions that make up" + 
    " the British & Irish Lions." + 
    "The Ireland national team dates to 1875, when it played its first international match against England."

    if(teamName == undefined) return
    if(homeVenue == undefined) return


    const teamInfo = getAnyTeamInfoFromName(teamName)

    return(
        <View style={{justifyContent: 'center', marginHorizontal: 3}}>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
                <Image source={teamInfo.logo} 
                    style={{resizeMode: 'contain',
                        width: 50,
                        height: 50,
                        minHeight:50,
                        minWidth: 50,}}/>
                <Text style={{fontSize: fontSize.lg, padding: 10 }}>{teamName}</Text>
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <MaterialIcons name="stadium" size={20} color={'black'} />
                <Text>{homeVenue}</Text>
            </View>
            

            <Text>Team Form : {teamForm}</Text>

            <View style={{marginVertical: 10}}>
                <Text>Team Info</Text>
                <View style={{marginVertical: 5, padding: 5, borderColor: 'grey', borderWidth: 1}}>
                    <Text>{teamInfo.textInfo}</Text>
                </View>
                
            </View>
    
        </View>
    )
}


type CurrentSquadPanelProps = {
    playerName: string
    playerNumber: string
}


export const CurrentSquadPanel = ({ playerName, playerNumber}: CurrentSquadPanelProps) => {

    return(
        <View style={{flexDirection: 'row'}}>
            <Text>{playerNumber}</Text>
            <Text>{playerName}</Text>
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