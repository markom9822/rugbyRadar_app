import { colors, fontSize } from "@/constants/tokens";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ViewStyle, TouchableOpacity } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { useState } from "react";
import {tabletojson} from 'tabletojson';

export type SquadMember = {
    playerName: string,
    position: string,
    playerDOB: string,
    playerCaps: string,
    clubProvince: string,
   
}

export const getCurrentSquad = (squadDetails: any) => {

    var squadArray = []
    const squadLength = squadDetails.length

    for (let index = 0; index < squadLength; index++) {

        const playerName = squadDetails[index].Player;
        const position = squadDetails[index].Position;


        const newArray = {
            playerName: playerName,
            position: position,
            //playerDOB: string,
            //playerCaps: string,
            //clubProvince: string,
        };

    }

}



const TeamSummary = () => {

    const [currentSquadArray, setCurrentSquadArray] = useState<SquadMember[] | undefined>();

    const {teamID} = useLocalSearchParams();

    const handlePressFetchData = async () => {
        console.info("Pressed Fetch WIKI")

        const teamWikiPage = 'Ireland_national_rugby_union_team';
        const squadTableIndex = '7';

        //const apiString = 'https://wikitable2json.vercel.app/api/' + teamWikiPage + '?table=' + squadTableIndex;

        //const squadDetails = await fetch( apiString,).then((res) => res.json())

        //console.info(squadDetails[0].Player)

        tabletojson.convertUrl('https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes', function (tablesAsJson) {
            console.log(tablesAsJson[1]);
          });

    }

    return(
        <View>
            <Text>Team Name</Text>
            <Text>Team ID {teamID}</Text>

            <FetchDataButton 
            iconSize={24} 
            style={{
             backgroundColor: '#4287f5'
            }}
            onPressButton={handlePressFetchData}
            />

        </View>
    )


}

type FetchDataButtonProps = {
	style?: ViewStyle
	iconSize?: number
    onPressButton: () => void
}

export const FetchDataButton = ({ style, iconSize = 48, onPressButton}: FetchDataButtonProps) => {

    return (
    <View style={[{ height: 50}, style]}>
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPressButton}
        >
            <MaterialCommunityIcons name="rugby" size={iconSize} color={colors.text} />
            <Text style={{
                fontSize: fontSize.base,
                color: colors.text,
                backgroundColor: '#4287f5',
            }}>Fetch Wiki Data</Text>
        </TouchableOpacity>
    </View>
    )
}


export default TeamSummary;