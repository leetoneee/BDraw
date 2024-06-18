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
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {decrement, increment} from '../../redux/counterSlice/counterSlice';
import {MD3Colors} from 'react-native-paper';
import Background from '../../components/Background';
import styles from './styles';
import {height, width} from '../../constants';
import axios from 'axios';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Svg, Polygon} from 'react-native-svg';
import background_pen from '../../assets/images/background_pen.png';
import Icon from 'react-native-vector-icons/AntDesign';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4';
const TO_COLOR = '#6F60E7';

function Login({navigation}) {
  console.log({height, width});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const animatedLogin = useRef(new Animated.Value(1000)).current;
  const animatedBdraw = useRef(new Animated.ValueXY({x: 300, y: 300})).current;

  useEffect(() => {
    Animated.timing(animatedLogin, {
      toValue: height / 2.7,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedBdraw, {
      toValue: {x: -70, y: -40},
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [animatedLogin, animatedBdraw]);

  return (
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
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
      <Animated.View
        style={[
          styles.animatedView,
          {transform: [{translateY: animatedLogin}]},
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
            tintColors={{true: '#6a0dad', false: '#aaa'}}
          />
          <Text style={styles.label}>Remember password</Text>
        </View>

        <View style={styles.loginContainer}>
          <TouchableOpacity>
            <LinearGradient
              colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
              style={styles.linearGradient}>
              <Text style={styles.textStyle}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

export default Login;
