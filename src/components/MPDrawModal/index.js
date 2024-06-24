import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { height, timeLimit, width } from '../../constants';
import Background from '../Background';
import { forwardRef, useImperativeHandle } from 'react';
import { styles } from './styles';
import AwesomeButton from "react-native-really-awesome-button";
import { useSelector } from 'react-redux';
import Tts from 'react-native-tts';

const MPDrawModal = (props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [round, setRound] = useState('');
  const [timer, setTimer] = useState(5);

  const keywords = useSelector((state) => state.multiPlayer.keywords);

  useImperativeHandle(ref, () => {
    return {
      startGame(round) {
        setRound(round);
        setModalVisible(true);
      }
    }
  }, [modalVisible])

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      if (timer === 0) {
        handleVoice("Let's draw.")
        handleGotItPress();
      }
    }
  }, [timer]);

  // Reset timer whenever the keyword changes
  useEffect(() => {
    setTimer(5);
  }, [round]);

  const handleGotItPress = () => {
    setModalVisible(!modalVisible)
    if (props.onStartDrawing) {
      props.onStartDrawing();
    }
  };

  const handleVoice = (script) => {
    Tts.setDefaultLanguage('en-US');
    Tts.speak(script);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        return;
        setModalVisible(!modalVisible);
      }}>
      <Background style={{ flex: 1 }}>
        <View style={styles.modalView}>
          <View style={styles.topContainer}>
            <Text style={styles.roundText}>Drawing {round + 1}/6</Text>
          </View>
          <View style={styles.midContainer}>
            <Text style={styles.modalText}>Draw</Text>
            <Text style={styles.keywordText}>{keywords[round]}</Text>
            <Text style={styles.modalText}>in under {timeLimit} seconds</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={[styles.modalText, { fontSize: 20 }]}>Round will start in {timer} seconds</Text>
          </View>
        </View>
      </Background>
    </Modal>
  );
};

export default forwardRef(MPDrawModal);