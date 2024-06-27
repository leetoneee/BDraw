import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
    shadowColor: 'green', // Blue shadow color for glowing effect
    shadowOffset: { width: 0, height: 0 }, // Center the shadow around the view
    shadowOpacity: 1, // Full opacity for the shadow
    shadowRadius: 20, // Radius for the blur effect
    elevation: 5, // Elevation for Android shadow support
  },
  congraText: {
    color: 'white',
    fontFamily: 'RobotoMono-Regular',
    fontWeight: 'bold',
  }
});