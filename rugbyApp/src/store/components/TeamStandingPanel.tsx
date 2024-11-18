import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { View, Text, Image} from "react-native"
import { isSearchBarAvailableForCurrentPlatform } from "react-native-screens"

export type StandingInfo = {
    isHeader: boolean
    teamPool: string
    teamName: string
	teamGP: string
    teamPD: string
    teamPoints: string
}


type TeamStandingPanelProps = {
    standingsArray: StandingInfo[] | undefined,
    teamLeagueName: string | undefined,
    currentTeamName: string | undefined,
    currentYear: string | undefined,
}

export const TeamStandingPanel = ({ standingsArray, teamLeagueName, currentTeamName, currentYear}: TeamStandingPanelProps) => {

    if(standingsArray == undefined || standingsArray.length == 0) return

    return (
        <View style={{marginVertical: 20, marginHorizontal: 5, backgroundColor: colors.background, borderRadius: 4, borderColor: 'lightgrey', borderWidth: 1,
         paddingHorizontal: 10, paddingBottom: 15, paddingTop: 8, marginBottom: 55}}>
            <Text style={{fontWeight: 500, color: colors.text, fontFamily: fontFamilies.bold, marginBottom: 5}}>{currentYear} {teamLeagueName} Table</Text>

            <View style={{ flexDirection: 'row', paddingVertical: 2, borderTopColor: 'grey', borderTopWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1}}>
                <Text style={{ width: "10%", fontSize: fontSize.xs, fontWeight: 500, color: 'lightgrey', fontFamily: fontFamilies.bold }}>R</Text>
                <Text style={{ width: "40%", fontSize: fontSize.xs, fontWeight: 500, color: 'lightgrey', fontFamily: fontFamilies.bold }}>TEAM</Text>
                <Text style={{ width: "15%", textAlign: 'right', fontSize: fontSize.xs, fontWeight: 500, color: 'lightgrey', fontFamily: fontFamilies.bold }}>GP</Text>
                <Text style={{ width: "20%", textAlign: 'right', fontSize: fontSize.xs, fontWeight: 500, color: 'lightgrey', fontFamily: fontFamilies.bold }}>PD</Text>
                <Text style={{ width: "15%", textAlign: 'right', fontSize: fontSize.xs, fontWeight: 500, color: 'lightgrey', fontFamily: fontFamilies.bold }}>P</Text>
            </View>

            <View>
            {standingsArray.map((match, index) => {
                return (
                    <TeamStandingItem
                    key={index}
                    teamName={match.teamName}
                    gamesPlayed={match.teamGP}
                    pointsDiff={match.teamPD}
                    points={match.teamPoints}
                    index={index}
                    isCurrentTeam={currentTeamName == match.teamName}
                    isLastItem={index == standingsArray.length-1}
                    isHeader={match.isHeader}
                    teamPool={match.teamPool}
                    />
                );
            })}
            </View>
        </View>
    )
}

type TeamStandingItemProps = {
    teamName: string
    gamesPlayed: string
    pointsDiff: string
    points: string
    index: number
    isCurrentTeam: boolean
    isLastItem: boolean
    isHeader: boolean
    teamPool: string
}

export const TeamStandingItem = ({ teamName, gamesPlayed, pointsDiff, points, index, isCurrentTeam, isLastItem, isHeader, teamPool}: TeamStandingItemProps) => {

    const ranking = index + 1;
    const textWeight = (isCurrentTeam) ? ('600'):('300');
    const textFontFamily = (isCurrentTeam) ? (fontFamilies.bold):(fontFamilies.light);


    const itemBottomBorderColour = (isLastItem) ? ('grey'):('lightgrey');

    const standingsRender = (isHeaderItem: boolean) => {

        if(isHeaderItem)
        {
            return (
                <View style={{width: "100%", flexDirection: 'row', paddingTop: 8, paddingLeft: 3, borderBottomColor: itemBottomBorderColour, borderBottomWidth: 1 }}>
                    <Text style={[{fontWeight: 600, color: 'lightgrey', fontSize: 11, fontFamily: fontFamilies.bold}]}>{teamPool.toUpperCase()}</Text>
                </View>
            )
        }
        else
        {
            return (
                <View style={{ flexDirection: 'row', paddingVertical: 2, borderBottomColor: itemBottomBorderColour, borderBottomWidth: 1 }}>
                    <Text style={{ width: "10%", fontWeight: textWeight, fontSize: 13, color: colors.text, fontFamily: textFontFamily }}>{ranking}</Text>
                    <Text style={{ width: "40%", fontWeight: textWeight, fontSize: 13, color: colors.text, fontFamily: textFontFamily}}>{teamName}</Text>
                    <Text style={{ width: "15%", fontWeight: textWeight, fontSize: 13, textAlign: 'right', color: colors.text, fontFamily: textFontFamily }}>{gamesPlayed}</Text>
                    <Text style={{ width: "20%", fontWeight: textWeight, fontSize: 13, textAlign: 'right', color: colors.text, fontFamily: textFontFamily }}>{pointsDiff}</Text>
                    <Text style={{ width: "15%", fontWeight: textWeight, fontSize: 13, textAlign: 'right', color: colors.text, fontFamily: textFontFamily }}>{points}</Text>
                </View>
            )
        }

    }

    return (
        <>
        {standingsRender(isHeader)}
        </>
    )
}