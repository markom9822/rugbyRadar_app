import { datePickerStyles, defaultStyles, fixtureStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, FlatList, Pressable, Modal, SectionList } from "react-native"
import { colors, fontSize, fontWeight } from "@/constants/tokens"
import { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker'
import { dateCustomFormatting, getLeagueCode, getLeagueCodeFromDisplayName, getLeagueDisplayNameFromCode } from "@/store/utils/helpers"
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
    matchLeague: string,
    matchID: string,
    eventState: string,
    stateDetail: string
}

export type FixturesSection = {
    title: string;
    data: MatchInfo[];
  };

export const getFixturesForLeague = (todaysMatches: any, currentLeagueCode: string, leagueDisplayName: string) => {

    const todaysEvents = todaysMatches.events;

    var newArray = [];

    for (let index = 0; index < todaysEvents.length; index++) {
        console.info(todaysMatches.events[index].name)

        const matchTitle = todaysMatches.events[index].name;
        const matchVenue = todaysMatches.events[index].competitions[0].venue.fullName;
        const eventID = todaysMatches.events[index].id;
        const matchID = eventID + currentLeagueCode;
        const eventState = todaysMatches.events[index].status.type.state;
        const stateDetail = todaysMatches.events[index].status.type.shortDetail;

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
            matchLeague: leagueDisplayName,
            matchID: matchID,
            eventState: eventState,
            stateDetail: stateDetail,
        };

        newArray.push(newMatchInfo)
    }

    const sortedArray = newArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())

    const sections = [
        {
            title: leagueDisplayName,
            data: sortedArray
        }
    ]

    return (
        sections
    )

}

export const getFixturesForAll = (todaysAllMatches: any) => {

    const todaysScores = todaysAllMatches.scores;

    var sections = []

    for (let index = 0; index < todaysScores.length; index++) {

        var leagueArray = []

        const leagueName = todaysScores[index].leagues[0].name;
        const leagueID = todaysScores[index].leagues[0].slug;

        if (getLeagueCodeFromDisplayName(leagueName) !== undefined) {
            console.info(leagueName)

            const leagueEvents = todaysScores[index].events;

            for (let eventIndex = 0; eventIndex < leagueEvents.length; eventIndex++) {

                console.info(leagueEvents[eventIndex].name)
                console.info(leagueEvents[eventIndex].competitions[0].venue.fullName)

                const matchTitle = leagueEvents[eventIndex].name;
                const matchVenue = leagueEvents[eventIndex].competitions[0].venue.fullName;
                const eventID = leagueEvents[eventIndex].id;
                const matchID = eventID + leagueID;
                const eventState = leagueEvents[eventIndex].status.type.state;
                const stateDetail = leagueEvents[eventIndex].status.type.shortDetail;

                const homeTeamName = leagueEvents[eventIndex].competitions[0].competitors[0].team.name;
                const homeTeamScore = leagueEvents[eventIndex].competitions[0].competitors[0].score;
                const awayTeamName = leagueEvents[eventIndex].competitions[0].competitors[1].team.name;
                const awayTeamScore = leagueEvents[eventIndex].competitions[0].competitors[1].score;

                const matchDate = new Date(leagueEvents[eventIndex].date)

                let newMatchInfo = {
                    homeTeam: homeTeamName,
                    awayTeam: awayTeamName,
                    homeScore: homeTeamScore,
                    awayScore: awayTeamScore,
                    matchDate: matchDate,
                    matchTitle: matchTitle,
                    matchVenue: matchVenue,
                    matchLeague: leagueName,
                    matchID: matchID,
                    eventState: eventState,
                    stateDetail: stateDetail,
                };

                leagueArray.push(newMatchInfo)
            }

            const sortedLeagueArray = leagueArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())

            let leagueMatchesInfo = {
                title: leagueName,
                data: sortedLeagueArray
            }
            
            sections.push(leagueMatchesInfo)
        }
    }

    console.info(sections)

    return (
        sections
    )

}


const FixturesScreen = () => {

    const [matchesSections, setMatchesSections] = useState<FixturesSection[]>([]);
    const [currentIndex, setCurrentIndex] = useState<Number | null>(null);

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [selectedDate, setDate] = useState(new Date())

    const [leagueName, setLeagueName] = useState<string>('');


    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const formattedDate = dateCustomFormatting(selectedDate)
        const currentLeagueCode = getLeagueCode(leagueName)

        if(leagueName == 'all')
        {
                const apiStringAll = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates=' + formattedDate + '&lang=en&region=gb&tz=Europe/London'
                const todaysAllMatches = await fetch( apiStringAll,).then((res) => res.json())
                const allFixturesArray = getFixturesForAll(todaysAllMatches)
                setMatchesSections(allFixturesArray)
        }
            
        if(currentLeagueCode == undefined) return
        
        const leagueDisplayName = getLeagueDisplayNameFromCode(currentLeagueCode)

        if(leagueDisplayName == undefined) return

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/'+ currentLeagueCode +'/scoreboard?contentorigin=espn&dates=' + formattedDate + '&lang=en&limit=300&region=gb&sort=events:asc&tz=Europe/London'
        const todaysMatches = await fetch( apiString,).then((res) => res.json())
        const leagueFixturesArray = getFixturesForLeague(todaysMatches, currentLeagueCode, leagueDisplayName)

        setMatchesSections(leagueFixturesArray)
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
        { label: 'Super Rugby', value: 'superRugby' },
        { label: 'Champions Cup', value: 'championsCup' },
        { label: 'Rugby Championship', value: 'rugbyChamp' },
        { label: 'Olympics Mens Sevens', value: 'menSevens' },

    ];

    return <View style={defaultStyles.container}>

        <CustomSelectDropdown
        placeholder="Select League" 
        data={leagueData}
        onChangeSelection={handleOnChangeLeague}
        value={leagueName}
        isDisabled={false}
        iconName="trophy-outline"/>

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
                    <MaterialIcons name="date-range" size={20} color={colors.icon} />
                </View>
                <Text style={{fontSize: fontSize.sm, color: colors.text}}>{selectedDate.toLocaleDateString()}</Text>
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

        <SectionList
        sections={matchesSections}
        keyExtractor={(item, index) => item.matchID + index}
        renderItem={({item, index}) =>
        <ScorePanel
            leagueDisplayName={item.matchLeague}
            homeTeam={item.homeTeam}
            homeScore={item.homeScore}
            awayTeam={item.awayTeam}
            awayScore={item.awayScore}
            matchDate={item.matchDate}
            matchTitle={item.matchTitle}
            matchLeague={item.matchLeague}
            matchVenue={item.matchVenue}
            matchID={item.matchID}
            currentIndex={currentIndex}
            index={index}
            eventState={item.eventState}
            stateDetail={item.stateDetail}
        />}
        renderSectionHeader={({section: {title}}) => (
            <View style={{marginTop: 10, marginHorizontal: 5}}>
                <Text style={{fontSize: fontSize.sm, color: 'grey', fontWeight: 300}}>{title}</Text>
            </View>
        )}
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