import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../setup/socket';
import { Button, View, ImageBackground, Text, TouchableOpacity, BackHandler } from 'react-native';
import MatchModal from '../../components/MatchModal';
import Background from '../../components/Background';
import background_pen from '../../assets/images/background_pen.png';
import AwesomeButton from "react-native-really-awesome-button";
import Bat_tay from '../../assets/images/bat_tay.svg'
import Matching_NoCenter from '../../assets/images/Matching_NoCenter.svg'
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import { useSelector } from 'react-redux';

const FindMatch = () => {
  const matchRef = useRef();
  const navigation = useNavigation();

  const [room, setRoom] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [status, setStatus] = useState('');

  const userDetail = useSelector((state) => state.playerDetail.userDetail);

  useEffect(() => {
    const handleMatchFound = (room) => {
      setRoom(room.id);
      console.log(`Match found! You are in room ${room.id}`);
    };

    const handleMatchCancelled = (message) => {
      matchRef.current.hide();
      setRoom(null);
      setStatus(message);
    };

    socket.on('matchFound', handleMatchFound);
    socket.on('matchCancelled', handleMatchCancelled);

    return () => {
      socket.off('matchFound', handleMatchFound);
      socket.off('matchCancelled', handleMatchCancelled);
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (status) {
      setSnackbarVisible(true);
    }
  }, [status]);

  const onDismissSnackBar = () => {
    setStatus('');
    setSnackbarVisible(false);
  }

  const handleFindMatch = () => {
    const player = {
      playerId: userDetail.playerId,
      name: userDetail.name,
      level: userDetail.exp.level,
      currentAvatar: userDetail.currentAvatar,
      rank: userDetail.rank
    }
    socket.emit('findMatch', player);
    matchRef.current.show();
  };

  const handleCancelFindMatch = () => {
    socket.emit('cancelFindMatch');
    setRoom(null);
  };

  const handleAccept = () => {
    socket.emit('acceptMatch', room);
  };

  const handleDecline = () => {
    socket.emit('declineMatch', room);
    setRoom(null);
  };

  return (
    <Background>
      <View style={styles.container}>
        <ImageBackground source={background_pen} resizeMode='contain' style={styles.imagebackground}>
          <Text style={{ fontSize: 55, fontFamily: 'VampiroOne-Regular', textAlign: 'center', color: '#9b23d0', marginBottom: 20 }}>BDraw</Text>

          <Matching_NoCenter style={{ position: 'relative' }} />
          <Bat_tay style={{ position: 'absolute', top: '35%' }} />

          <AwesomeButton
            style={{ marginTop: 30 }}
            backgroundColor='#2EAA50'
            backgroundDarker='#237636'
            textFontFamily='verdana'
            raiseLevel={10}
            width={200}
            paddingHorizontal={30}
            onPressedOut={handleFindMatch}
          >
            <Text style={styles.startText}>Find Match!</Text>
          </AwesomeButton>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>
            <Icon name="back" size={50} color="black" />
          </TouchableOpacity>

          <MatchModal ref={matchRef}
            roomId={room}
            handleCancelFindMatch={handleCancelFindMatch}
            handleAcceptMatch={handleAccept}
            handleDeclineMatch={handleDecline}
          />
          <Snackbar
            visible={snackbarVisible}
            onDismiss={onDismissSnackBar}
          // action={{
          //     label: 'Undo',
          //     onPress: () => {
          //         // Do something
          //     },
          // }}
          >
            <Text Text style={{ fontFamily: 'verdana', color: '#fff', fontSize: 13 }}>{status}</Text>
          </Snackbar>
        </ImageBackground>
      </View>
    </Background>
  );
};

export default FindMatch;
