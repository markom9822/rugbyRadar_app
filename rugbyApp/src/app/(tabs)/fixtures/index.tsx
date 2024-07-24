import { defaultStyles, fixtureStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList, Pressable } from "react-native"
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { colors, fontSize } from "@/constants/tokens"
import { InternationalRugbyTeams, getInternationalTeamInfoFromName } from "@/store/InternationalRugbyTeamsDatabase"
import { useState } from "react"
import { isEnabled } from "react-native/Libraries/Performance/Systrace"
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from "expo-router"


export type MatchInfo = {
    homeTeam: string,
    awayTeam: string,
    homeScore: string,
    awayScore: string,
    matchDate: Date,
    matchTitle: string,
    matchVenue: string,
    matchType: string,
}

const FixturesScreen = () => {

    const [matchesArray, setMatchesArray] = useState<MatchInfo[]>([]);
    const [currentIndex, setCurrentIndex] = useState<Number | null>(null);


    const selectedDate = '20240719'

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates=' + selectedDate + '&lang=en&region=gb&tz=Europe/London'

        const todaysMatches = await fetch( apiString,).then((res) => res.json())
        const todaysEvents = todaysMatches.scores[0].events;

        var newArray = [];

        for (let index = 0; index < todaysEvents.length; index++) {
            console.info(todaysMatches.scores[0].events[index].name)

            const matchTitle = todaysMatches.scores[0].events[index].name;
            const matchType = todaysMatches.scores[0].events[index].season.slug;
            const matchVenue = todaysMatches.scores[0].events[index].competitions[0].venue.fullName;
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
                matchTitle: matchTitle,
                matchVenue: matchVenue,
                matchType: matchType,
             };

            newArray.push(newMatchInfo)
        }

        const sortedArray = newArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())
        console.info(sortedArray)
        setMatchesArray(sortedArray)
    }

    const handlePressPanel = (index: Number) => {
        setCurrentIndex(index === currentIndex ? null : index)
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

        <FlatList data={matchesArray}
        renderItem={({item, index}) =>
        <ScorePanel
        homeTeam={item.homeTeam}
        homeScore={item.homeScore}
        awayTeam={item.awayTeam}
        awayScore={item.awayScore}
        matchDate={item.matchDate}
        matchTitle={item.matchTitle}
        matchType={item.matchType}
        matchVenue={item.matchVenue}
        currentIndex={currentIndex}
        index={index}
        OnPressPanel={handlePressPanel}
         />}
        />
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
    matchTitle: string
    matchVenue: string
    matchType: string
    OnPressPanel: (index: Number) => void
}

export const mockMatchData = [
    {
        homeTeam: 'South Africa',
        awayTeam: 'Ireland',
        homeScore: '20',
        awayScore: '18',
        matchDate: new Date(),
        matchTitle: 'South Africa v Ireland'
    },
    {
        homeTeam: 'Australia',
        awayTeam: 'Wales',
        homeScore: '36',
        awayScore: '26',
        matchDate: new Date(),
        matchTitle: 'Australia v Wales'
    },
    {
        homeTeam: 'New Zealand',
        awayTeam: 'England',
        homeScore: '22',
        awayScore: '9',
        matchDate: new Date(),
        matchTitle: 'New Zealand v England'

    },
  ];


export const ScoreTable = () => {


}

export const ScorePanel = ({ homeTeam, awayTeam, homeScore, awayScore, matchDate,
     index, currentIndex, matchTitle, matchVenue, matchType, OnPressPanel}: ScorePanelProps) => {

    const homeTeamInfo = getInternationalTeamInfoFromName(homeTeam);
    const awayTeamInfo = getInternationalTeamInfoFromName(awayTeam);

    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return

    const handlePressedPanel = () => {
        OnPressPanel(index)
    }

    const matchTime = matchDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})

    return(
        <View style={[fixtureStyles.card]}>
              <View style={[fixtureStyles.cardHeaderAllInfo]}>
                <View style={[fixtureStyles.cardHeaderGameInfo]}>
                    <Text style={[fixtureStyles.teamName]}>{homeTeamInfo.abbreviation}</Text>
                    <Image
                        style={[fixtureStyles.teamLogo]}
                        source={homeTeamInfo.logo} />

                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[fixtureStyles.teamScore]}>{homeScore}</Text>
                            <Text style={[fixtureStyles.teamScore]}>{awayScore}</Text>
                        </View>
                        <Text>{matchTime}</Text>
                    </View>

                    <Image
                        style={[fixtureStyles.teamLogo]}
                        source={awayTeamInfo.logo} />
                    <Text style={[fixtureStyles.teamName]}>{awayTeamInfo.abbreviation}</Text>
                </View>

                <View style={[fixtureStyles.moreInfoView]}>
                    <Link href={"/(tabs)/fixtures/match"} asChild>
                        <Pressable>
                            <Entypo name="chevron-right" size={24} color="black" />
                        </Pressable> 
                    </Link>
                </View>
                
              </View>

              {index === currentIndex && (
                <View style={fixtureStyles.subCategoriesList}>
                  <Text>{matchTitle}</Text>
                  <Text>{matchType}</Text>

                  <Text style={{borderBottomColor: 'grey', borderBottomWidth: 2}}>Match Venue:</Text>
                  <Text>{matchVenue}</Text>
                  <Text style={{borderBottomColor: 'grey', borderBottomWidth: 2}}>Broadcasters</Text>
                  <Text>Sky Sports</Text>

                </View>
              )}

              <View style={fixtureStyles.quickViewButton}>
                <TouchableOpacity key={index} 
                onPress={handlePressedPanel} 
                activeOpacity={0.9}
                style={{width: 100, alignItems: 'center'}}>
                    <Entypo name="chevron-down" size={18} color="black" />
                </TouchableOpacity>
              </View>
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