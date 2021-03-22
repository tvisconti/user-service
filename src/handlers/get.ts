import {APIGatewayEvent, Context} from 'aws-lambda';
import { getUser, doesUserExist } from '../data/users';
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
    } else {
        const username = pathParameters.username;
        const userDoesExist = await doesUserExist(username);

        if (userDoesExist) {
            const user = await getUser(username);
            return JSON.stringify({
                statusCode: 400,
                body: user
            });
        } else {
            return JSON.stringify({
                statusCode: 400,
                body: {
                    'error': 'User does not exist.'
                }
            });
        }
    }
}