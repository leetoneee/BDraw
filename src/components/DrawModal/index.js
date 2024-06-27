import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button, TouchableOpacity } from 'react-native';
import { height, timeLimit, width } from '../../constants';
import Background from '../Background';
import { forwardRef, useImperativeHandle } from 'react';
import { styles } from './styles';
import AwesomeButton from "react-native-really-awesome-button";
import { useSelector } from 'react-redux';
import Translator, { TranslatorProvider, useTranslator } from 'react-native-translator';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawModal = (props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [round, setRound] = useState('');
    const keywords = useSelector((state) => state.draw.keywords);

    useImperativeHandle(ref, () => {
        return {
            startGame(round) {
                setRound(round);
                setModalVisible(true);
            }
        }
    }, [modalVisible])

    const handleGotItPress = () => {
        setModalVisible(!modalVisible)
        setIsFocus(false);
        setResult('');
        if (props.onStartDrawing) {
            props.onStartDrawing();
        }
    };

    const [result, setResult] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const { translate } = useTranslator();
    const onTranslate = async () => {
        setIsFocus(true);
        try {
            const _result = await translate('en', 'vi', keywords[round], { type: 'kakao', timeout: 15000 });
            console.log("🚀 ~ onTranslate ~ keywords[round]:", keywords[round])
            setResult(_result);
        } catch (error) {
            Alert.alert('Translate error!');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <Background style={{ flex: 1 }}>
                <View style={styles.modalView}>
                    <View style={styles.topContainer}>
                        <Text style={styles.roundText}>Drawing {round + 1}/6</Text>
                    </View>
                    <View style={styles.midContainer}>
                        <TouchableOpacity onPress={onTranslate}
                            style={{ alignItems: 'center', marginBottom: 10, }}>
                            <IconMaterialCommunityIcons name="google-translate" size={50} color={isFocus ? "blue" : "black"} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 55, fontFamily: 'RobotoMono-Regular',}}>{result}</Text>
                        <Text style={styles.modalText}>Draw</Text>
                        <Text style={styles.keywordText}> {keywords[round]} </Text>
                        <Text style={styles.modalText}>in under {timeLimit} seconds</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <AwesomeButton
                            backgroundColor='#2EAA50'
                            backgroundDarker='#237636'
                            textFontFamily='verdana'
                            raiseLevel={10}
                            width={200}
                            paddingHorizontal={30}
                            onPress={handleGotItPress}
                        >
                            <Text style={styles.startText}>Got It!</Text>
                        </AwesomeButton>
                    </View>
                </View>
            </Background>
        </Modal>
    );
};



export default forwardRef(DrawModal);