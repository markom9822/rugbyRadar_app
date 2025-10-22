import { fontFamilies, fontSize } from "@/constants/tokens"
import { FixturesHeaderBanner } from "@/store/components/FixturesHeaderBanner"
import { FixturesPanel } from "@/store/components/FixturesPanel"
import { MultiTabBar } from "@/store/components/MultiTabBar"
import { ScorePanel } from "@/store/components/ScorePanel"
import { getItem, setItem } from "@/store/utils/asyncStorage"
import { defaultStyles } from "@/styles/index"
import { FontAwesome6 } from '@expo/vector-icons'
import { useCallback, useEffect, useRef, useState } from "react"
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native"
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import { getLeagueFixtures } from "@/store/utils/getLeagueFixtures"

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

    const handlePressFetchData = async (datesArray: Date[], targetLeagueName: string, setCurrent: boolean) => {
        console.info("Pressed Fetch Data")

        if (setCurrent) {
            setMatchesArray([])
            setIsLoading(true)
        }

        const resultArray = await getLeagueFixtures(datesArray, targetLeagueName)

        if (setCurrent) {
            setMatchesArray(resultArray)
            setIsLoading(false)
            setLastRefresh(new Date().toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric' }))
        }

        return (
            resultArray
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

        const todayMatchesArray = await handlePressFetchData([new Date()], leagueValue, currentTab === "Today")
        console.info('Setting today match array')
        setTodayMatchesArray(todayMatchesArray)

        const previousMatchesArray = await handlePressFetchData(get7Days(true), leagueValue, currentTab === "Previous")
        console.info('Setting previous match array')
        setPreviousMatchesArray(previousMatchesArray)

        const upcomingMatchesArray = await handlePressFetchData(get7Days(false), leagueValue, currentTab === "Upcoming")
        console.info('Setting upcoming match array')
        setUpcomingMatchesArray(upcomingMatchesArray)
    }

    const notFoundHeader = (eventsArray: MatchInfo[]) => {

        if (eventsArray === undefined || eventsArray.length === 0 && !isLoading) {
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

            const todayMatchesArray = await handlePressFetchData([new Date()], defaultLeague, currentTab === "Today")
            console.info('Setting today match array')
            setTodayMatchesArray(todayMatchesArray)

            const previousMatchesArray = await handlePressFetchData(get7Days(true), defaultLeague, currentTab === "Previous")
            console.info('Setting previous match array')
            setPreviousMatchesArray(previousMatchesArray)

            const upcomingMatchesArray = await handlePressFetchData(get7Days(false), defaultLeague, currentTab === "Upcoming")
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

        if (key === "Today" && currentTab !== "Today") {
            console.info("Selected Today")
            setCurrentDateArray([new Date()])

            setMatchesArray(todayMatchesArray)
        }
        else if (key === "Previous" && currentTab !== "Previous") {
            console.info("Selected Previous")
            setCurrentDateArray(get7Days(true))

            setMatchesArray(previousMatchesArray)
        }
        else if (key === "Upcoming" && currentTab !== "Upcoming") {
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
        <FixturesHeaderBanner currentLeague={leagueName} />

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
                            isLastItem={index === matchesArray.length - 1}
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
                    backgroundStyle={{ backgroundColor: "#0c0c0cff" }}
                >

                <FixturesPanel
                    matchInfo={matchesArray[currentIndex]}
                    id={currentID}
                    bottomSheetRef={bottomSheetModalRef} />   
                </BottomSheetModal>
    </View>
}

export default FixturesScreen