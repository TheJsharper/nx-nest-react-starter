import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authentided.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
    imports:[UsersModule, PassportModule.register({ session:true  })],
    providers:[AuthService, LocalStrategy, LocalAuthGuard, AuthenticatedGuard, SessionSerializer],
})
export class AuthModule {

}
