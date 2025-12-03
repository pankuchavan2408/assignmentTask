import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

import WebViewScreen from './screens/WebViewScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';

const Stack = createNativeStackNavigator();

export const navigationRef = createNavigationContainerRef();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const responseListener = useRef(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Notifications are required!');
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    };

    requestPermissions();

    // On Notification click
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data;

      if (navigationRef.isReady()) {
        if (data?.screen === 'VideoPlayer') navigationRef.navigate('VideoPlayer');
        if (data?.screen === 'WebView') navigationRef.navigate('WebView');
      }
    });

    return () => {
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="WebView">
        <Stack.Screen name="WebView" component={WebViewScreen} options={{ title: 'WebView & Notifications' }} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} options={{ title: 'HLS Video Player' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
