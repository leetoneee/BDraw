import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import Background from '../../components/Background';
import MPDrawModal from '../../components/MPDrawModal';
import styles from './styles';
import { Button } from 'react-native-paper';
import AwesomeButton from "react-native-really-awesome-button";
import MPDrawScreen from '../MPDrawScreen';
import MPWaitingModal from '../../components/MPWaitingModal';
import MPResultModal from '../../components/MPResultModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { setKeywords as dispatchSetKeywords } from '../../redux/multiPlayerSlice/multiPlayerSlice';
import background_pen from '../../assets/images/background_pen.png';
import Icon from 'react-native-vector-icons/AntDesign';
import Robotic from '../../assets/images/robotic.svg'
import { socket } from '../../setup/socket';

function MultiPlayerGame() {
    const modalRef = useRef();
    const waitingRef = useRef();
    const resultRef = useRef();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const keywordsData = useSelector((state) => state.multiPlayer.keywords);
    const score = useSelector((state) => state.multiPlayer.score);
    const roomId = useSelector((state) => state.multiPlayer.roomId);

    const [round, setRound] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);  // State to manage the drawing status
    const [keywords, setKeywords] = useState(keywordsData);
    const [room, setRoom] = useState('');

    console.log("🚀 ~ SinglePlayerGame ~ keywords:", keywords)

    // const encodeImages = useSelector((state) => state.draw.encodeImages);

    //handle start game

    useEffect(() => {
        setTimeout(() => {
            handleStartGame();
        }, 500)
    }, [])

    useEffect(() => {
        dispatch(dispatchSetKeywords(keywords));
    }, [keywords])

    useEffect(() => {
        socket.on('get-score', (roomData) => {
            console.log("🚀 ~ socket.on ~ roomData:", roomData)
            setRoom(roomData);

            waitingRef.current.hide();
            resultRef.current.showResult();
        });

        socket.on('hide-result', () => {
            if (round === 6) {
                setRound(prep => prep + 1);
                return;
            }
            resultRef.current.hideResult();
            setRound(prep => prep + 1);
        })
    }, [socket]);

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            console.log('Screen is focused');
            console.log("🚀 ~ useCallback ~ round:", round)
            if (round === 6) {
                resultRef.current.showResult();
            }

            return () => {
                // Clean up or reset when the screen is unfocused
                console.log('Screen is unfocused');
            };
        }, [round])
    );


    //handle start new round
    useEffect(() => {
        if (round < keywords.length && round !== 0) {
            modalRef.current.startGame(round);
        } else {
            //Handle end of game
            if (round === keywords.length && keywords.length > 0) {
                resultRef.current.showResult();
            }
        }
    }, [round])

    const handleStartGame = () => {
        modalRef.current.startGame(round);
    }

    const handleStartDrawing = () => {
        socket.emit('startRound', { room: roomId, round });
        setIsDrawing(true);
    };

    const handleRoundEnd = (direction) => {
        if (direction === 'BottomTabs') {
            setRound(0);
            navigation.navigate('BottomTabs');
            return;
        }
        socket.emit('set-score', { room: roomId, score, round });
        setIsDrawing(false);
        waitingRef.current.show(round);
    };

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
                        <MPDrawScreen round={round} onRoundEnd={handleRoundEnd} />
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