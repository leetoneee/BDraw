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
      fontSize: 35,
      fontWeight: '500',
      color: 'black'
    }
});