import { getPremShortNameFromFullName } from "../PremiershipRubyTeamsDatabase";
import { getTop14ShortNameFromFullName } from "../Top14RugbyTeamsDatabase";
import { getURCShortNameFromFullName } from "../URCRugbyTeamsDatabase";

export const getTeamStandingsInfo = (seasonStandings: any) => {

    let newArray = [];

    const standingsChildren = seasonStandings.children.length

    for (let j = 0; j < seasonStandings.children.length; j++) {

        const standingsCount = seasonStandings.children[j].standings.entries.length;
        
        for (let index = 0; index < standingsCount; index++) {

            const teamPool = seasonStandings.children[j].name;
            if(index === 0 && standingsChildren > 1)
            {
                let headerRankingInfo = {
                    isHeader: true,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamPD: '0',
                    teamPoints: '0',
                };

                newArray.push(headerRankingInfo)
            }

            const teamName = seasonStandings.children[j].standings.entries[index].team.displayName;
            const teamGP = seasonStandings.children[j].standings.entries[index].stats[7].value;
            const teamPD = seasonStandings.children[j].standings.entries[index].stats[11].value;
            const teamPoints = seasonStandings.children[j].standings.entries[index].stats[12].value;

            let newRankingInfo = {
                    isHeader: false,
                    teamPool: teamPool,
                    teamName: teamName,
                    teamGP: teamGP,
                    teamPD: teamPD,
                    teamPoints: teamPoints,
            };

            newArray.push(newRankingInfo)
        }
    }

    console.info(newArray)
    return(
        newArray
    )
}

export const getTeamStandingsInfoRugbyViz = (seasonStandings: any, leagueName: string) => {

    let newArray = [];

    const standingsChildren = seasonStandings.data.groups

    for (let j = 0; j < standingsChildren.length; j++) {

        const teamsCount = standingsChildren[j].teams.length
        
        for (let index = 0; index < teamsCount; index++) {

            const teamPool = standingsChildren[j].name;
            if(index === 0 && standingsChildren.length > 1)
            {
                let headerRankingInfo = {
                    isHeader: true,
                    teamPool: teamPool,
                    teamName: 'Pool',
                    teamGP: '0',
                    teamPD: '0',
                    teamPoints: '0',
                };

                newArray.push(headerRankingInfo)
            }

            let teamName = '';

            if(leagueName === 'urc')
            {
                teamName = getURCShortNameFromFullName(standingsChildren[j].teams[index].name);
            }
            else if (leagueName === 'prem')
            {
                teamName = getPremShortNameFromFullName(standingsChildren[j].teams[index].name);
            }
            else if (leagueName === 'top14')
            {
                teamName = getTop14ShortNameFromFullName(standingsChildren[j].teams[index].name);
            }

            const teamGP = standingsChildren[j].teams[index].played;
            const teamPD = standingsChildren[j].teams[index].pointsDiff;
            const teamPoints = standingsChildren[j].teams[index].points;

            let newRankingInfo = {
                    isHeader: false,
                    teamPool: teamPool,
                    teamName: teamName,
                    teamGP: teamGP,
                    teamPD: teamPD,
                    teamPoints: teamPoints,
            };

            newArray.push(newRankingInfo)
        }
    }

    console.info(newArray)
    return(
        newArray
    )
}