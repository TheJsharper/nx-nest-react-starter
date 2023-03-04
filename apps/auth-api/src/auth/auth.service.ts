import { Injectable } from '@nestjs/common';
import { User } from '../models/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService:UsersService){

    }


    async validateUser(username:string, password:string):Promise<User| null>{

        const user = await this.userService.findOne(username);
        if(user && user.password ===password){
            return user;
        }
        return null;
    
    }
}
