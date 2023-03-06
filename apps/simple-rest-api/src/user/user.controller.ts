import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from "@types";
import { UserService } from "../services/user.service";

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }


    @ApiOkResponse({ type: User, isArray: true })
    @Get()
    getAll(): Array<User> {
        return this.userService.geAllUser();
    }

    @ApiCreatedResponse({ type: User })
    @Post()
    create(@Body() user: User): User {
        return this.userService.create(user);
    }
}