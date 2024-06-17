import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Modal, Alert, Pressable, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { socket } from '../../setup/socket';
import Background from '../../components/Background';
import Icon from 'react-native-vector-icons/AntDesign';
import AwesomeButton from "react-native-really-awesome-button";
import { Snackbar } from 'react-native-paper';




const RoomScreen = () => {
    const navigation = useNavigation();

    const [roomId, setRoomId] = useState('');
    const [roomPassword, setRoomPassword] = useState('');
    const [status, setStatus] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('Join');

    useEffect(() => {
        if (status)
            setSnackbarVisible(true);
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
            setStatus('')
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

    const handleClearInput = () => {
        setRoomId('');
        setRoomPassword('');
    }

    const onDismissSnackBar = () => setSnackbarVisible(false);


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                <Background>

                    <View style={styles.container}>
                        <Text style={{ flex: 1, fontSize: 55, fontFamily: 'VampiroOne-Regular', textAlign: 'center', color: 'red' }}>BDraw</Text>

                        <View style={styles.tabContainer}>
                            <View style={styles.tabControl}>
                                <TouchableOpacity
                                    style={[styles.tab, activeTab === 'Join' && styles.activeTab]}
                                    onPress={() => {
                                        setActiveTab('Join');
                                        setRoomId('');
                                        setRoomPassword('');
                                    }}
                                >
                                    <Text style={styles.tabText}>JOIN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.tab, activeTab === 'Create' && styles.activeTab]}
                                    onPress={() => {
                                        setActiveTab('Create');
                                        setRoomId('');
                                        setRoomPassword('');
                                    }}
                                >
                                    <Text style={styles.tabText}>CREATE</Text>
                                </TouchableOpacity>
                            </View>

                            {activeTab === 'Join' &&
                                <View style={styles.screen}>
                                    <Text style={styles.buttonText}>JOIN A ROOM</Text>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputLabel}>Room ID</Text>
                                        <TextInput
                                            style={styles.textInput}
                                            value={roomId}
                                            onChangeText={setRoomId}
                                            placeholder='Please enter room code'
                                            inputMode='numeric'
                                            keyboardType='numeric'
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
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', }}>
                                        <View style={styles.aweBtnView}>
                                            <AwesomeButton
                                                backgroundColor='#FF0000'
                                                backgroundDarker='#C40c0c'
                                                textFontFamily='verdana'
                                                raiseLevel={5}
                                                width={120}
                                                height={50}
                                                paddingHorizontal={30}
                                                onPress={handleClearInput}
                                            >
                                                <Text style={styles.startText}>CLEAR</Text>
                                            </AwesomeButton>
                                        </View>

                                        <View style={styles.aweBtnView}>
                                            <AwesomeButton
                                                backgroundColor='#2EAA50'
                                                backgroundDarker='#237636'
                                                textFontFamily='verdana'
                                                raiseLevel={5}
                                                width={130}
                                                height={50}
                                                paddingHorizontal={30}
                                                onPressedOut={handleJoinRoom}
                                            >
                                                <Text style={styles.startText}>JOIN</Text>
                                            </AwesomeButton>
                                        </View>

                                    </View>
                                </View>
                            }

                            {activeTab === 'Create' &&
                                <View style={styles.screen}>
                                    <Text style={styles.buttonText}>CREATE A NEW ROOM</Text>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputLabel}>Room ID</Text>
                                        <TextInput
                                            style={styles.textInput}
                                            value={roomId}
                                            onChangeText={setRoomId}
                                            placeholder='Please enter room code'
                                            inputMode='numeric'
                                            keyboardType='numeric'
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
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', }}>
                                        <View style={styles.aweBtnView}>
                                            <AwesomeButton
                                                backgroundColor='#FF0000'
                                                backgroundDarker='#C40c0c'
                                                textFontFamily='verdana'
                                                raiseLevel={5}
                                                width={120}
                                                height={50}
                                                paddingHorizontal={30}
                                                onPress={handleClearInput}
                                            >
                                                <Text style={styles.startText}>CLEAR</Text>
                                            </AwesomeButton>
                                        </View>

                                        <View style={styles.aweBtnView}>
                                            <AwesomeButton
                                                backgroundColor='#2EAA50'
                                                backgroundDarker='#237636'
                                                textFontFamily='verdana'
                                                raiseLevel={5}
                                                width={130}
                                                height={50}
                                                paddingHorizontal={30}
                                                onPressedOut={handleCreateRoom}
                                            >
                                                <Text style={styles.startText}>CREATE</Text>
                                            </AwesomeButton>
                                        </View>

                                    </View>
                                </View>
                            }
                        </View>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                            <Icon name="back" size={45} color="black" />
                        </TouchableOpacity>
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
                    </View>
                </Background>
            </ScrollView >
        </KeyboardAvoidingView >

    );
};

export default RoomScreen;

