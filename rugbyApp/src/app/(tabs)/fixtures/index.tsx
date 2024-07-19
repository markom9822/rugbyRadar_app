import { defaultStyles, scorePanelStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"
import { InternationalRugbyTeams, getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"
import { useState } from "react"
import { LeinsterLogo } from "@/store/URCTeamLogos/URCTeams"


export type MatchInfo = {
    homeTeam: string,
    awayTeam: string,
    homeScore: string,
    awayScore: string,
}

const FixturesScreen = () => {

    const [matchesArray, setMatchesArray] = useState<MatchInfo[]>([]);

    const selectedDate = '20240713'

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates=' + selectedDate + '&lang=en&region=gb&tz=Europe/London'

        const todaysMatches = await fetch( apiString,).then((res) => res.json())

        const todaysEvents = todaysMatches.scores[0].events;
        const matchTitle = todaysMatches.scores[0].events[0].name;

        var newArray = [];

        for (let index = 0; index < todaysEvents.length; index++) {
            console.info(todaysMatches.scores[0].events[index].name)

            const homeTeamName = todaysMatches.scores[0].events[index].competitions[0].competitors[0].team.name;
            const homeTeamScore = todaysMatches.scores[0].events[index].competitions[0].competitors[0].score;
            const awayTeamName = todaysMatches.scores[0].events[index].competitions[0].competitors[1].team.name;
            const awayTeamScore = todaysMatches.scores[0].events[index].competitions[0].competitors[1].score;

            let newMatchInfo = {
                homeTeam: homeTeamName,
                awayTeam: awayTeamName,
                homeScore: homeTeamScore,
                awayScore: awayTeamScore,
             };

            newArray.push(newMatchInfo)
            
        }

        console.info(newArray)
        setMatchesArray(newArray)
    }

    return <View style={defaultStyles.container}>
        <Text style={defaultStyles.text}>Rugby Matches</Text>

        <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
        />
        <Text style={defaultStyles.text}>Date: {selectedDate}</Text>


        <FlatList 
        data={matchesArray}
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
    onPressButton: () => void
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


export const ScoreTable = () => {


}

export const ScorePanel = ({ homeTeam, awayTeam, homeScore, awayScore}: ScorePanelProps) => {

    const homeTeamInfo = getInternationalTeamInfoFromName(homeTeam);
    const awayTeamInfo = getInternationalTeamInfoFromName(awayTeam);

    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return

    return(
        <View style={scorePanelStyles.container}>
            <Text style={scorePanelStyles.teamName}>{homeTeam}</Text>
            <Image
                style={{flex:1, resizeMode: 'contain', width: 50, height: 50, minHeight:50, minWidth: 50}}
                source={homeTeamInfo.logo} />
            <Text style={scorePanelStyles.teamScore}>{homeScore}</Text>
            <Text style={scorePanelStyles.teamScore}>{awayScore}</Text>
            <Image
                style={{flex:1, resizeMode: 'contain', width: 50, height: 50, minHeight:50, minWidth: 50}}
                source={awayTeamInfo.logo} />
            <Text style={scorePanelStyles.teamName}>{awayTeam}</Text>
        </View>
    )

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
            }}>Fetch Data</Text>
        </TouchableOpacity>
    </View>
    )
}

export default FixturesScreen