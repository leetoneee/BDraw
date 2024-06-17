import { Text, View, Button, Image, Animated, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';

function Init({ }) {
    const navigation = useNavigation();

    const animatedLogin = useRef(new Animated.Value(-300)).current;
    const animatedSignUp = useRef(new Animated.Value(300)).current;
    const animatedBdraw = useRef(new Animated.ValueXY({ x: 300, y: 300 })).current;

    useFocusEffect(
        React.useCallback(() => {
            // Reset animated values
            animatedLogin.setValue(-300);
            animatedSignUp.setValue(300);
            animatedBdraw.setValue({ x: 300, y: 300 });

            // Start animations
            Animated.timing(animatedLogin, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();

            Animated.timing(animatedSignUp, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();

            Animated.timing(animatedBdraw, {
                toValue: { x: 0, y: 0 },
                duration: 1000,
                useNativeDriver: false,
            }).start();
        }, [animatedLogin, animatedSignUp, animatedBdraw])
    );

    return (
        <View style={styles.container}>
            <Animated.View style={{ marginTop: animatedBdraw.x, marginLeft: animatedBdraw.y }}>
                <Image source={background_pen} resizeMode='contain' style={{ width: 500, height: 500, transform: [{ rotate: '-10deg' }] }} />
                <Text style={{ fontSize: 55, fontFamily: 'VampiroOne-Regular', position: "absolute", top: width / 1.5, marginLeft: 20, color: '#9b23d0' }}>BDraw</Text>
            </Animated.View>
            <LinearGradient
                colors={['#A541E1', '#8752E4', '#6F60E7']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={[styles.container, { paddingRight: width / 2, paddingBottom: height / 5, justifyContent: 'center', transform: [{ rotate: '-60deg' }] }]}>
                    <Animated.View>
                        <TouchableOpacity style={[styles.button, { transform: [{ translateX: animatedLogin }] }]} onPress={() => navigation.navigate('Login')}>
                            <Svg height="50" width="200" style={styles.polygonBorder}>
                                <Polygon
                                    points="30,50 0,25 30,0 170,0 200,25 170,50"
                                    fill="black"
                                />
                            </Svg>
                            <Svg height="40" width="190" style={styles.polygonContent}>
                                <Polygon
                                    points="25,40 0,20 25,0 165,0 190,20 165,40"
                                    fill="#9064cc"
                                />
                            </Svg>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View>
                        <TouchableOpacity style={[styles.button, { transform: [{ translateX: animatedSignUp }] }]} onPress={() => { navigation.navigate('SignUp') }}>
                            <Svg height="50" width="200" style={styles.polygonBorder}>
                                <Polygon
                                    points="30,50 0,25 30,0 170,0 200,25 170,50"
                                    fill="black"
                                />
                            </Svg>
                            <Svg height="40" width="190" style={styles.polygonContent}>
                                <Polygon
                                    points="25,40 0,20 25,0 165,0 190,20 165,40"
                                    fill="#9064cc"
                                />
                            </Svg>
                            <Text style={styles.buttonText}>Sign up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </LinearGradient>
        </View>
    );
}

export default Init;
