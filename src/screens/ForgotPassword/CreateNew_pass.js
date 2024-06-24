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

function isEmptyPass({pass}) {
  const passStr = String(pass);
  return passStr.length == 0 ? true : false;
}

function Check_length_pass({pass}) {
  const passStr = String(pass);
  return passStr.length >= 8 ? true : false;
}

function ComparePass({pass, confirm}) {
  const passStr = String(pass);
  const confirmPassStr = String(confirm);
  return passStr === confirmPassStr;
}

function CreateNewPass_fp() {
  const navigation = useNavigation();
  //navigate to OTP_screen
  const handleForgotPassword_OTP = () => {
    navigation.navigate('ForgotPassword_OTP_Verify');
  };

  const [newPass, setnewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [visibleWrongPass, setvisibleWrongPass] = useState(false);
  const hideDialogWrongPass = () => {
    setnewPass('');
    setConfirmPass('');
    setvisibleWrongPass(false);
  };
  const showDialogWrongPass = () => setvisibleWrongPass(true);

  const [visibleEmptyPass, setvisibleEmptyPass] = useState(false);
  const hideDialogEmptyPass = () => setvisibleEmptyPass(false);
  const showDialogEmptyPass = () => setvisibleEmptyPass(true);

  const [visibleWrongPassConfirm, setvisibleWrongPassConfirm] = useState(false);
  const hideDialogWrongPassConfirm = () => {
    setnewPass('');
    setConfirmPass('');
    setvisibleWrongPassConfirm(false);
  };
  const showDialogWrongPassConfirm = () => setvisibleWrongPassConfirm(true);

  const [visibleEmptyPassConfirm, setvisibleEmptyPassConfirm] = useState(false);
  const hideDialogEmptyPassConfirm = () => setvisibleEmptyPassConfirm(false);
  const showDialogEmptyPassConfirm = () => setvisibleEmptyPassConfirm(true);

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
    <SafeAreaView>
      <View style={styles.pen_back_Container}>
        <TouchableOpacity
          style={styles.iconGoBack}
          onPress={handleForgotPassword_OTP}>
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
          style={styles.gradient_creatpw}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
      </View>
      <Animated.View
        style={[
          styles.animatedView,
          {transform: [{translateY: animatedForgotPassWord}]},
        ]}>
        <View style={styles.createpw_TextBDrawContainer}>
          <Text style={styles.TextBdraw}>BDraw</Text>
        </View>
        <View style={styles.CreatePasswordContainer}>
          <Text style={styles.TextNewPassword}>New</Text>
          <Text style={styles.TextNewPassword}>Password</Text>
        </View>
        <View style={styles.enterNewPass}>
          <Text style={styles.TextEnterNP}>Enter New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 8 digits"
            placeholderTextColor="#BD98D1"
            value={newPass}
            onChangeText={setnewPass}
            secureTextEntry
            enablesReturnKeyAutomatically
            autoCapitalize="none"
          />
        </View>
        <View style={styles.enterNewPass}>
          <Text style={styles.TextEnterNP}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#BD98D1"
            value={confirmPass}
            onChangeText={setConfirmPass}
            secureTextEntry
            enablesReturnKeyAutomatically
            autoCapitalize="none"
          />
        </View>
        <View style={styles.Button_confirm_Container}>
          <TouchableOpacity
            onPress={() => {
              if (isEmptyPass(newPass)) {
                showDialogEmptyPass();
              } else if (Check_length_pass(newPass)) {
                showDialogWrongPass();
              } else if (isEmptyPass(confirmPass)) {
                showDialogEmptyPassConfirm();
              } else if (
                Check_length_pass(confirmPass) ||
                ComparePass(newPass, confirmPass)
              ) {
                showDialogWrongPassConfirm();
              } else {
              }
            }}>
            <LinearGradient
              colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
              style={styles.linearGradient}>
              <Text style={styles.textStyle}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Portal>
            <Dialog visible={visibleWrongPass} onDismiss={hideDialogWrongPass}>
              <Dialog.Icon icon="alert" color="#FFD139" size={50} />
              <Dialog.Title
                style={{fontFamily: 'Montserrat-Regular', fontWeight: 'bold'}}>
                The password does not meet the requirements. Please check again!
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
                    onPress={hideDialogWrongPass}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>

          <Portal>
            <Dialog visible={visibleEmptyPass} onDismiss={hideDialogEmptyPass}>
              <Dialog.Icon icon="alert" color="#FFD139" size={50} />
              <Dialog.Title
                style={{fontFamily: 'Montserrat-Regular', fontWeight: 'bold'}}>
                Confirm Password is incorrect. Please check again!
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
                    onPress={hideDialogWrongPass}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog
              visible={visibleWrongPassConfirm}
              onDismiss={hideDialogWrongPassConfirm}>
              <Dialog.Icon icon="alert" color="#FFD139" size={50} />
              <Dialog.Title
                style={{fontFamily: 'Montserrat-Regular', fontWeight: 'bold'}}>
                Password is empty. Please check again!
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
                    onPress={hideDialogWrongPass}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog
              visible={visibleEmptyPassConfirm}
              onDismiss={hideDialogEmptyPassConfirm}>
              <Dialog.Icon icon="alert" color="#FFD139" size={50} />
              <Dialog.Title
                style={{fontFamily: 'Montserrat-Regular', fontWeight: 'bold'}}>
                Confirm Password is empty. Please check again!
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
                    onPress={hideDialogWrongPass}>
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

export default CreateNewPass_fp;
