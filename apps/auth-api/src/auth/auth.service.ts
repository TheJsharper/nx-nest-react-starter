import { Injectable } from '@nestjs/common';
import { User } from '../models/user.interface';
import { UsersService } from '../users/users.service';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(private userService:UsersService, private  jwtService: JwtService){

    }


    async validateUser(username:string, password:string):Promise<User| null>{

        const user = await this.userService.findOne(username);
        if(user && user.password ===password){
            return user;
        }
        return null;
    
    }
    async login(user:Partial<User>){
       const payload = {name: user.name, sub:user.id } ;
       return {
        access_token:this.jwtService.sign(payload), 
        
       }

    }
}
