import { colors, fontFamilies } from "@/constants/tokens"
import { GridView } from "@/store/components/GridView"
import { MultiTabBar } from "@/store/components/MultiTabBar"
import { SearchBar } from "@/store/components/SearchBar"
import { SearchLeagueInfoPanel } from "@/store/components/SearchLeagueInfoPanel"
import { SearchTeamInfoPanel } from "@/store/components/SearchTeamInfoPanel"
import { StandingsHeaderBanner } from "@/store/components/StandingsHeaderBanner"
import { InternationalRugbyTeams } from "@/store/InternationalRugbyTeamsDatabase"
import { InternationalLogo, PremiershipAltLogo, SuperRugbyAltLogo, Top14AltLogo, URCAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import { PremRugbyTeams } from "@/store/PremiershipRubyTeamsDatabase"
import { RugbyLeagues } from "@/store/RugbyLeaguesDatabase"
import { SuperRugbyTeams } from "@/store/SuperRugbyPacificRugbyTeamsDatabase"
import { Top14RugbyTeams } from "@/store/Top14RugbyTeamsDatabase"
import { URCRugbyTeams } from "@/store/URCRugbyTeamsDatabase"
import { hexToRGB } from "@/store/utils/helpers"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { useCallback, useRef, useState } from "react"
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

export type SearchTeamInfo = {
    type: string;
    displayName: string;
    abbreviation: string;
    logo: any;
    altLogo: any;
    colour: string;
    id: string;
    defaultLeague: string;
    foundedYear: string;
    seasonType: string;
}

export type SearchLeagueInfo = {
    value: string;
    displayName: string;
    abbreviation: string;
    logo: any;
    altLogo: any;
    colour: string;
    id: string;
    foundedYear: string;
    seasonType: string;
}

export type TeamsSection = {
    title: string;
    data: SearchTeamInfo[];
};

export const filterTeams = (teamArray: SearchTeamInfo[], searchString: string) => {

    if (searchString == "") {
        return []
    }

    const filteredItems = teamArray.filter(item => {
        return Object.values(item.displayName)
            .join('')
            .toLowerCase()
            .includes(searchString.toLowerCase());
    });

    return (
        filteredItems
    )
}

export const filterLeagues = (leagueArray: SearchLeagueInfo[], searchString: string) => {

    if (searchString == "") {
        return []
    }

    const filteredItems = leagueArray.filter(item => {
        return Object.values(item.displayName)
            .join('')
            .toLowerCase()
            .includes(searchString.toLowerCase());
    });

    return (
        filteredItems
    )
}


const TeamsScreen = () => {

    const teamsArray = [...InternationalRugbyTeams, ...URCRugbyTeams, ...PremRugbyTeams, ...Top14RugbyTeams, ...SuperRugbyTeams]

    const leaguesArray = RugbyLeagues;

    const teamLeagueLogos = [
        { displayName: 'United Rugby Championship', leagueLogo: URCAltLogo },
        { displayName: 'Premiership', leagueLogo: PremiershipAltLogo },
        { displayName: 'Top 14', leagueLogo: Top14AltLogo },
        { displayName: 'Super Rugby', leagueLogo: SuperRugbyAltLogo },
        { displayName: 'International', leagueLogo: InternationalLogo },
    ];

    const [teamSearch, setTeamSearch] = useState<string>('');
    const [searchTeamArray, setSearchTeamArray] = useState<SearchTeamInfo[]>([]);
    const [searchLeagueArray, setSearchLeagueArray] = useState<SearchLeagueInfo[]>([]);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [searchOption, setSearchOption] = useState<string>('Teams');


    const getLeagueLogoFromDisplayName = (displayName: string) => {

        const result = teamLeagueLogos.find((element) => element.displayName == displayName)
        return result
    }

    const handleOnSearchTextChange = (search: string) => {
        setTeamSearch(search)

        if (searchOption == "Teams") {
            setSearchTeamArray(filterTeams(teamsArray, search))
        }

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

    const snapPoints = ["100%"];

    const handlePresentModalPress = (id: string, index: number) => {

        //setCurrentID(linkID)
        setCurrentIndex(index)
        bottomSheetModalRef.current?.present();
    }

    const handlePressSearchOption = (option: string) => {
        setSearchOption(option)

        if (option == "Leagues") {
            setSearchLeagueArray(leaguesArray)
        }
    }

    const handleRenderGrid = (selectedOption: string) => {

        if (selectedOption == "Teams") {
            return (
                <GridView
                    data={searchTeamArray}
                    col={3}
                    renderItem={(item, index) =>
                        <GridSearchPanel
                            title={item.abbreviation}
                            colour={item.colour}
                            logo={item.logo}
                            altLogo={item.altLogo}
                            id={item.id}
                            index={index}
                            OnPress={handlePresentModalPress} />
                    } />)
        }
        else if (selectedOption == "Leagues") {
            return (
                <GridView
                    data={searchLeagueArray}
                    col={2}
                    renderItem={(item, index) =>
                        <GridSearchPanel
                            title={item.abbreviation}
                            colour={item.colour}
                            logo={item.logo}
                            altLogo={item.altLogo}
                            id={item.id}
                            index={index}
                            OnPress={handlePresentModalPress} />
                    } />)
        }

    }

    const handleRenderBottomSheet = (selectedOption: string) => {

        if (selectedOption == "Teams") {

            return (
                <SearchTeamInfoPanel
                    teamInfo={searchTeamArray[currentIndex]}
                    bottomSheetRef={bottomSheetModalRef}
                />
            )
        }
        else if (selectedOption == "Leagues") {
            return (
                <SearchLeagueInfoPanel
                    leagueInfo={searchLeagueArray[currentIndex]}
                    bottomSheetRef={bottomSheetModalRef}
                />
            )
        }
    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>

                <StandingsHeaderBanner />

                <View style={{ marginVertical: 7 }}>
                    <MultiTabBar tabsArray={["Teams", "Leagues"]} OnTabButtonPressed={handlePressSearchOption} currentTabKey={searchOption} />
                </View>

                {searchOption == "Teams" && (
                    <SearchBar searchValue={teamSearch} OnChangeSearch={handleOnSearchTextChange} />
                )}

                <ScrollView>
                    <View style={{ marginBottom: 50 }}>
                        {handleRenderGrid(searchOption)}
                    </View>
                </ScrollView>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    enableDynamicSizing={false}
                    enableOverDrag={false}
                    backdropComponent={renderBackdrop}
                    handleComponent={null}
                    handleIndicatorStyle={{ backgroundColor: 'lightgrey', width: "10%" }}
                    backgroundStyle={{ backgroundColor: "#0d0c0c" }}
                >
                    <BottomSheetView style={{ flex: 1 }}>
                        {handleRenderBottomSheet(searchOption)}
                    </BottomSheetView>
                </BottomSheetModal>

            </View>
        </TouchableWithoutFeedback>
    )
}

type GridSearchPanelProps = {
    title: string,
    colour: string,
    logo: any,
    altLogo: any,
    id: string,
    index: number,
    OnPress: (id: string, index: number) => void

}

export const GridSearchPanel = ({ title, colour, logo, altLogo, id, index, OnPress }: GridSearchPanelProps) => {

    const bkgRBGA = hexToRGB(colour, '0.1')
    const borderRBGA = hexToRGB(colour, '0.4')

    const panelColour = hexToRGB("#4d4b4b", '0.5')

    const handlePressedScorePanel = () => {

        OnPress(id, index)
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handlePressedScorePanel}>
            <View
                style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 5, backgroundColor: panelColour, borderRadius: 6, borderColor: 'grey', borderWidth: 0.5 }}>
                <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={[teamInfoPanelStyles.teamLogo]}
                        source={logo} />
                </View>
                <View style={{ padding: 5 }}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={[{ color: 'lightgrey', fontFamily: fontFamilies.bold }]}>{title}</Text>
                </View>

            </View>

        </TouchableOpacity>
    )
}

export const teamInfoPanelStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
        margin: 3,
        borderRadius: 4
    },
    teamLogo: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        minHeight: 50,
        minWidth: 50,
    },
    teamName: {
        paddingHorizontal: 10,
        textAlign: 'left',
        fontWeight: 600,
        fontSize: 18,
        fontFamily: fontFamilies.bold
    },
})

export default TeamsScreen