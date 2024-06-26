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
    backgroundColor: 'white',
  },

  startText: {
    fontFamily: 'RobotoMono-Regular',
    color: '#fff',
    fontSize: 18
  },

  imagebackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
})