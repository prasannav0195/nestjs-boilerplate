import User from './user.entity';

export default [
    {
        provide: 'UserRepository',
        useValue: User
    }
];
