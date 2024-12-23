import { getRugbyVizLeagueCode } from "./helpers";


export const fetchRugbyVizKnockoutFixtures = async (thisLeagueName: string, seasonYear: string) => {

    const rugbyVizLeagueCode = getRugbyVizLeagueCode(thisLeagueName);

    // northern hemisphere season year    
    function getCurrentRugbySeason(date: Date): string {
        const month: number = date.getMonth() + 1;
        const year: number = date.getFullYear();

        return month >= 8
            ? `${year}`
            : `${year - 1}`;
    }

    //console.info(getCurrentRugbySeason(selectedDate))
    const targetSeasonYear = Number(seasonYear) - 1

    if(rugbyVizLeagueCode !== undefined)
    {
        const apiStringAll = 'https://rugby-union-feeds.incrowdsports.com/v1/matches?provider=rugbyviz&compId='+rugbyVizLeagueCode+'&images=true&season='+targetSeasonYear.toString()+'01'
        console.info(apiStringAll)
        const allFixtureData = await fetch(apiStringAll,).then((res) => res.json())


        const allFixturesArray = getKnockoutFixturesAllRugViz(allFixtureData, thisLeagueName)
        return allFixturesArray;
    }

    return []
}

export const getKnockoutFixturesAllRugViz = (seasonAllMatches: any, leagueName: string) => 
{
    const gamesCount = seasonAllMatches.data.length;
    console.info(gamesCount)

    var leagueArray = []

    for (let index = 0; index < gamesCount; index++) {
        
        const roundTypeID = seasonAllMatches.data[index].roundTypeId;

        // knockout games only
        if(roundTypeID == 2)
        {
            const matchDate = new Date(seasonAllMatches.data[index].date);
            const homeTeamName = seasonAllMatches.data[index].homeTeam.name;
            const awayTeamName = seasonAllMatches.data[index].awayTeam.name;
            const homeTeamScore = seasonAllMatches.data[index].homeTeam.score;
            const awayTeamScore = seasonAllMatches.data[index].awayTeam.score;
            const matchVenue = seasonAllMatches.data[index].venue.name;
            const matchID = seasonAllMatches.data[index].id;
            const compName = seasonAllMatches.data[index].compName;

            const sourceMatchTitle = seasonAllMatches.data[index].title;

            var matchTitle = ''

            if(leagueName == 'prem')
            {
                matchTitle = sourceMatchTitle == 'SF' ? 'GF' : 'SF'
            }
            else if(leagueName == 'championsCup' || leagueName == 'challengeCup')
            {
                if(sourceMatchTitle == 'TF')
                {
                    matchTitle = 'GF'
                }
                else
                {
                    matchTitle = sourceMatchTitle;
                }
            }
            else
            {
                matchTitle =  sourceMatchTitle
            }

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
                matchTitle: matchTitle,
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

    return (
        leagueArray
    )

}