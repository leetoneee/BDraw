import React, { useState, } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, Animated, TouchableOpacity, ScrollView } from 'react-native';
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
import Earth from '../../assets/images/Earth.svg';
import Fire from '../../assets/images/Fire.svg';
import Metal from '../../assets/images/Metal.svg';
import Water from '../../assets/images/Water.svg';
import Wood from '../../assets/images/Wood.svg';
import Coin from '../../assets/images/coin.svg'
import axios from "../../services/axios";
import { playerDetail } from '../../redux/player/playerDetailSlice/playerDetailSlice';

const AvatarModal = ({ isVisible, onClose, item }) => {
  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.playerDetail.userDetail);

  const renderTypeChar = (typeChar) => {
    switch (typeChar) {
      case 'Fire':
        return <Fire />;
      case 'Metal':
        return <Metal />;
      case 'Wood':
        return <Wood />;
      case 'Earth':
        return <Earth />;
      case 'Water':
        return <Water />;
      default:
        return null;
    }
  };

  const handleEquipItem = async () => {

    const dataInput = {
      playerId: userDetail.playerId,
      itemId: item.avatarId,
    };

    try {
      let res = await axios.post('/player/use-item', dataInput);
      console.log('Response:', res.data);
      // Xử lý phản hồi từ API nếu cần
    } catch (error) {
      console.error('Failed to equip item:', error);
    }
    dispatch(playerDetail(userDetail.playerId));
  };

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

          {/* Header */}
          <View style={{ flex: 1.1, elevation: 10, backgroundColor: 'white', borderTopEndRadius: 20, borderTopStartRadius: 20, width: width - 30, }}>
            <Text style={styles.modalText}>{item.name}</Text>
            <Image source={{ uri: item.url }} resizeMode='cover' style={{ flex: 1, height: 180, marginHorizontal: 30, marginTop: 15, borderRadius: 20 }} />
            <View style={{ marginVertical: 10, alignItems: 'center', }}>
              {renderTypeChar(item.type)}
            </View>
          </View>

          {/* content */}
          <ScrollView style={{ flex: 4 }}>
            <Text style={{ fontFamily: 'VarelaRound-Regular', fontSize: 25, textAlign: 'center', color: 'black', marginTop: 15, marginHorizontal: 10 }}>{item.content}</Text>
          </ScrollView>

          {/* footer */}
          <View style={{ height: 100, backgroundColor: '#D9D9D9', flexDirection: 'row', flex: 0.2, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
            {item.isBought ? (
              // Nút Equip
              item.url === userDetail.currentAvatar ? (
                <View style={{ flex: 1, borderRightWidth: 1, borderTopWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[styles.textStyle, { color: '#BDA067' }]}>Equipped</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={handleEquipItem} style={{ flex: 1, borderRightWidth: 1, borderTopWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[styles.textStyle, { color: '#BDA067' }]}>Equip</Text>
                </TouchableOpacity>
              )
            ) : (
              // Tiền
              <View onPress={onClose} style={{ flex: 1, borderRightWidth: 1, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Coin />
                <Text style={[styles.textStyle, { color: '#BDA067' }]}>{item.price}</Text>
              </View>
            )}

            {/* Nút Exit */}
            <TouchableOpacity onPress={onClose} style={{ flex: 1, borderTopWidth: 1, justifyContent: 'center' }}>
              <Text style={[styles.textStyle, { color: '#BDA067' }]}>Exit</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};



export default AvatarModal;