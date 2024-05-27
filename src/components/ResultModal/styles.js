import { StyleSheet } from "react-native";
import { height, width } from "../../constants";
export const styles = StyleSheet.create({
    modalView: {
        margin: 10,
        minHeight: height - 20,
        backgroundColor: '#FFD139',
        borderRadius: 20,
        // padding: 35,
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
        flex: 2,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        gap: 10
        // backgroundColor: 'blue'
    },
    midContainer: {
        flex: 6,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        gap: 10
    },
    bottomContainer: {
        flex: 3,
        width: '100%',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center'
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
        fontSize: 30,
        color: 'black'
    },
    keywordText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily: 'VampiroOne-Regular',
        fontSize: 60,
        color: 'black'
    },
    shareText: {
        fontFamily: 'RobotoMono-Regular',
        color: '#000',
        fontSize: 18,
    },
    titleText: {
        textAlign: 'center',
        fontFamily: 'VampiroOne-Regular',
        fontSize: 30,
        color: '#000',
    },
    startText: {
        fontFamily: 'RobotoMono-Regular',
        color: '#fff',
        fontSize: 20
    },
    aweBtnView: {
        height: 'auto',
        width: 'auto',
        alignSelf: 'flex-start'
    }
});