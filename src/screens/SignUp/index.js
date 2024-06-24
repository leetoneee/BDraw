import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { height, width } from '../../constants';
import background_pen from '../../assets/images/background_pen.png';
import Icon from 'react-native-vector-icons/AntDesign';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, Portal } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import { createProfilePlayer, reset } from '../../redux/player/registerSlice/playerRegisterSlice';
import axios from '../../services/axios'

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4';
const TO_COLOR = '#6F60E7';

function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [visible, setVisible] = useState(false);
  const [icon, setIcon] = useState('check');

  const animatedLogin = useRef(new Animated.Value(1000)).current;
  const animatedBdraw = useRef(new Animated.ValueXY({ x: 300, y: 300 })).current;
  const isLoading = useSelector((state) => state.playerReg.isLoading);
  const isSuccess = useSelector((state) => state.playerReg.isSuccess);
  const error = useSelector((state) => state.playerReg.error);
  const message = useSelector((state) => state.playerReg.message);
  const player = useSelector((state) => state.playerReg.player);

  const hideDialog = async () => {
    setVisible(false);
    setIcon('check');
    dispatch(reset());
  }

  const showDialog = () => setVisible(true);

  useEffect(() => {
    const postBuyItem = async (dataDauVao) => {
      try {
        let res = await axios.post('/player/buy-item', dataDauVao);
        return res.data;
      } catch (error) {
        console.error('Failed to post buy item:', error);
      }
        console.log("🚀 ~ postBuyItem ~ data:", data)
    };

    const handleSuccess = async () => {
      showDialog();
      setIcon('check');

      const dataDauVao = {
        playerId: player.playerId,
        itemId: '0',
      };

      await postBuyItem(dataDauVao);

      // dispatch(playerDetail(user.playerId)); // Nếu cần thiết
      navigation.navigate('Login');
    };

    if (isSuccess === true) {
      handleSuccess();
    }

    if (isSuccess === false) {
      showDialog();
      setIcon('alert');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (status) {
      setSnackbarVisible(true);
    }
  }, [status]);

  useEffect(() => {
    Animated.timing(animatedLogin, {
      toValue: height / 4.7,
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
        Animated.timing(animatedLogin, {
          toValue: height / 10,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(animatedLogin, {
          toValue: height / 4.7,
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
  }

  const handleSignUp = () => {
    if (!name) {
      setStatus('Invalid name: Name is required');
      return;
    }

    if (!email) {
      setStatus('Invalid email: Email is required');
      return;
    }

    if (!username) {
      setStatus('Invalid username: Username is required');
      return;
    }

    if (!password) {
      setStatus('Invalid password: Password is required');
      return;
    }

    let regex = /^[a-zA-Z0-9_]+$/;

    if (!regex.test(name)) {
      setStatus('Special characters are not allowed in the name.');
      return;
    }

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setStatus('Email is not valid');
      return;
    }

    if (!regex.test(username)) {
      setStatus('Special characters are not allowed in the username.');
      return;
    }

    regex = /^\S+$/;

    if (!regex.test(username)) {
      setStatus('Invalid username: no spaces are allowed.');
      return;
    }

    if (password !== confirmPassword) {
      setStatus('Please make sure your password match!');
      return;
    }

    if (!acceptTerms) {
      setStatus('Please check the accept Terms');
      return;
    }

    const requestOptions = {
      name: name,
      username: username,
      password: password,
      gmail: email
    }

    dispatch(createProfilePlayer(requestOptions));
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
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
            {
              transform: [{ translateY: animatedLogin }],
            },
          ]}>
          <View style={styles.TextBDrawContainer}>
            <Text style={styles.textBdraw}>BDraw</Text>
          </View>
          <View style={styles.view_input_container}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.view_input_container}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.view_input_container}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.view_input_container}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.view_input_container}>
            <TextInput
              style={styles.input}
              placeholder="Password confirm"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={acceptTerms}
              onValueChange={() => setAcceptTerms(!acceptTerms)}
              tintColors={{ true: '#6a0dad', false: '#aaa' }}
            />
            <Text style={styles.label}>
              I accept the Terms of Use and Privacy Policy
            </Text>
          </View>

          <View style={styles.SignUpContainer}>
            <TouchableOpacity onPress={handleSignUp}>
              <LinearGradient
                colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
                style={styles.linearGradient}>
                <Text style={styles.SignUpText}>Sign up</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>
              Already a member? <Text style={styles.signInLink}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
        {isLoading &&
          <Loading />
        }

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
          <Text Text style={{ fontFamily: 'verdana', color: '#fff', fontSize: 13 }}>{status}</Text>
        </Snackbar>

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}  >
            <Dialog.Icon icon={icon} color='#6a0dad' size={30} />
            <Dialog.Title style={{ fontFamily: 'Roboto-Regular', fontSize: 18 }}>{message}</Dialog.Title>
            {error &&
              <Dialog.Content><Text>{error}</Text></Dialog.Content>
            }
          </Dialog>
        </Portal>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SignUp;
