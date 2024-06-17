import {StyleSheet, Dimensions, Animated} from 'react-native';
import {height, width} from '../../constants';

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
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  linearGradient: {
    borderRadius: 50,
    margin: 10,
  },
  loginContainer: {
    marginBottom: 20
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
  TextBDrawContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  textBdraw: {
    fontSize: 45,
    fontFamily: 'VampiroOne-Regular',
    color: '#9b23d0',
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
  background_pen: {
    width: width/0.8228571428571428,
    height: height/1.780571428571429,
    transform: [{rotate: '-20deg'}],
  },
  username_password_Input: {
    width: '100%',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    marginBottom: 20,
  }
});
