# Expo Assignment: WebView + Notifications + Video Player

## Overview
Expo React Native app with WebView (embeds https://reactnative.dev), local notifications (two distinct with delays), HLS video player, and navigation.

## Implementation Choices
- Navigation: React Navigation stack for simple page switching.
- Notifications: Expo Notifications with delays and sound; bonuses for load complete and navigate-on-tap.
- Video: Expo AV for HLS with native controls; custom seek/mute bonus; web fallback.
- Code: Clean structure with comments; runs in Expo Go.

## Bonus Features
1. Notification on WebView load.
2. Notification navigates to video on tap.
3. Custom video controls (seek, mute).

## Running the App
1. `npm install`
2. `npx expo start`
3. Scan QR in Expo Go or run on simulator.