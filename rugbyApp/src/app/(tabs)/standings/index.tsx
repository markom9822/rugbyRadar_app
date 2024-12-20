import { defaultStyles} from "@/styles"
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from "react-native"
import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { useCallback, useEffect, useRef, useState } from "react"
import { CustomSelectDropdown, DropdownData, LeagueSelectDropdown, TestLeagueSelectDropdown } from "@/store/components/SelectDropdown"
import { generateSeasonList, getLeagueCode, getPlanetRugbyAPILeagueCode, getRugbyVizLeagueCode, getRugbyVizPlayoffCutoffFromLeagueName, getWorldRugbyAPILeagueCode, isLeagueInPlanetRugbyAPI, isLeagueInPlanetRugbyAPIFromLeagueName, isLeagueInWorldRugbyAPIFromLeagueName } from "@/store/utils/helpers"
import { getAllStandingsData, getAllStandingsDataPlanetRugby, getAllStandingsDataRugbyViz, getAllStandingsDataWorldRugbyAPI } from "@/store/utils/standingsGetter"
import { StandingPanel } from "@/store/components/StandingPanel"
import { ChallengeCupAltLogo, ChampionsCupAltLogo, PremiershipAltLogo, RankingsLogo, RugbyChampAltLogo, SixNationsAltLogo, SuperRugbyAltLogo, Top14AltLogo, URCAltLogo, WorldCupAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import {FontAwesome6} from '@expo/vector-icons'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { MatchInfo } from "../(fixtures)"
import { fetchRugbyVizKnockoutFixtures } from "@/store/utils/knockoutFixturesGetter"
import { getHomeAwayTeamInfo } from "@/store/utils/getTeamInfo"

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
            { leagueName: 'superRugby', leagueCodes: ['1310032187'], playoffCutoffIndex: 8},
            { leagueName: 'sixNations', leagueCodes: ['1310031041'], playoffCutoffIndex: -1},
            { leagueName: 'u20SixNations', leagueCodes: ['1310031586'], playoffCutoffIndex: -1},
            { leagueName: 'rugbyChamp', leagueCodes: ['1310034091'], playoffCutoffIndex: -1},
            { leagueName: 'u20Championship', leagueCodes: ["1310035680", "1310035681", "1310035682"], playoffCutoffIndex: 2},
            { leagueName: 'rugbyWorldCup', leagueCodes: ['1310029544', '1310029546', '1310029547', '1310029548'], playoffCutoffIndex: 2},
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
        { label: 'URC', value: 'urc', logo: URCAltLogo },
        { label: 'Premiership', value: 'prem', logo: PremiershipAltLogo },
        { label: 'Top 14', value: 'top14', logo: Top14AltLogo },
        { label: 'Champions Cup', value: 'championsCup', logo: ChampionsCupAltLogo },
        { label: 'Challenge Cup', value: 'challengeCup', logo: ChallengeCupAltLogo },
        { label: 'Super Rugby', value: 'superRugby', logo: SuperRugbyAltLogo },
        { label: 'Six Nations', value: 'sixNations', logo: SixNationsAltLogo },
        { label: 'U20 Six Nations', value: 'u20SixNations', logo: SixNationsAltLogo },
        { label: 'Rugby Championship', value: 'rugbyChamp', logo: RugbyChampAltLogo },
        { label: 'Rugby World Cup', value: 'rugbyWorldCup', logo: WorldCupAltLogo },
        { label: 'U20 Championship', value: 'u20Championship', logo: WorldCupAltLogo },
        { label: 'World Rankings', value: 'worldRankings', logo: RankingsLogo}
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

    const seasonSingleData = [
        { label: '2024/25', value: '2025' },
    ]

    var currentSeasonData;

    switch(leagueName) { 
        case "urc": { 
           currentSeasonData = seasonDates; 
           break; 
        } 
        case "prem": { 
            currentSeasonData = seasonDates; 
            break; 
        } 
        case "top14": { 
            currentSeasonData = seasonSingleData; 
            break; 
        }
        case "superRugby": { 
            currentSeasonData = seasonDates; 
            break; 
        }
        case "championsCup": { 
            currentSeasonData = seasonDates; 
            break; 
        }
        case "sixNations": { 
            currentSeasonData = seasonSingleData; 
            break; 
        } 
        case "rugbyWorldCup": { 
            currentSeasonData = seasonWorldCupData; 
           break; 
        }
        default: { 
            currentSeasonData = seasonDates; 
           break; 
        }
    } 

    const isSeasonDropdownDisabled = leagueName == "worldRankings" || leagueName == "sixNations" || leagueName == "u20SixNations"
     || leagueName == "top14" || leagueName == "rugbyChamp" || leagueName == "superRugby" || leagueName == "u20Championship" || leagueName == "rugbyWorldCup"

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

    const handlePresentModalPress = useCallback( async () => {

        console.info("pressed")
        // get knockouts info

        bottomSheetModalRef.current?.present();

        const knockoutFixtures = await fetchRugbyVizKnockoutFixtures('urc', '2023')
        setKnockoutsArray(knockoutFixtures)

    }, []);

    const snapPoints = ["58%", "78%"];

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

        <TouchableOpacity style={{backgroundColor: colors.altBackground, marginBottom: 60}} activeOpacity={0.8} onPress={handlePresentModalPress}>
            <Text style={{color: colors.text, fontFamily: fontFamilies.bold, textAlign: 'center'}}>KNOCKOUT</Text>
        </TouchableOpacity>

        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
            backdropComponent={renderBackdrop}
            //handleStyle={}
            //handleIndicatorStyle={}
            backgroundStyle={{backgroundColor: colors.altBackground}}
            >
            <BottomSheetView style={{flex: 1}}>
               <KnockoutsPanel knockoutFixturesArray={knockoutsArray}/>
            </BottomSheetView>
            </BottomSheetModal>

        </View>

    </BottomSheetModalProvider>

    </GestureHandlerRootView>
    )
}

type KnockoutsPanelProps = {
    knockoutFixturesArray: MatchInfo[]
    
}

export const KnockoutsPanel = ({ knockoutFixturesArray }: KnockoutsPanelProps) => {

    const [knockoutRoundName, setKnockoutRoundName] = useState<string>('quaterFinals');

    const knockoutRoundRender = (knockoutRoundName: string) => {

        if (knockoutRoundName == "quaterFinals") {

            const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "QF");

            return (
                <View style={{flexDirection: 'column', height: "80%", justifyContent: 'center'}}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ flexDirection: 'column', width: "80%"}}>
                            <KnockoutsFixture fixtureInfo={filteredArray[0]} leagueName="urc"/>
                            <KnockoutsFixture fixtureInfo={filteredArray[3]} leagueName="urc" />
                        </View>

                        <View style={{ position: 'absolute', bottom: "25%", right: 0, left: "80%", top: "25%", width: "10%", height: "50%", }}>
                            <View style={{ height: "100%",
                                borderRightColor: 'white', borderRightWidth: 1, borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1
                            }}>
                                <Text></Text>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', bottom: "50%", right: 0, left: "90%", top: "50%", width: "10%", height: "1%" }}>
                            <View style={{borderTopColor: 'white', borderTopWidth: 1 }}>
                                <Text></Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ flexDirection: 'column', width: "80%"}}>
                            <KnockoutsFixture fixtureInfo={filteredArray[1]} leagueName="urc" />
                            <KnockoutsFixture fixtureInfo={filteredArray[2]} leagueName="urc" />
                        </View>

                        <View style={{ position: 'absolute', bottom: "25%", right: 0, left: "80%", top: "25%", width: "10%", height: "50%", }}>
                            <View style={{ height: "100%",
                                borderRightColor: 'white', borderRightWidth: 1, borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1
                            }}>
                                <Text></Text>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', bottom: "50%", right: 0, left: "90%", top: "50%", width: "10%", height: "1%" }}>
                            <View style={{borderTopColor: 'white', borderTopWidth: 1 }}>
                                <Text></Text>
                            </View>
                        </View>
                    </View>

                </View>
                
            )
        }
        else if (knockoutRoundName == "semiFinals") {

            const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "SF");

            return (
                <View style={{flexDirection: 'column',  height: "80%", justifyContent: 'center'}}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ flexDirection: 'column', width: "80%", gap: 80}}>
                            <KnockoutsFixture fixtureInfo={filteredArray[1]} leagueName="urc" />
                            <KnockoutsFixture fixtureInfo={filteredArray[0]} leagueName="urc" />
                        </View>

                        <View style={{ position: 'absolute', bottom: "25%", right: 0, left: "80%", top: "25%", width: "10%", height: "50%", }}>
                            <View style={{ height: "100%",
                                borderRightColor: 'white', borderRightWidth: 1, borderTopColor: 'white', borderTopWidth: 1, borderBottomColor: 'white', borderBottomWidth: 1
                            }}>
                                <Text></Text>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', bottom: "50%", right: 0, left: "90%", top: "50%", width: "10%", height: "1%" }}>
                            <View style={{borderTopColor: 'white', borderTopWidth: 1 }}>
                                <Text></Text>
                            </View>
                        </View>
                    </View>

                </View>
                
            )
        }
        else if (knockoutRoundName == "final") {

            const filteredArray = knockoutFixturesArray.filter(item => item.matchTitle == "GF");

            return (
                <View style={{flexDirection: 'column', height: "80%", justifyContent: 'center'}}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ flexDirection: 'column', width: "100%"}}>
                            <KnockoutsFixture fixtureInfo={filteredArray[0]} leagueName="urc" />
                        </View>
                    </View>

                </View>
                
            )
        }
    }

    const handlePressRoundButton = (roundName: string) => {
        setKnockoutRoundName(roundName)
    }


    return (
        <View>
            <View>
                <Text style={{color: colors.text, fontFamily: fontFamilies.bold, textAlign: 'center', fontSize: fontSize.sm}}>KNOCKOUTS</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={[knockoutPanelStyles.roundButton, {backgroundColor: knockoutRoundName == 'quaterFinals' ? 'lightgrey' : 'grey'}]} 
            onPress={() => handlePressRoundButton('quaterFinals')}>
                <Text style={[knockoutPanelStyles.roundText, {color: knockoutRoundName == 'quaterFinals' ? 'black':'white'}]}>QUARTER FINALS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[knockoutPanelStyles.roundButton, {backgroundColor: knockoutRoundName == 'semiFinals' ? 'lightgrey' : 'grey'}]}
            onPress={() => handlePressRoundButton('semiFinals')}>
                <Text style={[knockoutPanelStyles.roundText, {color: knockoutRoundName == 'semiFinals' ? 'black':'white'}]}>SEMI FINALS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[knockoutPanelStyles.roundButton, {backgroundColor: knockoutRoundName == 'final' ? 'lightgrey' : 'grey'}]}
            onPress={() => handlePressRoundButton('final')}>
                <Text style={[knockoutPanelStyles.roundText, {color: knockoutRoundName == 'final' ? 'black':'white'}]}>FINAL</Text>
            </TouchableOpacity>
            </View>

            {knockoutRoundRender(knockoutRoundName)}
            
        </View>
        
    )

}

type KnockoutsFixtureProps = {
    leagueName: string,
    fixtureInfo: MatchInfo
    
}

export const KnockoutsFixture = ({ leagueName, fixtureInfo }: KnockoutsFixtureProps) => {

    if(fixtureInfo == undefined || fixtureInfo == null)
    {
        return;
    }

    const homeAwayInfo = getHomeAwayTeamInfo(leagueName, fixtureInfo.homeTeam, fixtureInfo.awayTeam);
    const homeTeamInfo = homeAwayInfo?.homeInfo;
    const awayTeamInfo = homeAwayInfo?.awayInfo;

    const homeTeamScore = fixtureInfo.homeScore;
    const awayTeamScore = fixtureInfo.awayScore;
    const matchVenue = fixtureInfo.matchVenue;

    if(homeTeamInfo === null) return
    if(awayTeamInfo === null) return
    if(homeTeamInfo === undefined) return
    if(awayTeamInfo === undefined) return

    const homeFontFamily = (new Number(homeTeamScore) > new Number(awayTeamScore)) ? (fontFamilies.bold):(fontFamilies.light);
    const awayFontFamily = (new Number(awayTeamScore) > new Number(homeTeamScore)) ? (fontFamilies.bold):(fontFamilies.light);

    return(
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, marginHorizontal: 10, marginVertical: 10, padding: 5, borderRadius: 4}}>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 12}}>{homeTeamInfo?.abbreviation}</Text>
                 <View style={{paddingHorizontal: 10}}>
                    <Image
                        style={[knockoutPanelStyles.teamLogo]}
                        source={homeTeamInfo.logo} />
                </View>
                <View style={{padding: 4, flexDirection: 'row'}}>
                    <Text style={{color: colors.text, fontFamily: homeFontFamily, paddingHorizontal: 5}}>{homeTeamScore}</Text>
                    <Text style={{color: colors.text, fontFamily: awayFontFamily, paddingHorizontal: 5}}>{awayTeamScore}</Text>
                </View>
                <View style={{paddingHorizontal: 10}}>
                    <Image
                        style={[knockoutPanelStyles.teamLogo]}
                        source={awayTeamInfo.logo} />
                </View>
                <Text style={{color: colors.text, fontFamily: fontFamilies.bold, fontSize: 12}}>{awayTeamInfo?.abbreviation}</Text>
            </View>

            <View style={{padding: 3}}>
                <Text style={{color: 'lightgrey', fontFamily: fontFamilies.light, fontSize: 11}}>{matchVenue}</Text>
            </View>
        </View>
    )
}



export const knockoutPanelStyles = StyleSheet.create({
    roundText: {
        fontFamily: fontFamilies.bold,
        textAlign: 'center',
        fontSize: fontSize.xs, 
        padding: 6
    },

    roundButton: {
       margin: 10,
       borderRadius: 5
    },

    teamLogo: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        minHeight:25,
        minWidth: 25
    },
  })

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