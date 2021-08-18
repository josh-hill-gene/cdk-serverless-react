import { Stack, StackProps, Construct } from '@aws-cdk/core';
import { Code, Function as LambdaFunction, Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import { join } from 'path';
import { GenericTable } from './GenericTable';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export class SpaceStack extends Stack {

    private api = new RestApi(this, 'SpaceApi');
    // private spacesTable = new GenericTable({
    //     name: 'SpacesTable',
    //     primaryKey: 'spaceId',
    //     stack: this
    // });
    private spacesTable = new GenericTable(this, {
        tableName: 'SpacesTable',
        primaryKey: 'spaceId',
        createLambdaPath: 'Create',
        readLambdaPath: 'Read',
        secondaryIndices: ['location']
    });

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
            entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
            handler: 'handler'
        });

        const s3ListPolicy = new PolicyStatement();
        s3ListPolicy.addActions('s3:ListAllMyBuckets');
        s3ListPolicy.addResources('*');
        helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

        const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodeJs);
        const helloLambdaResource = this.api.root.addResource('hello');
        helloLambdaResource.addMethod('GET', helloLambdaIntegration);

        const spaceResource = this.api.root.addResource('spaces');
        spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration);
        spaceResource.addMethod('GET', this.spacesTable.readLambdaIntegration);

    }
}

