
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findUsers();
    }
    @Get('/:id')
    async findOne(@Param('id') id: string): Promise<User | undefined> {
        return this.usersService.findUsersById(Number(id));
    }
    @Post()
    async create(@Body() createUser: User): Promise<any> {

        return this.usersService.createUsers(createUser)
    }
    @Put('/:id')
    async update(@Param('id') id: string, @Body() createUser: User): Promise<User | string> {
        const user = {
            id: Number(id),
            name: createUser.name,
            email: createUser.email,
            avatar_url: createUser.avatar_url
        }
        return this.usersService.updateUser(user)
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<User[] | string> {
        return this.usersService.deleteUser(Number(id));
    }
}