import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: 1,
            name: 'jaca',
            email: 'jaca@gmail.com',
            avatar_url: 'https://uifaces.co/our-content/donated/rSuiu_Hr.jpg'
        }
    ];

    createUsers(user: User) {
        if (!user) return;
        user.id = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
        this.users.push(user);
        return { message: `user created with id:${user.id}` };
    }

    findUsers(): User[] {
        return this.users;
    }

    findUsersById(id: number): User | undefined {
        const user = this.users.find(user => user.id === id);

        return user;
    }
    updateUser({ id, name, email }: User): User | string {
        const user = this.findUsersById(id);

        if (!user) return 'user doesn`t not exist';

        user.name = name;
        user.email = email;

        this.users.push(user);

        return user;
    }

    deleteUser(id: number): User[] | string {
        const user = this.findUsersById(id);

        if (!user) return 'user doesn`t not exist';

        const index = this.users.findIndex(user => user.id === id);
        this.users.splice(index, 1);

        return this.users;
    }
}
