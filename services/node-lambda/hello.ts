import { APIGatewayProxyEvent } from 'aws-lambda';

async function handler(event: any, context: any) {
    if (isAuthorized(event)) {
        return {
            statusCode: 200,
            body: JSON.stringify("You're authorized!")
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify("You're NOT authorized :(")
        };
    }

}

function isAuthorized(event: APIGatewayProxyEvent) {
    const groups = event.requestContext.authorizer?.claims['cognito:groups'];
    if (groups) {
        return (groups as string).includes('admins');
    } else {
        return false;
    }
}

export { handler };
