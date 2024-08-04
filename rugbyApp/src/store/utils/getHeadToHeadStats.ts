
export const getHeadToHeadStats = (matchStats: any) => {

    var headToHeadArray = [];

    const gamesLength = matchStats.headToHeadGames[0].events.length;

    for (let index = 0; index < gamesLength; index++) {

        const eventScore = matchStats.headToHeadGames[0].events[index].score;
        const matchDate = matchStats.headToHeadGames[0].events[index].gameDate;

        const mainTeam = matchStats.headToHeadGames[0].team.displayName;
        const mainTeamID = matchStats.headToHeadGames[0].team.id;

        const opponentTeam = matchStats.headToHeadGames[0].events[index].opponent.displayName;
        const opponentID = matchStats.headToHeadGames[0].events[index].opponent.id;

        const homeTeamID = matchStats.headToHeadGames[0].events[index].homeTeamId;
        const homeTeamScore = matchStats.headToHeadGames[0].events[index].homeTeamScore;
        const awayTeamScore = matchStats.headToHeadGames[0].events[index].awayTeamScore;

        var homeTeam;
        var awayTeam;

        if(homeTeamID === mainTeamID)
        {
            homeTeam = mainTeam;
            awayTeam = opponentTeam;
        }
        else
        {
            homeTeam = opponentTeam;
            awayTeam = mainTeam;
        }


        console.info(eventScore)

        const newArray = {
                currentTeam: mainTeam,
                homeTeamName: homeTeam,
                awayTeamName: awayTeam,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                matchDate: matchDate,
        };
    

        headToHeadArray.push(newArray)
    }

    return(
        headToHeadArray
    )
}