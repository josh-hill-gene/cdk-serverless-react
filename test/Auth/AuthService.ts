import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify';
import { config } from './config';
import { CognitoUser } from '@aws-amplify/auth';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        AuthenticationFlowType: 'USER_PASSWORD_AUTH',
    }
});

export class AuthService {
    public async login(userName: string, password: string) {
        const user = await Auth.signIn(userName, password) as CognitoUser;
        console.log('wtf debugger hit the damn breakpoint')
        return user;
    }
}
