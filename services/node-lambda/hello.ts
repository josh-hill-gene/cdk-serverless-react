import { v4 } from 'uuid';

async function handler(event: any, context: any) {
    return {
        statusCode: 200,
        body: 'more lambda greetings, this time with TS: ' + v4()
    };
}

export = { handler };
