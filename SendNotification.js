const SendNotification = async (deviceId, title, message) => {
  return await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: `${deviceId}`,
      title: `${title}`,
      body: `${message}`,
      sound: "default",
    }),
  }).then((res) => res.json());
};

export default SendNotification;
