import { StyleSheet } from 'react-native';
import { height, width, aspect_ratio } from '../../constants';

const width_iconback = width - 65;
const margin_padding_20 = height * aspect_ratio;
const OTP_input_size = height * 0.0622;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  iconGoBack: {
    marginHorizontal: margin_padding_20,
    marginVertical: margin_padding_20,
    marginLeft: width_iconback,
    position: 'absolute',
    zIndex: 1,
  },

  background_pen: {
    width: width / 0.8228571428571428,
    height: height / 1.780571428571429,
    transform: [{ rotate: '-20deg' }],
  },

  gradient_email: {
    width: width,
    height: height,
    top: height / 2.5, // 2,7 for animatedForgotPassword
    position: 'absolute',
  },

  gradient_username: {
    width: width,
    height: height,
    top: height / 2.1, // 2,3 for animatedForgotPassword
    position: 'absolute',
  },

  gradient_OTP: {
    width: width,
    height: height,
    top: height / 2.1, // 2,3 for animatedForgotPassword
    position: 'absolute',
  },

  gradient_creatpw: {
    width: width,
    height: height,
    top: height / 2.5, // 2,7 for animatedForgotPassword
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
    paddingHorizontal: height * aspect_ratio,
    borderWidth: 2,
  },

  TextBDrawContainer: {
    marginTop: margin_padding_20,
    marginBottom: margin_padding_20,
  },

  TextBdraw: {
    fontSize: 45,
    fontFamily: 'VampiroOne-Regular',
    color: '#9b23d0',
  },

  ForgotPasswordContainer: {
    width: width / 1.1,
    marginBottom: margin_padding_20,
    paddingHorizontal: margin_padding_20,
  },

  CreatePasswordContainer: {
    width: width / 1.1,
    paddingVertical: margin_padding_20,
    paddingHorizontal: margin_padding_20,
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

  TextNewPassword: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
    fontFamily: 'Montserrat-Regular.ttf',
  },

  TextContainer: {
    marginBottom: margin_padding_20,
    width: width / 1.1,
    paddingHorizontal: margin_padding_20,
  },

  Text: {
    color: '#444444',
    fontSize: 16,
    fontWeight: 'bold',
  },

  TextEnterNP: {
    color: '#444444',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: margin_padding_20
  },

  username_input: {
    width: '100%',
    marginHorizontal: margin_padding_20,
    marginBottom: margin_padding_20,
  },

  input: {
    width: '100%',
    borderColor: '#6a0dad',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    paddingHorizontal: margin_padding_20,
  },

  Button_confirm_Container: {
    marginBottom: margin_padding_20 * 2,
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

  closeButton: {
    backgroundColor: '#FFD139',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  closeButtonText: {
    fontSize: height * aspect_ratio,
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    paddingHorizontal: 30,
  },

  email_TextBDrawContainer: {
    marginTop: margin_padding_20,
  },

  createpw_TextBDrawContainer: {
    marginTop: margin_padding_20,
  },

  email_input: {
    width: '100%',
    marginHorizontal: margin_padding_20,
    marginBottom: margin_padding_20,
  },

  infoAccountContainer: {
    marginBottom: margin_padding_20,
    width: width / 1.1,
    paddingHorizontal: margin_padding_20,
  },

  Text_OTP_Container: {
    marginBottom: margin_padding_20,
    width: width / 1.1,
    alignItems: 'center',
  },

  VerificationContainer: {
    width: width / 1.1,
    marginBottom: margin_padding_20,
    paddingHorizontal: margin_padding_20,
    alignItems: 'center',
  },

  TextVerification: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'black',
    fontFamily: 'Montserrat-Regular.ttf',
  },

  OTPContainer: {
    width: '100%',
    marginBottom: margin_padding_20,
  },

  OTPinput: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#F0F5FA',
    borderColor: '#32343E',
    borderWidth: 1,
    borderRadius: 10,
    height: OTP_input_size,
    width: OTP_input_size,
  },

  ResendContainer: {
    marginBottom: margin_padding_20,
  },

  ResendText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  Resend: {
    color: '#A541E1',
  },

  enterNewPass: {
    width: '100%',
    marginHorizontal: margin_padding_20,
    marginBottom: margin_padding_20,
  }
});
