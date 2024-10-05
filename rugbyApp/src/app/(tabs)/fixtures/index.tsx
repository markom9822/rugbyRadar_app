import { defaultStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, SectionList, RefreshControl } from "react-native"
import { colors, fontSize} from "@/constants/tokens"
import { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker'
import { dateCustomFormatting, getLeagueCode, getLeagueDisplayNameFromCode, getLeagueInfoFromDisplayName, isLastItemInSectionList } from "@/store/utils/helpers"
import { ScorePanel } from "@/store/components/ScorePanel"
import { DropdownData, LeagueSelectDropdown } from "@/store/components/SelectDropdown"
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { ChampionsCupAltLogo, InternationalLogo, PremiershipAltLogo, RugbyChampAltLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, URCAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import { getFixturesForAll } from "@/store/utils/fixturesGetter"

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
    stateDetail: string,
    eventTime: string,
}

export type FixturesSection = {
    title: string;
    data: MatchInfo[];
  };

const FixturesScreen = () => {

    const [matchesSections, setMatchesSections] = useState<FixturesSection[]>([]);
    const [currentIndex, setCurrentIndex] = useState<Number | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [selectedDate, setDate] = useState(new Date())

    const [leagueName, setLeagueName] = useState<string>('');
    
    const filterSectionList = (fixturesSections: FixturesSection[], leagueName: string) => {
    
        var filteredSections = [];
    
        if(leagueName == "")
        {
            return []
        }
    
        for (let index = 0; index < fixturesSections.length; index++) {

            if(fixturesSections[index].title == leagueName)
            {
                filteredSections.push({
                    title: fixturesSections[index].title,
                    data: fixturesSections[index].data,
                })
            } 
        }
    
        return (
            filteredSections
        )
    }

    const getFixturesForAllRugViz = (seasonAllMatches: any, selectedDate: Date) => {

        const gamesCount = seasonAllMatches.data.length;
        console.info(gamesCount)

        var sections = []

        var leagueArray = []

        for (let index = 0; index < gamesCount; index++) {
            
            const matchDate = new Date(seasonAllMatches.data[index].date);

            if(new Date(matchDate).setHours(0,0,0,0) === selectedDate.setHours(0,0,0,0))
            {
                const homeTeamName = seasonAllMatches.data[index].homeTeam.shortName;
                const awayTeamName = seasonAllMatches.data[index].awayTeam.shortName;
                const homeTeamScore = seasonAllMatches.data[index].homeTeam.score;
                const awayTeamScore = seasonAllMatches.data[index].awayTeam.score;
                const matchVenue = seasonAllMatches.data[index].venue.name;
                const matchID = seasonAllMatches.data[index].id;
                const compName = seasonAllMatches.data[index].compName;

                const eventTime = seasonAllMatches.data[index].minute;

                var eventState;
                const matchStatus = seasonAllMatches.data[index].status;
                if(matchStatus === "result")
                {
                    eventState = "post"
                }
                else if(matchStatus === "fixture")
                {
                    eventState = "pre"
                }
                else
                {
                    eventState = "ongoing"
                }

                let newMatchInfo = {
                    homeTeam: homeTeamName,
                    awayTeam: awayTeamName,
                    homeScore: homeTeamScore,
                    awayScore: awayTeamScore,
                    matchDate: matchDate,
                    matchTitle: '',
                    matchVenue: matchVenue,
                    matchLeague: compName,
                    matchID: matchID,
                    eventState: eventState,
                    stateDetail: 'FT',
                    eventTime: eventTime,
                };

                leagueArray.push(newMatchInfo)
            }
            
        }

        console.info(leagueArray)

        const sortedLeagueArray = leagueArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())
        let leagueMatchesInfo = {
            title: leagueName,
            data: sortedLeagueArray
        }
        
        sections.push(leagueMatchesInfo)

        return (
            sections
        )
    }


    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")

        const formattedDate = dateCustomFormatting(selectedDate)
        const currentLeagueCode = getLeagueCode(leagueName)

        // use separate API for URC
        if(leagueName == 'urc')
        {

            const apiStringAll = 'https://rugby-union-feeds.incrowdsports.com/v1/matches?provider=rugbyviz&compId=1068&images=true&season='+selectedDate.getFullYear()+'01'
            const seasonsAllMatches = await fetch( apiStringAll, {
                headers: {
                    'Cache-control': 'no-cache'
                }
            }
            ).then((res) => res.json())

            const allFixturesArray = getFixturesForAllRugViz(seasonsAllMatches, selectedDate)
            setMatchesSections(allFixturesArray)

            return;
        }

        const apiStringAll = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates=' + formattedDate + '&lang=en&region=gb&tz=Europe/London'
        const todaysAllMatches = await fetch( apiStringAll, {
            headers: {
                'Cache-control': 'no-cache'
            }
        }
        ).then((res) => res.json())
        const allFixturesArray = getFixturesForAll(todaysAllMatches)

        if(leagueName == 'all')
        {
            setMatchesSections(allFixturesArray)
        }
        else
        {
            if(currentLeagueCode == undefined) return
            const leagueDisplayName = getLeagueDisplayNameFromCode(currentLeagueCode)
            if(leagueDisplayName == undefined) return

            const leagueFixtures = filterSectionList(allFixturesArray, leagueDisplayName)
            setMatchesSections(leagueFixtures)
        }
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
        { label: 'All Leagues', value: 'all', logo: null },
        { label: 'International Test Match', value: 'inter', logo: InternationalLogo },
        { label: 'Six Nations', value: 'sixNations', logo: SixNationsAltLogo },
        { label: 'Premiership', value: 'prem', logo: PremiershipAltLogo },
        { label: 'URC', value: 'urc', logo: URCAltLogo },
        { label: 'Top 14', value: 'top14', logo: Top14AltLogo },
        { label: 'Super Rugby', value: 'superRugby', logo: SuperRugbyAltLogo },
        { label: 'Champions Cup', value: 'championsCup', logo: ChampionsCupAltLogo },
        { label: 'Rugby Championship', value: 'rugbyChamp', logo: RugbyChampAltLogo },
    ];

    const notFoundHeader = (eventsArray: FixturesSection[]) => {

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return (
                <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'grey', fontWeight: 300, textAlign: 'center' }}>No Fixtures Found</Text>
                </View>
            )
        }
        
        return null
    }

    const dateHeader = (eventsArray: FixturesSection[]) => {

        const dateString = new Date(selectedDate).toLocaleDateString('en-GB', {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'})

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return null
        }
        else
        {
            return (
                <View style={{ marginBottom: 2, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: fontSize.xs, color: 'lightgrey', fontWeight: 300, textAlign: 'left' }}>{dateString}</Text>
                </View>
            )

        }

    }

    return <View style={defaultStyles.container}>

        <LeagueSelectDropdown
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

        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={handlePressDatePicker} 
            style={{flexDirection: 'row', alignItems: 'center', padding: 5, margin: 4, borderColor: 'grey', borderWidth: 1, borderRadius: 4, width: "40%"}}>
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

            {dateHeader(matchesSections)}
        </View>

        {notFoundHeader(matchesSections)}

        <SectionList
        sections={matchesSections}
        keyExtractor={(item, index) => item.matchID}
        renderItem={({item, index, section}) =>
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
            eventTime={item.eventTime}
            isLastItem={isLastItemInSectionList(index, section, matchesSections)}
        />}
        renderSectionHeader={({section: {title, data}}) => (
            <View style={{marginTop: 12, marginHorizontal: 5, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{paddingHorizontal: 10}}>
                    <Image
                        style={{resizeMode: 'contain',
                            width: 20,
                            height: 20,
                            minHeight:20,
                            minWidth: 20}}
                        source={getLeagueInfoFromDisplayName(data[0].matchLeague)?.leagueAltLogo} />
                </View>
                <Text style={{fontSize: 13, color: 'grey', fontWeight: 600}}>{title.toUpperCase()}</Text>
            </View>
        )}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handlePressFetchData}/>
        }
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