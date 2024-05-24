import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4'
const TO_COLOR = '#6F60E7';

const Background = ({ children }) => {
    return (
        <View style={{ flex: 1, borderRadius: 28 }}>
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <Stop offset="0" stopColor={FROM_COLOR} />
                        <Stop offset="0.5" stopColor={VIA_COLOR} />
                        <Stop offset="1" stopColor={TO_COLOR} />
                    </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grad)" />
            </Svg>
            {children}
        </View>
    );
};

export default Background;