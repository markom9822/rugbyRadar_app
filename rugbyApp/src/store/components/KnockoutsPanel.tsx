import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from "react-native"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { getLeagueDisplayNameFromValue, getLeagueLogoFromValue, getLeagueTrophyIconFromValue } from "@/store/utils/helpers"
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo"
import { MatchInfo } from "@/app/(tabs)/(fixtures)"
import { StandingInfo } from "@/app/(tabs)/standings"
import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase"
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase"
import { getChampionsCupTeamInfoFromName } from "../ChampionsCupRugbyTeamsDatabase"

type KnockoutsPanelProps = {
    standingsArray: StandingInfo[]
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
        <View style={{ flexDirection: 'row', marginBottom: hasExtraMargin ? 50 : 0 }}>
            <View style={{ flexDirection: 'column', width: "80%" }}>
                <KnockoutsFixture fixtureInfo={firstMatch} leagueName={thisLeagueName} isFinalMatch={false} />
                <KnockoutsFixture fixtureInfo={secondMatch} leagueName={thisLeagueName} isFinalMatch={false} />
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

export const getFixtureFromStandingIndex = (team1Index: number, team2Index: number,
    standingsArray: StandingInfo[], fixturesArray: MatchInfo[], league: string) => {

    const team1Name = standingsArray.find(item => item.ranking + 1 === team1Index)?.teamName;
    const team2Name = standingsArray.find(item => item.ranking + 1 === team2Index)?.teamName;

    console.info(team1Name)
    console.info(team2Name)

    console.info(fixturesArray)

    for (let index = 0; index < fixturesArray.length; index++) {

        var homeTeamSearchName;
        var awayTeamSearchName;

        if (league === "urc") {
            homeTeamSearchName = getURCTeamInfoFromName(fixturesArray[index].homeTeam).displayName;
            awayTeamSearchName = getURCTeamInfoFromName(fixturesArray[index].awayTeam).displayName;
        }
        if (league === "prem") {
            homeTeamSearchName = getPremTeamInfoFromName(fixturesArray[index].homeTeam).displayName;
            awayTeamSearchName = getPremTeamInfoFromName(fixturesArray[index].awayTeam).displayName;
        }
        if (league === "championsCup" || league === "challengeCup") {
            homeTeamSearchName = getChampionsCupTeamInfoFromName(fixturesArray[index].homeTeam).displayName;
            console.info(`home team search name: ${homeTeamSearchName}, team1 Name: ${team1Name}`)
            awayTeamSearchName = getChampionsCupTeamInfoFromName(fixturesArray[index].awayTeam).displayName;
            console.info(`away team search name: ${awayTeamSearchName}, team2 Name: ${team2Name}`)

        }

        const homeCheck = homeTeamSearchName == team1Name || homeTeamSearchName == team2Name;
        const awayCheck = awayTeamSearchName == team1Name || awayTeamSearchName == team2Name;

        if (homeCheck && awayCheck) {
            console.info("Got here")
            return fixturesArray[index]
        }

    }

    return null
}

export const findFixtureCombination = (indexCombinations: number[], rankedStandingsArray: StandingInfo[],
    fixturesArray: MatchInfo[], league: string) => {

    var combinationsTeamNames = new Array(indexCombinations.length)

    for (let index = 0; index < indexCombinations.length; index++) {

        combinationsTeamNames[index] = rankedStandingsArray.find(item => item.ranking + 1 === indexCombinations[index])?.teamName;
    }

    console.info(combinationsTeamNames)

    for (let index = 0; index < fixturesArray.length; index++) {

        var homeTeamSearchName;
        var awayTeamSearchName;

        if (league === "championsCup" || league === "challengeCup") {
            homeTeamSearchName = getChampionsCupTeamInfoFromName(fixturesArray[index].homeTeam).displayName;
            awayTeamSearchName = getChampionsCupTeamInfoFromName(fixturesArray[index].awayTeam).displayName;
        }

        // find fixture:
        if (combinationsTeamNames.includes(homeTeamSearchName) && combinationsTeamNames.includes(awayTeamSearchName)) {
            return fixturesArray[index]
        }
    }

    return null
}

export const sortTeamsArray = (standings: StandingInfo[], rankingsIndex: number) => {

    const clonedStandings = [...standings];

    const filtered = clonedStandings.filter(item => item.ranking === rankingsIndex);
    console.info("Filtered")
    console.info(filtered)

    const sorted = filtered.sort((a, b) =>
        Number(b.teamPoints) - Number(a.teamPoints) ||
        Number(b.teamPD) - Number(a.teamPD)
    );

    return filtered
}

export const pooledTableIntoRankedChampsCup = (standingsArray: StandingInfo[]) => {

    const clonedArray = [...standingsArray];

    const filteredPools = clonedArray.filter(item => item.teamName !== "Pool");

    const rank1Array = sortTeamsArray(filteredPools, 0)
    const rank2Array = sortTeamsArray(filteredPools, 1)
    const rank3Array = sortTeamsArray(filteredPools, 2)
    const rank4Array = sortTeamsArray(filteredPools, 3)

    const rankedArray = [...rank1Array, ...rank2Array, ...rank3Array, ...rank4Array];

    for (let index = 0; index < rankedArray.length; index++) {

        const newStanding: StandingInfo = {
            isHeader: rankedArray[index].isHeader,
            teamPool: rankedArray[index].teamPool,
            teamName: rankedArray[index].teamName,
            teamGP: rankedArray[index].teamGP,
            teamWins: rankedArray[index].teamWins,
            teamDraws: rankedArray[index].teamDraws,
            teamLosses: rankedArray[index].teamGP,
            teamPD: rankedArray[index].teamPD,
            teamPoints: rankedArray[index].teamPoints,
            ranking: index,
            isLastItem: rankedArray[index].isLastItem,
            isEndOfList: rankedArray[index].isEndOfList,
            isPlayoffCutoff: rankedArray[index].isPlayoffCutoff
        };

        rankedArray[index] = newStanding;
        console.info(`Team: ${rankedArray[index].teamName}, ranking: ${index}`)
    }

    return rankedArray

}

export const sortTeamsArrayChallengeCup = (standings: StandingInfo[], rankingsIndex: number) => {

    const clonedStandings = [...standings];

    const filtered = clonedStandings.filter(item => item.ranking === rankingsIndex);
    console.info("Filtered")
    console.info(filtered)

    const sorted = filtered.sort((a, b) =>
        Number(b.teamPoints) - Number(a.teamPoints) ||
        Number(b.teamPD) - Number(a.teamPD)
    );

    return filtered
}

export const pooledTableIntoRankedChallengeCup = (standingsArray: StandingInfo[]) => {

    // need to include teams from champs cup in ranks 9 - 12

    const clonedArray = [...standingsArray];

    const filteredPools = clonedArray.filter(item => item.teamName !== "Pool");

    const rank1Array = sortTeamsArrayChallengeCup(filteredPools, 0)
    const rank2Array = sortTeamsArrayChallengeCup(filteredPools, 1)
    const rank3Array = sortTeamsArrayChallengeCup(filteredPools, 2)

    const rankedArray = [...rank1Array, ...rank2Array, ...rank3Array];

    for (let index = 0; index < rankedArray.length; index++) {

        const newStanding: StandingInfo = {
            isHeader: rankedArray[index].isHeader,
            teamPool: rankedArray[index].teamPool,
            teamName: rankedArray[index].teamName,
            teamGP: rankedArray[index].teamGP,
            teamWins: rankedArray[index].teamWins,
            teamDraws: rankedArray[index].teamDraws,
            teamLosses: rankedArray[index].teamGP,
            teamPD: rankedArray[index].teamPD,
            teamPoints: rankedArray[index].teamPoints,
            ranking: index,
            isLastItem: rankedArray[index].isLastItem,
            isEndOfList: rankedArray[index].isEndOfList,
            isPlayoffCutoff: rankedArray[index].isPlayoffCutoff
        };

        rankedArray[index] = newStanding;
        console.info(`Team: ${rankedArray[index].teamName}, ranking: ${index}`)
    }

    return rankedArray

}

export const getR16KnockoutFixtures = (knockoutFixturesArray: MatchInfo[], targetStandingsArray: StandingInfo[], leagueName: string) => {

    const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "R16");

    if (filteredArray.length == 0) {
        return []
    }

    const R16Seedings = [[1, 16], [8, 9], [5, 12], [4, 13], [2, 15], [7, 10], [3, 14], [6, 11]]

    var R16Fixtures = new Array(filteredArray.length);

    for (let index = 0; index < filteredArray.length; index++) {

        if (filteredArray[index].homeTeam == "TBC" && filteredArray[index].awayTeam == "TBC") {
            R16Fixtures[index] = filteredArray[index]
        }
        else {
            R16Fixtures[index] = getFixtureFromStandingIndex(R16Seedings[index][0], R16Seedings[index][1], targetStandingsArray, filteredArray, leagueName);
        }
    }

    return (
        R16Fixtures
    )
}

export const getQFKnockoutFixtures = (knockoutFixturesArray: MatchInfo[], targetStandingsArray: StandingInfo[], leagueName: string) => {

    function isValidFixture<T>(fixture: T | null | undefined): fixture is T {
        return fixture !== null && fixture !== undefined;
    }

    const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "QF");

    if (filteredArray.length == 0) {
        return []
    }

    var QFFixtures = new Array(filteredArray.length);

    if (leagueName == "championsCup" || leagueName === "challengeCup") {
        const QFSeedingOptions = [[1, 8], [1, 9], [16, 8], [16, 9],
        [5, 4], [5, 13], [12, 4], [12, 13],
        [2, 7], [2, 10], [15, 7], [15, 10],
        [3, 6], [3, 11], [14, 6], [14, 11]]

        var QFFixturesTemp = new Array(QFSeedingOptions.length);

        for (let index = 0; index < filteredArray.length; index++) {

            if (filteredArray[index].homeTeam == "TBC" && filteredArray[index].awayTeam == "TBC") {
                QFFixtures[index] = filteredArray[index]
            }
        }

        for (let index = 0; index < QFSeedingOptions.length; index++) {

            QFFixturesTemp[index] = getFixtureFromStandingIndex(QFSeedingOptions[index][0], QFSeedingOptions[index][1], targetStandingsArray, filteredArray, leagueName);
        }

        if (QFFixtures[0] == null && QFFixtures[1] == null) {
            const validFixtures = QFFixturesTemp.filter(isValidFixture);
            QFFixtures = validFixtures;
        }
    }
    else {
        const QFSeedings = [[1, 8], [4, 5], [2, 7], [3, 6]]

        var QFFixtures = new Array(filteredArray.length);

        for (let index = 0; index < filteredArray.length; index++) {

            if (filteredArray[index].homeTeam == "TBC" && filteredArray[index].awayTeam == "TBC") {
                QFFixtures[index] = filteredArray[index]
            }
            else {
                QFFixtures[index] = getFixtureFromStandingIndex(QFSeedings[index][0], QFSeedings[index][1], targetStandingsArray, filteredArray, leagueName);
            }
        }
    }

    return (
        QFFixtures
    )
}

export const getSFKnockoutFixtures = (knockoutFixturesArray: MatchInfo[], targetStandingsArray: StandingInfo[], leagueName: string) => {

    function isValidFixture<T>(fixture: T | null | undefined): fixture is T {
        return fixture !== null && fixture !== undefined;
    }

    const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "SF");

    if (filteredArray.length == 0) {
        return []
    }

    var SFSeedings: any;

    if (leagueName == "urc") {
        SFSeedings = [[1, 4], [1, 5], [8, 4], [8, 5], [2, 3], [2, 6], [7, 3], [7, 6]]
    }
    else if (leagueName == "prem") {
        SFSeedings = [[1, 4], [2, 3]]
    }
    else if (leagueName == "championsCup" || leagueName === "challengeCup") {
        SFSeedings = [[1, 16, 8, 9, 5, 12, 4, 13], [2, 15, 7, 10, 3, 14, 6, 11]]
    }

    var SFFixtures = new Array(filteredArray.length);
    var SFFixturesTemp = new Array(SFSeedings.length);

    for (let index = 0; index < filteredArray.length; index++) {

        if (filteredArray[index].homeTeam == "TBC" && filteredArray[index].homeTeam == "TBC") {
            SFFixtures[index] = filteredArray[index]
        }
    }

    for (let index = 0; index < SFSeedings.length; index++) {

        if (leagueName == "championsCup" || leagueName === "challengeCup") {
            // need to find matching index
            SFFixtures[index] = findFixtureCombination(SFSeedings[index], targetStandingsArray, filteredArray, leagueName)
        }

        SFFixturesTemp[index] = getFixtureFromStandingIndex(SFSeedings[index][0], SFSeedings[index][1], targetStandingsArray, filteredArray, leagueName);
    }

    if (SFFixtures[0] == null && SFFixtures[1] == null) {
        const validFixtures = SFFixturesTemp.filter(isValidFixture);
        SFFixtures = validFixtures;
    }

    return (
        SFFixtures
    )
}

export const KnockoutsPanel = ({ standingsArray, knockoutFixturesArray, leagueName, chosenKnockoutRound, handleChooseRound }: KnockoutsPanelProps) => {

    var targetStandingsArray = standingsArray;

    if (leagueName == "championsCup") {
        // turn pooled table into ranked table
        targetStandingsArray = pooledTableIntoRankedChampsCup(standingsArray);
    }

    if (leagueName === "challengeCup") {
        // turn pooled table into ranked table
        targetStandingsArray = pooledTableIntoRankedChallengeCup(standingsArray);
    }

    const knockoutRoundRender = (knockoutRoundName: string) => {

        if (knockoutRoundName == "r16") {

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
        else if (knockoutRoundName == "quaterFinals") {

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
        else if (knockoutRoundName == "semiFinals") {

            const SFFixtures = getSFKnockoutFixtures(knockoutFixturesArray, targetStandingsArray, leagueName)

            return (
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <KnockoutFixturePair firstMatch={SFFixtures[0]} secondMatch={SFFixtures[1]}
                        thisLeagueName={leagueName} hasExtraMargin={false} />
                </View>
            )
        }
        else if (knockoutRoundName == "final") {

            const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "GF");
            if (filteredArray.length == 0) {
                return null
            }

            return (
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', width: "100%" }}>
                            <KnockoutsFixture fixtureInfo={filteredArray[0]} leagueName={leagueName} isFinalMatch={true} />
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

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {hasR16Fixtures && (
                    <TouchableOpacity style={[knockoutPanelStyles.roundButton, { backgroundColor: chosenKnockoutRound == 'r16' ? 'lightgrey' : 'transparent' }]}
                        onPress={() => handlePressRoundButton('r16')}>
                        <Text style={[knockoutPanelStyles.roundText, { color: chosenKnockoutRound == 'r16' ? 'black' : 'white' }]}>R16</Text>
                    </TouchableOpacity>
                )}
                {hasQFFixtures && (
                    <TouchableOpacity style={[knockoutPanelStyles.roundButton, { backgroundColor: chosenKnockoutRound == 'quaterFinals' ? 'lightgrey' : 'transparent' }]}
                        onPress={() => handlePressRoundButton('quaterFinals')}>
                        <Text style={[knockoutPanelStyles.roundText, { color: chosenKnockoutRound == 'quaterFinals' ? 'black' : 'white' }]}>QUARTER FINALS</Text>
                    </TouchableOpacity>
                )}
                {hasSFFixtures && (
                    <TouchableOpacity style={[knockoutPanelStyles.roundButton, { backgroundColor: chosenKnockoutRound == 'semiFinals' ? 'lightgrey' : 'transparent' }]}
                        onPress={() => handlePressRoundButton('semiFinals')}>
                        <Text style={[knockoutPanelStyles.roundText, { color: chosenKnockoutRound == 'semiFinals' ? 'black' : 'white' }]}>SEMI FINALS</Text>
                    </TouchableOpacity>
                )}
                {hasGFFixtures && (
                    <TouchableOpacity style={[knockoutPanelStyles.roundButton, { backgroundColor: chosenKnockoutRound == 'final' ? 'lightgrey' : 'transparent' }]}
                        onPress={() => handlePressRoundButton('final')}>
                        <Text style={[knockoutPanelStyles.roundText, { color: chosenKnockoutRound == 'final' ? 'black' : 'white' }]}>FINAL</Text>
                    </TouchableOpacity>
                )}

            </View>
        )
    }

    const handlePressRoundButton = (roundName: string) => {
        handleChooseRound(roundName)
    }

    const leagueDisplayName = getLeagueDisplayNameFromValue(leagueName)
    const leagueLogo = getLeagueLogoFromValue(leagueName)

    return (
        <ImageBackground resizeMode="cover" imageStyle={{ opacity: 0.05 }}
            style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}
            source={leagueLogo} >
            <View>
                <Text style={{ color: colors.text, fontFamily: fontFamilies.bold, textAlign: 'center', fontSize: fontSize.sm }}>KNOCKOUTS</Text>
            </View>

            <View style={{ marginVertical: 5 }}>
                <Text style={{ color: colors.text, fontFamily: fontFamilies.regular, textAlign: 'center', fontSize: 14 }}>{leagueDisplayName}</Text>
            </View>

            {knockoutFixturesArray.length == 0 && (
                <View style={{ marginVertical: 20 }}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )}

            <View style={{ marginVertical: 8 }}>
                {knockoutRoundButtonsRender(knockoutFixturesArray)}
            </View>

            <BottomSheetScrollView>
                {knockoutRoundRender(chosenKnockoutRound)}
            </BottomSheetScrollView>

        </ImageBackground>
    )
}

type KnockoutsFixtureProps = {
    leagueName: string,
    fixtureInfo: MatchInfo,
    isFinalMatch: boolean,

}

export const KnockoutsFixture = ({ leagueName, fixtureInfo, isFinalMatch }: KnockoutsFixtureProps) => {

    if (fixtureInfo == undefined || fixtureInfo == null) {
        return;
    }

    var homeTeamName;
    var awayTeamName;

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, fixtureInfo.homeTeam, fixtureInfo.awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    homeTeamName = homeTeamInfo?.abbreviation;
    awayTeamName = awayTeamInfo?.abbreviation;

    if (fixtureInfo.homeTeam == "TBC") {
        homeTeamName = fixtureInfo.homeTeam;
    }
    if (fixtureInfo.awayTeam == "TBC") {
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

    const renderTrophyIcon = (finalMatch: boolean) => {

        const leagueTrophyIcon = getLeagueTrophyIconFromValue(leagueName)

        if (finalMatch) {
            return (
                <View style={{ margin: 3 }}>
                    <Image style={[knockoutPanelStyles.teamLogo]}
                        source={leagueTrophyIcon} />
                </View>
            )
        }

        return (
            <></>
        )
    }

    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, borderColor: 'lightgrey', borderWidth: 0.5,
        marginHorizontal: 10, marginVertical: 10, padding: 5, borderRadius: 4 }}>

            {renderTrophyIcon(isFinalMatch)}

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ color: colors.text, fontFamily: fontFamilies.bold, fontSize: 12 }}>{homeTeamName}</Text>
                <View style={{ paddingHorizontal: 10 }}>
                    <Image
                        style={[knockoutPanelStyles.teamLogo]}
                        source={homeTeamInfo.logo} />
                </View>
                <View style={{ padding: 4, flexDirection: 'row' }}>
                    <Text style={{ color: colors.text, fontFamily: homeFontFamily, paddingHorizontal: 5 }}>{homeTeamScore}</Text>
                    <Text style={{ color: colors.text, fontFamily: awayFontFamily, paddingHorizontal: 5 }}>{awayTeamScore}</Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <Image
                        style={[knockoutPanelStyles.teamLogo]}
                        source={awayTeamInfo.logo} />
                </View>
                <Text style={{ color: colors.text, fontFamily: fontFamilies.bold, fontSize: 12 }}>{awayTeamName}</Text>
            </View>

            <View style={{ padding: 3 }}>
                <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: 11 }}>{matchVenue}</Text>
            </View>
        </View>
    )
}

export const knockoutPanelStyles = StyleSheet.create({
    roundText: {
        fontFamily: fontFamilies.bold,
        textAlign: 'center',
        fontSize: fontSize.xs,
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
})