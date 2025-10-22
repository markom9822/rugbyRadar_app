import { MatchInfo } from "@/app/(tabs)"
import { fetchPlanetRugbyAPIData, fetchRugbyVizData, fetchWorldRugbyAPIData } from "./fixturesGetter"

const leagueSearchData = [
        { name: 'urc', offSeasonMonths: [7, 8] },
        { name: 'prem', offSeasonMonths: [7, 8] },
        { name: 'top14', offSeasonMonths: [7, 8] },
        { name: 'superRugby', offSeasonMonths: [1, 7, 8, 9, 10, 11, 12] },
        { name: 'championsCup', offSeasonMonths: [6, 7, 8, 9, 10, 11] },
        { name: 'challengeCup', offSeasonMonths: [6, 7, 8, 9, 10, 11] },
        { name: 'sixNations', offSeasonMonths: [4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { name: 'u20SixNations', offSeasonMonths: [4, 5, 6, 7, 8, 9, 10, 11, 12] },
        { name: 'autumnNations', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12] },
        { name: 'rugbyChamp', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12] },
        { name: 'rugbyWorldCup', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12] },
        { name: 'u20Championship', offSeasonMonths: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12] },
        { name: 'pacificNationsCup', offSeasonMonths: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12] },
        { name: 'BILTour', offSeasonMonths: [1, 2, 3, 4, 5, 9, 10, 11, 12] },
    ];

export const getLeagueFixtures = async (datesArray: Date[], targetLeagueName: string) => {

    //const formattedDate = dateCustomFormatting(selectedDate)
    //const currentLeagueCode = getLeagueCode(targetLeagueName)

    const leagueNameArray = targetLeagueName === "all" ?
        ['urc', 'prem', 'championsCup', 'challengeCup', 'top14', 'superRugby',
            'autumnNations', 'sixNations', 'rugbyChamp', 'u20SixNations', 'rugbyWorldCup', 'u20Championship', 'pacificNationsCup', 'BILTour'] : [targetLeagueName]

    console.info(leagueNameArray)

    const allFixturesArray: MatchInfo[] = [];

    const handleGetRugbyVizFixtures = async (thisLeagueName: string, thisDate: Date, tempArray: MatchInfo[]) => {

        const rugbyVizFixtures: MatchInfo[] = await fetchRugbyVizData(thisLeagueName, thisDate);

        if (rugbyVizFixtures !== undefined && rugbyVizFixtures.length > 0) {
            tempArray.push(...rugbyVizFixtures)
        }
    }

    const handleGetPlanetRugbyFixtures = async (thisLeagueName: string, thisDate: Date, tempArray: MatchInfo[]) => {

        const planetRugbyFixtures: MatchInfo[] = await fetchPlanetRugbyAPIData(thisLeagueName, thisDate);

        if (planetRugbyFixtures !== undefined && planetRugbyFixtures.length > 0) {
            tempArray.push(...planetRugbyFixtures)
        }
    }

    const handleGetWorldRugbyFixtures = async (thisLeagueName: string, thisDate: Date, tempArray: MatchInfo[]) => {

        const worldRugbyFixtures: MatchInfo[] = await fetchWorldRugbyAPIData(thisLeagueName, thisDate);

        if (worldRugbyFixtures !== undefined && worldRugbyFixtures.length > 0) {
            tempArray.push(...worldRugbyFixtures)
        }
    }

    for (let i = 0; i < datesArray.length; i++) {

        let dateHeaderMatchInfo = {
            homeTeam: '',
            awayTeam: '',
            homeScore: '',
            awayScore: '',
            matchDate: datesArray[i],
            matchTitle: '',
            matchVenue: '',
            matchLeague: '',
            matchID: '',
            eventState: '',
            stateDetail: '',
            eventTime: '',
            isDateHeader: true,
        };

        let tempArray: MatchInfo[] = []

        allFixturesArray.push(dateHeaderMatchInfo)

        for (let index = 0; index < leagueNameArray.length; index++) {

            const thisLeagueName = leagueNameArray[index];
            const thisFixtureMonth = datesArray[i].getMonth() + 1

            const offSeasonMonths = leagueSearchData.find(league => league.name === thisLeagueName)?.offSeasonMonths;

            // check if in offseason for league
            if (offSeasonMonths?.includes(thisFixtureMonth)) {
                continue;
            }

            switch (thisLeagueName) {
                case "urc":
                case "prem":
                case "championsCup":
                case "challengeCup":
                    await handleGetRugbyVizFixtures(thisLeagueName, datesArray[i], tempArray)
                    break;
                case "top14":
                case "superRugby":
                    await handleGetPlanetRugbyFixtures(thisLeagueName, datesArray[i], tempArray)
                    break;
                case "autumnNations":
                case "sixNations":
                case "rugbyChamp":
                case "u20SixNations":
                case "rugbyWorldCup":
                case "u20Championship":
                case "pacificNationsCup":
                case "BILTour":
                    await handleGetWorldRugbyFixtures(thisLeagueName, datesArray[i], tempArray)
                    break;
            }
        }

        tempArray.sort((a, b) => a.matchDate.getTime() - b.matchDate.getTime())
        allFixturesArray.push(...tempArray)
    }


    console.info(allFixturesArray)

    const filteredArray = allFixturesArray.filter((item, index, array) => {

        if (index === allFixturesArray.length - 1 && item.isDateHeader) {
            return null
        }

        if (item.isDateHeader && array[index + 1]?.isDateHeader) {
            return null
        }
        else {
            return item
        }
    });

    console.info(filteredArray)

    return (
        filteredArray
    )
}