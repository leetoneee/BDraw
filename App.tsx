/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SinglePlayerGame from './src/screens/SinglePlayerGame';
import ChooseMode from './src/screens/ChooseMode';
import DetailResultScreen from './src/screens/DetailResultScreen';
import RoomScreen from './src/screens/RoomScreen';
import LobbyScreen from './src/screens/LobbyScreen';
import MultiPlayerGame from './src/screens/MultiPlayerGame';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvide } from 'react-redux';
import { store } from './src/redux/store';
import BottomTabs from './src/components/Navigation/BottomTabs';
import { socket } from './src/setup/socket';

const Stack = createNativeStackNavigator();


export default function App() {

  useEffect(() => {
    socket.emit('connection');
  }, [])

  return (
    <StoreProvide store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="BottomTabs"
              component={BottomTabs} />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              name="SinglePlayerGame"
              component={SinglePlayerGame}
            />

            <Stack.Screen
              name="ChooseMode"
              component={ChooseMode}
            />

            <Stack.Screen
              name="DetailResultScreen"
              component={DetailResultScreen} />

            <Stack.Screen
              name="RoomScreen"
              component={RoomScreen} />

            <Stack.Screen
              name="LobbyScreen"
              component={LobbyScreen} />

            <Stack.Screen
              name="MultiPlayerGame"
              component={MultiPlayerGame} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvide >
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});