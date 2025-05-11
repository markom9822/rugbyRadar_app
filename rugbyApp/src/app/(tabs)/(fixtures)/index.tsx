import { fontFamilies, fontSize } from "@/constants/tokens"
import { CustomBottomPanel } from "@/store/components/CustomBottomPanel"
import { FixturesHeaderBanner } from "@/store/components/FixturesHeaderBanner"
import { FixturesPanel } from "@/store/components/FixturesPanel"
import { MultiTabBar } from "@/store/components/MultiTabBar"
import { ScorePanel } from "@/store/components/ScorePanel"
import { getItem, setItem } from "@/store/utils/asyncStorage"
import { fetchPlanetRugbyAPIData, fetchRugbyVizData, fetchWorldRugbyAPIData } from "@/store/utils/fixturesGetter"
import { dateCustomFormatting, getLeagueCode } from "@/store/utils/helpers"
import { defaultStyles } from "@/styles"
import { FontAwesome6 } from '@expo/vector-icons'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { useCallback, useEffect, useRef, useState } from "react"
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native"
import { useSharedValue } from "react-native-reanimated"

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
    isDateHeader: boolean,
}

const FixturesScreen = () => {

    const [lastRefresh, setLastRefresh] = useState('');
    const [matchesArray, setMatchesArray] = useState<MatchInfo[]>([]);

    const [todayMatchesArray, setTodayMatchesArray] = useState<MatchInfo[]>([]);
    const [previousMatchesArray, setPreviousMatchesArray] = useState<MatchInfo[]>([]);
    const [upcomingMatchesArray, setUpcomingMatchesArray] = useState<MatchInfo[]>([]);

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentID, setCurrentID] = useState<string>('');

    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [selectedDate, setDate] = useState(new Date())

    const [leagueName, setLeagueName] = useState<string>('urc');
    const [currentTab, setCurrentTab] = useState<string>('Today');
    const [currentDateArray, setCurrentDateArray] = useState<Date[]>([new Date()]);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    const leagueSearchData = [
        { name: 'urc', offSeasonMonths: [7, 8] },
        { name: 'prem', offSeasonMonths: [7, 8] },
        { name: 'top14', offSeasonMonths: [7, 8] },
        { name: 'superRugby', offSeasonMonths: [1, 7, 8, 9, 10, 11, 12] },
        { name: 'championsCup', offSeasonMonths: [6, 7, 8, 9, 10, 11] },
        { name: 'challengeCup', offSeasonMonths: [6, 7, 8, 9, 10, 11] },
        { name: 'sixNations', offSeasonMonths: [4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { name: 'u20SixNations', offSeasonMonths: [4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { name: 'autumnNations', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12] },
        { name: 'rugbyChamp', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12] },
        { name: 'rugbyWorldCup', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12] },
        { name: 'u20Championship', offSeasonMonths: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12] },
        { name: 'pacificNationsCup', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12] },
        { name: 'BILTour', offSeasonMonths: [1, 2, 3, 4, 5, 9, 10, 11, 12] },
    ];

    const handlePressFetchData = async (datesArray: Date[], targetLeagueName: string, setCurrent: boolean) => {
        console.info("Pressed Fetch Data")

        if (setCurrent) {
            setMatchesArray([])
            setIsLoading(true)
        }

        const formattedDate = dateCustomFormatting(selectedDate)
        const currentLeagueCode = getLeagueCode(targetLeagueName)

        const leagueNameArray = targetLeagueName == "all" ?
            ['urc', 'prem', 'championsCup', 'challengeCup', 'top14', 'superRugby',
                'autumnNations', 'sixNations', 'rugbyChamp', 'u20SixNations', 'rugbyWorldCup', 'u20Championship', 'pacificNationsCup', 'BILTour'] : [targetLeagueName]

        console.info(leagueNameArray)

        const allFixturesArray: MatchInfo[] = [];

        const handleGetRugbyVizFixtures = async (thisLeagueName: string, thisDate: Date, tempArray: MatchInfo[]) => {

            const rugbyVizFixtures: MatchInfo[] = await fetchRugbyVizData(thisLeagueName, thisDate);

            if (rugbyVizFixtures !== undefined && rugbyVizFixtures.length > 0) {
                tempArray.push(...rugbyVizFixtures)
            }
        }

        const handleGetPlanetRugbyFixtures = async (thisLeagueName: string, thisDate: Date, tempArray: MatchInfo[]) => {

            const planetRugbyFixtures: MatchInfo[] = await fetchPlanetRugbyAPIData(thisLeagueName, thisDate);

            if (planetRugbyFixtures !== undefined && planetRugbyFixtures.length > 0) {
                tempArray.push(...planetRugbyFixtures)
            }
        }

        const handleGetWorldRugbyFixtures = async (thisLeagueName: string, thisDate: Date, tempArray: MatchInfo[]) => {

            const worldRugbyFixtures: MatchInfo[] = await fetchWorldRugbyAPIData(thisLeagueName, thisDate);

            if (worldRugbyFixtures !== undefined && worldRugbyFixtures.length > 0) {
                tempArray.push(...worldRugbyFixtures)
            }
        }

        for (let i = 0; i < datesArray.length; i++) {

            let dateHeaderMatchInfo = {
                homeTeam: '',
                awayTeam: '',
                homeScore: '',
                awayScore: '',
                matchDate: datesArray[i],
                matchTitle: '',
                matchVenue: '',
                matchLeague: '',
                matchID: '',
                eventState: '',
                stateDetail: '',
                eventTime: '',
                isDateHeader: true,
            };

            var tempArray: MatchInfo[] = []

            allFixturesArray.push(dateHeaderMatchInfo)

            for (let index = 0; index < leagueNameArray.length; index++) {

                const thisLeagueName = leagueNameArray[index];
                const thisFixtureMonth = datesArray[i].getMonth() + 1

                const offSeasonMonths = leagueSearchData.find(league => league.name === thisLeagueName)?.offSeasonMonths;

                // check if in offseason for league
                if (offSeasonMonths?.includes(thisFixtureMonth)) {
                    continue;
                }

                switch (thisLeagueName) {
                    case "urc":
                    case "prem":
                    case "championsCup":
                    case "challengeCup":
                        await handleGetRugbyVizFixtures(thisLeagueName, datesArray[i], tempArray)
                        break;
                    case "top14":
                    case "superRugby":
                        await handleGetPlanetRugbyFixtures(thisLeagueName, datesArray[i], tempArray)
                        break;
                    case "autumnNations":
                    case "sixNations":
                    case "rugbyChamp":
                    case "u20SixNations":
                    case "rugbyWorldCup":
                    case "u20Championship":
                    case "pacificNationsCup":
                    case "BILTour":
                        await handleGetWorldRugbyFixtures(thisLeagueName, datesArray[i], tempArray)
                        break;
                }
            }

            tempArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())
            allFixturesArray.push(...tempArray)
        }


        console.info(allFixturesArray)

        const filteredArray = allFixturesArray.filter((item, index, array) => {

            if (index == allFixturesArray.length - 1 && item.isDateHeader) {
                return null
            }

            if (item.isDateHeader && array[index + 1]?.isDateHeader) {
                return null
            }
            else {
                return item
            }
        });

        console.info(filteredArray)

        if (setCurrent) {
            setMatchesArray(filteredArray)
            setIsLoading(false)
            setLastRefresh(new Date().toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric' }))
        }

        return (
            filteredArray
        )
    }

    const handlePressDatePicker = () => {
        setDatePickerOpen(!datePickerOpen)
    }

    const handleSelectedDate = (event: any, date: any) => {
        setDate(date)
        setDatePickerOpen(!datePickerOpen)
    }

    const handleOnChangeLeague = async (leagueValue: string) => {
        setLeagueName(leagueValue)

        const todayMatchesArray = await handlePressFetchData([new Date()], leagueValue, currentTab == "Today")
        console.info('Setting today match array')
        setTodayMatchesArray(todayMatchesArray)

        const previousMatchesArray = await handlePressFetchData(get7Days(true), leagueValue, currentTab == "Previous")
        console.info('Setting previous match array')
        setPreviousMatchesArray(previousMatchesArray)

        const upcomingMatchesArray = await handlePressFetchData(get7Days(false), leagueValue, currentTab == "Upcoming")
        console.info('Setting upcoming match array')
        setUpcomingMatchesArray(upcomingMatchesArray)
    }

    const notFoundHeader = (eventsArray: MatchInfo[]) => {

        if (eventsArray == undefined || eventsArray.length == 0 && !isLoading) {
            return (
                <View style={{ marginTop: 20, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'grey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Fixtures Found</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', margin: 15 }}>
                        <FontAwesome6 name="list" size={80} color='#424141' />
                    </View>
                </View>
            )
        }

        return null
    }

    const getDefaultLeague = async () => {

        const defaultLeague = await getItem('defaultLeague');

        if (defaultLeague == null) {
            await setDefaultLeague('urc');
            console.info("Setting to default URC value")
            return 'urc';
        }

        console.info("Returning stored league value")

        return defaultLeague;
    }

    const setDefaultLeague = async (leagueValue: string) => {

        await setItem('defaultLeague', leagueValue);
    }


    useEffect(() => {
        async function fetchMyAPI() {

            // get default league
            const defaultLeague = await getDefaultLeague();
            setLeagueName(defaultLeague);

            const todayMatchesArray = await handlePressFetchData([new Date()], defaultLeague, currentTab == "Today")
            console.info('Setting today match array')
            setTodayMatchesArray(todayMatchesArray)

            const previousMatchesArray = await handlePressFetchData(get7Days(true), defaultLeague, currentTab == "Previous")
            console.info('Setting previous match array')
            setPreviousMatchesArray(previousMatchesArray)

            const upcomingMatchesArray = await handlePressFetchData(get7Days(false), defaultLeague, currentTab == "Upcoming")
            console.info('Setting upcoming match array')
            setUpcomingMatchesArray(upcomingMatchesArray)

        }
        fetchMyAPI()
    }, [])

    const activityIndicatorHeader = () => {

        if (isLoading) {
            return (
                <View style={{ marginVertical: 20 }}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )
        }

        return null
    }

    const dateHeader = (matchDate: Date) => {

        const dateString = matchDate.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

        return (
            <View style={{ marginHorizontal: 5, marginTop: 10 }}>
                <Text style={{ color: 'grey', fontFamily: fontFamilies.bold, fontSize: 13 }}>{dateString.toUpperCase()}</Text>
            </View>
        )
    }

    function get7Days(previous: boolean): Date[] {
        const dates: Date[] = [];
        const today = new Date();

        for (let i = 1; i < 8; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i * (previous ? -1 : 1)); // Subtract days from today
            dates.push(date);
        }

        return dates;
    }

    const handlePressedDateTab = (key: string) => {

        setCurrentTab(key)

        if (key == "Today" && currentTab != "Today") {
            console.info("Selected Today")
            setCurrentDateArray([new Date()])

            setMatchesArray(todayMatchesArray)
        }
        else if (key == "Previous" && currentTab != "Previous") {
            console.info("Selected Previous")
            setCurrentDateArray(get7Days(true))

            setMatchesArray(previousMatchesArray)
        }
        else if (key == "Upcoming" && currentTab != "Upcoming") {
            console.info("Selected Upcoming")
            setCurrentDateArray(get7Days(false))

            setMatchesArray(upcomingMatchesArray)
        }
    }

    // bottom sheet
    const handlePresentModalPress = (index: number, linkID: string) => {

        setCurrentID(linkID)
        setCurrentIndex(index)
        bottomSheetModalRef.current?.present();
    }

    const translateY = useSharedValue<number>(300);

    const [leaguePanelOpen, setLeaguePanelOpen] = useState(false);

    // custom bottom sheet
    const handleChooseLeaguePress = () => {
        translateY.value = 0;
        setLeaguePanelOpen(true)
    }

    // renders
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    const snapPoints = ["100%"];

    return <View style={defaultStyles.container}>
        <FixturesHeaderBanner currentLeague={leagueName} OnPressLeague={handleChooseLeaguePress} />

        <CustomBottomPanel panelOpen={leaguePanelOpen} handleDefaultLeagueSet={setDefaultLeague} handleLeagueChosen={handleOnChangeLeague} setPanelOpenState={setLeaguePanelOpen} translateY={translateY} />

        <View style={{ marginVertical: 7 }}>
            <MultiTabBar tabsArray={["Previous", "Today", "Upcoming"]} OnTabButtonPressed={handlePressedDateTab} currentTabKey={currentTab} />
        </View>

        {activityIndicatorHeader()}
        {notFoundHeader(matchesArray)}

        <FlatList
            data={matchesArray}
            renderItem={({ item, index }) => {

                if (item.isDateHeader !== undefined && item.isDateHeader && currentTab !== "Today") {
                    return (
                        dateHeader(item.matchDate)
                    )
                }
                else {
                    return (
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
                            index={index}
                            eventState={item.eventState}
                            stateDetail={item.stateDetail}
                            eventTime={item.eventTime}
                            isLastItem={index == matchesArray.length - 1}
                            lastRefreshTime={lastRefresh}
                            OnPress={handlePresentModalPress}
                        />
                    )
                }
            }
            }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => handlePressFetchData(currentDateArray, leagueName, true)} />} />

        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            enableOverDrag={false}
            backdropComponent={renderBackdrop}
            handleComponent={null}
            handleIndicatorStyle={{ backgroundColor: 'lightgrey', width: "10%" }}
            backgroundStyle={{ backgroundColor: "#0d0c0c" }}
        >
            <BottomSheetView style={{ flex: 1 }}>
                <FixturesPanel
                    matchInfo={matchesArray[currentIndex]}
                    id={currentID}
                    bottomSheetRef={bottomSheetModalRef} />
            </BottomSheetView>
        </BottomSheetModal>
    </View>
}

export default FixturesScreen