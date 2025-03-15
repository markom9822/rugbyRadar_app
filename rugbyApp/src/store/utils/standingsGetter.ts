import { getChampsCupShortNameFromFullName } from "../ChampionsCupRugbyTeamsDatabase";
import { getPremShortNameFromFullName } from "../PremiershipRubyTeamsDatabase";
import { getURCShortNameFromFullName } from "../URCRugbyTeamsDatabase";


export const getAllStandingsData = (seasonStandings: any) => {

    var newArray = [];

    const standingsChildren = seasonStandings.children.length
    console.info(`Children count: ${standingsChildren}`)


    for (let j = 0; j < seasonStandings.children.length; j++) {

        const standingsCount = seasonStandings.children[j].standings.entries.length;

        for (let index = 0; index < standingsCount; index++) {

            const teamPool = seasonStandings.children[j].name;
            if (index == 0 && standingsChildren > 1) {
                let headerRankingInfo = {
                    isHeader: true,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamWins: '0',
                    teamDraws: '0',
                    teamLosses: '0',
                    teamPD: '0',
                    teamPoints: '0',
                    ranking: index,
                    isLastItem: false,
                    isEndOfList: false,
                    isPlayoffCutoff: false,
                };

                newArray.push(headerRankingInfo)
            }

            const teamName = seasonStandings.children[j].standings.entries[index].team.displayName;
            const teamGP = seasonStandings.children[j].standings.entries[index].stats[7].value;
            const teamWins = seasonStandings.children[j].standings.entries[index].stats[18].value;
            const teamDraws = seasonStandings.children[j].standings.entries[index].stats[16].value;
            const teamLosses = seasonStandings.children[j].standings.entries[index].stats[9].value;
            const teamPD = seasonStandings.children[j].standings.entries[index].stats[11].value;
            const teamPoints = seasonStandings.children[j].standings.entries[index].stats[12].value;


            let newRankingInfo = {
                isHeader: false,
                teamPool: teamPool,
                teamName: teamName,
                teamGP: teamGP,
                teamWins: teamWins,
                teamDraws: teamDraws,
                teamLosses: teamLosses,
                teamPD: teamPD,
                teamPoints: teamPoints,
                ranking: index,
                isLastItem: index == standingsCount - 1,
                isEndOfList: (index == standingsCount - 1) && (j == seasonStandings.children.length - 1),
                isPlayoffCutoff: false,
            };

            newArray.push(newRankingInfo)
        }
    }

    return (
        newArray
    )

}

export const getAllStandingsDataRugbyViz = (seasonStandings: any, leagueName: string, playoffCutoffIndex: number | undefined) => {

    var newArray = [];

    const standingsChildren = seasonStandings.data.groups

    for (let j = 0; j < standingsChildren.length; j++) {

        const teamsCount = standingsChildren[j].teams.length

        for (let index = 0; index < teamsCount; index++) {

            const teamPool = standingsChildren[j].name;
            if (index == 0 && standingsChildren.length > 1) {
                let headerRankingInfo = {
                    isHeader: true,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamWins: '0',
                    teamDraws: '0',
                    teamLosses: '0',
                    teamPD: '0',
                    teamPoints: '0',
                    ranking: index,
                    isLastItem: false,
                    isEndOfList: false,
                    isPlayoffCutoff: false,
                };

                newArray.push(headerRankingInfo)
            }

            // playoff cutoff
            if (index === playoffCutoffIndex) {
                let playoffsCutoffRankingInfo = {
                    isHeader: false,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamWins: '0',
                    teamDraws: '0',
                    teamLosses: '0',
                    teamPD: '0',
                    teamPoints: '0',
                    ranking: index,
                    isLastItem: false,
                    isEndOfList: false,
                    isPlayoffCutoff: true,
                };

                newArray.push(playoffsCutoffRankingInfo)
            }

            var teamName = '';

            if (leagueName === 'urc') {
                teamName = getURCShortNameFromFullName(standingsChildren[j].teams[index].name);
            }
            else if (leagueName === 'prem') {
                teamName = getPremShortNameFromFullName(standingsChildren[j].teams[index].name);
            }
            else if (leagueName === 'championsCup' || leagueName === 'challengeCup') {
                teamName = getChampsCupShortNameFromFullName(standingsChildren[j].teams[index].name);
            }

            const teamGP = standingsChildren[j].teams[index].played;
            const teamWins = standingsChildren[j].teams[index].won
            const teamDraws = standingsChildren[j].teams[index].drawn;
            const teamLosses = standingsChildren[j].teams[index].lost;
            const teamPD = standingsChildren[j].teams[index].pointsDiff;
            const teamPoints = standingsChildren[j].teams[index].points;


            let newRankingInfo = {
                isHeader: false,
                teamPool: teamPool,
                teamName: teamName,
                teamGP: teamGP,
                teamWins: teamWins,
                teamDraws: teamDraws,
                teamLosses: teamLosses,
                teamPD: teamPD,
                teamPoints: teamPoints,
                ranking: index,
                isLastItem: index == teamsCount - 1,
                isEndOfList: (index == teamsCount - 1) && (j == standingsChildren.length - 1),
                isPlayoffCutoff: false,
            };

            newArray.push(newRankingInfo)
        }
    }

    return (
        newArray
    )

}

export const getAllStandingsDataPlanetRugby = (seasonStandings: any, isPooled: boolean, isEndOfList: boolean, playoffCutoffIndex: number | undefined) => {

    var newArray = [];

    function extractPool(text: string): string {
        const match = text.match(/pool\s+[A-Z]/i);
        return match ? match[0] : '';
      }

    const standingsChildren = seasonStandings.data

    for (let j = 0; j < standingsChildren.length; j++) {

        const teamsCount = standingsChildren[j].table.length

        for (let index = 0; index < teamsCount; index++) {

            const teamPool = extractPool(standingsChildren[j].name);


            if (index == 0 && isPooled) {
                let headerRankingInfo = {
                    isHeader: true,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamWins: '0',
                    teamDraws: '0',
                    teamLosses: '0',
                    teamPD: '0',
                    teamPoints: '0',
                    ranking: index,
                    isLastItem: false,
                    isEndOfList: false,
                    isPlayoffCutoff: false,
                };

                newArray.push(headerRankingInfo)
            }

            if (index === playoffCutoffIndex) {
                let headerRankingInfo = {
                    isHeader: false,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamWins: '0',
                    teamDraws: '0',
                    teamLosses: '0',
                    teamPD: '0',
                    teamPoints: '0',
                    ranking: index,
                    isLastItem: false,
                    isEndOfList: false,
                    isPlayoffCutoff: true,
                };

                newArray.push(headerRankingInfo)
            }

            const teamName = standingsChildren[j].table[index].name;

            const teamGP = standingsChildren[j].table[index].played;
            const teamWins = standingsChildren[j].table[index].won
            const teamDraws = standingsChildren[j].table[index].draws;
            const teamLosses = standingsChildren[j].table[index].lost;
            const teamPD = standingsChildren[j].table[index].difference;
            const teamPoints = standingsChildren[j].table[index].points;


            let newRankingInfo = {
                isHeader: false,
                teamPool: teamPool,
                teamName: teamName,
                teamGP: teamGP,
                teamWins: teamWins,
                teamDraws: teamDraws,
                teamLosses: teamLosses,
                teamPD: teamPD,
                teamPoints: teamPoints,
                ranking: index,
                isLastItem: index == teamsCount - 1,
                isEndOfList: isEndOfList && index == teamsCount - 1,
                isPlayoffCutoff: false,
            };

            newArray.push(newRankingInfo)
        }
    }

    return (
        newArray
    )

}


export const getAllPooledStandingsDataPlanetRugby = (seasonStandings: any, poolCodes: string[]) => {

    var newArray = [];

    const standingsChildren = seasonStandings.data

    for (let j = 0; j < standingsChildren.length; j++) {

        const teamsCount = standingsChildren[j].table.length

        for (let index = 0; index < teamsCount; index++) {

            const teamPool = standingsChildren[j].name;
            if (index == 0 && standingsChildren.length > 1) {
                let headerRankingInfo = {
                    isHeader: true,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamWins: '0',
                    teamDraws: '0',
                    teamLosses: '0',
                    teamPD: '0',
                    teamPoints: '0',
                    ranking: index,
                    isLastItem: false,
                    isEndOfList: false,
                };

                newArray.push(headerRankingInfo)
            }

            const teamName = standingsChildren[j].table[index].name;

            const teamGP = standingsChildren[j].table[index].played;
            const teamWins = standingsChildren[j].table[index].won
            const teamDraws = standingsChildren[j].table[index].draws;
            const teamLosses = standingsChildren[j].table[index].lost;
            const teamPD = standingsChildren[j].table[index].difference;
            const teamPoints = standingsChildren[j].table[index].points;


            let newRankingInfo = {
                isHeader: false,
                teamPool: teamPool,
                teamName: teamName,
                teamGP: teamGP,
                teamWins: teamWins,
                teamDraws: teamDraws,
                teamLosses: teamLosses,
                teamPD: teamPD,
                teamPoints: teamPoints,
                ranking: index,
                isLastItem: index == teamsCount - 1,
                isEndOfList: (index == teamsCount - 1) && (j == standingsChildren.length - 1)
            };

            newArray.push(newRankingInfo)
        }
    }

    return (
        newArray
    )

}

export const getAllStandingsDataWorldRugbyAPI = async (seasonMatches: any, leagueName: string) => {
    // Get array of teams in competition
    const teamsArray = getTeamsInCompetition(seasonMatches);
    console.info(teamsArray);

    // Initialize team data with a Map for faster lookups
    const teamDataMap = new Map<string, any>();
    teamsArray.forEach((teamName, index) => {
        teamDataMap.set(teamName, {
            isHeader: false,
            teamPool: '0',
            teamName,
            teamGP: '0',
            teamWins: '0',
            teamDraws: '0',
            teamLosses: '0',
            teamPD: '0',
            teamPoints: '0',
            ranking: index,
            isLastItem: index == teamsArray.length - 1,
            isEndOfList: index == teamsArray.length - 1,
            isPlayoffCutoff: false,
        });
    });

    const seasonLeagueMatches = seasonMatches.content;

    // Fetch all match stats at once if possible
    const matchStatsPromises = seasonLeagueMatches.map(async (match: any) => {
        const apiString = `https://api.wr-rims-prod.pulselive.com/rugby/v3/match/${match.matchId}/stats?language=en`;
        return fetch(apiString).then((res) => res.json());
    });

    const matchStatsResults = await Promise.all(matchStatsPromises);

    for (let i = 0; i < seasonLeagueMatches.length; i++) {
        const match = seasonLeagueMatches[i];
        const matchStats = matchStatsResults[i];

        for (let j = 0; j < 2; j++) {
            const teamName = match.teams[j].name;
            const teamData = teamDataMap.get(teamName);

            if (!teamData) return Array.from(teamDataMap.values());

            const firstIndex = j == 0 ? 0 : 1;
            const secondIndex = j == 0 ? 1 : 0;

            teamData.teamGP = (Number(teamData.teamGP) + 1).toString();
            teamData.teamPD = (Number(teamData.teamPD) + (Number(match.scores[firstIndex]) - Number(match.scores[secondIndex]))).toString();

            const matchTries = matchStats.match.teams[0].name === teamName ? matchStats.teamStats[0].stats.Tries : matchStats.teamStats[1].stats.Tries;

            if (matchTries >= 4) {
                teamData.teamPoints = (Number(teamData.teamPoints) + 1).toString();
            }

            if (match.scores[0] == match.scores[1]) {
                teamData.teamDraws = (Number(teamData.teamDraws) + 1).toString();
                teamData.teamPoints = (Number(teamData.teamPoints) + 2).toString();
            } else if (match.scores[firstIndex] > match.scores[secondIndex]) {
                teamData.teamWins = (Number(teamData.teamWins) + 1).toString();
                teamData.teamPoints = (Number(teamData.teamPoints) + 4).toString();
            } else {
                teamData.teamLosses = (Number(teamData.teamLosses) + 1).toString();
                if (Math.abs(match.scores[0] - match.scores[1]) <= 7) {
                    teamData.teamPoints = (Number(teamData.teamPoints) + 1).toString();
                }
            }
        }
    }

    // Convert Map values to an array and sort
    let newArray = Array.from(teamDataMap.values());

    function compare(a: any, b: any) {
        if (Number(a.teamPoints) > Number(b.teamPoints)) return -1;
        if (Number(a.teamPoints) < Number(b.teamPoints)) return 1;
        return 0;
    }

    newArray.sort(compare);

    for (let arrayIndex = 0; arrayIndex < newArray.length; arrayIndex++) {
        newArray[arrayIndex].ranking = arrayIndex;
        newArray[arrayIndex].isLastItem = arrayIndex == newArray.length - 1;
        newArray[arrayIndex].isEndOfList = arrayIndex == newArray.length - 1;
    }

    return newArray;
}

export const getTeamsInCompetition = (seasonMatches: any) => {
    function addUniqueToArray<T>(array: T[], element: T): void {
        if (!array.includes(element)) {
            array.push(element);
        }
    }

    var teamArray: string[] = []

    for (let index = 0; index < seasonMatches.content.length; index++) {
        addUniqueToArray(teamArray, seasonMatches.content[index].teams[0].name)
        addUniqueToArray(teamArray, seasonMatches.content[index].teams[1].name)
    }

    return teamArray;
}