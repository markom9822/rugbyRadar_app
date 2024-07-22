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

export const rankingPanelStyles = StyleSheet.create({
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
    teamPoints: {
        fontSize: fontSize.base,
        color: colors.text,
        padding: 6,
    },
})


export const fixtureStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    cardContainer: {
      flexGrow: 1,
    },
    card: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardHeaderInfo: {
        flexDirection: 'row',
    },
    teamName: {
        paddingHorizontal: 5
    },
    teamScore: {
        fontSize: fontSize.lg,
        paddingHorizontal: 10
    },
    teamLogo: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        minHeight:50,
        minWidth: 50
    },
    body: {
      fontSize: 20,
      lineHeight: 20 * 1.5,
      textAlign: 'center',
    },
    subCategoriesList: {
      marginTop: 20,
    },
  });



export const utilsStyles = StyleSheet.create({})