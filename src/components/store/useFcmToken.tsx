import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { storeFCMToken } from '../../apis/api';
import { getFCMToken } from '../../services/Notification';
import { useContext } from 'react';
import { AuthContext } from '../../screens/Authentications/AuthContext';
export const useFCMToken = (userId: string | undefined) => {
  const storeTokenMutation = useMutation({
    mutationFn: (token: string) => storeFCMToken(userId, token),
    onError: (error) => console.error('Failed to store FCM token:', error)
  });
  const { storeFcmToken } = useContext(AuthContext);
 
  useEffect(() => {
    const setupFCM = async () => {
      try {
        const token = await getFCMToken();
        if (token) {
          await storeFcmToken(token);
        }
      } catch (error) {
        console.error('FCM setup error:', error);
      }
    };

    setupFCM();
  }, []);

  return { storeTokenMutation };
};