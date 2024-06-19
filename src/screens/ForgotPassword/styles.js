import {StyleSheet} from 'react-native';
import {height, width} from '../../constants';

const width_iconback = width - 65;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  iconGoBack: {
    marginHorizontal: 20,
    marginVertical: 20,
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
    top: height / 2.1, // 2,3 for animatedForgotPassword
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

  TextBDrawContainer: {
    marginTop: 20,
    marginBottom: 20,
  },

  TextBdraw: {
    fontSize: 45,
    fontFamily: 'VampiroOne-Regular',
    color: '#9b23d0',
  },

  ForgotPasswordContainer: {
    marginBottom: 20,
    width: width / 1.1,
    paddingHorizontal: 20,
  },

  TextPassword: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
    fontFamily: 'Montserrat-Regular.ttf',
  },

  TextForgot: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
    fontFamily: 'Montserrat-Regular.ttf',
  },

  TextContainer: {
    marginBottom: 20,
    width: width / 1.1,
    paddingHorizontal: 20,
  },

  Text: {
    color: '#444444',
    fontSize: 16,
    fontWeight: 'bold',
  },

  username_input: {
    width: '100%',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    borderColor: '#6a0dad',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    paddingHorizontal: 20
  },
  
  Button_confirm_Container: {
    marginBottom: 20,
  },

  linearGradient: {
    borderRadius: 50,
    margin: 10,
  },

  textStyle: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 35,
    marginHorizontal: 50,
    marginVertical: 5,
  },

  
});
