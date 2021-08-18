import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Update';

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: '5832b40f-4b17-46de-9fe6-7b411cffb1b7'
        // location: 'San Antonio'
    },
    body: {
        location: "Austin",
        name: "Barton Springs",
    }
} as any;

const result = handler(event, {} as any).then((apiResult) => {
    console.log(apiResult);
    const items = JSON.parse(apiResult.body);
    console.log(items);
    console.log(123);
});
