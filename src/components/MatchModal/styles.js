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
  text: {
    fontSize: 40,
    fontFamily: 'Bangers-Regular',
    paddingHorizontal: 10,
    color: 'white'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  dot: {
    fontSize: 50,
    marginHorizontal: 2,
    fontFamily: 'Bangers-Regular',
    color: 'white'
  },
  cancelBtn: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  acceptText: {
    fontFamily: 'verdana',
    fontWeight: 'bold',
    color: '#9CBFBF'
  },
  declineText: {
    fontFamily: 'verdana',
    fontWeight: 'bold',
    color: '#817B62'
  },
  progressBar: {
    width: '80%',
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#0A6893',
  },
});