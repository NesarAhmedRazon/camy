import { Camera, CameraType } from "expo-camera";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "../styles/global";

export default function HomeScreen(props) {
  const [camType, setCamType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [flashIcon, setFlashIcon] = useState("flash-off");
  const [camera, setCamera] = useState(null);

  if (permission === false) {
    return <Text>No access to camera</Text>;
  }
  function toggleCameraType() {
    setCamType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Camera style={{ flex: 1 }} type={camType} ref={setCamera}>
        <View style={style.buttonContainer}>
          <TouchableOpacity style={style.button} onPress={toggleCameraType}>
            <Text style={style.title}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
