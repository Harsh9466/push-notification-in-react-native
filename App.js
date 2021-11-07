import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Notifications from "expo-notifications";
export default function App() {
  const [token, setToken] = useState();
  const [inputToken, setInputToken] = useState("");
  const [message, setMessage] = useState("");

  const registerForPushNotificationsAsync = async () => {
    let token = await Notifications.getExpoPushTokenAsync();
    setToken(token.data);
  };
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      priority: "normal",
    }),
  });

  const sendPushNotification = async () => {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: inputToken,
        sound: "default",
        title: "New message",
        body: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(""));
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Your device token </Text>
      <Text selectable={true} style={{ marginVertical: 10 }}>
        {token}
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputToken}
        value={inputToken}
        placeholder="ExponentPushToken[*****]"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        placeholder="Enter your message"
        keyboardType="default"
      />
      <Button
        title="Send Notification"
        onPress={() => {
          sendPushNotification();
        }}
      />
      <Text>Updated App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginTop: 50,
  },
});
