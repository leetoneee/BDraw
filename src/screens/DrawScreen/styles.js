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
        width: width - 40,
        borderRadius: 10,
        // borderWidth: 1,
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
        backgroundColor: 'white',
        marginVertical: 10,
        width: width - 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawContainer: {
        flex: 9,
        backgroundColor: 'white',
        width: width - 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 1,
        width: width - 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
});