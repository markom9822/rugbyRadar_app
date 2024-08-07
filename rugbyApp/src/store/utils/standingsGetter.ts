

export const getAllStandingsData = (seasonStandings: any, pooledLeague: boolean) => {

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
            };

            newArray.push(newRankingInfo)
        }
    }

    return(
        newArray
    )

}