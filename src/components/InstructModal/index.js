import React, { useState,  } from 'react';
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
import background_pen from '../../assets/images/background_pen.png';
import LinearGradient from 'react-native-linear-gradient';

const FROM_COLOR = '#A541E1';
const VIA_COLOR = '#8752E4'
const TO_COLOR = '#6F60E7';

const InstructModal = (props, ref) => {
    const [modalVisible, setModalVisible] = useState(true);
    
    return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Welcome to BDraw. A place to practice reflexes, compete and interact with people.</Text>
                <Image source={background_pen} resizeMode='contain' style={{width: 300, height: 300}}/>
                
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <LinearGradient
                        colors={[FROM_COLOR, VIA_COLOR, TO_COLOR]}
                        style={styles.linearGradient}>
                        <Text style={styles.textStyle}>Tiếp tục</Text>
                    </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
      );
};



export default forwardRef(InstructModal);