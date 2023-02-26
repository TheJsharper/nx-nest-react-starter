import {
  amber, blue, blueGrey, brown, cyan, deepOrange, green, grey, indigo, lightBlue, lightGreen, lime,
  orange, pink, purple, red, teal, yellow
} from '@mui/material/colors';
import { ClientToServerEvents, ServerToClientEvents } from '@types';
import { io, Socket } from "socket.io-client";
import SocketClient from "./components/socket-client.component";

const socket: Socket<ClientToServerEvents, ServerToClientEvents> = io("http://localhost:3333/chat");


export function App() {
  const getColors = () => {
    const colors: Map<boolean, { bgcolor: string }> = new Map<boolean, { bgcolor: string }>();
    colors.set(false, { bgcolor: amber[500] });
    colors.set(false, { bgcolor: blue[500] });
    colors.set(false, { bgcolor: blueGrey[500] });
    colors.set(false, { bgcolor: brown[500] });
    colors.set(false, { bgcolor: green[500] });
    colors.set(false, { bgcolor: cyan[500] });
    colors.set(false, { bgcolor: deepOrange[500] });
    colors.set(false, { bgcolor: grey[500] });
    colors.set(false, { bgcolor: indigo[500] });
    colors.set(false, { bgcolor: lightBlue[500] });
    colors.set(false, { bgcolor: lightGreen[500] });
    colors.set(false, { bgcolor: lime[500] });
    colors.set(false, { bgcolor: orange[500] });
    colors.set(false, { bgcolor: pink[500] });
    colors.set(false, { bgcolor: purple[500] });
    colors.set(false, { bgcolor: red[500] });
    colors.set(false, { bgcolor: teal[500] });
    colors.set(false, { bgcolor: yellow[500] });
    return colors;

  }
  return (
    <SocketClient socketRef={socket} colors={getColors()} />
  );

}


export default App;