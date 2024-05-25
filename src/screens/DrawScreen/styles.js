import { StyleSheet, Dimensions } from "react-native";
import { height, width } from "../../constants";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#FFD139',
        width: width - 20,
    },
    svgContainer: {
        borderColor: 'black',
        width: width - 20,
        marginTop: 50,
        backgroundColor: 'green',
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
    },
    topContainer: {
        flex: 2,
        width: width - 20,
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row'
    },
    resultContainer: {
        flex: 1.5,
        backgroundColor: 'green',
        width: width - 20
    },
    drawContainer: {
        flex: 9,
        backgroundColor: 'blue',
        width: width - 20
    },
    bottomContainer: {
        flex: 1.5,
        width: width - 20
    },
    drawText: {
        fontFamily: 'RobotoMono-Regular',
        fontSize: 18,
        color: '#997D26'
    },
    timeBg: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});