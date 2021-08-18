import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Read';

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        // spaceId: '5571c78e-c888-4805-bb09-607b55d7d09c'
        name: 'River Walk'
    },
} as any;

const result = handler(event, {} as any).then((apiResult) => {
    console.log(apiResult);
    const items = JSON.parse(apiResult.body);
    console.log(items);
    console.log(123);
});
