import { colors} from "@/constants/tokens";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getAnyTeamInfoFromName, getClosestWorldCupYear, getLeagueCodeFromDisplayName, getPlanetRugbyAPILeagueCode, getRugbyVizLeagueNameFromCode } from "@/store/utils/helpers";
import { defaultStyles } from "@/styles";
import { getTeamStandingsInfo, getTeamStandingsInfoRugbyViz } from "@/store/utils/getTeamStandingsInfo";
import { TeamSummaryPanel } from "@/store/components/TeamSummaryPanel";
import { StandingInfo, TeamStandingPanel } from "@/store/components/TeamStandingPanel";
import { getAllStandingsDataPlanetRugby } from "@/store/utils/standingsGetter";


export const getTeamBasicInfo = (teamDetails: any) => {

    const teamName = teamDetails.team.displayName;

    var homeVenue;
    var homeVenueCity;
    var homeVenueState;
    
    if(teamDetails.team.venue !== undefined)
    {
        homeVenue = teamDetails.team.venue.fullName
        homeVenueCity = teamDetails.team.venue.address.city
        homeVenueState = teamDetails.team.venue.address.state
    }
    else
    {
        homeVenue = '-'
        homeVenueCity = '-'
        homeVenueState = '-'
    }
    
    const teamForm = teamDetails.team.form;

    return (
        {
            teamName: teamName,
            homeVenue: homeVenue,
            homeLocation: homeVenueCity + ', ' + homeVenueState,
            teamForm: teamForm,
        }
    )
}

export type SeasonStatsInfo = {
    playerName: string,
    playerPosition: string,
    points: string,
    tries: string,
    tackles: string,
    penaltiesConc: string,
    matchCount: number,
}

export type TeamInfo = {
    teamName: string
    homeVenue: string
    homeLocation: string
    teamForm: string
}

const TeamSummary = () => {

    const [teamInfo, setTeamInfo] = useState<TeamInfo | undefined>();
    const [standingsArray, setStandingsArray] = useState<StandingInfo[]>([]);

    const [teamLeagueName, setTeamLeagueName] = useState<string>('');
    const [teamInfoYear, setTeamInfoYear] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const {teamID} = useLocalSearchParams();

    const regex = new RegExp('([0-9]+)|([a-zA-Z]+)','g');
    const splittedArray = new String(teamID).match(regex);
    if(splittedArray == null) return
    const teamIDNum = splittedArray[0];
    const teamIDName = new String(teamID).replace(teamIDNum, '');

    const currentYear = new Date().getFullYear().valueOf();

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch Team Info")
        setIsLoading(true)

        // getting basic team info
        const apiString = 'https://site.web.api.espn.com/apis/site/v2/sports/rugby/teams/'+ teamIDNum;

        const teamDetails = await fetch(apiString,).then((res) => res.json())
        const basicTeamInfo = getTeamBasicInfo(teamDetails)
        const teamName = teamIDName;
        setTeamInfo(basicTeamInfo)

        const teamInfo = getAnyTeamInfoFromName(teamName);
        const thisTeamLeague = teamInfo.defaultLeague;
        const thisTeamSeasonType = teamInfo.seasonType;
        console.info(thisTeamSeasonType)
        setTeamLeagueName(thisTeamLeague)
        const thisLeagueCode = getLeagueCodeFromDisplayName(thisTeamLeague)

        var targetYear = 0
        // need to get closest world cup year
        if(thisTeamLeague == "Rugby World Cup")
        {
            setTeamInfoYear(getClosestWorldCupYear(currentYear));
            targetYear = getClosestWorldCupYear(currentYear);
        }
        else
        {
            if(thisTeamSeasonType == 'north')
            {
                const seasonStartDate = new Date(currentYear, 8, 0)
                if (new Date() > seasonStartDate) {
                    setTeamInfoYear(currentYear + 1);
                    targetYear = currentYear + 1;
                }
                else
                {
                    setTeamInfoYear(currentYear);
                    targetYear = currentYear
                }
            }
            else
            {
                setTeamInfoYear(currentYear);
                targetYear = currentYear
            }
        }

        const rugbyVizLeagueCodes = [
            { teamType: 'URC Club', leagueCode: '1068',},
            { teamType: 'Prem Club', leagueCode: '1011',},
        ];

        // use RugbyViz API
        if(teamInfo.type === 'URC Club' || teamInfo.type === 'Prem Club')   
        {
            // getting standings info
            const rugVizLeagueCode = rugbyVizLeagueCodes.find((element) => element.teamType == teamInfo.type)?.leagueCode;
            if(rugVizLeagueCode === undefined) return;
            const rugVizLeagueName = getRugbyVizLeagueNameFromCode(rugVizLeagueCode)

            const rugVizApiString = 'https://rugby-union-feeds.incrowdsports.com/v1/tables/'+rugVizLeagueCode+'?provider=rugbyviz&season='+ targetYear +'01';
            const rugVizSeasonStandings = await fetch( rugVizApiString,).then((res) => res.json())
            const rugVizStandingsInfo = getTeamStandingsInfoRugbyViz(rugVizSeasonStandings, rugVizLeagueName)
            setStandingsArray(rugVizStandingsInfo)

            setIsLoading(false)
            return;
        }

        const planetRugbyLeagueCodes = [
            { teamLeague: 'Top 14', leagueCode: '1310036262',},
            { teamLeague: 'Six Nations', leagueCode: '1310031041',},
            { teamLeague: 'Rugby Championship', leagueCode: '1310034091',},
        ];
        const planetRugbyLeagueCode = planetRugbyLeagueCodes.find((element) => element.teamLeague == teamInfo.defaultLeague)?.leagueCode;

        // use Planet Rugby API
        if(planetRugbyLeagueCode !== undefined)   
        {
            const apiString = 'https://rugbylivecenter.yormedia.com/api/all-league-tables/'+planetRugbyLeagueCode;

            const seasonStandingsPlanetRugby = await fetch( apiString,).then((res) => res.json())
            const newArray = getAllStandingsDataPlanetRugby(seasonStandingsPlanetRugby, false, false, -1)

            console.info(newArray)
            setStandingsArray(newArray)    
            setIsLoading(false)
            return;
        }

        const apiStringStandings = 'https://site.web.api.espn.com/apis/v2/sports/rugby/' + thisLeagueCode + '/standings?lang=en&region=gb&season='
             + targetYear + '&seasontype=1&sort=rank:asc&type=0';
            
        const seasonStandings = await fetch( apiStringStandings,).then((res) => res.json())
        const standingsInfo = getTeamStandingsInfo(seasonStandings)
        setStandingsArray(standingsInfo)

        setIsLoading(false)
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await handlePressFetchData()
        }
        fetchMyAPI()
    }, [])

    const activityIndicatorHeader = () => {

        if(isLoading)
        {
            return (
                <View style={{marginVertical: 20}}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            )
        }
        
        return null
    }

    return(
        <View style={defaultStyles.container}>

            {activityIndicatorHeader()}

            <ScrollView>
        
            <TeamSummaryPanel 
            teamName={teamIDName}
            homeVenue={teamInfo?.homeVenue}
            homeLocation={teamInfo?.homeLocation}
            teamForm={teamInfo?.teamForm}
            />

            </ScrollView>

        </View>
    )
}


export default TeamSummary;