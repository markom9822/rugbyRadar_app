import { dateCustomFormatting } from "./helpers";

export const getAllFixturesData = async (selectedDate: Date) => {

        const formattedDate = dateCustomFormatting(selectedDate)

        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates=' + formattedDate + '&lang=en&region=gb&tz=Europe/London'

        const todaysMatches = await fetch( apiString,).then((res) => res.json())
        const todaysEvents = todaysMatches.scores[0].events;

        var newArray = [];

        for (let index = 0; index < todaysEvents.length; index++) {
            console.info(todaysMatches.scores[0].events[index].name)

            const matchTitle = todaysMatches.scores[0].events[index].name;
            const matchType = todaysMatches.scores[0].events[index].season.slug;
            const matchVenue = todaysMatches.scores[0].events[index].competitions[0].venue.fullName;
            const matchID = todaysMatches.scores[0].events[index].id;

            const homeTeamName = todaysMatches.scores[0].events[index].competitions[0].competitors[0].team.name;
            const homeTeamScore = todaysMatches.scores[0].events[index].competitions[0].competitors[0].score;
            const awayTeamName = todaysMatches.scores[0].events[index].competitions[0].competitors[1].team.name;
            const awayTeamScore = todaysMatches.scores[0].events[index].competitions[0].competitors[1].score;

            const matchDate = new Date(todaysMatches.scores[0].events[index].date)
            console.info(todaysMatches.scores[0].events[index].status.type.shortDetail)

            let newMatchInfo = {
                homeTeam: homeTeamName,
                awayTeam: awayTeamName,
                homeScore: homeTeamScore,
                awayScore: awayTeamScore,
                matchDate: matchDate,
                matchTitle: matchTitle,
                matchVenue: matchVenue,
                matchType: matchType,
                matchID: matchID,
             };

            newArray.push(newMatchInfo)
        }

        const sortedArray = newArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())

        return sortedArray;
}