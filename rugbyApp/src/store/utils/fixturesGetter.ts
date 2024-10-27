import { FixturesSection } from "@/app/(tabs)/fixtures";
import { getLeagueCodeFromDisplayName, getRugbyVizLeagueCode, getRugbyVizLeagueDisplayNameFromCode, getWorldRugbyAPILeagueCode, getWorldRugbyAPILeagueDisplayNameFromCode, isLeagueInRugbyViz, isLeagueInWorldRugbyAPI } from "./helpers";

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

export const getFixturesForAll = (todaysAllMatches: any) => {

    const todaysScores = todaysAllMatches.scores;

    var sections: FixturesSection[] = []

    for (let index = 0; index < todaysScores.length; index++) {

        var leagueArray = []

        const leagueName = todaysScores[index].leagues[0].name;
        const leagueID = todaysScores[index].leagues[0].slug;

        // check if in ESPN API
        const apiCheck = getLeagueCodeFromDisplayName(leagueName) !== undefined && !isLeagueInRugbyViz(leagueName) && !isLeagueInWorldRugbyAPI(leagueName)

        if (apiCheck) {
            console.info(leagueName)

            const leagueEvents = todaysScores[index].events;

            for (let eventIndex = 0; eventIndex < leagueEvents.length; eventIndex++) {

                console.info(leagueEvents[eventIndex].name)
                console.info(leagueEvents[eventIndex].competitions[0].venue.fullName)
                
                const matchTitle = leagueEvents[eventIndex].name;
                const matchVenue = leagueEvents[eventIndex].competitions[0].venue.fullName;
                const eventID = leagueEvents[eventIndex].id;
                const matchID = eventID + leagueID;
                const eventState = leagueEvents[eventIndex].status.type.state;
                const stateDetail = leagueEvents[eventIndex].status.type.shortDetail;

                const homeTeamName = leagueEvents[eventIndex].competitions[0].competitors[0].team.name;
                const homeTeamScore = leagueEvents[eventIndex].competitions[0].competitors[0].score;
                const awayTeamName = leagueEvents[eventIndex].competitions[0].competitors[1].team.name;
                const awayTeamScore = leagueEvents[eventIndex].competitions[0].competitors[1].score;

                console.info(homeTeamScore)
                console.info(awayTeamScore)

                const matchDate = new Date(leagueEvents[eventIndex].date)

                var eventTime = '0';
                if(leagueEvents[eventIndex].competitions[0].details != undefined)
                {
                    const detailsLength = Number(leagueEvents[eventIndex].competitions[0].details.length);
                    if(detailsLength > 0)
                    {
                        eventTime = leagueEvents[eventIndex].competitions[0].details[detailsLength - 1].clock.displayValue;
                    }
                }
            
                let newMatchInfo = {
                    homeTeam: homeTeamName,
                    awayTeam: awayTeamName,
                    homeScore: homeTeamScore,
                    awayScore: awayTeamScore,
                    matchDate: matchDate,
                    matchTitle: matchTitle,
                    matchVenue: matchVenue,
                    matchLeague: leagueName,
                    matchID: matchID,
                    eventState: eventState,
                    stateDetail: stateDetail,
                    eventTime: eventTime,
                };

                leagueArray.push(newMatchInfo)
            }

            const sortedLeagueArray = leagueArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())

            let leagueMatchesInfo = {
                title: leagueName,
                data: sortedLeagueArray
            }
            
            sections.push(leagueMatchesInfo)
        }
    }

    console.info(sections)

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
            const homeTeamName = seasonAllMatches.data[index].homeTeam.shortName;
            const awayTeamName = seasonAllMatches.data[index].awayTeam.shortName;
            const homeTeamScore = seasonAllMatches.data[index].homeTeam.score;
            const awayTeamScore = seasonAllMatches.data[index].awayTeam.score;
            const matchVenue = seasonAllMatches.data[index].venue.name;
            const matchID = seasonAllMatches.data[index].id;
            const compName = seasonAllMatches.data[index].compName;

            const eventTime = seasonAllMatches.data[index].minute;

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
            };

            leagueArray.push(newMatchInfo)
        }
        
    }

    console.info(leagueArray)

    if (leagueArray.length > 0) {
        const sortedLeagueArray = leagueArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())
        let leagueMatchesInfo = {
            title: leagueDisplayName,
            data: sortedLeagueArray
        }

        sections.push(leagueMatchesInfo)
    }

    return (
        sections
    )
}

export const fetchRugbyVizData = async (thisLeagueName: string, selectedDate: Date) => {

    const rugbyVizLeagueCode = getRugbyVizLeagueCode(thisLeagueName);
    // use separate API for club leagues
    if(rugbyVizLeagueCode !== undefined)
    {
        const apiStringAll = 'https://rugby-union-feeds.incrowdsports.com/v1/matches?provider=rugbyviz&compId='+rugbyVizLeagueCode+'&images=true&season='+selectedDate.getFullYear()+'01'
        const seasonsAllMatches = await fetch( apiStringAll, {
            headers: {
                'Cache-control': 'no-cache'
            }
        }
        ).then((res) => res.json())

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
    // use separate API for Autumn Nations
    if(worldRugbyAPILeagueCode !== undefined)
    {
        const apiStringAll = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match?states=U,UP,L,CC,C&pageSize=100&sort=asc&events='+worldRugbyAPILeagueCode+'&startDate='+startDate+'&endDate='+endDate
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

    for (let index = 0; index < gamesCount; index++) {
        
        // need to get date
        const matchDate = new Date(seasonAllMatches.content[index].time.millis);
        const currentYear = new Date().getFullYear()

        if(new Date(matchDate).setHours(0,0,0,0) === selectedDate.setHours(0,0,0,0))
        {
            const homeTeamName = seasonAllMatches.content[index].teams[0].name;
            const awayTeamName = seasonAllMatches.content[index].teams[1].name;
            const homeTeamScore = seasonAllMatches.content[index].scores[0];
            const awayTeamScore = seasonAllMatches.content[index].scores[1];
            const matchVenue = seasonAllMatches.content[index].venue.name;
            const matchID = seasonAllMatches.content[index].matchId;
            const compName = (seasonAllMatches.content[index].competition).replace(" " + currentYear, "");

            // time in seconds need to convert to mins
            const eventTime = seasonAllMatches.content[index].clock.secs;

            var eventState;
            const matchStatus = seasonAllMatches.content[index].status;
            if(matchStatus === "C")
            {
                eventState = "post"
            }
            else if(matchStatus === "U")
            {
                eventState = "pre"
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
                eventTime: eventTime,
            };

            leagueArray.push(newMatchInfo)
        }
        
    }

    console.info(leagueArray)

    if (leagueArray.length > 0) {
        const sortedLeagueArray = leagueArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())
        let leagueMatchesInfo = {
            title: leagueDisplayName,
            data: sortedLeagueArray
        }

        sections.push(leagueMatchesInfo)
    }

    return (
        sections
    )
}