import {StyleSheet, Dimensions} from 'react-native';
import {height, width} from '../../constants';

const width_iconback = width - 65; // Move icon_back into the right corner


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

  pen_back_Container: {
    position: 'absolute',
  },

  iconGoBack: {
    marginVertical: 20,
    marginHorizontal: 20,
    marginLeft: width_iconback,
    position: 'absolute',
    zIndex: 1,
  },

  background_pen: {
    width: width / 0.8228571428571428,
    height: height / 1.780571428571429,
    transform: [{rotate: '-20deg'}],
  },

  gradient: {
    width: width,
    height: height,
    top: height / 4,
    position: 'absolute',
  },

  animatedView: {
    backgroundColor: 'white',
    width: width / 1.1,
    height: height,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 15,
    paddingHorizontal: 20,
    borderWidth: 2,
  },

  view_input_container: {
    width: '100%',
    borderColor: '#6a0dad',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },

  input: {
    fontSize: 18,
  },

  TextBDrawContainer: {
    marginTop: 20,
    marginBottom: 20,
  },

  textBdraw: {
    fontSize: 45,
    fontFamily: 'VampiroOne-Regular',
    color: '#9b23d0',
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  label: {
    fontSize: 13,
    color: 'black',
  },

  linearGradient: {
    borderRadius: 50,
    margin: 10,
  },

  SignUpText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 35,
    marginHorizontal: 50,
    marginVertical: 5,
  },

  SignUpContainer: {
    marginBottom: 20,
  },

  signInText: {
    fontSize: 16,
  },

  signInLink: {
    color: '#6a0dad',
    fontWeight: 'bold',
  },
});
