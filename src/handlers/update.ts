import {APIGatewayEvent, Callback, Context} from 'aws-lambda';
import User from '../models/User';
import { updateUser } from '../data/users';

export function handler(event: APIGatewayEvent, context: Context, callback: Callback) {
    if (!event || !event.body) {
        return JSON.stringify({
            statusCode: 400,
            body: {
                'error': 'Invalid request.'
            }
        });
    }

    const updatedUser: User = JSON.parse(event.body) as User;

    try {
        const result = updateUser(updatedUser);

        return JSON.stringify({
            statusCode: 200,
            body: result
        });
    } catch(e) {
        return JSON.stringify({
            statusCode: 400,
            body: {
                'error': 'Unable to update user.'
            }
        });
    }
}