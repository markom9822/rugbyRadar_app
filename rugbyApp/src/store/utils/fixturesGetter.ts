import { getPlanetRugbyAPILeagueCode, getPlanetRugbyAPILeagueDisplayNameFromCode, getRugbyVizLeagueCode, getRugbyVizLeagueDisplayNameFromCode, getWorldRugbyAPILeagueCode, getWorldRugbyAPILeagueDisplayNameFromCode } from "./helpers";

export const getFixturesForLeague = (todaysMatches: any, currentLeagueCode: string, leagueDisplayName: string) => {

    const todaysEvents = todaysMatches.events;

    var newArray = [];

    for (let index = 0; index < todaysEvents.length; index++) {
        console.info(todaysMatches.events[index].name)

        const matchTitle = todaysMatches.events[index].name;
        const matchVenue = todaysMatches.events[index].competitions[0].venue.fullName;
        const eventID = todaysMatches.events[index].id;
        const matchID = eventID + currentLeagueCode;
        const eventState = todaysMatches.events[index].status.type.state;
        const stateDetail = todaysMatches.events[index].status.type.shortDetail;

        const homeTeamName = todaysMatches.events[index].competitions[0].competitors[0].team.name;
        const homeTeamScore = todaysMatches.events[index].competitions[0].competitors[0].score;
        const awayTeamName = todaysMatches.events[index].competitions[0].competitors[1].team.name;
        const awayTeamScore = todaysMatches.events[index].competitions[0].competitors[1].score;
        const matchDate = new Date(todaysMatches.events[index].date)

        const detailsLength = Number(todaysMatches.events[index].competitions[0].details.length);
        var eventTime = '0';
        if(detailsLength > 0)
        {
            eventTime = todaysMatches.events[index].competitions[0].details[detailsLength - 1].clock.displayValue;
        }

        let newMatchInfo = {
            homeTeam: homeTeamName,
            awayTeam: awayTeamName,
            homeScore: homeTeamScore,
            awayScore: awayTeamScore,
            matchDate: matchDate,
            matchTitle: matchTitle,
            matchVenue: matchVenue,
            matchLeague: leagueDisplayName,
            matchID: matchID,
            eventState: eventState,
            stateDetail: stateDetail,
            eventTime: eventTime,
            isDateHeader: false,
        };

        newArray.push(newMatchInfo)
    }

    const sortedArray = newArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())

    const sections = [
        {
            title: leagueDisplayName,
            data: sortedArray
        }
    ]

    return (
        sections
    )

}

export const getFixturesForAllRugViz = (seasonAllMatches: any, selectedDate: Date, leagueDisplayName: string) => {

    const gamesCount = seasonAllMatches.data.length;
    console.info(gamesCount)

    var sections = []

    var leagueArray = []

    for (let index = 0; index < gamesCount; index++) {
        
        const matchDate = new Date(seasonAllMatches.data[index].date);

        if(new Date(matchDate).setHours(0,0,0,0) === selectedDate.setHours(0,0,0,0))
        {
            const homeTeamName = seasonAllMatches.data[index].homeTeam.name;
            const awayTeamName = seasonAllMatches.data[index].awayTeam.name;
            const homeTeamScore = seasonAllMatches.data[index].homeTeam.score;
            const awayTeamScore = seasonAllMatches.data[index].awayTeam.score;
            const matchVenue = seasonAllMatches.data[index].venue.name;
            const matchID = seasonAllMatches.data[index].id;
            const compName = seasonAllMatches.data[index].compName;

            const eventTime = seasonAllMatches.data[index].minute;

            const homeTeamHalfScore = seasonAllMatches.data[index].homeTeam.halfTimeScore;
            const awayTeamHalfScore = seasonAllMatches.data[index].awayTeam.halfTimeScore;

            var eventState;
            const matchStatus = seasonAllMatches.data[index].status;
            if(matchStatus === "result")
            {
                eventState = "post"
            }
            else if(matchStatus === "fixture")
            {
                eventState = "pre"
            }
            else if(matchStatus === "first half" && homeTeamHalfScore != null && awayTeamHalfScore != null)
            {
                eventState = "halfTime"
            }
            // TODO: add event state for halftime
            else
            {
                eventState = "ongoing"
            }

            let newMatchInfo = {
                homeTeam: homeTeamName,
                awayTeam: awayTeamName,
                homeScore: homeTeamScore,
                awayScore: awayTeamScore,
                matchDate: matchDate,
                matchTitle: '',
                matchVenue: matchVenue,
                matchLeague: compName,
                matchID: matchID,
                eventState: eventState,
                stateDetail: 'FT',
                eventTime: eventTime,
                isDateHeader: false,
            };

            leagueArray.push(newMatchInfo)
        }
        
    }

    console.info(leagueArray)
    const sortedLeagueArray = leagueArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())
    return (
        sortedLeagueArray
    )
}

export const fetchRugbyVizData = async (thisLeagueName: string, selectedDate: Date) => {

    const rugbyVizLeagueCode = getRugbyVizLeagueCode(thisLeagueName);

    // northern hemisphere season year    
    function getCurrentRugbySeason(date: Date): string {
        const month: number = date.getMonth() + 1;
        const year: number = date.getFullYear();

        return month >= 8
            ? `${year}`
            : `${year - 1}`;
    }

    console.info(getCurrentRugbySeason(selectedDate))
    const seasonYear = getCurrentRugbySeason(selectedDate)

    // use separate API for club leagues
    if(rugbyVizLeagueCode !== undefined)
    {
        const apiStringAll = 'https://rugby-union-feeds.incrowdsports.com/v1/matches?provider=rugbyviz&compId='+rugbyVizLeagueCode+'&images=true&season='+seasonYear+'01'
        console.info(apiStringAll)
        const seasonsAllMatches = await fetch( apiStringAll, {
            headers: {
                'Cache-control': 'no-cache'
            }
        }
        ).then((res) => res.json())

        console.info(getRugbyVizLeagueDisplayNameFromCode(rugbyVizLeagueCode))

        const allFixturesArray = getFixturesForAllRugViz(seasonsAllMatches, selectedDate, getRugbyVizLeagueDisplayNameFromCode(rugbyVizLeagueCode) )
        return allFixturesArray;
    }

    return []
}

export const fetchWorldRugbyAPIData = async (thisLeagueName: string, selectedDate: Date) => {

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function addDays(date: Date, days: number): Date {
        const result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }

    const startDate = formatDate(selectedDate);
    const endDate = formatDate(addDays(selectedDate, 1))

    const worldRugbyAPILeagueCode = getWorldRugbyAPILeagueCode(thisLeagueName);
    // use separate API for some matches
    if(worldRugbyAPILeagueCode !== undefined)
    {
        const apiStringAll = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match?states=U,UP,L,CC,C&pageSize=100&sort=asc&startDate='+startDate+'&endDate='+endDate
        const seasonsAllMatches = await fetch( apiStringAll, {
            headers: {
                'Cache-control': 'no-cache'
            }
        }
        ).then((res) => res.json())


        const allFixturesArray = getFixturesForAllWorldRugbyAPI(seasonsAllMatches, selectedDate, getWorldRugbyAPILeagueDisplayNameFromCode(worldRugbyAPILeagueCode) )
        return allFixturesArray;
    }

    return []
}

export const getFixturesForAllWorldRugbyAPI = (seasonAllMatches: any, selectedDate: Date, leagueDisplayName: string) => {

    const gamesCount = seasonAllMatches.content.length;
    console.info(gamesCount)

    var sections = []

    var leagueArray = []

    console.info(leagueDisplayName)

    for (let index = 0; index < gamesCount; index++) {
        
        // need to get date
        const matchDate = new Date(seasonAllMatches.content[index].time.millis);
        const matchYear = matchDate.getFullYear()

        const matchCompetition = seasonAllMatches.content[index].competition.replace(` ${matchYear}`, "");

        if(new Date(matchDate).setHours(0,0,0,0) === selectedDate.setHours(0,0,0,0) && matchCompetition === leagueDisplayName)
        {
            const homeTeamName = seasonAllMatches.content[index].teams[0].name;
            const awayTeamName = seasonAllMatches.content[index].teams[1].name;
            const homeTeamScore = seasonAllMatches.content[index].scores[0];
            const awayTeamScore = seasonAllMatches.content[index].scores[1];
            const matchVenue =  seasonAllMatches.content[index].venue !== null ? seasonAllMatches.content[index].venue.name : "-";
            const matchID = seasonAllMatches.content[index].matchId;
            const compName = (seasonAllMatches.content[index].competition).replace(" " + matchYear, "");

            // time in seconds need to convert to mins
            const eventTimeSeconds = Number(seasonAllMatches.content[index].clock.secs);
            const eventTime = Math.floor(eventTimeSeconds/60);

            var eventState;
            const matchStatus = seasonAllMatches.content[index].status;
            if(matchStatus === "C" || matchStatus === "LFT")
            {
                eventState = "post"
            }
            else if(matchStatus === "U")
            {
                eventState = "pre"
            }
            else if (matchStatus === "LHT")
            {
                eventState = "halfTime"
            }
            else
            {
                eventState = "ongoing"
            }

            let newMatchInfo = {
                homeTeam: homeTeamName,
                awayTeam: awayTeamName,
                homeScore: homeTeamScore,
                awayScore: awayTeamScore,
                matchDate: matchDate,
                matchTitle: '',
                matchVenue: matchVenue,
                matchLeague: compName,
                matchID: matchID,
                eventState: eventState,
                stateDetail: 'FT',
                eventTime: eventTime.toString(),
                isDateHeader: false,
            };

            leagueArray.push(newMatchInfo)
        }
        
    }

    console.info(leagueArray)
    const sortedLeagueArray = leagueArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())

    return (
        sortedLeagueArray
    )
}


export const fetchPlanetRugbyAPIData = async (thisLeagueName: string, selectedDate: Date) => {

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const startDate = formatDate(selectedDate);

    const planetRugbyAPILeagueCode = getPlanetRugbyAPILeagueCode(thisLeagueName);
    // use separate API for some matches
    if(planetRugbyAPILeagueCode !== undefined)
    {
        const apiStringAll = 'https://rugbylivecenter.yormedia.com/api/matches/all/'+startDate+'/1'
        const seasonsAllMatches = await fetch( apiStringAll, {
            headers: {
                'Cache-control': 'no-cache'
            }
        }
        ).then((res) => res.json())

        console.info(getPlanetRugbyAPILeagueDisplayNameFromCode(planetRugbyAPILeagueCode))

        const allFixturesArray = await getFixturesForAllPlanetRugbyAPI(seasonsAllMatches, selectedDate, getPlanetRugbyAPILeagueDisplayNameFromCode(planetRugbyAPILeagueCode) )
        return allFixturesArray;
    }

    return []
}

export const getFixturesForAllPlanetRugbyAPI = async (seasonAllMatches: any, selectedDate: Date, leagueDisplayName: string) => {

    var matchIDs = []

    for (let compIndex = 0; compIndex < seasonAllMatches.data.length; compIndex++) {

        if(seasonAllMatches.data[compIndex].ContestGroupName.replace(" Playoff", "") === leagueDisplayName)
        {
            const matchesArray = seasonAllMatches.data[compIndex].matches;

            for (let matchIndex = 0; matchIndex < matchesArray.length; matchIndex++) 
            {
                matchIDs.push(matchesArray[matchIndex].id)
            }
        } 
    }


    console.info(matchIDs)

    var sections = []

    var leagueArray = []

    for (let index = 0; index < matchIDs.length; index++) {

        // fetch match info
        const apiString = 'https://rugbylivecenter.yormedia.com/api/match-overview/'+ matchIDs[index];
        console.info(apiString)
        const matchInfo = await fetch(apiString,).then((res) => res.json())
        console.info(matchInfo)
        
        // need to get date
        //const simpleFormat = (dateStr: string): string => {
        //    return `${dateStr.replace(' ', 'T')}.000Z`;
        //}

        //const formattedDate = simpleFormat(matchInfo.data.match.datetime);
        //console.info(formattedDate)

        const matchDate = new Date(matchInfo.data.match.datetime);
        const currentYear = new Date().getFullYear()

        if(new Date(matchDate).setHours(0,0,0,0) === selectedDate.setHours(0,0,0,0))
        {
            const [homeTeamName, awayTeamName] = matchInfo.data.matchDetails.teams.split(';');
            
            const matchVenue = matchInfo.data.match.venue_name;
            const matchID = matchInfo.data.match.id;
            const compName = matchInfo.data.match.contest_group_name.replace(" Playoff", "");
            
            const eventTime = matchInfo.data.matchDetails.minutes;
            
            var eventState;
            var homeScore;
            var awayScore;
            const matchStatus = matchInfo.data.matchDetails.status;
            
            if(matchStatus === "Finished")
            {
                homeScore = matchInfo.data.matchDetails.ft.split('-')[0];
                awayScore = matchInfo.data.matchDetails.ft.split('-')[1];

                eventState = "post"
            }
            else if(matchStatus === "KO")
            {
                eventState = "pre"
            }
            else if(eventTime == "HT")
            {
                homeScore = matchInfo.data.matchDetails.ht.split('-')[0];
                awayScore = matchInfo.data.matchDetails.ht.split('-')[1];
                eventState = "halfTime"
            }
            else
            {
                homeScore = matchInfo.data.matchDetails.cfs.split('-')[0];
                awayScore = matchInfo.data.matchDetails.cfs.split('-')[1];
                eventState = "ongoing"
            }

            let newMatchInfo = {
                homeTeam: homeTeamName,
                awayTeam: awayTeamName,
                homeScore: homeScore,
                awayScore: awayScore,
                matchDate: matchDate,
                matchTitle: '',
                matchVenue: matchVenue,
                matchLeague: compName,
                matchID: matchID,
                eventState: eventState,
                stateDetail: 'FT',
                eventTime: eventTime.toString(),
                isDateHeader: false,
            };

            leagueArray.push(newMatchInfo)
        }
        
    }

    console.info(leagueArray)
    const sortedLeagueArray = leagueArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())

    return (
        sortedLeagueArray
    )
}