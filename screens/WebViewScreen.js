import React, { useRef } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Notifications from 'expo-notifications';

const URL = 'https://reactnative.dev';

const scheduleNotif = async (title, body, delay = 3, data = {}) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: { seconds: delay },
  });
};

export default function WebViewScreen({ navigation }) {
  const webviewRef = useRef(null);

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: URL }}
        style={styles.webview}
        onLoadEnd={() => {
          scheduleNotif('WebView Loaded', 'The website has finished loading!', 2);
        }}
        onError={() => Alert.alert('Error', 'Failed to load website')}
      />

      <View style={styles.buttons}>
        <Button
          title="Notify 1: Hello!"
          onPress={() => scheduleNotif('Hello!', 'This is notification #1 (delayed 3s)', 3)}
        />
        <Button
          title="Notify 2: Alert!"
          color="red"
          onPress={() => scheduleNotif('Alert!', 'This is a different message (delayed 5s)', 5)}
        />
        <Button
          title="Go to Video (with Notify)"
          color="green"
          onPress={() => {
            scheduleNotif('Video Ready', 'Tap to open Video Player!', 4, { screen: 'VideoPlayer' });
            Alert.alert("Notification Scheduled", "Tap the notification to open Video Player");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  buttons: { padding: 10, gap: 10 },
});
