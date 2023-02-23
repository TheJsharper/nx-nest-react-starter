import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class AppGatewayUsingNamespace implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger(AppGatewayUsingNamespace.name);

    @WebSocketServer() wss: Server;


    afterInit(server: any): any {
        this.logger.log('initialized server ', server);
    }

    @SubscribeMessage('chatToServer')
    handleMessage(client: Socket, message: { sender: string, message: string }): void {
        this.wss.emit('chatToClient', message);
    }

    handleConnection(client: any, ...args: any[]): any {
        this.logger.log("Connecting client....", client, "args===>", args);
    }

    handleDisconnect(client: any): any {
        this.logger.log("Disconnecting client....", client.id);
    }

}