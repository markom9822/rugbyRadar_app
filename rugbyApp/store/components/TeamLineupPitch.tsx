import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { LinearGradient } from "expo-linear-gradient"
import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AllLineUpsInfo } from "./FixtureLineups"
import { GridView } from "./GridView"
import { DefaultPlayerImg } from "../utils/playerImagesGetter"
import { getSafePlayerImageSrc } from "../utils/playerInfoGetter"
import { useCallback, useEffect, useState } from "react"
import { hexToRGB } from "../utils/helpers"
import { legacy_makeMutableUI } from "react-native-reanimated/lib/typescript/mutables"

export type TeamLineupPitchProps = {
    allLineupsArray: AllLineUpsInfo[],
    selectedTeam: string
    leagueName: string,
    selectedTeamName: string,
    selectedTeamColour: string,
    OnPlayerModalShown: (playerName: string, playerID: string, teamName: string, teamColour: string) => void
}

export type LineupPlayerInfo = {
    playerName: string;
    playerNumber: string;
    playerID: string;
    isCaptain: boolean;
    playerImgSrc: string
};

export const getLineupPlayerInfo = async (
    allLineupsInfo: AllLineUpsInfo,
    selectedTeam: string,
    leagueName: string,
    teamName: string
): Promise<LineupPlayerInfo> => {
    let playerName = '';
    let playerNumber = '';
    let playerID = '';
    let isCaptain = false;
    let playerImgSrc = '';

    if (selectedTeam === 'home') {
        playerName = allLineupsInfo.hometeamPlayer;
        playerNumber = allLineupsInfo.hometeamPlayerNum;
        playerID = allLineupsInfo.hometeamPlayerID;
        isCaptain = allLineupsInfo.isHomePlayerCaptain;
        playerImgSrc = await getSafePlayerImageSrc(leagueName, teamName, playerName);
    } else {
        playerName = allLineupsInfo.awayteamPlayer;
        playerNumber = allLineupsInfo.awayteamPlayerNum;
        playerID = allLineupsInfo.awayteamPlayerID;
        isCaptain = allLineupsInfo.isAwayPlayerCaptain;
        playerImgSrc = await getSafePlayerImageSrc(leagueName, teamName, playerName);
    }

    return {
        playerName,
        playerNumber,
        playerID,
        isCaptain,
        playerImgSrc,
    };
};

type PlayerPosition = {
    num: string;
    position: string;
    index: number; // array index
}

export const TeamLineupPitch = ({ allLineupsArray, selectedTeam, leagueName, selectedTeamName, selectedTeamColour, OnPlayerModalShown }: TeamLineupPitchProps) => {
    // State to hold all player data
    const [allPlayersData, setAllPlayersData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Define positions once
    const positions: PlayerPosition[] = [
        { num: "1", position: "Loosehead", index: 0 },
        { num: "2", position: "Hooker", index: 1 },
        { num: "3", position: "Tighthead", index: 2 },
        { num: "4", position: "Lock", index: 3 },
        { num: "5", position: "Lock", index: 4 },
        { num: "6", position: "Flanker", index: 5 },
        { num: "7", position: "Flanker", index: 6 },
        { num: "8", position: "Number 8", index: 7 },
        { num: "9", position: "Scrum half", index: 8 },
        { num: "10", position: "Fly half", index: 9 },
        { num: "11", position: "Left winger", index: 10 },
        { num: "12", position: "Inside Centre", index: 11 },
        { num: "13", position: "Outside Centre", index: 12 },
        { num: "14", position: "Right winger", index: 13 },
        { num: "15", position: "Fullback", index: 14 },
        { num: "16", position: "Sub 1", index: 16 },
        { num: "17", position: "Sub 2", index: 17 },
        { num: "18", position: "Sub 3", index: 18 },
        { num: "19", position: "Sub 4", index: 19 },
        { num: "20", position: "Sub 5", index: 20 },
        { num: "21", position: "Sub 6", index: 21 },
        { num: "22", position: "Sub 7", index: 22 },
        { num: "23", position: "Sub 8", index: 23 },
    ];

    useEffect(() => {
        const fetchPlayers = async () => {
            setIsLoading(true); // Show loading overlay
            try {
                const playersData = await Promise.all(
                    positions.map(async (pos) => {
                        if (allLineupsArray[pos.index]) {
                            const playerInfo = await getLineupPlayerInfo(
                                allLineupsArray[pos.index],
                                selectedTeam,
                                leagueName,
                                selectedTeamName
                            );
                            return { ...pos, playerInfo };
                        }
                        return { ...pos, playerInfo: null };
                    })
                );
                setAllPlayersData(playersData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlayers();
    }, [allLineupsArray, selectedTeam, leagueName, selectedTeamName]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, width: "100%", }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size='large' color='lightgrey' />
                </View>
            </View>
        );
    }

    if (allLineupsArray.length === 0) {
        return (
            <View style={{ flex: 1, width: "100%", }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 50
                }}>
                    <Text style={{ color: 'lightgrey', fontFamily: fontFamilies.light }}>Lineup has not been announced yet</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={[teamEventsPanelStyles.container, { width: "100%" }]}>
            <ImageBackground
                source={require('../../store/Icons/rugbyPitch.png')}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                resizeMode="contain" imageStyle={{
                    borderRadius: 12,
                    opacity: 0.6
                }}
            >
                <View style={{ marginTop: 40 }}>
                    <GridView
                        data={allPlayersData.slice(0, 3)} // Props (1-3)
                        col={3}
                        renderItem={(item: any) => (
                            <TeamLineupPitchPlayer
                                playerInfo={item.playerInfo}
                                playerPosition={item.position}
                                teamColour={selectedTeamColour}
                                selectedTeam={selectedTeam}
                                selectedTeamDisplayName={selectedTeamName}
                                leagueName={leagueName}
                                OnPlayerModalShown={OnPlayerModalShown}
                            />
                        )}
                    />
                </View>

                <GridView
                    data={allPlayersData.slice(3, 5)} // Locks (4-5)
                    col={2}
                    renderItem={(item: any) => (
                        <TeamLineupPitchPlayer
                            playerInfo={item.playerInfo}
                            playerPosition={item.position}
                            teamColour={selectedTeamColour}
                            selectedTeam={selectedTeam}
                            selectedTeamDisplayName={selectedTeamName}
                            leagueName={leagueName}
                            OnPlayerModalShown={OnPlayerModalShown}
                        />
                    )}
                />
                <GridView
                    data={[
                        allPlayersData[5],
                        allPlayersData[7],
                        allPlayersData[6]
                    ].filter(Boolean)}
                    col={3}
                    renderItem={(item: any) => (
                        <TeamLineupPitchPlayer
                            playerInfo={item.playerInfo}
                            playerPosition={item.position}
                            teamColour={selectedTeamColour}
                            selectedTeam={selectedTeam}
                            selectedTeamDisplayName={selectedTeamName}
                            leagueName={leagueName}
                            OnPlayerModalShown={OnPlayerModalShown}
                        />
                    )}
                />
                <GridView
                    data={allPlayersData.slice(8, 10)}
                    col={2}
                    renderItem={(item: any) => (
                        <TeamLineupPitchPlayer
                            playerInfo={item.playerInfo}
                            playerPosition={item.position}
                            teamColour={selectedTeamColour}
                            selectedTeam={selectedTeam}
                            selectedTeamDisplayName={selectedTeamName}
                            leagueName={leagueName}
                            OnPlayerModalShown={OnPlayerModalShown}
                        />
                    )}
                />
                <GridView
                    data={allPlayersData.slice(11, 13)}
                    col={2}
                    renderItem={(item: any) => (
                        <TeamLineupPitchPlayer
                            playerInfo={item.playerInfo}
                            playerPosition={item.position}
                            teamColour={selectedTeamColour}
                            selectedTeam={selectedTeam}
                            selectedTeamDisplayName={selectedTeamName}
                            leagueName={leagueName}
                            OnPlayerModalShown={OnPlayerModalShown}
                        />
                    )}
                />
                <GridView
                    data={[
                        allPlayersData[10],
                        allPlayersData[14],
                        allPlayersData[13]
                    ].filter(Boolean)}
                    col={3}
                    renderItem={(item: any) => (
                        <TeamLineupPitchPlayer
                            playerInfo={item.playerInfo}
                            playerPosition={item.position}
                            teamColour={selectedTeamColour}
                            selectedTeam={selectedTeam}
                            selectedTeamDisplayName={selectedTeamName}
                            leagueName={leagueName}
                            OnPlayerModalShown={OnPlayerModalShown}
                        />
                    )}
                />
            </ImageBackground>
            <View>
                <Text style={{
                    color: 'lightgrey', fontFamily: fontFamilies.title, fontSize: fontSize.xs, textAlign: 'center',
                    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'lightgrey', opacity: 0.5
                }}>Substitutes</Text>
                <GridView
                    data={allPlayersData.slice(15, 24)}
                    col={4}
                    renderItem={(item: any) => (
                        <TeamLineupPitchPlayer
                            playerInfo={item.playerInfo}
                            playerPosition={item.position}
                            teamColour={selectedTeamColour}
                            selectedTeam={selectedTeam}
                            selectedTeamDisplayName={selectedTeamName}
                            leagueName={leagueName}
                            OnPlayerModalShown={OnPlayerModalShown}
                            isBenchPlayer={true}
                        />
                    )}
                />
            </View>

        </View>
    )
}

export type TeamLineupPitchPlayerProps = {
    playerInfo: LineupPlayerInfo | undefined
    playerPosition: string
    teamColour: string
    selectedTeam: string
    selectedTeamDisplayName: string
    leagueName: string
    OnPlayerModalShown: (playerName: string, playerID: string, teamName: string, teamColour: string) => void
    isBenchPlayer?: boolean
}

export const TeamLineupPitchPlayer = ({ playerInfo, playerPosition, teamColour, selectedTeam, selectedTeamDisplayName, leagueName, OnPlayerModalShown, isBenchPlayer = false }: TeamLineupPitchPlayerProps) => {

    const getPlayerLastName = (fullName: string | undefined): string => {
        if (!fullName || fullName === '-') return '';

        return fullName.trim().split(' ').pop() || '';
    };

    const teamColourFaded = hexToRGB(teamColour, '0.3')

    const handlePresentModalPress = useCallback(async () => {

        if (playerInfo === undefined || playerInfo === null) return;
        console.info("pressed")

        await OnPlayerModalShown(playerInfo?.playerName, playerInfo?.playerID, selectedTeamDisplayName, teamColour)

    }, [playerInfo, OnPlayerModalShown, selectedTeamDisplayName, teamColour, selectedTeam]);

    return (
        <TouchableOpacity onPress={handlePresentModalPress} activeOpacity={0.6} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 6 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <PlayerImage playerInfo={playerInfo} leagueName={leagueName}/>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent', borderRadius: 2, borderWidth: 1, borderColor: 'lightgrey' }}>
                    <Text style={{ color: 'white', fontFamily: fontFamilies.title, paddingHorizontal: 4, backgroundColor: teamColourFaded, fontSize: isBenchPlayer ? 8 : 10 }}>{playerInfo?.playerNumber}</Text>
                    <Text style={{ color: 'white', textAlign: 'center', fontFamily: fontFamilies.title, fontSize: isBenchPlayer ? 8 : 10, paddingHorizontal: 3 }}>
                        {getPlayerLastName(playerInfo?.playerName)}
                    </Text>
                </View>

                {!isBenchPlayer && (
                    <Text style={{ color: 'white', textAlign: 'center', fontFamily: fontFamilies.light, fontSize: fontSize.xs }}>
                        {playerPosition}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}

export type PlayerImageProps = {
    playerInfo: LineupPlayerInfo | undefined
    leagueName: string
}

export const PlayerImage = ({ playerInfo, leagueName }: PlayerImageProps) => {

    if(playerInfo?.playerImgSrc === "")
    {
        return(
            <Image
                style={{
                    width: 50,
                    height: 50,      
                    resizeMode: 'contain',
                }}
                source={DefaultPlayerImg}
            />
        )
    }

    if(leagueName === "sixNations")
    {
        return(
            <Image
                style={{
                    width: 50,
                    height: 50,      
                    resizeMode: 'contain',
                }}
                source={playerInfo?.playerImgSrc !== "" ? { uri: playerInfo?.playerImgSrc } : DefaultPlayerImg}
            />
        )
    }

    return (
        <View style={{
            width: 50,
            height: 50,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                style={{
                    width: 100,      
                    height: 100,
                    resizeMode: 'contain',
                    top: 25      
                }}
                source={playerInfo?.playerImgSrc !== "" ? { uri: playerInfo?.playerImgSrc } : DefaultPlayerImg}
            />
        </View>
    )
}


export const teamEventsPanelStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    teamLogo: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        minHeight: 25,
        minWidth: 25,
    },
    matchScore: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        color: colors.text,
        fontFamily: fontFamilies.regular
    },
    matchDate: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontSize: fontSize.xs,
        color: colors.text,
        fontFamily: fontFamilies.light
    },
    teamName: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 10,
        color: colors.text,
        fontFamily: fontFamilies.regular
    },
    teamInfoContainer: {
        width: "20%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statsLink: {
        fontWeight: 600,
        color: 'blue'
    }
})