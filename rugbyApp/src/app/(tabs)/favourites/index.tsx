import { defaultStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"


const FavouritesScreen = () => {
    return <View style={defaultStyles.container}>
        <Text style={defaultStyles.text}>Rugby Matches</Text>
        <FetchDataButton iconSize={24} style={{
            backgroundColor: '#4287f5'
        }}/>
    </View>
}

type FetchDataButtonProps = {
	style?: ViewStyle
	iconSize?: number
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
		<View style={[{ height: iconSize }, style]}>
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