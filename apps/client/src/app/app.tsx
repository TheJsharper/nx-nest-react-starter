
import { useEffect, useState } from 'react';
import * as socketClient from 'socket.io-client';
const socket = socketClient.io("http://localhost:3333/");
export function App() {
  const [messageReturnByMethod, setMessageReturnByMethod] = useState<string>("");

  const [messagesReturnByMethod, _] = useState<Array<string>>([]);

  const [messageToClientReturnByClientObj, setMessageToClientReturnByClientObj] = useState<string>("");

  const [messagesToClientReturnByClientObj, __] = useState<Array<string>>([]);

  const [messageToClientReturnByServerObj, setMessageToClientReturnByServerObj] = useState<string>("");

  const [messagesToClientReturnByServerObj, ___] = useState<Array<string>>([]);

  useEffect(() => {

    (async () => {
      await new Promise<void>((resolve: () => void) => {
        messagesReturnByMethod.push(messageReturnByMethod);
        resolve();
      });
      return () => socket.disconnect();
    })();

  }, [messageReturnByMethod]);

  useEffect(() => {

    (async () => {
      await new Promise<void>((resolve: () => void) => {
        messagesToClientReturnByClientObj.push(messageToClientReturnByClientObj);
        resolve();
      });
      return () => socket.disconnect();
    })();

  }, [messageToClientReturnByClientObj]);

  useEffect(() => {

    (async () => {
      await new Promise<void>((resolve: () => void) => {
        messagesToClientReturnByServerObj.push(messageToClientReturnByServerObj);
        resolve();
      });
      return () => socket.disconnect();
    })();

  }, [messageToClientReturnByServerObj]);

  
  socket.on("msgToClientReturnByMethod", (msgs: string) => setMessageReturnByMethod(msgs));

  socket.on("msgToClientReturnByClientObj", (msgs: string) => setMessageToClientReturnByClientObj(msgs));

  socket.on("msgToClientReturnByServerObj", (msgs: string) => setMessageToClientReturnByServerObj(msgs));

  return (
    <div className='app'>

      <div>
        <h2>Simple return by Method</h2>
      <button onClick={() => socket.emit('msgToServer', " React Application")}>sendMessage</button>
      {messagesReturnByMethod.map((value: string, index: number) => (<div key={index}>
        {value}
      </div>))}
      </div>
      <div>
        <h2>Emit by client Object</h2>

      <button onClick={() => socket.emit('msgToServerHandleByClient', " ===>React Application")}>sendMessage</button>
      {messagesToClientReturnByClientObj.map((value: string, index: number) => (<div key={index}>
        {value}
      </div>))}
      </div>
      <div>
        <h2>Emit by Server Object</h2>

      <button onClick={() => socket.emit('msgToServerHandleByServer', " xxx==>React Application")}>sendMessage</button>
      {messagesToClientReturnByServerObj.map((value: string, index: number) => (<div key={index}>
        {value}
      </div>))}
      </div>
    </div>

  );
}

export default App;
