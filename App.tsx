/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DrawModal from './src/components/DrawModal';
import DrawScreen from './src/screens/DrawScreen';
import SinglePlayerGame from './src/screens/SinglePlayerGame';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvide } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator();


export default function App() {


  return (
    <StoreProvide store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false
              }} />
            <Stack.Screen
              name="SinglePlayerGame"
              component={SinglePlayerGame}
              options={{
                headerShown: false
              }} />

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

