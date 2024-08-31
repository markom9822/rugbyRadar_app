import { fontSize } from "@/constants/tokens"
import { CustomSelectDropdown } from "@/store/components/SelectDropdown"
import { InternationalRugbyTeams } from "@/store/InternationalRugbyTeamsDatabase"
import { PremRugbyTeams } from "@/store/PremiershipRubyTeamsDatabase"
import { Top14RugbyTeams } from "@/store/Top14RugbyTeamsDatabase"
import { URCRugbyTeams } from "@/store/URCRugbyTeamsDatabase"
import { defaultStyles } from "@/styles"
import { useState } from "react"
import { Link } from "expo-router"
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, Image, StyleSheet, Pressable} from "react-native"
import { hexToRGB } from "@/store/utils/helpers"

export type SearchTeamInfo = {
    type: string;
    displayName: string;
    abbreviation: string;
    logo: any;
    altLogo: any,
    colour: string;
    id: string;
}


const getFilteredSearchTeams = (teamsArray: SearchTeamInfo[], searchValue: string) => {

    const filteredData = teamsArray.filter(item => {
          return Object.values(item)
            .join('')
            .toLowerCase()
            .includes(searchValue.toLowerCase());
    });

    return (
        filteredData
    )
}

const TeamsScreen = () => {

    const teamsArray = [...InternationalRugbyTeams, ...URCRugbyTeams, ...PremRugbyTeams];;

    const [teamSearch, setTeamSearch] = useState<string>('');
    const [searchArray, setSearchArray] = useState<SearchTeamInfo[]>(teamsArray);


    const handleOnSearchTextChange = (search: string) => {
        setTeamSearch(search)
        setSearchArray(getFilteredSearchTeams(teamsArray, search))
    }
    
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Text style={defaultStyles.text}>Teams Screen</Text>

                <TextInput
                    style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
                    returnKeyType="search"
                    placeholder="Search teams"
                    onChangeText={(search) => handleOnSearchTextChange(search)}
                    value={teamSearch}
                    
                />

                <FlatList data={searchArray}
                    renderItem={({ item, index }) =>
                        <TeamInfoPanel
                        teamName={item.displayName}
                        teamColour={item.colour}
                        teamLogo={item.logo}
                        teamAltLogo={item.altLogo}
                        teamID={item.id}/>}
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
}

export const TeamInfoPanel = ({ teamName, teamColour, teamLogo, teamAltLogo, teamID }: TeamInfoPanelProps) => {

    const [selected, setSelected] = useState(false);

    const teamBkgRBGA = hexToRGB(teamColour, '0.7')
    const teamBorderRBGA = hexToRGB(teamColour, '0.9')

    const currentTeamLogo = selected ? teamAltLogo : teamLogo;

    return (
            <View style={{backgroundColor: '#f0f2f0'}}>
                <Link href={`/(tabs)/(teams)/team/${teamID}`} asChild>
                    <Pressable onPressIn={() => setSelected(true)} onPressOut={() => setSelected(false)} 
                    onBlur={() => setSelected(false)} onHoverOut={() => setSelected(false)}>

                    <View style={[teamInfoPanelStyles.container, 
                        {backgroundColor: selected ? teamBkgRBGA : "white", borderColor: selected ? teamBorderRBGA : 'lightgrey', borderWidth: 2}]}>
                        <View style={{ padding: 5 }}>
                            <Image
                                style={[teamInfoPanelStyles.teamLogo]}
                                source={currentTeamLogo} />
                        </View>
                        <Text style={[teamInfoPanelStyles.teamName, {color: selected ? "white" : "black" }]}>{teamName.toLocaleUpperCase()}</Text>
                    </View>

                    </Pressable>
                </Link>

            </View>
    )
}

export const teamInfoPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
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
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 18
    },
  })

export default TeamsScreen