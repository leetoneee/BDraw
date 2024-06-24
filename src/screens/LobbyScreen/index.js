import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { socket } from '../../setup/socket';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setKeywords, setRoomId } from '../../redux/multiPlayerSlice/multiPlayerSlice';
import LinearGradient from 'react-native-linear-gradient';
import Background from '../../components/Background';
import { Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image'

const LobbyScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const countdownRef = useRef(null);

  const [room, setRoom] = useState({});
  const [players, setPlayers] = useState('');
  const [countdown, setCountdown] = useState('');
  const [status, setStatus] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { roomId } = route.params;

  useEffect(() => {
    if (status)
      setSnackbarVisible(true);
  }, [status]);

  useEffect(() => {
    const handleFoundRoom = (roomData) => {
      setRoom(roomData);
    };

    const handleStartCountdown = () => {
      startCountdown();
    };

    const handleResetCountdown = () => {
      resetCountdown();
    };

    const handleLetsPlay = (keywords) => {
      console.log("🚀 ~ socket.on ~ keywords: ", keywords);
      dispatch(setKeywords(keywords));
      dispatch(setRoomId(roomId));
      navigation.navigate('MultiPlayerGame');
    };

    const handleInvalidOperation = (message) => {
      setStatus(message);
    };

    const handleReconnect = () => {
      navigation.navigate('BottomTabs');
    }

    socket.on("connect", handleReconnect);

    socket.emit('findRoom', roomId);
    socket.on('foundRoom', handleFoundRoom);
    socket.on('startCountdown', handleStartCountdown);
    socket.on('resetCountdown', handleResetCountdown);
    socket.on('letsPlay', handleLetsPlay);
    socket.on('invalidOperation', handleInvalidOperation);
    return () => {
      socket.off('foundRoom', handleFoundRoom);
      socket.off('startCountdown', handleStartCountdown);
      socket.off('resetCountdown', handleResetCountdown);
      socket.off('letsPlay', handleLetsPlay);
      socket.off('invalidOperation', handleInvalidOperation);
      socket.off("connect", handleReconnect);
    };
  }, [roomId]);

  useEffect(() => {
    setPlayers(room.sockets);
  }, [room]);

  const onDismissSnackBar = () => {
    setStatus('');
    setSnackbarVisible(false);
  };

  const handleLeaveRoom = () => {
    socket.emit('leave-room', room.id);
    navigation.goBack();
  };

  const handleChangeIsReady = () => {
    socket.emit('is-ready', room.id);
  };

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

  const PlayerCard = ({ player }) => {
    return (
      <LinearGradient colors={['#2E2E99', '#2E2E99']} style={styles.card}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
          <LinearGradient
            colors={["#6F60E7", '#8752E4', '#A541E1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ paddingHorizontal: 3, paddingVertical: 3, borderRadius: 15, width: 80, height: 80, }}>
            <FastImage
              style={{ width: 74, height: 74, borderRadius: 12, }}
              source={{
                uri: player.currentAvatar,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </LinearGradient>

          <FastImage
            style={{ width: 40, height: 40 }}
            source={{
              uri: player.rank,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

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

          <Text style={styles.level}>⚔️ Level {player.level} </Text>
          {/* <View style={styles.stats}>
            <Text style={styles.statText}>🏆 {player.wins} Wins</Text>
            <Text style={styles.statText}>❌ {player.losses} Losses</Text>
            <Text style={styles.statText}>🔪 {player.kills} Kills</Text>
          </View> */}
          <View style={styles.buttons}>
            {player.id === socket.id ?
              <TouchableOpacity style={styles.button} onPress={handleChangeIsReady}>
                <LinearGradient colors={['#8A2BE2', '#4B0082']} style={styles.gradientButton}>
                  <Text style={styles.buttonText}>
                    {player.isReady ?
                      "WAIT"
                      : "BATTLE"
                    }
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.button}>
                <LinearGradient colors={['#333', '#222']} style={styles.gradientButton}>
                  <Text style={styles.buttonText}>PROFILE</Text>
                </LinearGradient>
              </TouchableOpacity>
            }
          </View>
        </View>
      </LinearGradient>
    );
  };

  return (
    <Background>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconGoBack}
          onPress={handleLeaveRoom}>
          <Icon name="back" size={45} color="black" />
        </TouchableOpacity>

        <View style={styles.displayRoom}>
          <View style={styles.circle}></View>
          <Text style={styles.textRoom}>{String(room?.id)}</Text>
        </View>

        {players && players.length > 0 &&
          <Text style={{ fontFamily: 'Bangers-Regular', textAlign: 'center', fontSize: 30 }}>{players.length} / 4</Text>
        }
        <FlatList
          data={players}
          renderItem={({ item }) => <PlayerCard player={item} />}
          keyExtractor={item => item.id}
        />

        <Text style={{ fontFamily: 'Bangers-Regular', textAlign: 'center', fontSize: 25, zIndex: 2 }}>
          {(countdown && countdown !== 0) ?
            `Match will start in ${countdown} seconds`
            : ""
          }
        </Text>
      </View>
      {/* <Button title='leave room' onPress={handleLeaveRoom} /> */}
      {/* {room &&
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


      </View> */}
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
