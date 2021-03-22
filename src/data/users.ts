import * as _ from 'lodash';
import User from '../models/User';

const { promises: fs } = require('fs');
const dbFilePath = 'db/Users.json';

export async function getUsers(): Promise<User[]> {
    const dbObj = await fs.readFile(dbFilePath, 'utf8');
    const users = JSON.parse(dbObj);
    return users;
}

export async function getUser(username: string): Promise<User> {
    const dbObj = await fs.readFile(dbFilePath, 'utf8');
    const users = JSON.parse(dbObj);
    const userObj = _.keyBy(users, 'username');

    return userObj[username];
}

export async function deleteUser(username: string): Promise<boolean> {
    const users = await getUsers();
    const updatedUsers = users.filter((user: User) => user.username !== username);

    if (users.length-1 === updatedUsers.length) {
        await fs.writeFile(dbFilePath, JSON.stringify(updatedUsers), (err: Error) => {
            if (err) throw err;
            console.log(`User list updated. User ${username} deleted successfully.`);
        });
    } else {
        throw Error('Error deleting user.');
    }

    return true;
}

export async function doesUserExist(username: string): Promise<boolean> {
    const users = await getUsers();

    return users.some((user) => user.username === username);
}

export async function createUser(user: User): Promise<boolean> {
    try {
        const users = await getUsers();

        users.push(user);
    
        await fs.writeFile(dbFilePath, JSON.stringify(users), (err: Error) => {
            if (err) throw err;
            console.log(`User list updated. User ${user.username} added successfully.`);
        });
    
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function updateUser(userUpdateData: User): Promise<User> {
    const users = await getUsers();

    //Would refactor this if it were a real-world scenario / time allowed.
    const updatedUsers = users.map((user) => user.username === userUpdateData.username ? userUpdateData : user);

    await fs.writeFile(dbFilePath, JSON.stringify(updatedUsers), (err: Error) => {
        if (err) throw err;
        console.log(`User list updated. User ${userUpdateData.username} updated successfully.`);
    });

    return userUpdateData;
}