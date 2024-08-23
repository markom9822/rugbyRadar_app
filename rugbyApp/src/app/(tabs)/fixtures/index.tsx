import { datePickerStyles, defaultStyles, fixtureStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList, Pressable, Modal } from "react-native"
import { colors, fontSize, fontWeight } from "@/constants/tokens"
import { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker'
import { dateCustomFormatting, getLeagueCode } from "@/store/utils/helpers"
import { ScorePanel } from "@/store/components/ScorePanel"
import { CustomSelectDropdown, DropdownData } from "@/store/components/SelectDropdown"
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'


export type MatchInfo = {
    homeTeam: string,
    awayTeam: string,
    homeScore: string,
    awayScore: string,
    matchDate: Date,
    matchTitle: string,
    matchVenue: string,
    matchType: string,
    matchID: string,
}

const FixturesScreen = () => {

    const [matchesArray, setMatchesArray] = useState<MatchInfo[]>([]);
    const [currentIndex, setCurrentIndex] = useState<Number | null>(null);

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [selectedDate, setDate] = useState(new Date())

    const [leagueName, setLeagueName] = useState<string>('');


    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const formattedDate = dateCustomFormatting(selectedDate)
        const currentLeagueCode = getLeagueCode(leagueName)

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/'+ currentLeagueCode +'/scoreboard?contentorigin=espn&dates=' + formattedDate + '&lang=en&limit=300&region=gb&sort=events:asc&tz=Europe/London'

        const todaysMatches = await fetch( apiString,).then((res) => res.json())
        const todaysEvents = todaysMatches.events;
        console.info(todaysMatches.events)

        var newArray = [];

        for (let index = 0; index < todaysEvents.length; index++) {
            console.info(todaysMatches.events[index].name)

            const matchTitle = todaysMatches.events[index].name;
            const matchType = todaysMatches.events[index].season.slug;
            const matchVenue = todaysMatches.events[index].competitions[0].venue.fullName;
            const eventID = todaysMatches.events[index].id;
            const matchID = eventID + currentLeagueCode;


            const homeTeamName = todaysMatches.events[index].competitions[0].competitors[0].team.name;
            const homeTeamScore = todaysMatches.events[index].competitions[0].competitors[0].score;
            const awayTeamName = todaysMatches.events[index].competitions[0].competitors[1].team.name;
            const awayTeamScore = todaysMatches.events[index].competitions[0].competitors[1].score;

            const matchDate = new Date(todaysMatches.events[index].date)
            console.info(todaysMatches.events[index].status.type.shortDetail)

            let newMatchInfo = {
                homeTeam: homeTeamName,
                awayTeam: awayTeamName,
                homeScore: homeTeamScore,
                awayScore: awayTeamScore,
                matchDate: matchDate,
                matchTitle: matchTitle,
                matchVenue: matchVenue,
                matchType: matchType,
                matchID: matchID,
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

    const handlePressDatePicker = () => {
        setDatePickerOpen(!datePickerOpen)
    }

    const handleSelectedDate = (event: any, date: any) => {
        setDate(date)
        setDatePickerOpen(!datePickerOpen)
    }

    const handleOnChangeLeague = (item: DropdownData) => {
        setLeagueName(item.value)
    }

    const leagueData = [
        { label: 'All Leagues', value: 'all' },
        { label: 'International Test Match', value: 'inter' },
        { label: 'Six Nations', value: 'sixNations' },
        { label: 'Premiership', value: 'prem' },
        { label: 'URC', value: 'urc' },
        { label: 'Top 14', value: 'top14' },
        { label: 'Champions Cup', value: 'championsCup' },
        { label: 'Rugby Championship', value: 'rugbyChamp' },
        { label: 'Olympics Mens Sevens', value: 'menSevens' },

    ];

    return <View style={defaultStyles.container}>
        <Text style={defaultStyles.text}>Rugby Matches</Text>

        <CustomSelectDropdown
        placeholder="Select League" 
        data={leagueData}
        onChangeSelection={handleOnChangeLeague}
        value={leagueName}
        isDisabled={false}/>

        <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
        />


        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}>
            <TouchableOpacity onPress={handlePressDatePicker} 
            style={{flexDirection: 'row', alignItems: 'center', padding: 5, margin: 5, borderColor: 'grey', borderWidth: 1, borderRadius: 4, width: "40%"}}>
                <View style={{paddingHorizontal: 5}}>
                    <MaterialIcons name="date-range" size={20} color={'black'} />
                </View>
                <Text style={{fontSize: fontSize.sm}}>{selectedDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {
                datePickerOpen && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        onChange={handleSelectedDate}
                    />
                )
            }
        </View>

        <FlatList 
        data={matchesArray}
        renderItem={({item, index}) =>
        <ScorePanel
        league={leagueName}
        homeTeam={item.homeTeam}
        homeScore={item.homeScore}
        awayTeam={item.awayTeam}
        awayScore={item.awayScore}
        matchDate={item.matchDate}
        matchTitle={item.matchTitle}
        matchType={item.matchType}
        matchVenue={item.matchVenue}
        matchID={item.matchID}
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