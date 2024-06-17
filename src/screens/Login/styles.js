import { StyleSheet, Dimensions } from "react-native";
import { height, width } from "../../constants";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
      },

      imagebackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,

      },

    gradient: {
        width: width,
        height: height,
        top: height / 2.5,
        position: 'absolute',
      },

      input: {
        width: '100%',
        borderColor: '#6a0dad',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginBottom: 20,
        fontSize: 18,
      },
      checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        alignSelf: "flex-start"
      },
      label: {
        fontSize: 18,
        fontWeight: "600",
        color:'black',
      },
      linearGradient: {
        borderRadius: 50,
        margin: 10
      },
      textStyle: {
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 35,
        marginHorizontal: 50,
        marginVertical: 5,
      },
      forgotPassword: {
        color: '#6a0dad',
        fontSize: 16,
      },
});