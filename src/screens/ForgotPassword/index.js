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
import AwesomeButton from 'react-native-really-awesome-button';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4';
const TO_COLOR = '#6F60E7';

function ForgotPassword() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');

  const [visibleWrongUsername, setVisibleWrongUsername] = useState(false);
  const hideDialogWrongUsername = () => setVisibleWrongUsername(false);
  const showDialogWrongUsername = () => setVisibleWrongUsername(true);

  const [visibleEmptyUsername, setVisibleEmptyUsername] = useState(false);
  const hideDialogEmptyUsername = () => setVisibleEmptyUsername(false);
  const showDialogEmptyUsername = () => setVisibleEmptyUsername(true);

  const Test_username = 'embethuong1996';

  const animatedForgotPassWord = useRef(new Animated.Value(1000)).current;
  const animatedBdraw = useRef(new Animated.ValueXY({x: 300, y: 300})).current;
  useEffect(() => {
    Animated.timing(animatedForgotPassWord, {
      toValue: height / 2.3,
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

  //PopUp

  const PopUP = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pen_back_Container}>
        <TouchableOpacity
          style={styles.iconGoBack}
          onPress={() => navigation.navigate('Login')}>
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
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
      </View>
      <Animated.View
        style={[
          styles.animatedView,
          {transform: [{translateY: animatedForgotPassWord}]},
        ]}>
        <View style={styles.TextBDrawContainer}>
          <Text style={styles.TextBdraw}>BDraw</Text>
        </View>
        <View style={styles.ForgotPasswordContainer}>
          <Text style={styles.TextForgot}>Forgot</Text>
          <Text style={styles.TextPassword}>Password?</Text>
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.Text}>
            Don't worry! It happens. Please enter the username of your account.
          </Text>
        </View>
        <View style={styles.username_input}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#BD98D1"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.Button_confirm_Container}>
          <TouchableOpacity
            onPress={() => {
              if (username.length === 0) {
                showDialogEmptyUsername();
              } else if (username !== Test_username) {
                showDialogWrongUsername();
              }
              else {

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
              visible={visibleWrongUsername}
              onDismiss={hideDialogWrongUsername}>
              <Dialog.Icon icon="alert" color="#FFD139" size={30} />
              <Dialog.Title style={{fontFamily: 'VampiroOne-Regular'}}>
                Username does not exist. Please check again!
              </Dialog.Title>
              <Dialog.Content>
                <View style={{justifyContent: 'center'}}>
                  <AwesomeButton
                    backgroundColor="#FFD139"
                    backgroundDarker="#E2B537"
                    textFontFamily="verdana"
                    raiseLevel={5}
                    width={100}
                    height={40}
                    paddingHorizontal={10}
                    onPress={showDialogWrongUsername}>
                    <Text
                      style={{
                        fontFamily: 'RobotoMono-Regular',
                        color: '#fff',
                      }}>
                      Close
                    </Text>
                  </AwesomeButton>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog
              visible={visibleEmptyUsername}
              onDismiss={hideDialogEmptyUsername}>
              <Dialog.Icon icon="alert" color="#FFD139" size={30} />
              <Dialog.Title style={{fontFamily: 'VampiroOne-Regular'}}>
                Username is empty. Please enter your username
              </Dialog.Title>
              <Dialog.Content>
                <View style={{justifyContent: 'center'}}>
                  <AwesomeButton
                    backgroundColor="#FFD139"
                    backgroundDarker="#E2B537"
                    textFontFamily="verdana"
                    raiseLevel={5}
                    width={100}
                    height={40}
                    paddingHorizontal={10}
                    onPress={hideDialogEmptyUsername}>
                    <Text
                      style={{
                        fontFamily: 'RobotoMono-Regular',
                        color: '#fff',
                      }}>
                      Close
                    </Text>
                  </AwesomeButton>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

export default ForgotPassword;
