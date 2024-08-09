
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