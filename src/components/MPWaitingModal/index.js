import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { height, timeLimit, width } from '../../constants';
import Background from '../Background';
import { forwardRef, useImperativeHandle } from 'react';
import { styles } from './styles';
import AwesomeButton from "react-native-really-awesome-button";
import { useSelector } from 'react-redux';
import Tts from 'react-native-tts';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const MPWaitingModal = (props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [round, setRound] = useState('');

  const keywords = useSelector((state) => state.multiPlayer.keywords);

  useImperativeHandle(ref, () => {
    return {
      show(round) {
        setRound(round);
        setModalVisible(true);
      },
      hide() {
        setModalVisible(!modalVisible);
      }
    }
  }, [modalVisible])

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
            <Text style={styles.modalText}>Waiting for other players</Text>
            <Text style={styles.modalText}>and calculating score ... </Text>
            <ActivityIndicator style={{ marginTop: 30 }} size={80} animating={true} color={'#ff8f00'} />
          </View>
          <View style={styles.bottomContainer}>
          </View>
        </View>
      </Background>
    </Modal>
  );
};

export default forwardRef(MPWaitingModal);