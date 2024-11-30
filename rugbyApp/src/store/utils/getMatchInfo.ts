import { getPlanetRugbyMatchIDFromDetails } from "./helpers";

export type MatchInfo = {
    statsAvailable: boolean,
    homeTeamName: string,
    awayTeamName: string,
    homeTeamPossession: string,
    awayTeamPossession: string,
    homeTeamTries: string,
    awayTeamTries: string,
    homeTeamTackles: string,
    awayTeamTackles: string,
    homeTeamMetres: string,
    awayTeamMetres: string,
    homeTeamScore: string,
    awayTeamScore: string,

    matchDate: Date,
    matchStatus: string,
    matchTimeClock: string,
    matchVenue: string,
    matchAttendance: string,
    matchBroadcasters: string[]
}

export const getMatchInfo = (matchDetails: any):MatchInfo[] => {

    const homeTeamName = matchDetails.boxscore.teams[0].team.displayName;
    const awayTeamName = matchDetails.boxscore.teams[1].team.displayName;
    const matchVenue = matchDetails.gameInfo.venue.fullName;
    const matchAttendance = matchDetails.gameInfo.attendance;

    if(matchDetails.boxscore.teams[0].statistics.length == 0 || matchDetails.boxscore.teams[1].statistics.length == 0 )
    {
        const blankArray = [
            {
                statsAvailable: false,
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                homeTeamPossession: '0',
                awayTeamPossession: '0',
                homeTeamTries: '-',
                awayTeamTries: '-',
                homeTeamTackles: '-',
                awayTeamTackles: '-',
                homeTeamMetres: '-',
                awayTeamMetres: '-',
                homeTeamScore: '-',
                awayTeamScore: '-',
    
                matchDate: new Date(),
                matchStatus: '-',
                matchTimeClock: '-',
                matchVenue: matchVenue,
                matchAttendance: matchAttendance,
                matchBroadcasters: []
            }
        ];

        return blankArray

    }

    const homeTeamPossession = matchDetails.boxscore.teams[0].statistics[0].stats[20].value;
    const awayTeamPossession = matchDetails.boxscore.teams[1].statistics[0].stats[20].value;

    const homeTeamTries = matchDetails.boxscore.teams[0].statistics[0].stats[31].value
    const awayTeamTries = matchDetails.boxscore.teams[1].statistics[0].stats[31].value

    const homeTeamTackles = matchDetails.boxscore.teams[0].statistics[0].stats[27].value
    const awayTeamTackles = matchDetails.boxscore.teams[1].statistics[0].stats[27].value

    const homeTeamMetres = matchDetails.boxscore.teams[0].statistics[0].stats[10].value
    const awayTeamMetres = matchDetails.boxscore.teams[1].statistics[0].stats[10].value


    const newArray = [
        {
            statsAvailable: true,
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            homeTeamPossession: homeTeamPossession,
            awayTeamPossession: awayTeamPossession,
            homeTeamTries: homeTeamTries,
            awayTeamTries: awayTeamTries,
            homeTeamTackles: homeTeamTackles,
            awayTeamTackles: awayTeamTackles,
            homeTeamMetres: homeTeamMetres,
            awayTeamMetres: awayTeamMetres,
            homeTeamScore: '-',
            awayTeamScore: '-',

            matchDate: new Date(),
            matchStatus: '-',
            matchTimeClock: '-',
            matchVenue: matchVenue,
            matchAttendance: matchAttendance,
            matchBroadcasters: []
        
        }
    ];

    return(
        newArray
    )
}

export const handleGetMatchStat = (stat: any) => {

    if(stat == null)
    {
        return '-'
    }
    else
    {
        return stat
    }


}

export const getMatchInfoRugbyViz = (matchDetails: any):MatchInfo[] => {

    const homeTeamName = matchDetails.data.homeTeam.name;
    const awayTeamName = matchDetails.data.awayTeam.name;
    const matchVenue = matchDetails.data.venue.name;
    const matchAttendance = matchDetails.data.attendance;
    const matchBroadcasters = matchDetails.data.broadcasters;
    const matchDate = new Date(matchDetails.data.date);

    const homeTeamScore = matchDetails.data.homeTeam.score;
    const awayTeamScore = matchDetails.data.awayTeam.score;

    const homeTeamPossession = handleGetMatchStat(matchDetails.data.homeTeam.stats?.possession);
    const awayTeamPossession = handleGetMatchStat(matchDetails.data.awayTeam.stats?.possession);

    const homeTeamTries = handleGetMatchStat(matchDetails.data.homeTeam.stats?.tries);
    const awayTeamTries = handleGetMatchStat(matchDetails.data.awayTeam.stats?.tries);

    const homeTeamTackles = handleGetMatchStat(matchDetails.data.homeTeam.stats?.tackles);
    const awayTeamTackles = handleGetMatchStat(matchDetails.data.awayTeam.stats?.tackles);

    const homeTeamMetres = handleGetMatchStat(matchDetails.data.homeTeam.stats?.metres);
    const awayTeamMetres = handleGetMatchStat(matchDetails.data.awayTeam.stats?.metres);

    var eventState;
    const matchStatus = matchDetails.data.status;
    if (matchStatus === "result") {
        eventState = "post"
    }
    else if (matchStatus === "fixture") {
        eventState = "pre"
    }
    else {
        eventState = "ongoing"
    }

    const statsAvailable = matchDetails.data.homeTeam.stats !== null && matchDetails.data.awayTeam.stats !== null && eventState !== "pre";

    const newArray = [
        {
            statsAvailable: statsAvailable,
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            homeTeamPossession: homeTeamPossession,
            awayTeamPossession: awayTeamPossession,
            homeTeamTries: homeTeamTries,
            awayTeamTries: awayTeamTries,
            homeTeamTackles: homeTeamTackles,
            awayTeamTackles: awayTeamTackles,
            homeTeamMetres: homeTeamMetres,
            awayTeamMetres: awayTeamMetres,
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore,

            matchDate: matchDate,
            matchStatus: eventState,
            matchTimeClock: '-',
            matchVenue: matchVenue,
            matchAttendance: matchAttendance,
            matchBroadcasters: matchBroadcasters,
        }
    ];

    return(
        newArray
    )
}

export const getMatchInfoWorldRugbyAPI = async (matchDetails: any): Promise<MatchInfo[]> => {

    const homeTeamName = matchDetails.match.teams[0].name;
    const awayTeamName = matchDetails.match.teams[1].name;
    const matchVenue = matchDetails.match.venue.name;
    const matchAttendance = matchDetails.match.attendance;
    const matchDate = new Date(matchDetails.match.time.millis);
    const homeTeamScore = matchDetails.match.scores[0];
    const awayTeamScore = matchDetails.match.scores[1];
    const matchStatus = matchDetails.match.status;

    var eventState;
    if (matchStatus === "C" || matchStatus === "LFT") {
        eventState = "post"
    }
    else if (matchStatus === "U") {
        eventState = "pre"
    }
    else if (matchStatus === "LHT") {
        eventState = "halfTime"
    }
    else {
        eventState = "ongoing"
    }

    // time in seconds need to convert to mins
    const eventTimeSeconds = Number(matchDetails.match.clock.secs);
    const eventTime = Math.floor(eventTimeSeconds/60);

    const homeTeamPossession = handleGetMatchStat(matchDetails.teamStats[0].stats?.Possession);
    const awayTeamPossession = handleGetMatchStat(matchDetails.teamStats[1].stats?.Possession);

    const homeTeamTries = handleGetMatchStat(matchDetails.teamStats[0].stats?.Tries);
    const awayTeamTries = handleGetMatchStat(matchDetails.teamStats[1].stats?.Tries);

    const homeTeamTackles = handleGetMatchStat(matchDetails.teamStats[0].stats?.Tackles);
    const awayTeamTackles = handleGetMatchStat(matchDetails.teamStats[1].stats?.Tackles);

    const homeTeamMetres = handleGetMatchStat(matchDetails.teamStats[0].stats?.Metres);
    const awayTeamMetres = handleGetMatchStat(matchDetails.teamStats[1].stats?.Metres);

    const statsAvailable = Object.keys(matchDetails.teamStats[0].stats).length !== 0 &&  Object.keys(matchDetails.teamStats[1].stats).length !== 0;

    var matchBroadcasters = []

    // get broadcasters from planet rugby
    const planetRugbyMatchID = await getPlanetRugbyMatchIDFromDetails(matchDate, homeTeamName, awayTeamName);

    if (planetRugbyMatchID !== null) {
        const apiPlanetRugbyString = 'https://rugbylivecenter.yormedia.com/api/match-overview/' + planetRugbyMatchID;
        const matchPlanetRugbyOverview = await fetch(apiPlanetRugbyString,).then((res) => res.json())
        const broadcastersString = matchPlanetRugbyOverview.data.match.channel_name;

        if (broadcastersString !== null) {
            matchBroadcasters = broadcastersString.split(',')
        }
    }

    const newArray = [
        {
            statsAvailable: statsAvailable,
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            homeTeamPossession: homeTeamPossession,
            awayTeamPossession: awayTeamPossession,
            homeTeamTries: homeTeamTries,
            awayTeamTries: awayTeamTries,
            homeTeamTackles: homeTeamTackles,
            awayTeamTackles: awayTeamTackles,
            homeTeamMetres: homeTeamMetres,
            awayTeamMetres: awayTeamMetres,
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore,

            matchDate: matchDate,
            matchStatus: eventState,
            matchTimeClock: eventTime.toString(),
            matchVenue: matchVenue,
            matchAttendance: matchAttendance,
            matchBroadcasters: matchBroadcasters,
        }
    ];

    return(
        newArray
    )
}

export const getMatchInfoPlanetRugbyAPI = (matchDetails: any): MatchInfo[] => {

    const [homeTeamName, awayTeamName] = matchDetails.data.matchDetails.teams.split(';');
    
    const matchVenue = matchDetails.data.match.venue_name;
    const matchAttendance = matchDetails.data.match.attendance;
    const matchDate = new Date(matchDetails.data.match.datetime);

    var eventState;
    var homeScore;
    var awayScore;

    const matchStatus = matchDetails.data.matchDetails.status;

    if (matchStatus === "Finished") {
        homeScore = matchDetails.data.matchDetails.ft.split('-')[0];
        awayScore = matchDetails.data.matchDetails.ft.split('-')[1];
        eventState = "post"
    }
    else if (matchStatus === "KO") {
        eventState = "pre"
    }
    else {
        homeScore = matchDetails.data.matchDetails.cfs.split('-')[0];
        awayScore = matchDetails.data.matchDetails.cfs.split('-')[1];
        eventState = "ongoing"
    }

    var matchBroadcasters = []
    const broadcastersString = matchDetails.data.match.channel_name;

    if (broadcastersString !== null) {
        matchBroadcasters = broadcastersString.split(',')
    }

    const homeTeamPossession = '-'
    const awayTeamPossession = '-'

    const homeTeamTries = '-'
    const awayTeamTries = '-'

    const homeTeamTackles = '-'
    const awayTeamTackles = '-'

    const homeTeamMetres = '-'
    const awayTeamMetres = '-'


    const newArray = [
        {
            statsAvailable: false,
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            homeTeamPossession: homeTeamPossession,
            awayTeamPossession: awayTeamPossession,
            homeTeamTries: homeTeamTries,
            awayTeamTries: awayTeamTries,
            homeTeamTackles: homeTeamTackles,
            awayTeamTackles: awayTeamTackles,
            homeTeamMetres: homeTeamMetres,
            awayTeamMetres: awayTeamMetres,
            homeTeamScore: homeScore,
            awayTeamScore: awayScore,

            matchDate: matchDate,
            matchStatus: eventState,
            matchTimeClock: '-',
            matchVenue: matchVenue,
            matchAttendance: matchAttendance,
            matchBroadcasters: matchBroadcasters,
        }
    ];

    return(
        newArray
    )
}