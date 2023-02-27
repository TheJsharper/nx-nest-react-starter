import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { NotificationClientToClientEvents } from "@types";
import { Server } from "socket.io";

@WebSocketGateway({ namespace: 'notificy' })
export class AppNotificacionGatewayUsingNamespace {
    @WebSocketServer() wss: Server<any, NotificationClientToClientEvents>;

    sendToAll(message: string): void {
        this.wss.emit("notifyToClient", { type: 'Alert', message });
    }

}