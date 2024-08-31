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
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      alignItems: 'center'
  },
  teamText: {
      fontSize: fontSize.xs,
      color: 'black',
  },
  teamStat: {
      fontSize: fontSize.xs,
      color: 'black',
      padding: 5,
      textAlign: 'center'
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
      borderColor: 'lightgrey',
      borderWidth: 2,
  },
    cardHeaderGameInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#f0f2f0',
        padding: 3
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
      backgroundColor: '#f0f2f0',
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
      borderRightColor: 'lightgrey',
      borderRightWidth: 1,
      borderLeftColor: 'lightgrey',
      borderLeftWidth: 1,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },
    moreInfoView: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    moreInfoButton: {
      backgroundColor: '#cfd4cf',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center'
    },
    subCategoriesList: {
      padding: 5,
      width: '100%',
      borderBottomColor: 'grey',
      borderBottomWidth: 2
      },
  });

export const lineupPanelStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    teamName: {
        fontSize: fontSize.base,      
    },
    teamLogo: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      minHeight:50,
      minWidth: 50,
    },
    teamHeader: {
      width: "45%",
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 5,
      marginVertical: 3,
      borderRadius: 6
    },
    playerInfo: {
      paddingLeft: 5
    },
    substitutesHeader: {
      width: "50%",
      borderBottomWidth: 2, 
      borderBottomColor: 'grey',
      paddingLeft: 5,
      paddingTop: 10,
      fontWeight: 500,
      color: 'grey',
    },
})


export const datePickerStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      width: "90%",
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset:{
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },

})




export const utilsStyles = StyleSheet.create({})