import { StyleSheet } from "react-native";
import { height } from "../../constants";
export const styles = StyleSheet.create({
    modalView: {
        margin: 10,
        minHeight: height - 20,
        backgroundColor: '#FFD139',
        borderRadius: 20,
        padding: 35,
        justifyContent: 'center',
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
    topContainer: {
        flex: 1,
    },
    midContainer: {
        flex: 4,
    },
    bottomContainer: {
        flex: 1,
    },
    roundText: {
        fontFamily: 'RobotoMono-Regular',
        fontSize: 18,
        color: '#997D26'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'VampiroOne-Regular',
        fontSize: 25,
        color: 'black'
    },
    keywordText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'VampiroOne-Regular',
        fontSize: 40,
        color: 'black',
    },
    startText: {
        fontFamily: 'RobotoMono-Regular',
        color: '#fff',
        fontSize: 18
    }
});