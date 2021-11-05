import React, { useEffect, useState } from "react";
import SendNotification from "./SendNotification";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: "high",
  }),
});

export default function App() {
  const [token, setToken] = useState();

  const registerForPushNotificationsAsync = async () => {
    let token = await Notifications.getExpoPushTokenAsync();
    setToken(token.data);
  };

  const sendPushNotification = async () => {
    const message = {
      to: token,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { data: "goes here" },
    };
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>Device token : {token}</Text>
      <Button
        title="Send Notification"
        onPress={() => sendPushNotification()}
      />
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
});
