import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 40,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    banner: {
        width: '100%',
        height: 120,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userInfo: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userStatus: {
        fontSize: 16,
        color: '#999',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#2E2E99',
        borderRadius: 15,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    level: {
        color: '#fff',
        fontSize: 14,
        marginVertical: 5,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    statText: {
        color: '#fff',
        fontSize: 12,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        margin: 5,
    },
    gradientButton: {
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});