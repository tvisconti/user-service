import {APIGatewayEvent, Context} from 'aws-lambda';
import { doesUserExist, createUser } from '../data/users';
import User from '../models/User';

export async function handler(event: APIGatewayEvent, context: Context) {
    if (!event || !event.body || !(JSON.parse(event.body) instanceof User)) {
        return JSON.stringify({
            statusCode: 400,
            body: {
                'error': 'Invalid request.'
            }
        });
    }

    const newUser: User = JSON.parse(event.body) as User;
    //Check if username already exists.
    const username = newUser.username;
    const userAlreadyExists = await doesUserExist(username);

    if(!userAlreadyExists) {
        const success = await createUser(newUser);

        if(success) {
            return JSON.stringify({
                statusCode: 200,
                body: true
            });
        } else {
            return JSON.stringify({
                statusCode: 500,
                body: {
                    'error': 'User failed to create.'
                }
            });
        }
    } else {
        return JSON.stringify({
            statusCode: 400,
            body: {
                'error': 'User already exists.'
            }
        });
    }
}