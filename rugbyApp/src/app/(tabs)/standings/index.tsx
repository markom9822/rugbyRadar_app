import { defaultStyles, fixtureStyles, rankingPanelStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"
import { InternationalRugbyTeams, getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"
import { useState } from "react"
import { isEnabled } from "react-native/Libraries/Performance/Systrace"
import Entypo from '@expo/vector-icons/Entypo';
import { getURCTeamInfoFromName } from "@/store/URCRugbyTeamsDatabase"

export type StandingInfo = {
    teamName: string
	//teamPoints: string
    //teamPosition: string
}

const StandingsScreen = () => {
    const [standingsArray, setStandingsArray] = useState<StandingInfo[]>([]);


    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Standings")

        const rankListLength = 15;
        const season = '2024'

        const apiString = 'https://site.web.api.espn.com/apis/v2/sports/rugby/270557/standings?lang=en&region=gb&season=2024&seasontype=1&sort=rank:asc&type=0';

        const seasonStandings = await fetch( apiString,).then((res) => res.json())
        console.info(seasonStandings.children[0].standings.entries[0].team.displayName)
        const standingsCount = seasonStandings.children[0].standings.entries.length;

        var newArray = [];

        for (let index = 0; index < standingsCount; index++) {

            const teamName = seasonStandings.children[0].standings.entries[index].team.displayName;

            //const teamPosition = todaysRankings.entries[index].pos;

            let newRankingInfo = {
                teamName: teamName,
             };

            newArray.push(newRankingInfo)
        }

        console.info(newArray)
        setStandingsArray(newArray)
    }


    return <View style={defaultStyles.container}>
        <Text style={defaultStyles.text}>Rugby Standings</Text>

        <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
        />
        
        <FlatList 
        data={standingsArray}
        renderItem={({item}) => 
        <StandingPanel 
            teamName={item.teamName}
            teamPoints='10'
            teamPosition='0' />}
        />

    </View>
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
            }}>Fetch Standings Data</Text>
        </TouchableOpacity>
    </View>
    )
}

type StandingPanelProps = {
	teamName: string
	teamPoints: string
    teamPosition: string
}

export const StandingPanel = ({ teamName, teamPoints, teamPosition}: StandingPanelProps) => {

    const teamInfo = getURCTeamInfoFromName(teamName)

    if(teamInfo === null) return

    return(
        <View style={rankingPanelStyles.container}>
            <Image
                style={{flex:1, resizeMode: 'contain', width: 50, height: 50, minHeight: 50, minWidth: 50}}
                source={teamInfo.logo} />
            <Text style={rankingPanelStyles.teamName}>{teamName}</Text>
            <Text style={rankingPanelStyles.teamPoints}>{teamPoints}</Text>
        </View>
    )

}

export default StandingsScreen