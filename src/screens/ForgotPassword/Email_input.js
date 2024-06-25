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
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {decrement, increment} from '../../redux/counterSlice/counterSlice';
import {Dialog, MD3Colors, Portal} from 'react-native-paper';
import Background from '../../components/Background';
import styles from './styles';
import {height, width} from '../../constants';
import axios from 'axios';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Svg, Polygon} from 'react-native-svg';
import background_pen from '../../assets/images/background_pen.png';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AVT_Ingame from '../../components/avt_ingame_fp';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4';
const TO_COLOR = '#6F60E7';

function Email_input_fp() {
  const navigation = useNavigation();
  //navigate to OTP_screen
  const handleForgotPassword_OTP = () => {
    const initOtp = () => {
      return Math.floor(Math.random() * 10000);
    };
    let otp = initOtp();
    let raw = {
      otp: otp,
      email: user.Email,
    };
    dispatch(setOtp(otp));
    dispatch(sendOtp(raw));
    navigation.navigate('ForgotPassword_OTP_Verify');
  };

  const [Email, setEmail] = useState('');

  const [visibleWrongEmail, setVisibleWrongEmail] = useState(false);
  const hideDialogWrongEmail = () => setVisibleWrongEmail(false);
  const showDialogWrongEmail = () => setVisibleWrongEmail(true);

  const [visibleEmptyEmail, setVisibleEmptyEmail] = useState(false);
  const hideDialogEmptyEmail = () => setVisibleEmptyEmail(false);
  const showDialogEmptyEmail = () => setVisibleEmptyEmail(true);

  const Test_Email = 'titvamit1996@gmail.com';

  const animatedForgotPassWord = useRef(new Animated.Value(1000)).current;
  const animatedBdraw = useRef(new Animated.ValueXY({x: 300, y: 300})).current;
  useEffect(() => {
    Animated.timing(animatedForgotPassWord, {
      toValue: height / 2.7,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedBdraw, {
      toValue: {x: -70, y: -40},
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
          toValue: height / 2.7,
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pen_back_Container}>
        <TouchableOpacity
          style={styles.iconGoBack}
          onPress={() => navigation.navigate('ForgotPassword')}>
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
          style={styles.gradient_email}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
      </View>
      <Animated.View
        style={[
          styles.animatedView,
          {transform: [{translateY: animatedForgotPassWord}]},
        ]}>
        <View style={styles.email_TextBDrawContainer}>
          <Text style={styles.TextBdraw}>BDraw</Text>
        </View>
        <View style={styles.ForgotPasswordContainer}>
          <Text style={styles.TextForgot}>Forgot</Text>
          <Text style={styles.TextPassword}>Password?</Text>
        </View>
        <View style={styles.infoAccountContainer}>
          <AVT_Ingame
            name={'Rayfiri'}
            elemental={'Earth'}
            ingame={'Binkeurs'}
          />
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.Text}>
            Don't worry! It happens. Please enter the username of your account.
          </Text>
        </View>
        <View style={styles.email_input}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#BD98D1"
            value={Email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.Button_confirm_Container}>
          <TouchableOpacity
            onPress={() => {
              if (Email.length === 0) {
                showDialogEmptyEmail();
              } else if (Email !== Test_Email) {
                showDialogWrongEmail();
              } else {
                handleForgotPassword_OTP();
              }
            }}>
            <LinearGradient
              colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
              style={styles.linearGradient}>
              <Text style={styles.textStyle}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Portal>
            <Dialog
              visible={visibleWrongEmail}
              onDismiss={hideDialogWrongEmail}>
              <Dialog.Icon icon="alert" color="#FFD139" size={50} />
              <Dialog.Title
                style={{fontFamily: 'Montserrat-Regular', fontWeight: 'bold'}}>
                Email does not exist. Please check again!
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
                    onPress={hideDialogWrongEmail}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog
              visible={visibleEmptyEmail}
              onDismiss={hideDialogEmptyEmail}>
              <Dialog.Icon icon="alert" color="#FFD139" size={50} />
              <Dialog.Title
                style={{fontFamily: 'Montserrat-Regular', fontWeight: 'bold'}}>
                Email is empty. Please enter your Email!
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
                    onPress={hideDialogEmptyEmail}>
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

export default Email_input_fp;
