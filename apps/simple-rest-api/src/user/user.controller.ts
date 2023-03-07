import { BadRequestException, Body, Controller, Get, NotAcceptableException, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotAcceptableResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { User } from "@types";
import { UserService } from "../services/user.service";

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }


    @ApiOkResponse({ type: User, isArray: true })
    @ApiQuery({ name: 'name', required: false })
    @Get()
    getAll(@Query('name') name?: string): Array<User> {
        return name ? this.userService.getUsersByName(name) : this.userService.geAllUsers();
    }

    @ApiOkResponse({ type: User, description: 'Found user with id parameter' })
    @ApiNotAcceptableResponse({description:'No Found user with this Id'})
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): User  {

        const user:User = this.userService.getUsersById(id);

        if(!user) throw new NotAcceptableException(`NO Found with id: ${id}`);

        return user;
    }

    @ApiCreatedResponse({ type: User })
    @ApiBadRequestResponse({description:'Payload properties must be wellformed'})
    @Post()
    create(@Body() user: User): User {
        return this.userService.create(user);
    }
}