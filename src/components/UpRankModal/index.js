import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Easing, Pressable, View, Animated, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { socket } from '../../setup/socket';
import AwesomeButton from "react-native-really-awesome-button";
import { useDispatch } from 'react-redux';
import { setKeywords, setRoomId as setRoomid } from '../../redux/multiPlayerSlice/multiPlayerSlice';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { reset } from '../../redux/player/checkUpRank/checkUpRankSlice';

const MatchModal = (props, ref) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [checkRank, setCheckRank] = useState('');

  useImperativeHandle(ref, () => ({
    show(checkRank) {
      console.log("🚀 ~ show ~ checkRank:", checkRank)
      setCheckRank(checkRank);
      setModalVisible(true);
    },
    hide() {
      setModalVisible(false);
    },
  }), []);

  const handleClose = () => {
    dispatch(reset())
    setModalVisible(!modalVisible);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        handleClose()
      }}>
      <TouchableOpacity
        style={{ position: 'absolute', top: 20, right: 20, zIndex: 1 }}
        onPress={() => handleClose()}>
        <Icon name="back" size={45} color="white" />
      </TouchableOpacity>
      {checkRank &&
        <View style={{ ...styles.container, backgroundColor: checkRank.newRank.color }}>
          <Text style={{ ...styles.congraText, fontSize: 35 }}>Congratulations</Text>
          <Text style={{ ...styles.congraText, fontSize: 20 }}>You have been promoted!</Text>
          <FastImage
            style={{ width: 200, height: 200, marginTop: 20 }}
            source={{
              uri: checkRank.newRank.url,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <Text style={{ ...styles.congraText, fontSize: 35, marginTop: 20 }}>{(checkRank.newRank.name).toUpperCase()}</Text>

        </View>
      }

    </Modal>
  );
};

export default forwardRef(MatchModal);
