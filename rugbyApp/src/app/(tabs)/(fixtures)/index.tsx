import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { FixturesPanel } from "@/store/components/FixturesPanel"
import { ScorePanel } from "@/store/components/ScorePanel"
import { DropdownData, TestLeagueSelectDropdown } from "@/store/components/SelectDropdown"
import { BALionsAltLogo } from "@/store/InternationalTeamLogos/InternationalTeams"
import { AutumnNationsAltLogo, ChallengeCupAltLogo, ChampionsCupAltLogo, PacificNationsCupAltLogo, PremiershipAltLogo, RugbyChampAltLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, U20SixNationsAltLogo, URCAltLogo, WorldCupAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import { fetchPlanetRugbyAPIData, fetchRugbyVizData, fetchWorldRugbyAPIData } from "@/store/utils/fixturesGetter"
import { dateCustomFormatting, getLeagueCode } from "@/store/utils/helpers"
import { defaultStyles } from "@/styles"
import { AntDesign, FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import DateTimePicker from '@react-native-community/datetimepicker'
import { useCallback, useRef, useState } from "react"
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native"

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

const FixturesScreen = () => {

    const [lastRefresh, setLastRefresh] = useState('');
    const [matchesArray, setMatchesArray] = useState<MatchInfo[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentID, setCurrentID] = useState<string>('');

    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [selectedDate, setDate] = useState(new Date())

    const [leagueName, setLeagueName] = useState<string>('all');

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

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch Data")
        setMatchesArray([])
        setIsLoading(true)

        const formattedDate = dateCustomFormatting(selectedDate)
        const currentLeagueCode = getLeagueCode(leagueName)

        const leagueNameArray = leagueName == "all" ?
            ['urc', 'prem', 'championsCup', 'challengeCup', 'top14', 'superRugby',
                'autumnNations', 'sixNations', 'rugbyChamp', 'u20SixNations', 'rugbyWorldCup', 'u20Championship', 'pacificNationsCup', 'BILTour'] : [leagueName]

        console.info(leagueNameArray)

        const allFixturesArray: MatchInfo[] = [];

        const handleGetRugbyVizFixtures = async (thisLeagueName: string) => {

            const rugbyVizFixtures: MatchInfo[] = await fetchRugbyVizData(thisLeagueName, selectedDate);

            if (rugbyVizFixtures !== undefined && rugbyVizFixtures.length > 0) {
                allFixturesArray.push(...rugbyVizFixtures)
            }
        }

        const handleGetPlanetRugbyFixtures = async (thisLeagueName: string) => {

            const planetRugbyFixtures: MatchInfo[] = await fetchPlanetRugbyAPIData(thisLeagueName, selectedDate);

            if (planetRugbyFixtures !== undefined && planetRugbyFixtures.length > 0) {
                allFixturesArray.push(...planetRugbyFixtures)
            }
        }

        const handleGetWorldRugbyFixtures = async (thisLeagueName: string) => {

            console.info(thisLeagueName)

            const worldRugbyFixtures: MatchInfo[] = await fetchWorldRugbyAPIData(thisLeagueName, selectedDate);

            if (worldRugbyFixtures !== undefined && worldRugbyFixtures.length > 0) {
                allFixturesArray.push(...worldRugbyFixtures)
            }
        }

        for (let index = 0; index < leagueNameArray.length; index++) {

            const thisLeagueName = leagueNameArray[index];
            const thisFixtureMonth = selectedDate.getMonth() + 1

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
                case "pacificNationsCup":
                case "BILTour":
                    await handleGetWorldRugbyFixtures(thisLeagueName)
                    break;
            }
        }

        console.info(allFixturesArray)

        setMatchesArray(allFixturesArray)

        setLastRefresh(new Date().toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric' }))
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
        { label: 'U20 Six Nations', value: 'u20SixNations', logo: U20SixNationsAltLogo },
        { label: 'Autumn Nations Series', value: 'autumnNations', logo: AutumnNationsAltLogo },
        { label: 'Rugby Championship', value: 'rugbyChamp', logo: RugbyChampAltLogo },
        { label: 'Rugby World Cup', value: 'rugbyWorldCup', logo: WorldCupAltLogo },
        { label: 'U20 Championship', value: 'u20Championship', logo: WorldCupAltLogo },
        { label: 'Pacific Nations Cup', value: 'pacificNationsCup', logo: PacificNationsCupAltLogo },

        { label: 'Lions Tour', value: 'BILTour', logo: BALionsAltLogo },
    ];

    const notFoundHeader = (eventsArray: MatchInfo[]) => {

        if (eventsArray == undefined || eventsArray.length == 0 && !isLoading) {
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

        if (isLoading) {
            return (
                <View style={{ marginVertical: 20 }}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )
        }

        return null
    }

    const dateHeader = () => {

        const dateString = new Date(selectedDate).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

        return (
            <View style={{ marginBottom: 2, paddingBottom: 4, marginHorizontal: 5, justifyContent: 'center', alignContent: 'center', borderBottomColor: '#363434', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: fontSize.sm, color: 'lightgrey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.bold }}>{dateString}</Text>
            </View>
        )

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

        <View style={{ flexDirection: 'row' }}>
            <TestLeagueSelectDropdown
                placeholder="Select League"
                data={leagueData}
                onChangeSelection={handleOnChangeLeague}
                value={leagueName}
                isDisabled={false}
                iconName="trophy-outline" />

            <View style={{ justifyContent: 'center', alignContent: 'center', width: "45%" }}>
                <TouchableOpacity onPress={handlePressDatePicker}
                    style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center', borderColor: 'grey', padding: 4, borderWidth: 1, borderRadius: 4, marginHorizontal: 6 }}>
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

        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, paddingBottom: 10, marginBottom: 20 }}>
            <TouchableOpacity onPress={handlePressFetchData} style={{
                backgroundColor: '#3d3d3d', justifyContent: 'center', alignItems: 'center',
                paddingVertical: 10, margin: 4, borderRadius: 5
            }}>
                <AntDesign name="search1" size={24} color="lightgrey" />
            </TouchableOpacity>
        </View>


        {dateHeader()}

        {activityIndicatorHeader()}
        {notFoundHeader(matchesArray)}

        <FlatList
            data={matchesArray}
            renderItem={({ item, index }) =>
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
                />}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handlePressFetchData} />
            }
        />

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