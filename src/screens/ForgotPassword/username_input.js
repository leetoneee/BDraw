import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {Portal, Dialog} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {
  playerDetailByUsername,
  reset,
} from '../../redux/player/playerDetailByUsernameSlice/playerDetailByUsernameSlice';
import styles from './styles';
import background_pen from '../../assets/images/background_pen.png';
import {height} from '../../constants';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4';
const TO_COLOR = '#6F60E7';

function Username_input_fp() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isSuccess = useSelector(
    state => state.playerDetailByUsername.isSuccess,
  );
  const error = useSelector(state => state.playerDetailByUsername.error);
  const isLoading = useSelector(
    state => state.playerDetailByUsername.isLoading,
  );
  const userDetail = useSelector(
    state => state.playerDetailByUsername.userDetail,
  );

  const noneData = useSelector(state => state.playerDetailByUsername.noneData);

  const [username, setUsername] = useState('');
  const [visibleWrongUsername, setVisibleWrongUsername] = useState(false);
  const [visibleEmptyUsername, setVisibleEmptyUsername] = useState(false);
  const [TextEmptyUsername, setTextEmptyUsername] = useState('');

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

  useEffect(() => {
    if (noneData === false && isSuccess === true) {
      navigation.navigate('ForgotPassword_email');
    }
  }, [isSuccess, noneData]);

  const handleForgotPassword_email = () => {
    if (username.length === 0) {
      setTextEmptyUsername('Invalid username: Username is required!');
      showDialogEmptyUsername();
      return;
    }
    showDialog(noneData, isSuccess);
    dispatch(playerDetailByUsername(username));
  };

  const showDialog = (noneData, isSuccess) => {
    if (noneData === true && isSuccess === false) {
      setVisibleWrongUsername(true);
    }
  };
  const hideDialog = () => setVisibleWrongUsername(false);
  const showDialogEmptyUsername = () => setVisibleEmptyUsername(true);
  const hideDialogEmptyUsername = () => setVisibleEmptyUsername(false);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pen_back_Container}>
        <TouchableOpacity
          style={styles.iconGoBack}
          onPress={() => {
            dispatch(reset());
            navigation.navigate('Login');
          }}>
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
          colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
          style={styles.gradient_username}
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
          <TouchableOpacity onPress={handleForgotPassword_email}>
            <LinearGradient
              colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
              style={styles.linearGradient}>
              <Text style={styles.textStyle}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Portal>
        <Dialog visible={visibleWrongUsername} onDismiss={hideDialog}>
          <Dialog.Icon icon="alert" color="#FFD139" size={50} />
          <Dialog.Title
            style={{fontFamily: 'Montserrat-Regular', fontWeight: 'bold'}}>
            Username does not exist. Please check again!
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
                onPress={hideDialog}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          visible={visibleEmptyUsername}
          onDismiss={hideDialogEmptyUsername}>
          <Dialog.Icon icon="alert" color="#FFD139" size={30} />
          <Dialog.Title
            style={{fontFamily: 'Montserrat-Regular', fontWeight: 'bold'}}>
            {TextEmptyUsername}
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
                onPress={hideDialogEmptyUsername}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

export default Username_input_fp;
