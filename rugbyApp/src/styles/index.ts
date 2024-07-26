import { colors, fontSize } from "@/constants/tokens";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: fontSize.base,
        color: 'black',
    },
})

export const rankingPanelStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 2,
        backgroundColor: '#828487',
        margin: 2,
    },
    teamName: {
        fontSize: fontSize.xs,
        color: 'black',
    },
    teamPoints: {
        fontSize: fontSize.base,
        color: 'black',
        padding: 5,
    },
})

export const standingsPanelStyles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      padding: 2,
      backgroundColor: 'white',
      borderBottomWidth: 2,
      borderBottomColor: 'grey',
      margin: 2,
  },
  teamName: {
      fontSize: fontSize.xs,
      color: 'black',
  },
  teamStat: {
      fontSize: fontSize.sm,
      color: 'black',
      padding: 5,
      width: "10%"
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
      marginVertical: 5
    },
    cardHeaderAllInfo: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f2f0',
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
  },
    cardHeaderGameInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f0',
    },
    teamName: {
        paddingHorizontal: 5,
        fontSize: fontSize.sm,
        fontWeight: 'bold',
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
    quickViewButton: {
      backgroundColor: '#ffff',
      width: 100,
      alignItems: 'center'
    },
    moreInfoView: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    moreInfoButton: {
      backgroundColor: '#cfd4cf',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center'
    },
    subCategoriesList: {
      backgroundColor: '#e1e3e1',
      padding: 5,
      width: '100%',
      alignItems: 'center'
      },
  });

export const lineupPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    teamName: {
        fontSize: fontSize.base,
        color: 'black',
    },
    teamLogo: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      minHeight:50,
      minWidth: 50,
    },
    playerInfo: {
        fontSize: fontSize.base,
        color: colors.text,
        paddingHorizontal: 6,
    },
})



export const utilsStyles = StyleSheet.create({})