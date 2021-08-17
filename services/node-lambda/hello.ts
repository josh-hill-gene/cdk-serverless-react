import { v4 } from 'uuid';
import { S3 } from 'aws-sdk';

const s3Client = new S3();

async function handler(event: any, context: any) {
    const buckets = await s3Client.listBuckets().promise();
    console.log('event: ');
    console.log(event);
    return {
        statusCode: 200,
        body: 'we have the buckets: ' + JSON.stringify(buckets.Buckets)
    };
}

export { handler };