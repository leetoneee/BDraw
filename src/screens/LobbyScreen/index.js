import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import styles from './styles';
import { socket } from '../../setup/socket';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setKeywords, setRoomId } from '../../redux/multiPlayerSlice/multiPlayerSlice';

const LobbyScreen = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [room, setRoom] = useState({});
    const [players, setPlayers] = useState('');
    const [countdown, setCountdown] = useState('');
    const countdownRef = useRef(null);

    const { roomId } = route.params;

    useEffect(() => {
        socket.emit('findRoom', roomId)
        socket.on('foundRoom', (roomData) => {
            setRoom(roomData);
        })

        socket.on('startCountdown', () => {
            startCountdown();
        });

        socket.on('resetCountdown', () => {
            resetCountdown();
        });

        socket.on('letsPlay', (keywords) => {
            console.log("🚀 ~ socket.on ~ keywords: ", keywords)
            dispatch(setKeywords(keywords));
            dispatch(setRoomId(roomId));
            navigation.navigate('MultiPlayerGame');
        });

    }, [socket])

    useEffect(() => {
        // console.log("🚀 ~ room updated:", room)
        setPlayers(room.sockets);
    }, [room])

    useEffect(() => {
        // console.log("🚀 ~ players updated:", players)
    }, [players])

    const handleLeaveRoom = () => {
        socket.emit('leave-room', room.id);
        navigation.goBack();
    }

    const handleChangeIsReady = () => {
        socket.emit('is-ready', room.id);
    }

    const startCountdown = () => {
        clearInterval(countdownRef.current);
        let countdownValue = 5;
        setCountdown(countdownValue);

        countdownRef.current = setInterval(() => {
            countdownValue--;
            setCountdown(countdownValue);

            if (countdownValue <= 0) {
                clearInterval(countdownRef.current);
                socket.emit('startGame', roomId);
            }
        }, 1000);
    };

    const resetCountdown = () => {
        clearInterval(countdownRef.current);
        setCountdown(null);
    };

    return (
        <View style={styles.container}>
            <Button title='leave room' onPress={handleLeaveRoom} />
            {room &&
                <Text style={{ fontSize: 30, color: 'black', backgroundColor: 'green' }}>{String(room?.id)}</Text>

            }
            <View style={{ flex: 1, backgroundColor: 'white', height: 400, width: '100%' }}>
                {players &&
                    players.map((player, index) => {
                        return (
                            <View key={index} style={styles.userContainer}>
                                <Avatar.Image size={54} source={require('../../assets/images/user-default.png')} />
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{player.id}</Text>
                                    <Text style={styles.userStatus}>
                                        {player.isReady ?
                                            "READY"
                                            : "NOT READY"
                                        }
                                    </Text>
                                </View>
                                {player.id === socket.id &&
                                    <Button title={player.isReady ? "Wait" : "Ready"} color={player.isReady ? "red" : "green"} onPress={handleChangeIsReady} />
                                }
                            </View>
                        )
                    })

                }
                <Text>
                    {(countdown && countdown !== 0) ?
                        `Match will start in ${countdown} seconds`
                        : ""
                    }
                </Text>


            </View>

        </View >
    );
};



export default LobbyScreen;