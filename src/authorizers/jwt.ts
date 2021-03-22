import { 
    APIGatewayTokenAuthorizerEvent, 
    APIGatewayAuthorizerResult, 
    Callback, 
    Context
} from 'aws-lambda';

export function handler(event: APIGatewayTokenAuthorizerEvent, context: Context, callback: Callback) {
    console.log('event: ', event);
    //TODO: check if username in path matches username in token.

    console.log(event.authorizationToken);

    if (!event.authorizationToken) {
        callback(null, generateDeny('user', event.methodArn));
    }

    callback(null, generateAllow('user', event.methodArn));
}

const generatePolicy = function(principalId: string, effect: string, resource: string) {
    let authResponse: APIGatewayAuthorizerResult = {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    };

    return authResponse;
}

const generateAllow = function(principalId: string, resource: string) {
    return generatePolicy(principalId, 'Allow', resource);
}

const generateDeny = function(principalId: string, resource: string) {
    return generatePolicy(principalId, 'Deny', resource);
}