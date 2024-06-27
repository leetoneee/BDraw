import {
  Text,
  View,
  Button,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Keyboard,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { decrement, increment } from '../../redux/counterSlice/counterSlice';
import { Dialog, MD3Colors, Portal } from 'react-native-paper';
import Background from '../../components/Background';
import styles from './styles';
import { height, width } from '../../constants';
import axios from 'axios';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Polygon } from 'react-native-svg';
import background_pen from '../../assets/images/background_pen.png';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import OTPInput from '../../components/OTPInput/index';
import { sendOtp, setOtp } from '../../redux/system/sendOtp/sendOtpSlice';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4';
const TO_COLOR = '#6F60E7';

const initOtp = () => {
  return Math.floor(Math.random() * 10000);
};

function OTP_verify_fp() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //navigate to email_input
  const handleForgotPassword_email = () => {
    navigation.navigate('ForgotPassword_email');
  };

  const otp_gmail = useSelector(state => state.sendOtp.otp);
  const userDetail = useSelector(state => state.playerDetailByUsername.userDetail);
  //navigate to CreateNewPass
  const handleForgotPassword_CreateNewPass = () => {
    navigation.navigate('ForgotPassword_Create_NewPass');
  };

  const [otp, StatesetOtp] = useState('');

  const handleOtpChange = newOtp => {
    StatesetOtp(newOtp);
  };

  const setOTPNull = () => {
    StatesetOtp('');
  };

  const [visibleWrongOTP, setVisibleWrongOTP] = useState(false);
  const hideDialogWrongOTP = () => {
    setOTPNull();
    setVisibleWrongOTP(false);
  };
  const showDialogWrongOTP = () => setVisibleWrongOTP(true);

  const [visibleEmptyOTP, setVisibleEmptyOTP] = useState(false);
  const hideDialogEmptyOTP = () => setVisibleEmptyOTP(false);
  const showDialogEmptyOTP = () => setVisibleEmptyOTP(true);

  const animatedForgotPassWord = useRef(new Animated.Value(1000)).current;
  const animatedBdraw = useRef(new Animated.ValueXY({ x: 300, y: 300 })).current;
  useEffect(() => {
    Animated.timing(animatedForgotPassWord, {
      toValue: height / 2.3,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedBdraw, {
      toValue: { x: -70, y: -40 },
      duration: 1000,
      useNativeDriver: false,
    }).start();

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(animatedForgotPassWord, {
          toValue: height / 7,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(animatedForgotPassWord, {
          toValue: height / 2.3,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [animatedForgotPassWord, animatedBdraw]);

  console.log('OTP: ', otp);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pen_back_Container}>
        <TouchableOpacity
          style={styles.iconGoBack}
          onPress={handleForgotPassword_email}>
          <Icon name="back" size={45} color="black" />
        </TouchableOpacity>
        <Animated.View
          style={{
            marginTop: animatedBdraw.x,
            marginLeft: animatedBdraw.y,
            position: 'absolute',
          }}>
          <Image
            source={background_pen}
            resizeMode="contain"
            style={styles.background_pen}
          />
        </Animated.View>
      </View>
      <View>
        <LinearGradient
          colors={['#A541E1', '#8752E4', '#6F60E7']}
          style={styles.gradient_OTP}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>
      <Animated.View
        style={[
          styles.animatedView,
          { transform: [{ translateY: animatedForgotPassWord }] },
        ]}>
        <View style={styles.TextBDrawContainer}>
          <Text style={styles.TextBdraw}>BDraw</Text>
        </View>
        <View style={styles.VerificationContainer}>
          <Text style={styles.TextVerification}>Verification</Text>
        </View>
        <View style={styles.Text_OTP_Container}>
          <Text style={styles.Text}>Enter Verification Code</Text>
        </View>
        <View style={styles.OTPContainer}>
          <OTPInput
            length={4}
            value={otp}
            disabled={false}
            onChange={handleOtpChange}
          />
        </View>
        <View style={styles.ResendContainer}>
          <TouchableOpacity
            onPress={() => {
              let otpsend = initOtp();
              console.log('OTP_new: ', otpsend);
              let raw = {
                otp: otpsend,
                email: userDetail.gmail,
              };
              dispatch(setO6tp(otpsend));
              dispatch(sendOtp(raw));
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.TextResend}>
                If you didn’t receive a code,{' '}
              </Text>
              <Text style={{ color: '#A541E1', fontWeight: '900' }}>Resend</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Button_confirm_Container}>
          <TouchableOpacity
            onPress={() => {
              if (otp.length === 0) {
                showDialogEmptyOTP();
              } else if (otp !== otp_gmail.toString()) {
                // console.log('Type of otp: ', typeof otp);
                // console.log('Type of otp_gmail: ', typeof otp_gmail.toString());
                showDialogWrongOTP();
              } else {
                handleForgotPassword_CreateNewPass();
              }
            }}>
            <LinearGradient
              colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
              style={styles.linearGradient}>
              <Text style={styles.textStyle}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Portal>
            <Dialog visible={visibleWrongOTP} onDismiss={hideDialogWrongOTP}>
              <Dialog.Icon icon="alert" color="#FFD139" size={50} />
              <Dialog.Title
                style={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>
                OTP is incorrect. Please check again!
              </Dialog.Title>
              <Dialog.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.closeButton}
                    onPress={hideDialogWrongOTP}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={visibleEmptyOTP} onDismiss={hideDialogEmptyOTP}>
              <Dialog.Icon icon="alert" color="#FFD139" size={50} />
              <Dialog.Title
                style={{ fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>
                OTP is empty. Please enter your OTP!
              </Dialog.Title>
              <Dialog.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.closeButton}
                    onPress={hideDialogEmptyOTP}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

export default OTP_verify_fp;
