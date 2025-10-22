import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { FlatList, Image, Text, View } from "react-native"
import { getLeagueInfoFromDisplayName, hexToRGB } from "../utils/helpers"
import { MatchInfo } from "@/app/(tabs)"
import { useEffect, useState } from "react"
import { get7Days, getLeagueFixtures } from "../utils/getLeagueFixtures"
import { getHomeAwayTeamInfo } from "../utils/getTeamInfo"

type LeagueUpcomingFixturesPanelProps = {
    leagueName: string,
    fixturesLimit: number,
}

export const LeagueUpcomingFixturesPanel = ({ leagueName, fixturesLimit }: LeagueUpcomingFixturesPanelProps) => {

    const [matchesArray, setMatchesArray] = useState<MatchInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFetchData = async (datesArray: Date[], targetLeagueName: string) => {
        console.info("Pressed Fetch Data")

        setMatchesArray([])
        setIsLoading(true)

        const resultArray = await getLeagueFixtures(datesArray, targetLeagueName)
        const filteredArray = resultArray.filter(item => item.isDateHeader === false);

        setMatchesArray(filteredArray)
        setIsLoading(false)

        return (
            resultArray
        )
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await handleFetchData(get7Days(false), leagueName);
        }
        fetchMyAPI()
    }, [])

    const notFoundHeader = (eventsArray: MatchInfo[]) => {

        if (eventsArray === undefined || eventsArray.length === 0 && !isLoading) {
            return (
                <Text style={{ padding: 8, color: 'lightgrey', fontFamily: fontFamilies.light, justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: fontSize.xs }}>No fixtures in next 7 days</Text>
            )
        }

        return null
    }

    const panelColour = hexToRGB("#4d4b4b", '0.6')
    return (
        <View style={{ width: "100%", marginVertical: 15 }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                <Text style={{ color: 'lightgrey', fontSize: 12, fontFamily: fontFamilies.title, textAlign: 'center' }}>Upcoming Fixtures</Text>
            </View>

            <View style={{ backgroundColor: panelColour, paddingVertical: 5, paddingHorizontal: 2, borderRadius: 5, marginHorizontal: 15 }}>

                {notFoundHeader(matchesArray)}

                <FlatList data={matchesArray.slice(0,  fixturesLimit)}
                    scrollEnabled={false}
                    renderItem={({ item, index }: { item: MatchInfo; index: number }) =>
                        <LeagueUpcomingFixture
                            key={index}
                            fixtureInfo={item}
                        />}
                />
            </View>
        </View>
    )
}

type LeagueUpcomingFixtureProps = {
    fixtureInfo: MatchInfo,
}

// show the upcoming fixtures
export const LeagueUpcomingFixture = ({ fixtureInfo }: LeagueUpcomingFixtureProps) => {

    const formattedDate = new Date(fixtureInfo.matchDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit'
    });

    const eventTime = new Date(fixtureInfo.matchDate).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

    const leagueInfo = getLeagueInfoFromDisplayName(fixtureInfo.matchLeague);
    if (leagueInfo == null) return;

    const leagueValue = leagueInfo.value;

    const homeAwayInfo = getHomeAwayTeamInfo(leagueValue, fixtureInfo.homeTeam, fixtureInfo.awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    if (homeTeamInfo == null) return
    if (awayTeamInfo == null) return

    const homeTextColour = (new Number(fixtureInfo.homeScore) >= new Number(fixtureInfo.awayScore)) ? (colors.text) : (hexToRGB('#FFFFFF', '0.5'));
    const awayTextColour = (new Number(fixtureInfo.awayScore) >= new Number(fixtureInfo.homeScore)) ? (colors.text) : (hexToRGB('#FFFFFF', '0.5'));

    const scoreRender = (eventNotStarted: boolean) => {

        // event has started
        if (!eventNotStarted) {
            return (
                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        paddingHorizontal: 5,fontSize: fontSize.xs, textAlign: 'center', width: "50%", color: homeTextColour, fontFamily: fontFamilies.title
                    }}>{fixtureInfo.homeScore}</Text>

                    <Text style={{ fontSize: fontSize.xs, color: colors.text, fontFamily: fontFamilies.light }}>{formattedDate}</Text>

                    <Text style={{
                        paddingHorizontal: 5, fontSize: fontSize.xs, textAlign: 'center', width: "50%", color: awayTextColour, fontFamily: fontFamilies.title
                    }}>{fixtureInfo.homeScore}</Text>
                </View>
            )
        }
        else {
            return (
                <View style={{ width: "40%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ paddingHorizontal: 5, fontSize: fontSize.xs, fontWeight: 300, textAlign: 'center', color: colors.text, fontFamily: fontFamilies.title }}>{eventTime}</Text>

                    <Text style={{ fontSize: fontSize.xs, color: colors.text, fontFamily: fontFamilies.light }}>{formattedDate}</Text>
                </View>
            )
        }
    }

    return (
        <View style={{
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            marginVertical: 2, marginHorizontal: 2, borderRadius: 8,
            opacity: (fixtureInfo.eventState === "pre") ? 1 : 0.7, padding: 2
        }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                    <View style={{ width: "30%", flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                        <View style={{ paddingHorizontal: 5 }}>
                            <Image source={homeTeamInfo.logo}
                                style={{
                                    resizeMode: 'contain',
                                    width: 20,
                                    height: 20,
                                    minHeight: 20,
                                    minWidth: 20,
                                }} />
                        </View>
                        <Text style={{ paddingHorizontal: 5, fontSize: 9, color: colors.text, fontFamily: fontFamilies.title }}>{homeTeamInfo.abbreviation}</Text>

                    </View>

                    {scoreRender(fixtureInfo.eventState === "pre")}

                    <View style={{ width: "30%", flexDirection: 'row-reverse', justifyContent: 'flex-start', alignItems: 'center' }}>

                        <View style={{ paddingHorizontal: 5 }}>
                            <Image source={awayTeamInfo.logo}
                                style={{
                                    resizeMode: 'contain',
                                    width: 20,
                                    height: 20,
                                    minHeight: 20,
                                    minWidth: 20,
                                }} />
                        </View>
                        <Text style={{ paddingHorizontal: 5, fontSize: 9, color: colors.text, fontFamily: fontFamilies.title }}>{awayTeamInfo.abbreviation}</Text>
                    </View>
                </View>
        </View>
    )
}