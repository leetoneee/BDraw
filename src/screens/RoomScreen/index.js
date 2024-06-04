import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Modal, Alert, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { socket } from '../../setup/socket';
import Background from '../../components/Background';

const RoomScreen = () => {
    const navigation = useNavigation();

    const [roomId, setRoomId] = useState('');
    const [roomPassword, setRoomPassword] = useState('');
    const [status, setStatus] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (status)
            setModalVisible(true);
    }, [status])

    useEffect(() => {
        socket.on('roomJoined', (data) => {
            // setStatus(`Joined room: ${data.room}`);
            navigation.navigate('LobbyScreen', { roomId: data.room })
        });

        socket.on('roomCreated', (data) => {
            // setStatus(`Created and joined room: ${data.room}`);
            navigation.navigate('LobbyScreen', { roomId: data.room })
        });

        socket.on('invalidOperation', (message) => {
            setStatus(message);
        });

        // return () => socket.close();
    }, []);

    const handleCreateRoom = () => {
        if (socket) {
            console.log("🚀 ~ handleCreateRoom ~ roomId:", roomId)
            socket.emit('roomAction', { action: 'create', room: roomId, password: roomPassword });
        }
    };

    const handleJoinRoom = () => {
        if (socket) {
            socket.emit('roomAction', { action: 'join', room: roomId, password: roomPassword });
        }
    };

    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>WELCOME TO BDRAW</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>RoomID</Text>
                    <TextInput
                        style={styles.textInput}
                        value={roomId}
                        onChangeText={setRoomId}
                        placeholder='Enter the roomID here'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Room Password</Text>
                    <TextInput
                        style={styles.textInput}
                        value={roomPassword}
                        onChangeText={setRoomPassword}
                        secureTextEntry
                        placeholder='Enter room password'
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Join" color={'#63676A'} style={styles.joinButton} onPress={handleJoinRoom} />
                    <Button title="Create new room" color={'#63676A'} style={styles.createRoomButton} onPress={handleCreateRoom} />
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{status}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    setStatus('');
                                }}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </Background>
    );
};

export default RoomScreen;

