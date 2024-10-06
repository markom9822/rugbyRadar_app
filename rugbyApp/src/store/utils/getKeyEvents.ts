import { DropGoalIcon, RedCardIcon, RugbyPostsIcon, RugbyTryIcon, YellowCardIcon } from "@/store/Icons/Icons";


export const getKeyEventIcon = (eventType: string) => {
    switch(eventType) { 
        case 'conversion': return RugbyPostsIcon
        case 'penalty goal': return RugbyPostsIcon
        case 'try': return RugbyTryIcon
        case 'yellow card': return YellowCardIcon
        case 'red card': return RedCardIcon
        case 'drop goal': return DropGoalIcon


        default: { 
           break; 
        } 
     } 
}

export const getKeyEvents = (matchStats: any) => {

    var keyEventsArray = [];

    const keyEventsLength = matchStats.header.competitions[0].details.length;

    for (let index = 0; index < keyEventsLength; index++) {

        const eventTime = matchStats.header.competitions[0].details[index].clock.displayValue;
        const eventType = matchStats.header.competitions[0].details[index].type.text;
        const eventPlayer = matchStats.header.competitions[0].details[index].participants[0].athlete.displayName;
        const homeScore = matchStats.header.competitions[0].details[index].homeScore;
        const awayScore = matchStats.header.competitions[0].details[index].awayScore;
        const eventTeam = matchStats.header.competitions[0].details[index].team.displayName;

        const eventIcon = getKeyEventIcon(eventType);

        const typeCheck = eventType === "try" || eventType === "conversion"
         || eventType === "penalty goal" || eventType === "drop goal" || 
         eventType === "yellow card" || eventType === "red card"

        if (typeCheck) {

            const newArray = {
                eventTime: eventTime,
                eventType: eventType,
                eventPlayer: eventPlayer,
                eventScore: `${homeScore} - ${awayScore}`,
                eventTeam: eventTeam,
                eventIcon: eventIcon,
            };

            keyEventsArray.push(newArray)
        }
    }

    return(
        keyEventsArray
    )
}

export const getKeyEventIconRugbyViz = (eventType: string) => {
    switch(eventType) { 
        case 'Conversion': return RugbyPostsIcon
        case 'Penalty': return RugbyPostsIcon
        case 'Penalty Try': return RugbyTryIcon
        case 'Try': return RugbyTryIcon
        case 'Yellow card': return YellowCardIcon
        case 'Red card': return RedCardIcon
        case 'Drop goal': return DropGoalIcon


        default: { 
           break; 
        } 
     } 
}

const getKeyEventPlayerRugbyViz = (matchStats: any, playerID: number, isHomeTeam: boolean) => {

    const playersArray = isHomeTeam ? matchStats.data.homeTeam.players : matchStats.data.awayTeam.players;

    for (let index = 0; index < playersArray.length; index++) {

        if(playersArray[index].id === playerID)
        {
            return playersArray[index].name;
        }
    }

    return null
}

export const getKeyEventsRugbyViz = (matchStats: any) => {

    var keyEventsArray = [];

    const keyEvents= matchStats.data.events;
    if(keyEvents == null) return []

    const homeTeamID = matchStats.data.homeTeam.id;
    const awayTeamID = matchStats.data.awayTeam.id;

    var homeScore = 0;
    var awayScore = 0;

    const addScoreToTeam = (isHomeTeam: boolean, eventType: string) => {

        if(isHomeTeam)
        {
            if(eventType === "Penalty Try")
            {
                homeScore += 7;
            }
            if(eventType === "Try")
            {
                homeScore += 5;
            }
            else if(eventType === "Penalty" || eventType === "Drop goal")
            {
                homeScore += 3;
            }
            else if(eventType === "Conversion")
            {
                homeScore += 2;
            }
        }
        else
        {
            if(eventType === "Penalty Try")
            {
                awayScore += 7;
            }
            if(eventType === "Try")
            {
                awayScore += 5;
            }
            else if(eventType === "Penalty" || eventType === "Drop goal")
            {
                awayScore += 3;
            }
            else if(eventType === "Conversion")
            {
                awayScore += 2;
            }
        }

    }

    for (let index = 0; index < keyEvents.length; index++) {

        const eventTime = keyEvents[index].optaMinute;
        const eventType = keyEvents[index].type;

        var eventTeam = ''
        var eventPlayer = ''
        const eventTeamID = keyEvents[index].teamId;
        const eventPlayerID = keyEvents[index].playerId;
        const isHomeTeam = eventTeamID === homeTeamID;

        addScoreToTeam(isHomeTeam, eventType)

        if(isHomeTeam)
        {
            eventTeam = matchStats.data.homeTeam.shortName;
            eventPlayer = getKeyEventPlayerRugbyViz(matchStats, eventPlayerID, true)
        }
        else
        {
            eventTeam = matchStats.data.awayTeam.shortName;
            eventPlayer = getKeyEventPlayerRugbyViz(matchStats, eventPlayerID, false)
        }

        const eventIcon = getKeyEventIconRugbyViz(eventType);

        const typeCheck = eventType === "Try" || eventType === "Conversion"
         || eventType === "Penalty" || eventType === "Penalty Try" || eventType === "Drop goal" || 
         eventType === "Yellow card" || eventType === "Red card"

        if (typeCheck) {

            const newArray = {
                eventTime: eventTime,
                eventType: eventType,
                eventPlayer: eventPlayer,
                eventScore: `${homeScore} - ${awayScore}`,
                eventTeam: eventTeam,
                eventIcon: eventIcon,
            };

            keyEventsArray.push(newArray)
        }

    }


    return(
        keyEventsArray
    )

}