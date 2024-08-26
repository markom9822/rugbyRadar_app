import { SeasonStatsInfo } from "@/app/(tabs)/(teams)/team/[teamID]";
import { getLeagueCodeFromDisplayName } from "./helpers";


export const getPlayerSeasonStats = async (
    seasonYear: number, teamID: string | string[] | undefined,
     targetLeagueName: string, seasonType: string ) => {

    var playerStatsArray: SeasonStatsInfo[];
    playerStatsArray=[];

    // need to check for season type, northern or southern
    const seasonsArray = [Number(seasonYear) - 1, Number(seasonYear)]
        
    var seasonStartDate = new Date();
    var seasonEndDate = new Date();
    if(seasonType == "north")
    {
        const startMonth = 8;
        const endMonth = 7;
        seasonStartDate = new Date(seasonsArray[0], startMonth, 0)
        seasonEndDate = new Date(seasonsArray[1], endMonth, 0)
    }
    else if (seasonType == "south")
    {
        const startMonth = 0;
        const endMonth = 11;
        seasonStartDate = new Date(seasonsArray[1], startMonth, 0)
        seasonEndDate = new Date(seasonsArray[1], endMonth, 0)
    }

    for (let seasonIndex = 0; seasonIndex < seasonsArray.length; seasonIndex++) {

        // get season match stats for league
        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/scorepanel?contentorigin=espn&dates='+
         seasonsArray[seasonIndex] +'&lang=en&limit=50&region=gb&team=' + teamID + '&tz=Europe/London';
        const teamResults = await fetch(apiString,).then((res) => res.json())
        const leagueID = getLeagueCodeFromDisplayName(targetLeagueName);
        
        for (let index = 0; index < teamResults.scores.length; index++) {
    
            const leagueName = teamResults.scores[index].leagues[0].name;
    
            if(leagueName == targetLeagueName)
            {
                for (let eventIndex = 0; eventIndex < teamResults.scores[index].events.length; eventIndex++) {
    
                    const eventID = teamResults.scores[index].events[eventIndex].id;
                    const eventDate = teamResults.scores[index].events[eventIndex].date;

                    // need to check event date
                    if (new Date(eventDate) < seasonStartDate || new Date(eventDate) > seasonEndDate) {
                        // date is outside of this season so skip
                        continue;
                    }
                    console.info(eventID)
                
                    const apiStatsString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/' + leagueID + '/summary?contentorigin=espn&event=' + eventID + '&lang=en&region=gb';
                    const statsResults = await fetch(apiStatsString,).then((res) => res.json())
    
                    if(statsResults.boxscore.players == undefined) continue
    
                    for (let teamIndex = 0; teamIndex < statsResults.boxscore.players.length; teamIndex++) {
    
                        if(statsResults.boxscore.players[teamIndex].team.id == teamID)
                        {
                            const playerCount = statsResults.boxscore.players[teamIndex].statistics[0].athletes.length;
                            for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
    
                                const playerName = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].athlete.displayName;
                                const playerPosition = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].athlete.position.abbreviation;
                                const points = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[16].value;
                                const tries = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[23].value;
                                const tackles = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[20].value;
                                const penaltiesConc = statsResults.boxscore.players[teamIndex].statistics[0].athletes[playerIndex].statistics[0].stats[14].value;
    
                                let newStatsInfo = {
                                    playerName: playerName,
                                    playerPosition: playerPosition,
                                    points: points,
                                    tries: tries,
                                    tackles: tackles,
                                    penaltiesConc: penaltiesConc,
                                    matchCount: 1,
                                };
    
                                let index = playerStatsArray.findIndex(el => el.playerName === playerName);
    
                                // player is not in list - add it in
                                if(index < 0)
                                {
                                    playerStatsArray.push(newStatsInfo);
                                }
                                else
                                {
                                    const prevPoints = playerStatsArray[index].points;
                                    const prevMatchCount = playerStatsArray[index].matchCount;
                                    const prevTries = playerStatsArray[index].tries;
                                    const prevTackles = playerStatsArray[index].tackles;
                                    const prevPenaltiesConc = playerStatsArray[index].penaltiesConc;
    
                                    playerStatsArray[index] = {...playerStatsArray[index],
                                         points: prevPoints + points, tries: prevTries + tries, tackles: prevTackles + tackles,
                                          penaltiesConc: prevPenaltiesConc + penaltiesConc , matchCount: prevMatchCount + 1}
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    console.info(playerStatsArray)

    return(
        playerStatsArray
    )

}