import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AppNotificacionGatewayUsingNamespace } from "../web-sockets/app.notification.gateway.using-namespace";

@Controller('notify')
export class NotificationController{
    constructor(private notificationGateway: AppNotificacionGatewayUsingNamespace){}

    @Post("/create")
    @HttpCode(200)
    sendAlertToAll(@Body() dto:{message:string}){
        this.notificationGateway.sendToAll(dto.message);
    }

    @Get()
    getAll():any{
        return  ({ message: 'Welcome to  rest api!' });
    }
}