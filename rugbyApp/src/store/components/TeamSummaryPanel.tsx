import { View, Text, Image } from "react-native"
import { getAnyTeamInfoFromName } from "../utils/helpers"
import { fontSize } from "@/constants/tokens"
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'


type TeamSummaryPanelProps = {
    teamName: string | undefined
    homeVenue: string | undefined
    homeLocation: string | undefined
    teamForm: string | undefined
}


export const TeamSummaryPanel = ({ teamName, homeVenue, homeLocation, teamForm}: TeamSummaryPanelProps) => {

    if(teamName == undefined) return
    if(homeVenue == undefined) return


    const teamInfo = getAnyTeamInfoFromName(teamName)

    const foundedYear = Number(teamInfo.foundedYear);
    const currentYear = Number(new Date().getFullYear().valueOf());
    const yearDiff = currentYear - foundedYear;

    return(
        <View style={{justifyContent: 'center', marginHorizontal: 3}}>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
                <Image source={teamInfo.logo} 
                    style={{resizeMode: 'contain',
                        width: 60,
                        height: 60,
                        minHeight:60,
                        minWidth: 60,}}/>
                <View style={{flexDirection: 'column', paddingHorizontal: 5}}>
                    <Text style={{fontSize: fontSize.lg, fontWeight: 600}}>{teamName.toUpperCase()}</Text>
                    <Text style={{color: 'grey'}}>{teamForm}</Text>
                </View>
                
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <MaterialIcons name="stadium" size={20} color={'grey'} />
                <Text style={{paddingHorizontal: 5}}>{homeVenue}</Text>
            </View>

            <View>
                <Text>Location: {homeLocation}</Text>
            </View>

            <View>
                <Text>Founded: {teamInfo.foundedYear} ({yearDiff} years ago)</Text>
            </View>
    
        </View>
    )
}