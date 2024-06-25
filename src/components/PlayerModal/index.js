import React, { useState, } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, Animated, TouchableOpacity } from 'react-native';
import { height, timeLimit, width } from '../../constants';
import Background from '../Background';
import { forwardRef, useImperativeHandle } from 'react';
import { styles } from './styles';
import AwesomeButton from "react-native-really-awesome-button";
import { Icon } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../redux/drawSlice/drawSlice';
import { useNavigation } from '@react-navigation/native';
import calcScore from '../../utils/calcScore';
import SinglePlayer from '../../assets/images/SinglePlayer.png';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import capitalizeFirstLetter from '../../utils/capFirstLetter';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4'
const TO_COLOR = '#6F60E7';

const PlayerModal = ({ isVisible, onClose, item }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        onClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.nameText}>{item.name} </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <FastImage
              style={{ width: 40, height: 40 }}
              source={{
                uri: item.rank.url,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.modalText}>{capitalizeFirstLetter(item.rank.name)}</Text>

          </View>

          <LinearGradient
            colors={["#6F60E7", '#8752E4', '#A541E1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ paddingHorizontal: 3, paddingVertical: 3, borderRadius: 15, width: 280, height: 280, }}>
            <FastImage
              style={{ width: 274, height: 274, borderRadius: 12 }}
              source={{
                uri: item.currentAvatar,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </LinearGradient>



          <TouchableOpacity onPress={onClose}>
            <LinearGradient
              colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
              style={styles.linearGradient}>
              <Text style={styles.textStyle}>Close</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PlayerModal;