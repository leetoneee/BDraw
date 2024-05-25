import React, { useState, useRef, useEffect } from 'react'
import { Text, View } from 'react-native'
import Background from '../../components/Background';
import DrawModal from '../../components/DrawModal';
import styles from './styles';
import { Button } from 'react-native-paper';
import AwesomeButton from "react-native-really-awesome-button";
import DrawScreen from '../DrawScreen';

function SinglePlayerGame() {
    const modalRef = useRef();

    const [round, setRound] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);  // State to manage the drawing status
    const keywords = ['cat', 'house', 'tree', 'car', 'dog', 'sun'];  // Example keywords

    //handle start game
    const handleStartGame = () => {
        modalRef.current.startGame(keywords[round], round);
    }

    //handle start new round
    useEffect(() => {
        if (round < keywords.length && round !== 0) {
            modalRef.current.startGame(keywords[round], round);
        } else {
            //Handle end of game
        }
    }, [round])

    const handleStartDrawing = () => {
        setIsDrawing(true);
    };

    const handleRoundEnd = () => {
        setIsDrawing(false);
        setRound(prev => prev + 1);
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
                        <DrawScreen keyword={keywords[round]} onRoundEnd={handleRoundEnd} />
                    </>
                }

                {/* End game */}
                {

                }
                <DrawModal ref={modalRef} onStartDrawing={handleStartDrawing} />
            </View>
        </Background>
    )
}

export default SinglePlayerGame