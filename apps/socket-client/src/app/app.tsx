import {
  amber, blue, blueGrey, brown, cyan, deepOrange, green, grey, indigo, lightBlue, lightGreen, lime,
  orange, pink, purple, red, teal, yellow
} from '@mui/material/colors';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { AvatarBgColor, ClientToServerEvents, Notification, NotificationClientToClientEvents, ServerToClientEvents } from '@types';
import axios from 'axios';
import { useState } from 'react';
import { io, Socket } from "socket.io-client";
import ResponsiveAppBar from './components/app.chat-app.bar.component';
import SocketClient from "./components/socket-client.component";

const chatSocket: Socket<ClientToServerEvents, ServerToClientEvents> = io("http://localhost:3333/chat");

const notificationSocket: Socket<any, NotificationClientToClientEvents> = io("http://localhost:3333/notify",);


export function App() {
  const [userName, setUserName] = useState<string>();
  const [avataBgColor, setAvataBgColor] = useState<AvatarBgColor>();
  const getColors = () => {
    const colors: Map<string, AvatarBgColor & { isUsed: boolean }> = new Map();

    colors.set(amber[500], { bgcolor: amber[500], isUsed: false });
    colors.set(blue[500], { bgcolor: blue[500], isUsed: false });
    colors.set(blueGrey[500], { bgcolor: blueGrey[500], isUsed: false });
    colors.set(brown[500], { bgcolor: brown[500], isUsed: false });
    colors.set(green[500], { bgcolor: green[500], isUsed: false });
    colors.set(cyan[500], { bgcolor: cyan[500], isUsed: false });
    colors.set(deepOrange[500], { bgcolor: deepOrange[500], isUsed: false });
    colors.set(grey[500], { bgcolor: grey[500], isUsed: false });
    colors.set(indigo[500], { bgcolor: indigo[500], isUsed: false });
    colors.set(lightBlue[500], { bgcolor: lightBlue[500], isUsed: false });
    colors.set(lightGreen[500], { bgcolor: lightGreen[500], isUsed: false });
    colors.set(lime[500], { bgcolor: lime[500], isUsed: false });
    colors.set(orange[500], { bgcolor: orange[500], isUsed: false });
    colors.set(pink[500], { bgcolor: pink[500], isUsed: false });
    colors.set(purple[500], { bgcolor: purple[500], isUsed: false });
    colors.set(red[500], { bgcolor: red[500], isUsed: false });
    colors.set(teal[500], { bgcolor: teal[500], isUsed: false });
    colors.set(yellow[500], { bgcolor: yellow[500], isUsed: false });
    return colors;

  }

  const handleUserName = (userName: string): void => setUserName(userName);
  const handleAvatarBgColor = (bgColor: AvatarBgColor) => setAvataBgColor(bgColor);
  const sendNotification = async (type: 'error' | 'warning' | 'info' | 'success', message: string) => {
    const data: Notification = { type, message };
    console.log("TYPE", data);

    const response = await axios.post<any, any, Notification>("http://localhost:3333/api/notify/", data, {
      data: { ...data }

    },);
    console.log("===Y", response);
  };

  return (
    <CssVarsProvider>
      <ResponsiveAppBar username={userName} avatarBgColor={avataBgColor} onNotify={(type: 'error' | 'warning' | 'info' | 'success', value: string) => { sendNotification(type, value); }} />
      <SocketClient chatSocketRef={chatSocket} chatNotificationRef={notificationSocket} colors={getColors()} loginOutput={handleUserName} avatarBgColor={handleAvatarBgColor} />
    </CssVarsProvider>
  );

}


export default App;