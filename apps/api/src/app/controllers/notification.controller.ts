import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AppNotificacionGatewayUsingNamespace } from "../web-sockets/app.notification.gateway.using-namespace";

@Controller('notificy')
export class NotificationController{
    constructor(private notificationGateway: AppNotificacionGatewayUsingNamespace){}

    @Post()
    @HttpCode(200)
    sendAlertToAll(@Body() dto:{message:string}){
        this.notificationGateway.sendToAll(dto.message);
    }
}