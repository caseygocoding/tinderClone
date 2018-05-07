import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  if (previousToken) {
    return;
  } else {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted') {
      let token = await Notifications.getExpoPushTokenAsync();

      await firebase
        .database()
        .ref('cards/' + firebase.auth().currentUser.uid)
        .update({ token: token });

      AsyncStorage.setItem('pushtoken', token);
    }
  }
};
