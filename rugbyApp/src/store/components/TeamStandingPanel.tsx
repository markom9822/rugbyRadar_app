import { View, Text, Image} from "react-native"

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

    if(standingsArray == undefined) return

    return (
        <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <Text style={{fontWeight: 500}}>{currentYear} {teamLeagueName} Table</Text>

            <View style={{ flexDirection: 'row', paddingVertical: 2, borderTopColor: 'grey', borderTopWidth: 1, borderBottomColor: 'grey', borderBottomWidth: 1}}>
                <Text style={{ width: "10%" }}>R</Text>
                <Text style={{ width: "40%" }}>TEAM</Text>
                <Text style={{ width: "15%", textAlign: 'right' }}>GP</Text>
                <Text style={{ width: "20%", textAlign: 'right' }}>PD</Text>
                <Text style={{ width: "15%", textAlign: 'right' }}>P</Text>
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
}

export const TeamStandingItem = ({ teamName, gamesPlayed, pointsDiff, points, index, isCurrentTeam, isLastItem}: TeamStandingItemProps) => {

    const ranking = index + 1;
    const textWeight = (isCurrentTeam) ? ('600'):('400');

    const itemBottomBorderColour = (isLastItem) ? ('grey'):('lightgrey');

    return (
        <View style={{flexDirection: 'row', paddingVertical: 2, borderBottomColor: itemBottomBorderColour, borderBottomWidth: 1 }}>
            <Text style={{width: "10%", fontWeight: textWeight}}>{ranking}</Text>
            <Text style={{width: "40%", fontWeight: textWeight}}>{teamName}</Text>
            <Text style={{width: "15%", fontWeight: textWeight, textAlign: 'right'}}>{gamesPlayed}</Text>
            <Text style={{width: "20%", fontWeight: textWeight, textAlign: 'right'}}>{pointsDiff}</Text>
            <Text style={{width: "15%", fontWeight: textWeight, textAlign: 'right'}}>{points}</Text>
        </View>
    )
}