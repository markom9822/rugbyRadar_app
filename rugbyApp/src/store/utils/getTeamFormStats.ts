
export const getTeamFormStats = (matchStats: any, teamIndex: number) => {

    var teamFormArray = [];

    const gamesLength = matchStats.lastFiveGames[teamIndex].events.length;
    const currentTeam = matchStats.lastFiveGames[teamIndex].team.displayName;


    for (let index = 0; index < gamesLength; index++) {

        const eventScore = matchStats.lastFiveGames[teamIndex].events[index].score;
        const matchDate = matchStats.lastFiveGames[teamIndex].events[index].gameDate;

        const mainTeam = matchStats.lastFiveGames[teamIndex].team.displayName;
        const mainTeamID = matchStats.lastFiveGames[teamIndex].team.id;

        const opponentTeam = matchStats.lastFiveGames[teamIndex].events[index].opponent.displayName;
        const opponentID = matchStats.lastFiveGames[teamIndex].events[index].opponent.id;

        const homeTeamID = matchStats.lastFiveGames[teamIndex].events[index].homeTeamId;
        const homeTeamScore = matchStats.lastFiveGames[teamIndex].events[index].homeTeamScore;
        const awayTeamScore = matchStats.lastFiveGames[teamIndex].events[index].awayTeamScore;

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
                currentTeam: currentTeam,
                homeTeamName: homeTeam,
                awayTeamName: awayTeam,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                matchDate: matchDate,
        };
    

        teamFormArray.push(newArray)
    }

    return(
        teamFormArray
    )
}