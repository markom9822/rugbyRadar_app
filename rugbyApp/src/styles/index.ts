import { colors, fontSize } from "@/constants/tokens";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    text: {
        fontSize: fontSize.base,
        color: colors.text,
    },
})

export const scorePanelStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#828487',
        margin: 5,
    },
    teamName: {
        fontSize: fontSize.xs,
        color: colors.text,
    },
    teamScore: {
        fontSize: fontSize.base,
        color: colors.text,
        padding: 6,
    },
    matchTime: {
        fontSize: fontSize.xs,
        color: colors.text,
    },
})



export const utilsStyles = StyleSheet.create({})