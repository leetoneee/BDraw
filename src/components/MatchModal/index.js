import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Easing, Pressable, View, Animated, TouchableOpacity } from 'react-native';
import { Icon, Tooltip } from 'react-native-paper';
import styles from './styles';
import { socket } from '../../setup/socket';
import AwesomeButton from "react-native-really-awesome-button";
import { useDispatch } from 'react-redux';
import { reset, setKeywords, setRoomId as setRoomid } from '../../redux/multiPlayerSlice/multiPlayerSlice';
import { useNavigation } from '@react-navigation/native';

const MatchModal = (props, ref) => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [roomId, setRoomId] = useState(props.roomId);
  const [findingMatch, setFindingMatch] = useState(true);
  const countdownDuration = 10000; // 10 seconds

  useEffect(() => {
    setRoomId(props.roomId);
  }, [props.roomId]);

  useImperativeHandle(ref, () => ({
    show() {
      setModalVisible(true);
      startDotAnimation();
    },
    hide() {
      setModalVisible(false);
      stopDotAnimation();
    },
  }), []);

  useEffect(() => {
    const handleMatchFound = () => {
      startMatchFoundAnimation();
    };

    const handleMatchCancelled = () => {
      setModalVisible(false);
      setFindingMatch(true);
    };

    const handleLetsPlay = (keywords) => {
      dispatch(reset());
      dispatch(setKeywords(keywords));
      dispatch(setRoomid(roomId));
      navigation.navigate('MultiPlayerGame');
    };

    socket.on('matchFound', handleMatchFound);
    socket.on('matchCancelled', handleMatchCancelled);
    socket.on('letsPlay', handleLetsPlay);

    return () => {
      socket.off('matchFound', handleMatchFound);
      socket.off('matchCancelled', handleMatchCancelled);
      socket.off('letsPlay', handleLetsPlay);
    };
  }, [roomId]);

  const startDotAnimation = () => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 250);
    animateDot(dot3, 500);
  };

  const stopDotAnimation = () => {
    dot1.setValue(0);
    dot2.setValue(0);
    dot3.setValue(0);
  };

  const startMatchFoundAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setFindingMatch(false);
      progressAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: countdownDuration,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start(handleCountdownCompletion);
      });
    });
  };

  const handleCancelFindMatch = () => {
    setModalVisible(false);
    if (props.handleCancelFindMatch) {
      props.handleCancelFindMatch();
    }
  };

  const handleAcceptMatch = () => {
    if (props.handleAcceptMatch) {
      props.handleAcceptMatch();
    }
  };

  const handleDeclineMatch = () => {
    setFindingMatch(true);
    setModalVisible(false);
    if (props.handleDeclineMatch) {
      props.handleDeclineMatch();
    }
  };

  const handleCountdownCompletion = () => {
    handleDeclineMatch();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        if (findingMatch === true)
          handleCancelFindMatch();
        if (findingMatch === false)
          return;
        setModalVisible(!modalVisible);
      }}>
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        {findingMatch &&
          <>
            <View style={styles.row}>
              <Text style={styles.text}>Finding match </Text>
              <View style={styles.dotsContainer}>
                <Animated.Text style={[styles.dot, { opacity: dot1 }]}>.</Animated.Text>
                <Animated.Text style={[styles.dot, { opacity: dot2 }]}>.</Animated.Text>
                <Animated.Text style={[styles.dot, { opacity: dot3 }]}>.</Animated.Text>
              </View>
            </View>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancelFindMatch}>
              <Icon
                source="close"
                color={'#E7D4B5'}
                size={50}
              />
            </TouchableOpacity>
          </>
        }
        {!findingMatch &&
          <>
            <Text style={styles.text}>MATCH FOUND </Text>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progress,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
            <AwesomeButton
              style={{ marginTop: 30 }}
              backgroundColor='#1D242A'
              backgroundDarker='#086974'
              textFontFamily='verdana'
              raiseLevel={10}
              width={200}
              borderColor='#138ECE'
              borderWidth={2}
              paddingHorizontal={30}
              onPressedOut={handleAcceptMatch}
            >
              <Text style={styles.acceptText}>ACCEPT!</Text>
            </AwesomeButton>
            <AwesomeButton
              style={{ marginTop: 30 }}
              backgroundColor='#1E2327'
              backgroundDarker='#624F23'
              textFontFamily='verdana'
              raiseLevel={10}
              width={160}
              borderColor='#E0A75E'
              borderWidth={2}
              paddingHorizontal={30}
              onPressedOut={handleDeclineMatch}
            >
              <Text style={styles.declineText}>DECLINE</Text>
            </AwesomeButton>

          </>
        }
      </Animated.View>
    </Modal>
  );
};

export default forwardRef(MatchModal);
