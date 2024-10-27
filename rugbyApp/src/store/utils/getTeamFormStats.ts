
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

export const getTeamFormStatsRugbyViz = async (matchStats: any, isHomeTeam: boolean) => {

    var teamFormArray = [];

    const formGames = isHomeTeam ? matchStats.data.homeTeam.form : matchStats.data.awayTeam.form;
    const gamesLength = formGames.length;
    const currentTeam = isHomeTeam ? matchStats.data.homeTeam.shortName : matchStats.data.awayTeam.shortName;
    const currentMatchDate = new Date(matchStats.data.date);

    for (let index = 0; index < gamesLength; index++) {

        const matchID = formGames[index].matchId;
        const isTeamHome = formGames[index].home;

        const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches/' + matchID + '?provider=rugbyviz';
        const formMatchStats = await fetch(apiString,).then((res) => res.json())

        const matchDate = new Date(formMatchStats.data.date);
        // dont include this match
        if(matchDate.setHours(0,0,0,0) === currentMatchDate.setHours(0,0,0,0)) continue;

        const homeTeamName = formMatchStats.data.homeTeam.shortName;
        const awayTeamName = formMatchStats.data.awayTeam.shortName;

        const homeTeamScore = formMatchStats.data.homeTeam.score;
        const awayTeamScore = formMatchStats.data.awayTeam.score;

        const newArray = {
                currentTeam: currentTeam,
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                matchDate: matchDate.toString(),
        };

        teamFormArray.push(newArray)
    }


    const sortedTeamFormArray = teamFormArray.sort((a, b) =>  new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime())

    return(
        sortedTeamFormArray
    )
}


export const getTeamFormStatsWorldRugbyAPI = (matchStats: any, isHomeTeam: boolean) => {

    var teamFormArray = [];

    const newArray = {
        currentTeam: '',
        homeTeamName: '',
        awayTeamName: '',
        homeTeamScore: '',
        awayTeamScore: '',
        matchDate: '',
    };

    teamFormArray.push(newArray)

    
    return(
        teamFormArray
    )
}