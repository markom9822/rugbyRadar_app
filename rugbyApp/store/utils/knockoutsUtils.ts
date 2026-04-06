
import { MatchInfo } from "@/app/(tabs)/index"
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

        let homeTeamSearchName;
        let awayTeamSearchName;

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

        const homeCheck = homeTeamSearchName === team1Name || homeTeamSearchName === team2Name;
        const awayCheck = awayTeamSearchName === team1Name || awayTeamSearchName === team2Name;

        if (homeCheck && awayCheck) {
            console.info("Got here")
            return fixturesArray[index]
        }
    }

    return null
}

export const findFixtureCombination = (indexCombinations: number[], rankedStandingsArray: StandingInfo[],
    fixturesArray: MatchInfo[], league: string) => {

    let combinationsTeamNames = new Array(indexCombinations.length)

    for (let index = 0; index < indexCombinations.length; index++) {

        combinationsTeamNames[index] = rankedStandingsArray.find(item => item.ranking + 1 === indexCombinations[index])?.teamName;
    }

    console.info(combinationsTeamNames)

    for (let index = 0; index < fixturesArray.length; index++) {

        let homeTeamSearchName;
        let awayTeamSearchName;

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

    console.info("Rank 1:")
    console.info(rank1Array)

    console.info("Rank 2:")
    console.info(rank2Array)

    console.info("Rank 3:")
    console.info(rank3Array)

    console.info("Rank 4:")
    console.info(rank4Array)


    // last in rank3Array is first in rank4Array
    const lastElement = rank3Array.pop()
    rank4Array.unshift(lastElement || rank3Array[rank3Array.length - 1]);

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
            teamLosses: rankedArray[index].teamLosses,
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

    const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle === "R16");

    if (filteredArray.length === 0) {
        return []
    }

    const R16Seedings = [[1, 16], [8, 9], [5, 12], [4, 13], [2, 15], [7, 10], [3, 14], [6, 11]]

    let R16Fixtures = new Array(filteredArray.length);

    for (let index = 0; index < filteredArray.length; index++) {

        if (filteredArray[index].homeTeam === "TBC" && filteredArray[index].awayTeam === "TBC") {
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

export const getQFKnockoutFixtures = (
    knockoutFixturesArray: MatchInfo[],
    r16Fixtures: MatchInfo[],
    targetStandingsArray: StandingInfo[],
    leagueName: string
) => {
    const allQFs = knockoutFixturesArray.filter(item => item.matchTitle === "QF");
    
    const normalize = (name: string) => 
        name.toLowerCase()
            .replace(/ rugby| v| st$/g, "")
            .replace(/[^a-z0-9]/g, "")
            .trim();

    // 1. Determine the Winners for each bracket slot
    let winners: (string | null)[] = [];

    if (r16Fixtures && r16Fixtures.length > 0) {
        // CASE A: League has Round of 16 (e.g., Champions Cup)
        winners = r16Fixtures.map(match => {
            if (match.eventState !== "post" || !match.homeScore || !match.awayScore) return null;
            return Number(match.homeScore) > Number(match.awayScore) ? match.homeTeam : match.awayTeam;
        });
    } else {
        // CASE B: Standard Seeding (1-8) from Standings
        // Sort standings by position just in case
        const sortedStandings = [...targetStandingsArray].sort((a, b) => Number(a.ranking) - Number(b.ranking));
        
        // We need 8 teams for a QF. Winners array will represent Seeds 1 through 8.
        for (let i = 0; i < 8; i++) {
            winners.push(sortedStandings[i]?.teamName || null);
        }
    }

    /** * 2. Define Bracket Pairs
     * If using R16: [0,1], [2,3], [4,5], [6,7]
     * If using Seeds: [0,7] (1v8), [3,4] (4v5), [1,6] (2v7), [2,5] (3v6)
     */
    const bracketPairs = (r16Fixtures && r16Fixtures.length > 0) 
        ? [[0, 1], [2, 3], [4, 5], [6, 7]] 
        : [[0, 7], [3, 4], [1, 6], [2, 5]];

    // 3. Map the Bracket
    return bracketPairs.map((pair, qfIndex) => {
        const team1 = winners[pair[0]];
        const team2 = winners[pair[1]];

        if (!team1 || !team2) {
            return {
                ...allQFs[qfIndex],
                matchTitle: "QF",
                homeTeam: team1 || "TBC",
                awayTeam: team2 || "TBC",
                eventState: "pre",
                matchVenue: "TBD"
            };
        }

        const norm1 = normalize(team1);
        const norm2 = normalize(team2);

        // Try to find if this specific match is already in the API data
        const scheduledMatch = allQFs.find(qf => {
            const h = normalize(qf.homeTeam);
            const a = normalize(qf.awayTeam);
            return (h === norm1 && a === norm2) || (h === norm2 && a === norm1);
        });

        if (scheduledMatch) return scheduledMatch;

        // Fallback: Manually determine Home/Away based on Rank
        const getRank = (name: string) => {
            const n = normalize(name);
            const s = targetStandingsArray.find(st => normalize(st.teamName) === n);
            return s ? Number(s.ranking) : 99;
        };

        const [home, away] = getRank(team1) <= getRank(team2) ? [team1, team2] : [team2, team1];

        return {
            ...(allQFs[qfIndex] || {}),
            matchTitle: "QF",
            homeTeam: home,
            awayTeam: away,
            eventState: "pre"
        };
    });
};

export const getSFKnockoutFixtures = (
    knockoutFixturesArray: MatchInfo[], 
    qfFixtures: MatchInfo[], 
    targetStandingsArray: StandingInfo[], 
    leagueName: string
) => {
    const allSFs = knockoutFixturesArray.filter(item => item.matchTitle === "SF");
    if (allSFs.length === 0) return [];

    const normalize = (name: string) => 
        name.toLowerCase().replace(/ rugby| v| st$/g, "").replace(/[^a-z0-9]/g, "").trim();

    const getWinner = (m: MatchInfo | undefined) => {
        if (!m || m.eventState !== "post") return null;
        return Number(m.homeScore) > Number(m.awayScore) ? m.homeTeam : m.awayTeam;
    };

    // 1. Determine the 4 Semi-Finalists based on league rules
    let sfTeams: (string | null)[] = [];

    if (leagueName === "prem") {
        /**
         * PREMIERSHIP CASE: Direct from standings (1v4 and 2v3)
         */
        const sorted = [...targetStandingsArray].sort((a, b) => Number(a.ranking) - Number(b.ranking));
        // Pair 1: [Seed 1, Seed 4], Pair 2: [Seed 2, Seed 3]
        sfTeams = [
            sorted[0]?.teamName || null, sorted[3]?.teamName || null, 
            sorted[1]?.teamName || null, sorted[2]?.teamName || null
        ];
    } else {
        /**
         * URC/EPCR CASE: Winners of the Quarter Finals
         */
        sfTeams = [
            getWinner(qfFixtures[0]), getWinner(qfFixtures[1]), // SF1 (Winners QF1 & QF2)
            getWinner(qfFixtures[2]), getWinner(qfFixtures[3])  // SF2 (Winners QF3 & QF4)
        ];
    }

    const sfPairs = [[0, 1], [2, 3]];

    return sfPairs.map((pair, idx) => {
        const team1 = sfTeams[pair[0]];
        const team2 = sfTeams[pair[1]];

        // If teams aren't decided (or standings don't have enough teams), show TBC
        if (!team1 || !team2) {
            return {
                ...(allSFs[idx] || {}),
                matchTitle: "SF",
                homeTeam: "TBC",
                awayTeam: "TBC",
                eventState: "pre",
                matchVenue: "TBD"
            };
        }

        const n1 = normalize(team1);
        const n2 = normalize(team2);

        // 2. Search for existing official fixture
        const match = allSFs.find(sf => {
            const h = normalize(sf.homeTeam);
            const a = normalize(sf.awayTeam);
            return (h === n1 && a === n2) || (h === n2 && a === n1);
        });

        if (match) return match;

        // 3. Fallback: Predictive Seeding (Higher rank hosts)
        const getRank = (name: string) => {
            const n = normalize(name);
            const s = targetStandingsArray.find(st => normalize(st.teamName) === n);
            return s ? Number(s.ranking) : 99;
        };

        const rank1 = getRank(team1);
        const rank2 = getRank(team2);

        const [home, away] = rank1 <= rank2 ? [team1, team2] : [team2, team1];

        return {
            ...(allSFs[idx] || {}),
            matchTitle: "SF",
            homeTeam: home,
            awayTeam: away,
            eventState: "pre"
        };
    });
};


export const getFinalFixture = (knockoutFixturesArray: MatchInfo[], sfFixtures: MatchInfo[]) => {
    const finalMatch = knockoutFixturesArray.find(item => item.matchTitle === "Final");
    
    const getWinner = (m: MatchInfo | undefined) => {
        if (!m || m.eventState !== "post") return null;
        return Number(m.homeScore) > Number(m.awayScore) ? m.homeTeam : m.awayTeam;
    };

    const winner1 = getWinner(sfFixtures[0]);
    const winner2 = getWinner(sfFixtures[1]);

    if (!winner1 || !winner2) {
        return finalMatch || { matchTitle: "Final", homeTeam: "TBC", awayTeam: "TBC" };
    }

    // In many leagues, "Home" in the final is just for kit colors/admin 
    // but you can still apply the higher-seed-is-home rule if you want.
    return {
        ...finalMatch,
        homeTeam: winner1,
        awayTeam: winner2
    };
};
