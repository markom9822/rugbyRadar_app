
export const getLineup = (matchDetails: any, rosterIndex: number, worldRugbyAPIDetails: any) => {

    if(matchDetails.rosters[rosterIndex].roster === undefined)
    {
        var blankArray = [];

        for (let index = 0; index < 23; index++) {
            let blankLineupInfo = {
                teamPlayer: '-',
                teamPlayerID: '-',
                teamPlayerNum: index + 1,
                isPlayerCaptain: false,
                };
    
            blankArray.push(blankLineupInfo)
        }

        return(
            blankArray
        )
    } 

    const rosterLength = matchDetails.rosters[rosterIndex].roster.length;

    var newArray = [];

    for (let index = 0; index < rosterLength; index++) {

        const playerName = matchDetails.rosters[rosterIndex].roster[index].athlete.displayName;
        const playerNumber = matchDetails.rosters[rosterIndex].roster[index].jersey.replace(/\s/g, "");

        const playerID = getMatchingPlayerIDWorldRugbyAPI(playerName, rosterIndex == 0, worldRugbyAPIDetails)

        const playerPosition = matchDetails.rosters[rosterIndex].roster[index].position.displayName;
        const isPlayerCaptain = matchDetails.rosters[rosterIndex].roster[index].captain;

        let newLineupInfo = {
            teamPlayer: playerName,
            teamPlayerID: playerID,
            teamPlayerNum: playerNumber,
            isPlayerCaptain: isPlayerCaptain,
            };

        newArray.push(newLineupInfo)
    }

    console.info(newArray)

    return(
        newArray
    )
}

export const getMatchingPlayerIDWorldRugbyAPI = (playerName: string, isHome: boolean, matchDetails: any) => {
    const targetRoster = isHome ? matchDetails.teams[0].teamList.list : matchDetails.teams[1].teamList.list

    if (targetRoster === null || targetRoster.length == 0) {
        return ''
    }

    for (let index = 0; index < targetRoster.length; index++) {

        const thisPlayerName = targetRoster[index].player.name.display;

        if(thisPlayerName == playerName)
        {
            return targetRoster[index].player.id;
        }
    }

    return ''
}

export const getLineupRugbyViz = (matchDetails: any, isHome: boolean) => {

    const targetRoster = isHome ? matchDetails.data.homeTeam.players : matchDetails.data.awayTeam.players

    if (targetRoster === null) {
        var blankArray = [];

        for (let index = 0; index < 23; index++) {
            let blankLineupInfo = {
                teamPlayer: '-',
                teamPlayerID: '-',
                teamPlayerNum: index + 1,
                isPlayerCaptain: false,
            };

            blankArray.push(blankLineupInfo)
        }

        return (
            blankArray
        )
    } 

    var newArray = [];

    for (let index = 0; index < targetRoster.length; index++) {

        const playerName = targetRoster[index].name;
        const playerNumber = targetRoster[index].positionId;
        const playerID = targetRoster[index].id;

        const playerPosition = targetRoster[index].position;
        const isPlayerCaptain = targetRoster[index].captain;

        let newLineupInfo = {
            teamPlayer: playerName,
            teamPlayerID: playerID,
            teamPlayerNum: playerNumber,
            isPlayerCaptain: isPlayerCaptain,
            };

        newArray.push(newLineupInfo)
    }

    console.info(newArray)

    return(
        newArray
    )
}


export const getLineupWorldRugbyAPI = (matchDetails: any, isHome: boolean) => {

    const targetRoster = isHome ? matchDetails.teams[0].teamList.list : matchDetails.teams[1].teamList.list

    if (targetRoster === null || targetRoster.length == 0) {
        var blankArray = [];

        for (let index = 0; index < 23; index++) {
            let blankLineupInfo = {
                teamPlayer: '-',
                teamPlayerID: '-',
                teamPlayerNum: index + 1,
                isPlayerCaptain: false,
            };

            blankArray.push(blankLineupInfo)
        }

        return (
            blankArray
        )
    }

    var newArray = [];
    const captainID = isHome ? matchDetails.teams[0].teamList.captainId : matchDetails.teams[1].teamList.captainId

    for (let index = 0; index < targetRoster.length; index++) {

        const playerName = targetRoster[index].player.name.display;
        const playerNumber = targetRoster[index].number;
        const playerID = targetRoster[index].player.id;

        const playerPosition = targetRoster[index].positionLabel;

        if(playerPosition === "Head Coach")
        {
            continue;
        }

        const isPlayerCaptain = targetRoster[index].player.id === captainID;

        let newLineupInfo = {
            teamPlayer: playerName,
            teamPlayerID: playerID,
            teamPlayerNum: playerNumber,
            isPlayerCaptain: isPlayerCaptain,
            };

        newArray.push(newLineupInfo)
    }

    console.info(newArray)

    return(
        newArray
    )
}


export const getLineupPlanetRugbyAPI = (matchDetails: any, homeIndex: number) => {

    const rosterList = matchDetails.data.match;

    if (rosterList === null || rosterList.length == 0) {
        var blankArray = [];

        for (let index = 0; index < 23; index++) {
            let blankLineupInfo = {
                teamPlayer: '-',
                teamPlayerID: '-',
                teamPlayerNum: index + 1,
                isPlayerCaptain: false,
            };

            blankArray.push(blankLineupInfo)
        }

        return (
            blankArray
        )
    } 

    var newArray = [];

    for (let index = 0; index < rosterList.length; index++) {

        if(rosterList[index].is_home !== homeIndex)
        {
            continue;
        }

        const playerName = rosterList[index].forename + " " + rosterList[index].surname;
        const playerNumber = rosterList[index].shirt_no;

        const playerPosition = rosterList[index].position;

        const isPlayerCaptain = false;

        let newLineupInfo = {
            teamPlayer: playerName,
            teamPlayerID: '',
            teamPlayerNum: playerNumber,
            isPlayerCaptain: isPlayerCaptain,
            };

        newArray.push(newLineupInfo)
    }

    console.info(newArray)

    return(
        newArray
    )
}