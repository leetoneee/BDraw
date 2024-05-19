import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    topContainer: {
        flex: 5,
        borderWidth: 2,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: 'red'
    },
    midContainer: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 3,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'green',
    },
    exportButton: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'green',
        padding: 10
    },
    strokeOption: {
        fontSize: 18,
        backgroundColor: "#f7f7f7",
    },
    toolbar: {
        backgroundColor: "#ffffff",
        height: 50,
        width: 300,
        borderRadius: 100,
        borderColor: "#f0f0f0",
        borderWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    separator: {
        height: 30,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        marginHorizontal: 10,
    },
    currentStroke: {
        backgroundColor: "#f7f7f7",
        borderRadius: 5,
    },
    strokeToolbar: {
        position: "absolute",
        top: 70,
        justifyContent: "space-between",
        zIndex: 100,
    },
    colorButton: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginHorizontal: 5,
    },
    clearButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});