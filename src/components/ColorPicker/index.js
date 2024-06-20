import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Svg, { Path } from "react-native-svg"

import { styles } from './styles';

import { colors } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentColor as SPSetColor } from '../../redux/drawSlice/drawSlice';
import { setCurrentColor as MPSetColor } from '../../redux/multiPlayerSlice/multiPlayerSlice';
function ColorPicker(props, ref) {
    const dispatch = useDispatch();

    const currentColor = useSelector((state) => state.draw.currentColor);

    const [value, setValue] = useState(currentColor);
    const sheet = useRef();



    useImperativeHandle(ref, () => {
        return {
            show() {
                sheet.current.open();
                setValue(currentColor);
            }
        }
    }, [currentColor])

    const handleComfirmColor = () => {
        dispatch(MPSetColor(value));
        dispatch(SPSetColor(value));
        sheet.current.close();
    }
    return (
        <RBSheet
            customStyles={{ container: styles.sheet }}
            height={440}
            openDuration={250}
            ref={sheet}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderTitle}>Select color</Text>
            </View>
            <View style={styles.sheetBody}>
                <View style={[styles.profile, { backgroundColor: colors[value] }]}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        stroke="black"
                        strokeWidth={1}
                        width={70}
                        height={70}
                        className="size-6"
                        viewBox="0 0 24 24"
                        {...props}
                    >
                        <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                        />
                    </Svg>
                </View>
                <View style={styles.group}>
                    {colors.map((item, index) => {
                        const isActive = value === index;
                        return (
                            <View key={item}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        setValue(index);
                                    }}>
                                    <View
                                        style={[
                                            styles.circle,
                                            isActive && { borderColor: item },
                                        ]}>
                                        <View
                                            style={[styles.circleInside, { backgroundColor: item }]}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        );
                    })}
                </View>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleComfirmColor}>
                    <Text style={styles.btnText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </RBSheet>
    );
}

export default forwardRef(ColorPicker)


