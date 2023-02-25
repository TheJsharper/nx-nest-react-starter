import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ClientToServerEvents, Message, ServerToClientEvents } from "@types";
import { Server, Socket } from "socket.io";
import {Socket as SocketClient} from 'socket.io-client';

@WebSocketGateway({namespace:'chat'})
export class AppGatewayUsingNamespace implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger(AppGatewayUsingNamespace.name);

    @WebSocketServer() wss: Server<ClientToServerEvents, ServerToClientEvents>;


    afterInit(server: any): any {
        
        this.logger.log('initialized server ', server);
    }

    @SubscribeMessage('chatToServer')
    handleMessage(client: SocketClient<ClientToServerEvents, ServerToClientEvents>, message: Message): void {
        console.log("message is coming from frontend....", message);
        this.wss.emit('chatToClient', message);
    }

    handleConnection(client: any, ...args: any[]): any {
        this.logger.log("Connecting client....", client, "args===>", args);
    }

    handleDisconnect(client: any): any {
        this.logger.log("Disconnecting client....", client.id);
    }

}