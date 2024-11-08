import { getAnyTeamInfoFromID, getLeagueCodeFromDisplayName } from "./helpers";

export const rugbyVizLeagueCodes = [
    { teamType: 'URC Club', leagueCodes: ['1068', '1008', '1026'],},
    { teamType: 'Prem Club', leagueCodes: ['1011', '1008', '1026'],},
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

            if (gamesData[index].homeTeam.shortName !== teamInfo.displayName && gamesData[index].awayTeam.shortName !== teamInfo.displayName) {
                // not target team
                continue;
            }

            const homeTeamName = gamesData[index].homeTeam.shortName;
            const awayTeamName = gamesData[index].awayTeam.shortName;

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
        if(teamInfo.type === 'URC Club' || teamInfo.type === 'Prem Club')
        {
            const rugVizArray = await getTeamSeasonFixturesRugViz(seasonStartDate, teamInfo)
            return(
                rugVizArray
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