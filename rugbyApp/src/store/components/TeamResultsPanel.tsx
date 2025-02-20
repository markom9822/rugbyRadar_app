import { SeasonDateInfo } from "@/app/(tabs)/standings"
import { SearchTeamInfo } from "@/app/(tabs)/teams"
import { TeamEvent } from "@/app/(tabs)/teams/team/[teamID]/results"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import Entypo from '@expo/vector-icons/Entypo'
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { useEffect, useState } from "react"
import { ActivityIndicator, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo"
import { getTeamSeasonFixtures } from "../utils/getTeamSeasonFixtures"
import { generateSeasonList, getLeagueInfoFromDisplayName, hexToRGB } from "../utils/helpers"
import { DropdownData } from "./SelectDropdown"


type TeamResultsPanelProps = {
    teamInfo: SearchTeamInfo,
}

export type TeamInfo = {
    teamName: string
    homeVenue: string
    homeLocation: string
    teamForm: string
}

export const TeamResultsPanel = ({ teamInfo }: TeamResultsPanelProps) => {

    const [teamEventsArray, setTeamEventsArray] = useState<TeamEvent[] | undefined>();
    const [seasonYear, setSeasonYear] = useState<string>('2025');
    const [seasonDates, setSeasonDates] = useState<SeasonDateInfo[]>(generateSeasonList());
    const [isLoading, setIsLoading] = useState(false);

    const teamIDNum = teamInfo.id;
    const panelColour = hexToRGB("#4d4b4b", '0.8')
    const seasonDropdownColour = hexToRGB("#4d4b4b", '0.4')


    const handlePressFetchData = async () => {
        console.info("Pressed Fetch Team Results")
        setTeamEventsArray([])

        setIsLoading(true)
        const teamSeasonFixtures = await getTeamSeasonFixtures(teamIDNum, seasonYear)
        console.info(teamSeasonFixtures)
        setTeamEventsArray(teamSeasonFixtures)
        setIsLoading(false)
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await handlePressFetchData()
        }
        fetchMyAPI()
    }, [])

    const handleOnChangeSeason = (item: DropdownData) => {
        setSeasonYear(item.value)
        //handlePressFetchData(item.value)
    }

    const notFoundHeader = (eventsArray: TeamEvent[] | undefined) => {

        if (eventsArray == undefined || eventsArray.length == 0 && !isLoading) {
            return (
                <View style={{ marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 100, paddingVertical: 10 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'grey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>None found</Text>
                </View>
            )
        }

        return null
    }

    const findLastItem = (eventsArray: TeamEvent[] | undefined, index: number) => {

        if (eventsArray == undefined || eventsArray.length == 0) {
            return false;
        }
        else {
            return index === eventsArray.length - 1;
        }
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

    return (
        <View style={{ flex: 1 }}>
            {activityIndicatorHeader()}

            {!isLoading &&
                <View>
                    <View style={{ marginHorizontal: 12, marginVertical: 4, flexDirection: 'row' }}>
                        <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, padding: 2, width: "50%" }}>Results/Fixtures</Text>

                        <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'flex-end', width: "50%", paddingHorizontal: 5 }}>
                            <View style={{ backgroundColor: seasonDropdownColour, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 12, flexDirection: 'row' }}>
                                <View style={{ paddingHorizontal: 4, justifyContent: 'center', alignContent: 'center' }}>
                                    <Entypo name="chevron-down" size={15} color="grey" />
                                </View>
                                <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, textAlign: 'center', paddingHorizontal: 2 }}>{seasonYear}</Text>
                            </View>

                        </TouchableOpacity>

                    </View>

                    <View style={{ backgroundColor: panelColour, borderRadius: 8, marginHorizontal: 12, marginBottom: 130 }}>

                        {notFoundHeader(teamEventsArray)}

                        <BottomSheetScrollView style={{ marginVertical: 2 }}>

                            <FlatList
                                data={teamEventsArray}
                                scrollEnabled={false}
                                renderItem={({ item, index }) =>
                                    <TeamResultsPanelItem
                                        eventDate={item.eventDate}
                                        homeTeamName={item.homeTeamName}
                                        awayTeamName={item.awayTeamName}
                                        homeTeamScore={item.homeTeamScore}
                                        awayTeamScore={item.awayTeamScore}
                                        leagueName={item.leagueName}
                                        eventState={item.eventState}
                                        isLastItem={findLastItem(teamEventsArray, index)}
                                    />}
                            />
                        </BottomSheetScrollView>

                    </View>
                </View>}

        </View>
    )
}

type TeamResultsPanelItemProps = {
    eventDate: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: string,
    awayTeamScore: string,
    leagueName: string,
    eventState: string,
    isLastItem: boolean,
}

export const TeamResultsPanelItem = ({ eventDate, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, leagueName, eventState, isLastItem }: TeamResultsPanelItemProps) => {
    const formattedDate = new Date(eventDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit'
    });

    const eventTime = new Date(eventDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

    const leagueInfo = getLeagueInfoFromDisplayName(leagueName);
    if (leagueInfo == null) return;

    const leagueValue = leagueInfo.value;
    const leagueLogo = leagueInfo.leagueAltLogo;

    const homeAwayInfo = getHomeAwayTeamInfo(leagueValue, homeTeamName, awayTeamName);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    if (homeTeamInfo == null) return
    if (awayTeamInfo == null) return

    const homeScoreWeight = (new Number(homeTeamScore) > new Number(awayTeamScore)) ? ('500') : ('300');
    const awayScoreWeight = (new Number(awayTeamScore) > new Number(homeTeamScore)) ? ('500') : ('300');
    const homeFontFamily = (new Number(homeTeamScore) > new Number(awayTeamScore)) ? (fontFamilies.bold) : (fontFamilies.light);
    const awayFontFamily = (new Number(awayTeamScore) > new Number(homeTeamScore)) ? (fontFamilies.bold) : (fontFamilies.light);

    const itemPanelColour = hexToRGB(colors.background, '0.5')

    const scoreRender = (eventNotStarted: boolean) => {

        // event has started
        if (!eventNotStarted) {
            return (
                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        paddingHorizontal: 5, fontWeight: homeScoreWeight,
                        fontSize: fontSize.sm, textAlign: 'center', width: "50%", color: colors.text, fontFamily: homeFontFamily
                    }}>{homeTeamScore}</Text>

                    <Text style={{ fontSize: fontSize.xs, color: colors.text, fontFamily: fontFamilies.light }}>{formattedDate}</Text>

                    <Text style={{
                        paddingHorizontal: 5, fontWeight: awayScoreWeight,
                        fontSize: fontSize.sm, textAlign: 'center', width: "50%", color: colors.text, fontFamily: awayFontFamily
                    }}>{awayTeamScore}</Text>
                </View>
            )
        }
        else {
            return (
                <View style={{ width: "40%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ paddingHorizontal: 5, fontSize: fontSize.sm, fontWeight: 300, textAlign: 'center', color: colors.text, fontFamily: fontFamilies.regular }}>{eventTime}</Text>

                    <Text style={{ fontSize: fontSize.xs, color: colors.text, fontFamily: fontFamilies.light }}>{formattedDate}</Text>
                </View>
            )
        }
    }

    return (
        <View style={{
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            marginVertical: 2, marginHorizontal: 4, borderRadius: 8,
            opacity: (eventState === "pre") ? 1 : 0.7, backgroundColor: itemPanelColour, padding: 5
        }}>

            <ImageBackground source={leagueLogo} resizeMode='contain' imageStyle={{ opacity: 0.1 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View style={{ width: "30%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ paddingHorizontal: 5 }}>
                            <Image source={homeTeamInfo.logo}
                                style={{
                                    resizeMode: 'contain',
                                    width: 30,
                                    height: 30,
                                    minHeight: 30,
                                    minWidth: 30,
                                }} />
                        </View>
                        <Text style={{ paddingHorizontal: 5, fontSize: fontSize.xs, fontWeight: 500, color: colors.text, fontFamily: fontFamilies.bold }}>{homeTeamInfo.abbreviation}</Text>

                    </View>

                    {scoreRender(eventState === "pre")}

                    <View style={{ width: "30%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ paddingHorizontal: 5 }}>
                            <Image source={awayTeamInfo.logo}
                                style={{
                                    resizeMode: 'contain',
                                    width: 30,
                                    height: 30,
                                    minHeight: 30,
                                    minWidth: 30,
                                }} />
                        </View>

                        <Text style={{ paddingHorizontal: 5, fontSize: fontSize.xs, fontWeight: 500, color: colors.text, fontFamily: fontFamilies.bold }}>{awayTeamInfo.abbreviation}</Text>

                    </View>

                </View>
            </ImageBackground>
        </View>
    )
}
