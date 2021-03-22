import {APIGatewayEvent, Context} from 'aws-lambda';
import { doesUserExist, deleteUser } from '../data/users';
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
    
    const pathParameters = event.pathParameters;

    if(!pathParameters || pathParameters.username === undefined) {
        console.log('noparams');
        return JSON.stringify({
            statusCode: 400,
            body: {
                'error': 'Invalid request.'
            }
        });
    }

    const username = pathParameters.username;

    //Then verify the user exists.
    const userExists = await doesUserExist(username);

    if (userExists) {
        try {
            const successfulDelete: boolean = await deleteUser(username);
            if (successfulDelete) {
                return JSON.stringify({
                    statusCode: 200,
                    body: true
                });
            }
        } catch(e) {
            return JSON.stringify({
                statusCode: 400,
                body: {
                    'error': 'Unable to delete user.'
                }
            });
        }
    }

    return JSON.stringify({
        statusCode: 400,
        body: {
            'error': 'User not found.'
        }
    });
}