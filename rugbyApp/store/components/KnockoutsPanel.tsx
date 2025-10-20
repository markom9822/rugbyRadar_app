import { MatchInfo } from "@/app/(tabs)/index"
import { colors, fontFamilies } from "@/constants/tokens"
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo"
import { getLeagueTrophyIconFromValue, hexToRGB, StandingInfo } from "@/store/utils/helpers"
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getQFKnockoutFixtures, getR16KnockoutFixtures, getSFKnockoutFixtures, pooledTableIntoRankedChallengeCup, pooledTableIntoRankedChampsCup } from "../utils/knockoutsUtils"
import { GridView } from "./GridView"

type KnockoutsPanelProps = {
    standingsArray: StandingInfo[]
    secondaryStandingsArray: StandingInfo[]
    knockoutFixturesArray: MatchInfo[]
    leagueName: string,
    chosenKnockoutRound: string,
    handleChooseRound: (roundName: string) => void
}

type KnockoutsFixturePairProps = {
    firstMatch: MatchInfo,
    secondMatch: MatchInfo,
    thisLeagueName: string,
    hasExtraMargin: boolean,
}

export const KnockoutFixturePair = ({ firstMatch, secondMatch, thisLeagueName, hasExtraMargin }: KnockoutsFixturePairProps) => {

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column', width: "80%" }}>
                <KnockoutsFixture fixtureInfo={firstMatch} leagueName={thisLeagueName} />
                <KnockoutsFixture fixtureInfo={secondMatch} leagueName={thisLeagueName} />
            </View>

            <View style={{ position: 'absolute', bottom: "25%", right: 0, left: "80%", top: "25%", width: "10%", height: "50%", }}>
                <View style={{
                    height: "100%",
                    borderRightColor: 'white', borderRightWidth: 1, borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1
                }}>
                    <Text></Text>
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: "50%", right: 0, left: "90%", top: "50%", width: "10%", height: "1%" }}>
                <View style={{ borderTopColor: 'white', borderTopWidth: 1 }}>
                    <Text></Text>
                </View>
            </View>
        </View>
    )
}


export const KnockoutsPanel = ({ standingsArray, secondaryStandingsArray, knockoutFixturesArray, leagueName, chosenKnockoutRound, handleChooseRound }: KnockoutsPanelProps) => {

    let targetStandingsArray = standingsArray;

    if (standingsArray.length === 0) return;

    if (leagueName === "championsCup") {
        // turn pooled table into ranked table
        targetStandingsArray = pooledTableIntoRankedChampsCup(standingsArray);
    }

    if (leagueName === "challengeCup") {
        // turn pooled table into ranked table
        targetStandingsArray = pooledTableIntoRankedChallengeCup(standingsArray, secondaryStandingsArray);
    }


    const knockoutRoundRender = (knockoutRoundName: string) => {

        if (knockoutRoundName === "r16") {

            const R16Fixtures = getR16KnockoutFixtures(knockoutFixturesArray, targetStandingsArray, leagueName)

            return (
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <KnockoutFixturePair firstMatch={R16Fixtures[0]} secondMatch={R16Fixtures[1]}
                        thisLeagueName={leagueName} hasExtraMargin={false} />

                    <KnockoutFixturePair firstMatch={R16Fixtures[2]} secondMatch={R16Fixtures[3]}
                        thisLeagueName={leagueName} hasExtraMargin={false} />

                    <KnockoutFixturePair firstMatch={R16Fixtures[4]} secondMatch={R16Fixtures[5]}
                        thisLeagueName={leagueName} hasExtraMargin={false} />

                    <KnockoutFixturePair firstMatch={R16Fixtures[6]} secondMatch={R16Fixtures[7]}
                        thisLeagueName={leagueName} hasExtraMargin={true} />
                </View>
            )
        }
        else if (knockoutRoundName === "quaterFinals") {

            const QFFixtures = getQFKnockoutFixtures(knockoutFixturesArray, targetStandingsArray, leagueName)

            return (
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <KnockoutFixturePair firstMatch={QFFixtures[0]} secondMatch={QFFixtures[1]}
                        thisLeagueName={leagueName} hasExtraMargin={false} />

                    <KnockoutFixturePair firstMatch={QFFixtures[2]} secondMatch={QFFixtures[3]}
                        thisLeagueName={leagueName} hasExtraMargin={false} />
                </View>

            )
        }
        else if (knockoutRoundName === "semiFinals") {

            const SFFixtures = getSFKnockoutFixtures(knockoutFixturesArray, targetStandingsArray, leagueName)

            return (
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <KnockoutFixturePair firstMatch={SFFixtures[0]} secondMatch={SFFixtures[1]}
                        thisLeagueName={leagueName} hasExtraMargin={false} />
                </View>
            )
        }
        else if (knockoutRoundName === "final") {

            const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle === "GF");
            if (filteredArray.length === 0) {
                return null
            }

            return (
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', width: "100%" }}>
                            <KnockoutsFinalMatch fixtureInfo={filteredArray[0]} leagueName={leagueName} />
                        </View>
                    </View>

                </View>
            )
        }
    }

    const knockoutRoundButtonsRender = (knockoutFixturesArray: MatchInfo[]) => {

        const hasR16Fixtures = knockoutFixturesArray.find(obj => obj.matchTitle === "R16") !== undefined;
        const hasQFFixtures = knockoutFixturesArray.find(obj => obj.matchTitle === "QF") !== undefined;
        const hasSFFixtures = knockoutFixturesArray.find(obj => obj.matchTitle === "SF") !== undefined;
        const hasGFFixtures = knockoutFixturesArray.find(obj => obj.matchTitle === "GF") !== undefined;

        const buttonsArray = [
            {
                code: "r16",
                title: "R16"
            },
            {
                code: "quaterFinals",
                title: "QF"
            },
            {
                code: "semiFinals",
                title: "SF"
            },
            {
                code: "final",
                title: "F"
            }
        ]

        const booleanMap = {
            R16: hasR16Fixtures,
            QF: hasQFFixtures,
            SF: hasSFFixtures,
            F: hasGFFixtures
        };

        const filteredButtonsArray = buttonsArray.filter(button => {
            return booleanMap[button.title as keyof typeof booleanMap];
        });

        return (

            <GridView
                data={filteredButtonsArray}
                col={filteredButtonsArray.length}
                renderItem={(item, index) =>
                    <View>
                        <TouchableOpacity style={[knockoutPanelStyles.roundButton, { backgroundColor: chosenKnockoutRound === item.code ? 'lightgrey' : 'transparent' }]}
                            onPress={() => handlePressRoundButton(item.code)}>
                            <Text style={[knockoutPanelStyles.roundText, { color: chosenKnockoutRound === item.code ? 'black' : 'white' }]}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>} />
        )
    }

    const handlePressRoundButton = (roundName: string) => {
        handleChooseRound(roundName)
    }

    //const leagueDisplayName = getLeagueDisplayNameFromValue(leagueName)
    //const leagueLogo = getLeagueLogoFromValue(leagueName)

    return (
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>

            {knockoutFixturesArray.length === 0 && (
                <View style={{ marginVertical: 20 }}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )}

            <View style={{ marginVertical: 8 }}>
                {knockoutRoundButtonsRender(knockoutFixturesArray)}
            </View>
            {knockoutRoundRender(chosenKnockoutRound)}
        </View>
    )
}

type KnockoutsFixtureProps = {
    leagueName: string,
    fixtureInfo: MatchInfo,
}

export const KnockoutsFixture = ({ leagueName, fixtureInfo }: KnockoutsFixtureProps) => {

    if (fixtureInfo === undefined || fixtureInfo == null) {
        return;
    }

    let homeTeamName;
    let awayTeamName;

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, fixtureInfo.homeTeam, fixtureInfo.awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    homeTeamName = homeTeamInfo?.abbreviation;
    awayTeamName = awayTeamInfo?.abbreviation;

    if (fixtureInfo.homeTeam === "TBC") {
        homeTeamName = fixtureInfo.homeTeam;
    }
    if (fixtureInfo.awayTeam === "TBC") {
        awayTeamName = fixtureInfo.awayTeam;
    }

    const homeTeamScore = fixtureInfo.homeScore;
    const awayTeamScore = fixtureInfo.awayScore;
    const matchVenue = fixtureInfo.matchVenue;

    if (homeTeamInfo === null) return
    if (awayTeamInfo === null) return
    if (homeTeamInfo === undefined) return
    if (awayTeamInfo === undefined) return

    const homeFontFamily = (new Number(homeTeamScore) > new Number(awayTeamScore)) ? (fontFamilies.bold) : (fontFamilies.light);
    const awayFontFamily = (new Number(awayTeamScore) > new Number(homeTeamScore)) ? (fontFamilies.bold) : (fontFamilies.light);

    const renderScoreTime = (eventState: string) => {

        const formattedDate = fixtureInfo.matchDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit'
        });

        // not started yet
        if (eventState === "pre") {
            return (
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ paddingHorizontal: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.light, paddingHorizontal: 5 }}>{formattedDate}</Text>
                    </View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: 10, textAlign: 'center', paddingVertical: 3 }}>{matchVenue}</Text>
                </View>
            )
        }
        // event finished
        else if (eventState === "post") {
            return (
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ paddingHorizontal: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, fontFamily: homeFontFamily, paddingHorizontal: 5, width: "35%", textAlign: 'center', fontSize: 13 }}>{homeTeamScore}</Text>

                        <Text style={{ width: "30%", textAlign: 'center', color: colors.text, fontFamily: fontFamilies.bold, fontSize: 12 }}>FT</Text>

                        <Text style={{ color: colors.text, fontFamily: awayFontFamily, paddingHorizontal: 5, width: "35%", textAlign: 'center', fontSize: 13 }}>{awayTeamScore}</Text>
                    </View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: 10, textAlign: 'center', paddingVertical: 3 }}>{matchVenue}</Text>
                </View>

            )
        }
        // event ongoing
        else {
            return (
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ paddingHorizontal: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, fontFamily: homeFontFamily, paddingHorizontal: 5, width: "35%", textAlign: 'center', fontSize: 16 }}>{homeTeamScore}</Text>

                        <Text style={{ width: "30%", textAlign: 'center', color: colors.text, fontFamily: fontFamilies.bold, fontSize: 14 }}></Text>

                        <Text style={{ color: colors.text, fontFamily: awayFontFamily, paddingHorizontal: 5, width: "35%", textAlign: 'center', fontSize: 16 }}>{awayTeamScore}</Text>
                    </View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: 10, textAlign: 'center', paddingVertical: 3 }}>{matchVenue}</Text>
                </View>
            )
        }
    }

    const panelColour = hexToRGB("#4d4b4b", '0.6')

    return (
        <View style={{
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: panelColour,
            marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 4
        }}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "20%" }}>
                    <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={[knockoutPanelStyles.teamLogo]}
                            source={homeTeamInfo.logo} />
                    </View>
                    <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 10, textAlign: 'center' }}>{homeTeamName}</Text>
                </View>

                <View style={{ width: "60%" }}>
                    {renderScoreTime(fixtureInfo.eventState)}
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "20%" }}>
                    <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={[knockoutPanelStyles.teamLogo]}
                            source={awayTeamInfo.logo} />
                    </View>
                    <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 10, textAlign: 'center' }}>{awayTeamName}</Text>
                </View>
            </View>
        </View>
    )
}

export const KnockoutsFinalMatch = ({ leagueName, fixtureInfo }: KnockoutsFixtureProps) => {

    if (fixtureInfo === undefined || fixtureInfo == null) {
        return;
    }

    let homeTeamName;
    let awayTeamName;

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, fixtureInfo.homeTeam, fixtureInfo.awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    homeTeamName = homeTeamInfo?.abbreviation;
    awayTeamName = awayTeamInfo?.abbreviation;

    if (fixtureInfo.homeTeam === "TBC") {
        homeTeamName = fixtureInfo.homeTeam;
    }
    if (fixtureInfo.awayTeam === "TBC") {
        awayTeamName = fixtureInfo.awayTeam;
    }

    const homeTeamScore = fixtureInfo.homeScore;
    const awayTeamScore = fixtureInfo.awayScore;
    const matchVenue = fixtureInfo.matchVenue;

    if (homeTeamInfo === null) return
    if (awayTeamInfo === null) return
    if (homeTeamInfo === undefined) return
    if (awayTeamInfo === undefined) return

    const panelColour = hexToRGB("#4d4b4b", '0.6')

    const renderScoreTime = (eventState: string) => {

        const formattedDate = fixtureInfo.matchDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit'
        });

        // not started yet
        if (eventState === "pre") {
            return (
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ paddingHorizontal: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.light, paddingHorizontal: 5 }}>{formattedDate}</Text>
                    </View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: 10, textAlign: 'center', paddingVertical: 3 }}>{matchVenue}</Text>
                </View>
            )
        }
        // event finished
        else if (eventState === "post") {
            return (
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ paddingHorizontal: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.title, paddingHorizontal: 5, width: "35%", textAlign: 'center', fontSize: 16 }}>{homeTeamScore}</Text>

                        <Text style={{ width: "30%", textAlign: 'center', color: colors.text, fontFamily: fontFamilies.bold, fontSize: 14 }}>FT</Text>

                        <Text style={{ color: colors.text, fontFamily: fontFamilies.title, paddingHorizontal: 5, width: "35%", textAlign: 'center', fontSize: 16 }}>{awayTeamScore}</Text>
                    </View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: 10, textAlign: 'center', paddingVertical: 3 }}>{matchVenue}</Text>
                </View>
            )
        }
        // event ongoing
        else {
            return (
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ paddingHorizontal: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.text, fontFamily: fontFamilies.title, paddingHorizontal: 5, width: "35%", textAlign: 'center', fontSize: 16 }}>{homeTeamScore}</Text>

                        <Text style={{ width: "30%", textAlign: 'center', color: colors.text, fontFamily: fontFamilies.bold, fontSize: 14 }}></Text>

                        <Text style={{ color: colors.text, fontFamily: fontFamilies.title, paddingHorizontal: 5, width: "35%", textAlign: 'center', fontSize: 16 }}>{awayTeamScore}</Text>
                    </View>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: 10, textAlign: 'center', paddingVertical: 3 }}>{matchVenue}</Text>
                </View>
            )
        }
    }

    const renderTrophyIcon = () => {

        const leagueTrophyIcon = getLeagueTrophyIconFromValue(leagueName)

        return (
            <View style={{ margin: 3 }}>
                <Image style={[knockoutPanelStyles.finalsTeamLogo]}
                    source={leagueTrophyIcon} />
            </View>
        )
    }

    return (
        <View style={{
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: panelColour,
            marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 4
        }}>

            {renderTrophyIcon()}

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "20%" }}>
                    <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={[knockoutPanelStyles.teamLogo]}
                            source={homeTeamInfo.logo} />
                    </View>
                    <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 13, textAlign: 'center' }}>{homeTeamName}</Text>
                </View>

                <View style={{ width: "60%" }}>
                    {renderScoreTime(fixtureInfo.eventState)}
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "20%" }}>
                    <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={[knockoutPanelStyles.teamLogo]}
                            source={awayTeamInfo.logo} />
                    </View>
                    <Text style={{ color: colors.text, fontFamily: fontFamilies.title, fontSize: 13, textAlign: 'center' }}>{awayTeamName}</Text>
                </View>
            </View>
        </View>
    )
}

export const knockoutPanelStyles = StyleSheet.create({
    roundText: {
        fontFamily: fontFamilies.title,
        textAlign: 'center',
        fontSize: 11,
        padding: 6
    },

    roundButton: {
        margin: 5,
        borderRadius: 5,
        borderColor: 'lightgrey',
        borderWidth: 0.5
    },

    teamLogo: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        minHeight: 25,
        minWidth: 25
    },

    finalsTeamLogo: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        minHeight: 30,
        minWidth: 30
    },
})