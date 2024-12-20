import { defaultStyles } from "@/styles"
import { View, Text, ViewStyle, TouchableOpacity, Image, SectionList, RefreshControl, ActivityIndicator } from "react-native"
import { colors, fontFamilies, fontSize} from "@/constants/tokens"
import { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker'
import { dateCustomFormatting, getLeagueCode, getLeagueDisplayNameFromCode, getLeagueInfoFromDisplayName, isLastItemInSectionList } from "@/store/utils/helpers"
import { ScorePanel } from "@/store/components/ScorePanel"
import { DropdownData, LeagueSelectDropdown, TestLeagueSelectDropdown } from "@/store/components/SelectDropdown"
import {AntDesign, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import { AutumnNationsLogo, ChallengeCupAltLogo, ChampionsCupAltLogo, PremiershipAltLogo, RugbyChampAltLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, U20SixNationsLogo, URCAltLogo, WorldCupAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import { fetchPlanetRugbyAPIData, fetchRugbyVizData, fetchWorldRugbyAPIData, getFixturesForAll } from "@/store/utils/fixturesGetter"
import {FontAwesome6} from '@expo/vector-icons'
import { LionsAltLogo } from "@/store/URCTeamLogos/URCTeams"
import { BALionsAltLogo } from "@/store/InternationalTeamLogos/InternationalTeams"

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

    const [lastRefresh, setLastRefresh] = useState('');
    const [matchesSections, setMatchesSections] = useState<FixturesSection[]>([]);
    const [currentIndex, setCurrentIndex] = useState<Number | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [selectedDate, setDate] = useState(new Date())

    const [leagueName, setLeagueName] = useState<string>('all');


    const leagueSearchData = [
        { name: 'urc', offSeasonMonths: [7, 8]},
        { name: 'prem', offSeasonMonths: [7, 8]},
        { name: 'top14', offSeasonMonths: [7, 8] },
        { name: 'superRugby', offSeasonMonths: [1, 7, 8, 9, 10, 11, 12] },
        { name: 'championsCup', offSeasonMonths: [6, 7, 8, 9, 10, 11] },
        { name: 'challengeCup', offSeasonMonths: [6, 7, 8, 9, 10, 11]  },
        { name: 'sixNations', offSeasonMonths: [4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { name: 'u20SixNations', offSeasonMonths: [4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { name: 'autumnNations', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12] },
        { name: 'rugbyChamp', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12] },
        { name: 'rugbyWorldCup', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12]  },
        { name: 'u20Championship', offSeasonMonths: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12] },
        { name: 'BILTour', offSeasonMonths: [1, 2, 3, 4, 5, 9, 10, 11, 12] },
    ];

    const handlePressFetchData = async () =>{
        console.info("Pressed Fetch Data")
        setMatchesSections([])
        setIsLoading(true)

        const formattedDate = dateCustomFormatting(selectedDate)
        const currentLeagueCode = getLeagueCode(leagueName)

        const leagueNameArray = leagueName == "all" ? 
        ['urc', 'prem', 'championsCup', 'challengeCup', 'top14', 'superRugby', 
            'autumnNations', 'sixNations', 'rugbyChamp', 'u20SixNations', 'rugbyWorldCup', 'u20Championship', 'BILTour' ] : [leagueName]

        console.info(leagueNameArray)

        const allFixturesArray: FixturesSection[] = [];
        
        const handleGetRugbyVizFixtures = async (thisLeagueName: string) => {
            
            const rugbyVizFixtures: FixturesSection[] = await fetchRugbyVizData(thisLeagueName, selectedDate);

            if(rugbyVizFixtures !== undefined && rugbyVizFixtures.length > 0)
            {
                allFixturesArray.push({
                    title: rugbyVizFixtures[0].title,
                    data: rugbyVizFixtures[0].data,
                })
            }
        }

        const handleGetPlanetRugbyFixtures = async (thisLeagueName: string) => {
            
            const planetRugbyFixtures: FixturesSection[] = await fetchPlanetRugbyAPIData(thisLeagueName, selectedDate);

            if(planetRugbyFixtures !== undefined && planetRugbyFixtures.length > 0)
            {
                allFixturesArray.push({
                    title: planetRugbyFixtures[0].title,
                    data: planetRugbyFixtures[0].data,
                })
            }
        }

        const handleGetWorldRugbyFixtures = async (thisLeagueName: string) => {
            
            const worldRugbyFixtures: FixturesSection[] = await fetchWorldRugbyAPIData(thisLeagueName, selectedDate);

            if(worldRugbyFixtures !== undefined && worldRugbyFixtures.length > 0)
            {
                allFixturesArray.push({
                    title: worldRugbyFixtures[0].title,
                    data: worldRugbyFixtures[0].data,
                })
            }
        }

        for (let index = 0; index < leagueNameArray.length; index++) {

            const thisLeagueName = leagueNameArray[index];
            const thisFixtureMonth = selectedDate.getMonth() + 1

            const offSeasonMonths = leagueSearchData.find(league => league.name === thisLeagueName)?.offSeasonMonths;

            // check if in offseason for league
            if(offSeasonMonths?.includes(thisFixtureMonth))
            {
                continue;
            }

            switch (thisLeagueName) {
                case "urc":
                case "prem":
                case "championsCup":
                case "challengeCup":
                    await handleGetRugbyVizFixtures(thisLeagueName)
                    break;
                case "top14":
                case "superRugby":
                    await handleGetPlanetRugbyFixtures(thisLeagueName)
                    break;
                case "autumnNations":
                case "sixNations":
                case "rugbyChamp":
                case "u20SixNations":
                case "rugbyWorldCup":
                case "u20Championship":
                case "BILTour":
                    await handleGetWorldRugbyFixtures(thisLeagueName)
                    break;
            }
        }


        const teamSectionsCollection : FixturesSection[] = allFixturesArray;
        console.info(teamSectionsCollection)

        setMatchesSections(teamSectionsCollection)

        setLastRefresh(new Date().toLocaleTimeString('en-GB', {hour: 'numeric', minute: 'numeric', second: 'numeric'}))
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
        { label: 'U20 Six Nations', value: 'u20SixNations', logo: U20SixNationsLogo },
        { label: 'Autumn Nations Series', value: 'autumnNations', logo: AutumnNationsLogo },
        { label: 'Rugby Championship', value: 'rugbyChamp', logo: RugbyChampAltLogo },
        { label: 'Rugby World Cup', value: 'rugbyWorldCup', logo: WorldCupAltLogo },
        { label: 'U20 Championship', value: 'u20Championship', logo: WorldCupAltLogo },
        { label: 'Lions Tour', value: 'BILTour', logo: BALionsAltLogo },
    ];

    const notFoundHeader = (eventsArray: FixturesSection[]) => {

        if(eventsArray == undefined || eventsArray.length == 0 && !isLoading)
        {
            return (
                <View style={{ marginTop: 20, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'rgba(70,70,70,0.9)', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Fixtures Found</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                        <FontAwesome6 name="list" size={80} color={'rgba(40,40,40,0.9)'} />
                    </View>
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

        const dateString = new Date(selectedDate).toLocaleDateString('en-GB', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})

        return (
            <View style={{ marginBottom: 2, paddingBottom: 4, marginHorizontal: 5, justifyContent: 'center', alignContent: 'center', borderBottomColor: '#363434', borderBottomWidth: 1}}>
                <Text style={{ fontSize: fontSize.sm, color: 'lightgrey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.bold }}>{dateString}</Text>
            </View>
        )
        
    }

    return <View style={defaultStyles.container}>

        <View style={{flexDirection: 'row'}}>
            <TestLeagueSelectDropdown
                placeholder="Select League"
                data={leagueData}
                onChangeSelection={handleOnChangeLeague}
                value={leagueName}
                isDisabled={false}
                iconName="trophy-outline" />

            <View style={{ justifyContent: 'center', alignContent: 'center', width: "45%"}}>
                <TouchableOpacity onPress={handlePressDatePicker}
                    style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', borderColor: 'grey', padding: 4, borderWidth: 1, borderRadius: 4, marginHorizontal: 6}}>
                    <View style={{ paddingHorizontal: 5, justifyContent: 'center' }}>
                        <MaterialIcons name="date-range" size={20} color={colors.icon} />
                    </View>
                    <Text style={{ fontSize: 15, color: colors.text, fontFamily: fontFamilies.regular }}>{selectedDate.toLocaleDateString()}</Text>
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

        </View>

        <View style={{borderBottomColor: 'grey', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 20}}>
            <TouchableOpacity onPress={handlePressFetchData} style={{
                backgroundColor: '#3d3d3d', justifyContent: 'center', alignItems: 'center',
                paddingVertical: 10, margin: 4, borderRadius: 5
            }}>
                <AntDesign name="search1" size={24} color="lightgrey" />
            </TouchableOpacity>
        </View>
        

        {dateHeader()}

        {activityIndicatorHeader()}
        {notFoundHeader(matchesSections)}

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
                    lastRefreshTime={lastRefresh}
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

export default FixturesScreen