import { ImagePicker, Permissions } from 'expo';

export async function takePhotoAndUpload() {
  const { statusA } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  const { statusB } = await Permissions.askAsync(Permissions.CAMERA);

  if (statusA === 'granted' && statusB === 'granted') {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }
  } else {
    throw new Error('Location permission not granted');
  }
}
