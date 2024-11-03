import { DropGoalIcon, RedCardIcon, RugbyPostsIcon, RugbyTryIcon, YellowCardIcon } from "@/store/Icons/Icons";
import { PlayerStatsItem } from "../components/TeamPlayerStatsPanel";


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

export const getKeyEventIconWorldRugbyAPI = (eventType: string) => {
    switch(eventType) { 
        case 'Conversion': return RugbyPostsIcon
        case 'Penalty': return RugbyPostsIcon
        case 'Penalty Try': return RugbyTryIcon
        case 'Try': return RugbyTryIcon
        case 'Yellow Card': return YellowCardIcon
        case 'Red Card': return RedCardIcon
        case 'Drop goal': return DropGoalIcon


        default: { 
           break; 
        } 
     } 
}

export type PlayerListItem = {
    name: string;
    id: string;
  };

export const getPlayersListWorldRugbyAPI = async (matchID: string, isHome: boolean) =>
{
    const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/match/'+matchID+'/summary?language=en';
    const teamDetails = await fetch( apiString,).then((res) => res.json())

    var playersList: PlayerListItem[] = []

    const teamList = isHome ? teamDetails.teams[0].teamList.list: teamDetails.teams[1].teamList.list;

    for (let index = 0; index < teamList.length; index++) {

        const playerName = teamList[index].player.name.display;
        const playerID = teamList[index].player.id;

        let newPlayer = {
            name: playerName,
            id: playerID
        }

        playersList.push(newPlayer);
    }

    console.info(playersList)

    return playersList;
}


export const getKeyEventsWorldRugbyAPI = async (matchStats: any) => {

    var keyEventsArray = [];

    const keyEvents= matchStats.timeline;
    if(keyEvents == null || keyEvents.length == 0) return []

    const homePlayersList = await getPlayersListWorldRugbyAPI(matchStats.match.matchId, true)
    const awayPlayersList = await getPlayersListWorldRugbyAPI(matchStats.match.matchId, false)

    console.info(homePlayersList)

    var homeScore = 0;
    var awayScore = 0;

    const addScoreToTeam = (isHomeTeam: boolean, eventScore: number) => {

        if(isHomeTeam)
        {
           homeScore += eventScore;
        }
        else
        {
            awayScore += eventScore;
        }
    }

    for (let index = 0; index < keyEvents.length; index++) {

        const eventTime = Math.floor(keyEvents[index].time.secs / 60);
        const eventType = keyEvents[index].typeLabel;
        const eventScore = keyEvents[index].points;
        const eventPlayerID = keyEvents[index].playerId;

        var eventTeam = ''
        var eventPlayer = ''
        const isHomeTeam = keyEvents[index].teamIndex == 0;

        addScoreToTeam(isHomeTeam, eventScore)

        if(isHomeTeam)
        {
            eventTeam = matchStats.match.teams[0].name;
            const playerItem = homePlayersList.find((element: PlayerListItem ) => element.id == eventPlayerID);
            if(playerItem != undefined)
            {
                eventPlayer = playerItem.name;
            }
        }
        else
        {
            eventTeam = matchStats.match.teams[1].name;;
            const playerItem = awayPlayersList.find((element: PlayerListItem ) => element.id == eventPlayerID);
            if(playerItem != undefined)
            {
                eventPlayer = playerItem.name;
            }
        }

        const eventIcon = getKeyEventIconWorldRugbyAPI(eventType);

        const typeCheck = eventType === "Try" || eventType === "Conversion"
         || eventType === "Penalty" || eventType === "Penalty Try" || eventType === "Drop goal" || 
         eventType === "Yellow Card" || eventType === "Red Card"

        if (typeCheck) {

            const newArray = {
                eventTime: eventTime.toString(),
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

export const getKeyEventIconPlanetRugbyAPI = (eventType: string) => {
    switch(eventType) { 
        case 'CON': return RugbyPostsIcon
        case 'PEN': return RugbyPostsIcon
        case 'TRY': return RugbyTryIcon
        case 'Yellow': return YellowCardIcon
        case 'Red': return RedCardIcon
        case 'Drop goal': return DropGoalIcon


        default: { 
           break; 
        } 
     } 
}


export const getKeyEventsPlanetRugbyAPI = (matchStats: any, homeTeamName: string, awayTeamName: string, homeTeamID: string, awayTeamID: string) => {

    var keyEventsArray:any = [];

    const homeKeyEvents = matchStats.data.scorers.home;
    const awayKeyEvents = matchStats.data.scorers.away;
    const cardKeyEvents = matchStats.data.scorers.cards;

    const addKeyEventByType = (eventArray: any) => {

        if(eventArray == undefined) return;

        for (let index = 0; index < eventArray.length; index++) {
            const eventTime = eventArray[index].minutes;
            const eventType = eventArray[index].type;

            var playerFirstName = "";

            if(eventArray[index].firstname !== undefined)
            {
                playerFirstName = eventArray[index].firstname;
            }
            else if (eventArray[index].forename !== undefined)
            {
                playerFirstName = eventArray[index].forename;
            }

            const eventPlayer =playerFirstName + " " + eventArray[index].surname;

            const eventScore = eventArray[index].score;
            const eventIcon = getKeyEventIconPlanetRugbyAPI(eventType);
            const eventTeamID = eventArray[index].teams_id;
            const eventTeam = eventTeamID == homeTeamID ? homeTeamName : awayTeamName;

            const newArray = {
                eventTime: eventTime.toString(),
                eventType: eventType,
                eventPlayer: eventPlayer,
                eventScore: eventScore,
                eventTeam: eventTeam,
                eventIcon: eventIcon,
            };

            keyEventsArray.push(newArray)
        }
    }


    addKeyEventByType(homeKeyEvents?.TRY);
    addKeyEventByType(homeKeyEvents?.CON);
    addKeyEventByType(homeKeyEvents?.PEN);

    addKeyEventByType(awayKeyEvents?.TRY);
    addKeyEventByType(awayKeyEvents?.CON);
    addKeyEventByType(awayKeyEvents?.PEN);

    addKeyEventByType(cardKeyEvents?.Yellow);
    addKeyEventByType(cardKeyEvents?.Red);

    // sort events
    const sortedEventsArray = keyEventsArray.sort((a:any, b:any) =>  a.eventTime - b.eventTime)


    return(
        sortedEventsArray
    )

}