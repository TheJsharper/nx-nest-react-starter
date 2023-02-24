export function types(): string {
    return 'types';
}

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    chatToClient: (message: Message)=>void;
  }
  
  export interface ClientToServerEvents {
    hello: () => void;
    chatToServer: (message:Message)=>void;
  }
 export interface Message { sender: string, message: string }