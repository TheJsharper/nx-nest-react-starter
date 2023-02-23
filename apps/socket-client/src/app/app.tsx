import SocketClient from "./components/socket-client.component";

import * as socketClient from 'socket.io-client';
const socket = socketClient.io("http://localhost:3333/", {});

export function App() {

  return (
   <SocketClient/>
  );

}


export default App;