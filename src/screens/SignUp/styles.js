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
        top: height / 4,
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
        fontSize: 13,
        color:'black',
      },
      submitButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#6a0dad',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
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
      signInText: {
        fontSize: 16,
      },
      signInLink: {
        color: '#6a0dad',
        fontWeight: 'bold',
      },
});