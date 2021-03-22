import {APIGatewayEvent, Callback, Context} from 'aws-lambda';
import User from '../models/User';
import UserLogin from '../models/UserLogin';

const jwt = require('jsonwebtoken');

export function handler(event: APIGatewayEvent, context: Context, callback: Callback) {
    if (!event || !event.body || !(JSON.parse(event.body) instanceof UserLogin)) {
        return JSON.stringify({
            statusCode: 400,
            body: {
                'error': 'Invalid request.'
            }
        });
    }

    const loginUser: User = JSON.parse(event.body) as User;

    
}