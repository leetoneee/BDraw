import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Text, View } from 'react-native'
import Background from '../../components/Background';
import DrawModal from '../../components/DrawModal';
import styles from './styles';
import { Button } from 'react-native-paper';
import AwesomeButton from "react-native-really-awesome-button";
import DrawScreen from '../DrawScreen';
import ResultModal from '../../components/ResultModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { setKeywords as dispatchSetKeywords } from '../../redux/drawSlice/drawSlice';

const data = require('../../data/label.json');

function SinglePlayerGame() {
    const modalRef = useRef();
    const resultRef = useRef();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [round, setRound] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);  // State to manage the drawing status
    const [keywords, setKeywords] = useState([]);

    console.log("🚀 ~ SinglePlayerGame ~ keywords:", keywords)

    // const encodeImages = useSelector((state) => state.draw.encodeImages);

    useEffect(() => {
        const randomKeywords = [];
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * data.names.length);
            randomKeywords.push(data.names[randomIndex]);
        }
        setKeywords(randomKeywords);
    }, []);

    //handle start game
    const handleStartGame = () => {
        modalRef.current.startGame(round);
    }

    useEffect(() => {
        dispatch(dispatchSetKeywords(keywords));
    }, [keywords])

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

    const handleStartDrawing = () => {
        setIsDrawing(true);
    };

    const handleRoundEnd = (direction) => {
        setIsDrawing(false);
        setRound(prev => prev + 1);
        if (direction === 'Home') {
            setRound(0);
            navigation.navigate('Home');
            return;
        }
    };

    return (
        <Background>
            <View style={styles.container}>
                {/* Start game */}
                {round === 0 && !isDrawing &&
                    <>
                        <Text>SinglePlayerGame</Text>
                        <AwesomeButton
                            backgroundColor='#2EAA50'
                            backgroundDarker='#237636'
                            textFontFamily='verdana'
                            raiseLevel={10}
                            width={200}
                            paddingHorizontal={30}
                            onPressedOut={handleStartGame}
                        >
                            <Text style={styles.startText}>Let's Draw!</Text>
                        </AwesomeButton>

                    </>
                }

                {/* On round */}
                {isDrawing &&
                    <>
                        <DrawScreen round={round} onRoundEnd={handleRoundEnd} />
                    </>
                }

                {/* End game */}
                {

                }
                <DrawModal ref={modalRef} onStartDrawing={handleStartDrawing} />
                <ResultModal ref={resultRef} />
            </View>
        </Background>
    )
}

export default SinglePlayerGame