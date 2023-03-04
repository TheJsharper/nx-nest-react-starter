import { Injectable } from '@nestjs/common';
import { User } from '../models/user.interface';


@Injectable()
export class UsersService {

    private readonly users: Array<User> = [
        {
            id: 1,
            name: 'Mario',
            username: '@superMario',
            password: 'iam123'

        },
        {
            id: 2,
            name: 'Mambo',
            username: '@MamboNumberFive',
            password: 'iamMambo'

        },
        {
            id: 3,
            name: 'Franck',
            username: '@Franky',
            password: 'iamFranky'

        },
    ];
    getUsers(): Array<User> {
        return this.users;
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find((user: User) => user.username === username)
    }

}
