import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { Notification } from "@types";
import { AppNotificacionGatewayUsingNamespace } from "../web-sockets/app.notification.gateway.using-namespace";

@Controller('notify')
export class NotificationController{
    constructor(private notificationGateway: AppNotificacionGatewayUsingNamespace){}

    @Post()
    @HttpCode(200)
    sendAlertToAll(@Body() dto:Notification){
        this.notificationGateway.sendToAll(dto);
    }

    @Get()
    getAll():any{
        return  ({ message: 'Welcome to  controllers api!' });
    }
}