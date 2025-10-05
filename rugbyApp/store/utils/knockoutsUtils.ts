
import { MatchInfo } from "@/app/(tabs)/(fixtures)"
import { StandingInfo } from "@/store/utils/helpers"
import { getChampionsCupTeamInfoFromName } from "../ChampionsCupRugbyTeamsDatabase"
import { getPremTeamInfoFromName } from "../PremiershipRubyTeamsDatabase"
import { getURCTeamInfoFromName } from "../URCRugbyTeamsDatabase"


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

export const pooledTableIntoRankedChallengeCup = (standingsArray: StandingInfo[], secondaryArray: StandingInfo[]) => {

    const clonedArray = [...standingsArray];

    const filteredPools = clonedArray.filter(item => item.teamName !== "Pool");

    const rank1Array = sortTeamsArrayChallengeCup(filteredPools, 0)
    const rank2Array = sortTeamsArrayChallengeCup(filteredPools, 1)
    const rank3Array = sortTeamsArrayChallengeCup(filteredPools, 2)
    const rank4Array = sortTeamsArrayChallengeCup(filteredPools, 3)

    // last in rank3Array is first in rank4Array
    rank4Array.unshift(rank3Array[rank3Array.length - 1])
    const lastElement = rank3Array.pop()

    // need to include teams from champs cup in ranks 9 - 12
    // take 5th place team from each pool
    const champsCupClonedArray = [...secondaryArray];
    const champsCupFilteredPools = champsCupClonedArray.filter(item => item.teamName !== "Pool");
    const champsCupRankArray = sortTeamsArrayChallengeCup(champsCupFilteredPools, 4)
    console.info(champsCupRankArray)

    const rankedArray = [...rank1Array, ...rank2Array, ...rank3Array, ...champsCupRankArray, ...rank4Array];

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
            SFFixturesTemp[index] = findFixtureCombination(SFSeedings[index], targetStandingsArray, filteredArray, leagueName)
        }
        else {
            SFFixturesTemp[index] = getFixtureFromStandingIndex(SFSeedings[index][0], SFSeedings[index][1], targetStandingsArray, filteredArray, leagueName);
        }

    }

    if (SFFixtures[0] == null && SFFixtures[1] == null) {
        const validFixtures = SFFixturesTemp.filter(isValidFixture);
        SFFixtures = validFixtures;
    }

    return (
        SFFixtures
    )
}