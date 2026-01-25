import { getTeamInfo } from "./getTeamInfo";
import { getPlayerImageSrc } from "./playerImagesGetter";
import { findBestPlayerMatch, TeamPlayer } from "./playerNameMatcher";
import { getTop14TeamPlayersInfo } from "./top14PlayerInfoGetter";

type PlayerInfo = {
    playerName: string
    playerPosition: string,
    playerAge: string,
    playerDOB: string,
    playerHeight: string,
    playerWeight: string,
    playerCountry: string,
    playerImageSrc: string
};

export const getPlayerInfo = async (playerName: string, playerID: string, teamName: string, leagueID: string, leagueName: string, id: string): Promise<PlayerInfo> => {

    if (playerName === "-") {
        return {
            playerName: playerName,
            playerPosition: '-',
            playerAge: '-',
            playerDOB: '-',
            playerHeight: '-',
            playerWeight: '-',
            playerCountry: '-',
            playerImageSrc: '-'
        }
    }

    const calculateAge = (birthDate: Date): number => {
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    function formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleNullHeightOutput = (playerHeight: string) => {

        if (playerHeight == null) {
            return "-"
        }

        return cmToMeters(Number(playerHeight)) + " m";
    }

    const handleNullWeightOutput = (playerWeight: string) => {

        if (playerWeight == null) {
            return "-"
        }

        return playerWeight + " kg";
    }

    const handleNullOutput = (playerStat: string) => {

        if (playerStat == null) {
            return "-"
        }

        return playerStat;
    }

    const cmToMeters = (centimeters: number): string => {
        return (centimeters / 100).toFixed(2);
    }

    // handle differently - separate API
    if (leagueID.indexOf("_RugbyViz") !== -1) {
        const apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/players/' + playerID + '?provider=rugbyviz'
        const playerInfo = await fetch(apiString,).then((res) => res.json())

        const playerPosition = playerInfo.data.position;
        const playerDOB = new Date(playerInfo.data.dateOfBirth);
        const playerAge = calculateAge(playerDOB).toString()

        const playerHeight = handleNullHeightOutput(playerInfo.data.height);
        const playerWeight = handleNullWeightOutput(playerInfo.data.weight);

        const playerCountry = handleNullOutput(playerInfo.data.country);
        const playerImageSrc = await getPlayerImageSrc(leagueName, teamName, playerName)

        return {
            playerName: playerName,
            playerPosition: playerPosition,
            playerAge: playerAge,
            playerDOB: formatDate(playerDOB),
            playerHeight: playerHeight,
            playerWeight: playerWeight,
            playerCountry: playerCountry,
            playerImageSrc: playerImageSrc
        }
    }
    else if (id.indexOf("_PlanetRugbyAPI") !== -1) {
        if (leagueName === "top14") {
            const teamID = getTeamInfo("championsCup", teamName)?.teamInfo.id;
            console.info(teamName)

            const { competitionId, data: teamPlayersInfo } = await getTop14TeamPlayersInfo(teamID);

            const players: TeamPlayer[] = teamPlayersInfo.data;
            const { index, player } = findBestPlayerMatch(playerName, teamPlayersInfo.data);

            console.info(index)
            console.info(player?.knownName)
        
            if (index !== -1 && player) {

                let playerImageSrc = '';

                if(player.knownName !== null)
                {
                    playerImageSrc = await getPlayerImageSrc(leagueName, teamName, player.knownName)
                }

                const playerPosition = teamPlayersInfo.data[index].position;
                const playerDOB = new Date(teamPlayersInfo.data[index].dateOfBirth);
                const playerAge = calculateAge(playerDOB).toString()

                const playerHeight = handleNullHeightOutput(teamPlayersInfo.data[index].height);
                const playerWeight = handleNullWeightOutput(teamPlayersInfo.data[index].weight);

                const playerCountry = handleNullOutput(teamPlayersInfo.data[index].country);

                return {
                    playerName: playerName,
                    playerPosition: playerPosition,
                    playerAge: playerAge,
                    playerDOB: formatDate(playerDOB),
                    playerHeight: playerHeight,
                    playerWeight: playerWeight,
                    playerCountry: playerCountry,
                    playerImageSrc: playerImageSrc
                }
            }
        }
    }
    else if (id.indexOf("_WorldRugbyAPI") !== -1) {
        // get player image using id
        console.info(playerID)
        const apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/player/' + playerID + '?language=en'
        const playerInfo = await fetch(apiString,).then((res) => res.json())

        console.info(playerInfo)

        const playerDOB = new Date(playerInfo.dob.millis);
        const playerAge = calculateAge(playerDOB).toString()

        const playerHeight = handleNullHeightOutput(playerInfo.height);
        const playerWeight = handleNullWeightOutput(playerInfo.weight);
        const playerCountry = handleNullOutput(playerInfo.country);

        const playerImageSrc = await getPlayerImageSrc(leagueName, teamName, playerName)

        let playerImage = playerImageSrc;

        if (playerImageSrc.length === 0) {
            playerImage = 'https://www.rugbyworldcup.com/rwc2023/person-images-site/player-profile/' + playerID + '.png';
        }

        return {
            playerName: playerName,
            playerPosition: '-',
            playerAge: playerAge,
            playerDOB: formatDate(playerDOB),
            playerHeight: playerHeight,
            playerWeight: playerWeight,
            playerCountry: playerCountry,
            playerImageSrc: playerImage
        }
    }

    return {
        playerName: playerName,
        playerPosition: '-',
        playerAge: '-',
        playerDOB: '-',
        playerHeight: '-',
        playerWeight: '-',
        playerCountry: '-',
        playerImageSrc: '-'
    }
}