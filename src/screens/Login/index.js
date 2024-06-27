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
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { decrement, increment } from '../../redux/counterSlice/counterSlice';
import { MD3Colors } from 'react-native-paper';
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
import Loading from '../../components/Loading';
import { Snackbar } from 'react-native-paper';
import { Dialog, Portal } from 'react-native-paper';
import { loginPlayer, reset } from '../../redux/player/loginSlice/playerLoginSlice';
import { playerHistory } from '../../redux/player/playerHistorySlice/playerHistorySlice';
import { playerDetail } from '../../redux/player/playerDetailSlice/playerDetailSlice';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4';
const TO_COLOR = '#6F60E7';

function Login({ }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [visible, setVisible] = useState(false);

  const animatedLogin = useRef(new Animated.Value(1000)).current;
  const animatedBdraw = useRef(new Animated.ValueXY({ x: 300, y: 300 })).current;
  const isLoading = useSelector(state => state.playerLog.isLoading);
  const isSuccess = useSelector(state => state.playerLog.isSuccess);
  const message = useSelector(state => state.playerLog.message);
  const user = useSelector(state => state.playerLog.user);

  const hideDialog = async () => {
    setVisible(false);
    dispatch(reset());
  };

  const showDialog = () => setVisible(true);

  const handleLogin = () => {
    if (!username) {
      setStatus('Invalid username: Username is required');
      return;
    }

    if (!password) {
      setStatus('Invalid password: Password is required');
      return;
    }

    const requestOptions = {
      username: username,
      password: password,
    };

    dispatch(loginPlayer(requestOptions));
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isSuccess === true) {
      dispatch(playerDetail(user.playerId));
      dispatch(playerHistory(user.playerId));
      navigation.navigate('BottomTabs');
    }
    if (isSuccess === false) {
      showDialog();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (status) {
      setSnackbarVisible(true);
    }
  }, [status]);

  useEffect(() => {
    Animated.timing(animatedLogin, {
      toValue: height / 2.7,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedBdraw, {
      toValue: { x: -70, y: -40 },
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [animatedLogin, animatedBdraw]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(animatedLogin, {
          toValue: height / 9,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(animatedLogin, {
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
  }, [animatedLogin, animatedBdraw]);

  const onDismissSnackBar = () => {
    setStatus('');
    setSnackbarVisible(false);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.pen_back_Container}>
          <TouchableOpacity
            style={styles.iconGoBack}
            onPress={() => navigation.navigate('Init')}>
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

        <LinearGradient
          colors={['#A541E1', '#8752E4', '#6F60E7']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Animated.View
          style={[
            styles.animatedView,
            { transform: [{ translateY: animatedLogin }] },
          ]}>
          <View style={styles.TextBDrawContainer}>
            <Text style={styles.textBdraw}>BDraw</Text>
          </View>
          <View style={styles.username_password_Input}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#BD98D1"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.username_password_Input}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#BD98D1"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={rememberPassword}
              onValueChange={setRememberPassword}
              tintColors={{ true: '#6a0dad', false: '#aaa' }}
            />
            <Text style={styles.label}>Remember password</Text>
          </View>

          <View style={styles.loginContainer}>
            <TouchableOpacity onPress={handleLogin}>
              <LinearGradient
                colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
                style={styles.linearGradient}>
                <Text style={styles.textStyle}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        {isLoading && <Loading />}
        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackBar}
        // action={{
        //     label: 'Undo',
        //     onPress: () => {
        //         // Do something
        //     },
        // }}
        >
          <Text
            Text
            style={{ fontFamily: 'verdana', color: '#fff', fontSize: 13 }}>
            {status}
          </Text>
        </Snackbar>
        {!isSuccess && (
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Icon icon="alert" color="#6a0dad" size={30} />
              <Dialog.Title
                style={{ fontFamily: 'Roboto-Regular', fontSize: 18 }}>
                Login Failed!
              </Dialog.Title>
              {message && (
                <Dialog.Content>
                  <Text>{message}</Text>
                </Dialog.Content>
              )}
            </Dialog>
          </Portal>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default Login;
