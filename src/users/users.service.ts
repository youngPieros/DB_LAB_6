import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Gorge',
      password: 'GorgeMartin',
    },
    {
      userId: 2,
      username: 'iman',
      password: 'moradi',
    },
  ];

  async findOne(
    username: string,
  ): Promise<{ password: string; userId: number; username: string }> {
    return this.users.find((user) => user.username === username);
  }
}
