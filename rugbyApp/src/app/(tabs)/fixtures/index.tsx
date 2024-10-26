import { defaultStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, SectionList, RefreshControl, ActivityIndicator } from "react-native"
import { colors, fontFamilies, fontSize} from "@/constants/tokens"
import { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker'
import { dateCustomFormatting, getLeagueCode, getLeagueDisplayNameFromCode, getLeagueInfoFromDisplayName, isLastItemInSectionList } from "@/store/utils/helpers"
import { ScorePanel } from "@/store/components/ScorePanel"
import { DropdownData, LeagueSelectDropdown } from "@/store/components/SelectDropdown"
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { ChallengeCupAltLogo, ChampionsCupAltLogo, PremiershipAltLogo, RugbyChampAltLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, URCAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import { fetchRugbyVizData, fetchWorldRugbyAPIData, getFixturesForAll } from "@/store/utils/fixturesGetter"

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
    const [isLoading, setIsLoading] = useState(false);

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [selectedDate, setDate] = useState(new Date())

    const [leagueName, setLeagueName] = useState<string>('all');

    
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

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")
        setMatchesSections([])
        setIsLoading(true)

        const formattedDate = dateCustomFormatting(selectedDate)
        const currentLeagueCode = getLeagueCode(leagueName)

        const apiStringAll = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates=' + formattedDate + '&lang=en&region=gb&tz=Europe/London'
        const todaysAllMatches = await fetch( apiStringAll, {
            headers: {
                'Cache-control': 'no-cache'
            }
        }
        ).then((res) => res.json())
        const allFixturesArray: FixturesSection[] = getFixturesForAll(todaysAllMatches)

        // collection of sections for all APIs
        const URCFixtures: FixturesSection[] = await fetchRugbyVizData('urc', selectedDate);
        const PremFixtures: FixturesSection[] = await fetchRugbyVizData('prem', selectedDate);
        const ChampCupFixtures: FixturesSection[] = await fetchRugbyVizData('championsCup', selectedDate);
        const ChallengeCupFixtures: FixturesSection[] = await fetchRugbyVizData('challengeCup', selectedDate);
        const Top14Fixtures: FixturesSection[] = await fetchRugbyVizData('top14', selectedDate);
        const AutumnNationsFixtures: FixturesSection[] = await fetchWorldRugbyAPIData('autumnNations', selectedDate);


        if(URCFixtures !== undefined && URCFixtures.length > 0)
        {
            allFixturesArray.push({
                title: URCFixtures[0].title,
                data: URCFixtures[0].data,
            })
        }
        if(PremFixtures !== undefined && PremFixtures.length > 0)
        {
            allFixturesArray.push({
                title: PremFixtures[0].title,
                data: PremFixtures[0].data,
            })
        }
        if(ChampCupFixtures !== undefined && ChampCupFixtures.length > 0)
        {
            allFixturesArray.push({
                title: ChampCupFixtures[0].title,
                data: ChampCupFixtures[0].data,
            })
        }
        if(ChallengeCupFixtures !== undefined && ChallengeCupFixtures.length > 0)
        {
            allFixturesArray.push({
                title: ChallengeCupFixtures[0].title,
                data: ChallengeCupFixtures[0].data,
            })
        }
        if(Top14Fixtures !== undefined && Top14Fixtures.length > 0)
        {
            allFixturesArray.push({
                title: Top14Fixtures[0].title,
                data: Top14Fixtures[0].data,
            })
        }
        if(AutumnNationsFixtures !== undefined && AutumnNationsFixtures.length > 0)
        {
            allFixturesArray.push({
                title: AutumnNationsFixtures[0].title,
                data: AutumnNationsFixtures[0].data,
            })
        }

        const teamSectionsCollection : FixturesSection[] = allFixturesArray;
        console.info(teamSectionsCollection)

        if(leagueName == 'all')
        {
            setMatchesSections(teamSectionsCollection)
        }
        else
        {
            if(currentLeagueCode == undefined) return
            const leagueDisplayName = getLeagueDisplayNameFromCode(currentLeagueCode)
            if(leagueDisplayName == undefined) return

            const leagueFixtures = filterSectionList(allFixturesArray, leagueDisplayName)
            setMatchesSections(leagueFixtures)
        }

        setIsLoading(false)
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
        { label: 'URC', value: 'urc', logo: URCAltLogo },
        { label: 'Premiership', value: 'prem', logo: PremiershipAltLogo },
        { label: 'Top 14', value: 'top14', logo: Top14AltLogo },
        { label: 'Super Rugby', value: 'superRugby', logo: SuperRugbyAltLogo },
        { label: 'Champions Cup', value: 'championsCup', logo: ChampionsCupAltLogo },
        { label: 'Challenge Cup', value: 'challengeCup', logo: ChallengeCupAltLogo },
        { label: 'Six Nations', value: 'sixNations', logo: SixNationsAltLogo },
        { label: 'Autumn Nations Series', value: 'autumnNations', logo: null },
        { label: 'Rugby Championship', value: 'rugbyChamp', logo: RugbyChampAltLogo },
    ];

    const notFoundHeader = (eventsArray: FixturesSection[]) => {

        if(eventsArray == undefined || eventsArray.length == 0 && !isLoading)
        {
            return (
                <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'grey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Fixtures Found</Text>
                </View>
            )
        }
        
        return null
    }

    const activityIndicatorHeader = () => {

        if(isLoading)
        {
            return (
                <View style={{marginVertical: 20}}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )
        }
        
        return null
    }

    const dateHeader = () => {

        const dateString = new Date(selectedDate).toLocaleDateString('en-GB', {weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'})

        return (
            <View style={{ marginBottom: 2, marginHorizontal: 5 }}>
                <Text style={{ fontSize: fontSize.xs, color: 'lightgrey', fontWeight: 300, textAlign: 'left', fontFamily: fontFamilies.light }}>{dateString}</Text>
            </View>
        )
        
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

        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
            <TouchableOpacity onPress={handlePressDatePicker} 
            style={{flexDirection: 'row', alignItems: 'center', padding: 5, margin: 4, borderColor: 'grey', borderWidth: 1, borderRadius: 4, width: "40%"}}>
                <View style={{paddingHorizontal: 5}}>
                    <MaterialIcons name="date-range" size={20} color={colors.icon} />
                </View>
                <Text style={{fontSize: fontSize.sm, color: colors.text, fontFamily: fontFamilies.regular}}>{selectedDate.toLocaleDateString()}</Text>
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

            {dateHeader()}
        </View>

        {notFoundHeader(matchesSections)}
        {activityIndicatorHeader()}

        <SectionList
            sections={matchesSections}
            keyExtractor={(item, index) => item.matchID}
            renderItem={({ item, index, section }) =>
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
            renderSectionHeader={({ section: { title, data } }) => (
                <View style={{ marginTop: 12, marginHorizontal: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Image
                            style={{
                                resizeMode: 'contain',
                                width: 20,
                                height: 20,
                                minHeight: 20,
                                minWidth: 20
                            }}
                            source={getLeagueInfoFromDisplayName(data[0].matchLeague)?.leagueAltLogo} />
                    </View>
                    <Text style={{ fontSize: 13, color: 'grey', fontWeight: 600, fontFamily: fontFamilies.bold }}>{title.toUpperCase()}</Text>
                </View>
            )}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handlePressFetchData} />
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