import { Injectable } from "@nestjs/common";
import { User } from "@types";

@Injectable()
export class UserService {

    private users: Array<User> = [];
    constructor() {
        this.users = [{ id: 1, name: 'Markus Planck' }, { id: 2, name: 'Theo Harry' }, { id: 3, name: 'Max Mustermann' }];
    }

    geAllUsers(): Array<User> {
        return this.users
    }

    create(dto: User): User {
        const count: number = this.users.length;
        const newUser: User = { ...dto, id: count };

        this.users = [...this.users, newUser];
        return newUser;
    }

    getUsersByName(name: string): Array<User> {
        return this.users.filter((user: User) => user.name === name);
    }
    getUsersById(id: number): User | null {
        return this.users.find((user: User) => user.id === id);
    }
}