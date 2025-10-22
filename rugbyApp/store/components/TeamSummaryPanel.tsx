import { SearchTeamInfo } from "@/app/(tabs)/search"
import { colors, fontFamilies } from "@/constants/tokens"
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useState } from "react"
import { Text, View } from "react-native"
import { hexToRGB } from "../utils/helpers"

type TeamSummaryPanelProps = {
    teamInfo: SearchTeamInfo,
}

export type TeamInfo = {
    teamName: string
    homeVenue: string
    homeLocation: string
    teamForm: string
}

export const getTeamBasicInfo = (teamDetails: any) => {

    const teamName = teamDetails.team.displayName;

    let homeVenue;
    let homeVenueCity;
    let homeVenueState;

    if (teamDetails.team.venue !== undefined) {
        homeVenue = teamDetails.team.venue.fullName
        homeVenueCity = teamDetails.team.venue.address.city
        homeVenueState = teamDetails.team.venue.address.state
    }
    else {
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

export const TeamSummaryPanel = ({ teamInfo }: TeamSummaryPanelProps) => {

    const [teamSummaryInfo, setTeamSummaryInfo] = useState<TeamInfo | undefined>();

    const handlePressFetchData = useCallback(async () => {
        const response = await fetch(
            `https://site.web.api.espn.com/apis/site/v2/sports/rugby/teams/${teamInfo.id}`
        );
        const data = await response.json();
        setTeamSummaryInfo(getTeamBasicInfo(data));
    }, [teamInfo.id]);

    useEffect(() => {
        handlePressFetchData();
    }, [handlePressFetchData]);

    const foundedYear = Number(teamInfo.foundedYear);
    const currentYear = Number(new Date().getFullYear().valueOf());
    const yearDiff = currentYear - foundedYear;

    const foundedText = teamInfo.foundedYear + ` (${yearDiff} years ago)`;

    const panelColour = hexToRGB("#4d4b4b", '0.6')

    return (
        <View style={{ width: "100%" }}>
            <View style={{ backgroundColor: panelColour, paddingVertical: 6, paddingHorizontal: 4, borderRadius: 5, margin: 15 }}>

                <SummaryInfoItem icon={<MaterialIcons name="stadium" size={20} color={'lightgrey'} />} text={teamSummaryInfo?.homeVenue} />
                <SummaryInfoItem icon={<MaterialIcons name="location-pin" size={20} color={'lightgrey'} />} text={teamSummaryInfo?.homeLocation} />
                <SummaryInfoItem icon={<MaterialCommunityIcons name="timer-sand" size={20} color={'lightgrey'} />} text={foundedText} />

            </View>
        </View>
    )
}

type SummaryInfoItemPanelProps = {
    icon: any,
    text: string | undefined
}

export const SummaryInfoItem = ({ icon, text }: SummaryInfoItemPanelProps) => {

    return (

        <View style={{ flexDirection: 'row', marginVertical: 5, width: "100%" }}>
            <View style={{ width: "10%", justifyContent: 'center', alignItems: 'center' }}>
                {icon}
            </View>

            <Text style={{ width: "90%", paddingHorizontal: 10, color: colors.text, fontFamily: fontFamilies.light }}>{text}</Text>
        </View>
    )
}