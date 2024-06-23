import { StyleSheet, Dimensions } from "react-native";
import { height, width } from "../../constants";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
      },

    text: {
      fontSize: 38,
      fontWeight: '500',
      color: 'black'
    }
});