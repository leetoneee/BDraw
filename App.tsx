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
import HistoryScreen from './src/screens/HistoryScreen';
import HistoryMatch from './src/screens//HistoryMatch';
import ShopScreen from './src/screens/ShopScreen';
import SinglePlayerGame from './src/screens/SinglePlayerGame';
import ChooseMode from './src/screens/ChooseMode';
import DetailResultScreen from './src/screens/DetailResultScreen';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import RoomScreen from './src/screens/RoomScreen';
import LobbyScreen from './src/screens/LobbyScreen';
import MultiPlayerGame from './src/screens/MultiPlayerGame';
import Init from './src/screens/Init';
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
              name="Init"
              component={Init} />

            <Stack.Screen
              name="SignUp"
              component={SignUp} />

            <Stack.Screen
              name="Login"
              component={Login} />



            <Stack.Screen
              name="BottomTabs"
              component={BottomTabs} />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              name="HistoryScreen"
              component={HistoryScreen}
            />

            <Stack.Screen
              name="HistoryMatch"
              component={HistoryMatch}
            />

            <Stack.Screen
              name="ShopScreen"
              component={ShopScreen}
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