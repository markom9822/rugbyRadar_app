import { defaultStyles, rankingPanelStyles} from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"
import { getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"
import { useState } from "react"


export type RankingInfo = {
    teamName: string
	teamPoints: string
    teamPosition: string
}

const RankingsScreen = () => {

    const [rankingsArray, setRankingsArray] = useState<RankingInfo[]>([]);


    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Rankings Data")

        const rankListLength = 15;
        const leagueGender = 'mru'

        const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings/' + leagueGender + '?language=en';

        const todaysRankings = await fetch( apiString,).then((res) => res.json())

        var newArray = [];

        for (let index = 0; index < rankListLength; index++) {

            const teamName = todaysRankings.entries[index].team.name;
            const rawPoints = todaysRankings.entries[index].pts;
            const teamPoints = parseFloat(rawPoints).toFixed(2);

            const teamPosition = todaysRankings.entries[index].pos;

            let newRankingInfo = {
                teamName: teamName,
                teamPoints: teamPoints,
                teamPosition: teamPosition,
             };

            newArray.push(newRankingInfo)
        }

        console.info(newArray)
        setRankingsArray(newArray)
    }


    return <View style={defaultStyles.container}>
        <Text style={defaultStyles.text}>World Rugby Rankings</Text>

        <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
        />
        
        <FlatList 
        data={rankingsArray}
        renderItem={({item}) => 
        <RankingPanel 
            teamName={item.teamName}
            teamPoints={item.teamPoints}
            teamPosition={item.teamPosition} />}
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
            }}>Fetch Rankings Data</Text>
        </TouchableOpacity>
    </View>
    )
}

type RankingPanelProps = {
	teamName: string
	teamPoints: string
    teamPosition: string
}

export const RankingPanel = ({ teamName, teamPoints, teamPosition}: RankingPanelProps) => {

    const teamInfo = getInternationalTeamInfoFromName(teamName)

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

export default RankingsScreen