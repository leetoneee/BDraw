import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { socket } from '../../setup/socket';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setKeywords, setRoomId } from '../../redux/multiPlayerSlice/multiPlayerSlice';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../components/Background';

const DATA = [
    {
        id: '1',
        name: 'ELON REKT',
        level: 58,
        alliance: 12,
        wins: 125,
        losses: 78,
        kills: 50,
        image: require('../../assets/images/user-default.png'), // Placeholder image
    },
    {
        id: '2',
        name: 'DONALD PUMP',
        level: 80,
        alliance: 32,
        wins: 32,
        losses: 180,
        kills: 12,
        image: require('../../assets/images/user-default.png'), // Placeholder image
    },
    {
        id: '3',
        name: 'LEO SAREL',
        level: 14,
        alliance: 24,
        wins: 15,
        losses: 46,
        kills: 12,
        image: require('../../assets/images/user-default.png'), // Placeholder image
    },
];

const PlayerCard = ({ player }) => {
    return (
        <LinearGradient colors={['#2E2E99', '#2E2E99']} style={styles.card}>
            <Image source={player.image} style={styles.image} />
            <View style={styles.info}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.name}>{player.name}</Text>
                    <Text style={{ color: player.isReady ? '#16C60C' : 'white', fontFamily: 'verdana' }}>
                        {player.isReady ?
                            "🏁 READY"
                            : "⏳ PLEASE WAIT"
                        }
                    </Text>
                </View>

                <Text style={styles.level}>Level {player.level} ⚔️ Alliance {player.alliance}</Text>
                <View style={styles.stats}>
                    <Text style={styles.statText}>🏆 {player.wins} Wins</Text>
                    <Text style={styles.statText}>❌ {player.losses} Losses</Text>
                    <Text style={styles.statText}>🔪 {player.kills} Kills</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button}>
                        <LinearGradient colors={['#8A2BE2', '#4B0082']} style={styles.gradientButton}>
                            <Text style={styles.buttonText}>BATTLE</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <LinearGradient colors={['#333', '#222']} style={styles.gradientButton}>
                            <Text style={styles.buttonText}>PROFILE</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

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
        <Background>
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
            {/* <View style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <PlayerCard player={item} />}
                    keyExtractor={item => item.id}
                />
            </View> */}
        </Background>
    );
};



export default LobbyScreen;