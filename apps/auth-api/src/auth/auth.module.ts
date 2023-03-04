import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authentided.guard';
import { JwtAuthGUard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [UsersModule, PassportModule/*.register({ session:true  })*/, JwtModule.register({ secret: 'SECRET_PHRASE_123456789', signOptions: { expiresIn: '60s' } })],
    providers: [AuthService, /**/LocalStrategy, LocalAuthGuard, AuthenticatedGuard, /*SessionSerializer,*/ JwtStrategy, JwtAuthGUard],
    exports:[AuthService]
})
export class AuthModule {

}
