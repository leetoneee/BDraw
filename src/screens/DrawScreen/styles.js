import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    svgContainer: {
        height: height * 0.7,
        width,
        borderColor: 'black',
        backgroundColor: 'white',
        borderWidth: 1,
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
    }
});