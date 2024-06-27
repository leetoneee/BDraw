
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import Background from '../../components/Background';
import MPDrawModal from '../../components/MPDrawModal';
import styles from './styles';
import AwesomeButton from "react-native-really-awesome-button";
import MPDrawScreen from '../MPDrawScreen';
import MPWaitingModal from '../../components/MPWaitingModal';
import MPResultModal from '../../components/MPResultModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { setKeywords as dispatchSetKeywords, reset } from '../../redux/multiPlayerSlice/multiPlayerSlice';
import background_pen from '../../assets/images/background_pen.png';
import Icon from 'react-native-vector-icons/AntDesign';
import Robotic from '../../assets/images/robotic.svg'
import { socket } from '../../setup/socket';
import calculateRankings from '../../utils/calcRank';

function MultiPlayerGame() {
  const modalRef = useRef();
  const waitingRef = useRef();
  const resultRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const keywordsData = useSelector((state) => state.multiPlayer.keywords);
  const score = useSelector((state) => state.multiPlayer.score);
  const roomId = useSelector((state) => state.multiPlayer.roomId);
  const encodeImages = useSelector((state) => state.multiPlayer.encodeImages);

  const [round, setRound] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);  // State to manage the drawing status
  const [keywords, setKeywords] = useState(keywordsData);
  const [room, setRoom] = useState('');


  useEffect(() => {
    setTimeout(() => {
      handleStartGame();
    }, 500)
  }, [])

  useEffect(() => {
    console.log("🚀 ~ MultiPlayerGame ~ keywords:", keywords)
    dispatch(dispatchSetKeywords(keywords));
  }, [keywords])

  useEffect(() => {
    const handleGetScore = (roomData) => {
      setRoom(roomData);

      const rankedData = calculateRankings(roomData.sockets);
      setTimeout(() => {
        waitingRef.current.hide();
        resultRef.current.showResult(round, rankedData);
        console.log("🚀 ~ handleShowResult ~ round:", round)
      }, 500)
    };

    const handleHideResult = () => {
      console.log("🚀 ~ handleHideResult ~ round:", round)
      resultRef.current.hideResult();
      setRound(prep => prep + 1);
    };

    const handleReconnect = () => {
      dispatch(reset());
      navigation.navigate('BottomTabs');
    }

    socket.on("connect", handleReconnect);
    socket.on('get-score', handleGetScore);
    socket.on('hide-result', handleHideResult);

    return () => {
      socket.off('get-score', handleGetScore);
      socket.off('hide-result', handleHideResult);
      socket.off('connect', handleReconnect)
    };
  }, [round]);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      console.log('Screen is focused');
      if (round === 6) {
        const rankedData = calculateRankings(room.sockets);

        setTimeout(() => {
          resultRef.current.showResult(round, rankedData);
        }, 1000)
      }

      return () => {
        // Clean up or reset when the screen is unfocused
        console.log('Screen is unfocused');
      };
    }, [round, room])
  );

  useEffect(() => {
    if (round < keywords.length && round !== 0) {
      modalRef.current.startGame(round);
    } else {
      // Handle end of game
      // if (round === keywords.length && keywords.length > 0) {
      //   resultRef.current.showResult();
      // }
    }
  }, [round])

  const handleStartGame = () => {
    modalRef.current.startGame(round);
  }

  const handleStartDrawing = () => {
    socket.emit('startRound', { room: roomId, round });
    setIsDrawing(true);
  };

  const handleRoundEnd = (direction, currentScore) => {
    if (direction === 'BottomTabs') {
      setRound(0);
      navigation.navigate('BottomTabs');
      return;
    }

    socket.emit('set-score', { room: roomId, score: currentScore, round, encodeImage: direction });

    setIsDrawing(false);
    waitingRef.current.show(round);
  };

  const handleQuit = () => {
    socket.emit('quitGame', roomId);
  }

  return (
    <Background>
      <View style={styles.container}>
        {/* Start game */}
        {!isDrawing &&
          <>
            <ImageBackground source={background_pen} resizeMode='contain' style={styles.imagebackground}>
              <Text style={{ fontSize: 55, fontFamily: 'VampiroOne-Regular', textAlign: 'center', color: 'red', marginBottom: 20, marginTop: 20 }}>BDraw</Text>
            </ImageBackground>

          </>
        }

        {/* On round */}
        {isDrawing &&
          <>
            <MPDrawScreen round={round} onRoundEnd={handleRoundEnd} onQuit={handleQuit} />
          </>
        }

        {/* End game */}
        {

        }
        <MPDrawModal ref={modalRef} onStartDrawing={handleStartDrawing} />
        <MPWaitingModal ref={waitingRef} />
        <MPResultModal ref={resultRef} />
      </View>
    </Background>
  )
}

export default MultiPlayerGame;
