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
    itemTextStyle: {
      fontFamily: "RobotoMono-Regular",
      fontSize: 25,
      color: 'black',
    },
    iconStyle: {
      width: 25,
      height: 25,
      color: 'black'
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
});