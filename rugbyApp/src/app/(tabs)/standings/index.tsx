import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { KnockoutsPanel } from "@/store/components/KnockoutsPanel"
import { CustomSelectDropdown, DropdownData, LeagueSelectDropdown } from "@/store/components/SelectDropdown"
import { StandingPanel } from "@/store/components/StandingPanel"
import { ChallengeCupAltLogo, ChampionsCupAltLogo, PremiershipAltLogo, RankingsLogo, RugbyChampAltLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, URCAltLogo, WorldCupAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import { generateSeasonList, getLeagueCode, getRugbyVizLeagueCode, getRugbyVizPlayoffCutoffFromLeagueName } from "@/store/utils/helpers"
import { fetchRugbyVizKnockoutFixtures } from "@/store/utils/knockoutFixturesGetter"
import { getAllStandingsData, getAllStandingsDataPlanetRugby, getAllStandingsDataRugbyViz } from "@/store/utils/standingsGetter"
import { defaultStyles } from "@/styles"
import { FontAwesome6 } from '@expo/vector-icons'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet"
import { useCallback, useEffect, useRef, useState } from "react"
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MatchInfo } from "../(fixtures)"

export type StandingInfo = {
    isHeader: boolean
    teamPool: string
    teamName: string
	teamGP: string
    teamWins: string
    teamDraws: string
    teamLosses: string
    teamPD: string
    teamPoints: string
    ranking: number
    isLastItem: boolean
    isEndOfList: boolean
    isPlayoffCutoff: boolean,
}

const getWorldRankingsData = (todaysRankings: any): StandingInfo[] => {

    const rankListLength = 15;

    var newArray = [];

    for (let index = 0; index < rankListLength; index++) {

        const teamName = todaysRankings.entries[index].team.name;
        const rawPoints = todaysRankings.entries[index].pts;
        const teamPoints = parseFloat(rawPoints).toFixed(2);

        const teamPosition = todaysRankings.entries[index].pos;

        let newRankingInfo = {
            isHeader: false,
            teamPool: '',
            teamName: teamName,
            teamGP: '-',
            teamWins: '-',
            teamDraws: '-',
            teamLosses: '-',
            teamPD: '-',
            teamPoints: teamPoints,
            ranking: index,
            isLastItem: index == rankListLength - 1,
            isEndOfList: index == rankListLength - 1,
            isPlayoffCutoff: false,
    };

        newArray.push(newRankingInfo)
    }

    return (
        newArray
    )
}

export type SeasonDateInfo = {
    label: string,
    value: string
}


const StandingsScreen = () => {
    const [standingsArray, setStandingsArray] = useState<StandingInfo[]>([]);
    const [secondaryStandingsArray, setSecondaryStandingsArray] = useState<StandingInfo[]>([]);

    const [leagueName, setLeagueName] = useState<string>('');
    const [seasonName, setSeasonName] = useState<string>('');
    const [seasonDates, setSeasonDates] = useState<SeasonDateInfo[]>(generateSeasonList());
    const [isLoading, setIsLoading] = useState(false);
    const [knockoutsArray, setKnockoutsArray] = useState<MatchInfo[]>([]);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    const handlePressFetchData = async (targetSeasonName: string) =>{
        console.info("Pressed Fetch Standings")
        if(leagueName === '' || targetSeasonName === '')
        {
            return;
        }
        setIsLoading(true)

        const currentLeagueCode = getLeagueCode(leagueName)

        var apiString = '';
        const rugbyVizCode = getRugbyVizLeagueCode(leagueName);

        const planetRugbyStandingsLeagueCodes = [
            { leagueName: 'top14', leagueCodes: ['1310036262'], playoffCutoffIndex: 6},
            { leagueName: 'sixNations', leagueCodes: ['1310035506'], playoffCutoffIndex: -1},
            { leagueName: 'u20SixNations', leagueCodes: ['1310031586'], playoffCutoffIndex: -1},
            { leagueName: 'rugbyChamp', leagueCodes: ['1310034091'], playoffCutoffIndex: -1},
            { leagueName: 'u20Championship', leagueCodes: ["1310035680", "1310035681", "1310035682"], playoffCutoffIndex: 2},
            { leagueName: 'rugbyWorldCup', leagueCodes: ['1310029544', '1310029546', '1310029547', '1310029548'], playoffCutoffIndex: 2},
        ];

        const ESPNRugbyStandingsLeagueCodes = [
            { leagueName: 'sixNations', leagueCode: '180659', playoffCutoffIndex: -1},
            { leagueName: 'superRugby', leagueCode: '242041', playoffCutoffIndex: 8},
            { leagueName: 'rugbyChamp', leagueCode: '244293', playoffCutoffIndex: -1},
        ];

        if(leagueName == "worldRankings")
        {
            apiString = 'https://api.wr-rims-prod.pulselive.com/rugby/v3/rankings/mru?language=en';

            const worldRankings = await fetch( apiString,).then((res) => res.json())
            const newArray = getWorldRankingsData(worldRankings)

            console.info(newArray)
            setStandingsArray(newArray)
        }
        // uses rugbyViz API
        else if(rugbyVizCode !== undefined)
        {
            const seasonNumber = Number(targetSeasonName) - 1;
            apiString = 'https://rugby-union-feeds.incrowdsports.com/v1/tables/'+rugbyVizCode+'?provider=rugbyviz&season='+ seasonNumber +'01';
            console.info(apiString)

            const seasonStandingsRugViz = await fetch( apiString,).then((res) => res.json())
            if(seasonStandingsRugViz.data == undefined)
            {
                setIsLoading(false)
                return;
            }

            const playoffIndex = getRugbyVizPlayoffCutoffFromLeagueName(leagueName)
            const newArray = getAllStandingsDataRugbyViz(seasonStandingsRugViz, leagueName, playoffIndex)

            console.info(newArray)
            setStandingsArray(newArray)

            if(leagueName == "challengeCup")
            {
                const champsCupCode = "1008"
                // challenge cup needs secondary standings
                const secondaryApiString = 'https://rugby-union-feeds.incrowdsports.com/v1/tables/'+champsCupCode+'?provider=rugbyviz&season='+ seasonNumber +'01';
                const secondarySeasonStandingsRugViz = await fetch( secondaryApiString,).then((res) => res.json())
                const secondaryArray = getAllStandingsDataRugbyViz(secondarySeasonStandingsRugViz, 'championsCup', playoffIndex)
                setSecondaryStandingsArray(secondaryArray)
            }
        }
        // ESPN rugby API
        else if(ESPNRugbyStandingsLeagueCodes.find((element) => element.leagueName == leagueName) !== undefined)
        {
            const ESPNRugbyAPILeagueCode = ESPNRugbyStandingsLeagueCodes.find((element) => element.leagueName == leagueName)?.leagueCode;

            const seasonNumber = Number(targetSeasonName);
            apiString = 'https://site.web.api.espn.com/apis/v2/sports/rugby/'+ESPNRugbyAPILeagueCode+'/standings?lang=en&region=gb&season='+seasonNumber+'&seasontype=1&sort=rank:asc&type=0';
            console.info(apiString)

            const seasonStandingsESPN = await fetch( apiString,).then((res) => res.json())
            const newArray = getAllStandingsData(seasonStandingsESPN)
            setStandingsArray(newArray)
        }
        // use planet rugby API for standings
        else if(planetRugbyStandingsLeagueCodes.find((element) => element.leagueName == leagueName) !== undefined)
        {
            const planetRugbyAPILeagueCodes = planetRugbyStandingsLeagueCodes.find((element) => element.leagueName == leagueName)?.leagueCodes;
            const planetRugbyAPIPlayoffCutoffIndex = planetRugbyStandingsLeagueCodes.find((element) => element.leagueName == leagueName)?.playoffCutoffIndex;

            if(planetRugbyAPILeagueCodes == undefined) return;

            if(planetRugbyAPILeagueCodes.length > 1)
            {
                var pooledArray:StandingInfo[] = [];

                for (let index = 0; index < planetRugbyAPILeagueCodes.length; index++) {

                    apiString = 'https://rugbylivecenter.yormedia.com/api/all-league-tables/'+planetRugbyAPILeagueCodes[index];

                    const seasonStandingsPlanetRugby = await fetch( apiString,).then((res) => res.json())
                    const newArray = getAllStandingsDataPlanetRugby(seasonStandingsPlanetRugby, true, index == planetRugbyAPILeagueCodes.length - 1, planetRugbyAPIPlayoffCutoffIndex) 
                    pooledArray.push(...newArray)
                }

                console.info(pooledArray)
                setStandingsArray(pooledArray)
                setIsLoading(false)
                return;
            }

            apiString = 'https://rugbylivecenter.yormedia.com/api/all-league-tables/'+planetRugbyAPILeagueCodes[0];

            const seasonStandingsPlanetRugby = await fetch( apiString,).then((res) => res.json())
            const newArray = getAllStandingsDataPlanetRugby(seasonStandingsPlanetRugby, false, true, planetRugbyAPIPlayoffCutoffIndex)

            console.info(newArray)
            setStandingsArray(newArray)

            setIsLoading(false)
        }
        
        setIsLoading(false)
    }

    const handleOnChangeLeague = async (item: DropdownData) => {
        setLeagueName(item.value)
        setSeasonName('')
        setStandingsArray([])
    }

    const handleOnChangeSeason = (item: DropdownData) => {
        setSeasonName(item.value)
        setStandingsArray([])
        handlePressFetchData(item.value)
    }

    const leagueData = [
        { label: 'URC', value: 'urc', logo: URCAltLogo, hasKnockouts: true, knockoutsYears: ['2025','2024', '2023', '2022'] },
        { label: 'Premiership', value: 'prem', logo: PremiershipAltLogo, hasKnockouts: true, knockoutsYears: ['2025','2024', '2023', '2022']},
        { label: 'Top 14', value: 'top14', logo: Top14AltLogo, hasKnockouts: true, knockoutsYears: ['2025','2024', '2023', '2022'] },
        { label: 'Champions Cup', value: 'championsCup', logo: ChampionsCupAltLogo, hasKnockouts: true, knockoutsYears: ['2025','2024'] },
        { label: 'Challenge Cup', value: 'challengeCup', logo: ChallengeCupAltLogo, hasKnockouts: true, knockoutsYears: ['2025','2024'] },
        { label: 'Super Rugby', value: 'superRugby', logo: SuperRugbyAltLogo, hasKnockouts: false, knockoutsYears: ['2025','2024', '2023', '2022']},
        { label: 'Six Nations', value: 'sixNations', logo: SixNationsAltLogo, hasKnockouts: false, knockoutsYears: [] },
        { label: 'U20 Six Nations', value: 'u20SixNations', logo: SixNationsAltLogo, hasKnockouts: false, knockoutsYears: [] },
        { label: 'Rugby Championship', value: 'rugbyChamp', logo: RugbyChampAltLogo, hasKnockouts: false, knockoutsYears: []},
        { label: 'Rugby World Cup', value: 'rugbyWorldCup', logo: WorldCupAltLogo, hasKnockouts: true, knockoutsYears: ['2025','2024', '2023', '2022']},
        { label: 'U20 Championship', value: 'u20Championship', logo: WorldCupAltLogo, hasKnockouts: true, knockoutsYears: ['2025','2024', '2023', '2022']},
        { label: 'World Rankings', value: 'worldRankings', logo: RankingsLogo, hasKnockouts: false, knockoutsYears: []}
    ];

    const seasonWorldCupData = [
        { label: '2023', value: '2023' },
        { label: '2019', value: '2019' },
        { label: '2015', value: '2015' },
        { label: '2011', value: '2011' },
        { label: '2007', value: '2007' },
        { label: '2003', value: '2003' },
        { label: '1999', value: '1999' },
        { label: '1995', value: '1995' },
        { label: '1991', value: '1991' },
        { label: '1987', value: '1987' },
    ];

    const seasonManualData = [
        {label: "2024/25", value: "2025"},
        {label: "2023/24", value: "2024"},
        {label: "2022/23", value: "2023"},
        {label: "2021/22", value: "2022"}
    ];

    const seasonSingleData = [
        { label: '2024/25', value: '2025' },
    ]

    var currentSeasonData;

    switch(leagueName) { 
        case "urc": { 
           currentSeasonData = seasonManualData; 
           break; 
        } 
        case "prem": { 
            currentSeasonData = seasonManualData; 
            break; 
        } 
        case "top14": { 
            currentSeasonData = seasonSingleData; 
            break; 
        }
        case "superRugby": { 
            currentSeasonData = seasonManualData; 
            break; 
        }
        case "championsCup": { 
            currentSeasonData = seasonManualData; 
            break; 
        }
        case "sixNations": { 
            currentSeasonData = seasonManualData; 
            break; 
        } 
        case "rugbyWorldCup": { 
            currentSeasonData = seasonWorldCupData; 
           break; 
        }
        default: { 
            currentSeasonData = seasonManualData; 
           break; 
        }
    } 

    const isSeasonDropdownDisabled = leagueName == "worldRankings" || leagueName == "u20SixNations"
     || leagueName == "top14" || leagueName == "u20Championship" || leagueName == "rugbyWorldCup"

    useEffect(() => {

        if(isSeasonDropdownDisabled)
        {
            handlePressFetchData('2024')
        }
        
    }, [leagueName]);

    const headerRender = (isWorldRanking: boolean, eventsArray: StandingInfo[]) => {

        if(eventsArray == undefined || eventsArray.length == 0)
        {
            return;
        }

        if (isWorldRanking) {
            return (
                <View style={{ flexDirection: 'row' }}>
                        <Text style={[standingsHeadingStyles.seasonTitle, { width: "60%", textAlign: 'left' }]}> #        Team</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "40%" }]}>Points</Text>
                </View>
            )
        }
        else {
            return (
                <>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[standingsHeadingStyles.seasonTitle, { width: "40%", textAlign: 'left' }]}> #    Team</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>GP</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>W</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>D</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>L</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "15%" }]}>PD</Text>
                        <Text style={[standingsHeadingStyles.headerStat, { width: "9%" }]}>P</Text>
                    </View>

                </>
            )
        }
    }

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

    // renders
	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

    const getDefaultRoundButton = (knockoutsArray: MatchInfo[]) => {

        const roundMapping = {
            'R16': 'r16',
            'QF': 'quaterFinals',
            'SF': 'semiFinals',
            'GF': 'final'
        };
        
        const roundTypes = Object.entries(roundMapping)
            .filter(([key]) => knockoutsArray.some(obj => obj.matchTitle === key))
            .map(([_, value]) => value);

        console.info(`Default Value: ${roundTypes[0]}`)

        return roundTypes[0]
    }

    const [knockoutRoundName, setKnockoutRoundName] = useState<string>(getDefaultRoundButton(knockoutsArray));

    const handlePresentModalPress = useCallback( async () => {

        console.info("pressed")
        console.info(leagueName)
        console.info(seasonName)
        setKnockoutsArray([])

        // get knockouts info
        bottomSheetModalRef.current?.present();
        const knockoutFixtures = await fetchRugbyVizKnockoutFixtures(leagueName, seasonName)
        setKnockoutsArray(knockoutFixtures)
        setKnockoutRoundName(getDefaultRoundButton(knockoutFixtures))

    }, [leagueName, seasonName]);
    
    const knockoutsButton = () => {

        var leagueHasKnockouts = false;
        var seasonHasKnockouts = false;

        if(leagueName !== '')
        {
            const targetIndex = leagueData.findIndex(item => item.value === leagueName);
            leagueHasKnockouts = leagueData[targetIndex].hasKnockouts;
            seasonHasKnockouts = leagueData[targetIndex].knockoutsYears.includes(seasonName)
            console.info(`Season Name: ${seasonName}`)
        }

        if (standingsArray.length == 0 || !leagueHasKnockouts || !seasonHasKnockouts) {
            return <View style={{ backgroundColor: 'transparent', marginBottom: 60, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                        <Text></Text>
                    </View>
        }
        else {
            return (
                <TouchableOpacity style={{ backgroundColor: "#0d0c0c", marginBottom: 60, borderTopColor: 'lightgrey',
                borderTopWidth: 0.5, borderRightColor: 'lightgrey', borderRightWidth: 0.5, borderLeftColor: 'lightgrey', borderLeftWidth: 0.5,
                 borderTopRightRadius: 10, borderTopLeftRadius: 10 }} activeOpacity={0.8} onPress={handlePresentModalPress}>
                    <Text style={{ color: colors.text, fontFamily: fontFamilies.bold, textAlign: 'center', padding: 5 }}>KNOCKOUTS</Text>
                </TouchableOpacity>
            )
        }
    }

    const snapPoints = ["100%"];

    const handleNewRoundChosen = (roundName: string) => {
        setKnockoutRoundName(roundName)
    }

    return (

    <GestureHandlerRootView>

    <BottomSheetModalProvider>
    
        <View style={defaultStyles.container}>

        <LeagueSelectDropdown
        placeholder="Select League" 
        data={leagueData}
        onChangeSelection={handleOnChangeLeague}
        isDisabled={false}
        value={leagueName}
        iconName="trophy-outline"/>

        <CustomSelectDropdown
        placeholder="Select Season" 
        data={currentSeasonData}
        onChangeSelection={handleOnChangeSeason}
        isDisabled={isSeasonDropdownDisabled}
        value={seasonName}
        iconName="calendar-range"/>

        {activityIndicatorHeader()}
        {headerRender(leagueName == "worldRankings", standingsArray)}
        
        <FlatList 
        data={standingsArray}
        ListEmptyComponent={
            <View style={{ marginTop: 20, marginHorizontal: 5 }}>
                <Text style={{ fontSize: fontSize.sm, color: 'rgba(70,70,70,0.9)', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Standing Found</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                    <FontAwesome6 name="list" size={80} color={'rgba(40,40,40,0.9)'} />
                </View>
            </View>
        }
        renderItem={({item, index}) => 
        <StandingPanel
            index={index}
            league={leagueName}
            isHeader={item.isHeader}
            isWorldRanking={leagueName == "worldRankings"}
            teamPool={item.teamPool}
            teamName={item.teamName}
            teamGP={item.teamGP}
            teamWins={item.teamWins}
            teamDraws={item.teamDraws}
            teamLosses={item.teamLosses}
            teamPD={item.teamPD}
            teamPoints={item.teamPoints}
            ranking={item.ranking}
            isLastItem={item.isLastItem}
            isEndOfList={item.isEndOfList}
            isPlayoffCutoff={item.isPlayoffCutoff} />}
        />

        {knockoutsButton()}

        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            enableOverDrag={false}
            backdropComponent={renderBackdrop}
            //handleStyle={}
            handleIndicatorStyle={{backgroundColor: 'lightgrey'}}
            backgroundStyle={{backgroundColor: "#0d0c0c", borderColor: 'lightgrey', borderWidth: 0.5}}
            >
            <BottomSheetView style={{flex: 1}}>
               <KnockoutsPanel 
               standingsArray={standingsArray}
               secondaryStandingsArray={secondaryStandingsArray}
               knockoutFixturesArray={knockoutsArray}
               leagueName={leagueName}
               chosenKnockoutRound={knockoutRoundName}
               handleChooseRound={handleNewRoundChosen}/>
               
            </BottomSheetView>
            </BottomSheetModal>

        </View>

    </BottomSheetModalProvider>

    </GestureHandlerRootView>
    )
}

export const standingsHeadingStyles = StyleSheet.create({
    seasonTitle: {
        textAlign: 'left',
        fontSize: 13,
        fontWeight: 500,
        color: 'grey',
        fontFamily: fontFamilies.bold
    },
    headerStat: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 500,
        color: 'grey',
        fontFamily: fontFamilies.bold
    },
  })


export default StandingsScreen