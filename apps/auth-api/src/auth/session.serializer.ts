import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "../models/user.interface";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(user: Partial<User>, done: (err: Error, user: Partial<User>) => void) {
        done(null, user);
    }
    deserializeUser(payload: any, done: (err: Error, payload: string) => void) {
        done(null, payload);
    }

}