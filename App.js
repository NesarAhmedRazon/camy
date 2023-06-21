import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "./util/Card";

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <FlatList
          data={[{ key: "a" }, { key: "b" }]}
          style={{
            width: "100%",
            height: "100%",
            marginTop: 20,
            backgroundColor: "#a3f"
          }}
          renderItem={({ item }) => <Card data={item.key} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20
  }
});
