import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home'
import Configuration from './src/pages/configuration';
import { ConfigProvider } from './src/contexts';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ConfigProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="Configuration" component={Configuration} />
        </Stack.Navigator>
      </NavigationContainer>
    </ConfigProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
