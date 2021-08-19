import { UserPool, UserPoolClient, CfnIdentityPool } from '@aws-cdk/aws-cognito';
import { Effect, FederatedPrincipal, Role } from '@aws-cdk/aws-iam';
import { CfnOutput, Construct } from "@aws-cdk/core";

export class IdentityPoolWrapper {
    private scope: Construct;
    private userPool: UserPool;
    private userPoolClient: UserPoolClient;

    private identityPool: CfnIdentityPool;
    private authenticatedRole: Role;
    private unAuthenticatedRole: Role;
    private adminRole: Role;


    constructor(scope: Construct, userPool: UserPool, userPoolClient: UserPoolClient) {
        this.scope = scope;
        this.userPool = userPool;
        this.userPoolClient = userPoolClient;
    }

    private initialize() {
        this.initializeIdentityPool();
        this.initializeRoles();
    }

    private initializeIdentityPool() {
        this.identityPool = new CfnIdentityPool(this.scope, 'SpaceFinderIdentityPool', {
            allowUnauthenticatedIdentities: true,
            cognitoIdentityProviders: [{
                clientId: this.userPoolClient.userPoolClientId,
                providerName: this.userPool.userPoolProviderName
            }]
        });
        new CfnOutput(this.scope, 'IdentityPoolId', {
            value: this.identityPool.ref
        });
    }

    private initializeRoles() {
        this.authenticatedRole = new Role(this.scope, 'CognitoDefaultAuthenticatedRole', {
            assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': this.identityPool.ref
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated'
                }
            },
                'sts:AssumeRoleWithWebIdentity'
            )
        });

        this.unAuthenticatedRole = new Role(this.scope, 'CognitoDefaultUnauthenticatedRole', {
            assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': this.identityPool.ref
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'unauthenticated'
                }
            },
                'sts:AssumeRoleWithWebIdentity'
            )
        });

        this.adminRole = new Role(this.scope, 'CognitoDefaultAuthenticatedRole', {
            assumedBy: new FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': this.identityPool.ref
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated'
                }
            },
                'sts:AssumeRoleWithWebIdentity'
            )
        });

        this.adminRole.addToPolicy(new Role.PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['s3:ListAllMyBuckets'],
            resources: ['*']
        })
    }
}
