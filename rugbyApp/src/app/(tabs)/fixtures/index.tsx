import { defaultStyles, scorePanelStyles,testingStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"
import { InternationalRugbyTeams, getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"
import { useState } from "react"
import { isEnabled } from "react-native/Libraries/Performance/Systrace"


export type MatchInfo = {
    homeTeam: string,
    awayTeam: string,
    homeScore: string,
    awayScore: string,
    matchDate: Date,
}

const FixturesScreen = () => {

    const [matchesArray, setMatchesArray] = useState<MatchInfo[]>([]);
    const [currentIndex, setCurrentIndex] = useState<Number | null>(null);


    const selectedDate = '20240720'

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

            const matchDate = new Date(todaysMatches.scores[0].events[index].date)
            console.info(todaysMatches.scores[0].events[index].status.type.shortDetail)

            let newMatchInfo = {
                homeTeam: homeTeamName,
                awayTeam: awayTeamName,
                homeScore: homeTeamScore,
                awayScore: awayTeamScore,
                matchDate: matchDate,
             };

            newArray.push(newMatchInfo)
        }

        const sortedArray = newArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())
        console.info(sortedArray)
        setMatchesArray(sortedArray)
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

        <View style={testingStyles.container}>
        {matchesArray.map(({homeTeam, awayTeam, homeScore, awayScore, matchDate}, index) => {
        return (
          <TouchableOpacity
            key={homeTeam}
            onPress={() => {
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={testingStyles.cardContainer}
            activeOpacity={0.9}
          >
            <ScorePanel 
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            homeScore={homeScore} 
            awayScore={awayScore}
            matchDate={matchDate}
            index={index}
            currentIndex={currentIndex}/>
          </TouchableOpacity>
        );
      })}


        </View>
        

    </View>
}

type FetchDataButtonProps = {
	style?: ViewStyle
	iconSize?: number
    onPressButton: () => void
}

type ScorePanelProps = {
    index: number
    currentIndex: Number | null
	homeTeam: string
	awayTeam: string
    homeScore: string
    awayScore: string
    matchDate: Date
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

export const ScorePanel = ({ homeTeam, awayTeam, homeScore, awayScore, matchDate, index, currentIndex}: ScorePanelProps) => {

    const [expanded, setExpanded] = useState(false); 

    const homeTeamInfo = getInternationalTeamInfoFromName(homeTeam);
    const awayTeamInfo = getInternationalTeamInfoFromName(awayTeam);

    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return

    const handlePressPanel = () => {
        setExpanded(!expanded); 
    }

    const matchTime = matchDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})

    return(
        <View style={[testingStyles.card]}>
              <View style={[testingStyles.cardHeaderInfo]}>
                <Text style={[testingStyles.teamName]}>{homeTeam}</Text>
                <Image
                    style={[testingStyles.teamLogo]}
                    source={homeTeamInfo.logo} />

                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[testingStyles.teamScore]}>{homeScore}</Text>
                        <Text style={[testingStyles.teamScore]}>{awayScore}</Text>
                    </View>
                    <Text>{matchTime}</Text>
                </View>

                <Image
                    style={[testingStyles.teamLogo]}
                    source={awayTeamInfo.logo} />
                <Text style={[testingStyles.teamName]}>{awayTeam}</Text>
              </View>

              {index === currentIndex && (
                <View style={testingStyles.subCategoriesList}>
                  <Text>This is where match info will be</Text>
                </View>
              )}
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