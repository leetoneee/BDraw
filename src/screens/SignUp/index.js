import React, { useEffect, useRef, useState } from "react";
import { Text, View, Image, Animated, TouchableOpacity, TextInput, Keyboard } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styles";
import { height, width } from "../../constants";
import background_pen from '../../assets/images/background_pen.png';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4';
const TO_COLOR = '#6F60E7';

function SignUp({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const animatedLogin = useRef(new Animated.Value(1000)).current;
    const animatedBdraw = useRef(new Animated.ValueXY({ x: 300, y: 300, })).current;

    useEffect(() => {
        Animated.timing(animatedLogin, {
            toValue: height / 5,
            duration: 1000,
            useNativeDriver: false,
        }).start();

        Animated.timing(animatedBdraw, {
            toValue: { x: -70, y: -40 },
            duration: 1000,
            useNativeDriver: false,
        }).start();

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            Animated.timing(animatedLogin, {
                toValue: height / 10,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(animatedLogin, {
                toValue: height / 5,
                duration: 300,
                useNativeDriver: false,
            }).start();
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [animatedLogin, animatedBdraw]);

    return (
        <View style={styles.container}>
            <Animated.View style={{ marginTop: animatedBdraw.x, marginLeft: animatedBdraw.y }}>
                <Image source={background_pen} resizeMode='contain' style={{ width: 500, height: 500, transform: [{ rotate: '-20deg' }] }} />
            </Animated.View>
            <LinearGradient
                colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <Animated.View style={{backgroundColor: 'white', width: width / 1.25, height: height, position: "absolute", alignSelf: 'center', alignItems: 'center', justifyContent: 'flex-start', borderRadius: 15, paddingHorizontal: 20, transform: [{ translateY: animatedLogin }]}}>
                <Text style={{ fontSize: 45, fontFamily: 'VampiroOne-Regular', color: '#9b23d0' }}>BDraw</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password confirm"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={acceptTerms}
                        onValueChange={setAcceptTerms}
                        tintColors={{ true: '#6a0dad', false: '#aaa' }}
                    />
                    <Text style={styles.label}>I accept the Terms of Use and Privacy Policy</Text>
                </View>

                <TouchableOpacity>
                    <LinearGradient
                        colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
                        style={styles.linearGradient}>
                        <Text style={styles.textStyle}>Sign up</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.signInText}>
                        Already a member? <Text style={styles.signInLink}>Sign in</Text>
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

export default SignUp;
