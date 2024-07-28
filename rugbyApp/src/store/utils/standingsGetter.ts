

export const getAllStandingsData = (seasonStandings: any) => {

    var newArray = [];


    for (let j = 0; j < seasonStandings.children.length; j++) {

        const standingsCount = seasonStandings.children[j].standings.entries.length;
        
        for (let index = 0; index < standingsCount; index++) {

            const teamPool = seasonStandings.children[j].name;
            if(index == 0)
            {
                let headerRankingInfo = {
                    isHeader: true,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamWins: '0',
                };

                newArray.push(headerRankingInfo)

                continue;
            }

            const teamName = seasonStandings.children[j].standings.entries[index].team.displayName;
            const teamGP = seasonStandings.children[j].standings.entries[index].stats[7].value;
            const teamWins = seasonStandings.children[j].standings.entries[index].stats[18].value;

            let newRankingInfo = {
                    isHeader: false,
                    teamPool: teamPool,
                    teamName: teamName,
                    teamGP: teamGP,
                    teamWins: teamWins,
            };

            newArray.push(newRankingInfo)
        }
    }

    return(
        newArray
    )

}