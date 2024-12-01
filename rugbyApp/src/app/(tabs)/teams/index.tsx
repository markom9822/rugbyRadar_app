import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { InternationalRugbyTeams } from "@/store/InternationalRugbyTeamsDatabase"
import { PremRugbyTeams } from "@/store/PremiershipRubyTeamsDatabase"
import { Top14RugbyTeams } from "@/store/Top14RugbyTeamsDatabase"
import { URCRugbyTeams } from "@/store/URCRugbyTeamsDatabase"
import { useState } from "react"
import { Link } from "expo-router"
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Image, StyleSheet, Pressable, SectionList, TouchableOpacity } from "react-native"
import { hexToRGB, isLastItemInSectionList } from "@/store/utils/helpers"
import { SuperRugbyTeams } from "@/store/SuperRugbyPacificRugbyTeamsDatabase"
import { InternationalLogo, PremiershipAltLogo, SuperRugbyAltLogo, Top14AltLogo, URCAltLogo } from "@/store/LeagueLogos/LeagueLogos"
import {FontAwesome6} from '@expo/vector-icons'

export type SearchTeamInfo = {
    type: string;
    displayName: string;
    abbreviation: string;
    logo: any;
    altLogo: any,
    colour: string;
    id: string;
}

export type TeamsSection = {
    title: string;
    data: SearchTeamInfo[];
};

export const filterTeams = (teamArray: SearchTeamInfo[], searchString: string) => {

    const filteredItems = teamArray.filter(item => {
        return Object.values(item.displayName)
            .join('')
            .toLowerCase()
            .includes(searchString.toLowerCase());
    });

    return(
        filteredItems
    )
    
}

export const filterSectionList = (teamsSections: TeamsSection[], search: string) => {

    var filteredSections = [];

    if(search == "")
    {
        return []
    }

    for (let index = 0; index < teamsSections.length; index++) {
        
        let newSection = {
            title: teamsSections[index].title,
            data: filterTeams(teamsSections[index].data, search)
        }

        filteredSections.push(newSection)
    }

    return (
        filteredSections
    )
}


const getFilteredSearchTeams = (teamSections: TeamsSection[], searchValue: string) => {

    const filteredSections = filterSectionList(teamSections, searchValue)

    return (
        filteredSections
    )
}

const TeamsScreen = () => {

    const teamSections = [
        {
            title: 'International',
            data: InternationalRugbyTeams,
        },
        {
            title: 'United Rugby Championship',
            data: URCRugbyTeams,
        },
        {
            title: 'Premiership',
            data: PremRugbyTeams,
        },
        {
            title: 'Top 14',
            data: Top14RugbyTeams,
        },
        {
            title: 'Super Rugby',
            data: SuperRugbyTeams,
        },
    ]

    const teamLeagueLogos = [
        { displayName: 'United Rugby Championship', leagueLogo: URCAltLogo},
        { displayName: 'Premiership', leagueLogo: PremiershipAltLogo},
        { displayName: 'Top 14', leagueLogo: Top14AltLogo},
        { displayName: 'Super Rugby', leagueLogo: SuperRugbyAltLogo},
        { displayName: 'International', leagueLogo: InternationalLogo},
    ];

    const [teamSearch, setTeamSearch] = useState<string>('');
    const [searchSections, setSearchSections] = useState<TeamsSection[]>([]);

    const getLeagueLogoFromDisplayName  = (displayName: string) => {
    
        const result = teamLeagueLogos.find((element) => element.displayName == displayName)
        return result
    }

    const handleOnSearchTextChange = (search: string) => {
        setTeamSearch(search)
        setSearchSections(getFilteredSearchTeams(teamSections, search))
    }

    const sectionHeader = (title: string, data: SearchTeamInfo[]) => {

        if(data.length !== 0)
        {
            return (
                <View style={{marginTop: 12, marginBottom: 3,  marginHorizontal: 5, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{paddingHorizontal: 10}}>
                    <Image
                        style={{resizeMode: 'contain',
                            width: 20,
                            height: 20,
                            minHeight:20,
                            minWidth: 20}}
                        source={getLeagueLogoFromDisplayName(title)?.leagueLogo} />
                </View>
                <Text style={{fontSize: 13, color: 'grey', fontWeight: 600, fontFamily: fontFamilies.bold}}>{title.toUpperCase()}</Text>
            </View>
            )
        }
        
        return null
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: colors.background}}>

                <TextInput
                    style={{ height: 40, margin: 12, borderRadius: 4 , 
                        borderColor: 'grey', borderWidth: 1, padding: 10, color: colors.text, fontFamily: fontFamilies.light }}
                    returnKeyType="search"
                    placeholder="Search teams"
                    placeholderTextColor={colors.text}
                    cursorColor={'lightgrey'}
                    onChangeText={(search) => handleOnSearchTextChange(search)}
                    value={teamSearch}
                />

                <SectionList
                    sections={searchSections}
                    keyExtractor={(item, index) => item.id + index}
                    ListEmptyComponent={
                        <View style={{ marginTop: 20, marginHorizontal: 5 }}>
                            <Text style={{ fontSize: fontSize.sm, color: 'rgba(70,70,70,0.9)', fontWeight: 300, textAlign: 'center', fontFamily: fontFamilies.light }}>No Matching Team</Text>
                            <View style={{justifyContent:'center', alignItems: 'center', margin: 30}}>
                            <FontAwesome6 name="shield-halved" size={80} color={'rgba(40,40,40,0.9)'}/>
                            </View>  
                        </View>
                    }
                    renderItem={({ item, index, section }) =>
                        <TeamInfoPanel
                            teamName={item.displayName}
                            teamColour={item.colour}
                            teamLogo={item.logo}
                            teamAltLogo={item.altLogo}
                            teamID={item.id}
                            isLastItem={isLastItemInSectionList(index, section, searchSections)}
                        />}
                    renderSectionHeader={({ section: { title, data } }) => (
                        sectionHeader(title, data)
                    )}
                />

            </View>
        </TouchableWithoutFeedback>
    )
}

type TeamInfoPanelProps = {
    teamName: string,
    teamColour: string,
    teamLogo: any,
    teamAltLogo: any,
    teamID: string,
    isLastItem: boolean
}

export const TeamInfoPanel = ({ teamName, teamColour, teamLogo, teamAltLogo, teamID, isLastItem }: TeamInfoPanelProps) => {

    const teamBkgRBGA = hexToRGB(teamColour, '0.05')
    const teamBorderRBGA = hexToRGB(teamColour, '0.4')

    return (
        <View style={{ backgroundColor: colors.background, marginBottom: (isLastItem) ? 50: 0 }}>
            <Link href={`/(tabs)/teams/team/${teamID + teamName}`} asChild>
                <TouchableOpacity activeOpacity={0.5}>

                    <View style={[teamInfoPanelStyles.container,
                    { backgroundColor: teamBkgRBGA, borderColor: 'lightgrey', borderWidth: 2 }]}>
                        <View style={{ padding: 5, width: "20%", alignItems: 'center' }}>
                            <Image
                                style={[teamInfoPanelStyles.teamLogo]}
                                source={teamLogo} />
                        </View>
                        <View style={{width: "80%"}}>
                            <Text style={[teamInfoPanelStyles.teamName, { color: colors.text,}]}>{teamName.toLocaleUpperCase()}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </Link>

        </View>
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