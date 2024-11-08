
export const getFullMatchStats = (matchStats: any) => {

    const homeTeamName = matchStats.boxscore.teams[0].team.displayName;
    const awayTeamName = matchStats.boxscore.teams[1].team.displayName;

    if (matchStats.boxscore.teams[0].statistics.length == 0 || matchStats.boxscore.teams[1].statistics.length == 0) {
        const blankArray = [
            {
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                homeTeamPossession: '0',
                awayTeamPossession: '0',
                homeTeamTerritory: '0',
                awayTeamTerritory: '0',
                homeTeamTries: '-',
                awayTeamTries: '-',
                homeTeamConversions: '-',
                awayTeamConversions: '-',
                homeTeamPenalties: '-',
                awayTeamPenalties: '-',

                homeTeamTackles: '-',
                awayTeamTackles: '-',
                homeTeamMissedTackles: '-',
                awayTeamMissedTackles: '-',

                homeTeamMetres: '-',
                awayTeamMetres: '-',
                homeTeamPasses: '-',
                awayTeamPasses: '-',
                homeTeamDefendersBeaten: '-',
                awayTeamDefendersBeaten: '-',

                homeTeamScrumsWon: '-',
                awayTeamScrumsWon: '-',
                homeTeamScrumsTotal: '-',
                awayTeamScrumsTotal: '-',
                homeTeamLineoutsWon: '-',
                awayTeamLineoutsWon: '-',
                homeTeamLineoutsTotal: '-',
                awayTeamLineoutsTotal: '-',

                homeTeamPensConceded: '-',
                awayTeamPensConceded: '-',
                homeTeamYellowCards: '-',
                awayTeamYellowCards: '-',
                homeTeamRedCards: '-',
                awayTeamRedCards: '-',

            }
        ];
    
            return blankArray
    
    }
    

    const homeTeamPossession = matchStats.boxscore.teams[0].statistics[0].stats[20].value;
    const awayTeamPossession = matchStats.boxscore.teams[1].statistics[0].stats[20].value;

    const homeTeamTerritory = matchStats.boxscore.teams[0].statistics[0].stats[28].value;
    const awayTeamTerritory = matchStats.boxscore.teams[1].statistics[0].stats[28].value;

    const homeTeamTries = matchStats.boxscore.teams[0].statistics[0].stats[31].value
    const awayTeamTries = matchStats.boxscore.teams[1].statistics[0].stats[31].value

    const homeTeamConversions = matchStats.boxscore.teams[0].statistics[0].stats[1].value
    const awayTeamConversions = matchStats.boxscore.teams[1].statistics[0].stats[1].value

    const homeTeamPenalties = matchStats.boxscore.teams[0].statistics[0].stats[19].value
    const awayTeamPenalties = matchStats.boxscore.teams[1].statistics[0].stats[19].value

    const homeTeamTackles = matchStats.boxscore.teams[0].statistics[0].stats[27].value
    const awayTeamTackles = matchStats.boxscore.teams[1].statistics[0].stats[27].value
    const homeTeamMissedTackles = matchStats.boxscore.teams[0].statistics[0].stats[11].value
    const awayTeamMissedTackles = matchStats.boxscore.teams[1].statistics[0].stats[11].value

    const homeTeamMetres = matchStats.boxscore.teams[0].statistics[0].stats[10].value
    const awayTeamMetres = matchStats.boxscore.teams[1].statistics[0].stats[10].value
    const homeTeamPasses = matchStats.boxscore.teams[0].statistics[0].stats[13].value
    const awayTeamPasses = matchStats.boxscore.teams[1].statistics[0].stats[13].value
    const homeTeamDefendersBeaten = matchStats.boxscore.teams[0].statistics[0].stats[2].value
    const awayTeamDefendersBeaten = matchStats.boxscore.teams[1].statistics[0].stats[2].value

    const homeTeamScrumsWon = matchStats.boxscore.teams[0].statistics[0].stats[26].value
    const awayTeamScrumsWon = matchStats.boxscore.teams[1].statistics[0].stats[26].value
    const homeTeamScrumsTotal = matchStats.boxscore.teams[0].statistics[0].stats[25].value
    const awayTeamScrumsTotal = matchStats.boxscore.teams[1].statistics[0].stats[25].value
    const homeTeamLineoutsWon = matchStats.boxscore.teams[0].statistics[0].stats[6].value
    const awayTeamLineoutsWon = matchStats.boxscore.teams[1].statistics[0].stats[6].value
    const homeTeamLineoutsTotal = matchStats.boxscore.teams[0].statistics[0].stats[30].value
    const awayTeamLineoutsTotal = matchStats.boxscore.teams[1].statistics[0].stats[30].value

    const homeTeamPensConceded = matchStats.boxscore.teams[0].statistics[0].stats[18].value
    const awayTeamPensConceded = matchStats.boxscore.teams[1].statistics[0].stats[18].value
    const homeTeamYellowCards = matchStats.boxscore.teams[0].statistics[0].stats[34].value
    const awayTeamYellowCards = matchStats.boxscore.teams[1].statistics[0].stats[34].value
    const homeTeamRedCards = matchStats.boxscore.teams[0].statistics[0].stats[21].value
    const awayTeamRedCards = matchStats.boxscore.teams[1].statistics[0].stats[21].value

    const newArray = [
        {
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            homeTeamPossession: homeTeamPossession,
            awayTeamPossession: awayTeamPossession,
            homeTeamTerritory: homeTeamTerritory,
            awayTeamTerritory: awayTeamTerritory,
            homeTeamTries: homeTeamTries,
            awayTeamTries: awayTeamTries,
            homeTeamConversions: homeTeamConversions,
            awayTeamConversions: awayTeamConversions,
            homeTeamPenalties: homeTeamPenalties,
            awayTeamPenalties: awayTeamPenalties,

            homeTeamTackles: homeTeamTackles,
            awayTeamTackles: awayTeamTackles,
            homeTeamMissedTackles: homeTeamMissedTackles,
            awayTeamMissedTackles: awayTeamMissedTackles,

            homeTeamMetres: homeTeamMetres,
            awayTeamMetres: awayTeamMetres,
            homeTeamPasses: homeTeamPasses,
            awayTeamPasses: awayTeamPasses,
            homeTeamDefendersBeaten: homeTeamDefendersBeaten,
            awayTeamDefendersBeaten: awayTeamDefendersBeaten,

            homeTeamScrumsWon: homeTeamScrumsWon,
            awayTeamScrumsWon: awayTeamScrumsWon,
            homeTeamScrumsTotal: homeTeamScrumsTotal,
            awayTeamScrumsTotal: awayTeamScrumsTotal,
            homeTeamLineoutsWon: homeTeamLineoutsWon,
            awayTeamLineoutsWon: awayTeamLineoutsWon,
            homeTeamLineoutsTotal: homeTeamLineoutsTotal,
            awayTeamLineoutsTotal: awayTeamLineoutsTotal,

            homeTeamPensConceded: homeTeamPensConceded,
            awayTeamPensConceded: awayTeamPensConceded,
            homeTeamYellowCards: homeTeamYellowCards,
            awayTeamYellowCards: awayTeamYellowCards,
            homeTeamRedCards: homeTeamRedCards,
            awayTeamRedCards: awayTeamRedCards,  
        }
    ];

    return(
        newArray
    )
}

export const getFullMatchStatsRugbyViz = (matchStats: any) => {

    const homeTeamName = matchStats.data.homeTeam.shortName;
    const awayTeamName = matchStats.data.awayTeam.shortName;

    if (matchStats.data.homeTeam.stats == null || matchStats.data.awayTeam.stats == null) {
        const blankArray = [
            {
                statsAvailable: false,
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                homeTeamPossession: '0',
                awayTeamPossession: '0',
                homeTeamTerritory: '0',
                awayTeamTerritory: '0',
                homeTeamTries: '-',
                awayTeamTries: '-',
                homeTeamConversions: '-',
                awayTeamConversions: '-',
                homeTeamPenalties: '-',
                awayTeamPenalties: '-',

                homeTeamTackles: '-',
                awayTeamTackles: '-',
                homeTeamMissedTackles: '-',
                awayTeamMissedTackles: '-',

                homeTeamMetres: '-',
                awayTeamMetres: '-',
                homeTeamPasses: '-',
                awayTeamPasses: '-',
                homeTeamDefendersBeaten: '-',
                awayTeamDefendersBeaten: '-',

                homeTeamScrumsWon: '-',
                awayTeamScrumsWon: '-',
                homeTeamScrumsTotal: '-',
                awayTeamScrumsTotal: '-',
                homeTeamLineoutsWon: '-',
                awayTeamLineoutsWon: '-',
                homeTeamLineoutsTotal: '-',
                awayTeamLineoutsTotal: '-',

                homeTeamPensConceded: '-',
                awayTeamPensConceded: '-',
                homeTeamYellowCards: '-',
                awayTeamYellowCards: '-',
                homeTeamRedCards: '-',
                awayTeamRedCards: '-',

            }
        ];
    
            return blankArray
    
    }

    const homeTeamPossession = matchStats.data.homeTeam.stats.possession;
    const awayTeamPossession = matchStats.data.awayTeam.stats.possession;

    const homeTeamTerritory = matchStats.data.homeTeam.stats.territory;
    const awayTeamTerritory = matchStats.data.awayTeam.stats.territory;

    const homeTeamTries = matchStats.data.homeTeam.stats.tries;
    const awayTeamTries = matchStats.data.awayTeam.stats.tries;

    const homeTeamConversions = matchStats.data.homeTeam.stats.conversionGoals;
    const awayTeamConversions = matchStats.data.awayTeam.stats.conversionGoals;

    const homeTeamPenalties = matchStats.data.homeTeam.stats.penaltyGoals;
    const awayTeamPenalties = matchStats.data.awayTeam.stats.penaltyGoals;

    const homeTeamTackles = matchStats.data.homeTeam.stats.tackles;
    const awayTeamTackles = matchStats.data.awayTeam.stats.tackles;
    const homeTeamMissedTackles = matchStats.data.homeTeam.stats.missedTackles;
    const awayTeamMissedTackles = matchStats.data.awayTeam.stats.missedTackles

    const homeTeamMetres = matchStats.data.homeTeam.stats.metres;
    const awayTeamMetres = matchStats.data.awayTeam.stats.metres;

    const homeTeamPasses = matchStats.data.homeTeam.stats.passes;
    const awayTeamPasses = matchStats.data.awayTeam.stats.passes;

    const homeTeamDefendersBeaten = matchStats.data.homeTeam.stats.defendersBeaten;
    const awayTeamDefendersBeaten = matchStats.data.awayTeam.stats.defendersBeaten;

    const homeTeamScrumsWon = matchStats.data.homeTeam.stats.scrumsWon;
    const awayTeamScrumsWon = matchStats.data.awayTeam.stats.scrumsWon;

    const homeTeamScrumsTotal = matchStats.data.homeTeam.stats.scrumsWon + matchStats.data.homeTeam.stats.scrumsLost;
    const awayTeamScrumsTotal = matchStats.data.awayTeam.stats.scrumsWon + matchStats.data.awayTeam.stats.scrumsLost;

    const homeTeamLineoutsWon = matchStats.data.homeTeam.stats.lineoutsWon;
    const awayTeamLineoutsWon = matchStats.data.awayTeam.stats.lineoutsWon;

    const homeTeamLineoutsTotal = matchStats.data.homeTeam.stats.totalLineouts;
    const awayTeamLineoutsTotal = matchStats.data.awayTeam.stats.totalLineouts;

    const homeTeamPensConceded = matchStats.data.homeTeam.stats.penaltiesConceded;
    const awayTeamPensConceded = matchStats.data.awayTeam.stats.penaltiesConceded;

    const homeTeamYellowCards = matchStats.data.homeTeam.stats.yellowCards;
    const awayTeamYellowCards = matchStats.data.awayTeam.stats.yellowCards;

    const homeTeamRedCards = matchStats.data.homeTeam.stats.redCards;
    const awayTeamRedCards = matchStats.data.awayTeam.stats.redCards;

    const newArray = [
        {
            statsAvailable: true,
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            homeTeamPossession: homeTeamPossession,
            awayTeamPossession: awayTeamPossession,
            homeTeamTerritory: homeTeamTerritory,
            awayTeamTerritory: awayTeamTerritory,
            homeTeamTries: homeTeamTries,
            awayTeamTries: awayTeamTries,
            homeTeamConversions: homeTeamConversions,
            awayTeamConversions: awayTeamConversions,
            homeTeamPenalties: homeTeamPenalties,
            awayTeamPenalties: awayTeamPenalties,

            homeTeamTackles: homeTeamTackles,
            awayTeamTackles: awayTeamTackles,
            homeTeamMissedTackles: homeTeamMissedTackles,
            awayTeamMissedTackles: awayTeamMissedTackles,

            homeTeamMetres: homeTeamMetres,
            awayTeamMetres: awayTeamMetres,
            homeTeamPasses: homeTeamPasses,
            awayTeamPasses: awayTeamPasses,
            homeTeamDefendersBeaten: homeTeamDefendersBeaten,
            awayTeamDefendersBeaten: awayTeamDefendersBeaten,

            homeTeamScrumsWon: homeTeamScrumsWon,
            awayTeamScrumsWon: awayTeamScrumsWon,
            homeTeamScrumsTotal: homeTeamScrumsTotal,
            awayTeamScrumsTotal: awayTeamScrumsTotal,
            homeTeamLineoutsWon: homeTeamLineoutsWon,
            awayTeamLineoutsWon: awayTeamLineoutsWon,
            homeTeamLineoutsTotal: homeTeamLineoutsTotal,
            awayTeamLineoutsTotal: awayTeamLineoutsTotal,

            homeTeamPensConceded: homeTeamPensConceded,
            awayTeamPensConceded: awayTeamPensConceded,
            homeTeamYellowCards: homeTeamYellowCards,
            awayTeamYellowCards: awayTeamYellowCards,
            homeTeamRedCards: homeTeamRedCards,
            awayTeamRedCards: awayTeamRedCards,  
        }
    ];

    return(
        newArray
    )
}

export const handleGetWorldRugbyAPIStat = (stat: any) => {

    if(stat == undefined)
    {
        return "-"
    }

    return stat
}

export const getFullMatchStatsWorldRugbyAPI = (matchStats: any) => {

    const homeTeamName = matchStats.match.teams[0].name;
    const awayTeamName = matchStats.match.teams[1].name;

    console.info(matchStats.teamStats[0].stats.Conversions)

    if (Object.keys(matchStats.teamStats[0].stats).length === 0 ||  Object.keys(matchStats.teamStats[1].stats).length === 0) {
        const blankArray = [
            {
                statsAvailable: false,
                homeTeamName: homeTeamName,
                awayTeamName: awayTeamName,
                homeTeamPossession: '0',
                awayTeamPossession: '0',
                homeTeamTerritory: '0',
                awayTeamTerritory: '0',
                homeTeamTries: '-',
                awayTeamTries: '-',
                homeTeamConversions: '-',
                awayTeamConversions: '-',
                homeTeamPenalties: '-',
                awayTeamPenalties: '-',

                homeTeamTackles: '-',
                awayTeamTackles: '-',
                homeTeamMissedTackles: '-',
                awayTeamMissedTackles: '-',

                homeTeamMetres: '-',
                awayTeamMetres: '-',
                homeTeamPasses: '-',
                awayTeamPasses: '-',
                homeTeamDefendersBeaten: '-',
                awayTeamDefendersBeaten: '-',

                homeTeamScrumsWon: '-',
                awayTeamScrumsWon: '-',
                homeTeamScrumsTotal: '-',
                awayTeamScrumsTotal: '-',
                homeTeamLineoutsWon: '-',
                awayTeamLineoutsWon: '-',
                homeTeamLineoutsTotal: '-',
                awayTeamLineoutsTotal: '-',

                homeTeamPensConceded: '-',
                awayTeamPensConceded: '-',
                homeTeamYellowCards: '-',
                awayTeamYellowCards: '-',
                homeTeamRedCards: '-',
                awayTeamRedCards: '-',

            }
        ];
    
            return blankArray
    
    }

    const homeTeamPossession = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.Possession);
    const awayTeamPossession = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.Possession);

    const homeTeamTerritory = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.Territory);
    const awayTeamTerritory = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.Territory);

    const homeTeamTries = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.Tries);
    const awayTeamTries = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.Tries);

    const homeTeamConversions = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.Conversions);
    const awayTeamConversions = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.Conversions);

    const homeTeamPenalties = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.Penalties);
    const awayTeamPenalties = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.Penalties);

    const homeTeamTackles = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.Tackles);
    const awayTeamTackles = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.Tackles);
    const homeTeamMissedTackles = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.MissedTackles);
    const awayTeamMissedTackles = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.MissedTackles);

    const homeTeamMetres = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.Metres);
    const awayTeamMetres = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.Metres);

    const homeTeamPasses = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.Passes);
    const awayTeamPasses = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.Passes);

    const homeTeamDefendersBeaten = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.DefendersBeaten);
    const awayTeamDefendersBeaten = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.DefendersBeaten);

    const homeTeamScrumsWon = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.ScrumsWon);
    const awayTeamScrumsWon = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.ScrumsWon);

    const homeTeamScrumsTotal = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.ScrumsTotal);
    const awayTeamScrumsTotal = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.ScrumsTotal);

    const homeTeamLineoutsWon = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.LineoutsWon);
    const awayTeamLineoutsWon = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.LineoutsWon);

    const homeTeamLineoutsTotal = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.LineoutsWon + matchStats.teamStats[0].stats.LineoutsLost);
    const awayTeamLineoutsTotal = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.LineoutsWon + matchStats.teamStats[1].stats.LineoutsLost);

    const homeTeamPensConceded = matchStats.teamStats[0].stats.PenaltiesConceded;
    const awayTeamPensConceded = matchStats.teamStats[1].stats.PenaltiesConceded;

    const homeTeamYellowCards = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.YellowCards);
    const awayTeamYellowCards = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.YellowCards);

    const homeTeamRedCards = handleGetWorldRugbyAPIStat(matchStats.teamStats[0].stats.RedCards);
    const awayTeamRedCards = handleGetWorldRugbyAPIStat(matchStats.teamStats[1].stats.RedCards);

    const newArray = [
        {
            statsAvailable: true,
            homeTeamName: homeTeamName,
            awayTeamName: awayTeamName,
            homeTeamPossession: homeTeamPossession,
            awayTeamPossession: awayTeamPossession,
            homeTeamTerritory: homeTeamTerritory,
            awayTeamTerritory: awayTeamTerritory,
            homeTeamTries: homeTeamTries,
            awayTeamTries: awayTeamTries,
            homeTeamConversions: homeTeamConversions,
            awayTeamConversions: awayTeamConversions,
            homeTeamPenalties: homeTeamPenalties,
            awayTeamPenalties: awayTeamPenalties,

            homeTeamTackles: homeTeamTackles,
            awayTeamTackles: awayTeamTackles,
            homeTeamMissedTackles: homeTeamMissedTackles,
            awayTeamMissedTackles: awayTeamMissedTackles,

            homeTeamMetres: homeTeamMetres,
            awayTeamMetres: awayTeamMetres,
            homeTeamPasses: homeTeamPasses,
            awayTeamPasses: awayTeamPasses,
            homeTeamDefendersBeaten: homeTeamDefendersBeaten,
            awayTeamDefendersBeaten: awayTeamDefendersBeaten,

            homeTeamScrumsWon: homeTeamScrumsWon,
            awayTeamScrumsWon: awayTeamScrumsWon,
            homeTeamScrumsTotal: homeTeamScrumsTotal,
            awayTeamScrumsTotal: awayTeamScrumsTotal,
            homeTeamLineoutsWon: homeTeamLineoutsWon,
            awayTeamLineoutsWon: awayTeamLineoutsWon,
            homeTeamLineoutsTotal: homeTeamLineoutsTotal,
            awayTeamLineoutsTotal: awayTeamLineoutsTotal,

            homeTeamPensConceded: homeTeamPensConceded,
            awayTeamPensConceded: awayTeamPensConceded,
            homeTeamYellowCards: homeTeamYellowCards,
            awayTeamYellowCards: awayTeamYellowCards,
            homeTeamRedCards: homeTeamRedCards,
            awayTeamRedCards: awayTeamRedCards,  
        }
    ];

    return(
        newArray
    )
}


export const getFullMatchStatsPlanetRugbyAPI = (matchStats: any) => {

    const [homeTeam, awayTeam] = matchStats.data.matchDetails.teams.split(';');

    const blankArray = [
        {
            statsAvailable: false,
            homeTeamName: homeTeam,
            awayTeamName: awayTeam,
            homeTeamPossession: '0',
            awayTeamPossession: '0',
            homeTeamTerritory: '0',
            awayTeamTerritory: '0',
            homeTeamTries: '-',
            awayTeamTries: '-',
            homeTeamConversions: '-',
            awayTeamConversions: '-',
            homeTeamPenalties: '-',
            awayTeamPenalties: '-',

            homeTeamTackles: '-',
            awayTeamTackles: '-',
            homeTeamMissedTackles: '-',
            awayTeamMissedTackles: '-',

            homeTeamMetres: '-',
            awayTeamMetres: '-',
            homeTeamPasses: '-',
            awayTeamPasses: '-',
            homeTeamDefendersBeaten: '-',
            awayTeamDefendersBeaten: '-',

            homeTeamScrumsWon: '-',
            awayTeamScrumsWon: '-',
            homeTeamScrumsTotal: '-',
            awayTeamScrumsTotal: '-',
            homeTeamLineoutsWon: '-',
            awayTeamLineoutsWon: '-',
            homeTeamLineoutsTotal: '-',
            awayTeamLineoutsTotal: '-',

            homeTeamPensConceded: '-',
            awayTeamPensConceded: '-',
            homeTeamYellowCards: '-',
            awayTeamYellowCards: '-',
            homeTeamRedCards: '-',
            awayTeamRedCards: '-',

        }
    ];

    return blankArray

}