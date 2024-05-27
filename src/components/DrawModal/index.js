import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { height, timeLimit, width } from '../../constants';
import Background from '../Background';
import { forwardRef, useImperativeHandle } from 'react';
import { styles } from './styles';
import AwesomeButton from "react-native-really-awesome-button";

const DrawModal = (props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [round, setRound] = useState('');

    useImperativeHandle(ref, () => {
        return {
            startGame(keyword, round) {
                setKeyword(keyword);
                setRound(round);
                setModalVisible(true);
            }
        }
    }, [modalVisible, keyword])

    const handleGotItPress = () => {
        setModalVisible(!modalVisible)
        if (props.onStartDrawing) {
            props.onStartDrawing();
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <Background style={{ flex: 1 }}>
                <View style={styles.modalView}>
                    <View style={styles.topContainer}>
                        <Text style={styles.roundText}>Drawing {round + 1}/6</Text>
                    </View>
                    <View style={styles.midContainer}>
                        <Text style={styles.modalText}>Draw</Text>
                        <Text style={styles.keywordText}>{keyword}</Text>
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