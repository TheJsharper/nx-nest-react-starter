import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from  'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        
        super({
            secretOrKey: 'SECRET_PHRASE_123456789',
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
        console.log("super0", super.name);
    }
   async  validate(payload:any){
    //validation??
    console.log("validating.... ", payload);
        return {
            id: payload.id,
            name:payload.name
        }
    }
}