import { SearchTeamInfo } from "@/app/(tabs)/search"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Image, ImageBackground, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo"
import { getTeamSeasonFixtures } from "../utils/getTeamSeasonFixtures"
import { generateSeasonList, getLeagueInfoFromDisplayName, hexToRGB, SeasonDateInfo } from "../utils/helpers"
import { SeasonYearPicker } from "./LeagueStandingsPanel"

export type TeamEvent = {
    eventDate: string,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamScore: string,
    awayTeamScore: string,
    leagueName: string,
    eventState: string,
}

type TeamResultsPanelProps = {
    teamInfo: SearchTeamInfo,
    currentTimezone: string
}

export type TeamInfo = {
    teamName: string
    homeVenue: string
    homeLocation: string
    teamForm: string
}

export const TeamResultsPanel = ({ teamInfo, currentTimezone }: TeamResultsPanelProps) => {

    const [teamEventsArray, setTeamEventsArray] = useState<TeamEvent[] | undefined>();
    const [seasonYear, setSeasonYear] = useState<string>('2026');
    const [seasonDates, setSeasonDates] = useState<SeasonDateInfo[]>(generateSeasonList());
    const [isLoading, setIsLoading] = useState(false);

    const teamIDNum = teamInfo.id;
    const panelColour = hexToRGB("#4d4b4b", '0.8')

    const handlePressFetchData = useCallback(async (year: string) => {
        try {
            console.info("Pressed Fetch Team Results");
            setTeamEventsArray([]);
            setIsLoading(true);

            const teamSeasonFixtures = await getTeamSeasonFixtures(teamIDNum, year);
            console.info(teamSeasonFixtures);
            setTeamEventsArray(teamSeasonFixtures);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching team season fixtures:", error);
        }
    }, [teamIDNum]);

    useEffect(() => {
        handlePressFetchData(seasonYear);
    }, [handlePressFetchData, seasonYear]);

    const notFoundHeader = (eventsArray: TeamEvent[] | undefined) => {

        if (eventsArray === undefined || eventsArray.length === 0 && !isLoading) {
            return (
                <View style={{ marginHorizontal: 5, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 100, paddingVertical: 10 }}>
                    <Text style={{ fontSize: fontSize.sm, color: 'grey', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>None found</Text>
                </View>
            )
        }

        return null
    }

    const findLastItem = (eventsArray: TeamEvent[] | undefined, index: number) => {

        if (eventsArray === undefined || eventsArray.length === 0) {
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

    const handlePressedSeasonYear = async (year: string) => {

        setSeasonYear(year)
        await handlePressFetchData(year)
    }

    const seasonManualData = ['2026', '2025', '2024', '2023', '2022'];

    return (
        <View style={{ width: "100%", flex: 1 }}>

            <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 3 }}>
                <View style={{ justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 5, width: "50%" }}>
                    <Text style={{ color: 'grey', fontSize: 12, fontFamily: fontFamilies.title, textAlign: 'left' }}>Results / Fixtures</Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: "50%", paddingHorizontal: 5 }}>
                    <SeasonYearPicker currentSeasonYear={seasonYear} seasonYearOptions={seasonManualData} OnPressSeasonYear={handlePressedSeasonYear} />
                </View>

            </View>

            {activityIndicatorHeader()}

            <View style={{ backgroundColor: isLoading ? 'transparent' : panelColour, borderRadius: 8, marginHorizontal: 12, marginBottom: 100 }}>

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
                                currentTimezone={currentTimezone}
                            />}
                    />
                </BottomSheetScrollView>
            </View>
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
    currentTimezone: string
}

export const TeamResultsPanelItem = ({ eventDate, homeTeamName, awayTeamName, homeTeamScore, awayTeamScore, leagueName, eventState, isLastItem, currentTimezone }: TeamResultsPanelItemProps) => {
    const formattedDate = new Date(eventDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        timeZone: currentTimezone
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
    const homeTextColour = (new Number(homeTeamScore) >= new Number(awayTeamScore)) ? (colors.text) : (hexToRGB('#FFFFFF', '0.5'));
    const awayTextColour = (new Number(awayTeamScore) >= new Number(homeTeamScore)) ? (colors.text) : (hexToRGB('#FFFFFF', '0.5'));

    const itemPanelColour = hexToRGB(colors.background, '0.5')

    const scoreRender = (eventNotStarted: boolean) => {

        // event has started
        if (!eventNotStarted) {
            return (
                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        paddingHorizontal: 5, fontWeight: homeScoreWeight,
                        fontSize: fontSize.sm, textAlign: 'center', width: "50%", color: homeTextColour, fontFamily: fontFamilies.title
                    }}>{homeTeamScore}</Text>

                    <Text style={{ fontSize: fontSize.xs, color: colors.text, fontFamily: fontFamilies.light }}>{formattedDate}</Text>

                    <Text style={{
                        paddingHorizontal: 5, fontWeight: awayScoreWeight,
                        fontSize: fontSize.sm, textAlign: 'center', width: "50%", color: awayTextColour, fontFamily: fontFamilies.title
                    }}>{awayTeamScore}</Text>
                </View>
            )
        }
        else {
            return (
                <View style={{ width: "40%", flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ paddingHorizontal: 5, fontSize: fontSize.sm, fontWeight: 300, textAlign: 'center', color: colors.text, fontFamily: fontFamilies.title }}>{eventTime}</Text>

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
                        <Text style={{ paddingHorizontal: 5, fontSize: 11, color: colors.text, fontFamily: fontFamilies.title }}>{homeTeamInfo.abbreviation}</Text>

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
                        <Text style={{ paddingHorizontal: 5, fontSize: 11, color: colors.text, fontFamily: fontFamilies.title }}>{awayTeamInfo.abbreviation}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}