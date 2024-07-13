import { defaultStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"
import { rugbyTeams, getTeamInfoFromName } from "@/store/rugbyTeamsDatabase"
import { useState } from "react"


const FavouritesScreen = () => {

    const [matchesArray, setMatchesArray] = useState(null);

    const selectedDate = '20240713'

    return <View style={defaultStyles.container}>
        <Text style={defaultStyles.text}>Rugby Matches</Text>
        <FetchDataButton iconSize={24} style={{
            backgroundColor: '#4287f5'
        }}/>
        <Text style={defaultStyles.text}>Date: {selectedDate}</Text>

        <FlatList 
        data={mockMatchData}
        renderItem={({item}) => 
        <ScorePanel 
            homeTeam={item.homeTeam} 
            awayTeam={item.awayTeam} 
            homeScore={item.homeScore}
            awayScore={item.awayScore}/>}
        />

    </View>
}

type FetchDataButtonProps = {
	style?: ViewStyle
	iconSize?: number
}

type ScorePanelProps = {
	homeTeam: string
	awayTeam: string
    homeScore: string
    awayScore: string
}

export const mockMatchData = [
    {
        homeTeam: 'South Africa',
        awayTeam: 'Ireland',
        homeScore: '20',
        awayScore: '18',
    },
    {
        homeTeam: 'Australia',
        awayTeam: 'Wales',
        homeScore: '36',
        awayScore: '26',
    },
    {
        homeTeam: 'New Zealand',
        awayTeam: 'England',
        homeScore: '22',
        awayScore: '9',
    },
  ];

const createMatchesArray = () => {

}


export const ScoreTable = () => {


}

export const ScorePanel = ({ homeTeam, awayTeam, homeScore, awayScore}: ScorePanelProps) => {

    const homeTeamInfo = getTeamInfoFromName(homeTeam);
    const awayTeamInfo = getTeamInfoFromName(awayTeam);

    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return

    return(
        <View style={{flexDirection: 'row', padding: 10, backgroundColor: '#272829', margin: 5 }}>
            <Image
                style={{flex:1, resizeMode: 'contain', width: 50, height: 50, minHeight:50, minWidth: 50}}
                source={{uri: homeTeamInfo.logo}} />
            <Text style={defaultStyles.text}>{homeScore}</Text>
            <Image
                style={{flex:1, resizeMode: 'contain', width: 50, height: 50, minHeight:50, minWidth: 50}}
                source={{uri: awayTeamInfo.logo}} />
            <Text style={defaultStyles.text}>{awayScore}</Text>
        </View>
    )

}

export const FetchDataButton = ({ style, iconSize = 48 }: FetchDataButtonProps) => {

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const todaysMatches = await fetch(
            'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates=20240713&lang=en&region=gb&tz=Europe/London',
          ).then((res) => res.json())


        console.info(todaysMatches.scores[0].events.length)

        const todaysEvents = todaysMatches.scores[0].events;
        const matchTitle = todaysMatches.scores[0].events[0].name;

        const homeTeamName = todaysMatches.scores[0].events[0].competitions[0].competitors[0].team.name;
        const homeTeamScore = todaysMatches.scores[0].events[0].competitions[0].competitors[0].score;

        const awayTeamName = todaysMatches.scores[0].events[0].competitions[0].competitors[1].team.name;
        const awayTeamScore = todaysMatches.scores[0].events[0].competitions[0].competitors[1].score;


        for (let index = 0; index < todaysEvents.length; index++) {
            console.info(todaysMatches.scores[0].events[index].name)
        }
        
    }

	return (
		<View style={[{ height: 50}, style]}>
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={handlePressFetchData}
			>
				<MaterialCommunityIcons name="rugby" size={iconSize} color={colors.text} />
                <Text style={{
                    fontSize: fontSize.base,
                    color: colors.text,
                    backgroundColor: '#4287f5',
                }}>Fetch Data</Text>
			</TouchableOpacity>
		</View>
	)
}


export default FavouritesScreen