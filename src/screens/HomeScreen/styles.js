import { StyleSheet, Dimensions } from "react-native";
import { height, width } from "../../constants";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
      },

    clearButton: {
        marginTop: 10,
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    clearButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    logo: {
        width: 30,
        height: 30
    }
});