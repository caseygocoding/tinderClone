import * as firebase from 'firebase';
import aws from '../config/aws';
import { Location, Permissions, Notifications } from 'expo';
import { RNS3 } from 'react-native-aws3';
import { Alert } from 'react-native';
import Geohash from 'latlon-geohash';
import registerForNotifications from '../services/push_notifications';

export function login(user) {
  return function(dispatch) {
    let params = {
      id: user.uid,
      photoUrl: user.photoURL,
      name: user.displayName,
      aboutMe: ' ',
      chats: ' ',
      geocode: ' ',
      images: [user.photoURL],
      notification: false,
      show: false,
      report: false,
      swipes: {
        [user.uid]: false,
      },
      token: ' ',
    };

    firebase
      .database()
      .ref('cards/')
      .child(user.uid)
      .once('value', function(snapshot) {
        if (snapshot.val() !== null) {
          dispatch({ type: 'LOGIN', user: snapshot.val(), loggedIn: true });
          registerForNotifications();
          dispatch(allowNotifications());
        } else {
          firebase
            .database()
            .ref('cards/' + user.uid)
            .update(params);
          dispatch({ type: 'LOGIN', user: params, loggedIn: true });
        }
        dispatch(getLocation());
      });
  };
}

export function logout() {
  return function(dispatch) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        dispatch({ type: 'LOGOUT', loggedIn: false });
      });
  };
}

export function uploadImages(images) {
  Permissions.askAsync(Permissions.CAMERA_ROLL);
  Permissions.askAsync(Permissions.CAMERA);

  return function(dispatch) {
    Permissions.askAsync(Permissions.CAMERA_ROLL).then(() => {
      Permissions.askAsync(Permissions.CAMERA).then(() => {
        Expo.ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(
          result => {
            var array = images;
            if (result.uri !== undefined) {
              const file = {
                uri: result.uri,
                name: result.uri,
                type: 'image/png',
              };

              const options = {
                keyPrefix: 'images/',
                bucket: 'test-bucket-tutorial-tinder',
                region: 'us-east-1',
                accessKey: aws.accessKey,
                secretKey: aws.secretKey,
                successActionStatus: 201,
              };

              RNS3.put(file, options).then(function(response) {
                if (response.status === 201) {
                  array.push(response.body.postResponse.location);
                  firebase
                    .database()
                    .ref('cards/' + firebase.auth().currentUser.uid + '/images')
                    .set(array);
                  dispatch({ type: 'UPLOAD_IMAGES', payload: array });
                }
              });
            }
          }
        );
      });
    });
  };
}

export function deleteImage(images, key) {
  return function(dispatch) {
    Alert.alert(
      'Are you sure you want to Delete',
      '',
      [
        {
          text: 'Ok',
          onPress: () => {
            var array = images;
            array.splice(key, 1);
            dispatch({ type: 'UPLOAD_IMAGES', payload: array });
            firebase
              .database()
              .ref('cards/' + firebase.auth().currentUser.uid + '/images')
              .set(array);
          },
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
      ],
      { cancelable: true }
    );
  };
}

export function updateAbout(value) {
  return function(dispatch) {
    dispatch({ type: 'UPDATE_ABOUT', payload: value });
    setTimeout(function() {
      firebase
        .database()
        .ref('cards/' + firebase.auth().currentUser.uid)
        .update({ aboutMe: value });
    }, 3000);
  };
}

export function getCards(geocode) {
  return function(dispatch) {
    firebase
      .database()
      .ref('cards')
      .orderByChild('geocode')
      // .equalTo(geocode)
      .once('value', snap => {
        var items = [];

        snap.forEach(child => {
          let item = child.val();
          const currentuid = firebase.auth().currentUser.uid;

          item.id = child.key;

          if (item.id !== currentuid) {
            items.push(item);
          }
        });
        dispatch({ type: 'GET_CARDS', payload: items });
      });
  };
}

export function getLocation() {
  return function(dispatch) {
    Permissions.askAsync(Permissions.LOCATION).then(function(result) {
      if (result) {
        Location.getCurrentPositionAsync({}).then(function(location) {
          var geocode = Geohash.encode(
            location.coords.latitude,
            location.coords.longitude,
            4
          );
          firebase
            .database()
            .ref('cards/' + firebase.auth().currentUser.uid)
            .update({ geocode: geocode });
          dispatch({ type: 'GET_LOCATION', payload: geocode });
        });
      }
    });
  };
}

export function allowNotifications() {
  return function(dispatch) {
    Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS).then(function(
      result
    ) {
      if (result.status === 'granted') {
        Notifications.getExpoPushTokenAsync().then(function(token) {
          firebase
            .database()
            .ref('cards/' + firebase.auth().currentUser.uid)
            .update({ token: token });
          dispatch({ type: 'ALLOW_NOTIFICATIONS', payload: token });
        });
      }
    });
  };
}

export function sendNotification(id, name, text) {
  return function() {
    firebase
      .database()
      .ref('cards/' + id)
      .once('value', snap => {
        if (snap.val().token !== null) {
          return fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: snap.val().token,
              title: name,
              body: text,
            }),
          });
        }
      });
  };
}
