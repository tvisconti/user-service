import {APIGatewayEvent, Context} from 'aws-lambda';
import { getUser, doesUserExist } from '../data/users';


export async function handler(event: APIGatewayEvent, context: Context) {    
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
                statusCode: 200,
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