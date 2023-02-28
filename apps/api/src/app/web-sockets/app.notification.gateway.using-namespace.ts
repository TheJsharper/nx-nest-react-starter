import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Notification, NotificationClientToClientEvents } from "@types";
import { Server } from "socket.io";

@WebSocketGateway({ namespace: 'notify' })
export class AppNotificacionGatewayUsingNamespace {
    @WebSocketServer() wss: Server<any, NotificationClientToClientEvents>;

    sendToAll(message: Notification): void {
        this.wss.emit("notifyToClient", message);
    }

}