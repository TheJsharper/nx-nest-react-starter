import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './web-sockets/app.gateway';
import { AppGatewayUsingNamespace } from './web-sockets/app.gateway-using-namespace';
import { AppNotificacionGatewayUsingNamespace } from './web-sockets/app.notification.gateway.using-namespace';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppGateway, AppGatewayUsingNamespace, AppNotificacionGatewayUsingNamespace],
})
export class AppModule {}
