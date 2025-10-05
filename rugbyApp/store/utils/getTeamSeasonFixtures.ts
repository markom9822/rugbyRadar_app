import { getAnyTeamInfoFromID, getLeagueCodeFromDisplayName } from "./helpers";

export const rugbyVizLeagueCodes = [
    { teamType: 'URC Club', leagueCodes: ['1068', '1008', '1026'],},
    { teamType: 'Prem Club', leagueCodes: ['1011', '1008', '1026'] },
    { teamType: 'Top14 Club', leagueCodes: ['1002', '1008', '1026'],
    },
];

export const getTeamSeasonFixturesRugViz = async (seasonStartDate: Date, teamInfo: any) => {

    var teamMatchesArray = [];

    const leagueIDsResult = rugbyVizLeagueCodes.find((element) => element.teamType == teamInfo.type)
    const teamLeagueIDs = leagueIDsResult?.leagueCodes
    if(teamLeagueIDs === undefined) return

    for (let IDIndex = 0; IDIndex < teamLeagueIDs.length; IDIndex++) {

        const rugVizApiString = 'https://rugby-union-feeds.incrowdsports.com/v1/matches?provider=rugbyviz&compId=' + teamLeagueIDs[IDIndex] + '&season=' + seasonStartDate.getFullYear() + '01'
        const teamResultsRugViz = await fetch(rugVizApiString,).then((res) => res.json())

        const gamesData = teamResultsRugViz.data;

        for (let index = 0; index < gamesData.length; index++) {

            const eventDate = gamesData[index].date;

            if (gamesData[index].homeTeam.name.replace(" Rugby", "") !== teamInfo.displayName && gamesData[index].awayTeam.name.replace(" Rugby", "") !== teamInfo.displayName) {
                // not target team
                continue;
            }

            const homeTeamName = gamesData[index].homeTeam.name;
            const awayTeamName = gamesData[index].awayTeam.name;

            const homeTeamScore = gamesData[index].homeTeam.score;
            const awayTeamScore = gamesData[index].awayTeam.score;
            const matchStatus = gamesData[index].status;

            var eventState = ''

            if (matchStatus === "result") {
                eventState = "post"
            }
            else if (matchStatus === "fixture") {
                eventState = "pre"
            }
            else {
                eventState = "ongoing"
            }
            const compName = gamesData[index].compName;

            const newArray = {
                eventDate: eventDate,
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                leagueName: compName,
                eventState: eventState,
            };

            teamMatchesArray.push(newArray)
        }
    }

    console.info(teamMatchesArray)
    const sortedArray = teamMatchesArray.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())

    return (
        sortedArray
    )
}

export const getTeamSeasonFixturesWorldRugbyAPI = async (seasonStartDate: Date, seasonEndDate: Date, teamInfo: any) => {

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function generateMonthlyDates(startDate: Date, endDate: Date): string[] {
        const dates: string[] = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(formatDate(new Date(currentDate)));
            currentDate.setDate(currentDate.getDate() + 15);
        }

        return dates;
    }

    const monthDatesArray = generateMonthlyDates(seasonStartDate, seasonEndDate);

    var teamMatchesArray = [];

    for (let monthIndex = 1; monthIndex < monthDatesArray.length; monthIndex++) {

        var startDate = '';
        if(monthIndex > 1)
        {
            const date = new Date(monthDatesArray[monthIndex - 1]);
            date.setDate(date.getDate() + 1)
            startDate = formatDate(date);
        }
        else
        {
            startDate = monthDatesArray[monthIndex - 1]
        }
        const endDate = monthDatesArray[monthIndex]

        console.info(startDate + " " + endDate)

        const worldRugbyApiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match?states=U,UP,L,CC,C&pageSize=100&sort=asc&' +
            'startDate=' + startDate + '&endDate=' + endDate
        console.info(worldRugbyApiString)

        const teamResultsWorldRugby = await fetch(worldRugbyApiString,).then((res) => res.json())

        const gamesData = teamResultsWorldRugby.content;

        for (let index = 0; index < gamesData.length; index++) {

            const eventDate = new Date(gamesData[index].time.millis);

            if (gamesData[index].teams[0].name.replace(" Rugby", "") !== teamInfo.displayName && gamesData[index].teams[1].name.replace(" Rugby", "") !== teamInfo.displayName) {
                // not target team
                continue;
            }

            if (gamesData[index].sport !== "MRU") {
                // not mens rugby
                continue;
            }

            const homeTeamName = gamesData[index].teams[0].name;
            const awayTeamName = gamesData[index].teams[1].name;

            const homeTeamScore = gamesData[index].scores[0];
            const awayTeamScore = gamesData[index].scores[1];

            var eventState;
            const matchStatus = gamesData[index].status;
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
            const compName = gamesData[index].competition.replace(` ${eventDate.getFullYear()}`, "");

            const newArray = {
                eventDate: eventDate.toString(),
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                homeTeamScore: homeTeamScore,
                awayTeamScore: awayTeamScore,
                leagueName: compName,
                eventState: eventState,
            };

            teamMatchesArray.push(newArray)
        }

    }

    console.info(teamMatchesArray)
    const sortedArray = teamMatchesArray.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())

    const removeDuplicateDates = (array: any[]) =>  {
        const seen = new Set();
        return array.filter(item => {
            const dateStr = item.eventDate
            if (seen.has(dateStr)) {
                return false;
            }
            seen.add(dateStr);
            return true;
        });
    }

    const filteredArray = removeDuplicateDates(sortedArray)

    return (
        filteredArray
    )
}

export const getTeamSeasonFixtures = async (teamID: string | string[] | undefined, seasonYear: string) => {

    if (teamID == undefined) return
    const teamInfo = getAnyTeamInfoFromID(teamID.toString())

    // need to check for season type, northern or southern
    const seasonsArray = [Number(seasonYear) - 1, Number(seasonYear)]

    var seasonStartDate = new Date();
    var seasonEndDate = new Date();
    if (teamInfo.seasonType == "north") {
        const startMonth = 8;
        const endMonth = 7;
        seasonStartDate = new Date(seasonsArray[0], startMonth, 0)
        seasonEndDate = new Date(seasonsArray[1], endMonth, 0)
    }
    else if (teamInfo.seasonType == "south") {
        const startMonth = 0;
        const endMonth = 11;
        seasonStartDate = new Date(seasonsArray[0], startMonth, 0)
        seasonEndDate = new Date(seasonsArray[0], endMonth, 0)
    }

    console.info(seasonStartDate)
    console.info(seasonEndDate)

    var teamMatchesArray = [];

    for (let seasonIndex = 0; seasonIndex < seasonsArray.length; seasonIndex++) {

        // use RugbyViz API
        if (teamInfo.type === 'URC Club' || teamInfo.type === 'Prem Club' || teamInfo.type === 'Top14 Club') {
            const rugVizArray = await getTeamSeasonFixturesRugViz(seasonStartDate, teamInfo)
            return (
                rugVizArray
            )
        }

        // use World Rugby API
        if (teamInfo.type === "International") {

            const worldRugbyArray = await getTeamSeasonFixturesWorldRugbyAPI(seasonStartDate, seasonEndDate, teamInfo)
            return (
                worldRugbyArray
            )
        }

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates=' + seasonsArray[seasonIndex]
            + '&lang=en&limit=50&region=gb&team=' + teamID + '&tz=Europe/London';
        const teamResults = await fetch(apiString,).then((res) => res.json())


        for (let index = 0; index < teamResults.scores.length; index++) {

            const leagueName = teamResults.scores[index].leagues[0].name;

            if (getLeagueCodeFromDisplayName(leagueName) !== undefined) {
                // get events
                console.info(teamResults.scores[index].leagues[0].name)

                for (let eventIndex = 0; eventIndex < teamResults.scores[index].events.length; eventIndex++) {

                    const eventDate = teamResults.scores[index].events[eventIndex].competitions[0].date;

                    if (new Date(eventDate) < seasonStartDate || new Date(eventDate) > seasonEndDate) {
                        // date is outside of this season so skip
                        continue;
                    }

                    const homeTeamName = teamResults.scores[index].events[eventIndex].competitions[0].competitors[0].team.displayName;
                    const awayTeamName = teamResults.scores[index].events[eventIndex].competitions[0].competitors[1].team.displayName;

                    const homeTeamScore = teamResults.scores[index].events[eventIndex].competitions[0].competitors[0].score;
                    const awayTeamScore = teamResults.scores[index].events[eventIndex].competitions[0].competitors[1].score;
                    const eventState = teamResults.scores[index].events[eventIndex].status.type.state;

                    const newArray = {
                        eventDate: eventDate,
                        homeTeamName: homeTeamName,
                        awayTeamName: awayTeamName,
                        homeTeamScore: homeTeamScore,
                        awayTeamScore: awayTeamScore,
                        leagueName: leagueName,
                        eventState: eventState,
                    };

                    teamMatchesArray.push(newArray)
                }

            }
        }
    }

    console.info(teamMatchesArray)

    const sortedArray = teamMatchesArray.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())

    return (
        sortedArray
    )

}

