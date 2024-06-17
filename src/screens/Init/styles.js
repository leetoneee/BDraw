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
        width: width * 1.5,
        height: height,
        transform: [{ rotate: '60deg' }],
        top: height / 2.5,
        position: 'absolute',
      },

      button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
      },
      polygonBorder: {
        position: 'absolute',
      },
      polygonContent: {
        position: 'absolute',
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
      },
});