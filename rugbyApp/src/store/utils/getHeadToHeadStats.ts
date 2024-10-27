import { StatsInfo } from "../components/StatsPanel";

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

export const getHeadToHeadStatsRugbyViz = async (matchStats: any) => {

    var headToHeadArray = [];

    const homeTeamID = matchStats.data.homeTeam.id;
    const awayTeamID = matchStats.data.awayTeam.id;
    const compID = matchStats.data.compId;
    const thisMatchDate = new Date(matchStats.data.date);

    const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/head-to-head?compId='+compID+'&team1Id='+homeTeamID+'&team2Id='+awayTeamID;
    const headToHeadStats = await fetch(apiString,).then((res) => res.json())

    const previousMatches = headToHeadStats.data.previousMatches

    for (let index = 0; index < previousMatches.length; index++) {

        const matchDate = new Date(previousMatches[index].date);
        // dont include this match
        if(matchDate.setHours(0,0,0,0) === thisMatchDate.setHours(0,0,0,0)) continue;

        const homeTeamName = previousMatches[index].homeTeam.shortName;
        const awayTeamName = previousMatches[index].awayTeam.shortName;

        const homeTeamScore = previousMatches[index].homeTeam.score;
        const awayTeamScore = previousMatches[index].awayTeam.score;

        const newArray = {
                currentTeam: homeTeamName,
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                matchDate: matchDate.toDateString(),
        };

        headToHeadArray.push(newArray)
    }

    return(
        headToHeadArray
    )
}


export const getHeadToHeadStatsWorldRugbyAPI = (matchStats: any) => {

    var headToHeadArray = [];
    const newArray = {
        currentTeam: '',
        homeTeamName: '',
        awayTeamName: '',
        homeTeamScore: '',
        awayTeamScore: '',
        matchDate: '',
    };

    headToHeadArray.push(newArray)

    return(
        headToHeadArray
    )
}