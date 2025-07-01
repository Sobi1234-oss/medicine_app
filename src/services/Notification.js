import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { PermissionsAndroid, Platform } from 'react-native';

// Configure PushNotification at app startup
PushNotification.configure({
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export async function requestUserPermission() {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } else if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission request error:', error);
      return false;
    }
  }
  return true;
}

export async function getFCMToken() {
  try {
    if (Platform.OS === 'android') {
      await messaging().registerDeviceForRemoteMessages();
    }
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}

export function setupNotificationListeners() {
  // Create notification channel (Android)
  try {
    PushNotification.createChannel(
      {
        channelId: "default-channel-id",
        channelName: "Default Channel",
        channelDescription: "Default channel for app notifications",
        importance: 4, // IMPORTANCE_HIGH
        vibrate: true,
        soundName: "default",
        playSound: true,
      },
      (created) => {
        if (created) {
          console.log('Notification channel created successfully');
        } else {
          console.log('Notification channel already exists');
        }
      }
    );
  } catch (error) {
    console.error('Failed to create notification channel:', error);
  }

  // Foreground messages
  messaging().onMessage(async remoteMessage => {
    console.log('Foreground FCM message:', remoteMessage);
    
    PushNotification.localNotification({
      channelId: "default-channel-id",
      title: remoteMessage.notification?.title || "New Message",
      message: remoteMessage.notification?.body || "Notification received",
      playSound: true,
      soundName: "default",
      priority: "high",
      importance: "high",
      vibrate: true,
    });
  });

  // Background/Quit state messages
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background FCM message:', remoteMessage);
    
    PushNotification.localNotification({
      channelId: "default-channel-id",
      title: remoteMessage.notification?.title || "New Message",
      message: remoteMessage.notification?.body || "Notification received",
      playSound: true,
      soundName: "default",
    });
  });

  // Check if app was opened from notification
  messaging().getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('App opened from notification:', remoteMessage);
      }
    });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app open (background):', remoteMessage);
  });
}