import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DEFAULT_HLS = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function VideoPlayerScreen() {
  const videoRef = React.useRef(null);
  const route = useRoute();
  

  const { videoUrl, seekTo } = route.params ?? {};

  const source = videoUrl ?? DEFAULT_HLS;

  if (Platform.OS === 'web') {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>HLS is not supported on web. Test on mobile.</Text>
        <Text style={styles.fallbackText}>URL: {source}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: source }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        style={styles.video}
        onLoad={() => {
       
          if (seekTo) videoRef.current.setPositionAsync(seekTo);
        }}
        onError={(e) => console.error('VIDEO ERROR:', e)}
      />

      <View style={styles.customControls}>
        <Button title="Seek +10s" onPress={() =>
          videoRef.current.getStatusAsync().then(s => videoRef.current.setPositionAsync(s.positionMillis + 10000))
        } />
        <Button title="Seek -10s" onPress={() =>
          videoRef.current.getStatusAsync().then(s => videoRef.current.setPositionAsync(s.positionMillis - 10000))
        } />
        <Button title="Mute" onPress={() => videoRef.current.setIsMutedAsync(true)} />
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#000' },
  video: { width, height: width * (9 / 16) }, // 16:9
  customControls: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
  fallback: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fallbackText: { textAlign: 'center', margin: 10, color: '#fff' },
});
