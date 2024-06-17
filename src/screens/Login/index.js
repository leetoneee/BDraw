import { Text, View, Button, Image, Animated, TouchableOpacity, TextInput } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { decrement, increment } from "../../redux/counterSlice/counterSlice";
import { Icon, MD3Colors } from 'react-native-paper';
import Background from "../../components/Background";
import styles from "./styles";
import { height, width } from "../../constants";
import axios from 'axios';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Polygon } from 'react-native-svg';
import background_pen from '../../assets/images/background_pen.png';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4'
const TO_COLOR = '#6F60E7';

function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);

    const animatedLogin = useRef(new Animated.Value(1000)).current;
    const animatedBdraw = useRef(new Animated.ValueXY({ x: 300, y: 300, })).current;

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

    return (
        <View style={styles.container}>
            <Animated.View style={{ marginTop: animatedBdraw.x, marginLeft: animatedBdraw.y }}>
                <Image source={background_pen} resizeMode='contain' style={{ width: 500, height: 500, transform: [{ rotate: '-20deg' }] }} />
            </Animated.View>
            <LinearGradient
                colors={['#A541E1', '#8752E4', '#6F60E7']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <Animated.View style={{backgroundColor:'white', width: width /1.25, height: height, position: "absolute", alignSelf:'center', alignItems:'center', justifyContent:'flex-start', borderRadius: 15, paddingHorizontal:20, transform: [{ translateY: animatedLogin }]}}>
                
                <Text style={{ fontSize: 45, fontFamily: 'VampiroOne-Regular', color: '#9b23d0' }}>BDraw</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#BD98D1"
                    value={username}
                    onChangeText={setUsername}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#BD98D1"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                
                <View style={styles.checkboxContainer}>
                    <CheckBox
                    value={rememberPassword}
                    onValueChange={setRememberPassword}
                    tintColors={{ true: '#6a0dad', false: '#aaa' }}
                    />
                    <Text style={styles.label}>Remember password</Text>
                </View>
                
                <TouchableOpacity >
                    <LinearGradient
                    colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
                    style={styles.linearGradient}>
                    <Text style={styles.textStyle}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot your password?</Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
    );
}

export default Login