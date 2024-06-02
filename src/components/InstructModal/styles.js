import { StyleSheet } from "react-native";
import { height, width } from "../../constants";

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    linearGradient: {
      borderRadius: 50,
      margin: 10
    },

    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 35,
      margin: 10
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 35,
      color: 'black'
    },
});