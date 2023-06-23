import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const camyDir = FileSystem.documentDirectory + ".camy/";
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(camyDir);
  if (!dirInfo.exists) {
    console.log("Gif directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(camyDir, { intermediates: true });
  }
}

export default function CameraScreen() {
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      // Get Permission for Camera, Audio, Camera Roll, Location, notifications and files
      const { status: cameraPermission } =
        await Camera.requestCameraPermissionsAsync();
      const { status: audioPermission } =
        await Camera.requestMicrophonePermissionsAsync();

      const { status: notificationPermission } =
        await Notifications.requestPermissionsAsync();

      setHasPermission(
        cameraPermission === "granted" &&
          audioPermission === "granted" &&
          notificationPermission === "granted"
      );
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  // Checks if gif directory exists. If not, creates it

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        await ensureDirExists();

        const options = { quality: 1, base64: true };
        const photo = await cameraRef.current.takePictureAsync(options);

        const filename = `${Date.now()}.jpg`;
        const filePath = `${camyDir}${filename}`;

        await FileSystem.copyAsync({
          from: photo.uri,
          to: filePath
        });

        const fileInfo = await FileSystem.getInfoAsync(filePath);

        console.log("Photo saved:", filePath);
        console.log("File info:", fileInfo);

        // Get Current Location
        const location = await Location.getCurrentPositionAsync({});
        console.log("Location:", location);

        // Add location data to the photo
        const photoWithLocation = {
          ...photo,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            timestamp: location.timestamp
          }
        };

        // Save the photo with location data
        const photoData = JSON.stringify(photoWithLocation);
        const photoPath = `${camyDir}photo_${Date.now()}.json`;

        await FileSystem.writeAsStringAsync(photoPath, photoData);

        console.log("Photo with location saved:", photoPath);
      }
    } catch (error) {
      console.log("Photo saved:", filePath);
      console.error("Error saving photo:", error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {capturedPhoto && <Text style={styles.photoText}>{capturedPhoto}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginHorizontal: 10
  },
  buttonText: {
    fontSize: 16,
    color: "#000"
  }
});
