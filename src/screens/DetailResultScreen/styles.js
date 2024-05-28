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
        backgroundColor: '#FFD139',
    },
    aweBtnView: {
        height: 'auto',
        width: 'auto',
        alignSelf: 'flex-start'
    },
    topContainer: {
        flex: 1,
        width: '100%',
        // backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'column',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'VampiroOne-Regular',
        fontSize: 30,
        color: 'black',
    },
    shareText: {
        fontFamily: 'RobotoMono-Regular',
        color: '#000',
        fontSize: 15,
        textAlign: 'center'
    },
    midContainer: {
        flex: 3,
        width: '100%',
        // backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'column',
        gap: 10
    },
    bottomContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        // backgroundColor: 'blue'
    },
    svgContainer: {
        width: width - 60,
        height: width - 60,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'white'
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