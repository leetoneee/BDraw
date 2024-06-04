import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
});