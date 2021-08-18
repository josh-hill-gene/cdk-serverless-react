import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { getEventBody } from "../Shared/Utils";

const TABLE_NAME = process.env.TABLE_NAME as string;
const PRIMARY_KEY = process.env.PRIMARY_KEY as string;
const dbClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: 'dynamodb waves'
    };

    try {
        const requestBody = getEventBody(event);
        const spaceId = event.queryStringParameters?.[PRIMARY_KEY];

        if (requestBody && spaceId) {
            const requestLocationKey = Object.keys(requestBody)[0];
            const requestNameKey = Object.keys(requestBody)[1];
            const requestLocationValue = requestBody[requestLocationKey];
            const requestNameValue = requestBody[requestNameKey];

            const updateResult = await dbClient.update({
                TableName: TABLE_NAME,
                Key: {
                    [PRIMARY_KEY]: spaceId
                },
                UpdateExpression: 'set #location = :l, #name = :n',
                ExpressionAttributeNames: {
                    '#location': requestLocationKey,
                    '#name': requestNameKey
                },
                ExpressionAttributeValues: {
                    ':l': requestLocationValue,
                    ':n': requestNameValue
                },
                ReturnValues: 'UPDATED_NEW'
            }).promise();
            result.body = JSON.stringify(updateResult);
        }
    } catch (error: any) {
        result.body = error.message;
    }

    return result;
}

export { handler };
