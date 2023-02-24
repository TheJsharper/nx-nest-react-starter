import SocketClient from "./components/socket-client.component";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from '@types';

const socket: Socket<ClientToServerEvents, ServerToClientEvents> = io("http://localhost:3333/chat");

export function App() {

  return (
    <SocketClient socketRef={socket} />
  );

}


export default App;