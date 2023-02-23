import { Logger } from "@nestjs/common";
import { } from '@nestjs/platform-socket.io';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { OnGatewayConnection, OnGatewayDisconnect, WsResponse } from "@nestjs/websockets/interfaces";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: 'http://localhost:4200' })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private logger: Logger = new Logger(AppGateway.name);

    @WebSocketServer() wss: Server;
    afterInit(server: Server) {
        this.logger.log('initialized server ', server);
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.log("Connecting client....", client, "args===>", args);
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): WsResponse<string> {
        this.logger.log("MessageName: msgToServer was called by client id:", client.id);
        return { data: `Hello World from Server to ${payload} ${Math.random()} `, event: 'msgToClientReturnByMethod' };
    }

    @SubscribeMessage('msgToServerHandleByClient')
    handleMessageByClient(client: Socket, payload: string): void {
        this.logger.log("MessageName: msgToServerHandleByClient was called by client id:", client.id);
        client.emit('msgToClientReturnByClientObj', `Hello World from Server to ${payload} ${Math.random()} `);
    }

    @SubscribeMessage('msgToServerHandleByServer')
    handleMessageByServer(client: Socket, payload: string): void {
        this.logger.log("MessageName: msgToServerHandleByServer was called by client id:", client.id);
        this.wss.emit('msgToClientReturnByServerObj', `Hello World from Server to all cliented ${payload} ${Math.random()} `);
    }

    handleDisconnect(client: Socket) {
        this.logger.log("Disconnecting client....", client.id);
    }


}