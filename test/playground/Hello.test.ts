import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Create';

const event: APIGatewayProxyEvent = {
    // queryStringParameters: {
    //     spaceId: '2667604c-e4ff-4193-86b6-c31726e0a917'
    //     // location: 'San Antonio'
    // },
    body: {
        location: "Lubbock",
        // name: "Barton Springs",
    }
} as any;

const result = handler(event, {} as any).then((apiResult) => {
    console.log(apiResult);
    const items = JSON.parse(apiResult.body);
    console.log(items);
});
