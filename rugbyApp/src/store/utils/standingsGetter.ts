import { getURCShortNameFromFullName } from "../URCRugbyTeamsDatabase";


export const getAllStandingsData = (seasonStandings: any) => {

    var newArray = [];

    const standingsChildren = seasonStandings.children.length
    console.info(`Children count: ${standingsChildren}`)


    for (let j = 0; j < seasonStandings.children.length; j++) {

        const standingsCount = seasonStandings.children[j].standings.entries.length;
        
        for (let index = 0; index < standingsCount; index++) {

            const teamPool = seasonStandings.children[j].name;
            if(index == 0 && standingsChildren > 1)
            {
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
                    isLastItem: index == standingsCount - 1
            };

            newArray.push(newRankingInfo)
        }
    }

    return(
        newArray
    )

}

export const getAllStandingsDataRugbyViz = (seasonStandings: any) => {

    var newArray = [];

    const standingsChildren = seasonStandings.data.groups
    console.info(`Children count: ${standingsChildren}`)


    for (let j = 0; j < standingsChildren.length; j++) {

        const teamsCount = standingsChildren[j].teams.length
        
        for (let index = 0; index < teamsCount; index++) {

            const teamPool = standingsChildren[j].name;
            if(index == 0 && standingsChildren > 1)
            {
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
                };

                newArray.push(headerRankingInfo)
            }

            const teamName = getURCShortNameFromFullName(standingsChildren[j].teams[index].name);
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
                    isLastItem: index == teamsCount - 1
            };

            newArray.push(newRankingInfo)
        }
    }

    return(
        newArray
    )

}