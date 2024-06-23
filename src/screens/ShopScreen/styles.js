import { StyleSheet, Dimensions } from "react-native";
import { height, width } from "../../constants";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
      },

    text: {
      fontSize: 38,
      fontWeight: '500',
      color: 'black'
    },

    dropdown: {
      height: 75,
      borderColor: 'gray',
      borderRadius: 7,
      backgroundColor: 'white'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 45,
      fontWeight: 500,
      color: 'black',
      textAlign:'center'
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});