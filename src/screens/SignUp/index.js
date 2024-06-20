import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {height, width} from '../../constants';
import background_pen from '../../assets/images/background_pen.png';
import Icon from 'react-native-vector-icons/AntDesign';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4';
const TO_COLOR = '#6F60E7';

function SignUp({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const animatedLogin = useRef(new Animated.Value(1000)).current;
  const animatedBdraw = useRef(new Animated.ValueXY({x: 300, y: 300})).current;

  useEffect(() => {
    Animated.timing(animatedLogin, {
      toValue: height / 4.7,
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
          toValue: height / 5,
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

  return (
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
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{translateY: animatedLogin}],
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
            onValueChange={setAcceptTerms}
            tintColors={{true: '#6a0dad', false: '#aaa'}}
          />
          <Text style={styles.label}>
            I accept the Terms of Use and Privacy Policy
          </Text>
        </View>

        <View style={styles.SignUpContainer}>
          <TouchableOpacity>
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
    </View>
  );
}

export default SignUp;
