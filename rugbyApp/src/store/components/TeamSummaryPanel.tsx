import { View, Text, Image } from "react-native"
import { getAnyTeamInfoFromName, hexToRGB } from "../utils/helpers"
import { colors, fontSize } from "@/constants/tokens"
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'


type TeamSummaryPanelProps = {
    teamName: string | undefined
    homeVenue: string | undefined
    homeLocation: string | undefined
    teamForm: string | undefined
    teamBorderColour: string | undefined
}


export const TeamSummaryPanel = ({ teamName, homeVenue, homeLocation, teamForm, teamBorderColour}: TeamSummaryPanelProps) => {

    if(teamName == undefined) return
    if(homeVenue == undefined) return


    const teamInfo = getAnyTeamInfoFromName(teamName)

    const foundedYear = Number(teamInfo.foundedYear);
    const currentYear = Number(new Date().getFullYear().valueOf());
    const yearDiff = currentYear - foundedYear;

    return(
        <View style={{justifyContent: 'center', marginHorizontal: 5}}>
            <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <View style={{marginHorizontal: 4}}>
                    <Image source={teamInfo.altLogo} 
                    style={{resizeMode: 'contain',
                        width: 60,
                        height: 60,
                        minHeight:60,
                        minWidth: 60,}}/>
                </View>
                
                <View style={{flexDirection: 'column', paddingHorizontal: 5}}>
                    <Text style={{fontSize: fontSize.lg, fontWeight: 600, color: colors.text}}>{teamName.toUpperCase()}</Text>
                    <Text style={{color: colors.text}}>{teamForm}</Text>
                </View>
                
            </View>

            <View style={{backgroundColor: colors.altBackground, paddingVertical: 6, paddingHorizontal: 2, borderRadius: 4, borderColor: teamBorderColour, borderWidth: 2}}>
                <View style={{ flexDirection: 'row', marginVertical: 4}}>
                    <View style={{width: "10%", justifyContent: 'center', alignItems: 'center', borderRightColor: 'grey', borderRightWidth: 1}}>
                        <MaterialIcons name="stadium" size={20} color={'lightgrey'} />
                    </View>
                    
                    <Text style={{ paddingHorizontal: 8, color: colors.text }}>{homeVenue}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                    <View style={{width: "10%", justifyContent: 'center', alignItems: 'center', borderRightColor: 'grey', borderRightWidth: 1}}>
                        <MaterialIcons name="location-pin" size={20} color={'lightgrey'} />
                    </View>
                    
                    <Text style={{ paddingHorizontal: 8, color: colors.text }}>{homeLocation}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                    <View style={{width: "10%", justifyContent: 'center', alignItems: 'center', borderRightColor: 'grey', borderRightWidth: 1}}>
                        <MaterialCommunityIcons name="timer-sand" size={20} color={'lightgrey'} />
                    </View>
                    
                    <Text style={{ paddingHorizontal: 8, color: colors.text }}>{teamInfo.foundedYear} ({yearDiff} years ago)</Text>
                </View>

            </View>
        </View>
    )
}